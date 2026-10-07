"use client";

import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const statuses = ["Pending", "Preparing", "Ready", "Delivered"];

export default function OrderStatus({ id, initialOrder }) {
  const { data, error } = useSWR(`/api/orders/${id}`, fetcher, {
    fallbackData: initialOrder,
    refreshInterval: 5000,
  });

  if (error) {
    return <div className="error-box">Could not load order.</div>;
  }

  const currentIndex = statuses.indexOf(data.status);

  return (
    <section className="order-card">
      <div className="live-box">
        🟢 Live Updates
        <small>Refreshing every 5s</small>
      </div>

      <h1>Order #{data.id}</h1>

      <p className="order-date">Customer: {data.customer}</p>

      <div className="status-timeline">
        {statuses.map((status, index) => {
          const complete = index <= currentIndex;

          return (
            <div
              key={status}
              className={complete ? "status-item complete" : "status-item"}
            >
              <div className="status-circle">{complete ? "✓" : "○"}</div>

              <div>
                <strong>{status}</strong>

                {status === data.status && (
                  <p>Your order is being prepared for you.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="order-total">
        <span>Total</span>
        <strong>ETB {data.total}</strong>
      </div>
    </section>
  );
}
