"use server";
import { placeOrder } from "./actions";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";
import { getMenuItem, orders } from "@/lib/data";

export async function placeOrder(formData) {
  const session = await getSession();

  if (!session) {
    redirect("/signin?next=/checkout");
  }

  const itemId = formData.get("itemId");

  if (typeof itemId !== "string" || !itemId.trim()) {
    throw new Error("Choose a valid menu item.");
  }

  const item = getMenuItem(itemId);

  if (!item) {
    throw new Error("Menu item not found.");
  }

  orders.push({
    id: `ord-${Date.now()}`,
    userId: session.userId,
    itemId: item.id,
    itemName: item.name,
    quantity: 1,
    total: item.price,
    status: "Preparing",
  });

  revalidatePath("/orders");
  redirect("/orders");
}
