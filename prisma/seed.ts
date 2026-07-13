import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL!,
  authToken: process.env.AUTH_TOKEN!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // --- Site Settings ---
  const settings = [
    { key: 'whatsapp', value: '919299950999' },
    { key: 'phone', value: '+919299950999' },
    { key: 'email', value: 'contact@vipstudio.com' },
    { key: 'address', value: '26-1-1639, beside MGB Mall, Obulreddy Nagar, Dargamitta, Nellore — 524003' },
    { key: 'instagram', value: 'https://www.instagram.com/vipstudios.in/' },
    { key: 'facebook', value: 'https://www.facebook.com/VIPstudiosnellore' },
    { key: 'youtube', value: 'https://www.youtube.com/channel/UCtNRNNFqPvOB_4SK7' },
    { key: 'googleMaps', value: 'https://maps.app.goo.gl/JUXE7VGbpJDuJyzMA' },
    { key: 'heroTitle', value: 'Best Photographer in Nellore' },
    { key: 'heroSubtitle', value: 'VIP Studio Wedding Photography' },
    { key: 'seoTitle', value: 'Best Photographer in Nellore | VIP Studio' },
    { key: 'seoDescription', value: 'National Award Winning Best Photographer in Nellore — Vijay Kumar of VIP Studio. 25+ years experience in candid wedding photography, cinematography, bridal portraits & event coverage.' },
    { key: 'seoKeywords', value: '["best photographer in Nellore","best wedding photographer Nellore","top photographer Nellore","candid photographer Nellore","wedding photography Nellore","wedding cinematography Nellore","VIP Studio Nellore","Vijay photographer Nellore"]' },
  ]
  for (const s of settings) {
    await prisma.siteSetting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s })
  }

  // --- Categories ---
  const categoryData = [
    { title: 'Bridal', slug: 'bridal', order: 0 },
    { title: 'Candid', slug: 'candid', order: 1 },
    { title: 'Engagement', slug: 'engagement', order: 2 },
    { title: 'Wedding', slug: 'wedding', order: 3 },
    { title: 'Pre-Wedding', slug: 'prewedding', order: 4 },
    { title: 'Events', slug: 'events', order: 5 },
    { title: 'Maternity', slug: 'maternity', order: 6 },
    { title: 'Baby', slug: 'baby', order: 7 },
  ]
  const categories: Record<string, string> = {}
  for (const c of categoryData) {
    const created = await prisma.category.upsert({ where: { slug: c.slug }, update: {}, create: c })
    categories[c.slug] = created.id
  }

  // --- Galleries ---
  const galleryData = [
    { title: 'Bridal Photography', slug: 'bridal', description: 'Elegant bridal portraits that capture every detail of your special day.', coverImage: '/BRIDAL.png', categorySlug: 'bridal', images: '["/BRIDAL.png","/ENGAGEMENT.png","/HERO.png"]', date: '2025-12-01', order: 0 },
    { title: 'Candid Photography', slug: 'candid', description: 'Natural, unposed moments that reflect genuine emotions.', coverImage: '/CANDID.png', categorySlug: 'candid', images: '["/CANDID.png","/HERO.png"]', date: '2025-11-15', order: 1 },
    { title: 'Engagement Photography', slug: 'engagement', description: 'Beautiful engagement shoots that tell your love story.', coverImage: '/ENGAGEMENT.png', categorySlug: 'engagement', images: '["/ENGAGEMENT.png","/HERO.png"]', date: '2025-10-20', order: 2 },
    { title: 'Wedding Cinematography', slug: 'wedding', description: 'Cinematic wedding films with stunning visuals.', coverImage: '/WEDDING.png', categorySlug: 'wedding', images: '["/WEDDING.png","/HERO.png"]', date: '2025-09-10', order: 3 },
    { title: 'Pre-Wedding Shoot', slug: 'prewedding', description: 'Creative pre-wedding sessions at handpicked locations.', coverImage: '/PREWEDDING.png', categorySlug: 'prewedding', images: '["/PREWEDDING.png","/HERO.png"]', date: '2025-08-05', order: 4 },
    { title: 'Event Photography', slug: 'events', description: 'Professional coverage for engagements, receptions, and celebrations.', coverImage: '/CORPERATE.png', categorySlug: 'events', images: '["/CORPERATE.png","/HERO.png"]', date: '2025-07-18', order: 5 },
    { title: 'Maternity Photography', slug: 'maternity', description: 'Beautiful maternity shoots capturing the glow of motherhood.', coverImage: '/MATERNITY.png', categorySlug: 'maternity', images: '["/MATERNITY.png","/HERO.png"]', date: '2025-06-01', order: 6 },
    { title: 'Baby Photography', slug: 'baby', description: 'Adorable baby photography sessions that preserve precious early moments.', coverImage: '/MATERNITY.png', categorySlug: 'baby', images: '["/MATERNITY.png","/HERO.png"]', date: '2025-05-15', order: 7 },
  ]
  for (const g of galleryData) {
    await prisma.gallery.upsert({
      where: { slug: g.slug },
      update: {},
      create: {
        title: g.title, slug: g.slug, description: g.description,
        coverImage: g.coverImage, categoryId: categories[g.categorySlug],
        images: g.images, date: new Date(g.date), order: g.order,
      },
    })
  }

  // --- Services ---
  const services = [
    { title: 'Bridal Photography', description: 'Elegant bridal portraits that capture every detail of your special day, from the intricate jewellery to the joyous tears.', imageUrl: '/BRIDAL.png', order: 0 },
    { title: 'Engagement Photography', description: 'Beautiful engagement shoots that tell your love story against stunning backdrops.', imageUrl: '/ENGAGEMENT.png', order: 1 },
    { title: 'Candid Photography', description: 'Natural, unposed moments that reflect genuine emotions — the laughter, the tears, the pure joy.', imageUrl: '/CANDID.png', order: 2 },
    { title: 'Wedding Cinematography', description: 'Cinematic wedding films that bring your most cherished memories to life with stunning visuals.', imageUrl: '/WEDDING.png', order: 3 },
    { title: 'Pre-Wedding Shoot', description: 'Creative pre-wedding sessions at handpicked locations that capture your unique bond.', imageUrl: '/PREWEDDING.png', order: 4 },
    { title: 'Event Photography', description: 'Professional coverage for engagements, receptions, and all your special celebrations.', imageUrl: '/CORPERATE.png', order: 5 },
  ]
  for (const s of services) {
    await prisma.service.create({ data: s })
  }

  // --- Awards ---
  const awards = [
    { year: '2010', title: 'Wedding Photographer of the Year', organization: 'Kodak', description: 'Recognized as the top wedding photographer in India for exceptional candid wedding photography and storytelling through the lens.', order: 0 },
    { year: '2009', title: 'National Award — Wedding Photography', organization: 'Government of India', description: 'Prestigious national recognition for outstanding contribution to wedding photography and cinematography.', order: 1 },
    { year: '2015', title: '15 Years of Excellence', organization: 'VIP Studio', description: 'Celebrating a decade and a half of capturing beautiful wedding stories across Nellore and Andhra Pradesh.', order: 2 },
    { year: '2020', title: '20+ Years of Service Excellence', organization: 'VIP Studio', description: 'Two decades of trusted wedding photography services, earning the reputation as the best photographer in Nellore.', order: 3 },
    { year: '2024', title: 'Top Rated Photographer Nellore', organization: 'Google Reviews', description: 'Consistently rated 4.9 stars by couples and families for exceptional wedding photography and cinematography.', order: 4 },
  ]
  for (const a of awards) {
    await prisma.award.create({ data: a })
  }

  // --- Stats ---
  const stats = [
    { number: '25+', label: 'Years of Experience', description: 'Serving Nellore since 2000', order: 0 },
    { number: '500+', label: 'Weddings Captured', description: 'Trusted by families across Andhra', order: 1 },
    { number: '4.9', label: 'Google Rating', description: '180+ 5-star reviews', order: 2 },
    { number: '15+', label: 'Award Wins', description: 'National & industry recognition', order: 3 },
  ]
  for (const s of stats) {
    await prisma.stat.create({ data: s })
  }

  // --- Quote Steps ---
  const COMMON_SERVICES = [
    { name: 'Cinematic Video', image: '/quotes/candid.png', price: 20000 },
    { name: 'Candid Photography', image: '/quotes/candid.png', price: 15000 },
    { name: 'Traditional Video', image: '/quotes/studio.png', price: 10000 },
    { name: 'Traditional Photo', image: '/quotes/camera.png', price: 10000 },
    { name: 'Drone', image: '/quotes/drone.png', price: 15000 },
  ]

  function makeEventItems(id: string) {
    return COMMON_SERVICES.map((s) => ({
      id: `${id}-${s.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: s.name,
      image: s.image,
      price: s.price,
    }))
  }

  const eventSteps = [
    'engagement', 'pasupu', 'bride-haldi', 'groom-haldi', 'sangeeth',
    'mehandi', 'reception', 'upanayanam', 'wedding', 'wedding-reception',
    'vratham', 'pre-post-wedding',
  ]

  const quoteSteps: { stepId: string; title: string; subtitle: string | null; type: string; items: unknown[]; order: number }[] = [
    { stepId: 'welcome', title: 'How much to shoot my wedding?', subtitle: "Let's estimate the cost by selecting the Events, Albums & Output duration!", type: 'welcome', items: [], order: 0 },
    ...eventSteps.map((id, i) => ({
      stepId: id,
      title: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      subtitle: null,
      type: 'multi-quantity',
      items: makeEventItems(id),
      order: i + 1,
    })),
    { stepId: 'final', title: 'Congratulations', subtitle: 'The final estimated price is :', type: 'final', items: [], order: eventSteps.length + 1 },
  ]

  for (const q of quoteSteps) {
    await prisma.quoteStep.upsert({
      where: { stepId: q.stepId },
      update: {},
      create: {
        stepId: q.stepId,
        title: q.title,
        subtitle: q.subtitle,
        type: q.type,
        items: JSON.stringify(q.items),
        order: q.order,
      },
    })
  }

  // --- Reviews ---
  const reviews = [
    { name: 'Priya Sharma', text: 'VIP Studio made our wedding unforgettable! Vijay sir captured every emotion so beautifully. The candid shots are our absolute favorite. Best wedding photographer in Nellore, hands down!', rating: 5, date: 'July 2026' },
    { name: 'Rahul Reddy', text: 'Outstanding professionalism and creativity. The cinematography was like a movie — our friends still talk about the wedding film. Thank you VIP Studios for these priceless memories.', rating: 5, date: 'June 2026' },
    { name: 'Ananya Krishnan', text: 'Booked VIP Studio for my brother\'s wedding and they exceeded all expectations. The pre-wedding shoot was magical. Vijay has an incredible eye for detail. Highly recommended!', rating: 5, date: 'May 2026' },
    { name: 'Karthik Ravi', text: 'We traveled from Bangalore to get shot by VIP Studio after seeing their work online. Completely worth it! The bridal portraits are stunning. True national-award-winning quality.', rating: 5, date: 'April 2026' },
    { name: 'Sneha Patel', text: 'From engagement to reception, VIP Studios covered every event perfectly. The drone shots of our outdoor wedding were breathtaking. Professional, punctual, and passionate about their craft.', rating: 5, date: 'March 2026' },
    { name: 'Venkatesh Rao', text: 'Fourth wedding in our family captured by VIP Studio — that speaks volumes! Vijay and team are the most trusted photographers in Nellore. Their experience shows in every frame.', rating: 5, date: 'February 2026' },
  ]
  for (let i = 0; i < reviews.length; i++) {
    await prisma.review.upsert({
      where: { id: `review-${i + 1}` },
      update: reviews[i],
      create: { id: `review-${i + 1}`, ...reviews[i], order: i },
    })
  }

  console.log('Seed complete!')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
