// All page copy lives here so marketing can edit it without touching components.
//
// PLACEHOLDER CONTENT: customer names, quotes, logos, aggregate stats, industry
// statistics and compliance certifications below are illustrative samples.
// Replace them with verified, attributable material before launch.

export const nav = {
  links: [
    { label: 'Platform', href: '#solution' },
    { label: 'Solutions', href: '#features' },
    { label: 'Resources', href: '#demo' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Enterprise', href: '#security' },
  ],
}

export const hero = {
  badge: 'Trusted by 120+ banks, credit unions & wealth firms',
  headline: 'Eliminate Deposit Blind Spots and Win Back the Money Leaving Your Institution',
  subheadline:
    'See the deposits, investments and loans your members hold elsewhere. Recover held-away dollars, raise products per member, and walk into your next board meeting with answers.',
  microcopy: ['90-day pilot', '$25M guarantee', 'Live in weeks, not years'],
  // PLACEHOLDER: fictional institutions.
  logos: ['Pinecrest FCU', 'Harbor & Main Bank', 'Summit Wealth', 'Lakeshore CU', 'Tri-County Bank', 'Meridian Advisors'],
}

export const problem = {
  headline: 'Still Watching Deposits Walk Out the Door, With No Idea Where They Go?',
  intro:
    'Paychecks land with you. Within 48 hours, a growing share moves to fintech apps, brokerages and high-yield accounts you can’t see.',
  items: [
    {
      icon: 'drain',
      title: 'Silent Deposit Flight',
      body: 'Members don’t close accounts. They quietly move balances elsewhere, and runoff only shows up in the quarterly report.',
      stat: '$31M',
      statLabel: 'lost in a single quarter at a typical $1.8B credit union',
      source: 'Illustrative example; cite institution data before launch',
    },
    {
      icon: 'fragment',
      title: 'Fragmented Member Data',
      body: 'Your core shows one slice of each relationship. Marketing, lending and advisors all work from partial pictures.',
      stat: '~35%',
      statLabel: 'of a member’s financial life visible to their primary institution',
      source: 'Illustrative estimate; cite industry research before launch',
    },
    {
      icon: 'blind',
      title: 'Costly Rate Specials',
      body: 'Without knowing who holds money elsewhere, the only lever left is a blanket CD special that raises everyone’s cost of funds.',
      stat: '1.6',
      statLabel: 'average products per member, flat for years',
      source: 'Illustrative example; cite institution data before launch',
    },
  ],
}

export const solution = {
  headline: 'Turn On the Lights: One View of Every Member’s Whole Financial Life',
  paragraphs: [
    'The deposit problem isn’t a rate problem or a marketing problem. It’s a visibility problem. You can’t win back money you can’t see.',
    'AggregateIQ securely connects, with member consent, to 17,000+ financial institutions, brokerages and fintech apps. It turns raw account data into a clean, categorized view of balances, cash flow and held-away assets, right inside the systems your team already uses.',
    'The result: your team knows who is moving money, where it is going, and which offer will bring it back, before the quarterly report tells you it’s too late.',
  ],
  before: {
    title: 'Before AggregateIQ',
    items: ['Core data only: one-third of the picture', 'Blanket rate specials', 'Runoff discovered after the fact', 'Board asks “what’s our strategy?”'],
  },
  after: {
    title: 'With AggregateIQ',
    items: ['Unified 360° member view', 'Targeted, timely win-back offers', 'Held-away deposits flagged in real time', 'Board sees recovered dollars'],
  },
  uvp: 'Unlike PFM widgets bundled by your digital banking vendor, AggregateIQ turns aggregated data into specific, revenue-ready opportunities, and we guarantee the pilot finds them.',
}

export const features = [
  {
    visual: 'heldaway',
    name: 'Held-Away Deposit Detection',
    description:
      'Surface the savings, CDs and brokerage cash your members keep at other institutions, ranked by balance and rate gap. Your team sees exactly which relationships to defend, with a ready-made offer for each.',
    metric: '$47M',
    metricLabel: 'held-away balances found in a first pilot cohort',
  },
  {
    visual: 'member360',
    name: 'Unified Member 360° View',
    description:
      'Every account, balance and transaction, internal and external, in one clean profile, with categorized cash flow and verified income. Frontline staff and advisors walk into every conversation fully prepared.',
    metric: '2.1',
    metricLabel: 'products per member, up from 1.6',
  },
  {
    visual: 'flow',
    name: 'Deposit Flow Intelligence',
    description:
      'See where outgoing ACH transfers go by destination and competitor category. Spot runoff trends weeks before they hit the balance sheet and act while members are still deciding.',
    metric: '6 weeks',
    metricLabel: 'earlier warning on deposit runoff',
  },
  {
    visual: 'offers',
    name: 'Targeted Win-Back Offers',
    description:
      'Replace blanket rate specials with precise offers: match a competitor’s rate for the members who hold money there, and nobody else. Protect margin while recapturing the balances that matter.',
    metric: '40%',
    metricLabel: 'less spent on rate specials',
  },
  {
    visual: 'verify',
    name: 'Instant Account Verification',
    description:
      'Verify external accounts and balances in seconds for account opening, funding and lending decisions. Cut abandonment in digital onboarding and reduce ACH return risk.',
    metric: 'Seconds',
    metricLabel: 'to verify, instead of 2–3 days of micro-deposits',
  },
  {
    visual: 'board',
    name: 'Board-Ready Reporting',
    description:
      'Automated dashboards track recovered deposits, share of wallet and pilot ROI. Walk into every board and ALCO meeting with clear, defensible numbers.',
    metric: '1 click',
    metricLabel: 'to a board-ready deposit recovery report',
  },
]

export const caseStudy = {
  // PLACEHOLDER: fictional customer and results.
  company: 'Pinecrest Federal Credit Union',
  context: 'Community credit union · $1.8B assets · 140,000 members',
  results: [
    { value: '$62M', label: 'Deposits & assets recovered' },
    { value: '2.1', label: 'Products per member (from 1.6)' },
    { value: '3 wks', label: 'From contract to live' },
  ],
  quote:
    'For three years I could watch money leave and couldn’t tell the board where it went. Within 90 days of going live, we knew exactly who was moving money, and we started bringing it back.',
  person: 'Mark D.',
  title: 'EVP & Chief Growth Officer',
}

export const testimonials = [
  {
    quote: 'We stopped running blanket CD specials. Our cost of funds dropped and deposits still grew.',
    name: 'Dana R.',
    title: 'CFO',
    company: 'Harbor & Main Bank',
    metric: '−38 bps cost of funds',
  },
  {
    quote: 'Our advisors finally see held-away assets. Two client reviews a week now turn into consolidation conversations.',
    name: 'James O.',
    title: 'Managing Partner',
    company: 'Summit Wealth Partners',
    metric: '$210M AUM consolidated',
  },
  {
    quote: 'Implementation took weeks, not the 18 months we’ve come to expect. IT barely noticed.',
    name: 'Priya S.',
    title: 'VP, Digital Banking',
    company: 'Lakeshore Credit Union',
    metric: 'Live in 3 weeks',
  },
]

export const stats = [
  { value: '120+', label: 'Institutions' },
  { value: '4.2M', label: 'Connected accounts' },
  { value: '96%', label: 'Renewal rate' },
  { value: '$1.4B+', label: 'Deposits recovered' },
]

export const pricing = {
  annualDiscount: 0.15,
  tiers: [
    {
      name: 'Community',
      audience: 'Credit unions & community banks under $500M',
      monthly: 2500,
      users: 'Up to 10,000 connected users',
      cta: 'Start 90-Day Pilot',
      features: [
        'Unified member 360° view',
        'Held-away deposit detection',
        'Instant account verification',
        'Core & digital banking integration',
        'Standard dashboards',
        'Email & chat support',
      ],
    },
    {
      name: 'Growth',
      audience: 'Institutions from $500M to $5B',
      monthly: 4500,
      users: 'Up to 50,000 connected users',
      cta: 'Start 90-Day Pilot',
      popular: true,
      features: [
        'Everything in Community, plus:',
        'Deposit flow intelligence',
        'Targeted win-back offer engine',
        'CRM & marketing automation sync',
        'Board-ready ROI reporting',
        'Wealth advisor held-away view',
        '$25M pilot guarantee',
        'Dedicated success manager',
      ],
    },
    {
      name: 'Enterprise',
      audience: 'Regional banks, large CUs & RIAs',
      monthly: null,
      users: 'Unlimited connected users',
      cta: 'Schedule a Demo',
      features: [
        'Everything in Growth, plus:',
        'Custom data models & APIs',
        'Data warehouse export',
        'Multi-charter & CUSO support',
        '99.95% uptime SLA',
        'Named solutions architect',
        'Custom volume pricing',
      ],
    },
  ],
  setupNote: 'One-time setup fee of $15,000, refunded if your 90-day pilot finds less than $25M in recoverable deposits and assets. Usage above the plan allowance: $0.35 per active connected user per month.',
  comparison: [
    {
      category: 'Core Features',
      rows: [
        ['Unified member 360° view', true, true, true],
        ['Held-away deposit detection', true, true, true],
        ['Instant account verification', true, true, true],
        ['Deposit flow intelligence', false, true, true],
        ['Targeted win-back offers', false, true, true],
      ],
    },
    {
      category: 'Integrations',
      rows: [
        ['Core & digital banking', true, true, true],
        ['CRM & marketing automation', false, true, true],
        ['Data warehouse export', false, false, true],
        ['Custom APIs', false, false, true],
      ],
    },
    {
      category: 'Support',
      rows: [
        ['Email & chat support', true, true, true],
        ['Dedicated success manager', false, true, true],
        ['Named solutions architect', false, false, true],
        ['Uptime SLA', false, false, true],
      ],
    },
    {
      category: 'Advanced Capabilities',
      rows: [
        ['Board-ready ROI reporting', false, true, true],
        ['Wealth advisor held-away view', false, true, true],
        ['Multi-charter & CUSO support', false, false, true],
      ],
    },
  ],
  // Keep in sync with the FAQPage JSON-LD in index.html.
  faq: [
    {
      q: 'Can we change plans later?',
      a: 'Yes. You can move between Community and Growth at any renewal, and upgrade mid-term at a prorated rate as your connected-user count grows.',
    },
    {
      q: 'What is included in the 90-day pilot?',
      a: 'Full platform access for an opt-in member cohort, core and digital banking integration, a held-away deposit report, and a dedicated success manager. If the pilot does not identify at least $25M in recoverable deposits and assets, your setup fee is refunded.',
    },
    {
      q: 'Do you offer pricing for smaller institutions?',
      a: 'Yes. The Community plan is built for credit unions and community banks under $500M in assets, and we offer consortium pricing for CUSOs and league partners.',
    },
    {
      q: 'Is pricing affected by the number of connected users?',
      a: 'Each plan includes a connected-user allowance. Above it, usage is billed at $0.35 per active connected user per month. Enterprise plans carry custom volume pricing.',
    },
  ],
  trust: ['$25M pilot guarantee', 'No long-term lock-in', 'Live in weeks'],
}

export const integrations = {
  // Integration targets, shown as text tiles. Confirm partnerships and logo rights before launch.
  partners: [
    'Jack Henry', 'Fiserv', 'FIS', 'Corelation', 'Symitar', 'Q2',
    'Alkami', 'Banno', 'Salesforce', 'HubSpot', 'Microsoft Teams', 'Slack',
    'Snowflake', 'nCino', 'MeridianLink', 'Orion',
  ],
  // PLACEHOLDER: list only certifications you actually hold.
  badges: ['SOC 2 Type II', 'ISO 27001', 'GDPR', 'CCPA', 'CFPB §1033 Ready'],
  security: [
    '256-bit AES encryption at rest, TLS 1.3 in transit',
    'SSO/SAML and SCIM provisioning',
    'Role-based access control with audit logs',
    'Member-permissioned, revocable data access',
    'Annual third-party penetration tests',
    'FFIEC-aligned vendor due diligence package',
  ],
}

export const demo = {
  // Set `src` to the hosted MP4 and `captions` to a WebVTT file when the video is ready.
  src: '',
  captions: '',
  description:
    'A 3-minute tour: connect a member’s outside accounts, spot $180K in held-away savings, send a targeted offer, and watch it roll up into the board report.',
  chapters: [
    { time: '0:00', label: 'The deposit visibility problem' },
    { time: '0:40', label: 'Member 360° view' },
    { time: '1:30', label: 'Held-away detection & win-back offers' },
    { time: '2:20', label: 'Board-ready ROI reporting' },
  ],
}

export const finalCta = {
  headline: 'Ready to See Where Your Deposits Are Going?',
  body: 'Join 120+ institutions using AggregateIQ to recover deposits and grow share of wallet. Start a 90-day pilot, backed by our $25M guarantee.',
  trust: ['90-day pilot', 'Setup fee guarantee', 'Live in weeks', 'Cancel at renewal'],
}

export const footer = {
  tagline: 'Financial data aggregation that helps community institutions compete and grow.',
  columns: [
    { title: 'Product', links: ['Features', 'Integrations', 'Pricing', 'Security', 'Changelog'] },
    { title: 'Resources', links: ['Blog', 'Case Studies', 'Help Center', 'API Documentation', 'Webinars'] },
    { title: 'Company', links: ['About Us', 'Careers', 'Contact', 'Press Kit', 'Partners'] },
    { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Acceptable Use'] },
  ],
  social: ['LinkedIn', 'X', 'Facebook', 'YouTube'],
}
