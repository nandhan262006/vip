import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore our wedding photography and cinematography portfolio. Browse through bridal, engagement, candid, and event galleries by VIP Studio in Nellore.',
  openGraph: {
    title: 'Portfolio | VIP Studio Wedding Photography',
    description: 'Browse our wedding photography and cinematography portfolio in Nellore. Bridal, candid, engagement, and event photography by National Award Winner Vijay.',
    url: '/portfolio',
    siteName: 'VIP Studio',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/BRIDAL.png', width: 800, height: 600, alt: 'VIP Studio Wedding Photography Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | VIP Studio Wedding Photography',
    description: 'Browse our wedding photography and cinematography portfolio in Nellore.',
    images: ['/BRIDAL.png'],
  },
}

const GALLERIES = [
  { _id: '1', slug: 'bridal', title: 'Bridal Photography', categoryTitle: 'Bridal', image: '/BRIDAL.png', date: '2025-12-01' },
  { _id: '2', slug: 'candid', title: 'Candid Photography', categoryTitle: 'Candid', image: '/CANDID.png', date: '2025-11-15' },
  { _id: '3', slug: 'engagement', title: 'Engagement Photography', categoryTitle: 'Engagement', image: '/ENGAGEMENT.png', date: '2025-10-20' },
  { _id: '4', slug: 'wedding', title: 'Wedding Cinematography', categoryTitle: 'Wedding', image: '/WEDDING.png', date: '2025-09-10' },
  { _id: '5', slug: 'prewedding', title: 'Pre-Wedding Shoot', categoryTitle: 'Pre-Wedding', image: '/PREWEDDING.png', date: '2025-08-05' },
  { _id: '6', slug: 'events', title: 'Event Photography', categoryTitle: 'Events', image: '/CORPERATE.png', date: '2025-07-18' },
]

const CATEGORIES = [
  { _id: 'c1', title: 'Bridal', slug: 'bridal' },
  { _id: 'c2', title: 'Candid', slug: 'candid' },
  { _id: 'c3', title: 'Engagement', slug: 'engagement' },
  { _id: 'c4', title: 'Wedding', slug: 'wedding' },
  { _id: 'c5', title: 'Pre-Wedding', slug: 'prewedding' },
  { _id: 'c6', title: 'Events', slug: 'events' },
]

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category: categoryParam } = await searchParams
  const activeCategory = categoryParam || ''

  const filtered = activeCategory
    ? GALLERIES.filter((g) => g.slug === activeCategory)
    : GALLERIES

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Portfolio</h1>
      <p className="text-gray-500 mb-8">Explore our work</p>

      <div className="flex flex-wrap gap-3 mb-12">
        <Link
          href="/portfolio"
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            !activeCategory
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat._id}
            href={`/portfolio?category=${cat.slug}`}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === cat.slug
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="relative">
          {filtered.length === 1 ? (
            <div className="max-w-lg mx-auto">
              <Link
                href={`/portfolio/${filtered[0].slug}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 block shadow-xl"
              >
                <Image
                  src={filtered[0].image}
                  alt={filtered[0].title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <h3 className="text-2xl font-bold">{filtered[0].title}</h3>
                  <p className="text-white/70 text-sm mt-1">{filtered[0].date}</p>
                </div>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px] md:auto-rows-[260px]">
              {filtered.map((item, i) => {
                const spans = [
                  'md:col-span-2 md:row-span-2',
                  '',
                  'md:row-span-2',
                  '',
                  'md:col-span-2',
                  '',
                ]
                return (
                  <Link
                    key={item._id}
                    href={`/portfolio/${item.slug}`}
                    className={`group relative overflow-hidden rounded-xl bg-gray-100 ${spans[i % spans.length]}`}
                  >
                    <Image
                      src={item.image}
                      alt={`${item.title} by VIP Studio`}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-2 group-hover:translate-y-0 transition duration-300 opacity-0 group-hover:opacity-100">
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <p className="text-xs text-white/60">{item.date}</p>
                    </div>
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition duration-300">
                      {item.categoryTitle}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-20">No galleries found.</p>
      )}
    </div>
  )
}
