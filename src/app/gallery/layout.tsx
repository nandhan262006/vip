import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Browse our complete wedding photography gallery in Nellore. Candid, traditional, bridal, and cinematic wedding photos by VIP Studios.',
  openGraph: {
    title: 'Wedding Photography Gallery | VIP Studios Nellore',
    description: 'Browse our complete wedding photography gallery in Nellore.',
    url: '/gallery',
    siteName: 'VIP Studios',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/BRIDAL.png', width: 800, height: 600, alt: 'VIP Studios Wedding Photography Gallery' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Photography Gallery | VIP Studios Nellore',
    description: 'Browse our complete wedding photography gallery in Nellore.',
    images: ['/BRIDAL.png'],
  },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
