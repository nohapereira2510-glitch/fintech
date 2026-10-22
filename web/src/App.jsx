import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { DemoModalContext } from './hooks/useDemoModal'
import { useTheme } from './hooks/useTheme'
import { ThemeContext } from './hooks/useThemeContext'
import { trackScrollDepth } from './lib/analytics'
import { AuthProvider } from './auth/AuthProvider'
import { RequireAuth } from './auth/RequireAuth'
import { DemoRequestModal } from './components/DemoRequestModal'
import { ExitIntent } from './components/ExitIntent'
import { FullPageSpinner } from './components/shared/FullPageSpinner'
import Home from './pages/Home'

const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/SignUp'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const Account = lazy(() => import('./pages/Account'))
const NotFound = lazy(() => import('./pages/NotFound'))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const theme = useTheme()
  const [request, setRequest] = useState(null)
  const [hasRequested, setHasRequested] = useState(false)

  const open = useCallback((source, extra) => {
    setHasRequested(true)
    setRequest({ source, extra })
  }, [])
  const modal = useMemo(() => ({ open }), [open])

  useEffect(() => trackScrollDepth(), [])

  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeContext.Provider value={theme}>
          <MotionConfig reducedMotion="user">
            <DemoModalContext.Provider value={modal}>
              <ScrollToTop />
              <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1100] focus:rounded-lg focus:bg-base-100 focus:px-4 focus:py-3 focus:shadow-lg">
                Skip to content
              </a>
              <Suspense fallback={<FullPageSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route
                    path="/account"
                    element={
                      <RequireAuth>
                        <Account />
                      </RequireAuth>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <DemoRequestModal request={request} onClose={() => setRequest(null)} />
              <ExitIntent suppressed={hasRequested} />
            </DemoModalContext.Provider>
          </MotionConfig>
        </ThemeContext.Provider>
      </AuthProvider>
    </BrowserRouter>
  )
}
