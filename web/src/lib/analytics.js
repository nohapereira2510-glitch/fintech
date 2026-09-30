// Thin GA4 wrapper. Events are no-ops until VITE_GA_ID is configured.
const GA_ID = import.meta.env.VITE_GA_ID

export function initAnalytics() {
  if (!GA_ID || typeof window === 'undefined' || window.gtag) return
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}

export function track(event, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  } else if (import.meta.env.DEV) {
    console.debug('[analytics]', event, params)
  }
}

export function trackScrollDepth() {
  const marks = [25, 50, 75, 100]
  const seen = new Set()
  const onScroll = () => {
    const doc = document.documentElement
    const scrollable = doc.scrollHeight - window.innerHeight
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 100
    for (const mark of marks) {
      if (pct >= mark && !seen.has(mark)) {
        seen.add(mark)
        track('scroll_depth', { percent: mark })
      }
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}
