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

import { DishesService } from './dishes.service';
import { CreateDishDto, validateCreateDishDto } from './dto/create-dish.dto';
import { RestaurantReferenceError } from './dish.errors';

@ApiTags('Dishes')
@ApiSecurity('api-key')
@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  // GET /api/v1/dishes
  // GET /api/v1/dishes?restaurantId=1
  @ApiOperation({ summary: 'Get dishes, optionally filtered by restaurant' })
  @ApiResponse({ status: 200, description: 'Dishes returned.' })
  @ApiBadRequestResponse({
    description: 'Invalid restaurantId query parameter.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
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
  @ApiOperation({ summary: 'Get a dish by ID' })
  @ApiResponse({ status: 200, description: 'Dish returned.' })
  @ApiBadRequestResponse({ description: 'Dish ID must be an integer.' })
  @ApiNotFoundResponse({ description: 'Dish does not exist.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const dish = this.dishesService.findOne(id);

    if (!dish) {
      throw new NotFoundException(`Dish with ID ${id} was not found.`);
    }

    return dish;
  }

  // POST /api/v1/dishes
  @ApiOperation({ summary: 'Create a dish' })
  @ApiBody({ type: CreateDishDto })
  @ApiCreatedResponse({ description: 'Dish created.' })
  @ApiBadRequestResponse({ description: 'Invalid dish input.' })
  @ApiResponse({ status: 422, description: 'Restaurant reference is invalid.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
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
  @ApiOperation({ summary: 'Delete a dish' })
  @ApiNoContentResponse({ description: 'Dish deleted.' })
  @ApiBadRequestResponse({ description: 'Dish ID must be an integer.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.dishesService.remove(id);
  }
}

@ApiTags('Dishes')
@ApiSecurity('api-key')
@Controller('restaurants')
export class RestaurantDishesController {
  constructor(private readonly dishesService: DishesService) {}

  // GET /api/v1/restaurants/:id/dishes
  @ApiOperation({ summary: 'Get dishes for a restaurant' })
  @ApiResponse({ status: 200, description: 'Restaurant dishes returned.' })
  @ApiBadRequestResponse({ description: 'Restaurant ID must be an integer.' })
  @ApiNotFoundResponse({ description: 'Restaurant does not exist.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @Get(':id/dishes')
  findByRestaurant(@Param('id', ParseIntPipe) id: number) {
    return this.dishesService.findByRestaurant(id);
  }
}
