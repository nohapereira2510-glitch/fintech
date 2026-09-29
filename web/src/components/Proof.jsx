import Icon from './Icon'
import Section from './Section'
import { testimonials, trustBadges, SHOW_TESTIMONIALS } from '../content'

export default function Proof() {
  return (
    <Section id="trust" eyebrow="Built for regulated institutions" title="Made to pass your vendor review">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trustBadges.map((b) => (
          <li key={b} className="flex items-center gap-3 rounded-box border border-base-300 p-5">
            <Icon name="lock" className="size-6 shrink-0 text-primary" />
            <span className="font-medium">{b}</span>
          </li>
        ))}
      </ul>

      {SHOW_TESTIMONIALS && (
        <div className="mt-16">
          <h3 className="mb-8 text-center font-serif text-2xl sm:text-3xl">What our customers say</h3>
          <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {testimonials.map((t, i) => (
              <figure key={i} className="w-[85%] shrink-0 snap-center rounded-box border border-base-300 bg-base-200 p-6 md:w-auto">
                <blockquote className="text-lg">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm">
                  <span className="font-semibold">{t.name}</span>
                  <span className="block text-base-content/60">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </Section>
  )
}
