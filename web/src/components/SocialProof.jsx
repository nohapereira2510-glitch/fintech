import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { caseStudy, stats, testimonials } from '../content'
import { Reveal } from './shared/Reveal'
import { SectionHeading } from './shared/SectionHeading'

const initials = (name) => name.split(' ').filter((w) => /^[A-Za-z]/.test(w)).map((w) => w[0]).join('').slice(0, 2)

export function SocialProof() {
  return (
    <section id="customers" aria-labelledby="customers-title" className="section-pad bg-neutral text-neutral-content">
      <div className="container-default">
        <SectionHeading id="customers-title" eyebrow="Customer results" title="Institutions Like Yours Are Winning Deposits Back" inverse />

        <Reveal as="article" className="mt-14 rounded-2xl bg-white/5 border border-white/10 p-6 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-serif text-2xl md:text-3xl text-white">{caseStudy.company}</p>
            <p className="text-sm text-white/75">{caseStudy.context}</p>
          </div>
          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            {caseStudy.results.map((r) => (
              <div key={r.label} className="flex flex-col-reverse border-l-2 border-gold pl-4">
                <dt className="text-sm text-white/75">{r.label}</dt>
                <dd className="text-4xl md:text-5xl font-bold tabular text-gold">{r.value}</dd>
              </div>
            ))}
          </dl>
          <blockquote className="mt-10 max-w-3xl">
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-white">“{caseStudy.quote}”</p>
            <footer className="mt-4 text-white/80">
              <strong className="text-white">{caseStudy.person}</strong>, {caseStudy.title}, {caseStudy.company}
            </footer>
          </blockquote>
          <a href="#case-study" className="mt-8 inline-flex items-center gap-2 font-semibold text-gold hover:underline underline-offset-4">
            Read Full Case Study <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} as="figure" className="relative flex h-full flex-col rounded-xl bg-base-100 text-base-content p-8 shadow-lg">
              <span aria-hidden="true" className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-lg bg-base-200 text-xs font-bold text-secondary">
                {initials(t.company)}
              </span>
              <p className="inline-flex self-start rounded-full bg-success px-3 py-1 text-xs font-semibold text-success-content">{t.metric}</p>
              <blockquote className="mt-5 flex-1 text-lg leading-relaxed">“{t.quote}”</blockquote>
              <figcaption className="mt-6 text-sm">
                <strong>{t.name}</strong>
                <span className="block text-base-content/70">
                  {t.title}, {t.company}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-12 text-center md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-white/75">{s.label}</dt>
              <dd className="text-4xl font-bold tabular text-white">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
