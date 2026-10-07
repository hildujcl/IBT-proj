export const orders = {
  1001: {
    id: "1001",
    customer: "Abebe",
    status: "Preparing",
    total: 750,
    items: [
      {
        name: "Doro Wat",
        quantity: 1,
        price: 350,
      },
      {
        name: "Tibs",
        quantity: 1,
        price: 400,
      },
    ],
  },

  1002: {
    id: "1002",
    customer: "Marta",
    status: "Ready",
    total: 850,
    items: [
      {
        name: "Kitfo",
        quantity: 1,
        price: 650,
      },
      {
        name: "Shiro Wat",
        quantity: 1,
        price: 200,
      },
    ],
  },
};

export function getOrder(id) {
  return orders[id] || null;
}
