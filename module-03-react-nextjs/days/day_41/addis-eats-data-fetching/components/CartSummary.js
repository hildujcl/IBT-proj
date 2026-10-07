"use client";

import { useQuery } from "@tanstack/react-query";

async function getCart() {
  const response = await fetch("/api/cart");

  if (!response.ok) {
    throw new Error("Failed to load cart");
  }

  return response.json();
}

export default function CartSummary() {
  const {
    data: cart = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  if (isPending) {
    return (
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-gray-500">Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <p className="text-red-600">Could not load cart.</p>
      </div>
    );
  }

  const total = cart.reduce((sum, dish) => sum + (Number(dish.price) || 0), 0);

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold">Cart Summary</h2>

      <p className="mt-2 text-gray-600">
        {cart.length} {cart.length === 1 ? "item" : "items"}
      </p>

      <div className="mt-4 space-y-3">
        {cart.map((dish, index) => (
          <div
            key={`${dish.id}-${index}`}
            className="flex items-center justify-between border-b pb-3"
          >
            <span>{dish.name}</span>

            <span className="font-semibold">{dish.price} ETB</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between text-lg font-bold">
        <span>Total</span>
        <span>{total} ETB</span>
      </div>
    </div>
  );
}
