# Addis Eats Rendering Strategy

## /

The home page is a simple Server Component.

It does not need browser state.

## /menu

The menu is rendered on the server.

Dish data is accessed directly from `lib/dishes.js`.

## /menu/[id]

Dish detail pages use dynamic routes.

`generateStaticParams()` allows known dishes to be generated ahead of time.

## /cart

The cart uses a Client Component because it needs:

- useState
- button events
- quantity changes
- removing items

## /checkout

The checkout page uses a Server Component together with a Client Component for the interactive form.

The form calls a Server Action for validation and order processing.

## /api/orders

The Route Handler provides a POST API endpoint for creating orders.
