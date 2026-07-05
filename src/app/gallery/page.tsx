import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse our complete wedding photography and cinematography gallery by VIP Studio.',
  openGraph: {
    title: 'Gallery | VIP Studio Wedding Photography',
    description: 'View our complete collection of wedding photography and cinematography work in Nellore.',
  },
}

const ALL_IMAGES = [
  { src: '/BRIDAL.png', galleryTitle: 'Bridal Photography', gallerySlug: 'bridal' },
  { src: '/CANDID.png', galleryTitle: 'Candid Photography', gallerySlug: 'candid' },
  { src: '/ENGAGEMENT.png', galleryTitle: 'Engagement Photography', gallerySlug: 'engagement' },
  { src: '/WEDDING.png', galleryTitle: 'Wedding Cinematography', gallerySlug: 'wedding' },
  { src: '/PREWEDDING.png', galleryTitle: 'Pre-Wedding Shoot', gallerySlug: 'prewedding' },
  { src: '/CORPERATE.png', galleryTitle: 'Event Photography', gallerySlug: 'events' },
  { src: '/HERO.png', galleryTitle: 'Bridal Photography', gallerySlug: 'bridal' },
  { src: '/MATERNITY.png', galleryTitle: 'Candid Photography', gallerySlug: 'candid' },
  { src: '/BRIDAL.png', galleryTitle: 'Bridal Photography', gallerySlug: 'bridal' },
]

export default async function GalleryPage() {
  return (
    <div className="py-20 px-4 max-w-7xl mx-auto bg-surface min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">Gallery</h1>
      <p className="text-gray-500 mb-8">Browse our complete collection</p>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
        {ALL_IMAGES.map((img, i) => (
          <Link
            key={`${img.gallerySlug}-${i}`}
            href={`/portfolio/${img.gallerySlug}`}
            className="break-inside-avoid block rounded-xl overflow-hidden bg-gray-200 group relative"
          >
            <Image
              src={img.src}
              alt={`${img.galleryTitle} - Image ${i + 1}`}
              width={800}
              height={600}
              className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-2 group-hover:translate-y-0 transition duration-300 opacity-0 group-hover:opacity-100">
              <p className="text-sm font-medium">{img.galleryTitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
