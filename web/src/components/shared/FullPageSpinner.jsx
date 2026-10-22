export function FullPageSpinner({ label = 'Loading…' }) {
  return (
    <div role="status" className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-base-content/70">
      <span className="loading loading-spinner loading-lg text-secondary" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
