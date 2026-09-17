import { useSearchParams, Link } from "react-router-dom";
import { dishes } from "../data/dishes";
import { useCartStore } from "../store/cartStore";

export default function Menu() {
  const addItem = useCartStore((state) => state.addItem);

  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "All";

  const categories = ["All", "Traditional", "Meat", "Vegetarian"];

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  const handleCategoryChange = (event) => {
    const value = event.target.value;

    if (value === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  return (
    <div className="menu-page">
      <div className="menu-heading">
        <div>
          <p className="welcome">DISCOVER OUR FOOD</p>
          <h2>Our Menu</h2>
        </div>

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-select"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="menu-grid">
        {filteredDishes.map((dish) => (
          <div className="dish-card" key={dish.id}>
            <Link to={`/menu/${dish.id}`} className="dish-image-link">
              <img src={dish.image} alt={dish.name} className="dish-image" />
            </Link>

            <div className="dish-content">
              <span className="category">{dish.category}</span>

              <h3>{dish.name}</h3>

              <p>{dish.description}</p>

              <div className="dish-bottom">
                <span className="price">{dish.price} ETB</span>

                <button onClick={() => addItem(dish)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
