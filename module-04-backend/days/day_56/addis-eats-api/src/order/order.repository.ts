import type { Order, OrderStatus } from './order.types';

export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

export interface OrderRepository {
  byId(id: number): Order | undefined;
  all(): Order[];
  create(order: Order): Order;
  updateStatus(id: number, status: OrderStatus): Order | undefined;
  remove(id: number): boolean;
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

  create(order: Order): Order {
    this.orders.set(order.id, order);
    return order;
  }

  updateStatus(id: number, status: OrderStatus): Order | undefined {
    const order = this.orders.get(id);

    if (!order) return undefined;

    const updatedOrder: Order = {
      ...order,
      status,
    };

    this.orders.set(id, updatedOrder);

    return updatedOrder;
  }

  remove(id: number): boolean {
    return this.orders.delete(id);
  }
}
