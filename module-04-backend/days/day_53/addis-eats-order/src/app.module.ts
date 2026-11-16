import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { OrderController } from '../../../day_54/addis-eats-order/src/order/order.controller';

@Module({
  imports: [OrderModule],
  controllers: [AppController, OrderController],
  providers: [AppService],
})
export class AppModule {}
