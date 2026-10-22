import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

const tones = {
  error: ['border-error/40 bg-error/10', ExclamationTriangleIcon, 'text-error'],
  success: ['border-success/40 bg-success/10', CheckCircleIcon, 'text-success'],
  info: ['border-info/40 bg-info/10', InformationCircleIcon, 'text-info'],
}

export function Alert({ tone = 'info', children, className = '' }) {
  const [box, Icon, iconColor] = tones[tone]
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={`flex gap-3 rounded-lg border p-3 text-sm ${box} ${className}`}>
      <Icon className={`h-5 w-5 shrink-0 ${iconColor}`} aria-hidden="true" />
      <div className="min-w-0">{children}</div>
    </div>
  )
}
