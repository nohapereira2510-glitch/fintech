import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckIcon, MinusIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { pricing } from '../content'
import { formatCurrency } from '../lib/format'
import { track } from '../lib/analytics'
import { Button } from './shared/Button'
import { Reveal } from './shared/Reveal'
import { SectionHeading } from './shared/SectionHeading'
import { useDemoModal } from '../hooks/useDemoModal'

function Price({ monthly, annual }) {
  if (monthly == null) {
    return <p className="font-serif text-4xl">Custom</p>
  }
  const value = annual ? monthly * (1 - pricing.annualDiscount) : monthly
  return (
    <div className="flex items-baseline gap-1">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="text-5xl font-bold tabular"
        >
          {formatCurrency(value)}
        </motion.span>
      </AnimatePresence>
      <span className="text-base-content/70">/mo</span>
    </div>
  )
}

export function Pricing() {
  const [annual, setAnnual] = useState(true)
  const { open } = useDemoModal()
  const [openFaq, setOpenFaq] = useState(null)

  const choose = (tier) => {
    track('pricing_tier_select', { tier: tier.name, billing: annual ? 'annual' : 'monthly' })
    open(`pricing_${tier.name.toLowerCase()}`, { plan: tier.name, billing: annual ? 'annual' : 'monthly' })
  }

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section-pad">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8">
        <SectionHeading
          id="pricing-title"
          eyebrow="Pricing"
          title="Transparent Pricing for Every Institution"
          intro="Every plan starts with a 90-day pilot. If it doesn’t find at least $25M in recoverable deposits and assets, your setup fee comes back."
        />

        <div className="mt-10 flex items-center justify-center gap-3">
          <span id="billing-monthly" className={annual ? 'text-base-content/70' : 'font-semibold'}>Monthly</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={annual}
            onChange={(e) => setAnnual(e.target.checked)}
            aria-label="Bill annually"
          />
          <span className={annual ? 'font-semibold' : 'text-base-content/70'}>Annual</span>
          <span className="rounded-full bg-success px-3 py-1 text-xs font-semibold text-success-content">Save {pricing.annualDiscount * 100}%</span>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-stretch">
          {pricing.tiers.map((tier, i) => (
            <Reveal
              key={tier.name}
              delay={i * 0.1}
              className={`relative flex min-h-[500px] flex-col rounded-2xl bg-base-100 p-6 lg:p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                tier.popular ? 'border-2 border-primary shadow-xl md:-translate-y-2' : 'border border-base-300 shadow-sm'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-content">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-semibold">{tier.name}</h3>
              <p className="mt-1 text-sm text-base-content/70">{tier.audience}</p>
              <div className="mt-6 min-h-[72px]">
                <Price monthly={tier.monthly} annual={annual} />
                {tier.monthly != null && annual && (
                  <p className="mt-1 text-sm text-success">
                    Billed annually · save {formatCurrency(tier.monthly * 12 * pricing.annualDiscount)}/yr
                  </p>
                )}
                {tier.monthly == null && <p className="mt-1 text-sm text-base-content/70">Volume pricing for larger teams</p>}
              </div>
              <p className="mt-4 text-sm font-medium">{tier.users}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className={`flex gap-3 ${f.endsWith(':') ? 'font-semibold' : ''}`}>
                    {!f.endsWith(':') && <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden="true" />}
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant={tier.popular ? 'primary' : 'secondary'} className="mt-8 w-full" onClick={() => choose(tier)}>
                {tier.cta}
              </Button>
            </Reveal>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-base-content/75">{pricing.setupNote}</p>
        <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
          {pricing.trust.map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <CheckIcon className="h-4 w-4 text-success" aria-hidden="true" /> {t}
            </li>
          ))}
        </ul>

        <details className="group mx-auto mt-14 max-w-5xl rounded-2xl border border-base-300">
          <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-lg">
            Compare all features
            <ChevronDownIcon className="h-5 w-5 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="overflow-x-auto px-2 pb-6 md:px-6">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-base-300">
                  <th scope="col" className="py-3 pr-4">Feature</th>
                  {pricing.tiers.map((t) => (
                    <th key={t.name} scope="col" className="py-3 text-center">{t.name}</th>
                  ))}
                </tr>
              </thead>
              {pricing.comparison.map((group) => (
                <tbody key={group.category}>
                  <tr>
                    <th scope="colgroup" colSpan={4} className="pt-6 pb-2 text-xs font-semibold uppercase tracking-wider text-secondary">
                      {group.category}
                    </th>
                  </tr>
                  {group.rows.map(([feature, ...avail]) => (
                    <tr key={feature} className="border-b border-base-200">
                      <th scope="row" className="py-3 pr-4 font-normal">{feature}</th>
                      {avail.map((ok, idx) => (
                        <td key={idx} className="py-3 text-center">
                          {ok ? (
                            <CheckIcon className="mx-auto h-5 w-5 text-success" aria-label="Included" />
                          ) : (
                            <MinusIcon className="mx-auto h-5 w-5 text-base-content/60" aria-label="Not included" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </details>

        <div className="mx-auto mt-14 max-w-3xl">
          <h3 className="text-center text-2xl font-semibold">Pricing questions</h3>
          <div className="mt-6 divide-y divide-base-300 border-y border-base-300">
            {pricing.faq.map((item, i) => {
              const isOpen = openFaq === i
              return (
                <div key={item.q}>
                  <h4>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 py-5 text-left font-medium"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                    >
                      {item.q}
                      <ChevronDownIcon className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                    </button>
                  </h4>
                  <div id={`faq-${i}`} hidden={!isOpen} className="pb-5 text-base-content/80 leading-relaxed">
                    {item.a}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
