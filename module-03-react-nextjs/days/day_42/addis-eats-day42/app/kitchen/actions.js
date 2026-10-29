"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { updateOrderStatus } from "@/lib/orders";

export async function updateKitchenOrderAction(formData) {
  const session = await getSession();

  // Only authenticated staff can update kitchen orders.
  if (!session || session.role !== "staff") {
    throw new Error("Unauthorized: staff access required.");
  }

  const orderId = formData.get("orderId");
  const status = formData.get("status");

  if (typeof orderId !== "string" || !orderId.trim()) {
    throw new Error("A valid order ID is required.");
  }

  const allowedStatuses = ["Pending", "Preparing", "Ready", "Completed"];

  if (typeof status !== "string" || !allowedStatuses.includes(status)) {
    throw new Error("Invalid order status.");
  }

  await updateOrderStatus(orderId, status);

  revalidatePath("/kitchen");
  revalidatePath("/orders");
}
