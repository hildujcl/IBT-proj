import Dish from "./dish";
import "./index.css";

function Header() {
  return (
    <header>
      <h1>🍴 Addis Eats</h1>
      <p>Delicious Ethiopian Food</p>
    </header>
  );
}

function App() {
  const dishes = [
    { id: 1, name: "Beyaynet", price: 180 },
    { id: 2, name: "Tibs Firfir", price: 220 },
    { id: 3, name: "Doro Wot", price: 250 },
    { id: 4, name: "Kitfo", price: 300 },
    { id: 5, name: "Shiro", price: 150 },
    { id: 6, name: "Tibs", price: 280 },
  ];

  return (
    <>
      <Header />

      <main>
        <h2>Our Menu</h2>

        <div className="menu">
          {dishes.map((dish) => (
            <Dish key={dish.id} name={dish.name} price={dish.price} />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
