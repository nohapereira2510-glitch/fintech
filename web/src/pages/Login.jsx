import { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { getSupabase } from '../lib/supabase'
import { authErrorMessage, isEmailValid, readAuthUrlError, safeNextPath } from '../lib/authHelpers'
import { AuthLayout } from '../auth/AuthLayout'
import { PasswordField, TextField } from '../auth/fields'
import { ResendConfirmation } from '../auth/ResendConfirmation'
import { authRedirect, useAuth } from '../auth/useAuth'
import { Alert } from '../components/shared/Alert'
import { Button } from '../components/shared/Button'

export default function Login() {
  const [params] = useSearchParams()
  const next = safeNextPath(params.get('next'))
  const navigate = useNavigate()
  const { user, loading, configured } = useAuth()

  const [mode, setMode] = useState('password') // 'password' | 'link'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState(() => readAuthUrlError()?.message ?? '')
  const [unconfirmed, setUnconfirmed] = useState(false)
  const [linkSent, setLinkSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) return <Navigate to={next} replace />

  const onSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!isEmailValid(email)) nextErrors.email = 'Please enter a valid email address.'
    if (mode === 'password' && !password) nextErrors.password = 'Please enter your password.'
    setErrors(nextErrors)
    setFormError('')
    setUnconfirmed(false)
    if (Object.keys(nextErrors).length) return

    setSubmitting(true)
    if (mode === 'password') {
      const { error } = await (await getSupabase()).auth.signInWithPassword({ email: email.trim(), password })
      setSubmitting(false)
      if (error) {
        setFormError(authErrorMessage(error))
        setUnconfirmed(error.code === 'email_not_confirmed')
        return
      }
      navigate(next, { replace: true })
    } else {
      const { error } = await (await getSupabase()).auth.signInWithOtp({
        email: email.trim(),
        options: { shouldCreateUser: false, emailRedirectTo: authRedirect(next) },
      })
      setSubmitting(false)
      // Don't reveal whether the address has an account.
      if (error && error.code !== 'otp_disabled' && error.code !== 'user_not_found' && error.status !== 422) {
        setFormError(authErrorMessage(error))
        return
      }
      setLinkSent(true)
    }
  }

  if (linkSent) {
    return (
      <AuthLayout title="Check your email" subtitle={`If an account exists for ${email.trim()}, we’ve sent a sign-in link.`}>
        <Alert tone="info">The link signs you in on this device and expires after one hour. Check your spam folder if you don’t see it.</Alert>
        <button type="button" className="link link-primary mt-6 text-sm font-medium" onClick={() => setLinkSent(false)}>
          Use a different email
        </button>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your AggregateIQ account."
      footer={
        <>
          New to AggregateIQ?{' '}
          <Link to={`/signup${params.get('next') ? `?next=${encodeURIComponent(next)}` : ''}`} className="link link-primary font-medium">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {formError && (
          <Alert tone="error">
            <p>{formError}</p>
            {unconfirmed && (
              <div className="mt-2">
                <ResendConfirmation email={email.trim()} />
              </div>
            )}
          </Alert>
        )}

        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          required
        />

        {mode === 'password' && (
          <div>
            <PasswordField
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
            />
            <div className="mt-2 text-right">
              <Link to="/forgot-password" className="link link-primary text-sm font-medium">
                Forgot password?
              </Link>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={submitting || !configured}>
          {submitting ? (
            <>
              <span className="loading loading-spinner loading-sm" aria-hidden="true" /> {mode === 'password' ? 'Signing in…' : 'Sending link…'}
            </>
          ) : mode === 'password' ? (
            'Sign in'
          ) : (
            'Email me a sign-in link'
          )}
        </Button>

        <div className="relative py-1 text-center text-sm text-base-content/70">
          <span className="relative z-10 bg-base-100 px-3">or</span>
          <span aria-hidden="true" className="absolute inset-x-0 top-1/2 border-t border-base-300" />
        </div>

        <button
          type="button"
          className="btn btn-outline h-12 w-full text-base font-medium"
          onClick={() => {
            setMode((m) => (m === 'password' ? 'link' : 'password'))
            setErrors({})
            setFormError('')
          }}
        >
          {mode === 'password' ? 'Sign in with an email link instead' : 'Sign in with a password instead'}
        </button>
      </form>
    </AuthLayout>
  )
}
