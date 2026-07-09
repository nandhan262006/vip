import type { Metadata } from 'next'
import GalleryViewer from './GalleryViewer'

const GALLERIES: Record<string, { title: string; categoryTitle: string; description: string; date: string; images: string[] }> = {
  bridal: {
    title: 'Bridal Photography',
    categoryTitle: 'Bridal',
    description: 'Elegant bridal portraits that capture every detail of your special day, from the intricate jewellery to the joyous tears.',
    date: '2025-12-01',
    images: ['/BRIDAL.png', '/BRIDAL.png', '/HERO.png'],
  },
  candid: {
    title: 'Candid Photography',
    categoryTitle: 'Candid',
    description: 'Natural, unposed moments that reflect genuine emotions — the laughter, the tears, the pure joy.',
    date: '2025-11-15',
    images: ['/CANDID.png', '/CANDID.png', '/HERO.png'],
  },
  engagement: {
    title: 'Engagement Photography',
    categoryTitle: 'Engagement',
    description: 'Beautiful engagement shoots that tell your love story against stunning backdrops.',
    date: '2025-10-20',
    images: ['/ENGAGEMENT.png', '/ENGAGEMENT.png', '/HERO.png'],
  },
  wedding: {
    title: 'Wedding Cinematography',
    categoryTitle: 'Wedding',
    description: 'Cinematic wedding films that bring your most cherished memories to life with stunning visuals.',
    date: '2025-09-10',
    images: ['/WEDDING.png', '/WEDDING.png', '/HERO.png'],
  },
  prewedding: {
    title: 'Pre-Wedding Shoot',
    categoryTitle: 'Pre-Wedding',
    description: 'Creative pre-wedding sessions at handpicked locations that capture your unique bond.',
    date: '2025-08-05',
    images: ['/PREWEDDING.png', '/PREWEDDING.png', '/HERO.png'],
  },
  events: {
    title: 'Event Photography',
    categoryTitle: 'Events',
    description: 'Professional coverage for engagements, receptions, and all your special celebrations.',
    date: '2025-07-18',
    images: ['/CORPERATE.png', '/CORPERATE.png', '/HERO.png'],
  },
  maternity: {
    title: 'Maternity Photography',
    categoryTitle: 'Maternity',
    description: 'Beautiful maternity shoots capturing the glow and joy of motherhood.',
    date: '2025-06-01',
    images: ['/MATERNITY.png', '/MATERNITY.png', '/HERO.png'],
  },
  baby: {
    title: 'Baby Photography',
    categoryTitle: 'Baby',
    description: 'Adorable baby photography sessions that preserve precious early moments.',
    date: '2025-05-15',
    images: ['/MATERNITY.png', '/MATERNITY.png', '/HERO.png'],
  },
}

export async function generateStaticParams() {
  return Object.keys(GALLERIES).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const gallery = GALLERIES[slug]
  if (!gallery) return {}
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vipstudios.in'
  return {
    title: `${gallery.title} | VIP Studio`,
    description: gallery.description,
    openGraph: {
      title: `${gallery.title} | VIP Studio Wedding Photography`,
      description: gallery.description,
      url: `${baseUrl}/portfolio/${slug}`,
      siteName: 'VIP Studio',
      locale: 'en_IN',
      type: 'website',
      images: [{ url: gallery.images[0], width: 800, height: 600, alt: gallery.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${gallery.title} | VIP Studio`,
      description: gallery.description,
      images: [gallery.images[0]],
    },
  }
}

export default async function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <GalleryViewer slug={slug} galleries={GALLERIES} />
}
