import { randomUUID } from 'node:crypto';
import type { IncomingMessage } from 'node:http';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import type { NextFunction, Request, Response } from 'express';
import pinoHttp from 'pino-http';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { appLogger } from './common/logging/logging.config';
import { PinoLoggerService } from './common/logging/pino-logger.service';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';

type PinoRequest = IncomingMessage & { id?: string; body?: unknown };

function redactPhoneFields(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(redactPhoneFields);
  if (typeof value !== 'object' || value === null) return value;

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [
      key,
      /phone|mobile/i.test(key) ? '[REDACTED]' : redactPhoneFields(nestedValue),
    ]),
  );
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useLogger(app.get(PinoLoggerService));

  // pino-http assigns req.id and writes one structured request log per request.
  app.use(
    pinoHttp({
      logger: appLogger,
      genReqId(request: PinoRequest) {
        const incoming = request.headers['x-request-id'];
        return typeof incoming === 'string' && incoming.trim().length > 0
          ? incoming
          : randomUUID();
      },
      customProps(request: PinoRequest) {
        return { requestId: request.id };
      },
      serializers: {
        req(request: PinoRequest) {
          const requestWithBody = request as typeof request & {
            body?: unknown;
          };
          const safeHeaders = { ...request.headers };
          for (const headerName of Object.keys(safeHeaders)) {
            if (
              ['authorization', 'x-api-key'].includes(headerName.toLowerCase())
            ) {
              safeHeaders[headerName] = '[REDACTED]';
            }
          }

          return {
            id: request.id,
            method: request.method,
            url: request.url,
            headers: safeHeaders,
            body: redactPhoneFields(requestWithBody.body),
          };
        },
      },
    }),
  );

  // Establish AsyncLocalStorage after pino-http has assigned request.id.
  const requestIdMiddleware = new RequestIdMiddleware();
  app.use((request: Request, response: Response, next: NextFunction) =>
    requestIdMiddleware.use(
      request as Request & { id?: string },
      response,
      next,
    ),
  );

  app.setGlobalPrefix('api/v1');
  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger and its JSON document are deliberately not registered in production.
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Addis Eats API')
      .setDescription(
        'HTTP API for discovering restaurants and dishes, creating food orders, and managing order status. Prices are represented in Ethiopian santim.',
      )
      .setVersion('1.0.0')
      .addTag('Restaurants', 'Browse and manage restaurants.')
      .addTag('Dishes', 'Browse and manage restaurant dishes.')
      .addTag('Orders', 'Create, query and manage customer orders.')
      .addTag('System', 'API welcome and service metadata.')
      .addApiKey(
        {
          type: 'apiKey',
          in: 'header',
          name: 'x-api-key',
          description: 'API key header',
        },
        'api-key',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    writeFileSync(
      join(process.cwd(), 'openapi.json'),
      `${JSON.stringify(document, null, 2)}\n`,
      'utf8',
    );

    appLogger.info({ file: 'openapi.json' }, 'OpenAPI document exported');
  }

  if (process.env.OPENAPI_EXPORT_ONLY === 'true') {
    await app.close();
    return;
  }

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
