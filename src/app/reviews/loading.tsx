export default function Loading() {
  return (
    <div className="py-20 px-4 max-w-5xl mx-auto animate-pulse">
      <div className="text-center mb-16">
        <div className="h-4 w-24 bg-gray-200 rounded mx-auto" />
        <div className="h-8 w-64 bg-gray-200 rounded mx-auto mt-3" />
        <div className="h-4 w-96 bg-gray-100 rounded mx-auto mt-4" />
      </div>
      <div className="space-y-10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-100 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-32 bg-gray-200 rounded" />
                <div className="h-3 w-20 bg-gray-100 rounded" />
                <div className="h-3 w-24 bg-gray-100 rounded" />
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-5/6" />
              <div className="h-3 bg-gray-100 rounded w-4/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
