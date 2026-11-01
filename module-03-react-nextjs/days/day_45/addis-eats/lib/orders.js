import "server-only";

import { randomUUID } from "node:crypto";

import { dishes } from "@/lib/dishes";

const orders = new Map();

export function createOrder({ customer, items, userEmail }) {
  const orderItems = items.map((item) => {
    const dish = dishes.find(
      (availableDish) =>
        availableDish.id === item.id && availableDish.available,
    );

    if (!dish) {
      throw new Error("One of the selected dishes is unavailable.");
    }

    return {
      id: dish.id,
      name: dish.name,
      price: dish.price,
      quantity: item.quantity,
      subtotal: dish.price * item.quantity,
    };
  });

  const total = orderItems.reduce((sum, item) => sum + item.subtotal, 0);

  const order = {
    id: randomUUID(),
    userEmail,
    customer: {
      name: customer.name.trim(),
      phone: customer.phone,
      deliveryArea: customer.deliveryArea.trim(),
      notes: customer.notes || "",
    },
    items: orderItems,
    total,
    status: "received",
    createdAt: new Date().toISOString(),
  };

  orders.set(order.id, order);

  return order;
}

export function getOrdersForUser(email) {
  return Array.from(orders.values()).filter(
    (order) => order.userEmail === email,
  );
}

export function getAllOrders() {
  return Array.from(orders.values()).sort(
    (first, second) => new Date(second.createdAt) - new Date(first.createdAt),
  );
}

export function getOrderById(id) {
  return orders.get(id) || null;
}

export function updateOrderStatus(id, status) {
  const order = orders.get(id);

  if (!order) {
    return null;
  }

  const updatedOrder = {
    ...order,
    status,
  };

  orders.set(id, updatedOrder);

  return updatedOrder;
}
