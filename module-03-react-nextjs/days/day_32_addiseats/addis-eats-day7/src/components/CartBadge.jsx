import { useCartStore } from "../store/cartStore";

export default function CartBadge() {
  const items = useCartStore((state) => state.items);

  return <span>Cart: {items.length}</span>;
}
