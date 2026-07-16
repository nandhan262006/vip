'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Review {
  id: string
  name: string
  text: string
  rating: number
  avatar: string
  date: string
}

export default function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el || reviews.length === 0) return

    let animationId: number
    let lastTime = 0
    const speed = 0.5

    const scroll = (time: number) => {
      if (lastTime) {
        const delta = time - lastTime
        el.scrollLeft += speed * (delta / 16)
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0
        }
      }
      lastTime = time
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationId)
  }, [reviews.length])

  if (reviews.length === 0) {
    return (
      <section className="py-20 px-4 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <span className="text-red font-semibold text-sm uppercase tracking-widest">Testimonials</span>
          <h2 className="text-4xl font-bold mt-3 text-gray-900">What Our Clients Say</h2>
        </div>
        <p className="text-center text-gray-400 py-8">No reviews yet. Be the first to share your experience!</p>
      </section>
    )
  }

  const doubled = [...reviews, ...reviews]

  const stars = (n: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < n ? '#f59e0b' : '#d1d5db'}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))

  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <span className="text-red font-semibold text-sm uppercase tracking-widest">Testimonials</span>
        <h2 className="text-4xl font-bold mt-3 text-gray-900">What Our Clients Say</h2>
      </div>

      <div className="relative max-w-[1400px] mx-auto">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div ref={scrollRef} className="flex gap-6 overflow-x-hidden">
          {doubled.map((r, i) => (
            <div
              key={`${r.id}-${i}`}
              className="shrink-0 w-[360px] bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-1 mb-3">
                <svg width="20" height="20" viewBox="0 0 48 48" className="shrink-0">
                  <path fill="#4285F4" d="M24 20.0v7.7c0 0 0 0 0 0 0 2.1-1.3 3.6-3.3 3.6-2 0-3.3-1.6-3.3-3.6s1.3-3.6 3.3-3.6h3.3z" />
                  <path fill="#EA4335" d="M24 8.0c3.7 0 6.6 1.6 8.6 3.7l-5.1 5.1c-1-0.9-2.2-1.4-3.5-1.4-2.9 0-5.3 2.1-5.3 5.0h-7.0c0-6.0 5.0-12.4 12.3-12.4z" />
                  <path fill="#FBBC05" d="M17.3 20.4c0 0.7-0.1 1.4-0.1 2.1s0.1 1.4 0.1 2.1l-7.0 0c-0.4-1.2-0.6-2.4-0.6-3.7s0.2-2.5 0.6-3.7l7.0 0z" />
                  <path fill="#34A853" d="M24 30.8c-2.2 0-4.0-0.9-5.3-2.3l-5.1 5.1c2.4 2.2 5.9 3.7 10.4 3.7 4.8 0 8.9-2.8 11.1-6.9l-6.2-4.8c-1.2 3.0-3.6 5.2-4.9 5.2z" />
                </svg>
                <span className="text-xs text-gray-400 ml-auto">Google Review</span>
              </div>
              <div className="flex gap-0.5 mb-2">{stars(r.rating)}</div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                {r.avatar ? (
                  <Image src={r.avatar} alt={r.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-red/10 text-red flex items-center justify-center font-bold text-sm">
                    {r.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <Link href="/reviews" className="inline-flex items-center gap-2 bg-red text-white px-8 py-3 rounded-full font-medium hover:bg-red-dark transition text-sm shadow-lg shadow-red/30">
          View More Reviews <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </section>
  )
}
