function Dish({ dish }) {
  return (
    <article className="dish-card">
      <img src={dish.image} alt={dish.name} />

      <div className="dish-info">
        <div className="dish-title">
          <h2>{dish.name}</h2>

          {dish.spicy && <span className="spicy">🌶️ Spicy</span>}
        </div>

        <p className="category">{dish.category}</p>
        <p className="price">{dish.price} ETB</p>
      </div>
    </article>
  );
}

export default Dish;
