import Header from "./Header";
import Dish from "./Dish";

function App() {
  const dishes = [
    {
      id: 1,
      name: "Doro Wat",
      price: 250,
    },
    {
      id: 2,
      name: "Tibs",
      price: 220,
    },
    {
      id: 3,
      name: "Beyaynet",
      price: 180,
    },
    {
      id: 4,
      name: "Firfir",
      price: 150,
    },
    {
      id: 5,
      name: "Shiro Wat",
      price: 160,
    },
  ];

  return (
    <div>
      <Header />

      <main>
        <h2>Our Menu</h2>

        {dishes.map((dish) => (
          <Dish key={dish.id} name={dish.name} price={dish.price} />
        ))}
      </main>
    </div>
  );
}

export default App;
