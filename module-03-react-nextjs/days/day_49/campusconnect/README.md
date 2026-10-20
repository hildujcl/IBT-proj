# CampusConnect — Module 3 Day 49 Capstone

CampusConnect is a responsive campus community website for discovering student events, finding study resources, reading announcements, and trying a protected student dashboard flow. It is built with **Next.js App Router, JavaScript, React Server Components, Server Actions, and CSS**.

> **Prototype scope:** this repository demonstrates server-verified signed sessions and protected server actions, but it is not a production identity or database system. Signup does not persist accounts/passwords, event submissions are validated but not saved, and event/resource content is sample data in `lib/data.js`. Read `AUTH.md` and `DATA.md` before deploying or presenting security claims.

## Routes

| Route | File | Purpose |
| --- | --- | --- |
| `/` | `app/page.js` | Landing page and featured events |
| `/events` | `app/events/page.js` | Searchable and filterable event list |
| `/events/[id]` | `app/events/[id]/page.js` | Event detail; unknown IDs use `notFound()` |
| `/resources` | `app/resources/page.js` | Learning resource directory |
| `/announcements` | `app/announcements/page.js` | Campus announcements |
| `/signin` | `app/signin/page.js` | Demo sign-in form |
| `/signup` | `app/signup/page.js` | Demo account/session form |
| `/dashboard` | `app/dashboard/page.js` | Protected student dashboard |
| `/create-event` | `app/create-event/page.js` | Protected, server-validated event form |
| `/profile` | `app/profile/page.js` | Protected profile overview |
| `/api/events` | `app/api/events/route.js` | JSON endpoint with query/category filters |
| `/api/health` | `app/api/health/route.js` | Health-check endpoint |
| `/robots.txt` | `app/robots.js` | Generated crawler rules |
| `/sitemap.xml` | `app/sitemap.js` | Generated public route sitemap |

## Requirements

- Node.js 20.9 or later (recommended for Next.js 16)
- npm
- Git (for version control)

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

On Windows PowerShell, copy the environment file with:

```powershell
Copy-Item .env.example .env.local
```

Open [http://localhost:3000](http://localhost:3000). The default demo sign-in is `student@campusconnect.test` / `Campus123!`. Change these values in `.env.local` if you prefer. Never use the sample password in a real environment.

## Environment variables

| Variable | Purpose |

| `AUTH_SECRET` | HMAC signing key for the demo session cookie. Use a random secret of at least 32 characters in production. |
| `DEMO_EMAIL` | Demo sign-in email |
| `DEMO_PASSWORD` | Demo sign-in password |
| `NEXT_PUBLIC_SITE_URL` | Absolute public site origin used for metadata, robots, and sitemap |

Do not commit `.env.local` or real secrets. `.gitignore` excludes `.env*` while allowing `.env.example`.

## Quality checks

```bash
npm run lint
npm test
npm run build
npm start
```

Test the production build at `http://localhost:3000` after `npm start`. Test `/api/events?q=web`, `/api/health`, `/robots.txt`, and `/sitemap.xml`.

## Automated tests and performance audit

`npm test` runs the built-in Node test suite for session token integrity, expiration, malformed tokens, and safe return URLs. `npm run perf:audit` checks key routes for HTTP status, response size, and request duration while the server is running. For Lighthouse CI, run `npx lhci autorun` after starting the site, or set `PERF_BASE_URL` to your deployed URL. The CI config performs three runs and checks performance/accessibility/SEO thresholds. A lab run does not prove field INP.

`PERF.md` separates checks that have actually run from checks still requiring a local server, a browser, or a deployed URL. No Lighthouse or deployed-site scores are claimed until measured.

## Security checks for the capstone

1. Open `/dashboard`, `/profile`, and `/create-event` in a private window while signed out; each should redirect to sign-in.
2. Sign in, then submit the dashboard “Verify my session” action; the action checks the session on the server and only accepts the current user's ID.
3. Change the hidden `targetId` in DevTools or replay the server action with another ID; it must be rejected. Do not treat client-side hiding as authorization.
4. Try `/signin?next=https://example.com`; successful sign-in must not redirect to that external URL.
5. Inspect the browser bundle and repository history for secrets. Rotating a committed secret is required; deleting the current file alone is not enough.

## Before production deployment

- Replace demo authentication with a persistent user database and a vetted auth/password-hashing solution.
- Add a database-backed event model, attendee registrations, resource files/URLs, and per-record ownership/authorization checks.
- Add CSRF/rate limiting and abuse controls appropriate to the chosen auth/database architecture.
- Set `AUTH_SECRET` and `NEXT_PUBLIC_SITE_URL` in the hosting provider's environment settings.
- Run the Day 49 deployed-site verification battery and record real Lighthouse/Core Web Vitals in `PERF.md`.

## Documentation

- `AUTH.md` — session model, private routes, and attack checks
- `DATA.md` — where each query runs, keys, and refresh behavior
- `PERF.md` — budget and measurement record template
- `FUTURE.md` — intentionally deferred work

## Design notes

The design uses a purple/lilac visual identity, semantic landmarks, keyboard-visible focus, a skip link, descriptive image alt text, responsive layouts, reduced-motion support, metadata, and explicit loading/error/empty states. Remote Unsplash images and Google Fonts require network access; replace them with optimized local assets before a strict offline or performance-sensitive deployment.
