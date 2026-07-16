'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface HeaderProps {
  whatsapp: string
  phone: string
}

export default function Header({ whatsapp, phone }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(`/#${id}`)
    }
  }

  const navLink = (href: string, label: string, className = 'text-sm text-gray-600 hover:text-red transition') => (
    <Link href={href} className={className} onClick={() => setMenuOpen(false)}>{label}</Link>
  )

  const hashLink = (id: string, label: string, className = 'text-sm text-gray-600 hover:text-red transition') => (
    <button onClick={() => scrollTo(id)} className={className}>{label}</button>
  )

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="VIP Studios" width={200} height={100} className="h-16 w-auto object-contain" priority />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLink('/', 'Home')}
          {hashLink('about', 'About')}
          {hashLink('services', 'Services')}
          {navLink('/portfolio', 'Portfolio')}
          {navLink('/build-your-quote', 'Quote')}
          {navLink('/reviews', 'Reviews')}
          {navLink('/contact', 'Contact')}
          {navLink('/admin', 'Admin', 'text-sm text-gray-500 hover:text-red transition')}
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-red text-white text-sm px-5 py-2 rounded-full font-medium hover:bg-red-dark transition">WhatsApp</a>
          <a href={`tel:${phone}`} className="border-2 border-red text-red text-sm px-5 py-2 rounded-full font-medium hover:bg-red hover:text-white transition">Call Now</a>
        </nav>

        <button className="md:hidden p-2 text-gray-900" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/95 px-4 py-4 space-y-3">
          {navLink('/', 'Home', 'block text-sm text-gray-600 hover:text-red')}
          {hashLink('about', 'About', 'block text-sm text-gray-600 hover:text-red')}
          {hashLink('services', 'Services', 'block text-sm text-gray-600 hover:text-red')}
          {navLink('/portfolio', 'Portfolio', 'block text-sm text-gray-600 hover:text-red')}
          {navLink('/build-your-quote', 'Quote', 'block text-sm text-gray-600 hover:text-red')}
          {navLink('/reviews', 'Reviews', 'block text-sm text-gray-600 hover:text-red')}
          {navLink('/contact', 'Contact', 'block text-sm text-gray-600 hover:text-red')}
          {navLink('/admin', 'Admin', 'block text-sm text-gray-400 hover:text-red')}
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="block text-sm text-red font-medium" onClick={() => setMenuOpen(false)}>WhatsApp Booking</a>
          <a href={`tel:${phone}`} className="block text-sm text-red font-medium" onClick={() => setMenuOpen(false)}>Call Now</a>
        </div>
      )}
    </header>
  )
}
