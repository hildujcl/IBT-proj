import { useState } from "react";
import Dish from "./dish";
import Card from "./card";
import { menu } from "./data";

function Menu() {
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(menu.map((dish) => dish.category))];

  const filteredMenu =
    category === "All"
      ? menu
      : menu.filter((dish) => dish.category === category);

  return (
    <section className="menu-section">
      <h2 className="menu-title">Our Menu</h2>

      <div className="filters">
        {categories.map((item) => (
          <button key={item} onClick={() => setCategory(item)}>
            {item}
          </button>
        ))}
      </div>

      {filteredMenu.length === 0 ? (
        <p className="empty-state">No dishes found in this category.</p>
      ) : (
        <div className="menu-grid">
          {filteredMenu.map((dish) => (
            <Card key={dish.id}>
              <Dish
                name={dish.name}
                price={dish.price}
                spicy={dish.spicy}
                image={dish.image}
              />
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

export default Menu;
