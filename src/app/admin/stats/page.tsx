'use client'

import { useEffect, useState } from 'react'

interface Stat { id: string; number: string; label: string; description: string; order: number }

export default function AdminStatsPage() {
  const [stats, setStats] = useState<Stat[]>([])
  const [form, setForm] = useState<Partial<Stat>>({})
  const [editing, setEditing] = useState(false)

  useEffect(() => { fetch('/api/admin/stats').then(r => r.json()).then(setStats) }, [])

  const resetForm = () => { setForm({}); setEditing(false) }

  const handleSave = async () => {
    const method = editing ? 'PUT' : 'POST'
    const body = editing ? form : { ...form, order: stats.length }
    await fetch('/api/admin/stats', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    resetForm()
    const res = await fetch('/api/admin/stats').then(r => r.json())
    setStats(res)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this stat?')) return
    await fetch('/api/admin/stats', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setStats(stats.filter(s => s.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Stats</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="font-semibold mb-4">{editing ? 'Edit Stat' : 'Add Stat'}</h2>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <input placeholder="Number (e.g. 25+)" value={form.number || ''} onChange={e => setForm({ ...form, number: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
            <input placeholder="Label" value={form.label || ''} onChange={e => setForm({ ...form, label: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <input placeholder="Description" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm" />
          <div className="flex gap-3">
            <button onClick={handleSave} disabled={!form.number || !form.label}
              className="bg-red text-white px-6 py-2 rounded-lg font-medium hover:bg-red-dark transition disabled:opacity-50">
              {editing ? 'Update' : 'Add'}
            </button>
            {editing && <button onClick={resetForm} className="text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-100">Cancel</button>}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {stats.map(s => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
            <span className="text-red font-bold text-2xl min-w-[60px]">{s.number}</span>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900">{s.label}</p>
              <p className="text-sm text-gray-400">{s.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => { setForm(s); setEditing(true) }} className="text-sm text-red hover:underline">Edit</button>
              <button onClick={() => handleDelete(s.id)} className="text-sm text-gray-400 hover:text-red hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
