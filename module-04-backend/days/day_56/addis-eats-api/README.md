# Day 56 – Addis Eats API

A backend REST API built with **NestJS and TypeScript** for managing restaurants, dishes, and orders.

## 🛠️ Technologies

- Node.js
- NestJS
- TypeScript
- REST API
- npm

## ✨ Features

- Restaurant management
- Dish management
- Filter dishes by restaurant ID
- Create and retrieve dishes
- Order management
- Filter orders by status and delivery area
- Sort and paginate orders
- Retrieve pending orders
- Retrieve orders by restaurant
- Update order status
- Delete orders
- In-memory repositories
- Dependency injection
- Manual request validation and error handling

## 📂 Project Structure

```text
addis-eats-api/
├── src/
│   ├── restaurants/
│   ├── dishes/
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
│   ├── app.module.ts
│   └── main.ts
├── requests-dishes.http
├── package.json
├── package-lock.json
└── tsconfig.json
```

## ⚙️ Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate into the project:

```bash
cd addis-eats-api
```

Install dependencies:

```bash
npm install
```

## ▶️ Run the Application

Start in development mode:

```bash
npm run start:dev
```

Build the project:

```bash
npm run build
```

## 🔗 API Endpoints

### Restaurants

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| GET    | `/api/restaurants`     | Get all restaurants |
| GET    | `/api/restaurants/:id` | Get a restaurant    |

### Dishes

| Method | Endpoint                     | Description                 |
| ------ | ---------------------------- | --------------------------- |
| GET    | `/api/dishes`                | Get all dishes              |
| GET    | `/api/dishes/:id`            | Get a dish                  |
| GET    | `/api/dishes?restaurantId=1` | Filter dishes by restaurant |
| POST   | `/api/dishes`                | Create a dish               |

### Orders

| Method | Endpoint                      | Description                              |
| ------ | ----------------------------- | ---------------------------------------- |
| GET    | `/api/orders`                 | Get orders with filtering and pagination |
| GET    | `/api/orders/pending`         | Get pending orders                       |
| GET    | `/api/orders/:id`             | Get one order                            |
| GET    | `/api/restaurants/:id/orders` | Get orders belonging to a restaurant     |
| POST   | `/api/orders`                 | Create an order                          |
| PATCH  | `/api/orders/:id/status`      | Update order status                      |
| DELETE | `/api/orders/:id`             | Delete an order                          |

## 🔎 Order Filtering and Pagination

The orders endpoint supports the following query parameters:

| Parameter | Description                              | Default      |
| --------- | ---------------------------------------- | ------------ |
| `status`  | Filter by order status                   | All statuses |
| `area`    | Filter by delivery area                  | All areas    |
| `limit`   | Maximum number of returned orders (1–50) | 20           |
| `offset`  | Number of orders to skip                 | 0            |
| `sort`    | Sort order: `asc` or `desc`              | `desc`       |

Example:

```http
GET /api/orders?status=Pending&area=Bole&limit=5&offset=0&sort=desc
```

## 📦 Collection Response Format

All order collection endpoints return a paginated response using the `Page<T>` structure.

Example:

```json
{
  "data": [],
  "total": 12,
  "limit": 5,
  "offset": 0
}
```

- `data`: Returned orders.
- `total`: Total number of matching orders.
- `limit`: Maximum number of returned items.
- `offset`: Number of skipped items.

## ✅ Request Validation

Request validation is handled manually using TypeScript and NestJS exceptions.

- Invalid status values return `400 Bad Request`.
- Invalid delivery areas return `400 Bad Request`.
- Invalid pagination values return `400 Bad Request`.
- A limit greater than 50 returns `400 Bad Request`.
- Missing orders or restaurants return `404 Not Found`.
- Deleting an existing order returns `204 No Content`.

No `class-validator` or `class-transformer` dependency is required.

## 🧪 API Testing

Use the `requests-dishes.http` file to test restaurant, dish, and order endpoints.

The HTTP requests cover:

- Retrieving and filtering orders
- Pending orders
- Pagination and sorting
- Restaurant-specific orders
- Updating order status
- Invalid request validation
- Deleting orders

## 📌 Notes

- This project uses in-memory repositories for data storage.
- Data is not permanently stored in a database.
- Restaurant-specific orders are identified through the restaurant relationship of each order's dish.
- The order collection endpoints use a consistent `Page<T>` response format.

## 👩‍💻 Author

**Hildana Asfaw**

Full Stack Developer
