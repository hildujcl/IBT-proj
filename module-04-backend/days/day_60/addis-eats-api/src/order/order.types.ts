export type Area = 'Bole' | 'Kazanchis' | 'Piazza' | 'Mexico' | 'Sarbet';

export type OrderStatus =
  'Pending' | 'Confirmed' | 'Preparing' | 'Ready' | 'Delivered' | 'Cancelled';

export interface OrderLine {
  dishId: number;
  dishName: string;
  unitPriceSantim: number;
  quantity: number;
  lineTotalSantim: number;
}

export interface Order {
  readonly id: number;
  restaurantId: number;
  customerName: string;
  phone: string;
  area: Area;
  status: OrderStatus;
  lines: OrderLine[];
  totalSantim: number;
  deliveryFeeSantim: number;
  grandTotalSantim: number;
}

export interface Page<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}
