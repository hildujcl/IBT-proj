import PropTypes from "prop-types";
import Dish from "./dish";

function DishList({ dishes, onAdd }) {
  if (dishes.length === 0) {
    return <p className="empty">No dishes found in this category.</p>;
  }

  return (
    <div className="dish-list">
      {dishes.map((dish) => (
        <Dish key={dish.id} dish={dish} onAdd={onAdd} />
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default DishList;
