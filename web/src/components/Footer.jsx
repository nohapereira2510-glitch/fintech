import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { footer } from '../content'
import { submitLead } from '../lib/leads'
import { track } from '../lib/analytics'
import { Logo } from './shared/Logo'

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-')

function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setStatus('loading')
    try {
      await submitLead({ type: 'newsletter', email })
      track('form_submit', { form: 'newsletter' })
      setStatus('done')
    } catch {
      setStatus('idle')
      setError('Something went wrong. Please try again.')
    }
  }

  if (status === 'done') {
    return <p role="status" className="text-sm text-mint">Thanks! You’re subscribed.</p>
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-sm">
      <label htmlFor="newsletter-email" className="text-sm font-medium text-white">
        Get deposit-growth insights and product updates
      </label>
      <div className="mt-2 flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="you@institution.org"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? 'newsletter-error' : undefined}
          className="h-12 min-w-0 flex-1 rounded-md border border-white/20 bg-white/10 px-4 text-white placeholder:text-white/50 focus:border-gold"
        />
        <button type="submit" disabled={status === 'loading'} className="h-12 rounded-md bg-accent px-4 font-semibold text-accent-content hover:brightness-95 disabled:opacity-70">
          {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      {error && (
        <p id="newsletter-error" className="mt-2 text-sm text-[#FCA5A5]">
          {error}
        </p>
      )}
    </form>
  )
}

function LinkColumn({ title, links }) {
  const [open, setOpen] = useState(false)
  const id = `footer-${slug(title)}`
  return (
    <div className="border-b border-white/10 md:border-0">
      <h3>
        <button
          type="button"
          className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-white md:pointer-events-none md:py-0"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
        >
          {title}
          <ChevronDownIcon className={`h-4 w-4 transition-transform md:hidden ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      </h3>
      <ul id={id} className={`${open ? 'block' : 'hidden'} space-y-3 pb-4 md:mt-4 md:block md:pb-0`}>
        {links.map((l) => (
          <li key={l}>
            <a href={`#${slug(l)}`} className="text-sm text-white/70 transition-colors hover:text-gold">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content pt-20 pb-10">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-5">
          <div className="md:col-span-3 lg:col-span-1 space-y-6">
            <Logo inverse />
            <p className="text-sm leading-relaxed text-white/70">{footer.tagline}</p>
            <ul className="flex gap-3" aria-label="Social media">
              {footer.social.map((s) => (
                <li key={s}>
                  <a
                    href={`#${slug(s)}`}
                    aria-label={`AggregateIQ on ${s}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-white/80 hover:border-gold hover:text-gold"
                  >
                    <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center">{s === 'LinkedIn' ? 'in' : s[0]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-3 lg:col-span-4 grid md:grid-cols-4 md:gap-8">
            {footer.columns.map((c) => (
              <LinkColumn key={c.title} {...c} />
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-10">
          <Newsletter />
        </div>

        <p className="mt-10 text-sm text-white/60">© {new Date().getFullYear()} AggregateIQ, Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}
