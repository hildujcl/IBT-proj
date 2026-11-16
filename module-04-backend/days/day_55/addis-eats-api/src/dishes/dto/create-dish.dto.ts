import { BadRequestException } from '@nestjs/common';

export class CreateDishDto {
  restaurantId!: number;
  name!: string;
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
