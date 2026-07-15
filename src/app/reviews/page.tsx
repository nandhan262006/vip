import type { Metadata } from 'next'
import { getReviews } from '@/lib/data'
import ReviewsClient from './ReviewsClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Client Reviews',
  description: 'Read what our clients say about VIP Studios wedding photography.',
}

export default async function ReviewsPage() {
  let reviews: { id: string; name: string; text: string; rating: number; avatar: string; images: string; date: string }[] = []

  try {
    reviews = await getReviews()
  } catch {
    reviews = []
  }

  return <ReviewsClient reviews={reviews} />
}
