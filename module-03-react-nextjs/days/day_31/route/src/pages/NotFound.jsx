import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
      {" "}
      <h2>404 - Page Not Found</h2>
      <p>Sorry, this page does not exist.</p>
      <Link to="/">Go Back Home</Link>
    </section>
  );
}

export default NotFound;
