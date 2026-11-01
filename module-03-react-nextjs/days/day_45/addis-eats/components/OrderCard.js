export default function OrderCard({ order }) {
  return (
    <article className="order-card">
      <div className="dish-bottom">
        <h3>Order #{order.id.slice(0, 8)}</h3>

        <span className="status">{order.status}</span>
      </div>

      <p>
        <strong>Customer:</strong> {order.customer.name}
      </p>

      <p>
        <strong>Delivery area:</strong> {order.customer.deliveryArea}
      </p>

      <p>
        <strong>Phone:</strong> {order.customer.phone}
      </p>

      <h4>Items</h4>

      {order.items.map((item) => (
        <p key={item.id}>
          {item.name} × {item.quantity}
          {" — "}
          {item.subtotal} ETB
        </p>
      ))}

      <p className="price">Total: {order.total} ETB</p>

      <p>
        <small>Placed: {new Date(order.createdAt).toLocaleString()}</small>
      </p>
    </article>
  );
}
