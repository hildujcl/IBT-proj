"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart, saveCart } from "../lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    function updateCart() {
      setCart(getCart());
    }

    updateCart();

    window.addEventListener("cartUpdated", updateCart);
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  function removeItem(id) {
    const updatedCart = cart.filter((item) => item.id !== id);

    saveCart(updatedCart);
    setCart(updatedCart);
  }

  function updateQuantity(id, amount) {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + amount } : item,
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
    setCart(updatedCart);
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="section">
      <div className="section-heading">
        <h1>Your Shopping Cart</h1>
        <p>Review your selected Ethiopian dishes.</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Explore our menu and add your favorite dishes.</p>

          <Link href="/menu" className="button">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.price} ETB each</p>
              </div>

              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  aria-label={`Decrease ${item.name} quantity`}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  aria-label={`Increase ${item.name} quantity`}
                >
                  +
                </button>
              </div>

              <strong>{item.price * item.quantity} ETB</strong>

              <button
                className="remove-button"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <Link href="/menu" className="back-link">
            ← Continue Shopping
          </Link>
          <div className="cart-total">
            <h2>Total: {total} ETB</h2>

            <Link href="/checkout" className="button">
              Continue to Checkout
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
