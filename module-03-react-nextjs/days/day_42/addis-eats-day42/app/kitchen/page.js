import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { orders } from "@/lib/data";

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/kitchen");
  }

  if (session.role !== "staff") {
    return (
      <main className="content">
        <h1>Forbidden</h1>
        <p>This page is available to staff only.</p>
        <Link href="/">Return home</Link>
      </main>
    );
  }

  return (
    <main className="content">
      <Link href="/">← Home</Link>
      <p className="eyebrow">STAFF AREA</p>
      <h1>Kitchen Dashboard</h1>
      <p>Signed in as {session.userId}</p>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div>
                <h2>{order.item}</h2>
                <p>Order ID: {order.id}</p>
                <p>Customer: {order.userId}</p>
                <p>Status: {order.status}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
