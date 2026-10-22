import { createContext, useContext } from 'react'

export const AuthContext = createContext({
  configured: false,
  session: null,
  user: null,
  loading: false,
  recovering: false,
  clearRecovering: () => {},
  signOut: async () => {},
})

export const useAuth = () => useContext(AuthContext)

// Where Supabase email links should send people back to.
export const authRedirect = (path) => `${window.location.origin}${path}`
