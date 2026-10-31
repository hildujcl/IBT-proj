const CART_KEY = "addisEatsCart";

export function getCart() {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  window.dispatchEvent(new Event("cartUpdated"));
}

export function addToCart(dish) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === dish.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: 1,
    });
  }

  saveCart(cart);
}
