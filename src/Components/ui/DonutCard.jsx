import { Chart } from 'oks-ui'
import clsx from 'clsx'

/**
 * Donut + custom centre value + side legend. The oks-ui donut always paints its
 * own centre total with no opt-out, so `.donut-no-center` hides it and we
 * overlay our own.
 */
export default function DonutCard({
  data, // [{ label, value, color? }]
  centerLabel = 'Total',
  centerValue,
  height = 240,
  roles = ['primary', 'info', 'warning', 'success', 'danger', 'secondary'],
  colors,
  legend = true,
  className,
}) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const chartSize = legend ? Math.min(height, 180) : height
  return (
    <div
      className={clsx(
        'flex flex-col items-center gap-5',
        legend && 'sm:flex-row sm:items-center sm:justify-center',
        className,
      )}
    >
      <div className="donut-no-center relative shrink-0" style={{ width: chartSize, maxWidth: '100%' }}>
        <Chart
          type="donut"
          data={data}
          x="label"
          series={{ key: 'value', name: 'Share' }}
          height={chartSize}
          palette={colors ? { colors } : { roles }}
          legend={false}
          pieStyle={{ innerRatio: 0.78, gap: 2 }}
        />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[12px] font-medium uppercase tracking-wide" style={{ color: 'var(--app-fg-muted)' }}>
            {centerLabel}
          </span>
          <span className="text-[22px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
            {centerValue ?? total.toLocaleString()}
          </span>
        </div>
      </div>
      {legend && (
        <ul className="w-full min-w-0 flex-1 space-y-2.5 sm:max-w-[52%]">
          {data.map((d, i) => (
            <li key={d.label} className="flex items-center justify-between gap-3 text-[13px]">
              <span className="flex items-center gap-2 truncate" style={{ color: 'var(--app-fg)' }}>
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-sm"
                  style={{ background: colors ? colors[i % colors.length] : `var(--oks-color-${roles[i % roles.length]}-500)` }}
                />
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
