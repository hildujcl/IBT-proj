import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="page not-found">
      <h2>Oops!</h2>

      <p>The page you are looking for does not exist.</p>

      <Link to="/">Go Home</Link>
    </section>
  );
}

export default NotFound;
