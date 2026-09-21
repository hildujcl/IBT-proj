import { Link } from "react-router-dom";

import { useCartStore } from "../store/cartStore";

export default function Cart() {
  const items = useCartStore((state) => state.items);

  const addItem = useCartStore((state) => state.addItem);

  const decreaseItem = useCartStore((state) => state.decreaseItem);

  const removeItem = useCartStore((state) => state.removeItem);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className="cart-page">
      <div className="cart-heading">
        <span className="hero-label">YOUR ORDER</span>

        <h1>Your Cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>

          <h2>Your cart is empty</h2>

          <p>Add something delicious from our menu.</p>

          <Link to="/menu" className="hero-button">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <span>{item.category}</span>

                  <h3>{item.name}</h3>

                  <strong>{item.price} ETB</strong>
                </div>

                <div className="cart-controls">
                  <div className="quantity">
                    <button onClick={() => decreaseItem(item.id)}>−</button>

                    <span>{item.quantity}</span>

                    <button onClick={() => addItem(item)}>+</button>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{total} ETB</strong>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <strong>Free</strong>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>{total} ETB</strong>
            </div>

            <Link to="/checkout" className="checkout-button">
              Checkout
              <span>→</span>
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
