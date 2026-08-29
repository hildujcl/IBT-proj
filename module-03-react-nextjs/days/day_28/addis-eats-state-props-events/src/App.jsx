import Menu from "./menu";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>🍽️ Addis Eats</h1>
        <p>Delicious Ethiopian food delivered to you.</p>
      </header>

      <Menu />
    </div>
  );
}

export default App;
