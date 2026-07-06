'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const SLIDER_IMAGES = [
  '/BRIDAL.png',
  '/CANDID.png',
  '/ENGAGEMENT.png',
  '/WEDDING.png',
  '/PREWEDDING.png',
  '/MATERNITY.png',
  '/HERO.png',
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDER_IMAGES.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0">
      {SLIDER_IMAGES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-red/20" />
    </div>
  )
}
