import { lazy, Suspense } from 'react'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { Problem } from '../components/Problem'
import { Solution } from '../components/Solution'
import { Features } from '../components/Features'
import { SocialProof } from '../components/SocialProof'
import { Pricing } from '../components/Pricing'
import { IntegrationsSecurity } from '../components/IntegrationsSecurity'
import { DemoVideo } from '../components/DemoVideo'
import { FinalCTA } from '../components/FinalCTA'
import { Footer } from '../components/Footer'

// Heaviest interactive component: split into its own chunk.
const ROICalculator = lazy(() => import('../components/ROICalculator').then((m) => ({ default: m.ROICalculator })))

export default function Home() {
  return (
    <>
      <Navbar />
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
    </>
  )
}
