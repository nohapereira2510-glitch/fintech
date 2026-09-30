import { problem } from '../content'
import { Reveal } from './shared/Reveal'
import { SectionHeading } from './shared/SectionHeading'

const icons = {
  drain: (
    <path d="M12 3v10m0 0-4-4m4 4 4-4M4 15v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-3" />
  ),
  fragment: (
    <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM17 14v6M14 17h6" />
  ),
  blind: (
    <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.1A9.8 9.8 0 0 1 12 5c5 0 9 5 9 7a8.6 8.6 0 0 1-2.2 3.1M6.6 6.6C4.4 8 3 10.4 3 12c0 2 4 7 9 7a9.3 9.3 0 0 0 4.4-1.1" />
  ),
}

export function Problem() {
  return (
    <section id="problem" aria-labelledby="problem-title" className="bg-base-200 section-pad">
      <div className="container-default">
        <SectionHeading id="problem-title" eyebrow="The problem" title={problem.headline} intro={problem.intro} />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {problem.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1} className="rounded-xl border border-base-300 bg-base-100 p-8 shadow-sm">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {icons[item.icon]}
                </svg>
              </span>
              <h3 className="mt-6 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-base-content/75">{item.body}</p>
              <div className="mt-6 border-t border-base-300 pt-6">
                <p className="text-5xl font-bold tabular text-primary">{item.stat}</p>
                <p className="mt-2 text-base text-base-content/80">{item.statLabel}</p>
                <p className="mt-2 text-xs italic text-base-content/70">Source: {item.source}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
