# Caching Strategy

## What is cached

- `/air/flights/karachi-to-dubai`
  - Uses `export const revalidate = 3600` (1 hour)
  - This is a thin marketing / SEO page with static content
  - Safe to cache because it does not show live prices

## What is NOT cached

- `/air/search`
  - Flight offers are fetched with `cache: "no-store"`
  - Live fares must always be fresh
  - URL search params control filters, sorting, and simulate states

- `/api/offers`
  - No caching headers
  - Artificial delay (1200–2500ms) to simulate real supplier latency
  - Supports `simulate` query param for testing edge cases

## Why this split?

Live flight prices change frequently and come from flaky suppliers. Caching them would show wrong prices. The static route page only contains general information, so it can safely be cached and revalidated.

## What breaks if reversed?

- If we cached `/air/search` or `/api/offers`: users would see outdated prices and wrong availability.
- If we did **not** cache `/air/flights/karachi-to-dubai`: unnecessary server work on every visit for content that rarely changes.