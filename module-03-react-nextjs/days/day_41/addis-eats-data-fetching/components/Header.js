"use client";

import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export default function Header() {
  const { data } = useSWR("/api/cart", fetcher);

  const cartCount =
    data?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <header className="header">
      <Link href="/" className="logo">
        ♡ Addis Eats
      </Link>

      <nav>
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/orders/1001">Orders</Link>
      </nav>

      <div className="header-actions">
        <span>⌕</span>

        <Link href="/cart" className="cart-link">
          🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        <span>◉</span>
      </div>
    </header>
  );
}
