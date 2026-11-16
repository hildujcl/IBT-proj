import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import type { Order, Area, Page, OrderStatus } from './order.types';

import { ORDER_REPOSITORY } from './order.repository';
import type { OrderRepository } from './order.repository';

import { OrderNotFoundError } from './order.errors';

import { RESTAURANT_REPOSITORY } from '../restaurants/restaurants.repository';

import type { RestaurantRepository } from '../restaurants/restaurants.repository';

import { DISH_REPOSITORY } from '../dishes/dish.repository';

import type { DishRepository } from '../dishes/dish.repository';

import type { FindOrdersQuery } from './dto/find-orders.query';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repository: OrderRepository,

    @Inject(RESTAURANT_REPOSITORY)
    private readonly restaurantRepository: RestaurantRepository,

    @Inject(DISH_REPOSITORY)
    private readonly dishRepository: DishRepository,
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

  private paginate(orders: Order[], query: FindOrdersQuery): Page<Order> {
    const filteredOrders = orders.filter((order) => {
      const matchesStatus =
        query.status === undefined || order.status === query.status;

      const matchesArea = query.area === undefined || order.area === query.area;

      return matchesStatus && matchesArea;
    });

    const sortedOrders = [...filteredOrders].sort((a, b) => {
      return query.sort === 'asc' ? a.id - b.id : b.id - a.id;
    });

    return {
      data: sortedOrders.slice(query.offset, query.offset + query.limit),
      total: filteredOrders.length,
      limit: query.limit,
      offset: query.offset,
    };
  }

  findAll(query: FindOrdersQuery): Page<Order> {
    return this.paginate(this.repository.all(), query);
  }

  findPending(query: FindOrdersQuery): Page<Order> {
    return this.paginate(this.repository.all(), {
      ...query,
      status: 'Pending',
    });
  }

  findByRestaurant(restaurantId: number, query: FindOrdersQuery): Page<Order> {
    const restaurant = this.restaurantRepository.byId(restaurantId);

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant with ID ${restaurantId} was not found.`,
      );
    }

    const restaurantDishIds = new Set(
      this.dishRepository
        .all()
        .filter((dish) => dish.restaurantId === restaurantId)
        .map((dish) => dish.id),
    );

    const restaurantOrders = this.repository
      .all()
      .filter((order) => restaurantDishIds.has(order.dish.id));

    return this.paginate(restaurantOrders, query);
  }

  create(order: Order): Order {
    return this.repository.create(order);
  }

  updateStatus(id: number, status: OrderStatus): Order {
    this.find(id);

    const updatedOrder = this.repository.updateStatus(id, status);

    if (!updatedOrder) {
      throw new OrderNotFoundError(id);
    }

    return updatedOrder;
  }

  remove(id: number): void {
    this.find(id);

    this.repository.remove(id);
  }
}
