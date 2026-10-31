const dishes = [
  {
    id: "kitfo",
    name: "Kitfo",
    price: 320,
    category: "Traditional",
    emoji: "🥩",
    summary:
      "Minced beef seasoned with mitmita and traditional Ethiopian spices.",
  },
  {
    id: "dorowot",
    name: "Doro Wat",
    price: 450,
    category: "Traditional",
    emoji: "🍗",
    summary:
      "A rich and spicy Ethiopian chicken stew traditionally served with injera.",
  },
  {
    id: "tibis",
    name: "Tibs",
    price: 380,
    category: "Traditional",
    emoji: "🍲",
    summary:
      "Tender sautéed beef prepared with onions, peppers, and Ethiopian spices.",
  },
  {
    id: "shiro",
    name: "Shiro Wat",
    price: 220,
    category: "Vegetarian",
    emoji: "🥘",
    summary:
      "A flavorful chickpea stew seasoned with traditional Ethiopian spices.",
  },
];

export function getDishes() {
  return dishes;
}

export function getDish(id) {
  return dishes.find((dish) => dish.id === id);
}
