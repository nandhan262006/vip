import Image from 'next/image'
import type { Metadata } from 'next'

const ABOUT = {
  title: 'About',
  photographerName: 'Vijay Kumar',
  bio: `With over 22 years of experience, Vijay Kumar is a National Award Winning Wedding Photographer based in Nellore, Andhra Pradesh. His journey in photography began with a passion for capturing candid emotions and has since evolved into one of the most trusted names in wedding photography and cinematography in the region.`,
  story: `Recognized by Kodak as the "Director of Wedding Photography" and awarded the National Award for Wedding Photography in 2010, Vijay has photographed over 500 weddings across India. His style blends traditional storytelling with modern cinematography, creating timeless memories for every couple.`,
  experience: 22,
  awards: ['National Award Winner in Wedding Photography 2010', 'Recognized by Kodak as Director of Wedding Photography'],
  stats: [
    { label: 'Years Experience', value: '22+' },
    { label: 'Weddings Shot', value: '500+' },
    { label: 'Awards Won', value: 'National' },
  ],
}

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about VIP Studio — National Award Winning Wedding Photography by Vijay in Nellore.',
  openGraph: {
    title: 'About VIP Studio | Wedding Photography Nellore',
    description: 'National Award Winning Wedding Photographer based in Nellore with 22+ years of experience.',
  },
}

export default async function AboutPage() {
  return (
    <div className="py-20 px-4 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">About</h1>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
          <Image
            src="/HERO.png"
            alt="VIP Studio Photographer Vijay"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">{ABOUT.photographerName}</h2>
          <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">{ABOUT.bio}</p>
          <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">{ABOUT.story}</p>

          <p className="text-lg font-medium mb-4">{ABOUT.experience}+ Years Experience</p>

          {ABOUT.awards.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Awards</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {ABOUT.awards.map((award, i) => (
                  <li key={i}>{award}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mt-8">
            {ABOUT.stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
