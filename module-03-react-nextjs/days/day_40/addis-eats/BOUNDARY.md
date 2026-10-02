# Server and Client Boundaries

## Server Components

The following remain Server Components:

- app/layout.js
- app/page.js
- app/menu/layout.js
- app/menu/page.js
- app/menu/[id]/page.js
- app/cart/page.js
- app/checkout/page.js

## Client Components

The following require the browser:

- components/CartClient.jsx
- app/menu/error.js
- app/checkout/CheckoutForm.jsx

## Why?

Client Components are used where we need:

- useState
- useActionState
- click events
- interactive forms
- browser-side interaction

Everything else stays on the server where possible.
