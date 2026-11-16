import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';

import { OrderService } from './order.service';

import type { Order } from './order.types';

import type { CreateOrderDto } from './dto/create-order.dto';

import { OrderNotFoundError } from './order.errors';

@Controller('orders')
export class OrderController {
  constructor(private readonly ordersService: OrderService) {}

  // GET /orders
  @Get()
  findAll(): Order[] {
    return this.ordersService.all();
  }

  // GET /orders/:id
  @Get(':id')
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

  // POST /orders
  @Post()
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
}
