import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const categories = await prisma.category.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(categories)
}

export async function POST(request: Request) {
  const { title, slug, order } = await request.json()
  const category = await prisma.category.create({
    data: { title, slug, order: order ?? 0 },
  })
  revalidateTag('categories', 'max')
  return NextResponse.json(category)
}

export async function PUT(request: Request) {
  const { id, title, slug, order } = await request.json()
  const category = await prisma.category.update({
    where: { id },
    data: { title, slug, order },
  })
  revalidateTag('categories', 'max')
  return NextResponse.json(category)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  await prisma.category.delete({ where: { id } })
  revalidateTag('categories', 'max')
  return NextResponse.json({ success: true })
}
