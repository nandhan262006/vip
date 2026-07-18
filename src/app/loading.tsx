export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="relative bg-[#FDF8F3] overflow-hidden">
        <div className="max-w-[1600px] mx-auto md:flex md:min-h-[91vh]">
          <div className="hidden md:block absolute top-0 right-0 w-[58%] h-full bg-gray-200" />
          <div className="relative w-full md:hidden aspect-[3/2] bg-gray-200" />
          <div className="relative z-10 px-6 sm:px-8 lg:px-16 pt-4 pb-4 md:pt-12 md:pb-12 md:w-[42%] space-y-6">
            <div className="h-3 w-24 bg-gray-300 rounded" />
            <div className="h-12 w-3/4 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-100 rounded" />
            <div className="h-4 w-2/3 bg-gray-100 rounded" />
            <div className="h-20 w-64 bg-gray-100 rounded" />
            <div className="flex gap-4">
              <div className="h-12 w-36 bg-gray-200 rounded-xl" />
              <div className="h-12 w-36 bg-gray-100 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="py-24 px-4"><div className="h-8 w-48 bg-gray-200 rounded mx-auto" /></div>
    </div>
  )
}
