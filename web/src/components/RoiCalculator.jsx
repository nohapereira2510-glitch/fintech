import { useMemo, useState } from 'react'
import Section from './Section'
import { roiDefaults, CTA_PRIMARY } from '../content'
import { annualCostFor, calculateRoi } from '../lib/roi'

const money = (n) => {
  if (!Number.isFinite(n)) return '—'
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `$${Math.round(n / 1e3)}K`
  return `$${Math.round(n)}`
}

function Slider({ id, label, value, min, max, step, onChange, format }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="font-medium">{label}</label>
        <output htmlFor={id} className="font-semibold tabular-nums text-primary">{format(value)}</output>
      </div>
      <input
        id={id}
        type="range"
        className="range range-primary range-sm w-full"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  )
}

export default function RoiCalculator() {
  const [inputs, setInputs] = useState(roiDefaults)
  const set = (key) => (v) => setInputs((s) => ({ ...s, [key]: v }))
  const annualCost = annualCostFor(inputs.deposits)
  const r = useMemo(() => calculateRoi(inputs, annualCost), [inputs, annualCost])

  return (
    <Section
      id="roi"
      eyebrow="ROI calculator"
      title="What is runoff costing you?"
      intro="Move the sliders to match your institution. See what catching even a slice of runoff early could be worth."
    >
      <div className="grid gap-8 rounded-box border border-base-300 p-6 shadow-sm sm:p-10 lg:grid-cols-5">
        <div className="space-y-8 lg:col-span-3">
          <Slider id="roi-deposits" label="Total deposits" value={inputs.deposits} min={100e6} max={20e9} step={100e6} onChange={set('deposits')} format={money} />
          <Slider id="roi-runoff" label="Annual deposit runoff" value={inputs.runoffPct} min={1} max={25} step={0.5} onChange={set('runoffPct')} format={(v) => `${v}%`} />
          <Slider id="roi-retained" label="Runoff retained with early warning" value={inputs.retainedPct} min={1} max={40} step={1} onChange={set('retainedPct')} format={(v) => `${v}%`} />
          <Slider id="roi-cost" label="Cost to replace lost funding" value={inputs.replacementCostPct} min={0.5} max={6} step={0.25} onChange={set('replacementCostPct')} format={(v) => `${v}%`} />
          <p className="text-sm text-base-content/60">
            Defaults are illustrative assumptions, not benchmarks. Your Deposit Leakage Snapshot uses your own numbers.
          </p>
        </div>

        <div className="brand-gradient-deep flex flex-col justify-between rounded-box p-6 text-white lg:col-span-2" aria-live="polite">
          <div>
            <p className="text-sm text-white/75">Estimated annual funding cost saved</p>
            <p className="mt-1 font-serif text-5xl tabular-nums">{money(r.savings)}</p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between gap-4"><dt className="text-white/75">Deposits running off / yr</dt><dd className="font-semibold tabular-nums">{money(r.runoff)}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-white/75">Deposits retained</dt><dd className="font-semibold tabular-nums">{money(r.retained)}</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-white/75">Deposit Radar annual cost</dt><dd className="font-semibold tabular-nums">{money(annualCost)}</dd></div>
              <div className="flex justify-between gap-4 border-t border-white/20 pt-3"><dt className="text-white/75">Return on cost</dt><dd className="font-semibold tabular-nums">{r.multiple.toFixed(1)}×</dd></div>
              <div className="flex justify-between gap-4"><dt className="text-white/75">Payback</dt><dd className="font-semibold tabular-nums">{Number.isFinite(r.paybackMonths) ? `${r.paybackMonths.toFixed(1)} months` : '—'}</dd></div>
            </dl>
          </div>
          <a href="#contact" className="btn mt-8 border-0 bg-amber text-navy hover:bg-gold">{CTA_PRIMARY}</a>
        </div>
      </div>
    </Section>
  )
}
