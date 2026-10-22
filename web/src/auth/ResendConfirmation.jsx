import { useEffect, useState } from 'react'
import { getSupabase } from '../lib/supabase'
import { authErrorMessage } from '../lib/authHelpers'
import { authRedirect } from './useAuth'

const COOLDOWN = 60

export function ResendConfirmation({ email }) {
  const [seconds, setSeconds] = useState(0)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (seconds <= 0) return
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [seconds])

  const resend = async () => {
    setError('')
    setStatus('sending')
    const { error: err } = await (await getSupabase()).auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: authRedirect('/account') },
    })
    if (err) {
      setError(authErrorMessage(err))
      setStatus('')
      return
    }
    setStatus('sent')
    setSeconds(COOLDOWN)
  }

  return (
    <div className="text-sm">
      <button
        type="button"
        onClick={resend}
        disabled={seconds > 0 || status === 'sending'}
        className="link link-primary font-medium disabled:cursor-not-allowed disabled:no-underline disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : seconds > 0 ? `Resend available in ${seconds}s` : 'Resend confirmation email'}
      </button>
      <p aria-live="polite" className="mt-1">
        {status === 'sent' && <span className="text-success">Sent! Check your inbox and spam folder.</span>}
        {error && <span className="text-error">{error}</span>}
      </p>
    </div>
  )
}
