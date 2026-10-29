# AUTH.md — Addis Eats

## Overview

Addis Eats uses a demonstration authentication system built with Next.js 16 App Router, a signed session cookie, Proxy, server-side session verification, and Server Actions.

**This implementation is for learning only.** Demo passwords are hardcoded, and order data is stored in server memory. Production deployment requires a trusted user database, password hashing, durable order storage, and a mature authentication solution.

## Demo Accounts

| Account  | Email             | Role     |
| -------- | ----------------- | -------- |
| Customer | user@example.com  | customer |
| Staff    | staff@example.com | staff    |

Demo password: `password123`

These credentials must never be used for real accounts.

## Route Protection

| Route          | Access                       | Protection                                                               |
| -------------- | ---------------------------- | ------------------------------------------------------------------------ |
| `/`            | Public                       | Session checked to personalize navigation                                |
| `/menu`        | Public                       | No authentication required                                               |
| `/menu/[id]`   | Public                       | Invalid dish IDs return 404                                              |
| `/signin`      | Public                       | Accepts a validated internal return destination                          |
| `/checkout`    | Authenticated                | Proxy and server-side session check                                      |
| `/orders`      | Authenticated                | Proxy, session verification, and user-scoped order query                 |
| `/kitchen`     | Staff only                   | Server-side session and role checks                                      |
| `/api/orders`  | Authenticated                | Route Handler verifies the session and returns the current user's orders |
| `/api/signin`  | Public POST                  | Validates demo credentials and sets the signed session cookie            |
| `/api/signout` | POST                         | Expires the session cookie                                               |
| `placeOrder`   | Authenticated                | Checks the session and validates the requested menu item                 |
| `cancelOrder`  | Authenticated and owner-only | Checks session, order existence, ownership, and eligible status          |

## Session Management

The session cookie is named `session` and contains a signed payload with the user ID, role, and expiration time.

Cookie options:

- `httpOnly: true` prevents ordinary browser JavaScript from reading the cookie.
- `secure` is enabled in production, so the cookie is sent over HTTPS.
- `sameSite: "lax"` provides some protection against cross-site request attacks.
- `maxAge` is seven days.
- `path: "/"` makes the cookie available throughout the application.

`lib/session.js` verifies the signature, checks expiration, and validates the allowed demo identities and roles.

Proxy checks for cookie presence only. It is an early routing check, not the final authorization boundary.

## Authorization and Ownership

The application does not trust a user ID supplied by the browser to determine data ownership.

`getOrdersFor(session.userId)` retrieves only the current user's orders.

The `cancelOrder` Server Action verifies authentication, order existence, ownership, and status before updating an order.

The `placeOrder` action verifies authentication and looks up the requested dish on the server.

The kitchen page requires the verified `staff` role. Hiding a navigation link is not considered a security control.

## Redirect Safety

The sign-in endpoint validates the `next` destination and rejects external destinations, protocol-relative URLs, and backslash-based alternatives.

Invalid destinations fall back to `/`.

## Security Tests

- Signed-out visitors are redirected from checkout and orders.
- Invalid credentials receive HTTP 401.
- A customer cannot view another user's order through the orders page or API.
- A customer cannot cancel another user's order.
- A customer cannot access the staff kitchen page.
- Staff can access the kitchen page.
- Sign-out expires the session cookie.
- External redirect destinations are rejected.
- Order creation validates the requested menu item on the server.

## Known Limitations

This is a classroom demonstration, not production-ready authentication.

- Passwords are hardcoded and are not hashed.
- There is no persistent user database.
- Order arrays exist only in server memory and may reset or diverge across server instances.
- Signed cookies are not individually revocable until expiry without additional server-side session state.
- There is no account recovery, rate limiting, or full CSRF protection strategy.
- Production use requires a mature authentication library, secure password storage, persistent database authorization, and security testing.

## Conclusion

Day 42 demonstrates the difference between authentication and authorization and shows why Proxy, server-rendered pages, Route Handlers, and Server Actions each have different responsibilities.
