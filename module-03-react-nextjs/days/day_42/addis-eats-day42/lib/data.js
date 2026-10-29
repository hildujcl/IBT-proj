export const menuItems = [
  {
    id: "doro-wat",
    name: "Doro Wat",
    description: "Traditional Ethiopian spicy chicken stew served with injera.",
    price: 350,
    category: "Traditional",
    image: "/images/dorowot.jpg",
  },
  {
    id: "tibs",
    name: "Tibs",
    description: "Sautéed beef with onions, peppers, and Ethiopian spices.",
    price: 400,
    category: "Meat",
    image: "/images/tibis.jpg",
  },
  {
    id: "beyaynet",
    name: "Beyaynet",
    description: "A colorful selection of Ethiopian vegetarian dishes.",
    price: 300,
    category: "Vegetarian",
    image: "/images/beyaynet.jpg",
  },
  {
    id: "firfir",
    name: "Firfir",
    description: "Injera pieces mixed with flavorful Ethiopian sauce.",
    price: 250,
    category: "Traditional",
    image: "/images/firfir.jpg",
  },
  {
    id: "shiro",
    name: "Shiro ",
    description: "A comforting Ethiopian chickpea stew.",
    price: 220,
    category: "Vegetarian",
    image: "/images/shiro.jpg",
  },
];

export const orders = [
  {
    id: "ord-1",
    userId: "demo-user-1",
    itemId: "doro-wat",
    itemName: "dorowot",
    quantity: 1,
    total: 350,
    status: "Preparing",
  },
  {
    id: "ord-2",
    userId: "demo-user-2",
    itemId: "tibs",
    itemName: "Tibis",
    quantity: 1,
    total: 400,
    status: "Delivered",
  },
];

export function getMenuItem(id) {
  return menuItems.find((item) => item.id === id);
}

export function getOrdersFor(userId) {
  return orders.filter((order) => order.userId === userId);
}

export function getOrderById(id) {
  return orders.find((order) => order.id === id);
}
