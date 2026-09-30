import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { finalCta } from '../content'
import { Button } from './shared/Button'
import { Reveal } from './shared/Reveal'
import { useDemoModal } from '../hooks/useDemoModal'

export function FinalCTA() {
  const { open } = useDemoModal()
  return (
    <section aria-labelledby="final-cta-title" className="relative isolate overflow-hidden bg-brand-deep py-24 md:py-[150px] text-white">
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/20 blur-3xl" />
      <Reveal className="mx-auto max-w-[800px] px-4 text-center">
        <h2 id="final-cta-title" className="font-serif text-4xl md:text-5xl leading-tight">
          {finalCta.headline}
        </h2>
        <p className="mt-6 text-lg md:text-xl text-white/85 leading-relaxed">{finalCta.body}</p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="accent" size="lg" trackId="final_start_pilot" onClick={() => open('final_pilot')}>
            Start Your 90-Day Pilot
          </Button>
          <Button variant="outlineInverse" size="lg" trackId="final_schedule_demo" onClick={() => open('final_demo')}>
            Schedule a Demo
          </Button>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/85">
          {finalCta.trust.map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <CheckCircleIcon className="h-5 w-5 text-mint" aria-hidden="true" /> {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
