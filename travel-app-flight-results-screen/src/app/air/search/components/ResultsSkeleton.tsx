export default function ResultsSkeleton() {
  return (
    <div
      className="space-y-4"
      aria-busy="true"
      aria-label="Loading flight results"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-28 animate-pulse rounded-xl border border-gray-200 bg-white p-4"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-3 w-48 rounded bg-gray-200" />
              <div className="h-3 w-24 rounded bg-gray-200" />
            </div>
            <div className="h-8 w-24 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
