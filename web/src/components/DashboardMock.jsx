import Icon from './Icon'

// Illustrative product UI. All names and figures are sample data.
const rows = [
  { name: 'Reynolds, T.', signal: 'Savings moving to online bank', amount: 184000, risk: 'High' },
  { name: 'Main St. Dental', signal: 'Operating balance split 60/40', amount: 412000, risk: 'High' },
  { name: 'Alvarez, M.', signal: 'New brokerage account funded', amount: 96000, risk: 'Medium' },
  { name: 'Chen, L.', signal: 'Payroll deposit split detected', amount: 58000, risk: 'Medium' },
]

const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default function DashboardMock({ compact = false }) {
  return (
    <figure
      className="overflow-hidden rounded-box border border-white/10 bg-[#0a1628] text-left text-slate-100 shadow-2xl shadow-navy/40"
      aria-label="Sample Deposit Radar dashboard showing held-away balances and an at-risk customer list"
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-2.5 rounded-full bg-error/80" />
        <span className="size-2.5 rounded-full bg-amber/80" />
        <span className="size-2.5 rounded-full bg-mint/80" />
        <span className="ml-3 text-xs text-slate-400">Deposit Radar · At-risk this week</span>
        <span className="ml-auto rounded bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">Sample data</span>
      </div>

      <div className="grid grid-cols-3 gap-px bg-white/10">
        {[
          ['Held-away balances', '$38.2M'],
          ['At-risk customers', '42'],
          ['Balance at risk', '$6.9M'],
        ].map(([label, value]) => (
          <div key={label} className="bg-[#0a1628] px-4 py-4">
            <p className="text-[11px] text-slate-400">{label}</p>
            <p className="mt-1 text-lg font-semibold text-white sm:text-xl">{value}</p>
          </div>
        ))}
      </div>

      <div className="relative px-4 py-4">
        {!compact && (
          <div className="pointer-events-none absolute -right-10 -top-10 size-40 opacity-30" aria-hidden="true">
            <div className="absolute inset-0 rounded-full border border-aqua/40" />
            <div className="absolute inset-6 rounded-full border border-aqua/40" />
            <div className="absolute inset-0 animate-sweep rounded-full" style={{ background: 'conic-gradient(from 0deg, transparent 0 300deg, rgba(60,193,192,.6) 360deg)' }} />
          </div>
        )}
        <ul className="relative space-y-2">
          {rows.slice(0, compact ? 3 : 4).map((r) => (
            <li key={r.name} className="flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5">
              <Icon name="radar" className="size-4 shrink-0 text-aqua" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{r.name}</p>
                <p className="truncate text-xs text-slate-400">{r.signal}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">{fmt(r.amount)}</p>
                <p className={`text-[11px] font-medium ${r.risk === 'High' ? 'text-amber' : 'text-mint'}`}>{r.risk} risk</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  )
}
