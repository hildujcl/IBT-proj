import { Link } from "react-router-dom";
import CartBadge from "./CartBadge";

export default function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="logo">
        Addis Eats
      </Link>

      <nav className="main-nav">
        <Link to="/">Home</Link>

        <Link to="/menu">Menu</Link>

        <Link to="/cart">
          <CartBadge />
        </Link>

        <Link to="/checkout">Checkout</Link>

        <Link to="/signin">Sign In</Link>
      </nav>
    </header>
  );
}
