import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const galleries = await prisma.gallery.findMany({
    include: { category: true },
    orderBy: { order: 'asc' },
  })
  return NextResponse.json(galleries)
}

export async function POST(request: Request) {
  const { title, slug, description, coverImage, categoryId, images, date, order, featured, gridSpan } = await request.json()
  const gallery = await prisma.gallery.create({
    data: {
      title,
      slug,
      description,
      coverImage,
      categoryId,
      images: images || '[]',
      date: date ? new Date(date) : new Date(),
      order: order ?? 0,
      featured: featured ?? false,
      gridSpan: gridSpan ?? '',
    },
    include: { category: true },
  })
  revalidateTag('galleries', 'max')
  return NextResponse.json(gallery)
}

export async function PUT(request: Request) {
  const { id, title, slug, description, coverImage, categoryId, images, date, order, featured, gridSpan } = await request.json()
  const gallery = await prisma.gallery.update({
    where: { id },
    data: {
      title,
      slug,
      description,
      coverImage,
      categoryId,
      images,
      date: date ? new Date(date) : undefined,
      order,
      featured,
      gridSpan,
    },
    include: { category: true },
  })
  revalidateTag('galleries', 'max')
  return NextResponse.json(gallery)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  await prisma.gallery.delete({ where: { id } })
  revalidateTag('galleries', 'max')
  return NextResponse.json({ success: true })
}
