import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-02-01',
  useCdn: true,
  perspective: 'published',
  stega: {
    enabled: process.env.NEXT_PUBLIC_SANITY_STEGA === 'true',
    studioUrl: '/studio',
  },
})
