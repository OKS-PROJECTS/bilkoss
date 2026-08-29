export const cx = (...a) => a.filter(Boolean).join(' ')

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Deterministic date `n` days before a fixed anchor (2026-08-29). */
export function daysAgo(n) {
  const d = new Date(2026, 7, 29)
  d.setDate(d.getDate() - n)
  return d
}

export function fmtDate(d) {
  const x = d instanceof Date ? d : new Date(d)
  return `${x.getDate()} ${MONTHS[x.getMonth()]} ${x.getFullYear()}`
}

export function fmtDateTime(d) {
  const x = d instanceof Date ? d : new Date(d)
  const h = x.getHours() % 12 || 12
  const m = String(x.getMinutes()).padStart(2, '0')
  const ap = x.getHours() < 12 ? 'AM' : 'PM'
  return `${fmtDate(x)}, ${h}:${m} ${ap}`
}

export function money(n, { compact = false, currency = '$' } = {}) {
  if (compact) {
    if (Math.abs(n) >= 1e6) return `${currency}${(n / 1e6).toFixed(2)}M`
    if (Math.abs(n) >= 1e3) return `${currency}${(n / 1e3).toFixed(2)}k`
  }
  return `${currency}${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function num(n, { compact = false } = {}) {
  if (compact && Math.abs(n) >= 1e3) {
    if (Math.abs(n) >= 1e6) return `${(n / 1e6).toFixed(1)}M`
    return `${(n / 1e3).toFixed(1)}k`
  }
  return n.toLocaleString('en-US')
}

export const pct = (n, digits = 1) => `${n > 0 ? '+' : ''}${n.toFixed(digits)}%`

/** deterministic pseudo-random in [0,1) from an integer seed */
export function rng(seed) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

export const pick = (arr, seed) => arr[Math.floor(rng(seed) * arr.length)]

/** stable avatar photo for a seed, with initials fallback handled by <Avatar> */
export function avatarUrl(seed) {
  const n = typeof seed === 'number' ? seed : [...String(seed)].reduce((a, c) => a + c.charCodeAt(0), 0)
  return `https://i.pravatar.cc/128?img=${(n % 70) + 1}`
}

export function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}
