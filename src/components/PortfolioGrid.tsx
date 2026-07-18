'use client'

import { useState } from 'react'
import Lightbox from './Lightbox'

type GalleryItem = {
  _id: string
  slug: string
  title: string
  categoryTitle: string
  image: string
  date: string
}

export default function PortfolioGrid({ items, single }: { items: GalleryItem[]; single: boolean }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  if (single) {
    const item = items[0]
    return (
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => setLightboxIdx(0)}
          className="group relative overflow-hidden rounded-2xl bg-gray-100 block w-full shadow-xl cursor-pointer text-left"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-auto block group-hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <h3 className="text-2xl font-bold">{item.title}</h3>
            <p className="text-white/70 text-sm mt-1">{item.date}</p>
          </div>
        </button>
        {lightboxIdx !== null && (
          <Lightbox
            images={items.map((x) => ({ src: x.image, alt: x.title }))}
            currentIndex={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onNavigate={(i) => setLightboxIdx(i)}
          />
        )}
      </div>
    )
  }

  return (
    <>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {items.map((item, i) => (
          <button
            key={item._id}
            onClick={() => setLightboxIdx(i)}
            className="group relative overflow-hidden rounded-xl bg-gray-100 text-left cursor-pointer block w-full break-inside-avoid"
          >
            <img
              src={item.image}
              alt={`${item.title} by VIP Studios`}
              className="w-full h-auto block group-hover:scale-105 transition duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-2 group-hover:translate-y-0 transition duration-300 opacity-0 group-hover:opacity-100">
              <h3 className="font-semibold text-sm">{item.title}</h3>
              <p className="text-xs text-white/60">{item.date}</p>
            </div>
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition duration-300">
              {item.categoryTitle}
            </div>
          </button>
        ))}
      </div>
      {lightboxIdx !== null && (
        <Lightbox
          images={items.map((x) => ({ src: x.image, alt: x.title }))}
          currentIndex={lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onNavigate={(i) => setLightboxIdx(i)}
        />
      )}
    </>
  )
}
