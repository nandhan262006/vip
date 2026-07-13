import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const settings = await prisma.siteSetting.findMany()
  const map: Record<string, string> = {}
  for (const s of settings) {
    map[s.key] = s.value
  }
  return NextResponse.json(map)
}

export async function PUT(request: Request) {
  const data = await request.json()
  const entries = Object.entries(data)

  for (const [key, value] of entries) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: value as string },
      create: { key, value: value as string },
    })
  }

  revalidateTag('settings', 'max')
  return NextResponse.json({ success: true })
}
