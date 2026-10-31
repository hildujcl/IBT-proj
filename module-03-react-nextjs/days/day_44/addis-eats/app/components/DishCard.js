import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <article className="dish-card">
      <Link href={`/menu/${dish.id}`} className="dish-image">
        <span>{dish.emoji}</span>
      </Link>

      <div className="dish-content">
        <p className="category">{dish.category}</p>

        <h2>
          <Link href={`/menu/${dish.id}`}>{dish.name}</Link>
        </h2>

        <p>{dish.summary}</p>

        <div className="dish-bottom">
          <strong>{dish.price} ETB</strong>
          <AddToCartButton dish={dish} />
        </div>
      </div>
    </article>
  );
}
