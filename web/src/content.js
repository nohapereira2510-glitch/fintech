// All page copy lives here so marketing can edit it without touching layout.
// Items marked CONFIRM / REPLACE must be verified before launch (see README).

export const CTA_PRIMARY = 'Get Your Free Deposit Leakage Snapshot'
export const CTA_SECONDARY = 'Book Your 90-Day Pilot'

// Flip to true only when real, approved customer quotes replace the placeholders.
export const SHOW_TESTIMONIALS = false

// Set to a real number (e.g. 5) to show the pilot-capacity banner. null hides it.
export const PILOT_SLOTS_REMAINING = null

export const nav = [
  { label: 'The Problem', href: '#problem' },
  { label: 'How It Works', href: '#solution' },
  { label: 'ROI', href: '#roi' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export const hero = {
  eyebrow: 'For banks, credit unions & wealth management firms',
  headline: 'See your deposits walking out the door',
  highlight: 'before they leave.',
  sub: "You can see every dollar inside your walls. Deposit Radar shows you the money your customers keep somewhere else, and flags who's starting to move, so your relationship managers can call first.",
  trust: ['No core conversion', 'Consumer-permissioned data', 'Live in weeks, not quarters [CONFIRM]'],
}

export const problem = {
  title: "You find out after. You always find out after.",
  intro:
    "A thirty-year customer wires $412,000 to a brokerage on Thursday. You learn about it Friday, from a runoff report. Nobody called. Nobody warned you. Sound familiar?",
  pains: [
    {
      icon: 'eyeOff',
      title: "You're blind outside your own walls",
      body: "Your core shows every penny you hold. The moment a customer's money lands at a fintech, a brokerage or a high-yield app, it goes dark.",
    },
    {
      icon: 'drop',
      title: 'The bucket has a hundred pinholes',
      body: 'Payroll gets split 60/40. Savings drift to a 4.5% app. By the time it shows up in ALCO, the money is already gone.',
    },
    {
      icon: 'trendDown',
      title: 'Every plug costs you margin',
      body: "Another CD special brings the money back at a rate that bleeds your NIM. Then it leaks out somewhere else.",
    },
    {
      icon: 'chat',
      title: "“Relationship banking” sounds thin in the boardroom",
      body: "When a director asks for your digital strategy to stop runoff, you need a slide with numbers, not a slogan.",
    },
  ],
}

export const solution = {
  title: 'Turn the lights on.',
  body:
    "Deposit Radar aggregates the outside accounts your customers choose to link (brokerage, online savings, payroll splits, other banks) and turns them into one early-warning view for your team. You stop guessing who's leaving and start calling the right people first.",
  steps: [
    { n: '01', title: 'Connect', body: 'Customers link outside accounts through your existing digital banking, with their consent.' },
    { n: '02', title: 'See', body: 'Your dashboard shows held-away balances, payroll splits and money-movement patterns by customer.' },
    { n: '03', title: 'Act', body: 'An at-risk list goes to relationship managers every week, ranked by dollars at stake.' },
  ],
}

export const benefits = [
  { icon: 'radar', title: 'Spot runoff early', body: 'Get flagged when a customer starts moving money out, weeks before the wire.' },
  { icon: 'coins', title: 'Find the money you never had', body: 'See held-away deposits and investments your customers keep at other institutions.' },
  { icon: 'phone', title: 'Make calls that land', body: '"We noticed you\'ve been building savings" beats another rate-special mailer.' },
  { icon: 'shield', title: 'Protect your margin', body: 'Retain deposits without running another desperate CD special.' },
  { icon: 'chart', title: 'Walk into the board meeting ready', body: 'Deposits retained, held-away dollars found and cost of funds avoided, on one slide.' },
]

export const showcase = {
  title: 'Your first dashboard, in plain view',
  body: 'The at-risk list, ranked by dollars. Held-away balances by customer. Payroll splits you never knew about. All from accounts your customers chose to connect.',
  bullets: [
    'At-risk list ranked by balance at stake',
    'Held-away balances by institution type',
    'Payroll and direct-deposit split detection',
    'Export to your CRM or print for Monday huddles',
  ],
}

export const roiDefaults = {
  deposits: 2_800_000_000,
  runoffPct: 8,
  retainedPct: 10,
  replacementCostPct: 2.5,
}

// Illustrative pricing — CONFIRM with finance before launch.
export const pricing = [
  {
    name: '90-Day Pilot',
    price: '$15,000',
    cadence: 'one time',
    blurb: 'Prove it on your own customers before you commit.',
    features: ['Up to 5,000 linked customers', 'Weekly at-risk list', 'Board-ready results readout', 'Credit toward annual plan [CONFIRM]'],
    cta: 'Book Your Pilot',
    featured: false,
  },
  {
    name: 'Community',
    price: '$4,500',
    cadence: 'per month, billed annually',
    blurb: 'For institutions under $1B in assets.',
    features: ['Unlimited linked customers', 'At-risk alerts & RM workflow', 'Held-away balance reporting', 'Standard core integrations [CONFIRM]'],
    cta: 'Get Free Snapshot',
    featured: false,
  },
  {
    name: 'Regional',
    price: '$6,500',
    cadence: 'per month, billed annually',
    blurb: 'For institutions from $1B to $10B in assets.',
    features: ['Everything in Community', 'CRM export & API access', 'ALCO & board reporting pack', 'Dedicated success manager'],
    cta: 'Get Free Snapshot',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: 'for $10B+ and wealth platforms',
    blurb: 'Multi-charter, advisor-facing and custom data needs.',
    features: ['Everything in Regional', 'Advisor held-away views', 'Custom data retention', 'SLA & on-site onboarding'],
    cta: 'Talk to Sales',
    featured: false,
  },
]

// PLACEHOLDERS — do not publish. Hidden while SHOW_TESTIMONIALS is false.
export const testimonials = [
  { quote: '[REPLACE with an approved customer quote]', name: '[Name]', role: '[Title], [Institution]' },
  { quote: '[REPLACE with an approved customer quote]', name: '[Name]', role: '[Title], [Institution]' },
  { quote: '[REPLACE with an approved customer quote]', name: '[Name]', role: '[Title], [Institution]' },
]

export const trustBadges = [
  'SOC 2 Type II [CONFIRM]',
  'Consumer-permissioned access',
  'Encryption in transit & at rest',
  'Vendor due-diligence pack available',
]

export const faq = [
  {
    q: 'Do we have to replace or convert our core?',
    a: 'No. Deposit Radar sits alongside your core and digital banking. Your customers link outside accounts through a consent flow; nothing about your core changes.',
  },
  {
    q: 'Is customer data permissioned?',
    a: 'Yes. We only see accounts a customer explicitly chooses to connect, and they can revoke access at any time.',
  },
  {
    q: 'How does this fit with open-banking rules?',
    a: "We follow consumer-permissioned data access and track the evolving U.S. rules closely. We'll walk your compliance team through our current approach during due diligence. [CONFIRM wording with counsel]",
  },
  {
    q: 'What does our IT team need to do?',
    a: 'Typically: approve the vendor review, enable the linking flow in digital banking, and set up SSO for your team. We handle the rest. [CONFIRM]',
  },
  {
    q: "What happens after the pilot?",
    a: "You get a readout of deposits at risk, held-away dollars found and calls made. If it's not worth it, you walk away. No automatic renewal.",
  },
  {
    q: 'Can wealth management firms use this?',
    a: 'Yes. Advisors use the held-away view to see assets clients keep at other custodians and start the consolidation conversation.',
  },
]

export const contact = {
  title: "See what's leaking. Free.",
  body: "Tell us a bit about your institution. We'll send back a Deposit Leakage Snapshot: an estimate of your annual runoff exposure and what early warning could be worth.",
  email: 'hello@depositradar.example [REPLACE]',
  phone: '(555) 010-0000 [REPLACE]',
}
