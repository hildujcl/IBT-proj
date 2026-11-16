import { Injectable, Inject } from '@nestjs/common';

import type { Order, Area } from './order.types';

import { ORDER_REPOSITORY } from './order.repository';
import type { OrderRepository } from './order.repository';

import { OrderNotFoundError } from './order.errors';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repository: OrderRepository,
  ) {}

  find(id: number): Order {
    const order = this.repository.byId(id);

    if (!order) {
      throw new OrderNotFoundError(id);
    }

    return order;
  }

  feesByArea(): Record<Area, number> {
    return {
      Bole: 40,
      Kazanchis: 50,
      Piazza: 60,
      Mexico: 50,
      Sarbet: 60,
    };
  }

  summarise<K extends keyof Order>(key: K): Order[K][] {
    return this.repository.all().map((order) => order[key]);
  }
  all(): Order[] {
    return this.repository.all();
  }

  create(order: Order): Order {
    return this.repository.create(order);
  }
}
