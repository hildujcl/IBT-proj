import { Order } from './order.types';

// Dependency injection token
export const ORDER_REPOSITORY = 'ORDER_REPOSITORY';

// Repository interface
export interface OrderRepository {
  byId(id: number): Order | undefined;

  all(): Order[];

  create(order: Order): Order;
}

// In-memory repository
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
}
