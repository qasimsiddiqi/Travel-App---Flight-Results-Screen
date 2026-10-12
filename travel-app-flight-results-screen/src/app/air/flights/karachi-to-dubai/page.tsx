import Link from "next/link";

// This page is statically cached and revalidates every hour
export const revalidate = 3600; // 1 hour

export const metadata = {
  title: "Flights from Karachi to Dubai | Travel.pk",
  description:
    "Find the best flights from Karachi (KHI) to Dubai (DXB). Compare prices from multiple airlines.",
};

export default function KarachiToDubaiPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">
        Flights from Karachi to Dubai
      </h1>

      <p className="mt-4 text-gray-600">
        Looking for flights from Karachi (KHI) to Dubai (DXB)? Compare prices
        from Pakistan International Airlines, Emirates, flydubai and more.
      </p>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Popular route</h2>
        <p className="mt-2 text-sm text-gray-600">
          Karachi → Dubai · Multiple daily flights · Non-stop options available
        </p>

        <Link
          href="/air/search?from=KHI&to=DXB&date=2026-11-15&adults=1"
          className="mt-6 inline-block rounded-md bg-teal-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-800"
        >
          Search flights →
        </Link>
      </div>

      <div className="mt-10 text-sm text-gray-500">
        <p>
          This page is statically generated and revalidated every hour. Live
          fares are always fetched fresh on the search results page.
        </p>
      </div>
    </main>
  );
}
