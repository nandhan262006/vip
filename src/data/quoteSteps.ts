export interface StepItem {
  id: string
  name: string
  image: string
  price: number
  category?: string
}

export interface Step {
  id: string
  title: string
  subtitle?: string
  type: 'welcome' | 'multi-quantity' | 'single-select' | 'final'
  items: StepItem[]
  condition?: (selections: Record<string, number>) => boolean
}

const COMMON_SERVICES = [
  { name: 'Cinematic Video', image: '/quotes/candid.png', price: 20000 },
  { name: 'Candid Photography', image: '/quotes/candid.png', price: 15000 },
  { name: 'Traditional Video', image: '/quotes/studio.png', price: 10000 },
  { name: 'Traditional Photo', image: '/quotes/camera.png', price: 10000 },
  { name: 'Drone', image: '/quotes/drone.png', price: 15000 },
]

function makeEventStep(id: string, title: string): Step {
  return {
    id,
    title,
    type: 'multi-quantity',
    items: COMMON_SERVICES.map((s) => ({
      ...s,
      id: `${id}-${s.name.toLowerCase().replace(/\s+/g, '-')}`,
    })),
  }
}

export const STEPS: Step[] = [
  {
    id: 'welcome',
    title: 'How much to shoot my wedding?',
    subtitle: "Let's estimate the cost by selecting the Events, Albums & Output duration!",
    type: 'welcome',
    items: [],
  },
  makeEventStep('engagement', 'Engagement'),
  makeEventStep('pasupu', 'Pasupu'),
  makeEventStep('bride-haldi', 'Bride Haldi'),
  makeEventStep('groom-haldi', 'Groom Haldi'),
  makeEventStep('sangeeth', 'Sangeeth'),
  makeEventStep('mehandi', 'Mehandi'),
  makeEventStep('reception', 'Reception'),
  makeEventStep('upanayanam', 'Upanayanam'),
  makeEventStep('wedding', 'Wedding'),
  makeEventStep('wedding-reception', 'Wedding Reception'),
  makeEventStep('vratham', 'Vratham'),
  makeEventStep('pre-post-wedding', 'Pre / Post Wedding'),
  {
    id: 'final',
    title: 'Congratulations',
    subtitle: 'The final estimated price is :',
    type: 'final',
    items: [],
  },
]
