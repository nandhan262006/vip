import Link from 'next/link'

interface FooterProps {
  whatsapp?: string
  instagram?: string
  facebook?: string
  youtube?: string
  googleMaps?: string
}

export default function Footer({ whatsapp = '919299950999', instagram = 'https://www.instagram.com/vipstudios.in/', facebook = 'https://www.facebook.com/VIPstudiosnellore', youtube = 'https://www.youtube.com/channel/UCtNRNNFqPvOB_4SK7', googleMaps = 'https://maps.app.goo.gl/JUXE7VGbpJDuJyzMA' }: FooterProps) {
  return (
    <footer className="bg-surface border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg text-gray-900 mb-4">VIP Studios</h3>
            <p className="text-sm text-gray-500 leading-relaxed">National Award Winning Best Photographer in Nellore. Wedding Photography & Cinematography by Vijay Kumar. 25+ years of award-winning excellence.</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-4">Quick Links</h4>
            <nav className="space-y-2.5 text-sm text-gray-500">
              <Link href="/" className="block hover:text-red transition">Home</Link>
              <Link href="/#services" className="block hover:text-red transition">Services</Link>
              <Link href="/portfolio" className="block hover:text-red transition">Portfolio</Link>
              <Link href="/reviews" className="block hover:text-red transition">Reviews</Link>
              <Link href="/contact" className="block hover:text-red transition">Contact</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-4">Services</h4>
            <nav className="space-y-2.5 text-sm text-gray-500">
              <Link href="/portfolio" className="block hover:text-red transition">Bridal Photography</Link>
              <Link href="/portfolio" className="block hover:text-red transition">Engagement</Link>
              <Link href="/portfolio" className="block hover:text-red transition">Candid Photography</Link>
              <Link href="/portfolio" className="block hover:text-red transition">Cinematography</Link>
              <Link href="/build-your-quote" className="block hover:text-red transition">Build Your Wedding Quote</Link>
            </nav>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-4">Connect</h4>
            <div className="space-y-2.5 text-sm text-gray-500">
              {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" className="block hover:text-red transition">Instagram</a>}
              {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer" className="block hover:text-red transition">Facebook</a>}
              {youtube && <a href={youtube} target="_blank" rel="noopener noreferrer" className="block hover:text-red transition">YouTube</a>}
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="block hover:text-red transition">WhatsApp</a>
              {googleMaps && <a href={googleMaps} target="_blank" rel="noopener noreferrer" className="block hover:text-red transition">Google Maps</a>}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} VIP Studios. All rights reserved.</p>
          <div className="flex gap-6">
            {googleMaps && <a href={googleMaps} target="_blank" rel="noopener noreferrer" className="hover:text-red transition">Nellore, Andhra Pradesh</a>}
            <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-red transition">+91 {whatsapp.slice(2)}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
