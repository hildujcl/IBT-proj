"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    notes: "",
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("addisEatsCart") || "[]");

    setCart(savedCart);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    alert("Order placed successfully! 🎉");

    localStorage.removeItem("addisEatsCart");
    window.location.href = "/";
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-emerald-950">Checkout</h1>

      <p className="mt-2 text-slate-600">Complete your order below.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-emerald-950">
            Delivery Information
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block font-semibold">Name</label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">TeleBirr Phone</label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="0912345678"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">Delivery Area</label>

              <input
                name="area"
                value={form.area}
                onChange={handleChange}
                required
                placeholder="Bole"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="mb-2 block font-semibold">Notes</label>

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Optional notes"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-emerald-700 px-6 py-4 font-bold text-white hover:bg-emerald-800"
          >
            Place Order — {total} ETB
          </button>
        </form>

        {/* Order Summary */}
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-emerald-950">Your Order</h2>

          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-emerald-950">{item.name}</p>

                  <p className="text-sm text-slate-500">
                    {item.quantity} × {item.price} ETB
                  </p>
                </div>

                <p className="font-semibold">
                  {item.price * item.quantity} ETB
                </p>
              </div>
            ))}
          </div>

          <div className="my-6 border-t" />

          <div className="flex justify-between text-xl font-bold text-emerald-950">
            <span>Total</span>
            <span>{total} ETB</span>
          </div>
        </div>
      </div>
    </main>
  );
}
