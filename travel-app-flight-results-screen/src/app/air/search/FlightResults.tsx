import { FlightOffer } from "./types";
import FlightCard from "./components/FlightsCard";

type Props = {
  queryString: string;
  searchParams: {
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
};

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }

  console.log("VERCEL URL -->> ", process.env.VERCEL_PRODUCTION_URL);

  // Production Vercel deployment domain
  if (
    process.env.VERCEL_PRODUCTION_URL &&
    process.env.PRODUCTION_ENVIRONMENT === "true"
  ) {
    return `${process.env.VERCEL_PRODUCTION_URL}`;
  }

  // Local development fallback
  return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
}

async function getOffers(queryString: string) {
  const baseUrl = getBaseUrl();
  console.log("Base url --->> ", baseUrl);
  const res = await fetch(`${baseUrl}/api/offers?${queryString}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch offers");
  }

  return res.json();
}

function applyFiltersAndSort(
  offers: FlightOffer[],
  params: Props["searchParams"],
): FlightOffer[] {
  let result = [...offers];

  // Filter by stops
  if (params.stops !== undefined && params.stops !== "") {
    const stopsNum = Number(params.stops);
    result = result.filter((o) => o.stops === stopsNum);
  }

  // Filter by cabin
  if (params.cabin) {
    result = result.filter(
      (o) => o.cabin.toLowerCase() === params.cabin!.toLowerCase(),
    );
  }

  // Filter by airline code
  if (params.airlines) {
    result = result.filter((o) => o.airlineCode === params.airlines);
  }

  // Data Sorting
  const sort = params.sort || "price_asc";

  switch (sort) {
    case "price_desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "duration_asc":
      result.sort((a, b) => a.durationMinutes - b.durationMinutes);
      break;
    case "departure_asc":
      result.sort(
        (a, b) =>
          new Date(a.departTime).getTime() - new Date(b.departTime).getTime(),
      );
      break;
    case "price_asc":
    default:
      result.sort((a, b) => a.price - b.price);
      break;
  }

  return result;
}

export default async function FlightResults({
  queryString,
  searchParams,
}: Props) {
  let data;

  try {
    data = await getOffers(queryString);
  } catch (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <h2 className="text-lg font-semibold text-red-800">
          Something went wrong
        </h2>
        <p className="mt-2 text-sm text-red-600">
          We couldn’t load flight results right now. Please try again.
        </p>
        <a
          href={`/air/search?${new URLSearchParams(
            searchParams as Record<string, string>,
          ).toString()}`}
          className="mt-4 inline-block rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Retry
        </a>
      </div>
    );
  }

  const { offers, failedAirlines } = data;

  // Apply filters & sorting
  const filteredOffers = applyFiltersAndSort(offers || [], searchParams);

  // Empty state
  if (filteredOffers.length === 0) {
    const activeFilters: string[] = [];
    if (searchParams.stops) activeFilters.push(`Stops: ${searchParams.stops}`);
    if (searchParams.cabin) activeFilters.push(`Cabin: ${searchParams.cabin}`);
    if (searchParams.airlines)
      activeFilters.push(`Airline: ${searchParams.airlines}`);

    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <h2 className="text-lg font-semibold text-gray-900">
          No flights found
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {activeFilters.length > 0
            ? `Active filters: ${activeFilters.join(" · ")}`
            : "Try adjusting your search."}
        </p>
        <a
          href={`/air/search?from=${searchParams.from || "KHI"}&to=${
            searchParams.to || "DXB"
          }&date=${searchParams.date || "2026-11-15"}&adults=${
            searchParams.adults || "1"
          }`}
          className="mt-4 inline-block text-sm font-medium text-teal-700 hover:underline"
        >
          Clear filters
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Partial results banner */}
      {failedAirlines && failedAirlines.length > 0 && (
        <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Some airlines could not be reached ({failedAirlines.join(", ")}).
          Showing available results.
        </div>
      )}

      {/* Results count */}
      <p className="mb-4 text-sm text-gray-600" aria-live="polite">
        {filteredOffers.length} flight
        {filteredOffers.length !== 1 ? "s" : ""} found
      </p>

      <ul className="space-y-3" role="list" aria-label="Flight results">
        {filteredOffers.map((offer: FlightOffer) => (
          <FlightCard key={offer.id} offer={offer} />
        ))}
      </ul>
    </div>
  );
}
