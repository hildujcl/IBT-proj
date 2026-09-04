import { useSearchParams } from "react-router-dom";
import DishCard from "../components/DishCard";
import { dishes } from "../data/dishes";

function Menu({ addToCart }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "All";

  const categories = ["All", "Traditional", "Meat", "Vegetarian"];

  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  function handleCategoryChange(event) {
    const selectedCategory = event.target.value;

    if (selectedCategory === "All") {
      setSearchParams({});
    } else {
      setSearchParams({
        category: selectedCategory,
      });
    }
  }

  return (
    <section>
      <h2>Our Menu</h2>

      <label>
        Filter by category:
        <select value={category} onChange={handleCategoryChange}>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <div className="dish-list">
        {filteredDishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
}

export default Menu;
