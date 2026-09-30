import { useEffect, useRef } from 'react'
import { useDemoModal } from '../hooks/useDemoModal'
import { track } from '../lib/analytics'
import { Button } from './shared/Button'

const KEY = 'aiq-exit-shown'

// Desktop only: shows once per session when the cursor leaves through the top of the window.
export function ExitIntent({ suppressed }) {
  const ref = useRef(null)
  const { open } = useDemoModal()

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onLeave = (e) => {
      if (e.clientY > 0 || e.relatedTarget || suppressed) return
      try {
        if (sessionStorage.getItem(KEY)) return
        sessionStorage.setItem(KEY, '1')
      } catch {
        // Without storage, fall through and show it once for this page view.
      }
      document.removeEventListener('mouseout', onLeave)
      ref.current?.showModal()
      track('exit_intent_shown')
    }
    const timer = setTimeout(() => document.addEventListener('mouseout', onLeave), 8000)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [suppressed])

  return (
    <dialog ref={ref} className="modal" aria-labelledby="exit-title">
      <div className="modal-box max-w-md text-center p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-secondary">Before you go</p>
        <h2 id="exit-title" className="mt-3 font-serif text-3xl">Find out how much is leaving, risk-free</h2>
        <p className="mt-3 text-base-content/80">
          Book a 30-minute consultation and we’ll estimate the held-away deposits at your institution. If the 90-day pilot finds less than $25M, your setup fee comes back.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <Button
            trackId="exit_intent_book"
            onClick={() => {
              ref.current?.close()
              open('exit_intent')
            }}
          >
            Book My Free Consultation
          </Button>
          <form method="dialog">
            <button className="text-sm text-base-content/70 underline underline-offset-4">No thanks</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button tabIndex={-1} aria-hidden="true">close</button>
      </form>
    </dialog>
  )
}
