# Day 60 – Legible to Someone Else

## Install

```bash
npm install
```

The required packages (`pino`, `pino-http`, `pino-pretty`, `@nestjs/swagger`, `dotenv`, and `cross-env`) are listed in `package.json`. `npm install` also refreshes `package-lock.json`.

## Run in development

```bash
cp .env.example .env
npm run start:dev
```

Swagger is available at `http://localhost:3000/docs`. The OpenAPI file is written to `openapi.json` when the app starts outside production.

## Export OpenAPI without keeping the server running

```bash
npm run openapi:export
```

Commit the generated `openapi.json`:

```bash
git add openapi.json src nest-cli.json package.json package-lock.json DAY-60.md .env.example
git commit -m "Complete day 60 logging and API documentation"
```

## Redaction proof

Use a request that contains both secret headers and a phone field. It creates a test restaurant, so choose a unique name:

```bash
curl -X POST http://localhost:3000/api/v1/restaurants \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer auth-secret-demo" \
  -H "x-api-key: api-secret-demo" \
  -d '{"name":"Day 60 Redaction Check","address":"Bole","phone":"+251911234567"}'
```

Inspect the terminal output. The request log should show `[REDACTED]` for `authorization`, `x-api-key`, and `phone`, never the supplied values.

## JSON-lines proof

Pretty output is intentionally enabled only when `NODE_ENV=development`. For machine-readable JSON Lines, run with another environment value, for example:

```bash
npm run build
npm run start:json
```

Each log event is one JSON object on one line. Use a request with an explicit ID to correlate the request log and order-service log:

```bash
curl -X POST http://localhost:3000/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "X-Request-Id: day60-order-check-001" \
  -d '{"restaurantId":1,"customer":"Day 60 Test","area":"Bole","teleBirrPhone":"+251911234567","lines":[{"dishId":1,"quantity":1}]}'
```

The HTTP request log and `Order created` service log should both contain `requestId: "day60-order-check-001"`.

## Production Swagger check

```bash
npm run build
npm run start:prod
```

`http://localhost:3000/docs` should return 404 because Swagger is not registered in production.

## Six submission checks

Run the API with JSON output in one terminal:

```bash
npm run build
npm run start:json 2>&1 | tee day60.log
```

In another terminal, send the two requests from `requests/day60-redaction.http` using your HTTP client.

1. **One JSON object per line**

   ```bash
   node -e "const fs=require('fs'); const lines=fs.readFileSync('day60.log','utf8').split(/\r?\n/).filter(Boolean); lines.forEach(line=>JSON.parse(line)); console.log('Valid JSON lines:', lines.length)"
   ```

2. **Same request ID in request and service logs**

   ```bash
   grep 'day60-order-check-001' day60.log
   ```

   The request-completion log and `Order created` log should both contain that ID.

3. **No secrets or phone numbers in logs**

   ```bash
   grep -E 'auth-secret-demo|api-secret-demo|\+251911234567' day60.log
   ```

   Expected: no matches.

4. **Twelve documented URL paths and summaries**

   ```bash
   node -e "const d=require('./openapi.json'); const p=Object.entries(d.paths); console.log('Paths:',p.length); for(const [path,methods] of p) for(const [method,op] of Object.entries(methods)) if(!op.summary) throw Error(method.toUpperCase()+' '+path+' has no summary'); console.log('Every operation has a summary')"
   ```

5. **Swagger can place an order**

   Open `http://localhost:3000/docs`, choose `POST /api/v1/orders`, select **Try it out**, and submit the sample order from `requests/day60-redaction.http`. Expect `201 Created` and a new order ID.

6. **Swagger is disabled in production**

   Stop the development server, then run:

   ```bash
   npm run start:prod
   ```

   Open `http://localhost:3000/docs`. Expected: `404 Not Found`.

## Endpoint count

The supplied source has 12 unique URL paths: 11 resource paths plus the root welcome path. Some paths support more than one HTTP method, so the generated OpenAPI document contains 18 operations. Every operation has a summary and documented failure responses. Existing routes are preserved.
