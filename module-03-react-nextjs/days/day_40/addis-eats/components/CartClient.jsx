"use client";

import { useEffect, useState } from "react";

export default function CartClient() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("addisEatsCart") || "[]");

    setCart(savedCart);
  }, []);

  function removeItem(id) {
    const updatedCart = cart.filter((item) => item.id !== id);

    setCart(updatedCart);
    localStorage.setItem("addisEatsCart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );

    setCart(updatedCart);

    localStorage.setItem("addisEatsCart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));
  }

  function decreaseQuantity(id) {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem("addisEatsCart", JSON.stringify(updatedCart));

    window.dispatchEvent(new Event("cartUpdated"));
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <h2 className="text-2xl font-bold text-emerald-950">
          Your Cart is Empty
        </h2>

        <p className="mt-2 text-slate-600">
          Add some delicious Ethiopian food to your cart.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="h-24 w-24 rounded-xl object-cover"
            />

            {/* Details */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-emerald-950">
                  {item.name}
                </h3>

                <p className="font-semibold text-emerald-700">
                  {item.price} ETB
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="rounded-lg border px-3 py-1 font-bold"
                  >
                    −
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="rounded-lg border px-3 py-1 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-sm font-semibold text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-emerald-950">Order Summary</h2>

        <div className="mt-5 flex justify-between text-slate-600">
          <span>Items</span>
          <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </div>

        <div className="mt-3 flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold">{total} ETB</span>
        </div>

        <div className="my-5 border-t" />

        <div className="flex justify-between text-lg font-bold text-emerald-950">
          <span>Total</span>
          <span>{total} ETB</span>
        </div>

        <a
          href="/checkout"
          className="mt-6 block rounded-xl bg-emerald-700 px-6 py-4 text-center font-bold text-white hover:bg-emerald-800"
        >
          Proceed to Checkout
        </a>
      </div>
    </div>
  );
}
