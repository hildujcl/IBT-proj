import { useCartStore } from "../store/cartStore";
import CartTotal from "../components/CartTotal";

export default function Cart() {
  const items = useCartStore((state) => state.items);

  const removeItem = useCartStore((state) => state.removeItem);

  const clear = useCartStore((state) => state.clear);

  return (
    <div>
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item, index) => (
            <div className="cart-item" key={`${item.id}-${index}`}>
              <div>
                <h3>{item.name}</h3>

                <p>{item.price} ETB</p>
              </div>

              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}

          <div className="cart-total">
            <CartTotal />

            <button onClick={clear}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
}
