import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { DemoModalContext } from './hooks/useDemoModal'
import { useTheme } from './hooks/useTheme'
import { trackScrollDepth } from './lib/analytics'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Problem } from './components/Problem'
import { Solution } from './components/Solution'
import { Features } from './components/Features'
import { SocialProof } from './components/SocialProof'
import { Pricing } from './components/Pricing'
import { IntegrationsSecurity } from './components/IntegrationsSecurity'
import { DemoVideo } from './components/DemoVideo'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'
import { DemoRequestModal } from './components/DemoRequestModal'
import { ExitIntent } from './components/ExitIntent'

// Heaviest interactive component: split into its own chunk.
const ROICalculator = lazy(() => import('./components/ROICalculator').then((m) => ({ default: m.ROICalculator })))

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
    <MotionConfig reducedMotion="user">
      <DemoModalContext.Provider value={modal}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1100] focus:rounded-lg focus:bg-base-100 focus:px-4 focus:py-3 focus:shadow-lg">
          Skip to content
        </a>
        <Navbar theme={theme} />
        <main id="main">
          <Hero />
          <Problem />
          <Solution />
          <Features />
          <Suspense fallback={<div className="section-pad" aria-busy="true" />}>
            <ROICalculator />
          </Suspense>
          <SocialProof />
          <Pricing />
          <IntegrationsSecurity />
          <DemoVideo />
          <FinalCTA />
        </main>
        <Footer />
        <DemoRequestModal request={request} onClose={() => setRequest(null)} />
        <ExitIntent suppressed={hasRequested} />
      </DemoModalContext.Provider>
    </MotionConfig>
  )
}
