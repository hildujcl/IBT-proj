import { Injectable, LoggerService } from '@nestjs/common';
import { appLogger } from './logging.config';

@Injectable()
export class PinoLoggerService implements LoggerService {
  private readonly logger = appLogger;

  private write(
    level: 'info' | 'error' | 'warn' | 'debug' | 'trace' | 'fatal',
    message: unknown,
    optionalParams: unknown[],
  ): void {
    const context = optionalParams.find(
      (value): value is string => typeof value === 'string',
    );
    const fields: Record<string, unknown> = { context };

    if (typeof message !== 'string') fields.message = message;

    const text = typeof message === 'string' ? message : 'Nest application log';

    switch (level) {
      case 'info':
        this.logger.info(fields, text);
        break;
      case 'error':
        this.logger.error(fields, text);
        break;
      case 'warn':
        this.logger.warn(fields, text);
        break;
      case 'debug':
        this.logger.debug(fields, text);
        break;
      case 'trace':
        this.logger.trace(fields, text);
        break;
      case 'fatal':
        this.logger.fatal(fields, text);
        break;
    }
  }

  log(message: unknown, ...optionalParams: unknown[]): void {
    this.write('info', message, optionalParams);
  }

  error(message: unknown, ...optionalParams: unknown[]): void {
    this.write('error', message, optionalParams);
  }

  warn(message: unknown, ...optionalParams: unknown[]): void {
    this.write('warn', message, optionalParams);
  }

  debug(message: unknown, ...optionalParams: unknown[]): void {
    this.write('debug', message, optionalParams);
  }

  verbose(message: unknown, ...optionalParams: unknown[]): void {
    this.write('trace', message, optionalParams);
  }

  fatal(message: unknown, ...optionalParams: unknown[]): void {
    this.write('fatal', message, optionalParams);
  }

  /** Use this method for application logs with structured fields. */
  info(fields: Record<string, unknown>, message: string): void {
    this.logger.info(fields, message);
  }
}
