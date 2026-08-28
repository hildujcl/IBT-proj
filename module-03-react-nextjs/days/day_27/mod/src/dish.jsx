import PropTypes from "prop-types";

function Dish({ name, price, spicy = false, currency = "ETB", image }) {
  return (
    <>
      <img src={image} alt={name} className="dish-image" />

      <h3>{name}</h3>

      <p>
        {price} {currency}
      </p>

      {Boolean(spicy) && <span className="spicy">🌶️ Spicy</span>}
    </>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  image: PropTypes.string,
};

export default Dish;
