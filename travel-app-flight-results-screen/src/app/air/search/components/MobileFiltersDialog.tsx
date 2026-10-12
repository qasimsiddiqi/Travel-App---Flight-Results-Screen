"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileFiltersDialog({ isOpen, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Focus trap + Escape key
  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    // Focus the first focusable element
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    // Prevent background scroll
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/air/search?${params.toString()}`);
  };

  const currentStops = searchParams.get("stops") || "";
  const currentCabin = searchParams.get("cabin") || "";
  const currentSort = searchParams.get("sort") || "price_asc";
  const currentAirlines = searchParams.get("airlines") || "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-filters-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog panel */}
      <div
        ref={dialogRef}
        className="relative z-10 w-full rounded-t-2xl bg-white p-5 shadow-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="mobile-filters-title" className="text-lg font-semibold">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            aria-label="Close filters"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Stops */}
          <div>
            <label
              htmlFor="mobile-stops"
              className="mb-1 block text-sm font-medium"
            >
              Stops
            </label>
            <select
              id="mobile-stops"
              value={currentStops}
              onChange={(e) => updateParam("stops", e.target.value || null)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Any</option>
              <option value="0">Non-stop</option>
              <option value="1">1 stop</option>
            </select>
          </div>

          {/* Cabin */}
          <div>
            <label
              htmlFor="mobile-cabin"
              className="mb-1 block text-sm font-medium"
            >
              Cabin
            </label>
            <select
              id="mobile-cabin"
              value={currentCabin}
              onChange={(e) => updateParam("cabin", e.target.value || null)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Any</option>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* Airlines */}
          <div>
            <label
              htmlFor="mobile-airlines"
              className="mb-1 block text-sm font-medium"
            >
              Airline
            </label>
            <select
              id="mobile-airlines"
              value={currentAirlines}
              onChange={(e) => updateParam("airlines", e.target.value || null)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="">Any</option>
              <option value="PK">Pakistan International Airlines</option>
              <option value="EK">Emirates</option>
              <option value="QR">Qatar Airways</option>
              <option value="FZ">flydubai</option>
              <option value="EY">Etihad Airways</option>
              <option value="SV">Saudia</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label
              htmlFor="mobile-sort"
              className="mb-1 block text-sm font-medium"
            >
              Sort by
            </label>
            <select
              id="mobile-sort"
              value={currentSort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            >
              <option value="price_asc">Price (low to high)</option>
              <option value="price_desc">Price (high to low)</option>
              <option value="duration_asc">Duration (shortest)</option>
              <option value="departure_asc">Departure (earliest)</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => {
              const params = new URLSearchParams();
              if (searchParams.get("from"))
                params.set("from", searchParams.get("from")!);
              if (searchParams.get("to"))
                params.set("to", searchParams.get("to")!);
              if (searchParams.get("date"))
                params.set("date", searchParams.get("date")!);
              if (searchParams.get("adults"))
                params.set("adults", searchParams.get("adults")!);
              router.push(`/air/search?${params.toString()}`);
              onClose();
            }}
            className="flex-1 rounded-md border border-gray-300 py-2.5 text-sm font-medium"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-md bg-teal-700 py-2.5 text-sm font-medium text-white"
          >
            Show results
          </button>
        </div>
      </div>
    </div>
  );
}
