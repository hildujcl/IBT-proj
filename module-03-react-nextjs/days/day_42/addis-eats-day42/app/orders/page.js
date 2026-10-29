import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getOrdersFor } from "@/lib/data";

async function OrdersContent() {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/orders");
  }

  const userOrders = getOrdersFor(session.userId);

  return (
    <main className="container">
      <h1>My Orders</h1>

      {userOrders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        userOrders.map((order) => (
          <article key={order.id}>
            <h2>{order.itemName}</h2>
            <p>Status: {order.status}</p>
            <p>{order.total} ETB</p>
          </article>
        ))
      )}
    </main>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<p>Loading your orders...</p>}>
      <OrdersContent />
    </Suspense>
  );
}
