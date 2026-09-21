import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found-icon">🍲</div>

      <span className="hero-label">OOPS!</span>

      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>The page you're looking for doesn't exist.</p>

      <Link to="/" className="hero-button">
        Back Home
      </Link>
    </section>
  );
}
