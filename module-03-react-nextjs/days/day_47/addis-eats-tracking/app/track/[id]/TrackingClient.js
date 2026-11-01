"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import MapPanel from "./MapPanel";

import { formatCurrency, formatDate, formatTime } from "@/lib/format";

import { downloadCsv } from "@/lib/csv";

const statusSteps = [
  "Order confirmed",
  "Preparing",
  "Picked up",
  "On the way",
  "Delivered",
];

export default function TrackingClient({ order }) {
  const [status, setStatus] = useState(order.status);
  const [history, setHistory] = useState(order.history);
  const [connection, setConnection] = useState("Connecting");
  const [updatedAt, setUpdatedAt] = useState(
    order.history[order.history.length - 1].time,
  );
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    const eventSource = new EventSource(`/api/orders/${order.id}/stream`);

    eventSource.onopen = () => {
      setConnection("Connected");
    };

    eventSource.onmessage = (event) => {
      const update = JSON.parse(event.data);

      setStatus(update.status);
      setUpdatedAt(update.time);

      setHistory((previous) => {
        const lastItem = previous[previous.length - 1];

        if (lastItem?.status === update.status) {
          return previous;
        }

        return [
          ...previous,
          {
            status: update.status,
            time: update.time,
          },
        ];
      });

      if (update.status === "Delivered") {
        setConnection("Completed");
        eventSource.close();
      }
    };

    eventSource.onerror = () => {
      setConnection("Reconnecting");
    };

    return () => {
      eventSource.close();
    };
  }, [order.id]);

  const currentStep = statusSteps.indexOf(status);

  function handleExport() {
    const rows = history.map((item) => ({
      orderId: order.id,
      restaurant: order.restaurant,
      status: item.status,
      date: formatDate(item.time),
      courier: order.courier,
      total: order.total,
    }));

    downloadCsv(rows, `${order.id}-history.csv`);
  }

  function handleUpload(event) {
    const file = event.target.files?.[0];

    setUploadMessage("");

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setUploadMessage("Please select a CSV file.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setUploadMessage("The file must be smaller than 2 MB.");
      event.target.value = "";
      return;
    }

    setUploadMessage(
      `${file.name} selected successfully. Basic file checks passed; its rows have not been imported.`,
    );

    event.target.value = "";
  }

  return (
    <main className="tracking-page">
      <nav className="tracking-navbar">
        <Link href="/" className="brand">
          <span className="brand-icon">🍓</span>
          <span>Addis Eats</span>
        </Link>

        <Link href="/" className="back-home">
          ← Back to home
        </Link>
      </nav>

      <section className="tracking-intro">
        <div>
          <span className="eyebrow">YOUR DELIVERY JOURNEY</span>
          <h1>
            Track your order <span>♡</span>
          </h1>
          <p>Your delicious order is making its way to you.</p>
        </div>

        <div className="order-number">
          <span>ORDER NUMBER</span>
          <strong>{order.id}</strong>
          <small>
            <span className="live-dot"></span>
            {connection}
          </small>
        </div>
      </section>

      <section className="tracking-layout">
        <div className="tracking-main">
          <MapPanel order={order} />

          <section className="panel progress-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">ORDER PROGRESS</span>
                <h2>Almost there!</h2>
              </div>

              <span className="status-pill">{status}</span>
            </div>

            <div className="progress-track">
              {statusSteps.map((step, index) => {
                const completed = index <= currentStep;

                return (
                  <div
                    className={`progress-step ${completed ? "completed" : ""}`}
                    key={step}
                  >
                    <div className="step-circle">
                      {completed ? "✓" : index + 1}
                    </div>

                    <span>{step}</span>
                  </div>
                );
              })}
            </div>

            <div className="last-update">
              <span>Last update</span>
              <strong>{formatDate(updatedAt)}</strong>
            </div>
          </section>

          <section className="panel history-panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">YOUR ORDER ACTIVITY</span>
                <h2>Delivery updates</h2>
              </div>
              <span className="history-count">{history.length} updates</span>
            </div>

            <div className="history-list">
              {history.map((item, index) => (
                <div className="history-item" key={`${item.status}-${index}`}>
                  <div className="history-marker">
                    <span>✓</span>
                  </div>

                  <div className="history-info">
                    <strong>{item.status}</strong>
                    <span>{formatDate(item.time)}</span>
                  </div>

                  <span className="history-time">{formatTime(item.time)}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="tracking-sidebar">
          <section className="panel courier-panel">
            <span className="eyebrow">YOUR COURIER</span>

            <div className="courier-profile">
              <div className="courier-avatar">🛵</div>
              <div>
                <h3>{order.courier}</h3>
                <p>Your delivery partner</p>
              </div>
            </div>

            <div className="courier-message">
              <span>💗</span>
              <p>Your courier is on the way with your order!</p>
            </div>
          </section>

          <section className="panel order-details">
            <span className="eyebrow">ORDER SUMMARY</span>
            <h2>Delicious details</h2>

            <div className="detail-row">
              <span>Restaurant</span>
              <strong>{order.restaurant}</strong>
            </div>

            <div className="detail-row">
              <span>Pickup area</span>
              <strong>{order.restaurantAddress}</strong>
            </div>

            <div className="detail-row">
              <span>Delivery address</span>
              <strong>{order.deliveryAddress}</strong>
            </div>

            <div className="detail-row">
              <span>Order date</span>
              <strong>{formatDate(order.createdAt)}</strong>
            </div>

            <div className="total-row">
              <span>Total amount</span>
              <strong>{formatCurrency(order.total)}</strong>
            </div>
          </section>

          <section className="panel records-panel">
            <span className="eyebrow">YOUR RECORDS</span>
            <h2>Order history</h2>

            <p>Download your delivery activity as a CSV spreadsheet.</p>

            <button
              type="button"
              className="download-button"
              onClick={handleExport}
            >
              ↓ Download CSV
            </button>

            <div className="upload-area">
              <label htmlFor="csv-upload">
                <span>＋</span>
                Select a CSV file
              </label>

              <input
                id="csv-upload"
                type="file"
                accept=".csv,text/csv"
                onChange={handleUpload}
              />

              <small>CSV files only · Maximum 2 MB</small>

              {uploadMessage && (
                <p className="upload-message" role="status">
                  {uploadMessage}
                </p>
              )}
            </div>
          </section>
        </aside>
      </section>

      <footer className="footer tracking-footer">
        <Link href="/" className="brand">
          <span className="brand-icon">🍓</span>
          <span>Addis Eats</span>
        </Link>
        <p>Made with ♡ in Addis Ababa.</p>
        <span>Demo delivery tracking experience</span>
      </footer>
    </main>
  );
}
