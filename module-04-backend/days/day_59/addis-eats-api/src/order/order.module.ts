import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

import { ORDER_REPOSITORY, InMemoryOrderRepository } from './order.repository';

import { seedOrders } from './seed-orders';

import { RestaurantsModule } from '../restaurants/restaurants.module';
import { DishesModule } from '../dishes/dishes.module';

@Module({
  imports: [RestaurantsModule, DishesModule],

  controllers: [OrderController],

  providers: [
    OrderService,
    {
      provide: ORDER_REPOSITORY,
      useFactory: () => new InMemoryOrderRepository(seedOrders),
    },
  ],
})
export class OrderModule {}
