import { BadRequestException } from '@nestjs/common';
import type { Area, OrderStatus } from '../order.types';

export type OrderSort = 'asc' | 'desc' | 'totalSantim' | '-totalSantim';

export class FindOrdersQuery {
  status?: OrderStatus;
  area?: Area;
  limit = 20;
  offset = 0;
  sort: OrderSort = 'desc';
}

const validStatuses: OrderStatus[] = [
  'Pending',
  'Confirmed',
  'Preparing',
  'Ready',
  'Delivered',
  'Cancelled',
];

const validAreas: Area[] = ['Bole', 'Kazanchis', 'Piazza', 'Mexico', 'Sarbet'];

function parseNumber(
  value: unknown,
  field: string,
  defaultValue: number,
): number {
  if (value === undefined) return defaultValue;

  const parsed = Number(value);

  if (!Number.isInteger(parsed)) {
    throw new BadRequestException(`${field} must be an integer.`);
  }

  return parsed;
}

export function validateFindOrdersQuery(
  query: Record<string, unknown>,
): FindOrdersQuery {
  const dto = new FindOrdersQuery();

  if (query.status !== undefined) {
    if (
      typeof query.status !== 'string' ||
      !validStatuses.includes(query.status as OrderStatus)
    ) {
      throw new BadRequestException('Invalid order status.');
    }

    dto.status = query.status as OrderStatus;
  }

  if (query.area !== undefined) {
    if (
      typeof query.area !== 'string' ||
      !validAreas.includes(query.area as Area)
    ) {
      throw new BadRequestException('Invalid delivery area.');
    }

    dto.area = query.area as Area;
  }

  dto.limit = parseNumber(query.limit, 'limit', 20);
  dto.offset = parseNumber(query.offset, 'offset', 0);

  if (dto.limit < 1 || dto.limit > 50) {
    throw new BadRequestException('limit must be between 1 and 50.');
  }

  if (dto.offset < 0) {
    throw new BadRequestException('offset cannot be negative.');
  }

  if (query.sort !== undefined) {
    const validSorts: OrderSort[] = [
      'asc',
      'desc',
      'totalSantim',
      '-totalSantim',
    ];

    if (
      typeof query.sort !== 'string' ||
      !validSorts.includes(query.sort as OrderSort)
    ) {
      throw new BadRequestException(
        'sort must be asc, desc, totalSantim, or -totalSantim.',
      );
    }

    dto.sort = query.sort as OrderSort;
  }

  return dto;
}
