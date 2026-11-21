#!/usr/bin/env bash

set -uo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000}"
TEMP_FILE="$(mktemp)"

trap 'rm -f "$TEMP_FILE"' EXIT

PASSED=0
FAILED=0

check_error() {
  local number="$1"
  local description="$2"
  local method="$3"
  local path="$4"
  local expected_status="$5"
  local request_body="${6:-}"

  local request_id="day58-test-${number}"
  local actual_status

  if [[ -n "$request_body" ]]; then
    actual_status=$(curl -sS \
      -o "$TEMP_FILE" \
      -w "%{http_code}" \
      -X "$method" \
      "$BASE_URL$path" \
      -H "Content-Type: application/json" \
      -H "X-Request-Id: $request_id" \
      -d "$request_body") || actual_status="000"
  else
    actual_status=$(curl -sS \
      -o "$TEMP_FILE" \
      -w "%{http_code}" \
      -X "$method" \
      "$BASE_URL$path" \
      -H "X-Request-Id: $request_id") || actual_status="000"
  fi

  if [[ "$actual_status" != "$expected_status" ]]; then
    echo "FAIL [$number] $description"
    echo "  Expected: $expected_status"
    echo "  Received: $actual_status"
    FAILED=$((FAILED + 1))
    return
  fi

  if ! node - "$TEMP_FILE" "$request_id" <<'NODE'
const fs = require('node:fs');

const file = process.argv[2];
const expectedRequestId = process.argv[3];

try {
  const response = JSON.parse(fs.readFileSync(file, 'utf8'));

  const requiredFields = [
    'statusCode',
    'message',
    'path',
    'timestamp',
    'requestId',
  ];

  const hasAllFields = requiredFields.every(
    (field) => Object.prototype.hasOwnProperty.call(response, field),
  );

  if (!hasAllFields) {
    process.exit(1);
  }

  if (response.requestId !== expectedRequestId) {
    process.exit(1);
  }

  if (
    typeof response.message !== 'string' ||
    typeof response.path !== 'string' ||
    typeof response.timestamp !== 'string'
  ) {
    process.exit(1);
  }

  if (
    Object.prototype.hasOwnProperty.call(response, 'stack') ||
    response.message.includes(' at ')
  ) {
    process.exit(1);
  }
} catch {
  process.exit(1);
}
NODE
  then
    echo "FAIL [$number] $description"
    echo "  Error response does not match the standard format."
    FAILED=$((FAILED + 1))
    return
  fi

  echo "PASS [$number] $description"
  PASSED=$((PASSED + 1))
}

echo "======================================"
echo " Addis Eats API - Day 58 Test Suite"
echo "======================================"
echo "Base URL: $BASE_URL"
echo

check_error 1 \
  "Old API route" \
  GET \
  "/api/restaurants" \
  404

check_error 2 \
  "Invalid restaurant body" \
  POST \
  "/api/v1/restaurants" \
  400 \
  '{"name":"","address":""}'

check_error 3 \
  "Invalid dish restaurant ID" \
  POST \
  "/api/v1/dishes" \
  400 \
  '{"restaurantId":-1,"name":"Invalid Dish","priceSantim":15000}'

check_error 4 \
  "Dish references nonexistent restaurant" \
  POST \
  "/api/v1/dishes" \
  422 \
  '{"restaurantId":999,"name":"Unknown Restaurant Dish","priceSantim":15000}'

check_error 5 \
  "Order limit exceeds maximum" \
  GET \
  "/api/v1/orders?limit=999" \
  400

check_error 6 \
  "Negative order offset" \
  GET \
  "/api/v1/orders?offset=-1" \
  400

check_error 7 \
  "Invalid sorting value" \
  GET \
  "/api/v1/orders?sort=invalid" \
  400

check_error 8 \
  "Invalid order status filter" \
  GET \
  "/api/v1/orders?status=invalid" \
  400

check_error 9 \
  "Invalid delivery area" \
  GET \
  "/api/v1/orders?area=Invalid" \
  400

check_error 10 \
  "Invalid TeleBirr phone" \
  POST \
  "/api/v1/orders" \
  400 \
  '{"restaurantId":1,"customer":"Hana","area":"Bole","teleBirrPhone":"12345","lines":[{"dishId":1,"quantity":1}]}'

check_error 11 \
  "Empty order lines" \
  POST \
  "/api/v1/orders" \
  400 \
  '{"restaurantId":1,"customer":"Hana","area":"Bole","lines":[]}'

check_error 12 \
  "Invalid order status update" \
  PATCH \
  "/api/v1/orders/1/status" \
  400 \
  '{"status":"Invalid"}'

echo
echo "======================================"
echo " Results"
echo "======================================"
echo "Passed: $PASSED"
echo "Failed: $FAILED"

if [[ "$FAILED" -gt 0 ]]; then
  exit 1
fi

echo "All 12 invalid-request tests passed!"