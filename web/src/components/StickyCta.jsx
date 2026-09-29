import { useEffect, useState } from 'react'
import { CTA_PRIMARY } from '../content'

// Mobile-only bottom bar that appears once the hero CTA scrolls away.
export default function StickyCta() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById('contact')
      const nearContact = contact && contact.getBoundingClientRect().top < window.innerHeight
      setShow(window.scrollY > 600 && !nearContact)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-base-300 bg-base-100/95 p-3 backdrop-blur transition-transform sm:hidden ${show ? 'translate-y-0' : 'translate-y-full'}`}
      aria-hidden={!show}
    >
      <a href="#contact" tabIndex={show ? 0 : -1} className="btn btn-primary btn-block">{CTA_PRIMARY}</a>
    </div>
  )
}
