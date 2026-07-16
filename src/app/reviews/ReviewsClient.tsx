'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Lightbox from '@/components/Lightbox'

interface Review {
  id: string
  name: string
  text: string
  rating: number
  avatar: string
  images: string
  date: string
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < n ? '#f59e0b' : '#d1d5db'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsClient({ reviews }: { reviews: Review[] }) {
  const [lightbox, setLightbox] = useState<{ images: { src: string; alt: string }[]; index: number } | null>(null)
  const [form, setForm] = useState({ name: '', text: '', rating: 5 })
  const [images, setImages] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      const urls: string[] = []
      for (const file of Array.from(files)) {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('folder', 'reviews-public')
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Upload failed')
        urls.push(data.url)
      }
      setImages(prev => [...prev, ...urls])
    } catch (err) {
      console.error('Upload error:', err)
      alert('Upload failed. Please check if the storage service is configured.')
    } finally {
      setUploading(false)
    }
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

  if (reviews.length === 0) {
    return (
      <div className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-red font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h1 className="text-4xl font-bold mt-3 text-gray-900">What Our Clients Say</h1>
        </div>
        <p className="text-center text-gray-400 py-20">No reviews yet.</p>
      </div>
    )
  }

  return (
    <div className="py-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-red font-semibold text-sm uppercase tracking-widest">Testimonials</span>
        <h1 className="text-4xl font-bold mt-3 text-gray-900">What Our Clients Say</h1>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Real reviews from real couples who trusted VIP Studios to capture their most precious moments.
        </p>
      </div>

      <div className="space-y-10">
        {reviews.map((r) => {
          let imageList: string[] = []
          try { imageList = JSON.parse(r.images || '[]') } catch { imageList = [] }

          const lightboxImages = imageList.map((src, i) => ({ src, alt: `${r.name} photo ${i + 1}` }))

          return (
            <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
              <div className="flex items-start gap-4 mb-6">
                {r.avatar ? (
                  <Image src={r.avatar} alt={r.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-red/10 text-red flex items-center justify-center font-bold shrink-0">
                    {r.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.date}</p>
                  <div className="mt-1"><Stars n={r.rating} /></div>
                </div>
                <div className="ml-auto shrink-0">
                  <svg width="20" height="20" viewBox="0 0 48 48">
                    <path fill="#4285F4" d="M24 20.0v7.7c0 0 0 0 0 0 0 2.1-1.3 3.6-3.3 3.6-2 0-3.3-1.6-3.3-3.6s1.3-3.6 3.3-3.6h3.3z" />
                    <path fill="#EA4335" d="M24 8.0c3.7 0 6.6 1.6 8.6 3.7l-5.1 5.1c-1-0.9-2.2-1.4-3.5-1.4-2.9 0-5.3 2.1-5.3 5.0h-7.0c0-6.0 5.0-12.4 12.3-12.4z" />
                    <path fill="#FBBC05" d="M17.3 20.4c0 0.7-0.1 1.4-0.1 2.1s0.1 1.4 0.1 2.1l-7.0 0c-0.4-1.2-0.6-2.4-0.6-3.7s0.2-2.5 0.6-3.7l7.0 0z" />
                    <path fill="#34A853" d="M24 30.8c-2.2 0-4.0-0.9-5.3-2.3l-5.1 5.1c2.4 2.2 5.9 3.7 10.4 3.7 4.8 0 8.9-2.8 11.1-6.9l-6.2-4.8c-1.2 3.0-3.6 5.2-4.9 5.2z" />
                  </svg>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">&ldquo;{r.text}&rdquo;</p>

              {imageList.length > 0 && (
                <div className={`grid gap-3 ${imageList.length === 1 ? 'grid-cols-1' : imageList.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
                  {imageList.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setLightbox({ images: lightboxImages, index: i })}
                      className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 cursor-zoom-in group"
                    >
                      <Image src={img} alt={`${r.name} photo ${i + 1}`} fill className="object-cover group-hover:scale-105 transition duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="opacity-0 group-hover:opacity-100 transition drop-shadow-lg">
                          <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="text-center mt-16">
        <Link href="/" className="text-red font-medium hover:text-red-dark transition">&larr; Back to Home</Link>
      </div>

      <div className="mt-16 bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Share Your Experience</h2>
        <p className="text-sm text-gray-500 mb-6">
          Your review will appear on this page after approval.
        </p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
            <div className="text-green-600 font-semibold mb-1">Thank you for your review!</div>
            <p className="text-green-500 text-sm">It will be published after we review it.</p>
            <button onClick={() => setSubmitted(false)} className="text-red text-sm mt-3 hover:underline">Write another review</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}
                    className="text-2xl transition">
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
              className="bg-red text-white px-8 py-3 rounded-full font-medium hover:bg-red-dark transition disabled:opacity-50 text-sm">
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        )}
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          currentIndex={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(idx) => setLightbox({ ...lightbox, index: idx })}
        />
      )}
    </div>
  )
}
