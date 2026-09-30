import { ArrowRightIcon, LockClosedIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { integrations } from '../content'
import { Reveal } from './shared/Reveal'

export function IntegrationsSecurity() {
  return (
    <section id="security" aria-label="Integrations and security" className="bg-base-200 py-[60px] md:py-[100px]">
      <div className="container-default grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">Integrations</p>
          <h2 className="mt-3 font-serif text-[28px] md:text-4xl leading-tight">Connects With Your Existing Stack</h2>
          <p className="mt-4 text-lg text-base-content/75">
            Pre-built connectors for leading cores, digital banking platforms, CRMs and data warehouses. Most institutions go live in weeks.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {integrations.partners.map((p) => (
              <li
                key={p}
                className="flex h-[50px] items-center justify-center rounded-lg border border-base-300 bg-base-100 px-2 text-center text-sm font-semibold text-base-content/70 transition-colors hover:border-secondary hover:text-secondary"
              >
                {p}
              </li>
            ))}
          </ul>
          <a href="#integrations" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline underline-offset-4">
            View All Integrations <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">Security</p>
          <h2 className="mt-3 font-serif text-[28px] md:text-4xl leading-tight">Enterprise-Grade Security & Compliance</h2>
          <p className="mt-4 text-lg text-base-content/75">
            Built for examiners and vendor-management teams. Member data is permissioned, encrypted and fully auditable.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3">
            {integrations.badges.map((b) => (
              <li key={b} className="flex h-20 min-w-[112px] flex-col items-center justify-center gap-1 rounded-xl border-2 border-secondary/40 bg-base-100 px-4 text-center">
                <ShieldCheckIcon className="h-6 w-6 text-secondary" aria-hidden="true" />
                <span className="text-xs font-bold">{b}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {integrations.security.map((s) => (
              <li key={s} className="flex gap-3 text-sm">
                <LockClosedIcon className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <a href="#security-docs" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline underline-offset-4">
            View Security Documentation <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
