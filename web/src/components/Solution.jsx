import { CheckIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { solution } from '../content'
import { Reveal } from './shared/Reveal'
import { SectionHeading } from './shared/SectionHeading'

export function Solution() {
  return (
    <section id="solution" aria-labelledby="solution-title" className="section-pad">
      <div className="container-default">
        <SectionHeading id="solution-title" eyebrow="The solution" title={solution.headline} />

        <div className="mx-auto mt-8 max-w-3xl space-y-5 text-lg leading-relaxed text-base-content/80">
          {solution.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 0.1} as="p">
              {p}
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-14 grid w-full lg:w-[60%] gap-4 md:grid-cols-2">
          <Reveal x={-24} className="rounded-xl border border-base-300 bg-base-200 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-base-content/70">{solution.before.title}</h3>
            <ul className="mt-4 space-y-3">
              {solution.before.items.map((t) => (
                <li key={t} className="flex gap-3">
                  <XMarkIcon className="mt-0.5 h-5 w-5 shrink-0 text-error" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal x={24} className="rounded-xl bg-brand-deep p-6 text-white shadow-lg">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">{solution.after.title}</h3>
            <ul className="mt-4 space-y-3">
              {solution.after.items.map((t) => (
                <li key={t} className="flex gap-3">
                  <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-mint" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-10 flex max-w-3xl gap-4 rounded-xl border-l-4 border-accent bg-accent/10 p-6">
          <SparklesIcon className="h-6 w-6 shrink-0 text-warning" aria-hidden="true" />
          <p className="text-lg font-medium">{solution.uvp}</p>
        </Reveal>
      </div>
    </section>
  )
}
