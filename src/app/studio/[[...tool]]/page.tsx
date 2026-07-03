'use client'

import dynamic from 'next/dynamic'

const NextStudio = dynamic(() => import('./studio-client'), { ssr: false })

export default function StudioPage() {
  return <NextStudio />
}
