import 'dotenv/config';
import pino from 'pino';

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * One shared Pino instance is used by Nest and pino-http so application logs
 * and HTTP request logs have the same format, level and redaction policy.
 */
export const appLogger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers["x-api-key"]',
      'req.body.phone',
      'req.body.teleBirrPhone',
      'req.body.telebirrPhone',
      'req.body.phoneNumber',
      'req.body.customerPhone',
      'req.body.mobile',
      'req.body.mobileNumber',
      'req.body.*.phone',
    ],
    censor: '[REDACTED]',
  },
  ...(isDevelopment
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: true,
            translateTime: 'SYS:standard',
          },
        },
      }
    : {}),
});
