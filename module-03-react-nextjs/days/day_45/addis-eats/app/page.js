import Link from "next/link";

import Hero from "@/components/Hero";
import DishCard from "@/components/DishCard";
import { getPopularDishes } from "@/lib/dishes";

export default function HomePage() {
  const popularDishes = getPopularDishes();

  return (
    <>
      <Hero />

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <h2>Made with love ♡</h2>

            <p>Explore some of our favorite Ethiopian dishes.</p>
          </div>

          <div className="dish-grid">
            {popularDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>

          <div
            style={{
              marginTop: "35px",
              textAlign: "center",
            }}
          >
            <Link href="/menu" className="button">
              View the full menu
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading">
          <h2>A little something for everyone</h2>

          <p>
            Traditional flavors, vegetarian favorites, and delicious meals for
            your day.
          </p>
        </div>
      </section>
    </>
  );
}
