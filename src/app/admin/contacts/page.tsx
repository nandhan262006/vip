'use client'

import { useEffect, useState } from 'react'

interface Submission { id: string; name: string; email: string; phone: string; message: string; read: boolean; createdAt: string }

export default function AdminContactsPage() {
  const [subs, setSubs] = useState<Submission[]>([])
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  useEffect(() => { 
    let ignore = false
    fetch('/api/admin/submissions').then(r => r.json()).then(d => { if (!ignore) setSubs(d) })
    return () => { ignore = true }
  }, [])

  const refresh = () => {
    fetch('/api/admin/submissions').then(r => r.json()).then(setSubs)
  }

  const toggleRead = async (s: Submission) => {
    await fetch('/api/admin/submissions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: s.id, read: !s.read }),
    })
    refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this submission?')) return
    await fetch('/api/admin/submissions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    refresh()
  }

  const filtered = subs.filter(s => {
    if (filter === 'unread') return !s.read
    if (filter === 'read') return s.read
    return true
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Contact Submissions</h1>
      <p className="text-sm text-gray-500 mb-6">{subs.filter(s => !s.read).length} unread</p>

      <div className="flex gap-2 mb-6">
        {(['all', 'unread', 'read'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              filter === f ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(s => (
          <div key={s.id} className={`bg-white rounded-xl border p-5 ${s.read ? 'border-gray-200' : 'border-red/30 bg-red-50/30'}`}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-gray-900">{s.name}</p>
                <p className="text-sm text-gray-400">{s.email}{s.phone ? ` · ${s.phone}` : ''}</p>
              </div>
              <span className="text-xs text-gray-400">{new Date(s.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{s.message}</p>
            <div className="flex gap-3">
              <button onClick={() => toggleRead(s)}
                className={`text-xs px-3 py-1 rounded-full font-medium ${s.read ? 'bg-gray-100 text-gray-500' : 'bg-red/10 text-red'}`}>
                {s.read ? 'Mark Unread' : 'Mark Read'}
              </button>
              <button onClick={() => handleDelete(s.id)} className="text-xs text-gray-400 hover:text-red">Delete</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center text-gray-400 py-10">No submissions found.</p>}
      </div>
    </div>
  )
}
