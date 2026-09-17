import { useCartStore } from "../store/cartStore";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Add some delicious Ethiopian dishes to get started.</p>

        <Link to="/menu" className="primary-button">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      <div className="cart-list">
        {items.map((item, index) => (
          <div className="cart-item" key={`${item.id}-${index}`}>
            <div className="cart-item-info">
              <img src={item.image} alt={item.name} className="cart-image" />

              <div>
                <h3>{item.name}</h3>
                <p>{item.price} ETB</p>
              </div>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="remove-button"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <CartTotal />

        <div className="cart-actions">
          <button onClick={clear}>Clear Cart</button>

          <Link to="/checkout" className="primary-button">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
