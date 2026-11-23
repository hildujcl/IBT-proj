import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrderModule } from './order/order.module';
import { DishesModule } from './dishes/dishes.module';

// Middleware
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';

// Guards
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { RolesGuard } from './common/guards/roles.guard';

// Interceptors
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    RestaurantsModule,
    OrderModule,
    DishesModule,
  ],

  controllers: [AppController],

  providers: [
    AppService,

    // Global Guards
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },

    // Global Interceptors
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
