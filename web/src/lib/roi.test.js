import { test } from 'node:test'
import assert from 'node:assert/strict'
import { calculateROI, DEFAULT_INPUTS, sanitizeInputs } from './roi.js'

test('default inputs produce the documented estimate', () => {
  const r = calculateROI(DEFAULT_INPUTS)
  assert.equal(r.heldAwayIdentified, 180_000_000)
  assert.equal(r.depositsRecaptured, 18_000_000)
  assert.equal(r.marginRevenue, 540_000)
  assert.equal(r.promoSavings, 100_000)
  assert.equal(r.annualValue, 640_000)
  assert.equal(r.firstYearCost, 69_000)
  assert.ok(Math.abs(r.paybackMonths - 1.29375) < 1e-9)
})

test('invalid and out-of-range inputs are clamped', () => {
  const s = sanitizeInputs({ members: 'abc', avgHeldAway: -5, spreadPct: 99, promoSpend: NaN })
  assert.deepEqual(s, { members: 1000, avgHeldAway: 0, spreadPct: 6, promoSpend: 0 })
})

test('zero value yields infinite payback, not a crash', () => {
  const r = calculateROI({ members: 1000, avgHeldAway: 0, spreadPct: 1, promoSpend: 0 })
  assert.equal(r.annualValue, 0)
  assert.equal(r.paybackMonths, Infinity)
})
