import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAwardsCached, getStatsCached } from '@/lib/data'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.vipstudios.in'

export const metadata: Metadata = {
  title: 'Best Photographer in Nellore — Vijay Kumar | Awards & Experience',
  description: 'Meet Vijay Kumar — the National Award Winning best photographer in Nellore.',
  openGraph: {
    title: 'Best Photographer in Nellore — Vijay Kumar | National Award Winning Photographer',
    description: 'National Award Winning best photographer in Nellore.',
    url: '/about',
    siteName: 'VIP Studio — Best Photographer in Nellore',
    locale: 'en_IN',
    type: 'profile',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Vijay Kumar — Best Photographer in Nellore, VIP Studio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Photographer in Nellore — Vijay Kumar | Award Winning',
    description: 'National Award Winning best photographer in Nellore.',
    images: ['/logo.png'],
  },
  alternates: { canonical: `${baseUrl}/about` },
}

export default async function AboutPage() {
  let awards: Array<{ id: string; year: string; title: string; organization: string; description: string }> = []
  let stats: Array<{ id: string; number: string; label: string; description: string }> = []

  try {
    const [a, s] = await Promise.all([getAwardsCached(), getStatsCached()])
    awards = a
    stats = s
  } catch {
    awards = [
      { id: '1', year: '2010', title: 'Wedding Photographer of the Year', organization: 'Kodak', description: 'Recognized as the top wedding photographer in India.' },
      { id: '2', year: '2009', title: 'National Award — Wedding Photography', organization: 'Government of India', description: 'National recognition for outstanding wedding photography.' },
      { id: '3', year: '2015', title: '15 Years of Excellence', organization: 'VIP Studio', description: 'Celebrating a decade and a half.' },
    ]
    stats = [
      { id: '1', number: '25+', label: 'Years of Experience', description: 'Serving Nellore since 2000' },
      { id: '2', number: '500+', label: 'Weddings Captured', description: 'Trusted by families across Andhra' },
      { id: '3', number: '4.9', label: 'Google Rating', description: '180+ 5-star reviews' },
      { id: '4', number: '15+', label: 'Award Wins', description: 'National & industry recognition' },
    ]
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'About', item: `${baseUrl}/about` },
        ],
      }).replace(/</g, '\\u003c') }} />

      <section className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-red py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(204,0,0,0.2),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <span className="text-red font-semibold text-sm uppercase tracking-widest">About</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">Best Photographer in Nellore — Vijay Kumar</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            National Award Winning Wedding Photographer with 25+ years of experience.
            Wedding Photographer of the Year 2010 (Kodak).
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow-xl">
            <Image src="/unnamed (4).webp" alt="Vijay Kumar — Best Photographer in Nellore" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-xl font-bold">Vijay Kumar</p>
              <p className="text-red text-sm">National Award Winning Photographer | Nellore</p>
            </div>
          </div>
          <div className="space-y-6">
            <span className="text-red font-semibold text-sm uppercase tracking-widest">The Photographer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Why I&apos;m Called the <span className="text-red">Best Photographer in Nellore</span>
            </h2>
            <div className="space-y-4 text-gray-500 leading-relaxed">
              <p>I&apos;m <strong className="text-gray-900">Vijay Kumar</strong>, the founder and lead photographer at <strong className="text-gray-900">VIP Studio</strong>. For over <strong className="text-gray-900">25 years</strong>, I&apos;ve been capturing wedding stories across Nellore, Andhra Pradesh, and beyond.</p>
              <p>Before VIP Studio, I earned a <strong className="text-gray-900">National Award</strong> for Wedding Photography. In 2010, Kodak honored me as <strong className="text-gray-900">Wedding Photographer of the Year</strong>.</p>
              <p>I believe the best photographs come from capturing people exactly as they are — real emotions, real moments, and real stories.</p>
              <p>Today, I lead a team of passionate photographers and cinematographers who share my vision. Together, we&apos;ve photographed over <strong className="text-gray-900">500 weddings</strong>.</p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/portfolio" className="bg-red text-white px-8 py-3.5 rounded-full font-medium hover:bg-red-dark transition shadow-lg shadow-red/30">View Portfolio</Link>
              <Link href="/contact" className="border-2 border-red text-red px-8 py-3.5 rounded-full font-medium hover:bg-red hover:text-white transition">Book a Session</Link>
            </div>
          </div>
        </div>
      </section>

      {awards.length > 0 && (
        <section className="py-20 px-4 bg-surface">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-red font-semibold text-sm uppercase tracking-widest">Recognition</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 text-gray-900">Awards & Achievements</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {awards.map((award) => (
                <div key={award.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-red/20 transition group">
                  <div className="text-red font-bold text-lg mb-2">{award.year}</div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-red transition">{award.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{award.organization}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{award.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {stats.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-red font-semibold text-sm uppercase tracking-widest">By the Numbers</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 text-gray-900">Why I&apos;m the Best Photographer in Nellore</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.id} className="text-center p-6 rounded-xl bg-surface border border-gray-200 hover:shadow-lg transition">
                  <div className="text-3xl md:text-5xl font-bold text-red mb-2">{stat.number}</div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">{stat.label}</div>
                  <div className="text-gray-500 text-xs">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-900 to-red relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(204,0,0,0.15),transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Book the Best Photographer in Nellore</h2>
          <p className="text-lg text-gray-300 mb-10 leading-relaxed">Ready to have the best photographer in Nellore capture your wedding story?</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/919299950999" target="_blank" rel="noopener noreferrer" className="bg-red text-white px-10 py-4 rounded-full font-medium hover:bg-red-dark transition text-lg shadow-lg shadow-red/30 inline-flex items-center gap-2">Book via WhatsApp</a>
            <Link href="/contact" className="border-2 border-white text-white px-10 py-4 rounded-full font-medium hover:bg-white hover:text-gray-900 transition text-lg">Send a Message</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
