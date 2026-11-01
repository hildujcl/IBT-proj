import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <span className="not-found-icon">🍓</span>
        <span className="eyebrow">OOPS!</span>
        <h1>Order not found</h1>
        <p>
          We couldn't find that delivery. Please check the order number and try
          again.
        </p>

        <Link href="/" className="primary-button">
          Back to home →
        </Link>
      </div>
    </main>
  );
}
