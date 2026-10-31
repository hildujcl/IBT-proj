import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section empty-state">
      <h1>404 — Dish Not Found</h1>

      <p>Sorry, we couldn't find the page you requested.</p>

      <Link href="/menu" className="button">
        Return to Menu
      </Link>
    </section>
  );
}
