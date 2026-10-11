import { NextRequest, NextResponse } from "next/server";
import offers from "@/data/offers.json";

// Helper to create a delay
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const simulate = searchParams.get("simulate") || "ok";

  // Random delay between 1200–2500ms
  const delayMs =
    simulate === "slow"
      ? 3500
      : Math.floor(Math.random() * (2500 - 1200 + 1)) + 1200;

  await delay(delayMs);

  // To handle different simulate states
  if (simulate === "error") {
    return NextResponse.json(
      { error: "Supplier unavailable. Please try again later." },
      { status: 503 },
    );
  }

  if (simulate === "empty") {
    return NextResponse.json({
      offers: [],
      failedAirlines: [],
      meta: { total: 0, simulate },
    });
  }

  if (simulate === "partial") {
    // Return only some offers + list of failed airlines
    const partialOffers = offers.slice(0, 8);
    return NextResponse.json({
      offers: partialOffers,
      failedAirlines: ["Emirates", "Qatar Airways", "Turkish Airlines"],
      meta: { total: partialOffers.length, simulate },
    });
  }

  // Default: ok (or slow)
  return NextResponse.json({
    offers,
    failedAirlines: [],
    meta: { total: offers.length, simulate },
  });
}
