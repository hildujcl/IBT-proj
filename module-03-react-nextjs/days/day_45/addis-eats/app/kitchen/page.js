import { redirect } from "next/navigation";

import { getSession } from "@/lib/session";
import KitchenDashboard from "@/components/KitchenDashboard";

export const metadata = {
  title: "Kitchen Dashboard",
};

export default async function KitchenPage() {
  const session = await getSession();

  if (!session) {
    redirect("/signin");
  }

  if (session.role !== "admin") {
    redirect("/orders");
  }

  return (
    <section className="section">
      <div className="container">
        <div className="page-heading">
          <h1>Kitchen Dashboard ♡</h1>

          <p>
            Welcome, {session.name}. Manage incoming customer orders and update
            their status.
          </p>
        </div>

        <KitchenDashboard />
      </div>
    </section>
  );
}
