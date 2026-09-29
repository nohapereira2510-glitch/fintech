import Logo from './Logo'
import { nav, contact } from '../content'

const social = [
  { label: 'LinkedIn', href: '#', d: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z' },
  { label: 'X', href: '#', d: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z' },
]

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-navy px-4 py-14 text-slate-300 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <a href="#top" className="flex items-center gap-2 font-semibold text-white"><Logo />Deposit Radar</a>
          <p className="mt-4 max-w-sm text-sm">Early-warning deposit intelligence for banks, credit unions and wealth management firms.</p>
          <ul className="mt-6 flex gap-4">
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} aria-label={`Deposit Radar on ${s.label}`} className="text-slate-400 transition-colors hover:text-white">
                  <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true"><path d={s.d} /></svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer">
          <h2 className="mb-3 text-sm font-semibold text-white">Product</h2>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => <li key={n.href}><a href={n.href} className="hover:text-white">{n.label}</a></li>)}
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-white">Contact</h2>
          <ul className="space-y-2 text-sm">
            <li>{contact.email}</li>
            <li>{contact.phone}</li>
            <li><a href="#" className="hover:text-white">Privacy policy [REPLACE]</a></li>
            <li><a href="#" className="hover:text-white">Security [REPLACE]</a></li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-xs text-slate-400">
        © {YEAR} Deposit Radar. Dashboard figures and names shown are sample data for illustration.
      </p>
    </footer>
  )
}
