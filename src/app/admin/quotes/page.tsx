'use client'

import { useEffect, useState } from 'react'

interface QuoteStep { id: string; stepId: string; title: string; subtitle: string; type: string; items: string; order: number }

export default function AdminQuotesPage() {
  const [steps, setSteps] = useState<QuoteStep[]>([])
  const [editing, setEditing] = useState<QuoteStep | null>(null)
  const [items, setItems] = useState<{ id: string; name: string; image: string; price: number }[]>([])
  const [saved, setSaved] = useState(false)

  useEffect(() => { fetch('/api/admin/quotes').then(r => r.json()).then(setSteps) }, [])

  const handleSelect = (step: QuoteStep) => {
    setEditing(step)
    try { setItems(JSON.parse(step.items)) } catch { setItems([]) }
    setSaved(false)
  }

  const handleSave = async () => {
    if (!editing) return
    await fetch('/api/admin/quotes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editing, items }),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const updateItem = (idx: number, field: string, value: string | number) => {
    const updated = [...items]
    updated[idx] = { ...updated[idx], [field]: value }
    setItems(updated)
  }

  const addItem = () => {
    if (['welcome', 'final'].includes(editing?.type || '')) return
    setItems([...items, { id: `${editing?.stepId}-new-${Date.now()}`, name: '', image: '', price: 0 }])
  }

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Quote Builder</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-1">
          <h2 className="font-semibold text-sm text-gray-900 mb-3">Steps</h2>
          {steps.map(s => (
            <button key={s.id} onClick={() => handleSelect(s)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                editing?.id === s.id ? 'bg-red text-white' : 'hover:bg-gray-100'
              }`}>
              {s.title}
            </button>
          ))}
        </div>

        <div className="col-span-2">
          {editing ? (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-semibold mb-4">Edit: {editing.title}</h2>
              <div className="grid gap-4 mb-6">
                <input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Title" />
                {editing.subtitle !== null && (
                  <input value={editing.subtitle || ''} onChange={e => setEditing({ ...editing, subtitle: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm" placeholder="Subtitle" />
                )}
              </div>

              {!['welcome', 'final'].includes(editing.type) && (
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-700">Items</h3>
                    <button onClick={addItem} className="text-sm text-red hover:underline">+ Add Item</button>
                  </div>
                  {items.map((item, i) => (
                    <div key={i} className="grid grid-cols-3 gap-2 items-center bg-gray-50 p-3 rounded-lg">
                      <input value={item.name} onChange={e => updateItem(i, 'name', e.target.value)}
                        className="px-3 py-1.5 border border-gray-300 rounded text-sm" placeholder="Name" />
                      <input value={item.image} onChange={e => updateItem(i, 'image', e.target.value)}
                        className="px-3 py-1.5 border border-gray-300 rounded text-sm" placeholder="Image path" />
                      <div className="flex items-center gap-2">
                        <input type="number" value={item.price} onChange={e => updateItem(i, 'price', Number(e.target.value))}
                          className="px-3 py-1.5 border border-gray-300 rounded text-sm w-full" placeholder="Price" />
                        <button onClick={() => removeItem(i)} className="text-gray-400 hover:text-red">&times;</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button onClick={handleSave}
                className="bg-red text-white px-6 py-2 rounded-lg font-medium hover:bg-red-dark transition">
                {saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-400 py-20">Select a step to edit</div>
          )}
        </div>
      </div>
    </div>
  )
}
