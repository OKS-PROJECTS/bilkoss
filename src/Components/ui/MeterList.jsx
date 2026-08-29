import clsx from 'clsx'

/** Progress bar — div bar + surface-2 track. */
export function Meter({ value, max = 100, color = 'primary', className, height = 8 }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div
      className={clsx('w-full overflow-hidden rounded-full', className)}
      style={{ background: 'var(--app-surface-2)', height }}
    >
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, background: `var(--app-${color})` }}
      />
    </div>
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
              {it.sub ?? `${Math.round(((it.value) / (it.max ?? 100)) * 100)}%`}
            </span>
          </div>
          <Meter value={it.value} max={it.max ?? 100} color={it.color || 'primary'} />
        </li>
      ))}
    </ul>
  )
}
