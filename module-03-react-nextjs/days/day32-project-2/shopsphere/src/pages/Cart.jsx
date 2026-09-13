import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    totalPrice,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  if (cart.length === 0) {
    return (
      <section className="page empty-cart">
        <h2>Your Cart Is Empty</h2>

        <p>Add some products to your cart.</p>

        <Link to="/products">Start Shopping</Link>
      </section>
    );
  }

  return (
    <section className="page">
      <h2>Shopping Cart</h2>

      <div className="cart-list">
        {cart.map((item) => (
          <article className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} />

            <div>
              <h3>{item.title}</h3>

              <p>{item.price} ETB</p>

              <div className="quantity">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>

                <span>{item.quantity}</span>

                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>

              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </article>
        ))}
      </div>

      <div className="cart-total">
        <h2>Total: {totalPrice} ETB</h2>

        <button>Checkout</button>
      </div>
    </section>
  );
}

export default Cart;
