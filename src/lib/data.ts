import { cache } from 'react'
import { unstable_cache as nextCache } from 'next/cache'
import { prisma } from '@/lib/prisma'

export const getSettings = cache(async () => {
  const rows = await prisma.siteSetting.findMany()
  const map: Record<string, string> = {}
  for (const s of rows) map[s.key] = s.value
  return map
})

export const getServices = cache(async () => {
  return prisma.service.findMany({ orderBy: { order: 'asc' } })
})

export const getGalleries = cache(async () => {
  return prisma.gallery.findMany({
    include: { category: true },
    orderBy: { order: 'asc' },
  })
})

export const getLatestGalleries = cache(async (limit = 10) => {
  return prisma.gallery.findMany({
    orderBy: { date: 'desc' },
    take: limit,
  })
})

export const getCategories = cache(async () => {
  return prisma.category.findMany({ orderBy: { order: 'asc' } })
})

export const getAwards = cache(async () => {
  return prisma.award.findMany({ orderBy: { order: 'asc' } })
})

export const getStats = cache(async () => {
  return prisma.stat.findMany({ orderBy: { order: 'asc' } })
})

export const getQuotes = cache(async () => {
  return prisma.quoteStep.findMany({ orderBy: { order: 'asc' } })
})

export const getGalleryBySlug = cache(async (slug: string) => {
  return prisma.gallery.findUnique({ where: { slug }, include: { category: true } })
})

export const getAllGallerySlugs = cache(async () => {
  const galleries = await prisma.gallery.findMany({ select: { slug: true } })
  return galleries.map(g => ({ slug: g.slug }))
})

export const getSubmissions = cache(async () => {
  return prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } })
})

export const getReviews = cache(async () => {
  return prisma.review.findMany({ orderBy: { order: 'asc' } })
})

export const getSettingsCached = nextCache(
  async () => {
    const rows = await prisma.siteSetting.findMany()
    const map: Record<string, string> = {}
    for (const s of rows) map[s.key] = s.value
    return map
  },
  ['site-settings'],
  { revalidate: 60, tags: ['settings'] }
)

export const getServicesCached = nextCache(
  async () => prisma.service.findMany({ orderBy: { order: 'asc' } }),
  ['services'],
  { revalidate: 60, tags: ['services'] }
)

export const getGalleriesCached = nextCache(
  async () => prisma.gallery.findMany({ include: { category: true }, orderBy: { order: 'asc' } }),
  ['galleries'],
  { revalidate: 60, tags: ['galleries'] }
)

export const getCategoriesCached = nextCache(
  async () => prisma.category.findMany({ orderBy: { order: 'asc' } }),
  ['categories'],
  { revalidate: 60, tags: ['categories'] }
)

export const getAwardsCached = nextCache(
  async () => prisma.award.findMany({ orderBy: { order: 'asc' } }),
  ['awards'],
  { revalidate: 60, tags: ['awards'] }
)

export const getStatsCached = nextCache(
  async () => prisma.stat.findMany({ orderBy: { order: 'asc' } }),
  ['stats'],
  { revalidate: 60, tags: ['stats'] }
)

export const getReviewsCached = nextCache(
  async () => prisma.review.findMany({ orderBy: { order: 'asc' } }),
  ['reviews'],
  { revalidate: 60, tags: ['reviews'] }
)

export async function revalidateAll() {
  const { revalidateTag } = await import('next/cache')
  revalidateTag('settings', 'max')
  revalidateTag('services', 'max')
  revalidateTag('galleries', 'max')
  revalidateTag('categories', 'max')
  revalidateTag('awards', 'max')
  revalidateTag('stats', 'max')
  revalidateTag('reviews', 'max')
}
