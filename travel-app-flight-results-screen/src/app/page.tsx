import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center h-screen">
      <div className="mx-auto max-w-xl p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold tracking-tight">Travel.pk</h1>

        <p className="mt-4 text-gray-600 text-lg">Flight results assessment</p>

        <Link
          href="/air/search?from=KHI&to=DXB&date=2026-11-15&adults=1"
          className="mt-6 inline-block rounded-md bg-teal-700 px-5 py-3 font-bold text-white transition hover:bg-teal-800"
        >
          Go to Flight Search Results →
        </Link>
      </div>
    </main>
  );
}
