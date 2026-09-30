export function Logo({ className = '', inverse = false }) {
  return (
    <span className={`inline-flex items-center gap-2 font-semibold text-lg tracking-tight ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0B1F3A" />
            <stop offset=".5" stopColor="#1B8A9A" />
            <stop offset="1" stopColor="#F2B544" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="url(#logo-g)" />
        <path d="M9 22 16 9l7 13M12 18h8" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={inverse ? 'text-white' : ''}>
        Aggregate<span className={inverse ? 'text-gold' : 'text-secondary'}>IQ</span>
      </span>
    </span>
  )
}
