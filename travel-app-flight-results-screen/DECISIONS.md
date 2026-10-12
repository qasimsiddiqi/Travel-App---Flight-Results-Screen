Architecture Decisions
Server vs Client boundary

 - Data fetching and filtering/sorting happen on the server.
      - Only the filter controls (and mobile dialog) are Client Components.
      - This keeps the majority of the page server-rendered and avoids shipping unnecessary JavaScript.

 - URL as the single source of truth

      - Every filter, sort option, and simulate state is reflected in the URL.
      - Refresh, back/forward, and sharing a link all restore the exact same view.

 - Caching

       - Live fares (/air/search + /api/offers) → cache: "no-store"
       - Static route page (/air/flights/karachi-to-dubai) → revalidate = 3600
       - See CACHING.md for full details.

 - Error & edge-case handling

       - Supplier failures are treated as a normal case (not an exception).
       - Partial results show a non-blocking banner.
       - Empty state clearly names active filters and offers a Clear action.
       - Error state keeps the current filters and provides a Retry button.

 - Accessibility

       - Visible focus styles (:focus-visible)
       - Results exposed as a named list (role="list")
       - Live region for result count (aria-live="polite")
       - Mobile filter dialog traps focus and closes on Escape
       - All interactive elements are keyboard operable

 - Known Gaps / Next Steps

       - Price range filter is not yet implemented (only airline, stops, cabin, sort)
       - No real airline logos (only code badges)
       - No multi-city or return-trip support
       - No unit/integration tests yet
       - Could extract filter logic into a shared utility for cleaner testing

 - Scripts:
      - npm run dev          # Start development server
      - npm run build        # Production build
      - npm run start        # Start production server
      - npm run lint         # Run ESLint