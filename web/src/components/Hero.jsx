import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CheckCircleIcon, PlayCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/solid'
import { hero } from '../content'
import { Button } from './shared/Button'
import { CountUp } from './shared/CountUp'
import { useDemoModal } from '../hooks/useDemoModal'

const OPPORTUNITIES = [
  { member: 'Member #20417', where: 'High-yield savings · Marcus', amount: '$180,000', gap: '+0.4% rate gap' },
  { member: 'Member #88213', where: 'Brokerage cash · Schwab', amount: '$96,500', gap: 'Idle 90+ days' },
  { member: 'Member #51902', where: 'Auto loan · Capital One', amount: '$31,200', gap: 'Refi saves 2.1%' },
  { member: 'Member #10388', where: 'Savings · SoFi', amount: '$64,800', gap: 'Paycheck split 40%' },
  { member: 'Member #77645', where: 'CD · Ally', amount: '$120,000', gap: 'Matures in 21 days' },
]

function DashboardPreview() {
  const reduce = useReducedMotion()
  const [start, setStart] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setStart((s) => (s + 1) % OPPORTUNITIES.length), 3200)
    return () => clearInterval(id)
  }, [reduce])

  const visible = [0, 1, 2].map((i) => OPPORTUNITIES[(start + i) % OPPORTUNITIES.length])

  return (
    <div className="relative" role="img" aria-label="AggregateIQ dashboard preview: $47.3 million in held-away deposits identified, trending upward, with a live feed of member opportunities.">
      <div aria-hidden="true" className="rounded-2xl border border-white/15 bg-white/95 dark:bg-base-200 text-ink shadow-2xl shadow-black/30 p-5 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate dark:text-base-content/70">Held-away deposits identified</p>
            <p className="mt-1 text-3xl md:text-4xl font-light text-ink dark:text-base-content">
              <CountUp value={47.3} format={(v) => `$${v.toFixed(1)}M`} duration={1.6} />
            </p>
          </div>
          <span className="rounded-full bg-emerald/15 px-3 py-1 text-xs font-semibold text-[#15803D] dark:text-success">▲ 18% this month</span>
        </div>

        <svg viewBox="0 0 400 110" className="mt-4 w-full h-24">
          <defs>
            <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#22B07D" stopOpacity=".35" />
              <stop offset="1" stopColor="#22B07D" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 95 L50 88 L100 90 L150 72 L200 70 L250 52 L300 44 L350 26 L400 12 L400 110 L0 110Z" fill="url(#area)" />
          <motion.path
            d="M0 95 L50 88 L100 90 L150 72 L200 70 L250 52 L300 44 L350 26 L400 12"
            fill="none"
            stroke="#1B8A9A"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
          />
        </svg>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          {[
            ['Members linked', '14,862'],
            ['Products / member', '2.1'],
            ['Recovered YTD', '$18.2M'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-[#F3F5F8] dark:bg-base-300 p-2.5">
              <p className="text-base md:text-lg font-semibold tabular text-ink dark:text-base-content">{value}</p>
              <p className="text-[11px] text-slate dark:text-base-content/70">{label}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 mb-2 text-xs font-semibold uppercase tracking-wider text-slate dark:text-base-content/70">Live opportunities</p>
        <ul className="space-y-2 min-h-[168px]">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((o) => (
              <motion.li
                key={o.member}
                layout
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.35 }}
                className="flex items-center justify-between rounded-lg border border-[#E5E8EE] dark:border-base-300 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate text-ink dark:text-base-content">{o.where}</p>
                  <p className="text-xs text-slate dark:text-base-content/70">{o.member} · {o.gap}</p>
                </div>
                <span className="ml-3 text-sm font-semibold tabular text-[#1E5F8C] dark:text-secondary">{o.amount}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute -left-4 md:-left-10 top-[104px] hidden sm:flex items-center gap-2 rounded-xl bg-accent text-accent-content px-4 py-3 shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        <CheckCircleIcon className="h-5 w-5" />
        <span className="text-sm font-semibold">+$180,000 recovered</span>
      </motion.div>
    </div>
  )
}

export function Hero() {
  const { open } = useDemoModal()
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-brand-deep text-white min-h-[90vh] flex items-center pt-[92px] pb-16 lg:pt-[120px]">
      {/* Geometric grid pattern + brand glow */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px]" />
      <div aria-hidden="true" className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-emerald/25 blur-3xl" />
      <div aria-hidden="true" className="absolute -left-40 bottom-0 -z-10 h-[420px] w-[420px] rounded-full bg-teal/25 blur-3xl" />

      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium"
          >
            <ShieldCheckIcon className="h-4 w-4 text-gold" aria-hidden="true" />
            {hero.badge}
          </motion.p>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-6 font-serif text-4xl sm:text-5xl xl:text-[56px] leading-[1.1]"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Button variant="accent" trackId="hero_schedule_demo" onClick={() => open('hero')}>
              Schedule a Demo
            </Button>
            <Button as="a" href="#demo" variant="outlineInverse" trackId="hero_see_how">
              <PlayCircleIcon className="h-5 w-5" aria-hidden="true" />
              See How It Works
            </Button>
          </motion.div>
          <p className="mt-4 text-sm text-white/75">{hero.microcopy.join(' • ')}</p>

          <div className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">Trusted by forward-thinking institutions</p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {hero.logos.map((name) => (
                <li key={name} className="font-serif text-lg text-white/55 grayscale transition-colors hover:text-gold">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
          <DashboardPreview />
        </motion.div>
      </div>
    </section>
  )
}
