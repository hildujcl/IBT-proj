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
  Post,
  Res,
} from '@nestjs/common';

import type { Response } from 'express';

import { RestaurantsService } from './restaurants.service';
import { validateCreateRestaurantDto } from './dto/create-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  // GET /api/v1/restaurants/open
  @Get('open')
  findOpen() {
    return this.restaurantsService.findOpen();
  }

  // GET /api/v1/restaurants
  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  // GET /api/v1/restaurants/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const restaurant = this.restaurantsService.findOne(id);

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} was not found.`);
    }

    return restaurant;
  }

  // POST /api/v1/restaurants
  @Post()
  create(
    @Body() body: unknown,
    @Res({ passthrough: true }) response: Response,
  ) {
    const dto = validateCreateRestaurantDto(body);
    const restaurant = this.restaurantsService.create(dto);

    response.location(`/api/v1/restaurants/${restaurant.id}`);

    return restaurant;
  }

  // DELETE /api/v1/restaurants/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.restaurantsService.remove(id);
  }
}
