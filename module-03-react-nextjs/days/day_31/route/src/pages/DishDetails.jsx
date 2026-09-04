import { Link, useParams } from "react-router-dom";
import { dishes } from "../data/dishes";

function DishDetails({ addToCart }) {
  const { id } = useParams();

  const dish = dishes.find((item) => item.id === id);

  if (!dish) {
    return <h2>Dish not found.</h2>;
  }

  return (
    <section className="details">
      {" "}
      <h2>{dish.name}</h2>
      <p>{dish.description}</p>
      <h3>{dish.price} ETB</h3>
      <button onClick={() => addToCart(dish)}>Add to Cart</button>
      <br />
      <Link to="/menu">← Back to Menu</Link>
    </section>
  );
}

export default DishDetails;
