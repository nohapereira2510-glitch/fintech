# AggregateIQ Brand Identity & Design System

## Brand Identity

### Brand Essence

1. **Clarity**: We turn fragmented, invisible financial data into a complete picture institutions can act on.
2. **Trust**: Bank-grade security, compliance readiness, and data handled with the same care a credit union gives its members.
3. **Growth**: Every feature ties back to measurable outcomes: recovered deposits, higher share of wallet, more products per member.
4. **Pragmatism**: Fast implementation, proven results, and no 18-month "science projects."
5. **Empowerment**: We give community institutions the data advantage that big banks and fintechs take for granted.
6. **Accountability**: We back our promises with guarantees and hard numbers, not slide-deck hype.

### Brand Voice

- **Tone:** Confident, calm, and reassuring. We speak like a trusted peer who has sat in the boardroom, not a salesperson chasing a quota. We understand that our audience is anxious about deposit flight, and we answer that anxiety with steadiness and proof.
- **Language:** Clear and direct, fluent in the industry's own vocabulary ("primary financial institution," "share of wallet," "held-away assets," "deposit runoff," "cost of funds") without hiding behind buzzwords. We avoid "transformation," "disruption," and "revolutionary." Every claim is specific and measurable.
- **Communication Style:** Problem-first and outcome-driven. We name the pain vividly ("your members' paychecks land with you, then 48 hours later, 40% is gone"), then show exactly how visibility becomes recovery. We lead with peer proof, ROI math, and compliance safety, because that is how our buyers decide.

### Brand Narrative

Every day, banks, credit unions, and wealth management firms watch money quietly walk out the door. Paychecks arrive, then flow within hours to Robinhood, SoFi, Chime, and Schwab. The leaders responsible for growth can see the money leave but can't see where it goes, who is moving it, or why. They're fighting blind against competitors with billion-dollar tech budgets. AggregateIQ turns on the lights. Our financial data aggregation platform shows institutions a customer's whole financial life, including held-away deposits, outside investments, and competitor loans, so they can make the right offer to the right member at the right moment. We go live in weeks, not years, and we back it with a guarantee: if our 90-day pilot doesn't uncover at least $25 million in recoverable deposits and assets, your setup fee comes back. AggregateIQ exists so community institutions don't fade into "just a checking account," and so the leaders who champion them can walk into the boardroom with answers instead of dread.

## Design System

### Color Palette

#### Primary Colors

- **Gradient Base:** The brand gradient below is the core of AggregateIQ's visual identity. It moves from deep navy (the "dark room" of fragmented data) through teal (clarity) to emerald and gold (growth and recovered value). It should appear on hero sections, key CTAs, data highlights, and brand marks.

```css
background: linear-gradient(135deg, #0B1F3A 0%, #12355B 18%, #1E5F8C 34%, #1B8A9A 50%, #22B07D 66%, #7BCB6A 82%, #F2B544 100%);
```

- **Primary Colors (Extracted from gradient):**
  - `#0B1F3A`: **Midnight Navy** (Authority)
  - `#12355B`: **Deep Harbor** (Stability)
  - `#1E5F8C`: **Ledger Blue** (Trust)
  - `#1B8A9A`: **Insight Teal** (Clarity)
  - `#22B07D`: **Growth Emerald** (Prosperity)
  - `#7BCB6A`: **Fresh Mint** (Momentum)
  - `#F2B544`: **Recovery Gold** (Value)

#### Secondary Colors

- **Dark Blue (primary text):** `#0F1E33`
- **Medium Gray (secondary text):** `#5B6675`
- **Light Gray (backgrounds):** `#F3F5F8`
- **White:** `#FFFFFF`
- **Black:** `#0A0A0A`

#### Functional Colors

- **Success:** `#15803D`
- **Warning:** `#B45309`
- **Error:** `#B91C1C`
- **Info:** `#1D4ED8`

*All functional colors meet WCAG AA contrast (4.5:1 or higher) as text on White and Light Gray backgrounds.*

### Typography

#### Font Family

- **Primary Font: Inter.** Inter was designed for screens. Its tall x-height, open apertures, and tabular-figure support make dense financial data (balances, percentages, dashboard tables) easy to read at small sizes. Its neutral, modern character signals competence and precision without feeling cold, which suits executives who value clarity over flash.
- **Secondary Font: DM Serif Display.** Used sparingly for major headlines and hero statements. Its high-contrast serif letterforms suggest heritage, stability, and institutional credibility, which reassures a conservative buyer, while its refined proportions keep it contemporary. Pairing it with Inter says "established trust, modern capability."

#### Font Sizes

