import DashboardMock from './DashboardMock'
import Icon from './Icon'
import Reveal from './Reveal'
import Section from './Section'
import { showcase } from '../content'

export default function Showcase() {
  return (
    <Section id="product">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">See it in action</p>
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl">{showcase.title}</h2>
          <p className="mt-5 text-lg text-base-content/75">{showcase.body}</p>
          <ul className="mt-6 space-y-3">
            {showcase.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <Icon name="check" className="mt-0.5 size-5 shrink-0 text-success" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <DashboardMock />
        </Reveal>
      </div>
    </Section>
  )
}
