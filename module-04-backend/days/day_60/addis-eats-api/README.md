# Day 58 – Addis Eats API

A REST API built with **NestJS and TypeScript** for managing restaurants, dishes, and customer orders.

The project uses API versioning, manual validation, standardized error responses, and in-memory repositories.

## Technologies

- Node.js
- NestJS
- TypeScript
- REST API
- npm
- HTTP status codes
- Manual request validation

## Features

### Restaurants

- Retrieve all restaurants
- Retrieve one restaurant
- Retrieve open restaurants
- Create restaurants
- Delete restaurants

### Dishes

- Retrieve all dishes
- Retrieve one dish
- Filter dishes by restaurant
- Create dishes
- Delete dishes
- Validate restaurant references

### Orders

- Create orders with multiple dish lines
- Calculate order totals on the server
- Calculate delivery fees
- Filter orders by status and delivery area
- Sort orders
- Paginate order collections
- Retrieve pending orders
- Retrieve orders by restaurant
- Update order status
- Validate order status transitions
- Delete orders

### API standards

- API versioning using `/api/v1`
- Standardized error responses
- Centralized exception handling
- Request ID support
- Consistent HTTP status codes
- Location header for successful resource creation
- Idempotent DELETE operations
- Manual DTO validation

## Project Structure

```text
addis-eats-api/
├── src/
│   ├── common/
│   │   ├── filters/
│   │   │   └── all-exceptions.filter.ts
│   │   └── validators/
│   │       ├── telebirr.validator.ts
│   │       └── santim.validator.ts
│   │
│   ├── restaurants/
│   │   ├── dto/
│   │   ├── restaurants.controller.ts
│   │   ├── restaurants.module.ts
│   │   ├── restaurants.repository.ts
│   │   ├── restaurants.service.ts
│   │   ├── restaurants.seed.ts
│   │   └── restaurants.types.ts
│   │
│   ├── dishes/
│   │   ├── dto/
│   │   ├── dishes.controller.ts
│   │   ├── dishes.module.ts
│   │   ├── dish.repository.ts
│   │   ├── dish.errors.ts
│   │   ├── dishes.service.ts
│   │   ├── dishes.seed.ts
│   │   └── dish.types.ts
│   │
│   ├── order/
│   │   ├── dto/
│   │   │   ├── create-order.dto.ts
│   │   │   ├── find-orders.query.ts
│   │   │   └── update-status.dto.ts
│   │   ├── order.controller.ts
│   │   ├── order.errors.ts
│   │   ├── order.module.ts
│   │   ├── order.repository.ts
│   │   ├── order.service.ts
│   │   ├── order.types.ts
│   │   └── seed-orders.ts
│   │
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
│
├── docs/
│   └── api-standard.md
│
├── test/
│   ├── requests.http
│   ├── expected.md
│   └── run-all.sh
│
├── package.json
├── package-lock.json
└── tsconfig.json
```
