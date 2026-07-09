import type { Metadata } from 'next'
import Image from 'next/image'
import QuoteBuilder from '@/components/QuoteBuilder'

export const metadata: Metadata = {
  title: 'Build Your Quote',
  description: 'Build your own wedding photography & cinematography quote. Select events, albums, and more to get an instant price estimate.',
}

export default function BuildYourQuotePage() {
  return (
    <div>
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center bg-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/WEDDING.png"
            alt="Wedding Photography"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ready to build your own wedding Quotation?</h1>
          <p className="text-lg text-gray-200 mb-8">
            Select what you love and see instant pricing with a real-time quote that updates as you make your selections.
          </p>
          <a
            href="#builder"
            className="inline-block bg-[#dc143c] text-white px-10 py-3.5 rounded-full font-medium hover:brightness-110 transition shadow-lg"
          >
            Build Your Quote
          </a>
        </div>
      </section>

      <div id="builder">
        <QuoteBuilder />
      </div>
    </div>
  )
}

