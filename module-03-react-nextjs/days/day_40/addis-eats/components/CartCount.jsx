"use client";

import { useEffect, useState } from "react";

export default function CartCount() {
  const [count, setCount] = useState(0);

  function updateCount() {
    const cart = JSON.parse(localStorage.getItem("addisEatsCart") || "[]");

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    setCount(total);
  }

  useEffect(() => {
    updateCount();

    window.addEventListener("cartUpdated", updateCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
    };
  }, []);

  if (count === 0) {
    return null;
  }

  return (
    <span className="ml-1 rounded-full bg-yellow-400 px-2 py-0.5 text-xs font-bold text-emerald-950">
      {count}
    </span>
  );
}
