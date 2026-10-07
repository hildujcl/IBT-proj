import { getOrder } from "@/lib/orders";
import OrderStatus from "./OrderStatus";

export default async function OrderPage({ params }) {
  const { id } = await params;

  const order = getOrder(id);

  if (!order) {
    return (
      <main className="center-page">
        <h1>Order not found 😭</h1>
        <p>We could not find this order.</p>
      </main>
    );
  }

  return (
    <main className="order-page">
      <p className="back-link">← Back to Orders</p>

      <OrderStatus id={id} initialOrder={order} />
    </main>
  );
}