| Style | rem | px | Line Height |
|---|---|---|---|
| **Display** (Special) | 4.5rem | 72px | 1.1 |
| **H1** | 3rem | 48px | 1.2 |
| **H2** | 2.25rem | 36px | 1.25 |
| **H3** | 1.875rem | 30px | 1.3 |
| **H4** | 1.5rem | 24px | 1.35 |
| **H5** | 1.25rem | 20px | 1.4 |
| **H6** | 1.125rem | 18px | 1.45 |
| **Body Regular** | 1rem | 16px | 1.6 |
| **Body Small** | 0.875rem | 14px | 1.5 |
| **Body XSmall** | 0.75rem | 12px | 1.5 |
| **Caption** (Special) | 0.6875rem | 11px | 1.4 |

*Display, H1, and H2 use DM Serif Display. H3–H6, body, and caption text use Inter. Captions use +0.02em letter-spacing and uppercase for labels such as chart axes and metric tags.*

#### Font Weights

- **Light (300):** Large display numerals in dashboards
- **Regular (400):** Body copy and long-form content
- **Medium (500):** UI labels, navigation, table headers
- **Semibold (600):** Buttons, H4–H6, key metrics
- **Bold (700):** Emphasis, critical alerts, KPI values

### UI Components

#### 21st.dev Components

- **Navigation:** Sticky header with mega-menu (Solutions, Institutions, Pricing, Resources), breadcrumbs, and footer
- **Layout:** Hero sections, feature grids, bento layouts, split content/image sections, pricing tables
- **Forms:** Demo request form, pilot application form, newsletter signup, multi-step onboarding
- **Feedback:** Toasts, alerts, modals, progress indicators
- **Data Display:** Stat cards, comparison tables, logo clouds (peer institutions), case study cards
- **Disclosure:** FAQ accordions, tabs (by institution type: Bank / Credit Union / Wealth), tooltips for industry terms

#### MagicUI Components

1. **Number Ticker:** Animates headline figures such as "$47.3M in held-away deposits identified" and "$62M recovered."
2. **Animated Beam:** Shows data flowing from scattered external accounts (Schwab, Marcus, Chime) into a single unified member view.
3. **Marquee:** Scrolling trust bar of partner institutions, compliance badges (SOC 2, CFPB 1033 ready), and integrations.
4. **Magic Card / Border Beam:** Spotlight-hover cards for pricing tiers and the 90-day guarantee.
5. **Animated List:** Real-time feed simulating detected "held-away" opportunities for demo storytelling.
6. **Blur Fade:** Scroll-triggered reveals for testimonials and case study sections.

#### reactbits.dev Components

- **Navigation:** Animated dock and pill navigation for the product dashboard
- **Layout:** Scroll-stack sections for the "Before → During → After" customer journey story
- **Forms:** Animated input fields and stepper for the ROI calculator
- **Feedback:** Count-up counters and spotlight cards for results and success states
- **Data Display:** Animated text effects (Split Text, Shiny Text) for hero headlines, and tilted cards for case studies
- **Disclosure:** Animated accordions and fade-in content blocks for FAQs and compliance details

#### Custom Components

1. **Deposit Recovery ROI Calculator:** Inputs for asset size, member count, and average deposit runoff. Outputs projected held-away deposits, recoverable dollars, cost-of-funds savings, and payback period against the $4,500/month plan.
2. **Unified Member 360° View:** A demo widget showing one member's full financial picture: in-house accounts next to aggregated external accounts, with "opportunity" flags such as "$180K in Marcus savings at 4.1%."
3. **Held-Away Opportunity Dashboard Widgets:** Modular KPI tiles (held-away total, products per member, deposit flow in/out, top competitor destinations) with sparklines and drill-down.
4. **Deposit Flow Visualizer:** A Sankey-style chart that shows where ACH outflows go by competitor category, turning "watching money drain" into a map you can act on.

### Micro-Interactions

1. **Button Hover:** Primary CTAs shift the gradient position 20% and lift 2px, with a soft emerald glow shadow (200ms ease-out).
2. **Form Focus:** Inputs transition to a 2px Insight Teal (`#1B8A9A`) ring with a subtle label float (150ms).
3. **Loading States:** Skeleton shimmer in Light Gray for data tables. A branded gradient progress bar for data syncs, with copy like "Connecting accounts…"
4. **Success Actions:** A checkmark draws itself in Success green, plus a count-up on the affected metric (for example, "+$180,000 recovered").
5. **Navigation:** Active-page underline slides between menu items. Mobile menu slides in with a staggered fade of links (250ms).
6. **Scrolling:** Section content fades up 16px on entry. KPI numbers tick up once when scrolled into view.

### Responsive Design

- **Mobile-First Approach:** All layouts, components, and styles are written for the smallest viewport first and progressively enhanced for larger screens.
- **Breakpoints:**
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px
  - `2xl`: 1536px
- **Mobile Adaptations:**
  - Hamburger menu with full-screen overlay replaces the desktop mega-menu
  - Multi-column feature grids and pricing tables stack vertically
  - Dashboard tables become swipeable cards; charts simplify to key-metric summaries
  - Touch targets of at least 44×44px; sticky bottom CTA ("Start Your 90-Day Pilot")
  - Display and H1 sizes scale down (Display 3rem, H1 2.25rem) to avoid awkward wrapping

