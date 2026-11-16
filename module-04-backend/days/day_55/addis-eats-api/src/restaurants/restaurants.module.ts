import { Module } from '@nestjs/common';

import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';

import {
  RESTAURANT_REPOSITORY,
  InMemoryRestaurantRepository,
} from './restaurants.repository';

import { seedRestaurants } from './resturants.seed';

@Module({
  controllers: [RestaurantsController],

  providers: [
    {
      provide: RESTAURANT_REPOSITORY,
      useFactory: () => {
        return new InMemoryRestaurantRepository(seedRestaurants);
      },
    },

    {
      provide: RestaurantsService,
      useFactory: (repository: InMemoryRestaurantRepository) => {
        return new RestaurantsService(repository);
      },
      inject: [RESTAURANT_REPOSITORY],
    },
  ],

  exports: [RESTAURANT_REPOSITORY],
})
export class RestaurantsModule {}
