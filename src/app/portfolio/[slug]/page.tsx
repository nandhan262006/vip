import type { Metadata } from 'next'
import GalleryViewer from './GalleryViewer'
import { getAllGallerySlugs, getGalleryBySlug, getGalleriesCached } from '@/lib/data'

export async function generateStaticParams() {
  try {
    return await getAllGallerySlugs()
  } catch { return [] }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  try {
    const gallery = await getGalleryBySlug(slug)
    if (!gallery) return {}
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vipstudios.in'
    let images: string[] = []
    try { images = JSON.parse(gallery.images) } catch {}

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
        images: [{ url: images[0] || gallery.coverImage, width: 800, height: 600, alt: gallery.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${gallery.title} | VIP Studio`,
        description: gallery.description,
        images: [images[0] || gallery.coverImage],
      },
    }
  } catch { return {} }
}

export default async function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let galleries: Record<string, { title: string; categoryTitle: string; description: string; date: string; images: string[] }> = {}

  try {
    const all = await getGalleriesCached()
    for (const g of all) {
      galleries[g.slug] = {
        title: g.title,
        categoryTitle: g.category?.title || '',
        description: g.description,
        date: g.date.toISOString().split('T')[0],
        images: (() => { try { return JSON.parse(g.images) } catch { return [g.coverImage] } })(),
      }
    }
  } catch {
    galleries = {
      bridal: { title: 'Bridal Photography', categoryTitle: 'Bridal', description: 'Elegant bridal portraits.', date: '2025-12-01', images: ['/BRIDAL.png'] },
      candid: { title: 'Candid Photography', categoryTitle: 'Candid', description: 'Natural moments.', date: '2025-11-15', images: ['/CANDID.png'] },
    }
  }

  return <GalleryViewer slug={slug} galleries={galleries} />
}
