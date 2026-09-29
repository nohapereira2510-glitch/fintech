import DashboardMock from './DashboardMock'
import Icon from './Icon'
import { hero, CTA_PRIMARY, CTA_SECONDARY } from '../content'

export default function Hero() {
  return (
    <section id="top" className="brand-gradient relative overflow-hidden px-4 pb-20 pt-16 text-white sm:px-6 lg:pb-28 lg:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(11,31,58,.55),transparent_60%)]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div className="animate-rise">
          <p className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-mint ring-1 ring-white/15">
            {hero.eyebrow}
          </p>
          <h1 className="font-serif text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            {hero.headline} <span className="brand-gradient-text">{hero.highlight}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85">{hero.sub}</p>
          <div className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row">
            <a href="#contact" className="btn btn-lg border-0 bg-amber text-navy hover:bg-gold">
              {CTA_PRIMARY}
              <Icon name="arrow" className="size-5" />
            </a>
            <a href="#pricing" className="btn btn-lg btn-outline border-white/40 text-white hover:border-white hover:bg-white/10">
              {CTA_SECONDARY}
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            {hero.trust.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Icon name="check" className="size-4 text-mint" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="animate-rise [animation-delay:150ms]">
          <DashboardMock />
        </div>
      </div>
    </section>
  )
}
