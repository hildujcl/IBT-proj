# FUTURE.md — Deferred work

These items are deliberately outside this capstone prototype so the main routes and verification can be completed first.

## Must before production
- Integrate a persistent database and a vetted authentication provider/password-hashing flow.
- Persist event creation and attendance registration; add per-record ownership/role authorization.
- Store resource files in managed object storage and provide real download URLs.
- Add request rate limits, abuse controls, logging, and a privacy/data-retention policy.
- Replace demo credentials and set a strong production `AUTH_SECRET`.

## Should next
- Add pagination and server-side search for larger event/resource catalogues.
- Connect the event explorer to `/api/events` with a deliberate client cache strategy.
- Add event reminders, saved events, and a proper attendee registration workflow.
- Optimize remote imagery with local optimized assets and measure Core Web Vitals.
- Add automated tests for auth redirects, invalid IDs, server actions, and empty/error states.

## Could later
- Calendar export, club profiles, event recommendations, dark mode, and subtle animations.
- Admin moderation tools and richer analytics.
