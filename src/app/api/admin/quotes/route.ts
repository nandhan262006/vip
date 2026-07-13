import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const quotes = await prisma.quoteStep.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(quotes)
}

export async function PUT(request: Request) {
  const { id, title, subtitle, type, items, order } = await request.json()
  const quote = await prisma.quoteStep.update({
    where: { id },
    data: { title, subtitle, type, items: JSON.stringify(items), order },
  })
  return NextResponse.json(quote)
}
