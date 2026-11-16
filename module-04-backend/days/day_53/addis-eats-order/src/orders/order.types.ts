// order.types.ts

export type Area = 'Bole' | 'Kazanchis' | 'Piazza' | 'Mexico' | 'Sarbet';

export type OrderStatus =
  'Pending' | 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled';

export interface Dish {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  customerName: string;
  phone: string;
  dish: Dish;
  area: Area;
  status: OrderStatus;
  quantity: number;
  total: number;
}
