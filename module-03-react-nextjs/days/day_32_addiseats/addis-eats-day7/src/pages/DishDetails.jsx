import { Link, useParams } from "react-router-dom";
import { dishes } from "../data/dishes";
import { useCartStore } from "../store/cartStore";

export default function DishDetails() {
  const { id } = useParams();

  const addItem = useCartStore((state) => state.addItem);

  const dish = dishes.find((item) => item.id === id);

  if (!dish) {
    return (
      <div className="not-found">
        <div className="not-found-card">
          <h1>404</h1>
          <h2>Dish Not Found</h2>
          <Link to="/menu" className="primary-button">
            Back to Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-card">
        <img src={dish.image} alt={dish.name} className="details-image" />

        <div className="details-content">
          <span className="category">{dish.category}</span>

          <h2>{dish.name}</h2>

          <p>{dish.description}</p>

          <h3 className="details-price">{dish.price} ETB</h3>

          <button onClick={() => addItem(dish)}>Add to Cart</button>

          <Link to="/menu" className="back-link">
            ← Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
