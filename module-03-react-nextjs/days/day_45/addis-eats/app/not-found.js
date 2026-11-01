import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container empty-state">
      <h1>Page not found</h1>

      <p>Sorry, we could not find the page you requested.</p>

      <Link href="/" className="button">
        Back to homepage
      </Link>
    </div>
  );
}
