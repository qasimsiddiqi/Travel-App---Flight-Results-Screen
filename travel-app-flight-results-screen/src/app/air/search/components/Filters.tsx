"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MobileFiltersDialog from "./MobileFiltersDialog";

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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

  const clearFilters = () => {
    const params = new URLSearchParams();
    if (searchParams.get("from")) params.set("from", searchParams.get("from")!);
    if (searchParams.get("to")) params.set("to", searchParams.get("to")!);
    if (searchParams.get("date")) params.set("date", searchParams.get("date")!);
    if (searchParams.get("adults"))
      params.set("adults", searchParams.get("adults")!);
    router.push(`/air/search?${params.toString()}`);
  };

  return (
    <>
      {/* Mobile: Show Filters button */}
      <div className="mb-4 sm:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-800 shadow-sm"
        >
          <span>Filters & Sort</span>
        </button>
      </div>

      {/* Desktop filters */}
      <div className="mb-6 hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:block">
        <div className="flex flex-wrap items-end gap-4">
          {/* Stops */}
          <div>
            <label
              htmlFor="stops"
              className="mb-1 block text-xs font-medium text-gray-700"
            >
              Stops
            </label>
            <select
              id="stops"
              value={currentStops}
              onChange={(e) => updateParam("stops", e.target.value || null)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="">Any</option>
              <option value="0">Non-stop</option>
              <option value="1">1 stop</option>
            </select>
          </div>

          {/* Cabin */}
          <div>
            <label
              htmlFor="cabin"
              className="mb-1 block text-xs font-medium text-gray-700"
            >
              Cabin
            </label>
            <select
              id="cabin"
              value={currentCabin}
              onChange={(e) => updateParam("cabin", e.target.value || null)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="">Any</option>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* Airlines */}
          <div>
            <label
              htmlFor="airlines"
              className="mb-1 block text-xs font-medium text-gray-700"
            >
              Airline
            </label>
            <select
              id="airlines"
              value={currentAirlines}
              onChange={(e) => updateParam("airlines", e.target.value || null)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
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
              htmlFor="sort"
              className="mb-1 block text-xs font-medium text-gray-700"
            >
              Sort by
            </label>
            <select
              id="sort"
              value={currentSort}
              onChange={(e) => updateParam("sort", e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="price_asc">Price (low to high)</option>
              <option value="price_desc">Price (high to low)</option>
              <option value="duration_asc">Duration (shortest)</option>
              <option value="departure_asc">Departure (earliest)</option>
            </select>
          </div>

          {/* Clear filters */}
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Clear filters
          </button>
        </div>
      </div>

      {/* Mobile Dialog */}
      <MobileFiltersDialog
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
      />
    </>
  );
}
