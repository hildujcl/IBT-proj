import { NotFoundException } from '@nestjs/common';

import type { MenuDish } from './dish.types';
import type { DishRepository } from './dish.repository';
import type { RestaurantRepository } from '../restaurants/restaurants.repository';
import type { CreateDishDto } from './dto/create-dish.dto';

import { RestaurantReferenceError } from './dish.errors';

export class DishesService {
  constructor(
    private readonly dishRepository: DishRepository,
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  findAll(restaurantId?: number): MenuDish[] {
    const dishes = this.dishRepository.all();

    if (restaurantId === undefined) {
      return dishes;
    }

    return dishes.filter((dish) => dish.restaurantId === restaurantId);
  }

  findByRestaurant(restaurantId: number): MenuDish[] {
    const restaurant = this.restaurantRepository.byId(restaurantId);

    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant with ID ${restaurantId} was not found.`,
      );
    }

    return this.findAll(restaurantId);
  }

  findOne(id: number): MenuDish | undefined {
    return this.dishRepository.byId(id);
  }

  create(dto: CreateDishDto): MenuDish {
    const restaurant = this.restaurantRepository.byId(dto.restaurantId);

    if (!restaurant) {
      throw new RestaurantReferenceError(dto.restaurantId);
    }

    const dishes = this.dishRepository.all();

    const nextId =
      dishes.reduce((highestId, dish) => Math.max(highestId, dish.id), 0) + 1;

    const dish: MenuDish = {
      id: nextId,
      restaurantId: dto.restaurantId,
      name: dto.name,
      priceSantim: dto.priceSantim,
    };

    return this.dishRepository.create(dish);
  }

  remove(id: number): void {
    this.dishRepository.remove(id);
  }
}
