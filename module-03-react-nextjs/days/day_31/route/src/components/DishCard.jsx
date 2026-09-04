import { Link } from "react-router-dom";

function DishCard({ dish, addToCart }) {
  return (
    <article className="dish-card">
      {" "}
      <h2>{dish.name}</h2>
      <p>{dish.description}</p>
      <p className="price">{dish.price} ETB</p>
      <Link to={`/menu/${dish.id}`}>View Details</Link>
      <button onClick={() => addToCart(dish)}>Add to Cart</button>
    </article>
  );
}

export default DishCard;
