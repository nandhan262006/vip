import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://vipstudios.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 1 },
    { url: `${BASE_URL}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/build-your-quote`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ]

  let galleryPages: MetadataRoute.Sitemap = []
  try {
    const galleries = await prisma.gallery.findMany({ select: { slug: true, date: true } })
    galleryPages = galleries.map((g) => ({
      url: `${BASE_URL}/portfolio/${g.slug}`,
      lastModified: g.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch {
    // fallback to empty if DB is unavailable
  }

  return [...staticPages, ...galleryPages]
}
