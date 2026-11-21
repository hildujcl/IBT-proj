import { BadRequestException } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { Area } from '../order.types';
import { validateTeleBirrPhone } from '../../common/validators/telebirr.validator';

export class OrderLineDto {
  @ApiProperty({
    example: 1,
    description: 'ID of a dish belonging to the selected restaurant.',
  })
  dishId!: number;

  @ApiProperty({ example: 2, minimum: 1 })
  quantity!: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 1, minimum: 1 })
  restaurantId!: number;

  @ApiProperty({ example: 'Abebe Kebede' })
  customer!: string;

  @ApiProperty({
    enum: ['Bole', 'Kazanchis', 'Piazza', 'Mexico', 'Sarbet'],
    example: 'Bole',
  })
  area!: Area;

  @ApiPropertyOptional({
    example: '+251911234567',
    description: 'TeleBirr phone number.',
  })
  teleBirrPhone?: string;

  @ApiProperty({ type: () => [OrderLineDto] })
  lines!: OrderLineDto[];
}

const validAreas: Area[] = ['Bole', 'Kazanchis', 'Piazza', 'Mexico', 'Sarbet'];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validateOrderLine(value: unknown, index: number): OrderLineDto {
  if (!isObject(value)) {
    throw new BadRequestException(`lines.${index} must be an object.`);
  }

  const dishId = value.dishId;
  const quantity = value.quantity;

  if (typeof dishId !== 'number' || !Number.isInteger(dishId) || dishId < 1) {
    throw new BadRequestException(
      `lines.${index}.dishId must be a positive integer.`,
    );
  }

  if (
    typeof quantity !== 'number' ||
    !Number.isInteger(quantity) ||
    quantity < 1
  ) {
    throw new BadRequestException(
      `lines.${index}.quantity must be a positive integer.`,
    );
  }

  return { dishId, quantity };
}

export function validateCreateOrderDto(body: unknown): CreateOrderDto {
  if (!isObject(body)) {
    throw new BadRequestException('Request body must be an object.');
  }

  const restaurantId = body.restaurantId;

  if (
    typeof restaurantId !== 'number' ||
    !Number.isInteger(restaurantId) ||
    restaurantId < 1
  ) {
    throw new BadRequestException('restaurantId must be a positive integer.');
  }

  if (typeof body.customer !== 'string' || body.customer.trim().length === 0) {
    throw new BadRequestException('customer is required.');
  }

  if (
    typeof body.area !== 'string' ||
    !validAreas.includes(body.area as Area)
  ) {
    throw new BadRequestException('Invalid delivery area.');
  }

  let teleBirrPhone: string | undefined;

  if (body.teleBirrPhone !== undefined) {
    teleBirrPhone = validateTeleBirrPhone(body.teleBirrPhone);
  }

  if (!Array.isArray(body.lines) || body.lines.length === 0) {
    throw new BadRequestException('Order must contain at least one dish line.');
  }

  const lines = body.lines.map((line, index) => validateOrderLine(line, index));

  const dishIds = lines.map((line) => line.dishId);

  if (new Set(dishIds).size !== dishIds.length) {
    throw new BadRequestException(
      'Duplicate dish IDs are not allowed in one order.',
    );
  }

  const dto = new CreateOrderDto();

  dto.restaurantId = restaurantId;
  dto.customer = body.customer.trim();
  dto.area = body.area as Area;
  dto.lines = lines;

  if (teleBirrPhone !== undefined) {
    dto.teleBirrPhone = teleBirrPhone;
  }

  return dto;
}
