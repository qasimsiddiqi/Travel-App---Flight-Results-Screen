# Travel.pk – Flight Results Page

Frontend-only Next.js (App Router) implementation of a flight search results screen for Travel.pk.

Built as part of the TechAbout Frontend Developer assessment.

## Features

- URL-driven search (`/air/search`) – all state lives in the URL
- Synthetic flight offers API with controllable delay and failure modes
- Four required states: Loading, Empty, Error, Partial
- Server Components first + Suspense with non-jumping skeleton
- Client Components only for interactive filters
- PKR formatting via `Intl.NumberFormat`
- Proper time display with timezone offsets
- Accessible: keyboard navigation, visible focus, live region, focus-trapping mobile filter dialog
- Cached static page at `/air/flights/karachi-to-dubai`

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- No external UI libraries

## Getting Started (≈ 5–10 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

Open http://localhost:3000

- Main Routes:

  - "/" - Simple home page with link to search
  - "/air/search" - Flight results page (URL-driven)
  - "/api/offers" - Synthetic offers API
  - "/air/flights/karachi-to-dubai" - Cached static marketing page

- Testing the five States:
  All states are controlled by the simulate query parameter.

  - Normal       - "http://localhost:3000/air/search?from=KHI&to=DXB&date=2026-11-15&adults=1"
  - slow         - "http://localhost:3000/air/search?from=KHI&to=DXB&date=2026-11-15&adults=1&simulate=slow"
  - empty        - "http://localhost:3000/air/search?from=KHI&to=DXB&date=2026-11-15&adults=1&simulate=empty"
  - error (503)  - "http://localhost:3000/air/search?from=KHI&to=DXB&date=2026-11-15&adults=1&simulate=error"
  - partial      - "http://localhost:3000/air/search?from=KHI&to=DXB&date=2026-11-15&adults=1&simulate=partial"

- Architecture Decisions:
  All the architecture decisions made in the project with reasoning are available in "DECISIONS.md" file
