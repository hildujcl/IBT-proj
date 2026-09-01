import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Dish from "./Dish";
import "./App.css";

function App() {
  const [dishes, setDishes] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchInput = useRef(null);

  useEffect(() => {
    searchInput.current?.focus();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMenu() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/menu.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load the menu. Please try again.");
        }

        const data = await response.json();

        const filteredData =
          category === "All"
            ? data
            : data.filter((dish) => dish.category === category);

        setDishes(filteredData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();

    return () => {
      controller.abort();
    };
  }, [category]);

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return <h2 className="message">Loading delicious dishes... 🍽️</h2>;
  }

  if (error) {
    return <h2 className="message error">{error}</h2>;
  }

  return (
    <div className="app">
      <Header />

      <main>
        <div className="controls">
          <input
            ref={searchInput}
            type="text"
            placeholder="Search for a dish..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Traditional">Traditional</option>
            <option value="Meat">Meat</option>
            <option value="Vegetarian">Vegetarian</option>
          </select>
        </div>

        {filteredDishes.length === 0 ? (
          <p className="empty">No dishes found. 🍲</p>
        ) : (
          <section className="menu">
            {filteredDishes.map((dish) => (
              <Dish key={dish.id} dish={dish} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
