"use client";

import Link from "next/link";
import useSWR from "swr";

import { fetcher } from "@/lib/fetcher";

export default function CheckoutPage() {
  const { data, isLoading } = useSWR("/api/cart", fetcher);

  if (isLoading) {
    return <main className="checkout-page">Loading checkout...</main>;
  }

  const cart = data || [];

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="checkout-page">
      <div className="checkout-card">
        <div className="checkout-title">
          <h1>Checkout</h1>

          <span>1 Details</span>
          <span>2 Payment</span>
        </div>

        <h2>Delivery Information</h2>

        <div className="checkout-grid">
          <label>
            Full Name *
            <input type="text" placeholder="Enter your name" />
          </label>

          <label>
            TeleBirr Phone *
            <input type="text" placeholder="09XXXXXXXX" />
          </label>

          <label>
            Delivery Area *
            <select>
              <option>Select area</option>
              <option>Bole</option>
              <option>Arada</option>
              <option>Piassa</option>
              <option>Kazanchis</option>
            </select>
          </label>

          <label>
            Notes
            <textarea placeholder="Any special requests?" />
          </label>
        </div>

        <div className="checkout-summary">
          <span>Order Total</span>

          <strong>ETB {total}</strong>
        </div>

        <button className="pay-button">Pay with TeleBirr · ETB {total}</button>

        <Link href="/cart" className="back-link">
          ← Back to Cart
        </Link>
      </div>
    </main>
  );
}
