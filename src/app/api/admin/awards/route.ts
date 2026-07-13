import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const awards = await prisma.award.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(awards)
}

export async function POST(request: Request) {
  const { year, title, organization, description, order } = await request.json()
  const award = await prisma.award.create({
    data: { year, title, organization, description, order: order ?? 0 },
  })
  revalidateTag('awards', 'max')
  return NextResponse.json(award)
}

export async function PUT(request: Request) {
  const { id, year, title, organization, description, order } = await request.json()
  const award = await prisma.award.update({
    where: { id },
    data: { year, title, organization, description, order },
  })
  revalidateTag('awards', 'max')
  return NextResponse.json(award)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  await prisma.award.delete({ where: { id } })
  revalidateTag('awards', 'max')
  return NextResponse.json({ success: true })
}
