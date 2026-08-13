// summary.js

import { withVat, format, total } from "./pricing.js";
import orders from "./orders.js";

// MAP + SPREAD
// Add a total field to every order

const ordersWithTotal = orders.map((order) => ({
  ...order,
  total: total(order.items),
}));

// FILTER
// Only orders over 500 ETB

const largeOrders = ordersWithTotal.filter((order) => {
  return order.total > 500;
});

// REDUCE
// Calculate the grand total

const grandTotal = ordersWithTotal.reduce((sum, order) => {
  return sum + order.total;
}, 0);

// PRINT SUMMARY

console.log("===== ADDIS MARKET ORDER SUMMARY =====");

ordersWithTotal.forEach((order) => {
  console.log(`Order #${order.id} - ${order.customer}: ${format(order.total)}`);
});

// ORDERS OVER 500 ETB

console.log("\n===== ORDERS OVER 500 ETB =====");

largeOrders.forEach((order) => {
  console.log(`Order #${order.id} - ${order.customer}: ${format(order.total)}`);
});

// VAT

const grandTotalWithVat = withVat(grandTotal);

console.log("\n===== TOTAL =====");
console.log(`Grand Total: ${format(grandTotal)}`);
console.log(`Grand Total + VAT: ${format(grandTotalWithVat)}`);
