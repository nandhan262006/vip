'use client'

import { useEffect, useState } from 'react'

interface Service { id: string; title: string; description: string; imageUrl: string; order: number }

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [form, setForm] = useState<Partial<Service>>({})
  const [editing, setEditing] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => { fetch('/api/admin/services').then(r => r.json()).then(setServices) }, [])

  const resetForm = () => { setForm({}); setEditing(false) }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'services')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      setForm({ ...form, imageUrl: data.url })
    } catch (err) {
      console.error('Upload error:', err)
      alert('Upload failed. Please check if the storage service is configured.')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST'
    const body = editing ? form : { ...form, order: services.length }
    await fetch('/api/admin/services', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    resetForm()
    const res = await fetch('/api/admin/services').then(r => r.json())
    setServices(res)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return
    await fetch('/api/admin/services', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setServices(services.filter(s => s.id !== id))
  }

  const handleEdit = (s: Service) => { setForm(s); setEditing(true) }

  const handleReorder = async (id: string, direction: number) => {
    const idx = services.findIndex(s => s.id === id)
    if (idx === -1) return
    const target = idx + direction
    if (target < 0 || target >= services.length) return
    const updated = [...services]
    const a = updated[idx], b = updated[target]
    const tmp = a.order; a.order = b.order; b.order = tmp
    updated.sort((x, y) => x.order - y.order)
    setServices(updated)
    await Promise.all([
      fetch('/api/admin/services', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: a.id, title: a.title, description: a.description, imageUrl: a.imageUrl, order: a.order }) }),
      fetch('/api/admin/services', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: b.id, title: b.title, description: b.description, imageUrl: b.imageUrl, order: b.order }) }),
    ])
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Services</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="font-semibold mb-4">{editing ? 'Edit Service' : 'Add Service'}</h2>
        <div className="grid gap-4">
          <input placeholder="Title" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          <textarea placeholder="Description" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm resize-none" rows={3} />
          <div>
            <input type="file" accept="image/*" onChange={handleUpload}
              className="text-sm" />
            {uploading && <span className="text-sm text-gray-500 ml-2">Uploading...</span>}
            {form.imageUrl && (
              <img src={form.imageUrl} alt="" className="mt-2 h-32 rounded-lg object-cover" />
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={!form.title}
              className="bg-red text-white px-6 py-2 rounded-lg font-medium hover:bg-red-dark transition disabled:opacity-50">
              {editing ? 'Update' : 'Add'}
            </button>
            {editing && <button onClick={resetForm} className="text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100">Cancel</button>}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {services.map((s, i) => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <div className="flex flex-col items-center gap-1 min-w-[40px]">
              <button onClick={() => handleReorder(s.id, -1)} disabled={i === 0}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-lg leading-none">&uarr;</button>
              <button onClick={() => handleReorder(s.id, 1)} disabled={i === services.length - 1}
                className="text-gray-400 hover:text-gray-600 disabled:opacity-30 text-lg leading-none">&darr;</button>
            </div>
            {s.imageUrl && <img src={s.imageUrl} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{s.title}</p>
              <p className="text-sm text-gray-500 truncate">{s.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => handleEdit(s)} className="text-sm text-red hover:underline">Edit</button>
              <button onClick={() => handleDelete(s.id)} className="text-sm text-gray-400 hover:text-red hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
