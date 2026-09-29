import { useState } from 'react'
import Icon from './Icon'
import Section from './Section'
import { contact, CTA_PRIMARY } from '../content'

const INSTITUTION_TYPES = ['Community bank', 'Regional bank', 'Credit union', 'Wealth management firm', 'Other']
const ASSET_SIZES = ['Under $500M', '$500M – $1B', '$1B – $10B', '$10B+']

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Please enter a valid work email.'
  if (!values.institution.trim()) errors.institution = 'Please enter your institution.'
  if (!values.type) errors.type = 'Please choose an institution type.'
  return errors
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1 text-sm text-error">{error}</p>}
    </div>
  )
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', institution: '', type: '', assets: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const update = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))
  const aria = (key) => ({ 'aria-invalid': !!errors[key], 'aria-describedby': errors[key] ? `c-${key}-error` : undefined })

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return
    // TODO: POST to CRM / form endpoint once chosen.
    setSent(true)
  }

  return (
    <Section id="contact">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Free snapshot</p>
          <h2 id="contact-heading" className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">{contact.title}</h2>
          <p className="mt-5 text-lg text-base-content/75">{contact.body}</p>
          <ul className="mt-8 space-y-3">
            <li className="flex items-center gap-3"><Icon name="mail" className="size-5 text-primary" />{contact.email}</li>
            <li className="flex items-center gap-3"><Icon name="phone" className="size-5 text-primary" />{contact.phone}</li>
          </ul>
        </div>

        <div className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
          {sent ? (
            <div role="status" className="py-12 text-center">
              <div className="mx-auto mb-4 inline-flex size-14 items-center justify-center rounded-full bg-success/15 text-success">
                <Icon name="check" className="size-7" />
              </div>
              <h3 className="text-2xl font-semibold">Thanks, {values.name.split(' ')[0]}.</h3>
              <p className="mt-2 text-base-content/75">We'll be in touch within one business day to set up your snapshot.</p>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="c-name" label="Full name" error={errors.name}>
                  <input id="c-name" className="input w-full" autoComplete="name" value={values.name} onChange={update('name')} {...aria('name')} />
                </Field>
                <Field id="c-email" label="Work email" error={errors.email}>
                  <input id="c-email" type="email" className="input w-full" autoComplete="email" value={values.email} onChange={update('email')} {...aria('email')} />
                </Field>
              </div>
              <Field id="c-institution" label="Institution" error={errors.institution}>
                <input id="c-institution" className="input w-full" autoComplete="organization" value={values.institution} onChange={update('institution')} {...aria('institution')} />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="c-type" label="Institution type" error={errors.type}>
                  <select id="c-type" className="select w-full" value={values.type} onChange={update('type')} {...aria('type')}>
                    <option value="">Choose one</option>
                    {INSTITUTION_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
                <Field id="c-assets" label="Total assets (optional)">
                  <select id="c-assets" className="select w-full" value={values.assets} onChange={update('assets')}>
                    <option value="">Choose one</option>
                    {ASSET_SIZES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </Field>
              </div>
              <Field id="c-message" label="What's keeping you up at night? (optional)">
                <textarea id="c-message" rows={3} className="textarea w-full" value={values.message} onChange={update('message')} />
              </Field>
              <button type="submit" className="btn btn-primary btn-block btn-lg">{CTA_PRIMARY}</button>
              <p className="text-center text-xs text-base-content/60">No sales pitch in the snapshot. We never share your information.</p>
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}
