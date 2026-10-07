export const dishes = [
  {
    id: 1,
    name: "Doro Wat",
    description: "Spicy chicken stew with boiled egg, served with injera.",
    price: 350,
    category: "Traditional",
    image: "/image/dorowot.jpg",
  },
  {
    id: 2,
    name: "Tibs",
    description: "Sauteed beef with onions, peppers and Ethiopian spices.",
    price: 400,
    category: "Meat",
    image: "/image/tibis.jpg",
  },
  {
    id: 3,
    name: "Beyaynet",
    description: "A combination of Ethiopian stews served with injera.",
    price: 300,
    category: "Vegetarian",
    image: "/image/beyaynet.jpg",
  },
  {
    id: 4,
    name: "Firfir",
    description: "Spicy shredded injera mixed with berbere and butter.",
    price: 250,
    category: "Traditional",
    image: "/image/firfir.jpg",
  },
  {
    id: 5,
    name: "Shiro Wat",
    description: "Creamy chickpea stew prepared with Ethiopian spices.",
    price: 220,
    category: "Vegetarian",
    image: "/image/shiro.jpg",
  },
  {
    id: 6,
    name: "Kitfo",
    description: "Traditional Ethiopian minced beef dish.",
    price: 650,
    category: "Meat",
    image: "/image/kitfo.jpg",
  },
  {
    id: 7,
    name: "Chicken Tibs",
    description: "Tender chicken cooked with onions, peppers and spices.",
    price: 450,
    category: "Meat",
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Vegetable Platter",
    description: "Fresh seasonal vegetables served Ethiopian style.",
    price: 280,
    category: "Vegetarian",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
  },
];

export function getDishes() {
  return dishes;
}

export function getDishById(id) {
  return dishes.find((dish) => dish.id === Number(id));
}
