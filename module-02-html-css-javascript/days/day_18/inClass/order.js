// orders.js

const orders = [
  {
    id: 1,
    customer: "Hana",
    items: [
      { name: "Injera", price: 50, qty: 2 },
      { name: "Shiro", price: 100, qty: 2 },
    ],
  },

  {
    id: 2,
    customer: "Dawit",
    items: [
      { name: "Tibs", price: 300, qty: 2 },
      { name: "Coffee", price: 80, qty: 1 },
    ],
  },

  {
    id: 3,
    customer: "Marta",
    items: [
      { name: "Chicken", price: 350, qty: 2 },
      { name: "Juice", price: 100, qty: 1 },
    ],
  },

  {
    id: 4,
    customer: "Abel",
    items: [
      { name: "Shiro", price: 120, qty: 1 },
      { name: "Coffee", price: 80, qty: 2 },
    ],
  },
];

export default orders;
