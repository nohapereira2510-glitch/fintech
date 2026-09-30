// Deposit Recovery ROI model. Every assumption is exported so the calculator
// can show visitors exactly how the estimate is built.
export const ASSUMPTIONS = {
  optInRate: 0.25, // share of members who link outside accounts in year one
  recaptureRate: 0.1, // share of identified held-away balances won back in year one
  promoReduction: 0.4, // cut in rate-special spend once offers are targeted
  annualPlanCost: 54000, // Growth plan: $4,500/month
  setupFee: 15000,
}

export const DEFAULT_INPUTS = {
  members: 60000,
  avgHeldAway: 12000,
  spreadPct: 3,
  promoSpend: 250000,
}

export const LIMITS = {
  members: { min: 1000, max: 250000, step: 1000 },
  avgHeldAway: { min: 0, max: 1000000 },
  spreadPct: { min: 0.5, max: 6, step: 0.1 },
  promoSpend: { min: 0, max: 10000000 },
}

const clamp = (value, { min, max }) => {
  const n = Number(value)
  if (!Number.isFinite(n)) return min
  return Math.min(max, Math.max(min, n))
}

export function sanitizeInputs(inputs) {
  return Object.fromEntries(
    Object.keys(LIMITS).map((key) => [key, clamp(inputs[key], LIMITS[key])]),
  )
}

export function calculateROI(rawInputs, assumptions = ASSUMPTIONS) {
  const { members, avgHeldAway, spreadPct, promoSpend } = sanitizeInputs(rawInputs)
  const { optInRate, recaptureRate, promoReduction, annualPlanCost, setupFee } = assumptions

  const heldAwayIdentified = members * optInRate * avgHeldAway
  const depositsRecaptured = heldAwayIdentified * recaptureRate
  const marginRevenue = depositsRecaptured * (spreadPct / 100)
  const promoSavings = promoSpend * promoReduction
  const annualValue = marginRevenue + promoSavings

  const firstYearCost = annualPlanCost + setupFee
  const roiMultiple = firstYearCost > 0 ? annualValue / firstYearCost : 0
  const paybackMonths = annualValue > 0 ? (firstYearCost / annualValue) * 12 : Infinity

  return {
    heldAwayIdentified,
    depositsRecaptured,
    marginRevenue,
    promoSavings,
    annualValue,
    firstYearCost,
    roiMultiple,
    paybackMonths,
  }
}
