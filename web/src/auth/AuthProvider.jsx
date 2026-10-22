import { useCallback, useEffect, useMemo, useState } from 'react'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'
import { track } from '../lib/analytics'
import { AuthContext } from './useAuth'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  // Set when the user arrives from a password-reset email.
  const [recovering, setRecovering] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) return
    let active = true
    let subscription
    getSupabase()
      .then((client) => {
        if (!active) return
        // Fires INITIAL_SESSION right away, then every sign-in, sign-out and refresh.
        subscription = client.auth.onAuthStateChange((event, next) => {
          setSession(next)
          setLoading(false)
          if (event === 'PASSWORD_RECOVERY') setRecovering(true)
          if (event === 'SIGNED_IN') track('login')
        }).data.subscription
      })
      .catch(() => setLoading(false))
    return () => {
      active = false
      subscription?.unsubscribe()
    }
  }, [])

  const signOut = useCallback(async (scope = 'local') => {
    const client = await getSupabase()
    if (!client) return
    await client.auth.signOut({ scope })
    setRecovering(false)
    track('logout', { scope })
  }, [])

  const value = useMemo(
    () => ({
      configured: isSupabaseConfigured,
      session,
      user: session?.user ?? null,
      loading,
      recovering,
      clearRecovering: () => setRecovering(false),
      signOut,
    }),
    [session, loading, recovering, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
