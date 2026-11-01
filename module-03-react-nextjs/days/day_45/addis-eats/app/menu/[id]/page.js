import { notFound } from "next/navigation";
import Link from "next/link";

import { dishes, getDishById } from "@/lib/dishes";
import AddToCartButton from "@/components/AddToCartButton";

export function generateStaticParams() {
  return dishes.map((dish) => ({
    id: dish.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;

  const dish = getDishById(id);

  if (!dish) {
    return {
      title: "Dish not found",
    };
  }

  return {
    title: dish.name,
    description: dish.description,
    openGraph: {
      title: `${dish.name} | Addis Eats`,
      description: dish.description,
    },
  };
}

export default async function DishDetailsPage({ params }) {
  const { id } = await params;

  const dish = getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <section className="section">
      <div className="container">
        <Link href="/menu" className="text-link">
          ← Back to menu
        </Link>

        <div
          className="dish-card"
          style={{
            maxWidth: "750px",
            margin: "30px auto",
          }}
        >
          <img
            src={dish.image}
            alt={dish.name}
            className="dish-image"
            style={{ height: "350px" }}
          />

          <div className="dish-content">
            <span className="dish-category">{dish.category}</span>

            <h1>{dish.name}</h1>

            <p>{dish.description}</p>

            <div className="dish-bottom">
              <span className="price">{dish.price} ETB</span>

              <AddToCartButton dish={dish} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
