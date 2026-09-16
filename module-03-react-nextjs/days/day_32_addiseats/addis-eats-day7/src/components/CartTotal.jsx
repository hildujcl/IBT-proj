import { useCartStore } from "../store/cartStore";

export default function CartTotal() {
  const total = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.price, 0),
  );

  return <h3>Total: {total} ETB</h3>;
}
