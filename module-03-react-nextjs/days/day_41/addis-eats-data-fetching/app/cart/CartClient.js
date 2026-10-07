"use client";

import Link from "next/link";
import useSWR from "swr";

import { fetcher } from "@/lib/fetcher";

export default function CartClient() {
  const { data, error, isLoading, mutate } = useSWR("/api/cart", fetcher);

  if (isLoading) {
    return <p>Loading cart...</p>;
  }

  if (error) {
    return <p>Could not load cart.</p>;
  }

  const items = data || [];

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  async function updateQuantity(id, action) {
    await fetch("/api/cart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        action,
      }),
    });

    await mutate();
  }

  return (
    <section className="cart-container">
      <div className="cart-header">
        <h1>Your Cart</h1>

        <span>{items.length} items</span>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div>🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add something delicious first!</p>

          <Link href="/menu" className="hero-button">
            Browse Menu
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />

                <div className="cart-info">
                  <h3>{item.name}</h3>

                  <strong>ETB {item.price}</strong>
                </div>

                <div className="quantity">
                  <button onClick={() => updateQuantity(item.id, "decrease")}>
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => updateQuantity(item.id, "increase")}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <span>Total</span>
            <strong>ETB {total}</strong>
          </div>

          <Link href="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>
        </>
      )}
    </section>
  );
}
