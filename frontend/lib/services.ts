// Static, SEO-friendly content for each service page. Names/prices here are the defaults;
// the live list (and prices) shown in the booking form come from the API so admins can edit them.

export type ServiceCategory = 'Emergency' | 'Roadside Assistance' | 'Fitment Services' | 'General Repair';

export interface ServiceContent {
  slug: string;
  name: string;
  icon: string;
  category: ServiceCategory;
  short: string;
  description: string;
  basePrice: number;
  priceNote?: string;
  image: string;
  responseTime: string;
  features: string[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
}

const commonSteps = [
  { title: 'Request help', text: 'Book online, call or WhatsApp us with your location.' },
  { title: 'Technician assigned', text: 'The nearest verified technician is dispatched with a live ETA.' },
  { title: 'Track live', text: 'Follow every status change on your tracking page.' },
  { title: 'Back on the road', text: 'Pay only after the job is done — UPI, card or cash.' },
];

export const SERVICES: ServiceContent[] = [
  {
    slug: 'thawing',
    name: 'Vehicle Thawing',
    icon: '❄️',
    category: 'Emergency',
    short: 'Frozen engine, fuel line, locks or glass — thawed safely on the spot.',
    description:
      'Cold nights can freeze diesel fuel lines, door locks, radiators and windshields. Our thawing crew uses controlled warm-air heaters, anti-gel additives and de-icing equipment to bring your vehicle back to life without damaging seals, paint or glass.',
    basePrice: 799,
    image: '/p.jpg',
    responseTime: '30–45 min',
    features: [
      'Diesel fuel-line & filter de-gelling',
      'Engine bay & battery warm-up',
      'Frozen door-lock and handle release',
      'Windshield & mirror de-icing',
      'Coolant / radiator check after thaw',
      'Cold-start jumpstart included if needed',
    ],
    steps: commonSteps,
    faqs: [
      { q: 'Is thawing safe for my engine?', a: 'Yes. We never use open flame — only regulated warm-air heaters and approved additives, with temperature monitored throughout.' },
      { q: 'How long does it take?', a: 'Most vehicles start within 20–40 minutes of the technician arriving, depending on how deeply the fuel has gelled.' },
      { q: 'Do you thaw commercial vehicles and trucks?', a: 'Yes, we handle cars, SUVs, bikes and light commercial vehicles. Mention the vehicle type when booking so we send the right equipment.' },
    ],
  },
  {
    slug: 'towing',
    name: 'Towing',
    icon: '🚛',
    category: 'Emergency',
    short: 'Flatbed and wheel-lift towing for cars, bikes and SUVs — 24/7.',
    description:
      'When your vehicle cannot be fixed on the spot we move it safely to your preferred garage or our partner workshop. Our flatbed trucks and trained operators handle breakdowns, accidents and low-clearance vehicles with zero-damage fastening.',
    basePrice: 1450,
    priceNote: 'Bike towing from ₹1,450 · Car towing from ₹3,500 · final price by distance',
    image: '/r.jpg',
    responseTime: '20–40 min',
    features: [
      'Flatbed towing for cars & SUVs',
      'Bike towing with dedicated carriers',
      'Accident and damaged-vehicle recovery',
      'Inter-city towing on request',
      'Soft-strap, zero-damage fastening',
      'Transparent distance-based pricing',
    ],
    steps: commonSteps,
    faqs: [
      { q: 'What vehicles can you tow?', a: 'Cars, bikes, SUVs and light commercial vehicles, including EVs and low-clearance sports cars on flatbeds.' },
      { q: 'Are you available 24/7?', a: 'Yes — towing runs 24 hours a day, 365 days a year.' },
      { q: 'How quickly can you reach me?', a: 'Typically 20–40 minutes within city limits. You will see a live ETA once a technician is assigned.' },
      { q: 'Do I need to be present?', a: 'Ideally yes, or a representative with the keys and vehicle papers. Call us if that is not possible and we will work it out.' },
    ],
  },
  {
    slug: 'emergency-rescue',
    name: 'Emergency Rescue',
    icon: '🚨',
    category: 'Emergency',
    short: 'Winch-outs, ditch, snow and flood recovery with priority dispatch.',
    description:
      'Stuck in a ditch, sand, snow or water-logged road? Our rescue units carry winches, recovery straps and traction gear to pull your vehicle out safely. Accident scenes get priority dispatch and we coordinate with towing and local authorities when needed.',
    basePrice: 1499,
    image: '/r.jpg',
    responseTime: 'Priority dispatch',
    features: [
      'Winch-out from ditches, mud and snow',
      'Water-logged vehicle recovery',
      'Accident-scene support',
      'Coordination with towing & insurance',
      'Night-time lighting and safety cones',
      'Trained, insured rescue operators',
    ],
    steps: commonSteps,
    faqs: [
      { q: 'Should I call or book online in an emergency?', a: 'If anyone is hurt, call 112 first. For vehicle rescue, calling our helpline is fastest — the online form works too and is dispatched immediately.' },
      { q: 'Will you help with insurance paperwork?', a: 'We share photos, a job report and towing receipt that most insurers accept for claims.' },
    ],
  },
  {
    slug: 'battery-jumpstart',
    name: 'Battery Jumpstart',
    icon: '🔋',
    category: 'Roadside Assistance',
    short: 'Dead battery jumpstarted by professionals, with a free health check.',
    description:
      'A professional jumpstart with surge-protected boosters, followed by a battery and alternator health check so you know whether you need a replacement. New batteries can be fitted on the spot.',
    basePrice: 499,
    image: '/pic.jpg',
    responseTime: '20–30 min',
    features: ['Surge-protected jump packs', 'Battery & alternator test', 'On-spot battery replacement', 'Terminal cleaning', 'Cars, bikes and SUVs'],
    steps: commonSteps,
    faqs: [
      { q: 'Can a jumpstart damage my car electronics?', a: 'Not with our surge-protected boosters, which regulate voltage and prevent reverse polarity.' },
      { q: 'Can you replace the battery?', a: 'Yes, we carry common battery sizes with warranty. Mention your model when booking.' },
    ],
  },
  {
    slug: 'flat-tyre',
    name: 'Flat Tyre',
    icon: '🛞',
    category: 'Roadside Assistance',
    short: 'Tube or tubeless puncture repair, or a spare-wheel swap.',
    description: 'We repair tubeless punctures on the spot, replace tubes, or swap in your spare — and inflate all tyres to the correct pressure before you go.',
    basePrice: 399,
    image: '/pic.jpg',
    responseTime: '20–30 min',
    features: ['Tubeless plug repair', 'Tube replacement for bikes', 'Spare wheel fitment', 'Nitrogen / air top-up', 'Wheel nut torque check'],
    steps: commonSteps,
    faqs: [{ q: 'What if the tyre is not repairable?', a: 'We fit your spare or tow the vehicle to a tyre shop — your choice.' }],
  },
  {
    slug: 'starting-problem',
    name: 'Starting Problem',
    icon: '⚡',
    category: 'Roadside Assistance',
    short: 'On-spot diagnosis of ignition, starter and electrical faults.',
    description: 'Clicking, cranking but not starting, or completely dead? We diagnose starter motors, fuses, ignition, immobiliser and fuel-delivery issues with OBD scanners and fix most problems where you are.',
    basePrice: 599,
    image: '/p.jpg',
    responseTime: '30–45 min',
    features: ['OBD-II fault scan', 'Starter & relay checks', 'Fuse and wiring repair', 'Immobiliser troubleshooting', 'Towing if a workshop is needed'],
    steps: commonSteps,
    faqs: [{ q: 'What if it cannot be fixed on the spot?', a: 'We tow it to a workshop of your choice and share our diagnosis so you are not charged twice.' }],
  },
  {
    slug: 'key-unlock-assistance',
    name: 'Key Unlock Assistance',
    icon: '🔑',
    category: 'Roadside Assistance',
    short: 'Locked out or lost keys? Damage-free unlocking.',
    description: 'Keys locked inside, broken in the lock or lost entirely — our technicians open your vehicle without damage using professional tools, after verifying ownership.',
    basePrice: 699,
    image: '/pic.jpg',
    responseTime: '25–40 min',
    features: ['Damage-free entry', 'Ownership verification', 'Broken key extraction', 'Spare key coordination'],
    steps: commonSteps,
    faqs: [{ q: 'What documents do I need?', a: 'Your RC (registration certificate) or ID matching the owner name, so we can verify the vehicle is yours.' }],
  },
  {
    slug: 'fuel-delivery',
    name: 'Fuel Delivery',
    icon: '⛽',
    category: 'Roadside Assistance',
    short: 'Petrol or diesel delivered to you (fuel at actuals).',
    description: 'Ran dry on the road? We bring up to 5 litres of petrol or diesel in approved safety cans so you can reach the next fuel station.',
    basePrice: 299,
    priceNote: 'Service fee — fuel charged at pump price',
    image: '/r.jpg',
    responseTime: '25–40 min',
    features: ['Petrol & diesel', 'Approved safety cans', 'Fuel at actual pump price', 'Bleeding of diesel lines if needed'],
    steps: commonSteps,
    faqs: [{ q: 'How much fuel do you bring?', a: 'Up to 5 litres — enough to get you to the nearest station safely.' }],
  },
  {
    slug: 'fitment-services',
    name: 'Fitment Services',
    icon: '🔧',
    category: 'Fitment Services',
    short: 'Accessory fitment and upgrades at your doorstep.',
    description: 'Horns, fog lamps, seat covers, mats, parking sensors and more — fitted neatly at your home or office by trained technicians.',
    basePrice: 499,
    image: '/p.jpg',
    responseTime: 'Scheduled',
    features: ['Doorstep fitment', 'Clean wiring', 'Warranty-safe installation', 'Wide accessory range'],
    steps: commonSteps,
    faqs: [{ q: 'Do you supply the accessories?', a: 'We can supply them or fit the ones you already have.' }],
  },
  {
    slug: 'dashcam-installation',
    name: 'Dashcam Installation',
    icon: '📹',
    category: 'Fitment Services',
    short: 'Concealed-wire dashcam installation.',
    description: 'Front, rear or dual-channel dashcams installed with hidden wiring and optional hard-wire kits for parking mode.',
    basePrice: 999,
    image: '/pic.jpg',
    responseTime: 'Scheduled',
    features: ['Hidden wiring', 'Parking-mode hardwire', 'Front + rear setups', 'App configuration'],
    steps: commonSteps,
    faqs: [{ q: 'Will it drain my battery?', a: 'Hard-wire kits include low-voltage cut-off so your battery is protected.' }],
  },
  {
    slug: 'multimedia-system-installation',
    name: 'Multimedia System Installation',
    icon: '📱',
    category: 'Fitment Services',
    short: 'Head units, speakers and reverse cameras installed.',
    description: 'Upgrade to Android Auto / Apple CarPlay head units, speakers, amplifiers and reverse cameras with factory-style finishing.',
    basePrice: 1499,
    image: '/p.jpg',
    responseTime: 'Scheduled',
    features: ['CarPlay / Android Auto', 'Speaker upgrades', 'Reverse camera', 'Steering-control integration'],
    steps: commonSteps,
    faqs: [{ q: 'Does this void my warranty?', a: 'We use plug-and-play harnesses wherever available, which keeps factory wiring intact.' }],
  },
  {
    slug: 'car-inspection',
    name: 'Car Inspection',
    icon: '📋',
    category: 'General Repair',
    short: '50-point inspection with a digital report.',
    description: 'Before a road trip or a used-car purchase, get a 50-point inspection covering engine, brakes, suspension, electricals, tyres and body, with photos in a shareable report.',
    basePrice: 999,
    image: '/pic.jpg',
    responseTime: 'Scheduled',
    features: ['50-point checklist', 'OBD scan', 'Photo report', 'Used-car buying advice'],
    steps: commonSteps,
    faqs: [{ q: 'How long does it take?', a: 'About 45–60 minutes. The report is shared on WhatsApp and email.' }],
  },
  {
    slug: 'bike-express-services',
    name: 'Bike Express Services',
    icon: '🏍️',
    category: 'General Repair',
    short: 'General bike service at your doorstep.',
    description: 'Engine oil change, brake adjustment, chain lubrication, air filter cleaning and a full safety check — done at your doorstep.',
    basePrice: 699,
    image: '/p.jpg',
    responseTime: 'Scheduled',
    features: ['Oil change', 'Brake & clutch adjust', 'Chain clean & lube', 'Safety check'],
    steps: commonSteps,
    faqs: [{ q: 'Which bikes do you service?', a: 'All popular commuter and premium bikes and scooters.' }],
  },
];

export const CATEGORY_ORDER: ServiceCategory[] = ['Emergency', 'Roadside Assistance', 'Fitment Services', 'General Repair'];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
