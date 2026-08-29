import { useState } from "react";
import dishes from "./data";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import DeliveryForm from "./DeliveryForm";

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [order, setOrder] = useState([]);

  const categories = ["All", "Main", "Vegetarian", "Breakfast"];

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  const handleAdd = (dish) => {
    setOrder([...order, dish]);
  };

  const total = order.reduce((sum, dish) => sum + dish.price, 0);

  return (
    <main>
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <DishList dishes={filteredDishes} onAdd={handleAdd} />

      <div className="order-total">
        <h2>Order Total</h2>
        <p>{total} ETB</p>
      </div>

      <DeliveryForm total={total} />
    </main>
  );
}

export default Menu;
