export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-PK", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

export function formatStops(stops: number): string {
  if (stops === 0) return "Non-stop";
  if (stops === 1) return "1 stop";
  return `${stops} stops`;
}
