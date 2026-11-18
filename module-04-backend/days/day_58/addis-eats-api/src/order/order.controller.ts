import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';

import type { Response } from 'express';

import { OrderService } from './order.service';

import type { Order } from './order.types';

import { OrderNotFoundError } from './order.errors';

import { validateFindOrdersQuery } from './dto/find-orders.query';

import { validateUpdateStatusDto } from './dto/update-status.dto';

import { validateCreateOrderDto } from './dto/create-order.dto';
import { Delete } from '@nestjs/common';

@Controller('orders')
export class OrderController {
  constructor(private readonly ordersService: OrderService) {}

  @Get()
  findAll(@Query() query: Record<string, unknown>) {
    const dto = validateFindOrdersQuery(query);

    return this.ordersService.findAll(dto);
  }

  @Get('pending')
  findPending(@Query() query: Record<string, unknown>) {
    const dto = validateFindOrdersQuery(query);

    return this.ordersService.findPending(dto);
  }

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
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.ordersService.remove(id);
  }

  @Post()
  create(
    @Body() body: unknown,
    @Res({ passthrough: true }) response: Response,
  ): Order {
    const dto = validateCreateOrderDto(body);

    const order = this.ordersService.create(dto);

    response.location(`/api/v1/orders/${order.id}`);

    return order;
  }

  @Patch(':id/status')
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

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('health-check')
  healthCheck() {
    return { status: 'ok' };
  }
}
