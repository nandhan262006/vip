import Link from 'next/link'
import type { Metadata } from 'next'
import PortfolioGrid from '@/components/PortfolioGrid'
import { getGalleriesCached, getCategoriesCached } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore our wedding photography and cinematography portfolio.',
  openGraph: {
    title: 'Portfolio | VIP Studio Wedding Photography',
    description: 'Browse our wedding photography and cinematography portfolio in Nellore.',
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

export default async function PortfolioPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category: categoryParam } = await searchParams
  const activeCategory = categoryParam || ''

  let galleries: { id: string; slug: string; title: string; coverImage: string; date: Date; category?: { id: string; title: string; slug: string } | null }[] = []
  let categories: { id: string; title: string; slug: string }[] = []

  try {
    const [g, c] = await Promise.all([getGalleriesCached(), getCategoriesCached()])
    galleries = g
    categories = c
  } catch {
    galleries = []
    categories = []
  }

  const filtered = activeCategory
    ? galleries.filter((g) => g.slug === activeCategory || g.category?.slug === activeCategory)
    : galleries

  const items = filtered.map((g) => ({
    _id: g.id,
    slug: g.slug,
    title: g.title,
    categoryTitle: g.category?.title || '',
    image: g.coverImage,
    date: typeof g.date === 'string' ? g.date : g.date.toISOString(),
  }))

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Portfolio</h1>
      <p className="text-gray-500 mb-8">Explore our work</p>

      <div className="flex flex-wrap gap-3 mb-12">
        <Link href="/portfolio" className={`px-5 py-2 rounded-full text-sm font-medium transition ${!activeCategory ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All</Link>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/portfolio?category=${cat.slug}`} className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeCategory === cat.slug ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{cat.title}</Link>
        ))}
      </div>

      {items.length > 0 ? (
        <PortfolioGrid items={items} single={items.length === 1} />
      ) : (
        <p className="text-gray-400 text-center py-20">No galleries found.</p>
      )}
    </div>
  )
}
