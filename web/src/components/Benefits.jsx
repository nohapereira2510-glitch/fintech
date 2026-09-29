import Icon from './Icon'
import Reveal from './Reveal'
import Section from './Section'
import { benefits } from '../content'

export default function Benefits() {
  return (
    <Section id="benefits" eyebrow="What you get" title="From flying blind to calling first" className="bg-base-200">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b, i) => (
          <Reveal
            key={b.title}
            delay={i * 70}
            className="group rounded-box border border-base-300 bg-base-100 p-6 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-content">
              <Icon name={b.icon} />
            </div>
            <h3 className="text-lg font-semibold">{b.title}</h3>
            <p className="mt-2 text-base-content/75">{b.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
