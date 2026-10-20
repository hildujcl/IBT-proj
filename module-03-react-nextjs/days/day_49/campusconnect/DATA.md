# DATA.md — Data fetching and refresh strategy

## Data inventory

| Data/query | Location | Key / parameters | Refresh rule | Reason |
| --- | --- | --- | --- | --- |
| Featured events | `app/page.js` imports `lib/data.js` | Static module data | Rebuild/redeploy to change seed content | Public content is small and does not need client state. |
| Event list and filter | `app/events/page.js` passes `events` to `components/EventExplorer.js` | Client state: `query`, `category` | Filter immediately in the browser | Dataset is small; avoids unnecessary network requests. |
| Event details | `app/events/[id]/page.js` | Route param `id` | Server render; `generateStaticParams()` seeds known IDs | Detail page is public and unknown IDs use `notFound()`. |
| Resources | `app/resources/page.js` imports `lib/data.js` | Static resource array | Rebuild/redeploy | Placeholder catalogue; real file storage is not connected. |
| Announcements | `app/announcements/page.js` imports `lib/data.js` | Static announcement array | Rebuild/redeploy | Sample read-only content. |
| Dashboard counts/cards | `app/dashboard/page.js` imports seed arrays | Current signed-in session + seed data | Server render per request; actual data is static | Shows the Server Component boundary and private page check. |
| Events API | `app/api/events/route.js` | `q`, `category` URL params | `Cache-Control: public, s-maxage=60, stale-while-revalidate=300` | Small read-only endpoint demonstrates a Route Handler and HTTP cache policy. |
| Health API | `app/api/health/route.js` | None | New timestamp per request | Deployment smoke test. |
| Session | `lib/auth.js` reads signed cookie | `campusconnect_session` | Revalidated on each server request; expires after 7 days | Authorization data must be checked server-side. |
| Create event action | `lib/actions.js` | Form fields + signed-in session | Validates on every submission | No durable storage adapter is included; action redirects with a confirmation only. |

## Server/client boundary

- Most pages are Server Components by default. They read static seed data or verify the session on the server.
- `components/EventExplorer.js` is a Client Component because search/filter controls need `useState` and browser event handlers.
- Server Actions in `lib/actions.js` perform server-side validation and authorization; the UI is not trusted as a security boundary.
- The event API is a Route Handler returning JSON for future client-side consumers. The current event explorer filters the provided seed data locally and does not call the API.

## Production data plan

Replace `lib/data.js` with a database-backed repository. Add stable query keys for each resource, ownership checks for mutations, pagination for large lists, and a deliberate revalidation strategy after writes. Use a managed file store for downloadable resources. Record the actual refresh rules once that adapter is implemented.
