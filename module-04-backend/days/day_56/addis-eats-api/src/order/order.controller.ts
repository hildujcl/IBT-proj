import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { OrderService } from './order.service';

import type { Order } from './order.types';
import type { CreateOrderDto } from './dto/create-order.dto';

import { OrderNotFoundError } from './order.errors';

import { validateFindOrdersQuery } from './dto/find-orders.query';

import { validateUpdateStatusDto } from './dto/update-status.dto';

@Controller('api')
export class OrderController {
  constructor(private readonly ordersService: OrderService) {}

  // GET /api/orders
  @Get('orders')
  findAll(@Query() query: Record<string, unknown>) {
    const dto = validateFindOrdersQuery(query);

    return this.ordersService.findAll(dto);
  }

  // GET /api/orders/pending
  @Get('orders/pending')
  findPending(@Query() query: Record<string, unknown>) {
    const dto = validateFindOrdersQuery(query);

    return this.ordersService.findPending(dto);
  }

  // GET /api/restaurants/:id/orders
  @Get('restaurants/:id/orders')
  findByRestaurant(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: Record<string, unknown>,
  ) {
    const dto = validateFindOrdersQuery(query);

    return this.ordersService.findByRestaurant(id, dto);
  }

  // GET /api/orders/:id
  @Get('orders/:id')
  findOne(@Param('id', ParseIntPipe) id: number): Order {
    try {
      return this.ordersService.find(id);
    } catch (error: unknown) {
      if (error instanceof OrderNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  // POST /api/orders
  @Post('orders')
  create(@Body() dto: CreateOrderDto): Order {
    const existingOrders = this.ordersService.all();

    const nextId = Math.max(0, ...existingOrders.map((order) => order.id)) + 1;

    const newOrder: Order = {
      id: nextId,
      customerName: dto.customer,
      phone: dto.teleBirrPhone ?? '',
      dish: {
        id: nextId,
        name: 'Customer order',
        price: dto.totalSantim,
      },
      area: dto.area,
      status: 'Pending',
      quantity: 1,
      total: dto.totalSantim,
    };

    return this.ordersService.create(newOrder);
  }

  // PATCH /api/orders/:id/status
  @Patch('orders/:id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() body: unknown) {
    const dto = validateUpdateStatusDto(body);

    try {
      return this.ordersService.updateStatus(id, dto.status);
    } catch (error: unknown) {
      if (error instanceof OrderNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }

  // DELETE /api/orders/:id
  @Delete('orders/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    try {
      this.ordersService.remove(id);
    } catch (error: unknown) {
      if (error instanceof OrderNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }
}
