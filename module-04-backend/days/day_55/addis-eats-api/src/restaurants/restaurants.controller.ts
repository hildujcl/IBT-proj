import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { RestaurantsService } from './restaurants.service';
import { validateCreateRestaurantDto } from './dto/create-restaurant.dto';

@Controller('api/restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const restaurant = this.restaurantsService.findOne(id);

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} was not found.`);
    }

    return restaurant;
  }

  @Post()
  create(@Body() body: unknown) {
    const dto = validateCreateRestaurantDto(body);
    return this.restaurantsService.create(dto);
  }
}
