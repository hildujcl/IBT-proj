import { BadRequestException } from '@nestjs/common';

const TELEBIRR_PHONE_REGEX = /^(09\d{8}|\+2519\d{8})$/;

export function validateTeleBirrPhone(phone: unknown): string {
  if (typeof phone !== 'string') {
    throw new BadRequestException(
      'teleBirrPhone must be a valid Ethiopian phone number.',
    );
  }

  const normalizedPhone = phone.trim();

  if (!TELEBIRR_PHONE_REGEX.test(normalizedPhone)) {
    throw new BadRequestException(
      'teleBirrPhone must use 09XXXXXXXX or +2519XXXXXXXX format.',
    );
  }

  return normalizedPhone;
}
