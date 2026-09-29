export default function Logo({ className = 'size-8' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="dr-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B1F3A" />
          <stop offset=".55" stopColor="#0E7C7B" />
          <stop offset="1" stopColor="#E0A526" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#dr-logo)" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="4.5" fill="none" stroke="#fff" strokeOpacity=".8" strokeWidth="1.5" />
      <path d="M16 16 L24 9" stroke="#F2C14E" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="1.6" fill="#fff" />
    </svg>
  )
}
