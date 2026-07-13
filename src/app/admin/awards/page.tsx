'use client'

import { useEffect, useState } from 'react'

interface Award { id: string; year: string; title: string; organization: string; description: string; order: number }

export default function AdminAwardsPage() {
  const [awards, setAwards] = useState<Award[]>([])
  const [form, setForm] = useState<Partial<Award>>({})
  const [editing, setEditing] = useState(false)

  useEffect(() => { fetch('/api/admin/awards').then(r => r.json()).then(setAwards) }, [])

  const resetForm = () => { setForm({}); setEditing(false) }

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST'
    const body = editing ? form : { ...form, order: awards.length }
    await fetch('/api/admin/awards', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    resetForm()
    const res = await fetch('/api/admin/awards').then(r => r.json())
    setAwards(res)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this award?')) return
    await fetch('/api/admin/awards', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setAwards(awards.filter(a => a.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Awards</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="font-semibold mb-4">{editing ? 'Edit Award' : 'Add Award'}</h2>
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-4">
            <input placeholder="Year" value={form.year || ''} onChange={e => setForm({ ...form, year: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
            <input placeholder="Organization" value={form.organization || ''} onChange={e => setForm({ ...form, organization: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
            <input placeholder="Title" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <textarea placeholder="Description" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm resize-none" rows={2} />
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={!form.title || !form.year}
              className="bg-red text-white px-6 py-2 rounded-lg font-medium hover:bg-red-dark transition disabled:opacity-50">
              {editing ? 'Update' : 'Add'}
            </button>
            {editing && <button onClick={resetForm} className="text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100">Cancel</button>}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {awards.map(a => (
          <div key={a.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <span className="text-red font-bold text-lg min-w-[50px]">{a.year}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900">{a.title}</p>
              <p className="text-sm text-gray-400">{a.organization}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => { setForm(a); setEditing(true) }} className="text-sm text-red hover:underline">Edit</button>
              <button onClick={() => handleDelete(a.id)} className="text-sm text-gray-400 hover:text-red hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
