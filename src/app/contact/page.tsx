import ContactForm from '@/components/ContactForm'
import type { Metadata } from 'next'
import { getSettingsCached } from '@/lib/data'

async function getSettings() {
  return getSettingsCached()
}

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with VIP Studios for wedding photography booking inquiries.',
  openGraph: {
    title: 'Contact VIP Studios | Wedding Photography Nellore',
    description: 'Book your wedding photography with National Award Winner Vijay.',
    url: '/contact',
    siteName: 'VIP Studios',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: '/logo.png', width: 512, height: 512, alt: 'VIP Studios Contact' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact VIP Studios | Wedding Photography Nellore',
    description: 'Book your wedding photography with National Award Winner Vijay.',
    images: ['/logo.png'],
  },
}

export default async function ContactPage() {
  const settings = await getSettings()
  const address = settings.address || '26-1-1639, beside MGB Mall, Obulreddy Nagar, Dargamitta, Nellore — 524003'
  const whatsapp = settings.whatsapp || '919299950999'
  const instagram = settings.instagram || 'https://www.instagram.com/vipstudios.in/'
  const facebook = settings.facebook || 'https://www.facebook.com/VIPstudiosnellore'

  return (
    <div className="py-20 px-4 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-10">Ready to capture your special moments? Get in touch with us.</p>

      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-lg font-semibold mb-4">Get in Touch</h2>
          <div className="space-y-4 text-gray-600">
            <div>
              <p className="font-medium text-gray-900">Location</p>
              <p>{address}</p>
            </div>
            <div>
              <p className="font-medium text-gray-900">Phone / WhatsApp</p>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-red hover:text-red-dark transition">+91 {whatsapp.replace(/\D/g, '').slice(-10)}</a>
            </div>
            <div>
              <p className="font-medium text-gray-900">Instagram</p>
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-gray-900 underline hover:text-gray-600">@vipstudios.in</a>
            </div>
            <div>
              <p className="font-medium text-gray-900">Facebook</p>
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-gray-900 underline hover:text-gray-600">VIP Weddings Nellore</a>
            </div>
          </div>
          <div className="mt-6">
            <p className="font-medium text-gray-900 mb-2">Find Us</p>
            <a href={settings.googleMaps || 'https://maps.app.goo.gl/JUXE7VGbpJDuJyzMA'} target="_blank" rel="noopener noreferrer" className="text-red hover:text-red-dark transition text-sm">Open in Google Maps &rarr;</a>
          </div>
        </div>
        <ContactForm />
      </div>

      <div className="mt-12 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
        <iframe src="https://www.google.com/maps?ll=14.4330217,79.9670549&z=17&t=m&hl=en-US&gl=US&mapclient=embed&q=VIP+STUDIOS+Nellore&output=embed" width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="VIP Studios Location in Nellore" />
      </div>
    </div>
  )
}
