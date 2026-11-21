# Day 60 – Logging & API Documentation

Today, I worked on improving my Addis Eats API by implementing structured logging and API documentation using NestJS.

## What I Worked On

### 1. Structured Logging

- Integrated Pino for structured logging.
- Configured logging levels using the `LOG_LEVEL` environment variable.
- Enabled readable, pretty-printed logs in development.
- Added request IDs to track incoming requests.
- Used AsyncLocalStorage to access request IDs in service logs without passing them as method arguments.
- Configured sensitive data redaction for authorization headers, API keys, and phone fields.

### 2. Swagger API Documentation

- Integrated Swagger using `@nestjs/swagger`.
- Configured Swagger documentation at `/docs`.
- Added summaries to API endpoints.
- Organized endpoints using resource tags.
- Documented API response status codes.
- Added API key authentication documentation.
- Exported the OpenAPI specification as `openapi.json`.
- Disabled Swagger documentation in production.

## Technologies Used

- NestJS
- TypeScript
- Pino
- Pino HTTP
- Swagger / OpenAPI
- AsyncLocalStorage

## How to Run

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run start:dev
```

Open Swagger documentation:

```text
http://localhost:3000/docs
```

Export OpenAPI documentation:

```bash
npm run openapi:export
```

## What I Learned

Day 60 helped me understand how structured logging makes debugging and request tracking easier, how to protect sensitive information in logs, and how Swagger and OpenAPI make API documentation easier to understand and maintain.
