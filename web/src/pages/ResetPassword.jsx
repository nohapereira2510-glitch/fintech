import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSupabase } from '../lib/supabase'
import { authErrorMessage, isPasswordValid, readAuthUrlError } from '../lib/authHelpers'
import { AuthLayout } from '../auth/AuthLayout'
import { PasswordField } from '../auth/fields'
import { useAuth } from '../auth/useAuth'
import { Alert } from '../components/shared/Alert'
import { Button } from '../components/shared/Button'
import { FullPageSpinner } from '../components/shared/FullPageSpinner'

export default function ResetPassword() {
  const navigate = useNavigate()
  const { user, loading, clearRecovering } = useAuth()
  const [urlError] = useState(() => readAuthUrlError())
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (loading) return <FullPageSpinner label="Verifying your reset link…" />

  if (urlError || !user) {
    return (
      <AuthLayout title="Link expired" subtitle="This password reset link is invalid or has already been used.">
        <Alert tone="error">{urlError?.message ?? 'Please request a new reset link.'}</Alert>
        <Link to="/forgot-password" className="btn btn-primary mt-6 h-12 w-full text-base">
          Request a new link
        </Link>
      </AuthLayout>
    )
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    if (!isPasswordValid(password)) {
      setError('Your password doesn’t meet the requirements below.')
      return
    }
    setError('')
    setSubmitting(true)
    const { error: err } = await (await getSupabase()).auth.updateUser({ password })
    setSubmitting(false)
    if (err) {
      setFormError(authErrorMessage(err))
      return
    }
    clearRecovering()
    navigate('/account', { replace: true, state: { flash: 'Your password has been updated.' } })
  }

  return (
    <AuthLayout title="Choose a new password" subtitle={`Resetting the password for ${user.email}.`}>
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {formError && <Alert tone="error">{formError}</Alert>}
        <PasswordField label="New password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} error={error} showRules required />
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? (
            <>
              <span className="loading loading-spinner loading-sm" aria-hidden="true" /> Saving…
            </>
          ) : (
            'Update password'
          )}
        </Button>
      </form>
    </AuthLayout>
  )
}
