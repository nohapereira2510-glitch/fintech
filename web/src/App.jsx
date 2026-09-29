import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import Benefits from './components/Benefits'
import Showcase from './components/Showcase'
import MidCta from './components/MidCta'
import RoiCalculator from './components/RoiCalculator'
import Pricing from './components/Pricing'
import Proof from './components/Proof'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StickyCta from './components/StickyCta'

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-base-100 focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Problem />
        <Solution />
        <Benefits />
        <Showcase />
        <MidCta />
        <RoiCalculator />
        <Pricing />
        <Proof />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
