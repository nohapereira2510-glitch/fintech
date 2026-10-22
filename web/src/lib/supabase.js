const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const isSupabaseConfigured = Boolean(url && key)

let clientPromise

// supabase-js is loaded on demand so it stays out of the landing page's
// critical bundle. The publishable key is safe in the browser: row level
// security on every table decides what each signed-in user can read or change.
export function getSupabase() {
  if (!isSupabaseConfigured) return Promise.resolve(null)
  clientPromise ??= import('@supabase/supabase-js').then(({ createClient }) =>
    createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    }),
  )
  return clientPromise
}
