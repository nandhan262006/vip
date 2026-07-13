import { put, del } from '@vercel/blob'

export async function uploadImage(file: File, folder: string): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg'
  const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const result = await put(filename, file, {
    access: 'public',
    addRandomSuffix: false,
  })

  return result.url
}

export async function deleteImage(url: string): Promise<void> {
  try {
    await del(url)
  } catch {
    // blob may already be deleted
  }
}
