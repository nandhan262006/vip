import Link from 'next/link'
import Image from 'next/image'
import ServicesStack from '@/components/ServicesStack'
import HeroSection from '@/components/HeroSection'
import ReviewCarousel from '@/components/ReviewCarousel'
import ReviewSubmitForm from '@/components/ReviewSubmitForm'
import { getSettingsCached, getServicesCached, getGalleries, getReviews } from '@/lib/data'

export const dynamic = 'force-dynamic'

async function getSettings() {
  return getSettingsCached()
}

export default async function HomePage() {
  let services: { id: string; title: string; description: string; imageUrl: string; order: number }[] = []
  let galleries: { id: string; title: string; coverImage: string; featured: boolean; gridSpan: string }[] = []
  let reviews: { id: string; name: string; text: string; rating: number; avatar: string; date: string; order: number }[] = []
  let settings: Record<string, string> = {}

  try {
    const [s, g, rev] = await Promise.all([getServicesCached(), getGalleries(), getReviews()])
    services = s
    galleries = g.filter(gal => gal.featured).slice(0, 10)
    reviews = rev.filter(r => r.featured)
    settings = await getSettings()
  } catch (e) { console.error('Homepage data fetch error:', e) }

  const heroTitle = settings.heroTitle || 'Best Photographer in Nellore'
  const heroSubtitle = settings.heroSubtitle || 'VIP Studio Wedding Photography'
  const whatsapp = settings.whatsapp || '919299950999'
  const address = settings.address || '26-1-1639, beside MGB Mall, Obulreddy Nagar, Dargamitta, Nellore — 524003'

  const fallbackServices = services.length > 0 ? services.map(s => ({ _id: s.id, ...s })) : [
    { _id: '1', title: 'Bridal Photography', description: 'Elegant bridal portraits.', imageUrl: '/BRIDAL.png' },
    { _id: '2', title: 'Engagement Photography', description: 'Beautiful engagement shoots.', imageUrl: '/ENGAGEMENT.png' },
    { _id: '3', title: 'Candid Photography', description: 'Natural, unposed moments.', imageUrl: '/CANDID.png' },
    { _id: '4', title: 'Wedding Cinematography', description: 'Cinematic wedding films.', imageUrl: '/WEDDING.png' },
    { _id: '5', title: 'Pre-Wedding Shoot', description: 'Creative pre-wedding sessions.', imageUrl: '/PREWEDDING.png' },
    { _id: '6', title: 'Event Photography', description: 'Professional coverage.', imageUrl: '/CORPERATE.png' },
  ]

  const portfolioItems = galleries.length > 0
    ? galleries.map(g => ({ src: g.coverImage, label: g.title, span: g.gridSpan || '' }))
    : [
        { src: '/BRIDAL.png', label: 'Bridal', span: 'col-span-2 row-span-2 md:col-span-2 md:row-span-2' },
        { src: '/CANDID.png', label: 'Candid', span: '' },
        { src: '/ENGAGEMENT.png', label: 'Engagement', span: 'row-span-2' },
        { src: '/WEDDING.png', label: 'Wedding', span: 'col-span-2 md:col-span-2' },
        { src: '/PREWEDDING.png', label: 'Pre-Wedding', span: 'row-span-2 md:row-span-2' },
        { src: '/CORPERATE.png', label: 'Events', span: '' },
        { src: '/MATERNITY.png', label: 'Maternity', span: '' },
        { src: '/HERO.png', label: 'Fashion', span: 'col-span-2 md:col-span-2' },
      ]

  const fallbackReviews = reviews.length > 0 ? reviews : [
    { id: 'fr-1', name: 'Priya Sharma', text: 'VIP Studio made our wedding unforgettable! Vijay sir captured every emotion so beautifully. The candid shots are our absolute favorite.', rating: 5, avatar: '', date: 'July 2026', order: 0 },
    { id: 'fr-2', name: 'Rahul Reddy', text: 'Outstanding professionalism and creativity. The cinematography was like a movie — our friends still talk about the wedding film.', rating: 5, avatar: '', date: 'June 2026', order: 1 },
    { id: 'fr-3', name: 'Ananya Krishnan', text: 'Booked VIP Studio for my brother\'s wedding and they exceeded all expectations. The pre-wedding shoot was magical.', rating: 5, avatar: '', date: 'May 2026', order: 2 },
    { id: 'fr-4', name: 'Karthik Ravi', text: 'We traveled from Bangalore to get shot by VIP Studio. Completely worth it! The bridal portraits are stunning.', rating: 5, avatar: '', date: 'April 2026', order: 3 },
    { id: 'fr-5', name: 'Sneha Patel', text: 'From engagement to reception, VIP Studios covered every event perfectly. The drone shots were breathtaking.', rating: 5, avatar: '', date: 'March 2026', order: 4 },
    { id: 'fr-6', name: 'Venkatesh Rao', text: 'Fourth wedding in our family captured by VIP Studio — that speaks volumes! The most trusted photographers in Nellore.', rating: 5, avatar: '', date: 'February 2026', order: 5 },
  ]

  return (
    <div>
      <HeroSection heroTitle={heroTitle} heroSubtitle={heroSubtitle} />
      <ServicesStack services={fallbackServices} />

      <section className="py-24 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-red font-semibold text-sm uppercase tracking-widest">Portfolio</span>
              <h2 className="text-4xl font-bold mt-3 text-gray-900">Our Work</h2>
            </div>
            <Link href="/portfolio" className="hidden md:inline-flex items-center gap-2 text-red font-medium hover:text-red-dark transition">
              View All <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px] grid-flow-dense">
            {portfolioItems.map((item: { src: string; label: string; span: string }, i: number) => (
              <Link key={i} href="/portfolio" className={`group relative overflow-hidden rounded-xl bg-gray-200 ${item.span}`}>
                <Image src={item.src} alt={item.label} fill className="object-cover group-hover:scale-105 transition duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-2 group-hover:translate-y-0 transition duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="font-semibold text-base">{item.label}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10 space-y-4">
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-red font-medium hover:text-red-dark transition">
              View All Galleries <span aria-hidden="true">&rarr;</span>
            </Link>
            <div>
              <Link href="/build-your-quote" className="inline-block bg-red text-white px-10 py-4 rounded-full font-medium hover:bg-red-dark transition text-lg shadow-lg shadow-red/30">
                Build Your Wedding Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ReviewCarousel reviews={fallbackReviews} />

      <ReviewSubmitForm />

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-red font-semibold text-sm uppercase tracking-widest">Location</span>
            <h2 className="text-4xl font-bold mt-3 text-gray-900">Find Us</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div>
                <p className="font-medium text-gray-900">Address</p>
                <p className="text-gray-500 mt-1">{address}</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Phone / WhatsApp</p>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-red hover:text-red-dark transition mt-1 block">+91 {whatsapp.slice(2)}</a>
              </div>
              <a href={settings.googleMaps || 'https://maps.app.goo.gl/JUXE7VGbpJDuJyzMA'} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-red font-medium hover:text-red-dark transition text-sm">
                Open in Google Maps &rarr;
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              <iframe src="https://www.google.com/maps?ll=14.4330217,79.9670549&z=17&t=m&hl=en-US&gl=US&mapclient=embed&q=VIP+STUDIOS+Nellore&output=embed" width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="VIP Studio Location" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-900 to-red relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(204,0,0,0.15),transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Capture Your Story?</h2>
          <p className="text-lg text-gray-300 mb-10">Let&apos;s create beautiful memories together. Reach out to us on WhatsApp or send us a message.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-red text-white px-10 py-4 rounded-full font-medium hover:bg-red-dark transition text-lg shadow-lg shadow-red/30 inline-flex items-center gap-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Book via WhatsApp
            </a>
            <Link href="/contact" className="border-2 border-white text-white px-10 py-4 rounded-full font-medium hover:bg-white hover:text-gray-900 transition text-lg">
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
