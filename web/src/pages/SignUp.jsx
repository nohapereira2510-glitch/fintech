import { useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { getSupabase } from '../lib/supabase'
import { authErrorMessage, isEmailValid, isPasswordValid, safeNextPath } from '../lib/authHelpers'
import { track } from '../lib/analytics'
import { AuthLayout } from '../auth/AuthLayout'
import { PasswordField, TextField } from '../auth/fields'
import { ResendConfirmation } from '../auth/ResendConfirmation'
import { authRedirect, useAuth } from '../auth/useAuth'
import { Alert } from '../components/shared/Alert'
import { Button } from '../components/shared/Button'

export default function SignUp() {
  const [params] = useSearchParams()
  const next = safeNextPath(params.get('next'))
  const navigate = useNavigate()
  const { user, loading, configured } = useAuth()

  const [values, setValues] = useState({ fullName: '', institution: '', email: '', password: '', terms: false })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sentTo, setSentTo] = useState('')

  if (!loading && user && !sentTo) return <Navigate to={next} replace />

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = {}
    if (!values.fullName.trim()) nextErrors.fullName = 'Please enter your full name.'
    if (!isEmailValid(values.email)) nextErrors.email = 'Please enter a valid email address.'
    if (!isPasswordValid(values.password)) nextErrors.password = 'Your password doesn’t meet the requirements below.'
    if (!values.terms) nextErrors.terms = 'Please accept the Terms and Privacy Policy to continue.'
    setErrors(nextErrors)
    setFormError('')
    if (Object.keys(nextErrors).length) return

    setSubmitting(true)
    const email = values.email.trim()
    const { data, error } = await (await getSupabase()).auth.signUp({
      email,
      password: values.password,
      options: {
        emailRedirectTo: authRedirect(next),
        data: { full_name: values.fullName.trim(), institution: values.institution.trim() },
      },
    })
    setSubmitting(false)
    if (error) {
      setFormError(authErrorMessage(error))
      return
    }
    track('sign_up', { method: 'email' })
    // With email confirmation off, Supabase signs the user in straight away.
    if (data.session) {
      navigate(next, { replace: true })
      return
    }
    setSentTo(email)
  }

  if (sentTo) {
    return (
      <AuthLayout title="Confirm your email" subtitle={`We sent a confirmation link to ${sentTo}.`}>
        <Alert tone="info">
          Click the link in the email to activate your account. It can take a minute to arrive, so check your spam folder too.
        </Alert>
        <div className="mt-6">
          <ResendConfirmation email={sentTo} />
        </div>
        <p className="mt-8 text-sm">
          Already confirmed?{' '}
          <Link to="/login" className="link link-primary font-medium">
            Sign in
          </Link>
        </p>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start exploring AggregateIQ in under a minute."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="link link-primary font-medium">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {formError && <Alert tone="error">{formError}</Alert>}
        <TextField label="Full name" autoComplete="name" value={values.fullName} onChange={set('fullName')} error={errors.fullName} maxLength={120} required />
        <TextField label="Institution (optional)" autoComplete="organization" value={values.institution} onChange={set('institution')} maxLength={160} />
        <TextField label="Work email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={set('email')} error={errors.email} required />
        <PasswordField autoComplete="new-password" value={values.password} onChange={set('password')} error={errors.password} showRules required />
        <div>
          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="checkbox checkbox-primary mt-0.5"
              checked={values.terms}
              onChange={set('terms')}
              aria-invalid={!!errors.terms}
              aria-describedby={errors.terms ? 'terms-error' : undefined}
            />
            <span>
              I agree to the{' '}
              <a href="/#terms-of-service" className="link link-primary">Terms of Service</a> and{' '}
              <a href="/#privacy-policy" className="link link-primary">Privacy Policy</a>.
            </span>
          </label>
          {errors.terms && (
            <p id="terms-error" className="mt-1 text-sm text-error">
              {errors.terms}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={submitting || !configured}>
          {submitting ? (
            <>
              <span className="loading loading-spinner loading-sm" aria-hidden="true" /> Creating account…
            </>
          ) : (
            'Create account'
          )}
        </Button>
      </form>
    </AuthLayout>
  )
}
