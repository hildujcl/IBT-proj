import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Layout from "./components/layout";
import RequireAuth from "./components/RequireAuth";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import DishDetails from "./pages/DishDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";

function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function addToCart(dish) {
    setCart((currentCart) => [...currentCart, dish]);
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="menu" element={<Menu addToCart={addToCart} />} />

        <Route
          path="menu/:id"
          element={<DishDetails addToCart={addToCart} />}
        />

        <Route path="cart" element={<Cart cart={cart} />} />

        <Route
          path="signin"
          element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="checkout"
          element={
            <RequireAuth isLoggedIn={isLoggedIn}>
              <Checkout cart={cart} />
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
