"use client";

import { useEffect, useState } from "react";

import OrderCard from "@/components/OrderCard";

export default function KitchenDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOrders() {
    try {
      const response = await fetch("/api/orders");

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setOrders(result.orders);
      setError("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function changeStatus(id, status) {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setOrders((previous) =>
        previous.map((order) => (order.id === id ? result.order : order)),
      );
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  if (loading) {
    return <div className="loading-screen">Loading kitchen orders...</div>;
  }

  return (
    <div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="dish-bottom">
        <h2>Incoming orders</h2>

        <button
          type="button"
          className="button button-secondary"
          onClick={loadOrders}
        >
          Refresh orders
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <h3>No orders available</h3>
          <p>New customer orders will appear here.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <OrderCard order={order} />

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "25px",
              }}
            >
              <button
                type="button"
                className="button button-secondary"
                onClick={() => changeStatus(order.id, "preparing")}
              >
                Preparing
              </button>

              <button
                type="button"
                className="button"
                onClick={() => changeStatus(order.id, "ready")}
              >
                Mark ready
              </button>

              <button
                type="button"
                className="button button-danger"
                onClick={() => changeStatus(order.id, "cancelled")}
              >
                Cancel
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
