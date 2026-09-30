import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ASSUMPTIONS, DEFAULT_INPUTS, LIMITS, calculateROI } from '../lib/roi'
import { formatCurrency, formatNumber } from '../lib/format'
import { track } from '../lib/analytics'
import { SectionHeading } from './shared/SectionHeading'
import { Button } from './shared/Button'
import { Reveal } from './shared/Reveal'
import { useDemoModal } from '../hooks/useDemoModal'

const pct = (v) => `${Math.round(v * 100)}%`

function Field({ id, label, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="block font-medium">
        {label}
      </label>
      {hint && <p id={`${id}-hint`} className="text-sm text-base-content/70">{hint}</p>}
      <div className="mt-2">{children}</div>
    </div>
  )
}

function MoneyInput({ id, value, onChange, max }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute z-10 left-4 top-1/2 -translate-y-1/2 text-base-content/70">$</span>
      <input
        id={id}
        inputMode="numeric"
        aria-describedby={`${id}-hint`}
        className="input w-full h-12 pl-8 text-base tabular"
        value={value === '' ? '' : formatNumber(value)}
        onChange={(e) => {
          const digits = e.target.value.replace(/[^\d]/g, '')
          onChange(digits === '' ? '' : Math.min(Number(digits), max))
        }}
      />
    </div>
  )
}

export function ROICalculator() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS)
  const { open } = useDemoModal()
  const interacted = useRef(false)

  const result = useMemo(() => calculateROI(inputs), [inputs])

  const update = (key) => (value) => {
    if (!interacted.current) {
      interacted.current = true
      track('roi_calculator_interaction')
    }
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  const maxBar = Math.max(result.annualValue, result.firstYearCost, 1)
  const breakdown = [
    ['Margin on recaptured deposits', result.marginRevenue],
    ['Rate-special savings', result.promoSavings],
  ]

  return (
    <section id="roi" aria-labelledby="roi-title" className="section-pad">
      <div className="container-default">
        <SectionHeading
          id="roi-title"
          eyebrow="ROI calculator"
          title="See Your Potential Deposit Recovery"
          intro="Adjust the inputs to match your institution. The estimate updates as you type."
        />

        <Reveal className="mx-auto mt-12 max-w-[900px] rounded-2xl border border-base-300 bg-base-100 shadow-xl shadow-midnight/5 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <form className="space-y-7 p-6 md:p-8" onSubmit={(e) => e.preventDefault()} aria-label="ROI calculator inputs">
              <Field id="roi-members" label={`Members / customers: ${formatNumber(inputs.members)}`}>
                <input
                  id="roi-members"
                  type="range"
                  className="range range-primary range-sm w-full"
                  {...LIMITS.members}
                  value={inputs.members}
                  onChange={(e) => update('members')(Number(e.target.value))}
                  aria-valuetext={`${formatNumber(inputs.members)} members`}
                />
              </Field>

              <Field id="roi-heldaway" label="Average balance each member holds elsewhere" hint="Savings, CDs and brokerage cash at other institutions">
                <MoneyInput id="roi-heldaway" value={inputs.avgHeldAway} onChange={update('avgHeldAway')} max={LIMITS.avgHeldAway.max} />
              </Field>

              <Field id="roi-spread" label={`Net interest margin on deposits: ${inputs.spreadPct.toFixed(1)}%`}>
                <input
                  id="roi-spread"
                  type="range"
                  className="range range-primary range-sm w-full"
                  {...LIMITS.spreadPct}
                  value={inputs.spreadPct}
                  onChange={(e) => update('spreadPct')(Number(e.target.value))}
                  aria-valuetext={`${inputs.spreadPct.toFixed(1)} percent`}
                />
              </Field>

              <Field id="roi-promo" label="Annual spend on rate specials & CD promos" hint="Premium interest paid above your standard rate">
                <MoneyInput id="roi-promo" value={inputs.promoSpend} onChange={update('promoSpend')} max={LIMITS.promoSpend.max} />
              </Field>
            </form>

            <div className="bg-brand-deep p-6 md:p-8 text-white" aria-live="polite">
              <p className="text-sm font-medium text-white/80">Estimated annual value</p>
              <motion.p
                key={Math.round(result.annualValue / 1000)}
                initial={{ opacity: 0.4, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-1 text-5xl md:text-6xl font-bold tabular text-gold"
              >
                {formatCurrency(result.annualValue, { compact: result.annualValue >= 1e6 })}
              </motion.p>
              <p className="mt-2 text-sm text-white/80">
                {result.roiMultiple.toFixed(1)}× first-year ROI ·{' '}
                {Number.isFinite(result.paybackMonths) ? `${result.paybackMonths.toFixed(1)}-month payback` : 'no payback at these inputs'}
              </p>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-white/15 pb-3">
                  <dt className="text-white/80">Held-away balances identified</dt>
                  <dd className="font-semibold tabular">{formatCurrency(result.heldAwayIdentified, { compact: true })}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-white/15 pb-3">
                  <dt className="text-white/80">Deposits recaptured (year 1)</dt>
                  <dd className="font-semibold tabular">{formatCurrency(result.depositsRecaptured, { compact: true })}</dd>
                </div>
                {breakdown.map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-b border-white/15 pb-3">
                    <dt className="text-white/80">{label}</dt>
                    <dd className="font-semibold tabular">{formatCurrency(value)}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 space-y-2" aria-label="Value compared with first-year cost">
                {[
                  ['Annual value', result.annualValue, 'bg-emerald'],
                  ['First-year cost', result.firstYearCost, 'bg-white/60'],
                ].map(([label, value, tone]) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-white/80">
                      <span>{label}</span>
                      <span className="tabular">{formatCurrency(value, { compact: true })}</span>
                    </div>
                    <div className="mt-1 h-3 rounded-full bg-white/10">
                      <motion.div
                        className={`h-full rounded-full ${tone}`}
                        animate={{ width: `${Math.max(2, (value / maxBar) * 100)}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="accent"
                className="mt-8 w-full"
                trackId="roi_custom_report"
                onClick={() =>
                  open('roi', {
                    roi: { ...inputs, annualValue: Math.round(result.annualValue) },
                  })
                }
              >
                Get Your Custom ROI Report
              </Button>
            </div>
          </div>

          <details className="border-t border-base-300 px-6 md:px-8 py-4 text-sm text-base-content/75">
            <summary className="cursor-pointer font-medium text-base-content">How we calculate this</summary>
            <p className="mt-3 leading-relaxed">
              This is an illustrative estimate. We assume {pct(ASSUMPTIONS.optInRate)} of members link outside accounts, you recapture{' '}
              {pct(ASSUMPTIONS.recaptureRate)} of identified held-away balances in year one, and earn your net interest margin on them.
              Targeted offers cut blanket rate-special spend by {pct(ASSUMPTIONS.promoReduction)}. Cost is the Growth plan (
              {formatCurrency(ASSUMPTIONS.annualPlanCost)}/yr) plus the {formatCurrency(ASSUMPTIONS.setupFee)} setup fee. Your custom
              report uses your institution’s actual data.
            </p>
          </details>
        </Reveal>
      </div>
    </section>
  )
}
