import { useEffect, useRef, useState } from 'react'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { submitLead, validateLead } from '../lib/leads'
import { track } from '../lib/analytics'
import { Button } from './shared/Button'

const EMPTY = { name: '', email: '', company: '', size: '', phone: '', message: '', consent: false }
const SIZES = ['Under $500M in assets', '$500M – $1B', '$1B – $5B', '$5B – $20B', 'Over $20B', 'Wealth / RIA firm']

function FieldError({ id, error }) {
  return error ? (
    <p id={id} className="mt-1 text-sm text-error">
      {error}
    </p>
  ) : null
}

export function DemoRequestModal({ request, onClose }) {
  const dialogRef = useRef(null)
  const [values, setValues] = useState(EMPTY)
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    const dialog = dialogRef.current
    if (request && !dialog.open) {
      setStatus('idle')
      setSubmitError('')
      dialog.showModal()
      track('demo_request_open', { source: request.source })
    } else if (!request && dialog.open) {
      dialog.close()
    }
  }, [request])

  const errors = validateLead(values)
  const showError = (key) => (touched[key] ? errors[key] : undefined)

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setValues((v) => ({ ...v, [key]: value }))
  }
  const blur = (key) => () => setTouched((t) => ({ ...t, [key]: true }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, company: true, phone: true, consent: true })
    if (Object.keys(errors).length) {
      document.getElementById(`lead-${Object.keys(errors)[0]}`)?.focus()
      return
    }
    setStatus('loading')
    setSubmitError('')
    try {
      await submitLead({ type: 'demo_request', ...values, source: request?.source, ...request?.extra })
      track('demo_request_submit', { source: request?.source })
      track('form_submit', { form: 'demo_request' })
      setStatus('done')
      setValues(EMPTY)
      setTouched({})
    } catch {
      setStatus('idle')
      setSubmitError('We couldn’t send your request. Please try again or email hello@aggregateiq.example.')
    }
  }

  const inputClass = (key) => `input w-full h-12 text-base ${showError(key) ? 'input-error' : ''}`
  const a11y = (key) => ({
    'aria-invalid': !!showError(key),
    'aria-describedby': showError(key) ? `${key}-error` : undefined,
  })

  const title = request?.extra?.roi ? 'Get Your Custom ROI Report' : 'Schedule Your Free Demo'

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose} aria-labelledby="demo-modal-title">
      <div className="modal-box max-w-xl p-6 md:p-8">
        <form method="dialog">
          <button className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-base-200" aria-label="Close">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </form>

        {status === 'done' ? (
          <div role="status" className="py-8 text-center">
            <CheckCircleIcon className="mx-auto h-14 w-14 text-success" aria-hidden="true" />
            <h2 id="demo-modal-title" className="mt-4 font-serif text-3xl">You’re all set</h2>
            <p className="mt-3 text-base-content/80">
              A deposit-growth specialist will reach out within one business day to schedule your session.
            </p>
            <Button className="mt-8" onClick={onClose}>
              Back to the page
            </Button>
          </div>
        ) : (
          <>
            <h2 id="demo-modal-title" className="pr-10 font-serif text-3xl">{title}</h2>
            <p className="mt-2 text-base-content/75">30 minutes, your data, no obligation. We’ll show you what’s leaving and how to win it back.</p>

            <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
              <div className="sm:col-span-2">
                <label htmlFor="lead-name" className="text-sm font-medium">Full name <span aria-hidden="true" className="text-error">*</span></label>
                <input id="lead-name" autoComplete="name" required className={inputClass('name')} value={values.name} onChange={set('name')} onBlur={blur('name')} {...a11y('name')} />
                <FieldError id="name-error" error={showError('name')} />
              </div>
              <div>
                <label htmlFor="lead-email" className="text-sm font-medium">Work email <span aria-hidden="true" className="text-error">*</span></label>
                <input id="lead-email" type="email" autoComplete="email" required className={inputClass('email')} value={values.email} onChange={set('email')} onBlur={blur('email')} {...a11y('email')} />
                <FieldError id="email-error" error={showError('email')} />
              </div>
              <div>
                <label htmlFor="lead-company" className="text-sm font-medium">Institution <span aria-hidden="true" className="text-error">*</span></label>
                <input id="lead-company" autoComplete="organization" required className={inputClass('company')} value={values.company} onChange={set('company')} onBlur={blur('company')} {...a11y('company')} />
                <FieldError id="company-error" error={showError('company')} />
              </div>
              <div>
                <label htmlFor="lead-size" className="text-sm font-medium">Asset size</label>
                <select id="lead-size" className="select w-full h-12 text-base" value={values.size} onChange={set('size')}>
                  <option value="">Select…</option>
                  {SIZES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="lead-phone" className="text-sm font-medium">Phone (optional)</label>
                <input id="lead-phone" type="tel" autoComplete="tel" className={inputClass('phone')} value={values.phone} onChange={set('phone')} onBlur={blur('phone')} {...a11y('phone')} />
                <FieldError id="phone-error" error={showError('phone')} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="lead-message" className="text-sm font-medium">What would you like to solve? (optional)</label>
                <textarea id="lead-message" rows={3} className="textarea w-full text-base" value={values.message} onChange={set('message')} />
              </div>
              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-sm">
                  <input id="lead-consent" type="checkbox" className="checkbox checkbox-primary mt-0.5" checked={values.consent} onChange={set('consent')} onBlur={blur('consent')} {...a11y('consent')} />
                  <span>
                    I agree to the <a href="#privacy-policy" className="link link-primary">Privacy Policy</a> and to be contacted about AggregateIQ.
                  </span>
                </label>
                <FieldError id="consent-error" error={showError('consent')} />
              </div>

              {submitError && (
                <p role="alert" className="sm:col-span-2 rounded-lg bg-error/10 p-3 text-sm text-error">
                  {submitError}
                </p>
              )}

              <Button type="submit" className="sm:col-span-2 w-full" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <>
                    <span className="loading loading-spinner loading-sm" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  'Schedule My Demo'
                )}
              </Button>
            </form>
          </>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button tabIndex={-1} aria-hidden="true">close</button>
      </form>
    </dialog>
  )
}
