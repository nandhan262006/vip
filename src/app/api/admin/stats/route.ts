import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const stats = await prisma.stat.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(stats)
}

export async function POST(request: Request) {
  const { number, label, description, order } = await request.json()
  const stat = await prisma.stat.create({
    data: { number, label, description, order: order ?? 0 },
  })
  revalidateTag('stats', 'max')
  return NextResponse.json(stat)
}

export async function PUT(request: Request) {
  const { id, number, label, description, order } = await request.json()
  const stat = await prisma.stat.update({
    where: { id },
    data: { number, label, description, order },
  })
  revalidateTag('stats', 'max')
  return NextResponse.json(stat)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  await prisma.stat.delete({ where: { id } })
  revalidateTag('stats', 'max')
  return NextResponse.json({ success: true })
}
