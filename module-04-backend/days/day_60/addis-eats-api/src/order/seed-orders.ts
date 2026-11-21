import type { Order } from './order.types';

export const seedOrders: Order[] = [
  {
    id: 1,
    restaurantId: 2,
    customerName: 'Hana',
    phone: '0912345678',
    area: 'Bole',
    status: 'Pending',
    lines: [
      {
        dishId: 4,
        dishName: 'Tibs Firfir',
        unitPriceSantim: 22000,
        quantity: 2,
        lineTotalSantim: 44000,
      },
    ],
    totalSantim: 44000,
    deliveryFeeSantim: 4000,
    grandTotalSantim: 48000,
  },
  {
    id: 2,
    restaurantId: 1,
    customerName: 'Abel',
    phone: '0911223344',
    area: 'Piazza',
    status: 'Preparing',
    lines: [
      {
        dishId: 1,
        dishName: 'Beyaynet',
        unitPriceSantim: 18000,
        quantity: 1,
        lineTotalSantim: 18000,
      },
    ],
    totalSantim: 18000,
    deliveryFeeSantim: 6000,
    grandTotalSantim: 24000,
  },
  {
    id: 3,
    restaurantId: 1,
    customerName: 'Sara',
    phone: '0913456789',
    area: 'Kazanchis',
    status: 'Ready',
    lines: [
      {
        dishId: 2,
        dishName: 'Doro Wot',
        unitPriceSantim: 25000,
        quantity: 1,
        lineTotalSantim: 25000,
      },
    ],
    totalSantim: 25000,
    deliveryFeeSantim: 5000,
    grandTotalSantim: 30000,
  },
];
