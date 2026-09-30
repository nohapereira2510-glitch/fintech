const ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT

const FREE_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com']

export function validateLead(values) {
  const errors = {}
  if (!values.name?.trim()) errors.name = 'Please enter your full name.'
  const email = values.email?.trim() ?? ''
  if (!email) {
    errors.email = 'Please enter your work email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'That email address doesn’t look right.'
  } else if (FREE_EMAIL_DOMAINS.includes(email.split('@')[1].toLowerCase())) {
    errors.email = 'Please use your work email so we can prepare for your institution.'
  }
  if (!values.company?.trim()) errors.company = 'Please enter your institution’s name.'
  if (values.phone && !/^[+\d][\d\s().-]{6,}$/.test(values.phone)) {
    errors.phone = 'Please enter a valid phone number, or leave it blank.'
  }
  if (!values.consent) errors.consent = 'Please agree to the privacy policy so we can contact you.'
  return errors
}

// Sends the lead to the configured CRM webhook, or simulates success locally.
export async function submitLead(payload) {
  if (!ENDPOINT) {
    await new Promise((resolve) => setTimeout(resolve, 900))
    if (import.meta.env.DEV) console.info('[lead] VITE_LEAD_ENDPOINT not set; simulated submit', payload)
    return { ok: true, simulated: true }
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
  })
  if (!res.ok) throw new Error(`Lead submission failed (${res.status})`)
  return { ok: true }
}
