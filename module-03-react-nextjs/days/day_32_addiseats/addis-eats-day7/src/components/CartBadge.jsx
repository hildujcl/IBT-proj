import { useCartStore } from "../store/cartStore";

export default function CartBadge() {
  const items = useCartStore((state) => state.items);

  return <span className="cart-badge">Cart: {items.length}</span>;
}
