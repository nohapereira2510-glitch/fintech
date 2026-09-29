import Section from './Section'
import { faq } from '../content'

export default function Faq() {
  return (
    <Section id="faq" eyebrow="FAQ" title="Questions your committee will ask" className="bg-base-200">
      <div className="mx-auto max-w-3xl space-y-3">
        {faq.map((item, i) => (
          <details key={item.q} className="collapse collapse-plus rounded-box border border-base-300 bg-base-100" open={i === 0}>
            <summary className="collapse-title text-lg font-semibold">{item.q}</summary>
            <div className="collapse-content text-base-content/80">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  )
}
