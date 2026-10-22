// Pure helpers for the auth screens (unit tested in authHelpers.test.js).

export const PASSWORD_MIN_LENGTH = 8

export function passwordChecks(password = '') {
  return [
    { id: 'length', label: `At least ${PASSWORD_MIN_LENGTH} characters`, ok: password.length >= PASSWORD_MIN_LENGTH },
    { id: 'letter', label: 'Contains a letter', ok: /[A-Za-z]/.test(password) },
    { id: 'number', label: 'Contains a number', ok: /\d/.test(password) },
  ]
}

export const isPasswordValid = (password) => passwordChecks(password).every((c) => c.ok)

export const isEmailValid = (email = '') => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

// Only allow same-site paths as post-login destinations (blocks open redirects).
export function safeNextPath(next, fallback = '/account') {
  if (typeof next !== 'string' || !next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) {
    return fallback
  }
  return next
}

const MESSAGES = {
  invalid_credentials: 'That email and password don’t match. Check them and try again.',
  email_not_confirmed: 'Please confirm your email address first. We can resend the confirmation link.',
  user_already_exists: 'An account with this email already exists. Try signing in instead.',
  email_exists: 'An account with this email already exists. Try signing in instead.',
  weak_password: 'That password is too weak. Use at least 8 characters with letters and numbers.',
  same_password: 'Your new password must be different from your current one.',
  over_email_send_rate_limit: 'Too many emails were sent recently. Please wait a few minutes and try again.',
  over_request_rate_limit: 'Too many attempts. Please wait a moment and try again.',
  email_address_invalid: 'That email address isn’t valid. Please check it and try again.',
  email_address_not_authorized: 'Email delivery isn’t set up for this address yet. Please contact support.',
  otp_expired: 'This link has expired or was already used. Please request a new one.',
  signup_disabled: 'New sign-ups are currently closed.',
  user_not_found: 'We couldn’t find an account with that email.',
  session_not_found: 'Your session has expired. Please sign in again.',
}

export function authErrorMessage(error) {
  if (!error) return ''
  if (error.code && MESSAGES[error.code]) return MESSAGES[error.code]
  if (/fetch|network/i.test(error.message ?? '')) {
    return 'We couldn’t reach the server. Check your connection and try again.'
  }
  return error.message || 'Something went wrong. Please try again.'
}

// Supabase reports failed email links in the query string or the URL hash.
export function readAuthUrlError(location = window.location) {
  const sources = [new URLSearchParams(location.search), new URLSearchParams(location.hash.replace(/^#/, ''))]
  for (const params of sources) {
    const code = params.get('error_code') || params.get('error')
    if (code) {
      return { code, message: MESSAGES[code] ?? params.get('error_description')?.replace(/\+/g, ' ') ?? 'That link didn’t work.' }
    }
  }
  return null
}
