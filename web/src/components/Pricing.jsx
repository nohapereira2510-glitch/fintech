import Icon from './Icon'
import Reveal from './Reveal'
import Section from './Section'
import { pricing, PILOT_SLOTS_REMAINING } from '../content'

export default function Pricing() {
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title="Start with a pilot. Scale when it pays."
      intro="Prove it on your own customers in 90 days. If the numbers don't work, you walk away."
      className="bg-base-200"
    >
      {PILOT_SLOTS_REMAINING != null && (
        <p role="status" className="mx-auto mb-8 max-w-xl rounded-full bg-accent/15 px-4 py-2 text-center text-sm font-medium">
          We onboard a limited number of pilots each quarter. {PILOT_SLOTS_REMAINING} pilot slots remain this quarter.
        </p>
      )}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {pricing.map((tier, i) => (
          <Reveal
            key={tier.name}
            delay={i * 70}
            className={`relative flex flex-col rounded-box border bg-base-100 p-6 ${tier.featured ? 'border-primary shadow-xl ring-2 ring-primary' : 'border-base-300'}`}
          >
            {tier.featured && (
              <span className="badge badge-primary absolute -top-3 left-6">Most popular</span>
            )}
            <h3 className="text-lg font-semibold">{tier.name}</h3>
            <p className="mt-1 min-h-12 text-sm text-base-content/70">{tier.blurb}</p>
            <p className="mt-4">
              <span className="font-serif text-4xl">{tier.price}</span>
              <span className="mt-1 block text-sm text-base-content/60">{tier.cadence}</span>
            </p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm">
              {tier.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <Icon name="check" className="size-4 shrink-0 translate-y-0.5 text-success" />
                  {f}
                </li>
              ))}
            </ul>
            <a href="#contact" className={`btn mt-8 ${tier.featured ? 'btn-primary' : 'btn-outline btn-primary'}`}>{tier.cta}</a>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-base-content/60">Prices shown are illustrative and in USD. Final pricing depends on asset size and integrations.</p>
    </Section>
  )
}
