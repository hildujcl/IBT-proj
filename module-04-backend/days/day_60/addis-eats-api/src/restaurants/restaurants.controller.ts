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

import { RestaurantsService } from './restaurants.service';
import {
  CreateRestaurantDto,
  validateCreateRestaurantDto,
} from './dto/create-restaurant.dto';

@ApiTags('Restaurants')
@ApiSecurity('api-key')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  // GET /api/v1/restaurants/open
  @ApiOperation({ summary: 'Get open restaurants' })
  @ApiResponse({ status: 200, description: 'Open restaurants returned.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get('open')
  findOpen() {
    return this.restaurantsService.findOpen();
  }

  // GET /api/v1/restaurants
  @ApiOperation({ summary: 'Get all restaurants' })
  @ApiResponse({ status: 200, description: 'Restaurants returned.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  // GET /api/v1/restaurants/:id
  @ApiOperation({ summary: 'Get a restaurant by ID' })
  @ApiResponse({ status: 200, description: 'Restaurant returned.' })
  @ApiBadRequestResponse({ description: 'Restaurant ID must be an integer.' })
  @ApiNotFoundResponse({ description: 'Restaurant does not exist.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const restaurant = this.restaurantsService.findOne(id);

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} was not found.`);
    }

    return restaurant;
  }

  // POST /api/v1/restaurants
  @ApiOperation({ summary: 'Create a restaurant' })
  @ApiBody({ type: CreateRestaurantDto })
  @ApiCreatedResponse({ description: 'Restaurant created.' })
  @ApiBadRequestResponse({ description: 'Invalid restaurant input.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
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
  @ApiOperation({ summary: 'Delete a restaurant' })
  @ApiNoContentResponse({ description: 'Restaurant deleted.' })
  @ApiBadRequestResponse({ description: 'Restaurant ID must be an integer.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.restaurantsService.remove(id);
  }
}
