import { Suspense } from "react";
import ResultsSkeleton from "./components/ResultsSkeleton";
import FlightResults from "./FlightResults";
import Filters from "./components/Filters";

type SearchParams = {
  from?: string;
  to?: string;
  date?: string;
  adults?: string;
  cabin?: string;
  stops?: string;
  airlines?: string;
  price?: string;
  sort?: string;
  simulate?: string;
};

export default async function FlightSearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const query = new URLSearchParams();
  if (params.simulate) query.set("simulate", params.simulate);

  const queryString = query.toString();
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Flight Results
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          {params.from || "KHI"} → {params.to || "DXB"} ·{" "}
          {params.date || "2026-11-15"} · {params.adults || "1"} adult
        </p>
      </div>

      {/* Filters (Client Component) */}
      <Suspense fallback={<ResultsSkeleton />}>
        <Filters />
      </Suspense>

      {/* Results with Suspense */}
      <Suspense fallback={<ResultsSkeleton />}>
        <FlightResults queryString={queryString} searchParams={params} />
      </Suspense>
    </main>
  );
}
