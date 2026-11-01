export const dishes = [
  {
    id: "doro-wat",
    name: "Doro Wat",
    description:
      "A traditional Ethiopian chicken stew prepared with berbere, onions, and aromatic spices.",
    price: 350,
    category: "Traditional",
    image: "/images/dorowot.jpg",
    popular: true,
    available: true,
  },
  {
    id: "tibs",
    name: "Tibs",
    description:
      "Tender pieces of meat sautéed with onions, tomatoes, peppers, and Ethiopian spices.",
    price: 400,
    category: "Traditional",
    image: "/images/tibis.jpg",
    popular: true,
    available: true,
  },
  {
    id: "beyaynet",
    name: "Beyaynet",
    description:
      "A colorful combination of traditional Ethiopian vegetarian dishes served on injera.",
    price: 300,
    category: "Vegetarian",
    image: "/images/beyaynet.jpg",
    popular: true,
    available: true,
  },
  {
    id: "firfir",
    name: "Firfir",
    description:
      "Soft pieces of injera mixed with a flavorful Ethiopian spiced sauce.",
    price: 250,
    category: "Traditional",
    image: "/images/firfir.jpg",
    popular: false,
    available: true,
  },
  {
    id: "shiro",
    name: "Shiro Wat",
    description:
      "A comforting Ethiopian chickpea stew prepared with onions, garlic, and spices.",
    price: 220,
    category: "Vegetarian",
    image: "/images/shiro.jpg",
    popular: true,
    available: true,
  },
];

export function getDishById(id) {
  return dishes.find((dish) => dish.id === id);
}

export function getAvailableDishes() {
  return dishes.filter((dish) => dish.available);
}

export function getPopularDishes() {
  return dishes.filter((dish) => dish.popular && dish.available);
}
