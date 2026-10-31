import Link from "next/link";

export default function HomePage() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">AUTHENTIC ETHIOPIAN FOOD</p>

        <h1>
          Taste the Flavor of <span>Ethiopia</span>
        </h1>

        <p>
          Discover traditional Ethiopian dishes and enjoy your favorite meals
          with Addis Eats.
        </p>

        <Link href="/menu" className="button">
          Explore Our Menu
        </Link>
      </div>

      <div className="hero-food">
        <span>🍛</span>
        <span>🍗</span>
        <span>🥘</span>
      </div>
    </section>
  );
}
