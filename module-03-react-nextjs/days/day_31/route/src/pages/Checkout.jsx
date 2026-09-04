function Checkout({ cart }) {
  return (
    <section>
      {" "}
      <h2>Checkout 💳</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add some delicious food first!</p>
      ) : (
        <>
          <p>You are ready to complete your order.</p>

          <h3>
            Total: {cart.reduce((total, dish) => total + dish.price, 0)} ETB
          </h3>

          <button>Place Order</button>
        </>
      )}
    </section>
  );
}

export default Checkout;
