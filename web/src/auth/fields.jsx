import { useId, useState } from 'react'
import { CheckIcon, EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { passwordChecks } from '../lib/authHelpers'

export function TextField({ label, error, hint, className = '', ...props }) {
  const id = useId()
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        className={`input mt-1 h-12 w-full text-base ${error ? 'input-error' : ''}`}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        {...props}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-base-content/70">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  )
}

export function PasswordField({ label = 'Password', error, showRules = false, value, ...props }) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  const rules = passwordChecks(value)
  const describedBy = [error && `${id}-error`, showRules && `${id}-rules`].filter(Boolean).join(' ') || undefined
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className={`input h-12 w-full pr-12 text-base ${error ? 'input-error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          value={value}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-1 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md text-base-content/70 hover:bg-base-200"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
        >
          {visible ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-error">
          {error}
        </p>
      )}
      {showRules && (
        <ul id={`${id}-rules`} className="mt-2 space-y-1 text-sm" aria-label="Password requirements">
          {rules.map((r) => (
            <li key={r.id} className={`flex items-center gap-2 ${r.ok ? 'text-success' : 'text-base-content/70'}`}>
              {r.ok ? <CheckIcon className="h-4 w-4" aria-hidden="true" /> : <XMarkIcon className="h-4 w-4" aria-hidden="true" />}
              {r.label}
              <span className="sr-only">{r.ok ? '(met)' : '(not met)'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
