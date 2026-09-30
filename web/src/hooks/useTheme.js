import { useCallback, useEffect, useState } from 'react'

const KEY = 'aiq-theme'
const THEMES = { light: 'aggregateiq-light', dark: 'aggregateiq-dark' }

const readSaved = () => {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

export function useTheme() {
  const [mode, setMode] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return readSaved() ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', THEMES[mode])
  }, [mode])

  // Follow system changes until the user picks a mode explicitly.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e) => {
      if (!readSaved()) setMode(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setMode((m) => {
      const next = m === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(KEY, next)
      } catch {
        // Storage unavailable: the choice lasts for this page view only.
      }
      return next
    })
  }, [])

  return { mode, toggle }
}
