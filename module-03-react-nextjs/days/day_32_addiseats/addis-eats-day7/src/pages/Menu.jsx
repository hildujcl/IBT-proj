import { dishes } from "../data/dishes";
import { useCartStore } from "../store/cartStore";

export default function Menu() {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div>
      <h2>Our Menu</h2>
<img
  src={dish.image}
  alt={dish.name}
  className="dish-image"
/>

<div className="dish-content">
  <span className="category">{dish.category}</span>

  <h3>{dish.name}</h3>

  <p>{dish.description}</p>

  <div className="dish-bottom">
    <span className="price">{dish.price} ETB</span>

    <button onClick={() => addItem(dish)}>
      Add to Cart
    </button>
  </div>
</div>
      <div className="menu-grid">
        {dishes.map((dish) => (
          <div className="dish-card" key={dish.id}>
            <h3>{dish.name}</h3>

            <p className="price">{dish.price} ETB</p>

            <p>{dish.description}</p>

            <button onClick={() => addItem(dish)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
