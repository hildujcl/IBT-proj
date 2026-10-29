import "server-only";

import { randomUUID } from "node:crypto";

const orders = new Map();

export async function createOrder({ userId, items, total, deliveryAddress }) {
  if (!userId) {
    throw new Error("A user ID is required.");
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Your order must contain at least one item.");
  }

  if (typeof total !== "number" || !Number.isFinite(total) || total < 0) {
    throw new Error("Invalid order total.");
  }

  if (typeof deliveryAddress !== "string" || !deliveryAddress.trim()) {
    throw new Error("A delivery address is required.");
  }

  const order = {
    id: randomUUID(),
    userId,
    items,
    total,
    deliveryAddress: deliveryAddress.trim(),
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  orders.set(order.id, order);

  return { ...order };
}

export async function getOrdersByUser(userId) {
  return Array.from(orders.values())
    .filter((order) => order.userId === userId)
    .map((order) => ({ ...order }));
}

export async function getAllOrders() {
  return Array.from(orders.values()).map((order) => ({
    ...order,
  }));
}

export async function getOrderById(orderId) {
  const order = orders.get(orderId);
  return order ? { ...order } : null;
}

export async function updateOrderStatus(orderId, status) {
  const order = orders.get(orderId);

  if (!order) {
    throw new Error("Order not found.");
  }

  const allowedStatuses = ["Pending", "Preparing", "Ready", "Completed"];

  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid order status.");
  }

  const updatedOrder = {
    ...order,
    status,
  };

  orders.set(orderId, updatedOrder);

  return { ...updatedOrder };
}

export async function cancelOrder(orderId, userId) {
  const order = orders.get(orderId);

  if (!order) {
    throw new Error("Order not found.");
  }

  if (order.userId !== userId) {
    throw new Error("You cannot cancel another customer's order.");
  }

  if (order.status !== "Pending") {
    throw new Error("Only pending orders can be cancelled.");
  }

  orders.delete(orderId);

  return { ...order, status: "Cancelled" };
}
