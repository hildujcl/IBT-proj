"use client";

import { useState } from "react";
import { mutate } from "swr";

export default function AddToCartButton({ dish }) {
  const [adding, setAdding] = useState(false);

  async function addToCart() {
    try {
      setAdding(true);

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dish),
      });

      if (!response.ok) {
        throw new Error("Failed to add item");
      }

      await response.json();

      await mutate("/api/cart");
    } catch (error) {
      console.error(error);
    } finally {
      setAdding(false);
    }
  }

  return (
    <button className="add-button" onClick={addToCart} disabled={adding}>
      {adding ? "Adding..." : "Add to Cart"}
    </button>
  );
}
