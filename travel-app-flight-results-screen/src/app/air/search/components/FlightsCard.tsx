import { FlightOffer } from "../types";
import {
  formatPrice,
  formatTime,
  formatDuration,
  formatStops,
} from "../../../utils/helper";

type Props = {
  offer: FlightOffer;
};

export default function FlightCard({ offer }: Props) {
  return (
    <li className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left side – airline + times */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">
              {offer.airlineCode}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {offer.airline}
            </span>
            <span className="text-sm text-gray-500">{offer.flightNumber}</span>
          </div>

          <div className="mt-3 flex items-center gap-4">
            {/* Departure */}
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {formatTime(offer.departTime)}
              </p>
              <p className="text-sm text-gray-500">
                {offer.from} · {offer.fromCity}
              </p>
            </div>

            {/* Duration + stops */}
            <div className="flex flex-col items-center px-2">
              <p className="text-xs text-gray-500">
                {formatDuration(offer.durationMinutes)}
              </p>
              <div className="my-1 h-px w-12 bg-gray-300" />
              <p className="text-xs text-gray-500">
                {formatStops(offer.stops)}
              </p>
            </div>

            {/* Arrival */}
            <div>
              <p className="text-lg font-semibold text-gray-900">
                {formatTime(offer.arriveTime)}
              </p>
              <p className="text-sm text-gray-500">
                {offer.to} · {offer.toCity}
              </p>
            </div>
          </div>
        </div>

        {/* Right side – price */}
        <div className="flex flex-col items-end gap-1 border-t border-gray-100 pt-3 sm:border-t-0 sm:pt-0">
          <p className="text-xl font-bold text-teal-700">
            {formatPrice(offer.price)}
          </p>
          <p className="text-xs text-gray-500">{offer.cabin}</p>
          <p className="text-xs text-gray-400">{offer.aircraft}</p>
        </div>
      </div>
    </li>
  );
}
