import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import { getOrdersForUser } from "@/lib/orders";

import OrderCard from "@/components/OrderCard";
import SignOutButton from "@/components/SignOutButton";

export const metadata = {
  title: "My Orders",
};

export default async function OrdersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  if (session.role === "admin") {
    redirect("/kitchen");
  }

  const orders = getOrdersForUser(session.email);

  return (
    <section className="section">
      <div className="container">
        <div className="page-heading">
          <h1>My Orders ♡</h1>

          <p>Hello, {session.name}. Here you can review your orders.</p>
          <SignOutButton />
        </div>

        {orders.length > 0 ? (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <div className="empty-state">
            <h2>No orders yet</h2>

            <p>Your placed orders will appear here.</p>
          </div>
        )}
      </div>
    </section>
  );
}
