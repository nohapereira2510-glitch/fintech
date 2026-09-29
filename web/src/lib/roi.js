// Illustrative model — finance should validate assumptions before launch.
// savings = deposits × annual runoff × share retained by early warning × replacement funding cost
export function calculateRoi({ deposits, runoffPct, retainedPct, replacementCostPct }, annualCost) {
  const runoff = deposits * (runoffPct / 100)
  const retained = runoff * (retainedPct / 100)
  const savings = retained * (replacementCostPct / 100)
  const multiple = annualCost > 0 ? savings / annualCost : 0
  const paybackMonths = savings > 0 ? (annualCost / savings) * 12 : Infinity
  return { runoff, retained, savings, multiple, paybackMonths }
}

export function annualCostFor(deposits) {
  if (deposits < 1e9) return 4500 * 12
  if (deposits < 1e10) return 6500 * 12
  return 150000 // Enterprise estimate [CONFIRM]
}
