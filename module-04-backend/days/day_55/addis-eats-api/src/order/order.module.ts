// orders.module.ts

import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';

import { OrderService } from './order.service';

import { ORDER_REPOSITORY, InMemoryOrderRepository } from './order.repository';

import { seedOrders } from './seed-orders';

@Module({
  controllers: [OrderController],

  providers: [
    OrderService,

    {
      provide: ORDER_REPOSITORY,

      useFactory: () => {
        return new InMemoryOrderRepository(seedOrders);
      },
    },
  ],
})
export class OrderModule {}
