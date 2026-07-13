export default function Loading() {
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-96 bg-gray-100 rounded mb-8" />
      <div className="flex flex-wrap gap-3 mb-12">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-gray-100 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-[4/5] bg-gray-100 rounded-xl" />
        ))}
      </div>
    </div>
  )
}
