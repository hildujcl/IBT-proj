import { getDishes } from "../lib/dishes";
import DishCard from "../components/DishCard";

export const metadata = {
  title: "Our Menu",
  description:
    "Explore Kitfo, Doro Wat, Tibs, Shiro Wat, and other Ethiopian dishes at Addis Eats.",

  alternates: {
    canonical: "/menu",
  },

  openGraph: {
    title: "Our Menu | Addis Eats",
    description: "Explore traditional Ethiopian dishes.",
    url: "/menu",
  },
};

export default function MenuPage() {
  const dishes = getDishes();

  return (
    <section className="section">
      <div className="section-heading">
        <p className="eyebrow">FRESH AND TRADITIONAL</p>
        <h1>Our Menu</h1>
        <p>Explore our delicious Ethiopian dishes.</p>
      </div>

      <div className="dish-grid">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  );
}
