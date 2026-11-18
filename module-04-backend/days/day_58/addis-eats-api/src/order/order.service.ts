import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import type { Order, Area, Page, OrderStatus, OrderLine } from './order.types';

import { ORDER_REPOSITORY } from './order.repository';

import type { OrderRepository } from './order.repository';

import { OrderNotFoundError } from './order.errors';

import { RESTAURANT_REPOSITORY } from '../restaurants/restaurants.repository';

import type { RestaurantRepository } from '../restaurants/restaurants.repository';

import { DISH_REPOSITORY } from '../dishes/dish.repository';

import type { DishRepository } from '../dishes/dish.repository';

import type { FindOrdersQuery } from './dto/find-orders.query';

import type { CreateOrderDto } from './dto/create-order.dto';

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

  all(): Order[] {
    return this.repository.all();
  }

  feesByAreaSantim(): Record<Area, number> {
    return {
      Bole: 4000,
      Kazanchis: 5000,
      Piazza: 6000,
      Mexico: 5000,
      Sarbet: 6000,
    };
  }

  summarise<K extends keyof Order>(key: K): Order[K][] {
    return this.repository.all().map((order) => order[key]);
  }

  private paginate(orders: Order[], query: FindOrdersQuery): Page<Order> {
    const filteredOrders = orders.filter((order) => {
      const matchesStatus =
        query.status === undefined || order.status === query.status;

      const matchesArea = query.area === undefined || order.area === query.area;

      return matchesStatus && matchesArea;
    });

    const sortedOrders = [...filteredOrders].sort((a, b) => {
      switch (query.sort) {
        case 'asc':
          return a.id - b.id;

        case 'totalSantim':
          return a.totalSantim - b.totalSantim;

        case '-totalSantim':
          return b.totalSantim - a.totalSantim;

        case 'desc':
        default:
          return b.id - a.id;
      }
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

    const restaurantOrders = this.repository
      .all()
      .filter((order) => order.restaurantId === restaurantId);

    return this.paginate(restaurantOrders, query);
  }

  create(dto: CreateOrderDto): Order {
    // 1. Check that the restaurant exists.
    const restaurant = this.restaurantRepository.byId(dto.restaurantId);

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant with ID ${dto.restaurantId} was not found.`,
      );
    }

    // 2. Check whether the restaurant is inactive.
    if ('isActive' in restaurant && restaurant.isActive === false) {
      throw new ConflictException(
        'Cannot create an order for an inactive restaurant.',
      );
    }

    // 3. Check dish existence and restaurant relationships.
    const selectedDishes = dto.lines.map((line) => {
      const dish = this.dishRepository.byId(line.dishId);

      if (!dish) {
        throw new NotFoundException(
          `Dish with ID ${line.dishId} was not found.`,
        );
      }

      if (dish.restaurantId !== dto.restaurantId) {
        throw new UnprocessableEntityException(
          `Dish ${line.dishId} does not belong to restaurant ${dto.restaurantId}.`,
        );
      }

      return {
        dish,
        quantity: line.quantity,
      };
    });

    // 4. Calculate order amounts using repository prices.
    const lines: OrderLine[] = selectedDishes.map(({ dish, quantity }) => {
      const lineTotalSantim = dish.priceSantim * quantity;

      return {
        dishId: dish.id,
        dishName: dish.name,
        unitPriceSantim: dish.priceSantim,
        quantity,
        lineTotalSantim,
      };
    });

    const totalSantim = lines.reduce(
      (total, line) => total + line.lineTotalSantim,
      0,
    );

    const deliveryFeeSantim = this.feesByAreaSantim()[dto.area];

    const grandTotalSantim = totalSantim + deliveryFeeSantim;

    const existingOrders = this.repository.all();

    const nextId = Math.max(0, ...existingOrders.map((order) => order.id)) + 1;

    const newOrder: Order = {
      id: nextId,
      restaurantId: dto.restaurantId,
      customerName: dto.customer,
      phone: dto.teleBirrPhone ?? '',
      area: dto.area,
      status: 'Pending',
      lines,
      totalSantim,
      deliveryFeeSantim,
      grandTotalSantim,
    };

    return this.repository.create(newOrder);
  }

  private readonly statusTransitions: Record<OrderStatus, OrderStatus[]> = {
    Pending: ['Confirmed', 'Cancelled'],
    Confirmed: ['Preparing', 'Cancelled'],
    Preparing: ['Ready'],
    Ready: ['Delivered'],
    Delivered: [],
    Cancelled: [],
  };

  updateStatus(id: number, status: OrderStatus): Order {
    const order = this.find(id);

    const allowedTransitions = this.statusTransitions[order.status];

    if (!allowedTransitions.includes(status)) {
      throw new ConflictException(
        `Cannot change order status from ${order.status} to ${status}.`,
      );
    }

    const updatedOrder = this.repository.updateStatus(id, status);

    if (!updatedOrder) {
      throw new OrderNotFoundError(id);
    }

    return updatedOrder;
  }

  remove(id: number): void {
    // Idempotent deletion: deleting an absent order is also successful.
    this.repository.remove(id);
  }
}
