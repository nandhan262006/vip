'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ReviewSubmitForm() {
  const [form, setForm] = useState({ name: '', text: '', rating: 5 })
  const [images, setImages] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    const urls: string[] = []
    for (const file of Array.from(files)) {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('folder', 'reviews-public')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const { url } = await res.json()
      urls.push(url)
    }
    setImages(prev => [...prev, ...urls])
    setUploading(false)
    e.target.value = ''
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim() || !form.text.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, images: JSON.stringify(images) }),
      })
      if (res.ok) {
        setSubmitted(true)
        setForm({ name: '', text: '', rating: 5 })
        setImages([])
      }
    } catch {}
    setSubmitting(false)
  }

  return (
    <section className="py-24 px-4 bg-surface">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-red font-semibold text-sm uppercase tracking-widest">Reviews</span>
          <h2 className="text-4xl font-bold mt-3 text-gray-900">Share Your Experience</h2>
          <p className="text-gray-500 mt-3">Your review will appear after approval.</p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="text-green-600 font-semibold text-lg mb-1">Thank you for your review!</div>
            <p className="text-green-500 text-sm mb-3">It will be published after we review it.</p>
            <button onClick={() => setSubmitted(false)} className="text-red text-sm font-medium hover:underline">Write another review</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-4">
            <input
              placeholder="Your Name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm"
              required
            />
            <textarea
              placeholder="Write your review..."
              value={form.text}
              onChange={e => setForm({ ...form, text: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none"
              rows={4}
              required
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Rating:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })} className="text-2xl transition">
                    {n <= form.rating ? '★' : '☆'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Photos (optional)</label>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="text-sm" />
              {uploading && <span className="text-xs text-gray-400 ml-2">Uploading...</span>}
              {images.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {images.map((url, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <Image src={url} alt="" fill className="object-cover" sizes="64px" />
                      <button type="button" onClick={() => removeImage(i)}
                        className="absolute top-0 right-0 bg-black/60 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs leading-none">&times;</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button type="submit" disabled={submitting}
              className="w-full bg-red text-white py-3 rounded-full font-medium hover:bg-red-dark transition disabled:opacity-50 text-sm">
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
