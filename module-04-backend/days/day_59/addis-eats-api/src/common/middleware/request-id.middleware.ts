import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const requestId = request.header('x-request-id') || randomUUID();

    // Attach the ID to the request.
    request.headers['x-request-id'] = requestId;

    // Attach the ID to the response.
    response.setHeader('x-request-id', requestId);

    next();
  }
}
