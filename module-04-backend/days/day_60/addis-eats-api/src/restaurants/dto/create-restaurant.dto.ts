import { BadRequestException } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty({ example: 'Habesha Restaurant' })
  name!: string;

  @ApiProperty({ example: 'Bole, Addis Ababa' })
  address!: string;

  @ApiPropertyOptional({ example: '+251911234567' })
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
