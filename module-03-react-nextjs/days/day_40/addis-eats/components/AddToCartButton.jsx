"use client";

export default function AddToCartButton({ dish }) {
  function addToCart() {
    const existingCart = JSON.parse(
      localStorage.getItem("addisEatsCart") || "[]",
    );

    const existingItem = existingCart.find((item) => item.id === dish.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          id: dish.id,
          name: dish.name,
          price: dish.price,
          image: dish.image,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem("addisEatsCart", JSON.stringify(updatedCart));

    // Tell the CartCount component that the cart changed
    window.dispatchEvent(new Event("cartUpdated"));
  }

  return (
    <button
      onClick={addToCart}
      className="mt-8 rounded-xl bg-emerald-700 px-6 py-4 font-bold text-white shadow-sm hover:bg-emerald-800"
    >
      🛒 Add to Cart
    </button>
  );
}
