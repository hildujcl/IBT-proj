import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <article className="dish-card">
      <Link href={`/menu/${dish.id}`}>
        <img src={dish.image} alt={dish.name} className="dish-image" />
      </Link>

      <div className="dish-content">
        <span className="dish-category">{dish.category}</span>

        <h3>
          <Link href={`/menu/${dish.id}`}>{dish.name}</Link>
        </h3>

        <p>{dish.description}</p>

        <div className="dish-bottom">
          <span className="price">{dish.price} ETB</span>

          <AddToCartButton dish={dish} />
        </div>
      </div>
    </article>
  );
}
