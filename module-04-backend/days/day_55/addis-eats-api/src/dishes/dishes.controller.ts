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
} from '@nestjs/common';

import { DishesService } from './dishes.service';
import { validateCreateDishDto } from './dto/create-dish.dto';
import { RestaurantReferenceError } from './dish.errors';

@Controller('api/dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const dish = this.dishesService.findOne(id);

    if (!dish) {
      throw new NotFoundException(`Dish with ID ${id} was not found.`);
    }

    return dish;
  }

  @Post()
  create(@Body() body: unknown) {
    const dto = validateCreateDishDto(body);

    try {
      return this.dishesService.create(dto);
    } catch (error: unknown) {
      if (error instanceof RestaurantReferenceError) {
        throw new UnprocessableEntityException(error.message);
      }

      throw error;
    }
  }
}
