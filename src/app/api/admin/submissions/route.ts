import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(submissions)
}

export async function PUT(request: Request) {
  const { id, read } = await request.json()
  const submission = await prisma.contactSubmission.update({
    where: { id },
    data: { read },
  })
  return NextResponse.json(submission)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  await prisma.contactSubmission.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
