"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { dishes } from "@/lib/dishes";
import { getCart, updateCartQuantity, removeCartItem } from "@/lib/cart";

export default function CartClient() {
  const [cart, setCart] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCart(getCart());
    setReady(true);
  }, []);

  const cartItems = useMemo(() => {
    return cart
      .map((cartItem) => {
        const dish = dishes.find((item) => item.id === cartItem.id);

        if (!dish) {
          return null;
        }

        return {
          ...dish,
          quantity: cartItem.quantity,
        };
      })
      .filter(Boolean);
  }, [cart]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  function changeQuantity(id, quantity) {
    const updatedCart = updateCartQuantity(id, quantity);
    setCart(updatedCart);
  }

  function deleteItem(id) {
    const updatedCart = removeCartItem(id);
    setCart(updatedCart);
  }

  if (!ready) {
    return <div className="loading-screen">Loading your cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-state">
        <h2>Your cart is waiting ♡</h2>

        <p>You have not added any dishes yet.</p>

        <Link href="/menu" className="button">
          Explore the menu
        </Link>
      </div>
    );
  }

  return (
    <div>
      {cartItems.map((item) => (
        <article className="cart-item" key={item.id}>
          <div>
            <h3>{item.name}</h3>

            <p className="price">{item.price} ETB each</p>

            <p>Subtotal: {item.price * item.quantity} ETB</p>
          </div>

          <div className="quantity-controls">
            <button
              type="button"
              onClick={() => changeQuantity(item.id, item.quantity - 1)}
              aria-label={`Decrease ${item.name} quantity`}
            >
              −
            </button>

            <span>{item.quantity}</span>

            <button
              type="button"
              onClick={() => changeQuantity(item.id, item.quantity + 1)}
              aria-label={`Increase ${item.name} quantity`}
            >
              +
            </button>

            <button
              type="button"
              className="button button-danger"
              onClick={() => deleteItem(item.id)}
            >
              Remove
            </button>
          </div>
        </article>
      ))}

      <div className="cart-summary">
        <div className="cart-total">
          <span>Total</span>
          <span>{total} ETB</span>
        </div>

        <Link href="/checkout" className="button" style={{ width: "100%" }}>
          Continue to checkout
        </Link>
      </div>
    </div>
  );
}
