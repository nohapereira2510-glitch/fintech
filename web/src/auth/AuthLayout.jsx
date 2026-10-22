import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { Logo } from '../components/shared/Logo'
import { Alert } from '../components/shared/Alert'
import { useAuth } from './useAuth'

const POINTS = ['See held-away deposits in one view', 'Track recovery in your board-ready dashboard', 'Bank-grade security, member-permissioned data']

export function AuthLayout({ title, subtitle, children, footer }) {
  const { configured } = useAuth()

  useEffect(() => {
    document.title = `${title} | AggregateIQ`
    return () => {
      document.title = 'AggregateIQ | Financial Data Aggregation for Banks & CUs'
    }
  }, [title])

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-brand-deep p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div aria-hidden="true" className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald/25 blur-3xl" />
        <Link to="/" aria-label="AggregateIQ home" className="relative self-start rounded">
          <Logo inverse />
        </Link>
        <div className="relative">
          <p className="font-serif text-4xl leading-tight">Know where every deposit goes.</p>
          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-3 text-white/85">
                <CheckCircleIcon className="h-6 w-6 text-mint" aria-hidden="true" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-sm text-white/60">© {new Date().getFullYear()} AggregateIQ, Inc.</p>
      </aside>

      <main id="main" className="flex flex-col px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" aria-label="AggregateIQ home" className="rounded lg:hidden">
            <Logo />
          </Link>
          <Link to="/" className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-base-content/75 hover:text-base-content">
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" /> Back to site
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <h1 className="font-serif text-4xl">{title}</h1>
          {subtitle && <p className="mt-2 text-base-content/75">{subtitle}</p>}
          {!configured && (
            <Alert tone="error" className="mt-6">
              Sign-in isn’t configured for this deployment. Set <code>VITE_SUPABASE_URL</code> and{' '}
              <code>VITE_SUPABASE_PUBLISHABLE_KEY</code>, then rebuild.
            </Alert>
          )}
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-8 text-center text-sm text-base-content/80">{footer}</div>}
        </div>
      </main>
    </div>
  )
}
