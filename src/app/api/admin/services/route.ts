import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(services)
}

export async function POST(request: Request) {
  const { title, description, imageUrl, order } = await request.json()
  const service = await prisma.service.create({
    data: { title, description, imageUrl, order: order ?? 0 },
  })
  revalidateTag('services', 'max')
  return NextResponse.json(service)
}

export async function PUT(request: Request) {
  const { id, title, description, imageUrl, order } = await request.json()
  const service = await prisma.service.update({
    where: { id },
    data: { title, description, imageUrl, order },
  })
  revalidateTag('services', 'max')
  return NextResponse.json(service)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  await prisma.service.delete({ where: { id } })
  revalidateTag('services', 'max')
  return NextResponse.json({ success: true })
}
