export const CART_KEY = "addisEatsCart";

export function getCart() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedCart = localStorage.getItem(CART_KEY);

    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addItemToCart(dish) {
  const cart = getCart();

  const existingItem = cart.find((item) => item.id === dish.id);

  let updatedCart;

  if (existingItem) {
    updatedCart = cart.map((item) =>
      item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
    );
  } else {
    updatedCart = [
      ...cart,
      {
        id: dish.id,
        quantity: 1,
      },
    ];
  }

  saveCart(updatedCart);

  return updatedCart;
}

export function updateCartQuantity(id, quantity) {
  const cart = getCart();

  const updatedCart = cart
    .map((item) => (item.id === id ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);

  saveCart(updatedCart);

  return updatedCart;
}

export function removeCartItem(id) {
  const cart = getCart();

  const updatedCart = cart.filter((item) => item.id !== id);

  saveCart(updatedCart);

  return updatedCart;
}

export function clearCart() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CART_KEY);
  }
}
