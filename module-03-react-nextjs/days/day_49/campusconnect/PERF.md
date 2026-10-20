# PERF.md — Performance budget and verification record

## Targets from the Day 49 assessment sheet

| Metric | Target | How to measure |
|---|---:|---|
| Largest Contentful Paint (LCP) | < 2.5 s | Lighthouse on the deployed URL, throttled mobile profile |
| Cumulative Layout Shift (CLS) | ≤ 0.1 | Lighthouse on the deployed URL |
| Interaction to Next Paint (INP) | ≤ 200 ms | Real-user field data when available; Lighthouse/TBT is only a lab proxy, not INP |
| Accessibility score | ≥ 90/100 | Lighthouse and keyboard/manual checks |
| SEO score | ≥ 90/100 | Lighthouse and view-source checks |
| Images | ~150 kB or less each | Network panel; inspect transfer size and format |

## Automated checks included

- `npm test` — Node test suite for session token integrity, expiry, malformed tokens and open-redirect protection.
- `npm run perf:audit` — requests key routes and records HTTP status, response body bytes and response duration.
- `npx lhci autorun` — runs the configured Lighthouse CI collection against the base URL.

## Run the checks

1. Install dependencies: `npm install`.
2. Start the production build: `npm run build && npm start`.
3. In a second terminal run `npm test`.
4. Run the HTTP audit: `npm run perf:audit`.
5. For a deployed URL, set `PERF_BASE_URL=https://your-real-domain.example` before running `npm run perf:audit` and `npx lhci autorun`.
6. Run Lighthouse on the deployed URL in Chrome DevTools, with mobile throttling and three runs. Record median LCP/CLS, the performance/accessibility/SEO scores and date below.
7. Test keyboard-only navigation and a real phone separately; automated scores do not replace those checks.

## Results log — fill with real results, do not estimate

| Environment/date | Test | Result | Status |
|---|---|---|---|
| Local source test, 2026-10-20 | `npm test` | 6 tests passed, 0 failed; 73.0 ms reported by Node test runner | PASS |
| Static CSS asset | `app/globals.css` | 25,949 bytes (25.3 KiB) raw source; not a compressed transfer measurement | OBSERVED |
| Social preview asset | `public/og-campusconnect.svg` | 1,033 bytes raw SVG | OBSERVED |
| Local HTTP audit | `npm run perf:audit` | Not run: Next.js server/dependencies not installed in this build environment | NOT RUN |
| Production build | `npm run build` | Not run in this build environment | NOT RUN |
| Deployed Lighthouse (3 runs) | LCP / CLS / INP proxy / Performance / Accessibility / SEO | Requires deployed URL and browser Lighthouse run | NOT MEASURED |
| Keyboard-only / real phone | Manual verification | Must be performed on the running/deployed application | NOT VERIFIED |

**Important:** No deployed URL was supplied, and Lighthouse/browser measurements cannot honestly be reported from static source files. Do not claim the Day 49 performance battery has passed until the deployed checks have been run and recorded. Lighthouse lab Total Blocking Time is not the same as field INP.
