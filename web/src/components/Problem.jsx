import Icon from './Icon'
import Reveal from './Reveal'
import Section from './Section'
import { problem } from '../content'

export default function Problem() {
  return (
    <Section id="problem" eyebrow="The problem" title={problem.title} intro={problem.intro} className="bg-base-200">
      <div className="grid gap-6 sm:grid-cols-2">
        {problem.pains.map((p, i) => (
          <Reveal key={p.title} delay={i * 80} className="rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
            <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-error/10 text-error">
              <Icon name={p.icon} />
            </div>
            <h3 className="text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 text-base-content/75">{p.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
