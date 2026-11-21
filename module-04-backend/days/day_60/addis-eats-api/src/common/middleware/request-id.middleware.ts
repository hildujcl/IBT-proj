import type { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { requestContext } from '../logging/request-context';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    // Get the request ID created by pino-http.
    const requestId = String(request.id ?? 'unknown');

    // Return the request ID to the client.
    response.setHeader('X-Request-Id', requestId);

    // Make the request ID available throughout this request.
    requestContext.run({ requestId }, () => {
      next();
    });
  }
}
