'use client'

import { useEffect, useState } from 'react'

interface Review {
  id: string
  name: string
  text: string
  rating: number
  avatar: string
  images: string
  featured: boolean
  date: string
  order: number
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [form, setForm] = useState<Partial<Review>>({ rating: 5, images: '[]' })
  const [editing, setEditing] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => { fetch('/api/admin/reviews').then(r => r.json()).then(setReviews) }, [])

  const resetForm = () => { setForm({ rating: 5, images: '[]' }); setEditing(false) }

  const getImages = () => {
    try { return JSON.parse(form.images || '[]') as string[] } catch { return [] as string[] }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'images') => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      const urls: string[] = []
      for (const file of Array.from(files)) {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('folder', 'reviews')
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Upload failed')
        urls.push(data.url)
      }
      if (type === 'avatar') {
        setForm(f => ({ ...f, avatar: urls[0] }))
      } else {
        setForm(f => {
          const current = (() => { try { return JSON.parse(f.images || '[]') as string[] } catch { return [] as string[] } })()
          return { ...f, images: JSON.stringify([...current, ...urls]) }
        })
      }
    } catch (err) {
      console.error('Upload error:', err)
      alert('Upload failed. Please check if the storage service is configured.')
    } finally {
      setUploading(false)
    }
    e.target.value = ''
  }

  const removeImage = (index: number) => {
    setForm(f => {
      const current = (() => { try { return JSON.parse(f.images || '[]') as string[] } catch { return [] as string[] } })()
      current.splice(index, 1)
      return { ...f, images: JSON.stringify(current) }
    })
  }

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST'
    const body = editing ? form : { ...form, order: reviews.length, date: form.date || '2026' }
    await fetch('/api/admin/reviews', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    resetForm()
    const res = await fetch('/api/admin/reviews').then(r => r.json())
    setReviews(res)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this review?')) return
    await fetch('/api/admin/reviews', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setReviews(reviews.filter(r => r.id !== id))
  }

  const handleEdit = (r: Review) => { setForm(r); setEditing(true) }

  const handleReorder = async (id: string, direction: number) => {
    const idx = reviews.findIndex(r => r.id === id)
    if (idx === -1) return
    const target = idx + direction
    if (target < 0 || target >= reviews.length) return
    const updated = [...reviews]
    const a = updated[idx], b = updated[target]
    const tmp = a.order; a.order = b.order; b.order = tmp
    updated.sort((x, y) => x.order - y.order)
    setReviews(updated)
    await Promise.all([
      fetch('/api/admin/reviews', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(a) }),
      fetch('/api/admin/reviews', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) }),
    ])
  }

  const starInput = () => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}
          className="text-xl transition">
          {n <= (form.rating || 5) ? '★' : '☆'}
        </button>
      ))}
    </div>
  )

  const imagePreviews = getImages()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Google Reviews</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="font-semibold mb-4">{editing ? 'Edit Review' : 'Add Review'}</h2>
        <div className="grid gap-4">
          <input placeholder="Client Name" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          <textarea placeholder="Review Text" value={form.text || ''} onChange={e => setForm({ ...form, text: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm resize-none" rows={3} />
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Rating</label>
            {starInput()}
          </div>
          <input placeholder="Date (e.g. July 2026)" value={form.date || ''} onChange={e => setForm({ ...form, date: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Client Photo</label>
            <input type="file" accept="image/*" onChange={e => handleUpload(e, 'avatar')} className="text-sm" />
            {form.avatar && <img src={form.avatar} alt="" className="mt-2 h-16 w-16 rounded-full object-cover" />}
          </div>
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Review Photos</label>
            <input type="file" accept="image/*" multiple onChange={e => handleUpload(e, 'images')} className="text-sm" />
            {uploading && <span className="text-sm text-gray-500 ml-2">Uploading...</span>}
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {imagePreviews.map((url, i) => (
                  <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button onClick={() => removeImage(i)}
                      className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-black/80">&times;</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={!form.name || !form.text}
              className="bg-red text-white px-6 py-2 rounded-lg font-medium hover:bg-red-dark transition disabled:opacity-50">
              {editing ? 'Update' : 'Add'}
            </button>
            {editing && <button onClick={resetForm} className="text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100">Cancel</button>}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {reviews.map((r, i) => {
          let imgs: string[] = []
          try { imgs = JSON.parse(r.images || '[]') } catch { imgs = [] }
          return (
            <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
              <div className="flex flex-col items-center gap-1 min-w-[40px]">
                <button onClick={() => handleReorder(r.id, -1)} disabled={i === 0}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-lg leading-none">&uarr;</button>
                <button onClick={() => handleReorder(r.id, 1)} disabled={i === reviews.length - 1}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-lg leading-none">&darr;</button>
              </div>
              {r.avatar ? (
                <img src={r.avatar} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-red/10 text-red flex items-center justify-center font-bold text-sm shrink-0">
                  {r.name.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{r.name}</p>
                <p className="text-sm text-gray-500 truncate">{r.text}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {r.date} — {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                  {imgs.length > 0 && <span className="ml-2">({imgs.length} photo{imgs.length > 1 ? 's' : ''})</span>}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={async () => {
                  try {
                    await fetch('/api/admin/reviews', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...r, featured: !r.featured }) })
                    const res = await fetch('/api/admin/reviews')
                    if (res.ok) setReviews(await res.json())
                  } catch { /* retry on next click */ }
                }} className={`text-xs px-2 py-1 rounded font-medium ${r.featured ? 'bg-red/10 text-red' : 'bg-gray-100 text-gray-500'}`}>
                  {r.featured ? 'Featured' : 'Feature'}
                </button>
                <button onClick={() => handleEdit(r)} className="text-sm text-red hover:underline">Edit</button>
                <button onClick={() => handleDelete(r.id)} className="text-sm text-gray-400 hover:text-red hover:underline">Delete</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
