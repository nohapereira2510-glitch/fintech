import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getSupabase } from '../lib/supabase'
import { authErrorMessage, isEmailValid } from '../lib/authHelpers'
import { AuthLayout } from '../auth/AuthLayout'
import { TextField } from '../auth/fields'
import { authRedirect, useAuth } from '../auth/useAuth'
import { Alert } from '../components/shared/Alert'
import { Button } from '../components/shared/Button'

export default function ForgotPassword() {
  const { configured } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!isEmailValid(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitting(true)
    const { error: err } = await (await getSupabase()).auth.resetPasswordForEmail(email.trim(), { redirectTo: authRedirect('/reset-password') })
    setSubmitting(false)
    // Rate limits are worth surfacing; anything else stays generic so we never reveal which emails have accounts.
    if (err && /rate_limit/.test(err.code ?? '')) {
      setFormError(authErrorMessage(err))
      return
    }
    setSent(true)
  }

  if (sent) {
    return (
      <AuthLayout title="Check your email" subtitle={`If an account exists for ${email.trim()}, you’ll get a link to reset your password.`}>
        <Alert tone="info">The link expires after one hour. Check your spam folder if you don’t see it in a few minutes.</Alert>
        <Link to="/login" className="link link-primary mt-8 inline-block text-sm font-medium">
          Back to sign in
        </Link>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter the email you signed up with and we’ll send you a reset link."
      footer={
        <>
          Remembered it?{' '}
          <Link to="/login" className="link link-primary font-medium">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {formError && <Alert tone="error">{formError}</Alert>}
        <TextField label="Email" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} error={error} required />
        <Button type="submit" className="w-full" disabled={submitting || !configured}>
          {submitting ? (
            <>
              <span className="loading loading-spinner loading-sm" aria-hidden="true" /> Sending…
            </>
          ) : (
            'Send reset link'
          )}
        </Button>
      </form>
    </AuthLayout>
  )
}
