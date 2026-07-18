'use client'

import { useEffect, useState } from 'react'

interface Gallery {
  id: string; title: string; slug: string; description: string; coverImage: string
  categoryId: string; images: string; date: string; order: number
  featured: boolean; gridSpan: string
  category?: { id: string; title: string }
}
interface Category { id: string; title: string; slug: string }

export default function AdminPortfolioPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [form, setForm] = useState<Partial<Gallery>>({})
  const [editing, setEditing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [newCategory, setNewCategory] = useState('')

  const load = () => {
    Promise.all([
      fetch('/api/admin/galleries').then(r => r.json()),
      fetch('/api/admin/categories').then(r => r.json()),
    ]).then(([gRes, cRes]) => {
      setGalleries(gRes)
      setCategories(cRes)
    })
  }
  useEffect(() => {
    let ignore = false
    Promise.all([
      fetch('/api/admin/galleries').then(r => r.json()),
      fetch('/api/admin/categories').then(r => r.json()),
    ]).then(([gRes, cRes]) => {
      if (!ignore) { setGalleries(gRes); setCategories(cRes) }
    })
    return () => { ignore = true }
  }, [])

  const parseImages = (images?: string): string[] => {
    try { return images ? JSON.parse(images) : [] } catch { return [] }
  }

  const resetForm = () => { setForm({}); setEditing(false) }

  const handleUploadCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'portfolio')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      setForm({ ...form, coverImage: data.url })
    } catch (err) {
      console.error('Upload error:', err)
      alert('Upload failed. Please check if the storage service is configured.')
    } finally {
      setUploading(false)
    }
  }

  const handleUploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    setUploading(true)
    try {
      const existing = parseImages(form.images)
      const uploaded: string[] = []
      for (let i = 0; i < files.length; i++) {
        const fd = new FormData()
        fd.append('file', files[i])
        fd.append('folder', 'portfolio')
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Upload failed')
        uploaded.push(data.url)
      }
      setForm({ ...form, images: JSON.stringify([...existing, ...uploaded]) })
    } catch (err) {
      console.error('Upload error:', err)
      alert('Upload failed. Please check if the storage service is configured.')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleRemoveImage = (index: number) => {
    const existing = parseImages(form.images)
    existing.splice(index, 1)
    setForm({ ...form, images: JSON.stringify(existing) })
  }

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST'
    const body = {
      ...form,
      images: form.images || '[]',
      order: editing ? form.order : galleries.length,
      slug: form.slug || form.title?.toLowerCase().replace(/\s+/g, '-'),
    }
    await fetch('/api/admin/galleries', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    resetForm()
    load()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this gallery?')) return
    await fetch('/api/admin/galleries', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    load()
  }

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return
    await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newCategory.trim(),
        slug: newCategory.trim().toLowerCase().replace(/\s+/g, '-'),
        order: categories.length,
      }),
    })
    setNewCategory('')
    load()
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Delete this category? Any galleries in it will become orphaned.')) return
    await fetch('/api/admin/categories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    load()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Portfolio / Galleries</h1>

      {/* Categories */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="font-semibold mb-3">Categories</h2>
        <div className="flex gap-2 mb-3">
          <input value={newCategory} onChange={e => setNewCategory(e.target.value)}
            placeholder="New category name" className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex-1" />
          <button onClick={handleAddCategory}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800">Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(c => (
            <span key={c.id} className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm">
              {c.title}
              <button onClick={() => handleDeleteCategory(c.id)} className="text-gray-400 hover:text-red">&times;</button>
            </span>
          ))}
        </div>
      </div>

      {/* Gallery form */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="font-semibold mb-4">{editing ? 'Edit Gallery' : 'Add Gallery'}</h2>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Title" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
            <input placeholder="Slug" value={form.slug || ''} onChange={e => setForm({ ...form, slug: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <textarea placeholder="Description" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm resize-none" rows={2} />
          <select value={form.categoryId || ''} onChange={e => setForm({ ...form, categoryId: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="">Select category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Cover Image</label>
            <input type="file" accept="image/*" onChange={handleUploadCover} className="text-sm" />
            {uploading && <span className="text-sm text-gray-500 ml-2">Uploading...</span>}
            {form.coverImage && (
              <img src={form.coverImage} alt="" className="mt-2 h-32 rounded-lg object-cover" />
            )}
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-1 block">Gallery Images (select multiple)</label>
            <input type="file" accept="image/*" multiple onChange={handleUploadImages} className="text-sm" />
            {parseImages(form.images).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {parseImages(form.images).map((url, i) => (
                  <div key={i} className="relative group">
                    <img src={url} alt="" className="h-24 w-24 rounded-lg object-cover" />
                    <button onClick={() => handleRemoveImage(i)}
                      className="absolute top-1 right-1 bg-black/60 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={!form.title || !form.categoryId}
              className="bg-red text-white px-6 py-2 rounded-lg font-medium hover:bg-red-dark transition disabled:opacity-50">
              {editing ? 'Update' : 'Add'}
            </button>
            {editing && <button onClick={resetForm} className="text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100">Cancel</button>}
          </div>
        </div>
      </div>

      {/* Galleries list */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Featured on homepage: {galleries.filter(g => g.featured).length}/10
        </p>
      </div>
      <div className="space-y-3">
        {galleries.map(g => (
          <div key={g.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <span className="text-xs text-gray-400 w-6">{g.order}</span>
            {g.coverImage && <img src={g.coverImage} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{g.title}</p>
              <p className="text-xs text-gray-400">{g.slug} · {g.category?.title || '-'}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {g.featured && (
                <select value={g.gridSpan || ''} onChange={async (e) => {
                  await fetch('/api/admin/galleries', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...g, gridSpan: e.target.value }) })
                  load()
                }} className="text-xs border border-gray-300 rounded px-1.5 py-0.5">
                  <option value="">Small</option>
                  <option value="col-span-2">Wide</option>
                  <option value="row-span-2">Tall</option>
                  <option value="col-span-2 row-span-2">Large</option>
                  <option value="col-span-2 md:col-span-2">Desktop Wide</option>
                  <option value="row-span-2 md:row-span-2">Desktop Tall</option>
                  <option value="col-span-2 row-span-2 md:col-span-2 md:row-span-2">XL</option>
                </select>
              )}
              <button onClick={async () => {
                await fetch('/api/admin/galleries', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...g, featured: !g.featured }) })
                load()
              }} className={`text-xs px-2 py-1 rounded font-medium ${g.featured ? 'bg-red/10 text-red' : 'bg-gray-100 text-gray-500'}`}>
                {g.featured ? 'Featured' : 'Feature'}
              </button>
              <button onClick={() => { setForm(g); setEditing(true) }} className="text-sm text-red hover:underline">Edit</button>
              <button onClick={() => handleDelete(g.id)} className="text-sm text-gray-400 hover:text-red hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
