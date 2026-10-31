"use client";

import { addToCart } from "../lib/cart";

export default function AddToCartButton({ dish }) {
  return (
    <button className="button" onClick={() => addToCart(dish)}>
      Add to Cart
    </button>
  );
}
