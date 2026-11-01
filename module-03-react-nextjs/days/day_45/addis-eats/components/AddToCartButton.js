"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addItemToCart } from "@/lib/cart";

export default function AddToCartButton({ dish }) {
  const [added, setAdded] = useState(false);
  const router = useRouter();

  function handleAddToCart() {
    addItemToCart(dish);

    setAdded(true);

    router.refresh();

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <button type="button" className="button" onClick={handleAddToCart}>
      {added ? "Added ✓" : "Add to cart"}
    </button>
  );
}
