# AUTH.md — Authentication and authorization

## Current implementation

- `lib/auth.js` creates and verifies an HMAC-SHA256 signed session token. The cookie is `HttpOnly`, `SameSite=Lax`, path-wide, expires after seven days, and is marked `Secure` in production.
- `lib/actions.js` verifies demo sign-in credentials from environment variables. Signup creates a signed demo session after validating input, but does **not** store an account or password. This is intentionally a teaching prototype, not production authentication.
- `requireUser()` in `lib/auth.js` protects server-rendered private pages.
- `createEventAction` and `protectedPingAction` independently check the session on the server. Client UI visibility is not the authorization boundary.
- The `next` parameter is limited to local relative paths beginning with one slash and not two, to block a crafted external return URL.

## Private routes

| Route/action | Protection layer | What it proves |
| --- | --- | --- |
| `/dashboard` | `requireUser()` in Server Component | A missing/invalid/expired session redirects to `/signin`. |
| `/profile` | `requireUser()` in Server Component | Profile details require a valid session. |
| `/create-event` | `requireUser()` in Server Component | Event form page is private. |
| `createEventAction` | `getSession()` inside Server Action | A caller cannot create/submit without a valid signed session. Input is validated server-side. |
| `protectedPingAction` | `getSession()` and target-ID comparison | Signed-out callers and mismatched record IDs are rejected. |
| `signOutAction` | Clears session cookie | The browser's current demo session is invalidated by removing the cookie. |

## Three attack checks (run on deployed URL)

1. **Signed out write:** invoke a protected action while signed out. It must redirect to sign-in. For example, open `/create-event` in a private window and verify the server redirects.
2. **Other user's record ID:** sign in and replay `protectedPingAction` with a `targetId` different from the session ID. The action redirects with a forbidden status in the dashboard query string. A real data mutation must additionally scope its database query by the authenticated user's ID/role.
3. **Crafted return link:** open `/signin?next=https://example.com`, sign in, and verify the app returns to `/dashboard`, not the external site.

Also change an ID in a private URL and verify `app/events/[id]/page.js` returns the not-found page for unknown event IDs. This static event-detail page is public; it is not an example of private record authorization.

## Important limitations

- Signup is not persistent and does not hash/store passwords. Demo sign-in accepts only the configured demo credentials.
- The HMAC cookie provides integrity, not account storage, account revocation, or a complete identity provider.
- No database-backed user ownership exists yet. Before real private records are added, implement authorization in every read/write operation, not just in page layouts.
- Do not put real secrets in source control. Rotate any secret that was ever committed.

## Automated security tests

Run `npm run test:security` or `npm test`. Tests cover signed token acceptance, signature tampering, expiration, malformed tokens, and external/protocol-relative return URL rejection. These are unit tests, not a substitute for the three required attacks against the deployed application.

## Required deployed verification battery

1. **Signed out write action:** submit/call a protected server action without a session; it must refuse and redirect to sign-in. The action itself must check the session, not only the page.
2. **Another user's record ID:** attempt an ID belonging to a different account; the server must verify ownership before returning or changing that record. The current demo has no persistent user-owned record database, so this ownership test must be implemented when persistence is added.
3. **Crafted return URL:** open `/signin?next=https://example.com`; after successful sign-in, navigation must remain on this site. `safeReturnPath` rejects external, protocol-relative, backslash and CR/LF values.

Do not mark all three deployed attacks PASS until you have performed and recorded each one on the live URL.
