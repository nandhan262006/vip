export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="py-28 px-4 bg-gray-200" />
      <div className="py-20 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-14">
        <div className="aspect-[3/4] bg-gray-100 rounded-2xl" />
        <div className="space-y-4">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-8 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-2/3 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  )
}
