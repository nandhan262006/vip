import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 })
  }

  await prisma.contactSubmission.create({
    data: { name, email, phone: phone || null, message },
  })

  return NextResponse.json({ success: true })
}
