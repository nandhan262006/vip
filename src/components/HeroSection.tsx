'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

export default function HeroSection({ heroTitle, heroSubtitle }: { heroTitle?: string; heroSubtitle?: string }) {

  return (
    <section className="relative bg-[#FDF8F3] overflow-hidden">
      <div className="max-w-[1600px] mx-auto md:min-h-screen md:flex">
        <motion.div className="hidden md:block absolute top-0 right-0 w-[58%] h-full" variants={slideRight} initial="hidden" animate="visible">
          <Image src="/AWARDWINNIGPHOTO.jpeg" alt="" fill className="object-cover" priority sizes="58vw" />
        </motion.div>

        <motion.div className="relative w-full md:hidden aspect-[3/2]" variants={slideRight} initial="hidden" animate="visible">
          <Image src="/AWARDWINNIGPHOTO.jpeg" alt="" fill className="object-cover" priority sizes="(max-width: 767px) 100vw, 0vw" />
        </motion.div>

        <motion.div className="relative z-10 flex flex-col justify-center px-6 sm:px-8 lg:px-16 pt-6 pb-4 md:pt-24 md:pb-16 md:w-[42%]" variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp}>
            <span className="text-[10px] sm:text-xs tracking-[0.25em] font-semibold text-gray-700 uppercase">WE CAPTURE.</span>
            <span className="block w-8 h-[3px] bg-[#B40000] mt-2 rounded-full" />
          </motion.div>

          <motion.h1 variants={fadeUp} className="mt-4 md:mt-8 text-[3rem] sm:text-[4.5rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] leading-[0.9] font-extrabold tracking-tight">
            <span className="text-black">YOU </span>
            <span className="text-[#B40000]">RELIVE.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-[20px] md:mt-[30px] text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-[500px]">
            Real moments.<br />
            Raw emotions.<br />
            Timeless stories captured by <span className="text-[#B40000] font-bold text-base sm:text-lg md:text-xl">VIP Studios.</span>
          </motion.p>

          <motion.div variants={fadeUp}>
            <Image src="/nationalaward.png" alt="National Award Winning Photographer 2010" width={400} height={140} className="w-full max-w-[280px] md:max-w-[320px] h-auto mx-auto md:mx-0" />
          </motion.div>

          <motion.div variants={fadeUp} className="mt-[16px] md:mt-[20px] flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 bg-[#B40000] text-white px-6 sm:px-8 py-3 md:py-4 rounded-xl font-semibold text-[13px] sm:text-sm md:text-base shadow-lg shadow-[#B40000]/20 hover:brightness-110 hover:scale-[1.02] transition-all">
              View Portfolio <span aria-hidden="true">&rarr;</span>
            </Link>
            <a href={`https://wa.me/919299950999`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white border-2 border-[#B40000] text-[#B40000] px-6 sm:px-8 py-3 md:py-4 rounded-xl font-semibold text-[13px] sm:text-sm md:text-base hover:bg-[#B40000] hover:text-white hover:scale-[1.02] transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Book via WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>

      <h1 className="sr-only">{heroTitle || 'Best Photographer in Nellore'} — VIP Studios | {heroSubtitle || 'National Award Winning Wedding Photography & Cinematography by Vijay Kumar'}</h1>
    </section>
  )
}
