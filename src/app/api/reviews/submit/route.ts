import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const { name, text, rating, images } = await request.json()

  if (!name || !text) {
    return NextResponse.json({ error: 'Name and review text are required' }, { status: 400 })
  }

  const count = await prisma.review.count()
  await prisma.review.create({
    data: {
      name,
      text,
      rating: Math.min(5, Math.max(1, rating || 5)),
      images: images || '[]',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
      featured: false,
      order: count,
    },
  })

  return NextResponse.json({ success: true, message: 'Thank you! Your review will appear after approval.' })
}
