import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';

import { Observable, catchError, finalize, throwError } from 'rxjs';

import type { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();

    const request = httpContext.getRequest<Request>();

    const response = httpContext.getResponse<Response>();

    const method = request.method;
    const path = request.originalUrl;
    const handler = context.getHandler().name;

    const requestId = String(request.headers['x-request-id'] ?? 'unknown');

    const startTime = Date.now();

    let outcome: 'success' | 'failure' = 'success';
    let statusCode = response.statusCode;

    return next.handle().pipe(
      catchError((error) => {
        outcome = 'failure';
        statusCode = error?.status ?? 500;

        return throwError(() => error);
      }),

      finalize(() => {
        const duration = Date.now() - startTime;

        console.log({
          method,
          path,
          handler,
          outcome,
          statusCode,
          duration: `${duration}ms`,
          requestId,
        });
      }),
    );
  }
}
