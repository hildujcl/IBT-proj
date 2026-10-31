"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart } from "../lib/cart";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function updateCartCount() {
      const cart = getCart();

      const total = cart.reduce((sum, item) => sum + item.quantity, 0);

      setCartCount(total);
    }

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <header className="navbar">
      <Link href="/" className="logo">
        🍲 Addis <span>Eats</span>
      </Link>

      <nav>
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/cart">Cart ({cartCount})</Link>
      </nav>
    </header>
  );
}
