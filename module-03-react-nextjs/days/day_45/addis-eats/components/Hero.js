import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <span className="hero-label">♡ A little taste of Ethiopia</span>

          <h1>
            Your favorite Ethiopian food,
            <span> just a click away.</span>
          </h1>

          <p>
            Discover traditional Ethiopian flavors, explore our delicious menu,
            and enjoy a simple food ordering experience.
          </p>

          <div className="hero-actions">
            <Link href="/menu" className="button">
              Explore the menu
            </Link>

            <Link href="/signup" className="button button-secondary">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
