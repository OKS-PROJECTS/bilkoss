import { Chip } from 'oks-ui'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'

const STATUS_COLOR = {
  // greens
  completed: 'success', paid: 'success', active: 'success', published: 'success',
  approved: 'success', 'in stock': 'success', delivered: 'success', open: 'success',
  won: 'success', done: 'success', success: 'success', online: 'success',
  // ambers
  pending: 'warning', processing: 'warning', 'low stock': 'warning', draft: 'warning',
  'on hold': 'warning', review: 'warning', partial: 'warning', 'in progress': 'warning',
  // reds
  cancelled: 'danger', canceled: 'danger', failed: 'danger', 'out of stock': 'danger',
  rejected: 'danger', overdue: 'danger', lost: 'danger', blocked: 'danger', inactive: 'danger',
  refunded: 'danger', closed: 'danger', offline: 'danger',
  // blues / neutral
  new: 'primary', shipped: 'info', scheduled: 'info', contacted: 'info', qualified: 'primary',
}

export function StatusChip({ status, size = 'sm' }) {
  const key = String(status || '').toLowerCase()
  const color = STATUS_COLOR[key] || 'default'
  return (
    <Chip variant="soft" color={color} size={size} radius="sm">
      {status}
    </Chip>
  )
}

/** up/down delta pill */
export function TrendChip({ value, suffix = '%', size = 'sm', invert = false }) {
  const up = value >= 0
  const good = invert ? !up : up
  const Icon = up ? ArrowUpRight : ArrowDownRight
  return (
    <span
      className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[12px] font-semibold"
      style={{
        color: good ? 'var(--app-success)' : 'var(--app-danger)',
        background: good ? 'var(--app-success-soft)' : 'var(--app-danger-soft)',
      }}
    >
      <Icon size={size === 'sm' ? 13 : 14} />
      {Math.abs(value)}
      {suffix}
    </span>
  )
}
