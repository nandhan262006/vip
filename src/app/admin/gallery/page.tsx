'use client'

import { useEffect, useState } from 'react'

interface Gallery {
  id: string; title: string; slug: string; description: string; coverImage: string
  categoryId: string; images: string; date: string; order: number
  category?: { id: string; title: string }
}

export default function AdminGalleryPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [selected, setSelected] = useState<Gallery | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    let ignore = false
    fetch('/api/admin/galleries').then(r => r.json()).then(data => { if (!ignore) setGalleries(data) })
    return () => { ignore = true }
  }, [])

  const select = (g: Gallery) => {
    setSelected(g)
    try { setImages(JSON.parse(g.images)) } catch { setImages([]) }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !selected) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('folder', `gallery/${selected.slug}`)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const { url } = await res.json()
    const newImages = [...images, url]
    setImages(newImages)
    await fetch('/api/admin/galleries', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...selected, images: JSON.stringify(newImages) }),
    })
    setUploading(false)
    fetch('/api/admin/galleries').then(r => r.json()).then(setGalleries)
  }

  const handleRemoveImage = async (url: string) => {
    const newImages = images.filter(i => i !== url)
    setImages(newImages)
    if (selected) {
      await fetch('/api/admin/galleries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...selected, images: JSON.stringify(newImages) }),
      })
    }
    fetch('/api/admin/galleries').then(r => r.json()).then(setGalleries)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Gallery Images</h1>

      {!selected ? (
        <div className="grid grid-cols-3 gap-4">
          {galleries.map(g => (
            <button key={g.id} onClick={() => select(g)}
              className="bg-white rounded-xl border border-gray-200 p-4 text-left hover:border-red transition">
              {g.coverImage && <img src={g.coverImage} alt="" className="w-full h-32 object-cover rounded-lg mb-3" />}
              <p className="font-medium text-gray-900 text-sm">{g.title}</p>
              <p className="text-xs text-gray-400">{g.category?.title || '-'}</p>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelected(null)} className="text-sm text-gray-500 hover:text-gray-900 mb-4 block">&larr; Back to galleries</button>
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
            <h2 className="font-semibold mb-3">{selected.title} — Images</h2>
            <div className="mb-4">
              <input type="file" accept="image/*" onChange={handleUpload} className="text-sm" />
              {uploading && <span className="text-sm text-gray-500 ml-2">Uploading...</span>}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {images.map((url, i) => (
                <div key={i} className="relative group">
                  <img src={url} alt="" className="w-full h-24 object-cover rounded-lg" />
                  <button onClick={() => handleRemoveImage(url)}
                    className="absolute top-1 right-1 bg-black/60 text-white w-5 h-5 rounded-full text-xs opacity-0 group-hover:opacity-100 transition">&times;</button>
                </div>
              ))}
              {images.length === 0 && <p className="text-sm text-gray-400 col-span-4">No images yet. Upload some.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
