export const demoOrder = {
  id: "AE-1042",
  customer: "Hana",
  restaurant: "Almaz Kitchen",
  restaurantAddress: "Bole, Addis Ababa",
  deliveryAddress: "Bole Atlas, Addis Ababa",
  courier: "Abebe",
  total: 1200,
  currency: "ETB",
  createdAt: "2026-11-01T09:00:00.000Z",
  status: "On the way",

  courierLocation: {
    lat: 8.995,
    lng: 38.785,
  },

  destination: {
    lat: 8.991,
    lng: 38.789,
  },

  history: [
    {
      status: "Order confirmed",
      time: "2026-11-01T09:00:00.000Z",
    },
    {
      status: "Preparing",
      time: "2026-11-01T09:05:00.000Z",
    },
    {
      status: "Picked up",
      time: "2026-11-01T09:15:00.000Z",
    },
    {
      status: "On the way",
      time: "2026-11-01T09:20:00.000Z",
    },
  ],
};

export const demoStatuses = ["On the way", "Delivered"];
