import { Link } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

export default function Checkout() {
  const items = useCartStore((state) => state.items);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h2>Checkout</h2>

        {items.length === 0 ? (
          <>
            <p>Your cart is empty.</p>

            <Link to="/menu" className="primary-button">
              Go to Menu
            </Link>
          </>
        ) : (
          <>
            <p>
              You have {items.length} item
              {items.length !== 1 ? "s" : ""} in your cart.
            </p>

            <h3>Total: {total} ETB</h3>

            <button>Place Order</button>
          </>
        )}
      </div>
    </div>
  );
}
