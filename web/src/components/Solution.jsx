import Reveal from './Reveal'
import Section from './Section'
import { solution } from '../content'

export default function Solution() {
  return (
    <Section id="solution" eyebrow="How Deposit Radar works" title={solution.title} intro={solution.body}>
      <ol className="grid gap-6 md:grid-cols-3">
        {solution.steps.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 100} className="relative rounded-box border border-base-300 p-8">
            <span className="brand-gradient-text font-serif text-5xl">{s.n}</span>
            <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-base-content/75">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
