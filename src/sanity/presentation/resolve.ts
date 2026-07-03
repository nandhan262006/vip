import { defineLocations } from 'sanity/presentation'

export const resolve = {
  locations: {
    gallery: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || 'Untitled', href: `/portfolio/${doc?.slug}` },
          { title: 'Portfolio', href: '/portfolio' },
        ],
      }),
    }),
    category: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || 'Untitled', href: `/portfolio?category=${doc?.slug}` }],
      }),
    }),
    about: {
      locations: [{ title: 'About', href: '/about' }],
    },
  },
}
