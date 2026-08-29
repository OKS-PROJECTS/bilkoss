import clsx from 'clsx'

/**
 * Donut + custom centre value + optional side legend.
 *
 * NOTE: oks-ui `<Chart type="donut">` renders at a broken internal size in this
 * environment (its stage ResizeObserver never reports a width, so it falls back
 * to a 720px viewBox and the arc is drawn tiny). Composed here from an SVG ring
 * instead — segments coloured from the same `--app-*` / role tokens. Logged in
 * OKS-UI-FEEDBACK.md.
 */
export default function DonutCard({
  data, // [{ label, value }]
  centerLabel = 'Total',
  centerValue,
  height = 220,
  roles = ['primary', 'info', 'warning', 'success', 'danger', 'secondary'],
  colors,
  legend = true,
  className,
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1
  const size = legend ? Math.min(height, 200) : height
  const stroke = size * 0.185
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const colOf = (i) => (colors ? colors[i % colors.length] : `var(--oks-color-${roles[i % roles.length]}-500)`)

  const segs = data.reduce((acc, d, i) => {
    const prev = acc.length ? acc[acc.length - 1].cum : 0
    const frac = d.value / total
    acc.push({ dash: frac * c, gap: c - frac * c, off: -prev * c, col: colOf(i), cum: prev + frac })
    return acc
  }, [])

  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-5',
        legend && 'sm:flex-row sm:items-center sm:justify-center',
        className,
      )}
    >
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--app-surface-2)" strokeWidth={stroke} />
          {segs.map((s, i) => (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.col}
              strokeWidth={stroke}
              strokeDasharray={`${s.dash} ${s.gap}`}
              strokeDashoffset={s.off}
              strokeLinecap="butt"
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[11px] font-medium tracking-wide uppercase" style={{ color: 'var(--app-fg-muted)' }}>
            {centerLabel}
          </span>
          <span className="font-display text-[22px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
            {centerValue ?? total.toLocaleString()}
          </span>
        </div>
      </div>

      {legend && (
        <ul className="w-full min-w-0 flex-1 space-y-2.5 sm:max-w-[52%]">
          {data.map((d, i) => (
            <li key={d.label} className="flex items-center justify-between gap-3 text-[13px]">
              <span className="flex items-center gap-2 truncate" style={{ color: 'var(--app-fg)' }}>
                <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: colOf(i) }} />
                <span className="truncate">{d.label}</span>
              </span>
              <span className="shrink-0 font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
                {Math.round((d.value / total) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
