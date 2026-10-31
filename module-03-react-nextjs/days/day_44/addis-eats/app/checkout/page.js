"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart, saveCart } from "../lib/cart";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    setCart(getCart());
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (cart.length === 0) return;

    setSubmitted(true);
    saveCart([]);
    setCart([]);
  }

  if (submitted) {
    return (
      <section className="section empty-state">
        <h1>Thank you, {form.name}!</h1>

        <p>Your demonstration order has been completed.</p>

        <Link href="/" className="button">
          Back to Home
        </Link>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="section empty-state">
        <h1>Your cart is empty</h1>

        <Link href="/menu" className="button">
          Explore Menu
        </Link>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="section-heading">
        <h1>Checkout</h1>
        <p>Enter your delivery information.</p>
      </div>

      <div className="checkout-container">
        <Link href="/cart" className="back-link">
          ← Back to Cart
        </Link>
        <form onSubmit={handleSubmit} className="checkout-form">
          <label htmlFor="name">Full Name</label>

          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="phone">Phone Number</label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <label htmlFor="address">Delivery Address</label>

          <textarea
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <h2>Total: {total} ETB</h2>

          <button type="submit" className="button">
            Complete Demo Order
          </button>
        </form>
      </div>
    </section>
  );
}
