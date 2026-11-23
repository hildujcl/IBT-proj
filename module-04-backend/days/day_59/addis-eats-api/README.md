# Day 59 – The Common Folder

## Addis Eats API

### Overview

Day 59 focused on building a reusable `common/` folder in NestJS. The goal was to organize cross-cutting concerns separately from individual controllers and services, making the API easier to maintain and manage.

I implemented six common components: middleware, guards, interceptors, and a custom pipe.

## Technologies Used

- NestJS
- TypeScript
- Node.js
- Express
- RxJS
- `@nestjs/config`

## Project Structure

```text
src/
├── common/
│   ├── filters/
│   │   └── all-exceptions.filter.ts
│   ├── validators/
│   │   ├── telebirr.validator.ts
│   │   └── santim.validator.ts
│   ├── middleware/
│   │   └── request-id.middleware.ts
│   ├── guards/
│   │   ├── api-key.guard.ts
│   │   └── roles.guard.ts
│   ├── interceptors/
│   │   ├── logging.interceptor.ts
│   │   └── timeout.interceptor.ts
│   └── pipes/
│       └── parse-area.pipe.ts
│
├── restaurants/
├── dishes/
├── order/
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```

## Implemented Features

### 1. RequestIdMiddleware

- Accepts an existing request ID or generates a UUID.
- Attaches the request ID to the request.
- Returns the ID through the `x-request-id` response header.
- Applied to all routes.

### 2. ApiKeyGuard

- Reads the API key from environment configuration using `ConfigService`.
- Returns `401 Unauthorized` when the API key is missing.
- Returns `403 Forbidden` when the API key is incorrect.
- Allows requests with a valid API key.

### 3. Roles Decorator and RolesGuard

- Created a custom `@Roles()` decorator.
- Uses NestJS `Reflector` and `getAllAndOverride()` to read required roles.
- Checks whether the authenticated user has the required role.
- Rejects users without the required permissions.

### 4. LoggingInterceptor

Logs important request information:

- HTTP method
- Request path
- Handler name
- Request outcome
- HTTP status code
- Request duration
- Request ID

Uses RxJS `catchError()` and `finalize()` to log once per request.

### 5. TimeoutInterceptor

- Sets a request timeout of 5 seconds.
- Returns HTTP `408 Request Timeout` when a request takes too long.
- Tested using a temporary endpoint with a 6-second delay.

### 6. ParseAreaPipe

Created a custom pipe to validate delivery areas.

| Input   | Result   |
| ------- | -------- |
| `bole`  | Accepted |
| `BOLE`  | Accepted |
| `Bole`  | Accepted |
| `Adama` | Rejected |

## API Configuration

The API uses the global prefix:

```text
/api/v1
```

Example endpoint:

```text
http://localhost:3000/api/v1/restaurants
```

The API key is configured through a `.env` file in the project root:

```env
API_KEY=AddisEats_Day59_2026_X7mP9qL2
```

The `.env` file should not be committed to GitHub.

## Installation and Running

Install dependencies:

```bash
npm install
```

Install NestJS configuration if needed:

```bash
npm install @nestjs/config
```

Start the development server:

```bash
npm run start:dev
```

The API runs at:

```text
http://localhost:3000/api/v1
```

## Testing

The following behaviors were checked during development:

- Request ID generation and response headers.
- API key validation.
- Request timeout returning HTTP 408.
- Request logging.
- Role-based access control.
- Delivery area validation.

## Key Learning Outcomes

Through this implementation, I learned how NestJS middleware, guards, interceptors, decorators, and custom pipes work together.

I also learned how to separate reusable application-wide logic from business logic, handle request timeouts, manage API keys through environment configuration, and improve request tracking and logging.

## Conclusion

Day 59 helped me understand how to structure reusable functionality in NestJS using the `common/` folder. These components make the Addis Eats API more organized, consistent, and easier to maintain as the project grows.
