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
  type: 'welcome' | 'yes-no' | 'multi-quantity' | 'single-select' | 'timeline' | 'style-select' | 'final'
  items: StepItem[]
  condition?: (selections: Record<string, number>) => boolean
}

export const STEPS: Step[] = [
  {
    id: 'welcome',
    title: 'How much to shoot my wedding?',
    subtitle: "Let's estimate the cost by selecting the Events, Albums & Output duration!",
    type: 'welcome',
    items: [],
  },
  {
    id: 'digital-invite',
    title: 'Do you want Digital Invite?',
    type: 'multi-quantity',
    items: [
      { id: 'invite-photo', name: 'Photo', image: '/quotes/letter.png', price: 0 },
      { id: 'invite-video', name: 'Video', image: '/quotes/video-camera.png', price: 5000 },
    ],
  },
  {
    id: 'vratham',
    title: 'Vratham',
    type: 'multi-quantity',
    items: [
      { id: 'vra-trad-photo', name: 'Traditional Photo', image: '/quotes/camera.png', price: 10000 },
      { id: 'vra-trad-video', name: 'Traditional Video', image: '/quotes/studio.png', price: 10000 },
    ],
  },
  {
    id: 'reception',
    title: 'Reception',
    type: 'multi-quantity',
    items: [
      { id: 'rec-trad-photo', name: 'Traditional Photo', image: '/quotes/camera.png', price: 10000 },
      { id: 'rec-trad-video', name: 'Traditional Video', image: '/quotes/studio.png', price: 10000 },
      { id: 'rec-candid-photo', name: 'Candid Photo', image: '/quotes/candid.png', price: 15000 },
      { id: 'rec-candid-video', name: 'Candid Video', image: '/quotes/candid.png', price: 15000 },
      { id: 'rec-drone', name: 'Drone', image: '/quotes/drone.png', price: 15000 },
    ],
  },
  {
    id: 'albums-needed',
    title: 'Do you really need Albums?',
    subtitle: "Each album's got 25 sheets!",
    type: 'yes-no',
    items: [
      { id: 'alb-y', name: 'Yes', image: '/quotes/yes.png', price: 0 },
      { id: 'alb-n', name: 'No', image: '/quotes/no.png', price: 0 },
    ],
  },
  {
    id: 'groom-haldi',
    title: 'Groom Haldi',
    type: 'multi-quantity',
    items: [
      { id: 'gh-candid-photo', name: 'Candid Photo', image: '/quotes/candid.png', price: 15000 },
      { id: 'gh-candid-video', name: 'Candid Video', image: '/quotes/candid.png', price: 15000 },
    ],
  },
  {
    id: 'bride-haldi',
    title: 'Bride Haldi',
    type: 'multi-quantity',
    items: [
      { id: 'bh-candid-photo', name: 'Candid Photo', image: '/quotes/candid.png', price: 15000 },
      { id: 'bh-candid-video', name: 'Candid Video', image: '/quotes/candid.png', price: 15000 },
    ],
  },
  {
    id: 'photography-type',
    title: 'What photography do you want?',
    type: 'single-select',
    items: [
      { id: 'photo-candid', name: 'Candid Photography', image: '/quotes/candid.png', price: 0 },
      { id: 'photo-trad', name: 'Traditional Photography', image: '/quotes/camera.png', price: 0 },
    ],
  },
  {
    id: 'num-events',
    title: 'How many events do we have?',
    subtitle: 'We accept contracts for a minimum of 3 events.',
    type: 'single-select',
    items: [
      { id: 'evt-3', name: '3 Events', image: '/quotes/photo.png', price: 0 },
      { id: 'evt-4', name: '4 Events', image: '/quotes/photo.png', price: 5000 },
      { id: 'evt-5', name: '5 Events', image: '/quotes/photo.png', price: 10000 },
      { id: 'evt-6', name: '6 Events', image: '/quotes/photo.png', price: 15000 },
    ],
  },
  {
    id: 'groom-making',
    title: 'Groom Making & Haldi',
    type: 'multi-quantity',
    items: [
      { id: 'gm-photo', name: 'Photo', image: '/quotes/photo-camera.png', price: 10000 },
      { id: 'gm-video', name: 'Video', image: '/quotes/video-camera.png', price: 10000 },
    ],
  },
  {
    id: 'bride-making',
    title: 'Bride Making & Haldi',
    type: 'multi-quantity',
    items: [
      { id: 'bm-photo', name: 'Photo', image: '/quotes/photo-camera.png', price: 10000 },
      { id: 'bm-video', name: 'Video', image: '/quotes/video-camera.png', price: 10000 },
    ],
  },
  {
    id: 'wedding',
    title: 'Wedding',
    type: 'multi-quantity',
    items: [
      { id: 'wed-trad-photo', name: 'Traditional Photo', image: '/quotes/camera.png', price: 10000 },
      { id: 'wed-trad-video', name: 'Traditional Video', image: '/quotes/studio.png', price: 15000 },
      { id: 'wed-candid-photo', name: 'Candid Photo', image: '/quotes/candid.png', price: 20000 },
      { id: 'wed-candid-video', name: 'Candid Video', image: '/quotes/candid.png', price: 25000 },
      { id: 'wed-drone', name: 'Drone', image: '/quotes/drone.png', price: 15000 },
    ],
  },
  {
    id: 'reception-q',
    title: 'Reception?',
    type: 'yes-no',
    items: [
      { id: 'rec-q-y', name: 'Yes', image: '/quotes/yes.png', price: 0 },
      { id: 'rec-q-n', name: 'No', image: '/quotes/no.png', price: 0 },
    ],
  },
  {
    id: 'reception-details',
    title: 'Reception',
    type: 'multi-quantity',
    condition: (s) => s['rec-q-y'] === 1,
    items: [
      { id: 'rd-trad-photo', name: 'Traditional Photo', image: '/quotes/camera.png', price: 10000 },
      { id: 'rd-trad-video', name: 'Traditional Video', image: '/quotes/studio.png', price: 10000 },
      { id: 'rd-drone', name: 'Drone', image: '/quotes/drone.png', price: 15000 },
    ],
  },
  {
    id: 'album-count',
    title: 'How many albums do you want?',
    condition: (s) => s['alb-y'] === 1,
    type: 'single-select',
    items: [
      { id: 'alb-1', name: '1 Album', image: '/quotes/press-book.png', price: 5000 },
      { id: 'alb-2', name: '2 Albums', image: '/quotes/press-book.png', price: 9000 },
      { id: 'alb-3', name: '3 Albums', image: '/quotes/press-book.png', price: 12000 },
    ],
  },
  {
    id: 'pellikoduku',
    title: 'Pellikoduku',
    type: 'multi-quantity',
    items: [
      { id: 'pk-trad-photo', name: 'Traditional Photo', image: '/quotes/camera.png', price: 10000 },
      { id: 'pk-trad-video', name: 'Traditional Video', image: '/quotes/studio.png', price: 10000 },
      { id: 'pk-candid-photo', name: 'Candid Photo', image: '/quotes/candid.png', price: 15000 },
    ],
  },
  {
    id: 'pellikuthuru',
    title: 'Pellikuthuru',
    type: 'multi-quantity',
    items: [
      { id: 'pt-trad-photo', name: 'Traditional Photo', image: '/quotes/camera.png', price: 10000 },
      { id: 'pt-trad-video', name: 'Traditional Video', image: '/quotes/studio.png', price: 10000 },
      { id: 'pt-candid-photo', name: 'Candid Photo', image: '/quotes/candid.png', price: 15000 },
    ],
  },
  {
    id: 'big-day',
    title: 'The Big Day',
    subtitle: "It's your wedding day, so don't settle for anything less than the best!",
    type: 'multi-quantity',
    items: [
      { id: 'bd-trad-photo', name: 'Traditional Photo', image: '/quotes/camera.png', price: 10000 },
      { id: 'bd-trad-video', name: 'Traditional Video', image: '/quotes/studio.png', price: 15000 },
      { id: 'bd-candid-photo', name: 'Candid Photo', image: '/quotes/candid.png', price: 20000 },
      { id: 'bd-candid-video', name: 'Candid Video', image: '/quotes/candid.png', price: 25000 },
      { id: 'bd-drone', name: 'Drone', image: '/quotes/drone.png', price: 15000 },
    ],
  },
  {
    id: 'sangeeth-q',
    title: 'Do we have Sangeeth?',
    type: 'yes-no',
    items: [
      { id: 'san-q-y', name: 'Yes', image: '/quotes/yes.png', price: 0 },
      { id: 'san-q-n', name: 'No', image: '/quotes/no.png', price: 0 },
    ],
  },
  {
    id: 'mehandi-q',
    title: 'Do we have Mehandi?',
    type: 'yes-no',
    items: [
      { id: 'meh-q-y', name: 'Yes', image: '/quotes/yes.png', price: 0 },
      { id: 'meh-q-n', name: 'No', image: '/quotes/no.png', price: 0 },
    ],
  },
  {
    id: 'cocktail-q',
    title: 'Cocktail Party?',
    type: 'yes-no',
    items: [
      { id: 'cock-q-y', name: 'Yes', image: '/quotes/yes.png', price: 0 },
      { id: 'cock-q-n', name: 'No', image: '/quotes/no.png', price: 0 },
    ],
  },
  {
    id: 'sangeeth-details',
    title: 'Sangeeth',
    type: 'multi-quantity',
    condition: (s) => s['san-q-y'] === 1,
    items: [
      { id: 'san-candid-photo', name: 'Candid Photo', image: '/quotes/candid.png', price: 15000 },
      { id: 'san-candid-video', name: 'Candid Video', image: '/quotes/candid.png', price: 15000 },
      { id: 'san-trad-video', name: 'Traditional Video', image: '/quotes/studio.png', price: 10000 },
      { id: 'san-drone', name: 'Drone', image: '/quotes/drone.png', price: 15000 },
    ],
  },
  {
    id: 'mehandi-details',
    title: 'Mehandi',
    type: 'multi-quantity',
    condition: (s) => s['meh-q-y'] === 1,
    items: [
      { id: 'meh-candid-photo', name: 'Candid Photo', image: '/quotes/candid.png', price: 15000 },
      { id: 'meh-trad-video', name: 'Traditional Video', image: '/quotes/studio.png', price: 10000 },
    ],
  },
  {
    id: 'cocktail-details',
    title: "It's Party Time!",
    type: 'multi-quantity',
    condition: (s) => s['cock-q-y'] === 1,
    items: [
      { id: 'cock-candid-photo', name: 'Candid Photo', image: '/quotes/candid.png', price: 15000 },
      { id: 'cock-candid-video', name: 'Candid Video', image: '/quotes/candid.png', price: 15000 },
    ],
  },
  {
    id: 'candid-album',
    title: 'Candid Album',
    subtitle: 'As a couple you can have this one with you!',
    type: 'multi-quantity',
    condition: (s) => s['alb-y'] === 1,
    items: [
      { id: 'alb-cand-press', name: 'Press Book', image: '/quotes/press-book.png', price: 20000 },
      { id: 'alb-cand-magnum', name: 'Magnum', image: '/quotes/magnum.png', price: 30000 },
    ],
  },
  {
    id: 'traditional-album',
    title: 'Traditional Album',
    subtitle: 'For Amma Nanna!',
    type: 'multi-quantity',
    condition: (s) => s['alb-y'] === 1,
    items: [
      { id: 'alb-trad-press', name: 'Press Book', image: '/quotes/press-book.png', price: 15000 },
      { id: 'alb-trad-magnum', name: 'Magnum', image: '/quotes/magnum.png', price: 20000 },
    ],
  },
  {
    id: 'surprise-box',
    title: 'Do you want a Surprise Box?',
    subtitle: 'Its a complimentary from our company',
    type: 'yes-no',
    items: [
      { id: 'surp-y', name: 'Yes', image: '/quotes/surprise.png', price: 0 },
      { id: 'surp-n', name: 'No', image: '/quotes/no.png', price: 0 },
    ],
  },
  {
    id: 'timeline',
    title: 'Tell us, when you want your output?',
    subtitle: 'Give us enough time, so that we can give you our best work.',
    type: 'timeline',
    items: [
      { id: 'tl-1m', name: 'One Month', image: '/quotes/one.png', price: 0 },
      { id: 'tl-5m', name: 'Five Months', image: '/quotes/five.png', price: -5000 },
    ],
  },
  {
    id: 'prewed-q',
    title: 'We forgot to ask you, do we have Pre wed shoot?',
    type: 'yes-no',
    items: [
      { id: 'prewed-q-y', name: 'Yes', image: '/quotes/yes.png', price: 0 },
      { id: 'prewed-q-n', name: 'No', image: '/quotes/no.png', price: 0 },
    ],
  },
  {
    id: 'shooting-style',
    title: 'Which shooting style do you prefer?',
    subtitle: 'Your wedding film is going to be 10 to 15 minutes without documentary shoot, with documentary it is going to 20 to 25 minutes',
    type: 'style-select',
    condition: (s) => s['prewed-q-y'] === 1,
    items: [
      { id: 'style-doc', name: 'Documentary Style', image: '/quotes/doc.png', price: 10000 },
    ],
  },
  {
    id: 'prewed-details',
    title: 'Romantic Pre wedding!',
    type: 'single-select',
    condition: (s) => s['prewed-q-y'] === 1,
    items: [
      { id: 'prewed-photo', name: 'Only Photo', image: '/quotes/prewed-photo.png', price: 8000 },
      { id: 'prewed-both', name: 'Both Photo & Video', image: '/quotes/prewed-video.png', price: 15000 },
    ],
  },
  {
    id: 'live-q',
    title: 'Do you want Live Streaming?',
    type: 'yes-no',
    items: [
      { id: 'live-q-y', name: 'Yes', image: '/quotes/yes.png', price: 0 },
      { id: 'live-q-n', name: 'No', image: '/quotes/no.png', price: 0 },
    ],
  },
  {
    id: 'live-details',
    title: 'Live Streaming',
    subtitle: 'The duration of Live streaming will be of 4 hrs',
    type: 'multi-quantity',
    condition: (s) => s['live-q-y'] === 1,
    items: [
      { id: 'live-eng', name: 'Engagement : ₹6,000', image: '/quotes/photo.png', price: 6000 },
      { id: 'live-rec', name: 'Reception : ₹6,000', image: '/quotes/photo.png', price: 6000 },
      { id: 'live-san', name: 'Sangeeth : ₹6,000', image: '/quotes/photo.png', price: 6000 },
      { id: 'live-wed', name: 'Wedding : ₹9,000', image: '/quotes/photo.png', price: 9000 },
    ],
  },
  {
    id: 'engagement',
    title: 'Engagement',
    type: 'multi-quantity',
    items: [
      { id: 'eng-trad-photo', name: 'Traditional Photo', image: '/quotes/camera.png', price: 10000 },
      { id: 'eng-trad-video', name: 'Traditional Video', image: '/quotes/studio.png', price: 10000 },
      { id: 'eng-candid-photo', name: 'Candid Photo', image: '/quotes/candid.png', price: 15000 },
      { id: 'eng-candid-video', name: 'Candid Video', image: '/quotes/candid.png', price: 15000 },
      { id: 'eng-drone', name: 'Drone', image: '/quotes/drone.png', price: 15000 },
    ],
  },
  {
    id: 'final',
    title: 'Congratulations',
    subtitle: 'The final estimated price is :',
    type: 'final',
    items: [],
  },
]
