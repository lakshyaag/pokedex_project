export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Back Button Skeleton */}
        <div className="h-6 w-32 bg-secondary rounded animate-pulse" />

        {/* Main Content Skeleton */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <div className="h-6 w-16 bg-secondary rounded mb-2 animate-pulse" />
                <div className="h-10 w-48 bg-secondary rounded animate-pulse" />
              </div>

              <div className="w-full aspect-square bg-secondary rounded-lg animate-pulse" />

              <div className="flex gap-2 justify-center">
                <div className="h-8 w-20 bg-secondary rounded-full animate-pulse" />
                <div className="h-8 w-20 bg-secondary rounded-full animate-pulse" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-secondary rounded-lg animate-pulse" />
                <div className="h-20 bg-secondary rounded-lg animate-pulse" />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <div className="h-8 w-32 bg-secondary rounded mb-4 animate-pulse" />
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 bg-secondary rounded animate-pulse" />
                      <div className="h-2 bg-secondary rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="h-8 w-32 bg-secondary rounded mb-4 animate-pulse" />
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-12 bg-secondary rounded-lg animate-pulse" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
