function Cart({ cart }) {
  return (
    <section>
      {" "}
      <h2>Your Cart 🛒</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((dish, index) => (
            <div className="cart-item" key={`${dish.id}-${index}`}>
              <h3>{dish.name}</h3>
              <p>{dish.price} ETB</p>
            </div>
          ))}

          <h3>
            Total: {cart.reduce((total, dish) => total + dish.price, 0)} ETB
          </h3>
        </>
      )}
    </section>
  );
}

export default Cart;
