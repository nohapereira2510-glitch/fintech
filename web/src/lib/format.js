export function formatCurrency(value, { compact = false } = {}) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: compact ? 1 : 0,
  }).format(value)
}

export const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value)
