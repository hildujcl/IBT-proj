import Link from "next/link";
import { getDishes } from "@/lib/dishes";
import DishCard from "@/components/DishCard";

export default function HomePage() {
  const dishes = getDishes();

  return (
    <main>
      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow">AUTHENTIC ETHIOPIAN FOOD</span>

          <h1>
            Traditional Taste,
            <br />
            Modern Way ♡
          </h1>

          <p>Your favorite Ethiopian dishes, delivered fresh and fast.</p>

          <Link href="/menu" className="hero-button">
            Order Now →
          </Link>
        </div>

        <img
          src={dishes[0].image}
          alt="Ethiopian food"
          className="hero-image"
        />
      </section>

      <section className="home-menu">
        <div className="section-heading">
          <div>
            <h2>Our Menu</h2>
            <p>Discover authentic Ethiopian dishes</p>
          </div>

          <Link href="/menu">View Full Menu →</Link>
        </div>

        <div className="dish-grid">
          {dishes.slice(0, 6).map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>
    </main>
  );
}
