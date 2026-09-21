import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found-number">404</div>

      <h1>Page Not Found</h1>

      <p>Sorry, the page you're looking for doesn't exist.</p>

      <Link to="/dashboard" className="primary-button">
        Back to Dashboard
      </Link>
    </section>
  );
}

export default NotFound;
