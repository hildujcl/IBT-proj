"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import SignOutButton from "@/components/SignOutButton";
import { getCart, clearCart } from "@/lib/cart";
import { isValidPhone, isValidName } from "@/lib/validation";

export default function CheckoutForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    deliveryArea: "",
    notes: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!isValidName(form.name)) {
      setError("Please enter your full name.");
      return;
    }

    if (!isValidPhone(form.phone)) {
      setError("Enter a valid Ethiopian phone number.");
      return;
    }

    if (!form.deliveryArea.trim()) {
      setError("Please enter your delivery area.");
      return;
    }

    const cart = getCart();

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const items = cart.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    setLoading(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: form,
          items,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to place your order.");
      }

      clearCart();

      router.push("/orders");
      router.refresh();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2>Delivery Information</h2>

      <p className="form-description">
        Complete your details to place your demo order.
      </p>
      <SignOutButton />

      <div className="form-group">
        <label htmlFor="name">Full name</label>

        <input
          id="name"
          name="name"
          className="form-input"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">TeleBirr phone number</label>

        <input
          id="phone"
          name="phone"
          className="form-input"
          value={form.phone}
          onChange={handleChange}
          placeholder="09XXXXXXXX or +2519XXXXXXXX"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="deliveryArea">Delivery area</label>

        <input
          id="deliveryArea"
          name="deliveryArea"
          className="form-input"
          value={form.deliveryArea}
          onChange={handleChange}
          placeholder="Enter your delivery area"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Additional notes</label>

        <textarea
          id="notes"
          name="notes"
          className="form-textarea"
          value={form.notes}
          onChange={handleChange}
          placeholder="Any extra delivery instructions?"
        />
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="button"
        style={{ width: "100%" }}
        disabled={loading}
      >
        {loading ? "Placing order..." : "Place demo order"}
      </button>
    </form>
  );
}
