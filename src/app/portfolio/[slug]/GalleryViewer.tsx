'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Lightbox from '@/components/Lightbox'

export default function GalleryViewer({
  slug,
  galleries,
}: {
  slug: string
  galleries: Record<string, { title: string; categoryTitle: string; description: string; date: string; images: string[] }>
}) {
  const [idx, setIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const gallery = galleries[slug]
  if (!gallery) notFound()

  const prev = idx > 0
  const next = idx < gallery.images.length - 1

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <Link
        href="/portfolio"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8"
      >
        &larr; Back to Portfolio
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{gallery.title}</h1>
        <span className="inline-block text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {gallery.categoryTitle}
        </span>
        <p className="text-gray-600 mt-4 max-w-2xl">{gallery.description}</p>
        <p className="text-sm text-gray-400 mt-2">{gallery.date}</p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div
          className="relative aspect-[4/3] md:aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 cursor-pointer select-none"
          onClick={() => setLightboxOpen(true)}
          onTouchStart={(e) => {
            const startX = e.touches[0].clientX
            const el = e.currentTarget
            el.ontouchend = (ev) => {
              const diff = ev.changedTouches[0].clientX - startX
              if (Math.abs(diff) > 50) {
                if (diff > 0 && prev) setIdx(idx - 1)
                else if (diff < 0 && next) setIdx(idx + 1)
              }
              el.ontouchend = null
            }
          }}
        >
          <Image
            src={gallery.images[idx]}
            alt={`${gallery.title} - ${gallery.categoryTitle} photography by VIP Studios`}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />

          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition" />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
            {idx + 1} / {gallery.images.length}
          </div>
        </div>

        {prev && (
          <button
            onClick={() => setIdx(idx - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center text-gray-900 hover:bg-white transition"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        {next && (
          <button
            onClick={() => setIdx(idx + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center text-gray-900 hover:bg-white transition"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex justify-center gap-3 mt-6">
        {gallery.images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === idx ? 'bg-red w-6' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={gallery.images.map((src) => ({
            src,
            alt: `${gallery.title} by VIP Studios`,
          }))}
          currentIndex={idx}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(i) => setIdx(i)}
        />
      )}
    </div>
  )
}
