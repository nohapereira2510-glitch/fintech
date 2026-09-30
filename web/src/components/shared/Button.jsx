import { track } from '../../lib/analytics'

const variants = {
  primary:
    'bg-primary text-primary-content hover:brightness-90 shadow-sm hover:shadow-md',
  secondary:
    'border-2 border-primary text-primary hover:bg-primary/10',
  accent: 'bg-accent text-accent-content hover:brightness-95 shadow-sm hover:shadow-md',
  inverse:
    'bg-white text-midnight hover:bg-base-200 shadow-sm',
  outlineInverse:
    'border-2 border-white/80 text-white hover:bg-white/10',
  ghost: 'text-primary hover:underline underline-offset-4',
}

const sizes = {
  md: 'min-h-12 px-8 text-base',
  lg: 'min-h-[60px] px-10 text-lg',
}

export function Button({ as: Tag = 'button', variant = 'primary', size = 'md', trackId, className = '', onClick, children, ...props }) {
  const handleClick = (e) => {
    if (trackId) track('cta_click', { cta_id: trackId })
    onClick?.(e)
  }
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition duration-150 ease-brand active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={handleClick}
      {...(Tag === 'button' && !props.type ? { type: 'button' } : {})}
      {...props}
    >
      {children}
    </Tag>
  )
}
