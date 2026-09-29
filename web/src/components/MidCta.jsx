import Reveal from './Reveal'
import { CTA_PRIMARY, CTA_SECONDARY } from '../content'

export default function MidCta() {
  return (
    <section className="px-4 sm:px-6" aria-label="Get started">
      <Reveal className="brand-gradient-deep mx-auto max-w-6xl rounded-box px-6 py-12 text-center text-white sm:px-12">
        <h2 className="font-serif text-3xl sm:text-4xl">Stop finding out after.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
          Get a free estimate of how much is leaking from your deposit base, and what early warning could save you.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="#contact" className="btn btn-lg border-0 bg-amber text-navy hover:bg-gold">{CTA_PRIMARY}</a>
          <a href="#pricing" className="btn btn-lg btn-outline border-white/40 text-white hover:border-white hover:bg-white/10">{CTA_SECONDARY}</a>
        </div>
      </Reveal>
    </section>
  )
}
