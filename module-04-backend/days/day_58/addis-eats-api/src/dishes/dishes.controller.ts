import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UnprocessableEntityException,
  BadRequestException,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';

import type { Response } from 'express';

import { DishesService } from './dishes.service';
import { validateCreateDishDto } from './dto/create-dish.dto';
import { RestaurantReferenceError } from './dish.errors';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  // GET /api/v1/dishes
  // GET /api/v1/dishes?restaurantId=1
  @Get()
  findAll(@Query('restaurantId') restaurantId?: string) {
    if (restaurantId === undefined) {
      return this.dishesService.findAll();
    }

    const parsedId = Number(restaurantId);

    if (!Number.isInteger(parsedId) || parsedId < 1) {
      throw new BadRequestException('restaurantId must be a positive integer.');
    }

    return this.dishesService.findAll(parsedId);
  }

  // GET /api/v1/dishes/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const dish = this.dishesService.findOne(id);

    if (!dish) {
      throw new NotFoundException(`Dish with ID ${id} was not found.`);
    }

    return dish;
  }

  // POST /api/v1/dishes
  @Post()
  create(
    @Body() body: unknown,
    @Res({ passthrough: true }) response: Response,
  ) {
    const dto = validateCreateDishDto(body);

    try {
      const dish = this.dishesService.create(dto);

      response.location(`/api/v1/dishes/${dish.id}`);

      return dish;
    } catch (error: unknown) {
      if (error instanceof RestaurantReferenceError) {
        throw new UnprocessableEntityException(error.message);
      }

      throw error;
    }
  }

  // DELETE /api/v1/dishes/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.dishesService.remove(id);
  }
}

@Controller('restaurants')
export class RestaurantDishesController {
  constructor(private readonly dishesService: DishesService) {}

  // GET /api/v1/restaurants/:id/dishes
  @Get(':id/dishes')
  findByRestaurant(@Param('id', ParseIntPipe) id: number) {
    return this.dishesService.findByRestaurant(id);
  }
}
