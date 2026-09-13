import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="navbar">
      <h1>ShopSphere</h1>

      <nav>
        <NavLink to="/">Home</NavLink>

        <NavLink to="/products">Products</NavLink>

        <NavLink to="/categories">Categories</NavLink>

        <NavLink to="/cart">Cart ({totalItems})</NavLink>

        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
