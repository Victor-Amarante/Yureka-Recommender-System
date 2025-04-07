export function VideoPreviewSkeletons() {
  return (
    <>
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="group shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 p-4 transition duration-200 hover:shadow-xl border-white/[0.2] bg-black shadow-none"
          >
            <div className="relative aspect-video rounded-t-lg mb-4">
              <div className="h-full w-full bg-gray-700 animate-pulse rounded-lg"></div>
            </div>

            <div className="px-2">
              <div className="h-5 bg-gray-700 animate-pulse rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-700 animate-pulse rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-700 animate-pulse rounded w-1/3"></div>
            </div>
          </div>
        ))}
    </>
  );
}
