import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const apiKey = request.headers['x-api-key'];

    const validApiKey = this.configService.get<string>('API_KEY');

    // No API key provided.
    if (!apiKey) {
      throw new UnauthorizedException('API key is required');
    }

    // Incorrect API key.
    if (typeof apiKey !== 'string' || apiKey !== validApiKey) {
      throw new ForbiddenException('Invalid API key');
    }

    return true;
  }
}
