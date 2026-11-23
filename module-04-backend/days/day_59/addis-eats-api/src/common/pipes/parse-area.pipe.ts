import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseAreaPipe implements PipeTransform {
  transform(value: string): string {
    const area = value?.trim().toLowerCase();

    if (area !== 'bole') {
      throw new BadRequestException(
        'Invalid delivery area. Only Bole is currently supported.',
      );
    }

    return 'Bole';
  }
}
