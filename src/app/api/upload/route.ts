import { NextResponse } from 'next/server'
import { uploadImage } from '@/lib/storage'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File
  const folder = (formData.get('folder') as string) || 'general'

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const url = await uploadImage(file, folder)
  return NextResponse.json({ url })
}
