import clsx from 'clsx'
import { Progress } from 'oks-ui'

/** Progress bar — thin pass-through to oks-ui <Progress>. */
export function Meter({ value, max = 100, color = 'primary', className, size = 'sm' }) {
  return (
    <Progress
      className={className}
      value={value}
      maxValue={max}
      color={color}
      size={size}
      aria-label="Progress"
    />
  )
}

/** items: [{ label, value, max?, sub?, color? }] */
export default function MeterList({ items, className }) {
  return (
    <ul className={clsx('space-y-4', className)}>
      {items.map((it) => (
        <li key={it.label}>
          <div className="mb-1.5 flex items-center justify-between gap-3 text-[13px]">
            <span className="truncate font-medium" style={{ color: 'var(--app-fg)' }}>
              {it.label}
            </span>
            <span className="shrink-0 font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
              {it.sub ?? `${Math.round((it.value / (it.max ?? 100)) * 100)}%`}
            </span>
          </div>
          <Meter value={it.value} max={it.max ?? 100} color={it.color || 'primary'} />
        </li>
      ))}
    </ul>
  )
}
