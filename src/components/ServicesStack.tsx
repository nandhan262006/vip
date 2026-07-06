'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'

const ABOUT_IMAGES = [
  '/unnamed.webp',
  '/unnamed (1).webp',
  '/unnamed (2).webp',
]

export default function ServicesStack({ services }: { services: any[] }) {
  const [aboutIdx, setAboutIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setAboutIdx((prev) => (prev + 1) % ABOUT_IMAGES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const stateRef = useRef({ startX: 0, lastX: 0, velocity: 0, offset: 0, idx: 0, dragging: false, width: 0 })

  const snap = useCallback((idx: number, animate = true) => {
    const s = stateRef.current
    s.idx = Math.max(0, Math.min(services.length - 1, idx))
    if (animate) setActiveIdx(s.idx)
    else setActiveIdx(s.idx)
  }, [services.length])

  useEffect(() => {
    const el = containerRef.current
    if (!el || services.length === 0) return
    const s = stateRef.current
    s.width = el.clientWidth
    s.idx = 0

    const ro = new ResizeObserver(() => {
      s.width = el.clientWidth
    })
    ro.observe(el)

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const idx = s.idx + (e.deltaY > 0 ? 1 : -1)
      snap(idx)
    }
    el.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      ro.disconnect()
      el.removeEventListener('wheel', onWheel)
    }
  }, [services.length, snap])

  const onPointerDown = (e: React.PointerEvent) => {
    const s = stateRef.current
    s.startX = e.clientX
    s.lastX = e.clientX
    s.velocity = 0
    s.dragging = true
    const el = containerRef.current!
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const s = stateRef.current
    if (!s.dragging) return
    const dx = e.clientX - s.lastX
    s.lastX = e.clientX
    s.velocity = dx * 0.4 + s.velocity * 0.6
    const threshold = s.width * 0.2
    if (Math.abs(dx) > threshold) {
      const dir = dx > 0 ? -1 : 1
      s.dragging = false
      e.currentTarget.releasePointerCapture(e.pointerId)
      snap(s.idx + dir)
    }
  }

  const onPointerUp = () => {
    const s = stateRef.current
    if (!s.dragging) return
    s.dragging = false
    if (Math.abs(s.velocity) > 0.3) {
      snap(s.idx + (s.velocity > 0 ? -1 : 1))
    }
  }

  return (
    <section id="services" className="relative bg-surface overflow-hidden">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto px-4 pt-24 pb-16">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200 order-1">
          {ABOUT_IMAGES.map((src, i) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ${i === aboutIdx ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image
                src={src}
                alt="VIP Studio"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
          ))}
          <div className="absolute bottom-0 right-0 bg-gradient-to-l from-black/70 to-transparent p-5 text-right z-10">
            <p className="text-white text-lg font-medium">Vijay Kumar</p>
            <p className="text-red text-xs">CEO, VIP STUDIOS</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1.5 pb-3 z-10">
            {ABOUT_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setAboutIdx(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === aboutIdx ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="order-2">
          <span className="text-red font-semibold text-sm uppercase tracking-widest">About</span>
          <h2 className="text-4xl font-bold mt-3 mb-4 text-gray-900">VIP Studio</h2>
          <div className="space-y-4 text-gray-500 leading-relaxed mb-6">
            <p>
              🇮🇳 Before VIP STUDIOS, I earned a <strong className="text-gray-900">National Award</strong>.
            </p>
            <p>📸 <strong className="text-gray-900">Wedding Photographer of the Year 2010</strong> (Kodak)</p>
            <p>✨ <strong className="text-gray-900">15 Years of Excellence</strong></p>
            <p>
              I'm Vijay, founder of VIP STUDIOS. With over 25 years of experience in wedding photography,
              I've always believed that the best photographs come from capturing people exactly as they are —
              real emotions, real moments, and real stories.
            </p>
            <p>
              This National Award Winning Wedding Photography is a reminder of the passion, creativity,
              and dedication that continue to drive every wedding we capture today.
            </p>
            <p>
              If you're searching for the Best Wedding Photographers in Nellore, Wedding Photography
              in Nellore, Candid Wedding Photographers in Nellore, Traditional Wedding Photography,
              Bridal Photography, Groom Portraits, Pre Wedding Photography, Engagement Photography,
              or Wedding Cinematography, VIP STUDIOS brings award-winning experience to every celebration.
            </p>
            <p>
              For over 15 years, families across Nellore and beyond have trusted VIP STUDIOS to preserve
              their most important memories through authentic wedding storytelling and timeless imagery.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-xl bg-white border border-gray-200">
              <div className="text-xl md:text-3xl font-bold text-red">25+</div>
              <div className="text-gray-500 text-sm mt-1">Years</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white border border-gray-200">
              <div className="text-xl md:text-3xl font-bold text-red">500+</div>
              <div className="text-gray-500 text-sm mt-1">Weddings</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white border border-gray-200">
              <div className="text-xl md:text-3xl font-bold text-red">Award</div>
              <div className="text-gray-500 text-sm mt-1">Winning</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-16 pb-8 px-4 max-w-7xl mx-auto">
        <span className="text-red font-semibold text-sm uppercase tracking-widest">What We Offer</span>
        <h2 className="text-4xl font-bold mt-3 mb-4 text-gray-900">Our Services</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Comprehensive wedding photography and cinematography services tailored to make your special day unforgettable.
        </p>
      </div>

      <div
        ref={containerRef}
        className="select-none pb-8"
        style={{ perspective: '1200px', touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="flex items-center justify-center h-[600px] md:h-[700px] relative">
          {services.map((service, i) => {
            const diff = i - activeIdx
            const abs = Math.abs(diff)
            const isActive = diff === 0

            const rotateY = diff * -25
            const translateZ = isActive ? 200 : abs === 1 ? 50 : -200
            const translateX = diff * 120
            const scale = 1 - abs * 0.12
            const opacity = 1 - abs * 0.25
            const zIndex = services.length - abs

            return (
              <div
                key={service._id}
                className="absolute w-[85%] md:w-[500px] transition-all duration-500 ease-out cursor-grab active:cursor-grabbing"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: opacity < 0 ? 0 : opacity,
                  zIndex,
                  transformStyle: 'preserve-3d',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
                onClick={() => !isActive && snap(i)}
              >
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-transparent">
                  {service.imageUrl ? (
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="90vw"
                      draggable={false}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-200" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{service.title}</h3>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-red text-sm font-medium">
                      <span className="w-6 h-px bg-red" />
                      Learn More
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="hidden md:flex justify-between absolute top-1/2 left-4 right-4 -translate-y-1/2 pointer-events-none z-10">
        <button
          onClick={() => snap(activeIdx - 1)}
          disabled={activeIdx === 0}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-gray-900 hover:bg-white transition disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous service"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => snap(activeIdx + 1)}
          disabled={activeIdx === services.length - 1}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-gray-900 hover:bg-white transition disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next service"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center gap-2 pb-8">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => snap(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIdx ? 'bg-red w-6' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
