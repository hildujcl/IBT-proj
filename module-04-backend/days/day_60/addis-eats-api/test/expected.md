# Day 58 – Expected API Test Results

Base URL: http://localhost:3000

All error responses must contain these five fields:

- statusCode
- message
- path
- timestamp
- requestId

No stack traces or internal error details should appear in API responses.

| No. | Test                                   | Expected status |
| --: | -------------------------------------- | --------------: |
|   1 | Old route `/api/restaurants`           |             404 |
|   2 | Invalid restaurant body                |             400 |
|   3 | Invalid dish restaurant ID             |             400 |
|   4 | Dish references nonexistent restaurant |             422 |
|   5 | Order limit exceeds maximum            |             400 |
|   6 | Negative order offset                  |             400 |
|   7 | Invalid sorting value                  |             400 |
|   8 | Invalid order status filter            |             400 |
|   9 | Invalid delivery area                  |             400 |
|  10 | Invalid TeleBirr phone                 |             400 |
|  11 | Empty order lines                      |             400 |
|  12 | Invalid order status update            |             400 |

## Additional acceptance checks

| Test                                   | Expected result                          |
| -------------------------------------- | ---------------------------------------- |
| `GET /api/v1/restaurants`              | 200                                      |
| `GET /api/restaurants`                 | 404                                      |
| Successful POST                        | 201 Created                              |
| Successful POST response               | Includes `Location` header               |
| First DELETE                           | 204 No Content                           |
| Repeated DELETE                        | 204 No Content                           |
| `GET /api/v1/orders?sort=-totalSantim` | Orders sorted by totalSantim descending  |
| Error response                         | Contains all five standard fields        |
| Unexpected server error                | Generic 500 response without stack trace |

## Notes

- The API uses the `/api/v1` global prefix.
- Validation is implemented manually.
- Order totals are calculated by the server.
- Monetary amounts are represented in santim.
- Delivery fees are 4,000, 5,000, or 6,000 santim, depending on the area.
- Data is stored in in-memory repositories.
