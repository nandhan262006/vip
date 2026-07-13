import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const reviews = await prisma.review.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(reviews)
}

export async function POST(request: Request) {
  const { name, text, rating, avatar, images, featured, date, order } = await request.json()
  const review = await prisma.review.create({
    data: { name, text, rating: rating ?? 5, avatar: avatar ?? '', images: images ?? '[]', featured: featured ?? false, date, order: order ?? 0 },
  })
  revalidateTag('reviews', 'max')
  return NextResponse.json(review)
}

export async function PUT(request: Request) {
  const { id, name, text, rating, avatar, images, featured, date, order } = await request.json()
  const review = await prisma.review.update({
    where: { id },
    data: { name, text, rating, avatar, images, featured, date, order },
  })
  revalidateTag('reviews', 'max')
  return NextResponse.json(review)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  await prisma.review.delete({ where: { id } })
  revalidateTag('reviews', 'max')
  return NextResponse.json({ success: true })
}
