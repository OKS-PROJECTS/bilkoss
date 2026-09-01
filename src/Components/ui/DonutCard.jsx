import clsx from 'clsx'
import { Chart } from 'oks-ui'

/**
 * Donut + custom centre value + optional side legend.
 *
 * The ring is oks-ui `<Chart type="donut">` (the stage-width bug that forced a
 * hand-drawn SVG ring in v1.0.x is fixed in 1.1). The centre label uses the
 * `pie.renderCenter` slot; the side legend with percentages is kept bespoke so
 * it matches the reference dashboards.
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
  const colOf = (i) => (colors ? colors[i % colors.length] : `var(--oks-color-${roles[i % roles.length]}-500)`)
  const palette = colors ? { colors } : { roles }

  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-5',
        legend && 'sm:flex-row sm:items-center sm:justify-center',
        className,
      )}
    >
      <div className="shrink-0" style={{ width: size, height: size }}>
        <Chart
          type="donut"
          height={size}
          data={data}
          x="label"
          series={[{ key: 'value', name: centerLabel }]}
          palette={palette}
          legend={false}
          unstyled
          pie={{
            donutInnerRadiusRatio: 0.66,
            renderCenter: () => (
              <div className="flex flex-col items-center justify-center leading-tight">
                <span className="text-[11px] font-medium tracking-wide uppercase" style={{ color: 'var(--app-fg-muted)' }}>
                  {centerLabel}
                </span>
                <span className="font-display text-[22px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
                  {centerValue ?? total.toLocaleString()}
                </span>
              </div>
            ),
          }}
        />
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