### Accessibility

- **Color Contrast (WCAG AA):** Minimum 4.5:1 for body text and 3:1 for large text and UI components. Body-size White text sits only on the Midnight Navy to Ledger Blue range of the gradient (6.8:1 or higher). Insight Teal allows White text at large sizes only (4.1:1), and Growth Emerald, Fresh Mint, and Recovery Gold take Dark Blue text.
- **Keyboard Navigation:** All interactive elements are reachable and operable by keyboard, in a logical tab order, with skip-to-content links.
- **Screen Reader Support (ARIA):** Semantic HTML landmarks, ARIA labels on icon-only buttons, `aria-live` regions for dynamic metrics, and text alternatives or data tables for every chart.
- **Visible Focus Indicators:** A 2px Insight Teal focus ring with 2px offset on every focusable element. Never removed.
- **Respect for Reduced Motion:** `prefers-reduced-motion` disables number tickers, beams, marquees, and scroll animations, replacing them with static final states.
- **Color Independence:** Status is never shown by color alone. Icons and text labels accompany success, warning, and error states.

### Dark/Light Mode

Both light and dark modes are fully supported, implemented through **DaisyUI themes** (`aggregateiq-light` and `aggregateiq-dark`) mapped to the design tokens. The site detects the user's system preference automatically via `prefers-color-scheme` on first visit, and a toggle in the header lets users override it. Their choice is saved in `localStorage`. In dark mode, backgrounds use Midnight Navy (`#0B1F3A`) and Deep Harbor (`#12355B`), primary text becomes `#F3F5F8`, and functional colors shift to lighter tints to keep AA contrast.

## Implementation Guidelines

### CSS Framework

- **Tailwind CSS:** Utility-first styling foundation, with the theme extended from the design tokens
- **DaisyUI:** Component classes and theming (light/dark)
- **Custom Utilities:** `[placeholder]` for brand-specific utilities such as `.bg-brand-gradient`, `.text-gradient`, `.glow-emerald`, and `.tabular-nums-financial`

### Animation Library

- **Framer Motion:** The primary library for complex animations: scroll-linked sections, page transitions, the Deposit Flow Visualizer, and orchestrated staggered reveals.
- **Tailwind Animations:** For simple effects: hover transitions, spinners, pulse, and fade utilities.

### Icon System

- **Heroicons:** The standard icon set (outline for UI, solid for emphasis), sized at 16/20/24px.
- **Custom SVGs:** Brand-specific icons such as account aggregation, held-away assets, deposit flow, and institution types, drawn to match Heroicons' 1.5px stroke style.

### Asset Management

- **SVG:** Icons, logos, illustrations, and diagrams
- **WebP:** Photography and raster images, with AVIF where supported and JPEG fallback
- **MP4/WebM:** Product demo videos and background loops (muted, compressed, with poster images)

### Code Structure

- **Component-Based Architecture:** Reusable, single-responsibility React components organized as `ui/` (primitives), `sections/` (page blocks), and `features/` (ROI calculator, dashboards).
- **Utility-First CSS:** Tailwind utilities in markup. Extract components rather than custom CSS, and keep all values token-driven.
- **Responsive Variants:** Mobile-first classes enhanced with `sm:`, `md:`, `lg:`, `xl:`, and `2xl:` prefixes. No hard-coded pixel breakpoints.

## Design Tokens

```json
{
  "colors": {
    "primary": {
      "midnightNavy": "#0B1F3A",
      "deepHarbor": "#12355B",
      "ledgerBlue": "#1E5F8C",
      "insightTeal": "#1B8A9A",
      "growthEmerald": "#22B07D",
      "freshMint": "#7BCB6A",
      "recoveryGold": "#F2B544"
    },
    "neutral": {
      "darkBlue": "#0F1E33",
      "mediumGray": "#5B6675",
      "lightGray": "#F3F5F8",
      "white": "#FFFFFF",
      "black": "#0A0A0A"
    },
    "functional": {
      "success": "#15803D",
      "warning": "#B45309",
      "error": "#B91C1C",
      "info": "#1D4ED8"
    }
  },
  "typography": {
    "fontFamily": {
      "primary": "Inter, sans-serif",
      "secondary": "DM Serif Display, serif"
    }
  },
  "spacing": {
    "xs": "0.25rem",
    "sm": "0.5rem",
    "md": "1rem",
    "lg": "1.5rem",
    "xl": "2rem",
    "2xl": "3rem",
    "3xl": "4rem"
  },
  "borderRadius": {
    "sm": "0.125rem",
    "md": "0.25rem",
    "lg": "0.5rem",
    "xl": "1rem",
    "full": "9999px"
  }
}
```
