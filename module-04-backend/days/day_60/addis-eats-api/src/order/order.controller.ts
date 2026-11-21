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

import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import type { Response } from 'express';

import { OrderService } from './order.service';

import type { Order } from './order.types';

import { OrderNotFoundError } from './order.errors';

import { validateFindOrdersQuery } from './dto/find-orders.query';

import {
  UpdateStatusDto,
  validateUpdateStatusDto,
} from './dto/update-status.dto';

import { CreateOrderDto, validateCreateOrderDto } from './dto/create-order.dto';
import { Delete } from '@nestjs/common';

@ApiTags('Orders')
@ApiSecurity('api-key')
@Controller('orders')
export class OrderController {
  constructor(private readonly ordersService: OrderService) {}

  @ApiOperation({ summary: 'Get orders with filtering and pagination' })
  @ApiResponse({ status: 200, description: 'Orders returned.' })
  @ApiBadRequestResponse({ description: 'Invalid filter or pagination query.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get()
  findAll(@Query() query: Record<string, unknown>) {
    const dto = validateFindOrdersQuery(query);

    return this.ordersService.findAll(dto);
  }

  @ApiOperation({ summary: 'Get pending orders with pagination' })
  @ApiResponse({ status: 200, description: 'Pending orders returned.' })
  @ApiBadRequestResponse({ description: 'Invalid pagination query.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('pending')
  findPending(@Query() query: Record<string, unknown>) {
    const dto = validateFindOrdersQuery(query);

    return this.ordersService.findPending(dto);
  }

  @ApiOperation({ summary: 'Check API health' })
  @ApiResponse({ status: 200, description: 'API is healthy.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('health-check')
  healthCheck() {
    return { status: 'ok' };
  }

  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({ status: 200, description: 'Order returned.' })
  @ApiBadRequestResponse({ description: 'Order ID must be an integer.' })
  @ApiNotFoundResponse({ description: 'Order does not exist.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
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
  @ApiOperation({ summary: 'Delete an order' })
  @ApiNoContentResponse({ description: 'Order deleted.' })
  @ApiBadRequestResponse({ description: 'Order ID must be an integer.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.ordersService.remove(id);
  }

  @ApiOperation({ summary: 'Create an order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiCreatedResponse({ description: 'Order created.' })
  @ApiBadRequestResponse({ description: 'Invalid order input.' })
  @ApiNotFoundResponse({ description: 'Restaurant or dish does not exist.' })
  @ApiResponse({ status: 409, description: 'Restaurant is inactive.' })
  @ApiResponse({
    status: 422,
    description: 'Dish does not belong to the selected restaurant.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
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

  @ApiOperation({ summary: 'Update an order status' })
  @ApiBody({ type: UpdateStatusDto })
  @ApiResponse({ status: 200, description: 'Order status updated.' })
  @ApiBadRequestResponse({ description: 'Invalid order ID or status.' })
  @ApiNotFoundResponse({ description: 'Order does not exist.' })
  @ApiResponse({
    status: 409,
    description: 'Status transition is not allowed.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
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
}
