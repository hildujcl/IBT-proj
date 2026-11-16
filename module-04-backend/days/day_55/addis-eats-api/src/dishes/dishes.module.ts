import { Module } from '@nestjs/common';

import { RestaurantsModule } from '../restaurants/restaurants.module';

import {
  RESTAURANT_REPOSITORY,
  RestaurantRepository,
} from '../restaurants/restaurants.repository';

import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';

import { DISH_REPOSITORY, InMemoryDishRepository } from './dish.repository';

import { seedDishes } from './dishes.seed';

@Module({
  imports: [RestaurantsModule],

  controllers: [DishesController],

  providers: [
    {
      provide: DISH_REPOSITORY,
      useFactory: () => {
        return new InMemoryDishRepository(seedDishes);
      },
    },

    {
      provide: DishesService,
      useFactory: (
        dishRepository: InMemoryDishRepository,
        restaurantRepository: RestaurantRepository,
      ) => {
        return new DishesService(dishRepository, restaurantRepository);
      },
      inject: [DISH_REPOSITORY, RESTAURANT_REPOSITORY],
    },
  ],
})
export class DishesModule {}
