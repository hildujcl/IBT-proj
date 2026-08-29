import { useState } from "react";
import PropTypes from "prop-types";

function Dish({ dish, onAdd }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(count + 1);
    onAdd(dish);
  };

  return (
    <div className="dish-card">
      <h3>{dish.name}</h3>

      <p>{dish.price} ETB</p>

      <p>Category: {dish.category}</p>

      {dish.spicy && <span className="spicy">🌶️ Spicy</span>}

      <div className="dish-actions">
        <button onClick={handleAdd}>Add</button>

        {count > 0 && <span>Added: {count}</span>}
      </div>
    </div>
  );
}

Dish.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    spicy: PropTypes.bool,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default Dish;
