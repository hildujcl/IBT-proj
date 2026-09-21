import { memo } from "react";

function DishCard({ dish, onAdd, onView }) {
  return (
    <article className="dish-card">
      <div className="dish-image-wrapper">
        <img src={dish.image} alt={dish.name} className="dish-image" />

        <button
          className="view-button"
          onClick={onView}
          aria-label={`View ${dish.name}`}
        >
          ♡
        </button>
      </div>

      <div className="dish-content">
        <div className="dish-top">
          <span className="dish-category">{dish.category}</span>

          <span className="dish-price">{dish.price} ETB</span>
        </div>

        <h3>{dish.name}</h3>

        <p>{dish.description}</p>

        <button className="add-button" onClick={() => onAdd(dish)}>
          Add to Cart
          <span>+</span>
        </button>
      </div>
    </article>
  );
}

export default memo(DishCard);
