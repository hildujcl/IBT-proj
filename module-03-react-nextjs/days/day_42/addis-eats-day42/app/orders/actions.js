"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { orders } from "@/lib/data";

export async function cancelOrder(formData) {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/orders");
  }

  const orderId = formData.get("orderId");

  if (typeof orderId !== "string") {
    throw new Error("Invalid order ID.");
  }

  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    throw new Error("Order not found.");
  }

  if (order.userId !== session.userId) {
    throw new Error("You are not allowed to cancel this order.");
  }

  if (order.status !== "Preparing") {
    throw new Error("This order can no longer be cancelled.");
  }

  order.status = "Cancelled";
  revalidatePath("/orders");
}
