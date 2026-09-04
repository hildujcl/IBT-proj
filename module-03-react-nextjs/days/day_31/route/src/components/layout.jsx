import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      {" "}
      <header className="header">
        {" "}
        <h1>Addis Eats 🍽️</h1>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
