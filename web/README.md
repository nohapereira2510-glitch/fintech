# AggregateIQ Landing Page

B2B landing page for the AggregateIQ Growth Platform, built from the landing-page PRD and the brand system in [`../docs/brand-design-system.md`](../docs/brand-design-system.md).

**Stack:** React 19, Vite, Tailwind CSS v4, DaisyUI 5 (light/dark themes), Framer Motion, Heroicons.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
npm test         # ROI calculator unit tests
```

Copy `.env.example` to `.env` to configure:

| Variable | Purpose |
|---|---|
| `VITE_GA_ID` | GA4 measurement ID. Analytics events are no-ops without it. |
| `VITE_LEAD_ENDPOINT` | URL that receives demo requests and newsletter signups as JSON (CRM webhook). Without it, submissions are simulated. |

## Structure

```
src/
  content.js            all page copy, pricing, FAQ, testimonials (edit here)
  lib/roi.js            deposit-recovery ROI model (+ roi.test.js)
  lib/analytics.js      GA4 wrapper, CTA/scroll-depth events
  lib/leads.js          form validation + CRM submission
  hooks/                theme (light/dark + system detection), demo modal context
  components/           one file per PRD section, plus shared/ primitives
```

## PRD sections

1. Navbar: sticky, transparent over the hero, then solid; mobile slide-out drawer
2. Hero: 60/40 split, animated dashboard preview, dual CTA, logo bar
3. Problem: 3-column pain points with stats
4. Solution: narrative, before/after, UVP callout
5. Features: 6 alternating feature/benefit blocks with code-drawn product mockups
6. ROI calculator: live deposit-recovery estimate (lazy-loaded chunk)
7. Social proof: case study, testimonials, stats bar
8. Pricing: 3 tiers, monthly/annual toggle, collapsible comparison, FAQ
9. Integrations & security
10. Demo video: loads only on click; add `demo.src` / `demo.captions` in `content.js`
11. Final CTA
12. Footer: 5 columns (accordion on mobile), newsletter

Also included: demo-request modal with validation and consent, desktop exit-intent modal (once per session), dark mode, reduced-motion support, SEO meta/Open Graph/JSON-LD (Organization, Product, FAQPage), `robots.txt` and `sitemap.xml`.

## Before launch

Content marked **PLACEHOLDER** in `src/content.js` is illustrative and must be replaced with verified material:

- Customer names, logos, quotes, case-study results and aggregate stats
- Problem-section statistics (sources currently read "Illustrative…")
- Security certifications (list only those actually held) and integration partners (confirm partnerships and logo rights)
- Product claims such as "17,000+ institutions"
- The `aggregateiq.example` domain in `index.html`, `robots.txt` and `sitemap.xml`, plus an `og-image.png`
- Real product screenshots and the demo video, when available

The pricing FAQ is duplicated in the JSON-LD in `index.html`, so keep both in sync.
