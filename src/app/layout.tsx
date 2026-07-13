import type { Metadata, Viewport } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'
import { getSettingsCached } from '@/lib/data'

async function getSettings() {
  try { return await getSettingsCached() } catch { return {} as Record<string, string> }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#B40000',
}

export async function generateMetadata(): Promise<Metadata> {
  let settings: Record<string, string> = {}
  try { settings = await getSettingsCached() } catch { /* use defaults */ }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.vipstudios.in'
  const seoKeywords = (() => { try { return JSON.parse(settings.seoKeywords || '[]') } catch { return [] } })()
  return {
    icons: {
      icon: '/favicon.png',
      apple: '/favicon.png',
    },
    title: {
      default: settings.seoTitle || 'Best Photographer in Nellore | Vijay — VIP Studio Wedding Photography',
      template: '%s | VIP Studio — Best Photographer in Nellore',
    },
    description: settings.seoDescription || 'National Award Winning Best Photographer in Nellore — Vijay Kumar of VIP Studio.',
    keywords: seoKeywords,
    openGraph: {
      title: 'Best Photographer in Nellore — VIP Studio | National Award Winning Wedding Photography',
      description: settings.seoDescription || 'National Award Winning Best Photographer in Nellore.',
      url: '/',
      siteName: 'VIP Studio - Best Photographer in Nellore',
      locale: 'en_IN',
      type: 'website',
      images: [{ url: '/og-image.png', width: 409, height: 510, alt: 'VIP Studio — Best Photographer in Nellore | Wedding Photography' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Best Photographer in Nellore — VIP Studio | Award Winning Wedding Photography',
      description: settings.seoDescription || 'National Award Winning Best Photographer in Nellore.',
      images: ['/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    alternates: { canonical: 'https://www.vipstudios.in' },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.vipstudios.in'
  const whatsapp = settings.whatsapp || '919299950999'
  const phone = settings.phone || '+919299950999'
  const instagram = settings.instagram || 'https://www.instagram.com/vipstudios.in/'
  const facebook = settings.facebook || 'https://www.facebook.com/VIPstudiosnellore'
  const youtube = settings.youtube || ''
  const address = settings.address || ''
  const email = settings.email || 'contact@vipstudio.com'

  const googleMaps = settings.googleMaps || 'https://maps.app.goo.gl/JUXE7VGbpJDuJyzMA'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'VIP Studio — Best Photographer in Nellore',
        description: settings.seoDescription || 'National Award Winning Best Photographer in Nellore.',
        publisher: { '@id': `${baseUrl}/#organization` },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: 'Vijay Kumar',
        jobTitle: 'Best Photographer in Nellore | CEO & Wedding Photographer',
        image: `${baseUrl}/logo.png`,
        url: baseUrl,
        telephone: phone,
        email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: address,
          addressLocality: 'Nellore',
          addressRegion: 'Andhra Pradesh',
          postalCode: '524003',
          addressCountry: 'IN',
        },
        sameAs: [instagram, facebook, youtube].filter(Boolean),
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${baseUrl}/#organization`,
        name: 'VIP Studio — Best Photographer in Nellore',
        image: `${baseUrl}/logo.png`,
        url: baseUrl,
        telephone: phone,
        email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: address,
          addressLocality: 'Nellore',
          addressRegion: 'Andhra Pradesh',
          postalCode: '524003',
          addressCountry: 'IN',
        },
      },
    ],
  }

  return (
    <html lang="en-IN">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        <Header whatsapp={whatsapp} phone={phone} />
        <main>{children}</main>
        <Footer whatsapp={whatsapp} instagram={instagram} facebook={facebook} youtube={youtube} googleMaps={googleMaps} />
        <a
          href={`tel:${phone}`}
          className="fixed bottom-20 right-6 z-50 bg-red text-white p-3.5 rounded-full shadow-lg hover:bg-red-dark transition shadow-red/40 hover:shadow-xl hover:shadow-red/50"
          aria-label="Call VIP Studio"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.25 1.01l-2.2 2.2z" /></svg>
        </a>
        <a
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-red text-white p-3.5 rounded-full shadow-lg hover:bg-red-dark transition shadow-red/40 hover:shadow-xl hover:shadow-red/50"
          aria-label="Chat on WhatsApp"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        </a>
      </body>
    </html>
  )
}
