import { Link } from "react-router-dom";

export default function Receipt() {
  return (
    <section className="receipt-page">
      <div className="receipt-card">
        <div className="success-icon">✓</div>

        <span className="hero-label">ORDER CONFIRMED</span>

        <h1>Thank you!</h1>

        <p>Your Addis Eats order has been received.</p>

        <Link to="/menu" className="hero-button">
          Order Again
        </Link>
      </div>
    </section>
  );
}
