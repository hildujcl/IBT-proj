import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';

import { Observable, timeout, catchError, throwError } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),

      catchError((error) => {
        if (error.name === 'TimeoutError') {
          return throwError(
            () => new RequestTimeoutException('Request took too long'),
          );
        }

        return throwError(() => error);
      }),
    );
  }
}
