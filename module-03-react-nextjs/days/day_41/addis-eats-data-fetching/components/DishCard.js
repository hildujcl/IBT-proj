"use client";

import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <article className="dish-card">
      <Link href={`/menu/${dish.id}`}>
        <img src={dish.image} alt={dish.name} className="dish-image" />
      </Link>

      <div className="dish-content">
        <Link href={`/menu/${dish.id}`}>
          <h3>{dish.name}</h3>
        </Link>

        <p>{dish.description}</p>

        <div className="dish-bottom">
          <strong>ETB {dish.price}</strong>

          <AddToCartButton dish={dish} />
        </div>
      </div>
    </article>
  );
}
