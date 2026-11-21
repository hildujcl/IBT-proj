import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrderModule } from './order/order.module';
import { DishesModule } from './dishes/dishes.module';
import { LoggingModule } from './common/logging/logging.module';

@Module({
  imports: [LoggingModule, RestaurantsModule, OrderModule, DishesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
