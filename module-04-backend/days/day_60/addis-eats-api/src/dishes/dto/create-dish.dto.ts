import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDishDto {
  @ApiProperty({ example: 1, minimum: 1 })
  restaurantId!: number;

  @ApiProperty({ example: 'Doro Wot' })
  name!: string;

  @ApiProperty({ example: 12500, minimum: 1, description: 'Price in santim.' })
  priceSantim!: number;
}

export function validateCreateDishDto(body: unknown): CreateDishDto {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    throw new BadRequestException('Request body must be an object.');
  }

  if (!('name' in body) || typeof body.name !== 'string' || !body.name.trim()) {
    throw new BadRequestException('Dish name is required.');
  }

  if (
    !('restaurantId' in body) ||
    typeof body.restaurantId !== 'number' ||
    !Number.isInteger(body.restaurantId) ||
    body.restaurantId < 1
  ) {
    throw new BadRequestException('restaurantId must be a positive integer.');
  }

  if (
    !('priceSantim' in body) ||
    typeof body.priceSantim !== 'number' ||
    !Number.isInteger(body.priceSantim) ||
    body.priceSantim < 1
  ) {
    throw new BadRequestException(
      'priceSantim must be an integer of at least 1.',
    );
  }

  const dto = new CreateDishDto();
  dto.name = body.name.trim();
  dto.restaurantId = body.restaurantId;
  dto.priceSantim = body.priceSantim;

  return dto;
}
