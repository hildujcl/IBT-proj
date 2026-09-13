import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="page">
      <h2>404 - Page Not Found</h2>

      <p>Sorry, the page you are looking for does not exist.</p>

      <Link to="/">Return Home</Link>
    </section>
  );
}

export default NotFound;
