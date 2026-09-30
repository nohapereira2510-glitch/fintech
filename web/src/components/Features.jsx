import { features } from '../content'
import { FeatureVisual } from './FeatureVisual'
import { Reveal } from './shared/Reveal'
import { SectionHeading } from './shared/SectionHeading'

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="section-pad bg-base-200">
      <div className="container-default">
        <SectionHeading
          id="features-title"
          eyebrow="Platform capabilities"
          title="Everything You Need to Recover Deposits and Grow Share of Wallet"
        />

        <div className="mt-16 space-y-[100px]">
          {features.map((f, i) => {
            const textFirst = i % 2 === 0
            return (
              <article key={f.name} className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
                <Reveal x={textFirst ? -24 : 24} className={textFirst ? 'md:order-1' : 'md:order-2'}>
                  <p className="text-sm font-semibold text-secondary tabular">0{i + 1}</p>
                  <h3 className="mt-2 text-2xl md:text-[28px] font-semibold leading-snug">{f.name}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-base-content/80">{f.description}</p>
                  <div className="mt-6 inline-flex items-baseline gap-3 rounded-xl bg-base-100 border border-base-300 px-5 py-3">
                    <span className="text-3xl font-bold tabular text-primary">{f.metric}</span>
                    <span className="text-sm text-base-content/75">{f.metricLabel}</span>
                  </div>
                </Reveal>
                <Reveal x={textFirst ? 24 : -24} delay={0.1} className={textFirst ? 'md:order-2' : 'md:order-1'}>
                  <FeatureVisual type={f.visual} label={`${f.name} product preview`} />
                </Reveal>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
