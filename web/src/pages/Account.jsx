import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowRightStartOnRectangleIcon, KeyIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { getSupabase } from '../lib/supabase'
import { authErrorMessage, isPasswordValid } from '../lib/authHelpers'
import { useAuth } from '../auth/useAuth'
import { PasswordField, TextField } from '../auth/fields'
import { Alert } from '../components/shared/Alert'
import { Button } from '../components/shared/Button'
import { Navbar } from '../components/Navbar'

const FIELDS = [
  { key: 'full_name', label: 'Full name', autoComplete: 'name', maxLength: 120 },
  { key: 'institution', label: 'Institution', autoComplete: 'organization', maxLength: 160 },
  { key: 'job_title', label: 'Job title', autoComplete: 'organization-title', maxLength: 120 },
]

function Card({ icon: Icon, title, description, children }) {
  return (
    <section className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm md:p-8" aria-labelledby={`${title}-title`}>
      <div className="flex items-start gap-4">
        <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary sm:inline-flex">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={`${title}-title`} className="text-xl font-semibold">{title}</h2>
          {description && <p className="mt-1 text-sm text-base-content/75">{description}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  )
}

function ProfileForm({ user }) {
  const [profile, setProfile] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    let active = true
    getSupabase()
      .then((client) => client.from('profiles')
      .select('full_name, institution, job_title')
      .eq('id', user.id)
      .maybeSingle())
      .then(({ data, error }) => {
        if (!active) return
        if (error) setLoadError(authErrorMessage(error))
        else setProfile({ full_name: data?.full_name ?? '', institution: data?.institution ?? '', job_title: data?.job_title ?? '' })
      })
    return () => {
      active = false
    }
  }, [user.id])

  if (loadError) return <Alert tone="error">We couldn’t load your profile: {loadError}</Alert>
  if (!profile) return <span className="loading loading-dots text-secondary" aria-label="Loading profile" />

  const onSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)
    const updates = Object.fromEntries(FIELDS.map(({ key }) => [key, profile[key].trim() || null]))
    const { error } = await (await getSupabase()).from('profiles').update(updates).eq('id', user.id)
    setSaving(false)
    setMessage(error ? { tone: 'error', text: authErrorMessage(error) } : { tone: 'success', text: 'Profile saved.' })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <TextField label="Email" value={user.email} readOnly disabled hint="Your sign-in email. Contact support to change it." />
      {FIELDS.map((f) => (
        <TextField
          key={f.key}
          label={f.label}
          autoComplete={f.autoComplete}
          maxLength={f.maxLength}
          value={profile[f.key]}
          onChange={(e) => setProfile((p) => ({ ...p, [f.key]: e.target.value }))}
        />
      ))}
      {message && <Alert tone={message.tone}>{message.text}</Alert>}
      <Button type="submit" disabled={saving}>
        {saving ? 'Saving…' : 'Save profile'}
      </Button>
    </form>
  )
}

function PasswordForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState(null)
  const [saving, setSaving] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    if (!isPasswordValid(password)) {
      setError('Your password doesn’t meet the requirements below.')
      return
    }
    setError('')
    setSaving(true)
    const { error: err } = await (await getSupabase()).auth.updateUser({ password })
    setSaving(false)
    if (err) {
      setMessage({ tone: 'error', text: authErrorMessage(err) })
      return
    }
    setPassword('')
    setMessage({ tone: 'success', text: 'Password updated.' })
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <PasswordField label="New password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} error={error} showRules />
      {message && <Alert tone={message.tone}>{message.text}</Alert>}
      <Button type="submit" disabled={saving}>
        {saving ? 'Updating…' : 'Update password'}
      </Button>
    </form>
  )
}

export default function Account() {
  const { user, signOut } = useAuth()
  const location = useLocation()
  const flash = location.state?.flash
  const [signingOut, setSigningOut] = useState(null)

  useEffect(() => {
    document.title = 'Your account | AggregateIQ'
  }, [])

  const doSignOut = async (scope) => {
    setSigningOut(scope)
    await signOut(scope)
  }

  const memberSince = new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <>
      <Navbar solid />
      <main id="main" className="min-h-screen bg-base-200 pt-[100px] pb-20 lg:pt-[120px]">
        <div className="mx-auto max-w-3xl space-y-6 px-4 md:px-8">
          <header>
            <h1 className="font-serif text-4xl">Your account</h1>
            <p className="mt-2 text-base-content/75">
              Signed in as <strong className="text-base-content">{user.email}</strong> · Member since {memberSince}
            </p>
          </header>

          {flash && <Alert tone="success">{flash}</Alert>}

          <Card icon={UserCircleIcon} title="Profile" description="This helps us tailor your demo and reports.">
            <ProfileForm user={user} />
          </Card>

          <Card icon={KeyIcon} title="Password" description="Choose a strong password you don’t use anywhere else.">
            <PasswordForm />
          </Card>

          <Card icon={ArrowRightStartOnRectangleIcon} title="Sessions" description="Sign out here, or on every device where you’re signed in.">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="secondary" onClick={() => doSignOut('local')} disabled={!!signingOut}>
                {signingOut === 'local' ? 'Signing out…' : 'Sign out'}
              </Button>
              <Button variant="ghost" onClick={() => doSignOut('global')} disabled={!!signingOut}>
                {signingOut === 'global' ? 'Signing out everywhere…' : 'Sign out of all devices'}
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}
