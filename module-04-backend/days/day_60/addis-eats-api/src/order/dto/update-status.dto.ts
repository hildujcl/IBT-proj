import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import type { OrderStatus } from '../order.types';

export class UpdateStatusDto {
  @ApiProperty({
    enum: [
      'Pending',
      'Confirmed',
      'Preparing',
      'Ready',
      'Delivered',
      'Cancelled',
    ],
    example: 'Confirmed',
  })
  status!: OrderStatus;
}

const validStatuses: OrderStatus[] = [
  'Pending',
  'Confirmed',
  'Preparing',
  'Ready',
  'Delivered',
  'Cancelled',
];

export function validateUpdateStatusDto(body: unknown): UpdateStatusDto {
  if (typeof body !== 'object' || body === null || !('status' in body)) {
    throw new BadRequestException('A status field is required.');
  }

  const status = body.status;

  if (
    typeof status !== 'string' ||
    !validStatuses.includes(status as OrderStatus)
  ) {
    throw new BadRequestException('Invalid order status.');
  }

  const dto = new UpdateStatusDto();
  dto.status = status as OrderStatus;

  return dto;
}
