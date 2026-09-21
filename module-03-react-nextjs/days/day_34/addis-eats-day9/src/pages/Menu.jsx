import { useEffect, useRef, useState } from "react";

import { Profiler } from "react";

import DishCard from "../components/DishCard";
import DishModal from "../components/DishModal";

import { useCartStore } from "../store/cartStore";

const categories = ["All", "Meat", "Vegetarian", "Traditional"];

export default function Menu() {
  const [dishes, setDishes] = useState([]);

  const [category, setCategory] = useState("All");

  const [selectedDish, setSelectedDish] = useState(null);

  const lastFocusedElement = useRef(null);

  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetch("/dishes.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load dishes");
        }

        return response.json();
      })

      .then((data) => {
        setDishes(data);
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  function openModal(dish) {
    lastFocusedElement.current = document.activeElement;

    setSelectedDish(dish);
  }

  function closeModal() {
    setSelectedDish(null);

    setTimeout(() => {
      lastFocusedElement.current?.focus();
    }, 0);
  }

  function handleProfiler(id, phase, actualDuration, baseDuration) {
    console.log({
      id,
      phase,
      actualDuration,
      baseDuration,
    });
  }

  return (
    <section className="menu-page">
      <div className="menu-heading">
        <div>
          <span className="hero-label">DISCOVER</span>

          <h1>Our Menu</h1>

          <p>Discover the rich flavors of Ethiopia.</p>
        </div>
      </div>

      <div className="category-list">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "category active" : "category"}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <Profiler id="Menu" onRender={handleProfiler}>
        <div className="dish-grid">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onAdd={addItem}
              onView={() => openModal(dish)}
            />
          ))}
        </div>
      </Profiler>

      <DishModal dish={selectedDish} onClose={closeModal} />
    </section>
  );
}
