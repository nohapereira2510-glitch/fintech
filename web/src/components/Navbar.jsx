import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { nav } from '../content'
import { Logo } from './shared/Logo'
import { Button } from './shared/Button'
import { useDemoModal } from '../hooks/useDemoModal'

export function Navbar({ theme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { open: openDemo } = useDemoModal()
  const drawerRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    drawerRef.current?.querySelector('a, button')?.focus()
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      toggleRef.current?.focus()
    }
  }, [open])

  const solid = scrolled || open
  const linkColor = solid ? 'text-base-content/80 hover:text-base-content' : 'text-white/85 hover:text-white'

  const ThemeIcon = theme.mode === 'dark' ? SunIcon : MoonIcon

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] transition-colors duration-300 ${
        solid ? 'bg-base-100/95 backdrop-blur border-b border-base-300 shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-[60px] lg:h-[72px] max-w-[1440px] items-center justify-between px-4 md:px-8">
        <a href="#top" aria-label="AggregateIQ home" className="rounded">
          <Logo inverse={!solid} />
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {nav.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} className={`font-medium text-[15px] transition-colors ${linkColor}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 lg:gap-4">
          <button
            type="button"
            onClick={theme.toggle}
            aria-label={theme.mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors ${
              solid ? 'hover:bg-base-200' : 'text-white hover:bg-white/10'
            }`}
          >
            <ThemeIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <a href="#signin" className={`hidden lg:inline font-medium text-[15px] ${linkColor}`}>
            Sign In
          </a>
          <span className="hidden sm:block">
            <Button
              variant={solid ? 'primary' : 'accent'}
              className="!min-h-11 !px-5 text-[15px]"
              trackId="nav_request_demo"
              onClick={() => openDemo('nav')}
            >
              Request Demo
            </Button>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className={`lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg ${solid ? '' : 'text-white'}`}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 top-[60px] bg-midnight/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-drawer"
              ref={drawerRef}
              className="fixed right-0 top-[60px] bottom-0 w-full max-w-sm bg-base-100 border-l border-base-300 p-6 lg:hidden overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <ul className="flex flex-col">
                {nav.links.map((l, i) => (
                  <motion.li key={l.label} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}>
                    <a href={l.href} onClick={() => setOpen(false)} className="block py-4 text-lg font-medium border-b border-base-300">
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3">
                <Button
                  trackId="drawer_request_demo"
                  onClick={() => {
                    setOpen(false)
                    openDemo('drawer')
                  }}
                >
                  Request Demo
                </Button>
                <Button as="a" href="#signin" variant="secondary">
                  Sign In
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
