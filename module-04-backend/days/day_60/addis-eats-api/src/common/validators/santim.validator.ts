import { BadRequestException } from '@nestjs/common';

export function validateSantim(value: unknown, fieldName = 'amount'): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1) {
    throw new BadRequestException(
      `${fieldName} must be a positive integer in santim.`,
    );
  }

  return value;
}
