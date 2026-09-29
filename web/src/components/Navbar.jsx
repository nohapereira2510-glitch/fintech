import { useEffect, useState } from 'react'
import Icon from './Icon'
import Logo from './Logo'
import { nav, CTA_PRIMARY } from '../content'

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'radar')
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  const toggle = () => {
    const next = theme === 'radar' ? 'radar-dark' : 'radar'
    setTheme(next)
    try { localStorage.setItem('dr-theme', next) } catch { /* storage unavailable */ }
  }
  return [theme, toggle]
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, toggleTheme] = useTheme()
  const dark = theme === 'radar-dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${scrolled ? 'border-b border-base-300 bg-base-100/90 backdrop-blur' : 'bg-base-100'}`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-semibold" aria-label="Deposit Radar home">
          <Logo />
          <span>Deposit Radar</span>
        </a>

        <ul className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-base-content/75 transition-colors hover:text-primary">{item.label}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-ghost btn-square btn-sm"
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Icon name={dark ? 'sun' : 'moon'} className="size-5" />
          </button>
          <a href="#contact" className="btn btn-primary btn-sm hidden sm:inline-flex">Get Free Snapshot</a>
          <button
            type="button"
            className="btn btn-ghost btn-square btn-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} className="size-5" />
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-base-300 bg-base-100 px-4 pb-6 lg:hidden">
          <ul className="flex flex-col py-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)} className="block py-3 text-base font-medium">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary btn-block">{CTA_PRIMARY}</a>
        </div>
      )}
    </header>
  )
}
