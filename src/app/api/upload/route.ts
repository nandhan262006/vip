import { NextResponse } from 'next/server'
import { uploadImage } from '@/lib/storage'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'general'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const url = await uploadImage(file, folder)
    return NextResponse.json({ url })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload failed'
    console.error('Upload failed:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
