// order.service.ts

import { Area, Order } from './order.types';

import { OrderRepository } from './order.repository';

import { OrderNotFoundError } from './order.errors';

export class OrderService {
  constructor(private readonly repository: OrderRepository) {}

  find(id: number): Order {
    const order = this.repository.byId(id);

    if (!order) {
      throw new OrderNotFoundError(id);
    }

    return order;
  }

  feesByArea(): Record<Area, number> {
    return {
      Bole: 50,
      Kazanchis: 40,
      Piazza: 45,
      Mexico: 35,
      Sarbet: 40,
    };
  }

  summarise<K extends keyof Order>(key: K): Order[K][] {
    return this.repository.all().map((order) => order[key]);
  }
}
