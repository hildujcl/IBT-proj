import { BadRequestException } from '@nestjs/common';

export class CreateRestaurantDto {
  name!: string;
  address!: string;
  phone?: string;
}

export function validateCreateRestaurantDto(
  body: unknown,
): CreateRestaurantDto {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    throw new BadRequestException('Request body must be an object.');
  }

  if (!('name' in body) || typeof body.name !== 'string' || !body.name.trim()) {
    throw new BadRequestException('Restaurant name is required.');
  }

  if (
    !('address' in body) ||
    typeof body.address !== 'string' ||
    !body.address.trim()
  ) {
    throw new BadRequestException('Restaurant address is required.');
  }

  if (
    'phone' in body &&
    body.phone !== undefined &&
    typeof body.phone !== 'string'
  ) {
    throw new BadRequestException('Phone must be a string.');
  }

  const dto = new CreateRestaurantDto();

  dto.name = body.name.trim();
  dto.address = body.address.trim();

  if ('phone' in body && typeof body.phone === 'string') {
    dto.phone = body.phone.trim();
  }

  return dto;
}
