// order.repository.ts

import { Order } from './order.types';

export interface OrderRepository {
  byId(id: number): Order | undefined;

  all(): Order[];
}

export class InMemoryOrderRepository implements OrderRepository {
  private readonly orders: Map<number, Order>;

  constructor(initialOrders: Order[] = []) {
    this.orders = new Map<number, Order>();

    for (const order of initialOrders) {
      this.orders.set(order.id, order);
    }
  }

  byId(id: number): Order | undefined {
    return this.orders.get(id);
  }

  all(): Order[] {
    return Array.from(this.orders.values());
  }
}
