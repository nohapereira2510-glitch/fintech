# Deposit Radar — Homepage

React landing page for **Deposit Radar**, a financial data aggregation offer (Yodlee-style) for banks, credit unions and wealth management firms. It's built from the ISM 6427 project work: the Problem Aware avatar ("Mark Delaney"), his before/during/after journal, the brand & design system, and the homepage PRD.

## Run it

```bash
cd web
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in web/dist
npm run lint
```

Stack: Vite + React 19, Tailwind CSS v4, DaisyUI 5 (custom `radar` / `radar-dark` themes), Inter + DM Serif Display.

## Page sections (in order)

| Section | File | Notes |
|---|---|---|
| Sticky nav + dark-mode toggle | `Navbar.jsx` | Remembers theme choice; follows system preference by default |
| Hero | `Hero.jsx` | Headline speaks to Mark's "I always find out after" pain |
| Problem | `Problem.jsx` | The four pains from the avatar/journal |
| Solution | `Solution.jsx` | Connect → See → Act |
| Benefits | `Benefits.jsx` | 5 benefit cards |
| Product showcase | `Showcase.jsx`, `DashboardMock.jsx` | Sample dashboard UI (labeled "Sample data") |
| Mid-page CTA | `MidCta.jsx` | |
| ROI calculator | `RoiCalculator.jsx`, `lib/roi.js` | savings = deposits × runoff % × retained % × replacement cost % |
| Pricing | `Pricing.jsx` | Pilot $15K, Community $4.5K/mo, Regional $6.5K/mo, Enterprise custom |
| Trust / testimonials | `Proof.jsx` | Testimonials hidden until real quotes exist |
| FAQ | `Faq.jsx` | Committee/compliance objections |
| Contact form | `Contact.jsx` | Client-side validation; not yet wired to a backend |
| Footer + mobile sticky CTA | `Footer.jsx`, `StickyCta.jsx` | |

All copy lives in `web/src/content.js`, so you can edit it without touching layout.

## Switches in `content.js`

- `SHOW_TESTIMONIALS`: keep `false` until you have approved, real customer quotes.
- `PILOT_SLOTS_REMAINING`: set a real number to show the pilot-capacity banner. `null` hides it. Only use honest urgency.

## Before launch

- [ ] Replace every `[CONFIRM]` / `[REPLACE]` in `content.js` and `Footer.jsx` (certifications, go-live timeline, integrations, contact info, legal links)
- [ ] Have finance validate the pricing and the ROI defaults (8% runoff, 10% retained, 2.5% replacement cost)
- [ ] Connect the contact form to a CRM or form endpoint (`Contact.jsx` `onSubmit`)
- [ ] Add real testimonials, then set `SHOW_TESTIMONIALS = true`
- [ ] Have compliance review the open-banking FAQ wording

Dashboard names and figures, and the journal stories behind the copy, are fictional. Don't present them as real results.
