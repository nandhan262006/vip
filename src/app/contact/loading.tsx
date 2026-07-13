export default function Loading() {
  return (
    <div className="py-20 px-4 max-w-3xl mx-auto animate-pulse">
      <div className="h-8 w-40 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-80 bg-gray-100 rounded mb-10" />
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="h-6 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-1/2 bg-gray-100 rounded" />
        </div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-100 rounded-lg" />
          <div className="h-12 bg-gray-100 rounded-lg" />
          <div className="h-32 bg-gray-100 rounded-lg" />
          <div className="h-12 bg-red/20 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
