import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { appLogger } from '../logging/logging.config';
import { getRequestId } from '../logging/request-context';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse
      ) {
        const errorMessage = exceptionResponse.message;
        message = Array.isArray(errorMessage)
          ? errorMessage.join(', ')
          : String(errorMessage);
      } else {
        message = exception.message;
      }
    } else {
      message = 'Internal server error';
    }

    const requestId = getRequestId();

    if (status >= 500) {
      appLogger.error(
        {
          err: exception,
          requestId,
          path: request.originalUrl,
          statusCode: status,
        },
        'Request failed with server error',
      );
    } else {
      appLogger.warn(
        { requestId, path: request.originalUrl, statusCode: status },
        'Request failed',
      );
    }

    response.status(status).json({
      statusCode: status,
      message,
      path: request.originalUrl,
      timestamp: new Date().toISOString(),
      requestId,
    });
  }
}
