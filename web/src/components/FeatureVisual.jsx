// Lightweight, code-drawn product mockups (600x450 ratio) so the page ships
// without screenshot assets. Swap for real screenshots when available.
const Frame = ({ title, children }) => (
  <div className="aspect-[4/3] w-full rounded-2xl border border-base-300 bg-base-100 p-5 md:p-7 shadow-xl shadow-midnight/10 flex flex-col">
    <div className="flex items-center gap-1.5 mb-4" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-error/60" />
      <span className="h-2.5 w-2.5 rounded-full bg-accent" />
      <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
      <span className="ml-3 text-xs font-medium text-base-content/70">{title}</span>
    </div>
    <div className="flex-1 min-h-0">{children}</div>
  </div>
)

const Bar = ({ label, value, pct, tone = 'bg-secondary' }) => (
  <div>
    <div className="flex justify-between text-xs md:text-sm">
      <span>{label}</span>
      <span className="font-semibold tabular">{value}</span>
    </div>
    <div className="mt-1.5 h-2.5 rounded-full bg-base-200">
      <div className={`h-full rounded-full ${tone}`} style={{ width: `${pct}%` }} />
    </div>
  </div>
)

const visuals = {
  heldaway: () => (
    <Frame title="Held-away deposits · by institution">
      <div className="space-y-4">
        <Bar label="Marcus by Goldman Sachs" value="$14.2M" pct={92} />
        <Bar label="Charles Schwab" value="$11.8M" pct={76} />
        <Bar label="Ally Bank" value="$8.9M" pct={58} />
        <Bar label="SoFi" value="$7.1M" pct={46} />
        <Bar label="Robinhood" value="$5.3M" pct={34} />
      </div>
    </Frame>
  ),
  member360: () => (
    <Frame title="Member 360° · #20417">
      <div className="grid grid-cols-2 gap-3 text-sm">
        {[
          ['Checking', 'Your CU', '$8,420', false],
          ['Savings', 'Marcus', '$180,000', true],
          ['Brokerage', 'Schwab', '$62,300', true],
          ['Auto loan', 'Your CU', '$14,900', false],
          ['Mortgage', 'Rocket', '$241,000', true],
          ['Credit card', 'Chase', '$3,120', true],
        ].map(([type, where, amt, external]) => (
          <div key={type} className={`rounded-lg border p-3 ${external ? 'border-accent bg-accent/10' : 'border-base-300'}`}>
            <p className="text-xs text-base-content/70">{type} · {where}</p>
            <p className="font-semibold tabular">{amt}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-base-content/70">Highlighted: held at other institutions</p>
    </Frame>
  ),
  flow: () => (
    <Frame title="Outgoing ACH · last 30 days">
      <svg viewBox="0 0 400 180" className="h-full w-full" aria-hidden="true">
        <rect x="0" y="40" width="18" height="100" rx="3" fill="#1E5F8C" />
        {[
          [20, '#1B8A9A', 'Brokerages 38%', 22],
          [70, '#22B07D', 'High-yield savings 29%', 16],
          [115, '#F2B544', 'Fintech wallets 21%', 12],
          [155, '#7BCB6A', 'Other 12%', 8],
        ].map(([y, color, label, w], i) => (
          <g key={label}>
            <path d={`M18 ${55 + i * 25} C 120 ${55 + i * 25}, 150 ${y + 8}, 230 ${y + 8}`} stroke={color} strokeWidth={w} fill="none" opacity=".75" />
            <rect x="230" y={y} width="10" height="16" rx="2" fill={color} />
            <text x="246" y={y + 12} fontSize="10" fill="currentColor">{label}</text>
          </g>
        ))}
      </svg>
    </Frame>
  ),
  offers: () => (
    <Frame title="Win-back campaign · CD maturity">
      <div className="space-y-3 text-sm">
        <div className="rounded-lg bg-base-200 p-3">
          <p className="text-xs text-base-content/70">Audience</p>
          <p className="font-semibold">1,284 members with CDs maturing elsewhere in 60 days</p>
        </div>
        <div className="rounded-lg bg-base-200 p-3">
          <p className="text-xs text-base-content/70">Offer</p>
          <p className="font-semibold">Match competitor rate + 0.10%, targeted only</p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          {[['Sent', '1,284'], ['Accepted', '31%'], ['Recaptured', '$22.6M']].map(([l, v]) => (
            <div key={l} className="rounded-lg border border-base-300 p-2">
              <p className="font-semibold tabular text-primary">{v}</p>
              <p className="text-xs text-base-content/70">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  ),
  verify: () => (
    <Frame title="Account verification">
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/15">
          <svg viewBox="0 0 24 24" className="h-9 w-9 text-success" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="mt-4 font-semibold">External account verified</p>
        <p className="text-sm text-base-content/70">Ally Bank ••••4821 · Balance $12,480 · 2.4s</p>
        <div className="mt-5 w-full max-w-xs rounded-lg bg-base-200 p-3 text-left text-sm">
          <p className="flex justify-between"><span>Ownership</span><span className="font-semibold text-success">Matched</span></p>
          <p className="flex justify-between"><span>NSF risk</span><span className="font-semibold text-success">Low</span></p>
        </div>
      </div>
    </Frame>
  ),
  board: () => (
    <Frame title="Board report · Q3">
      <div className="grid grid-cols-2 gap-3 text-sm">
        {[['Deposits recovered', '$62.0M'], ['Share of wallet', '41% → 53%'], ['Cost of funds', '−38 bps'], ['Pilot ROI', '9.3×']].map(([l, v]) => (
          <div key={l} className="rounded-lg border border-base-300 p-3">
            <p className="text-xs text-base-content/70">{l}</p>
            <p className="text-lg font-semibold tabular">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex h-20 items-end gap-2" aria-hidden="true">
        {[30, 38, 45, 52, 61, 70, 84, 100].map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-ledger to-emerald" style={{ height: `${h}%` }} />
        ))}
      </div>
    </Frame>
  ),
}

export function FeatureVisual({ type, label }) {
  const Visual = visuals[type]
  return (
    <div role="img" aria-label={label}>
      <div aria-hidden="true">
        <Visual />
      </div>
    </div>
  )
}
