import clsx from 'clsx'
import { Chart } from 'oks-ui'
import { TrendChip } from './chips'
import { Surface } from './Surface'

/** Small inline stat — label over value, optional trend. */
export function Stat({ label, value, trend, trendSuffix, hint, className }) {
  return (
    <div className={clsx('min-w-0', className)}>
      <div className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: 'var(--app-fg-muted)' }}>
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-[22px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
          {value}
        </span>
        {trend != null && <TrendChip value={trend} suffix={trendSuffix} />}
      </div>
      {hint && (
        <div className="mt-1 text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>
          {hint}
        </div>
      )}
    </div>
  )
}

export function StatGroup({ cols = 4, children, className }) {
  return (
    <div
      className={clsx(
        'grid grid-cols-2 gap-4',
        cols === 3 && 'lg:grid-cols-3',
        cols === 4 && 'lg:grid-cols-4',
        cols === 5 && 'lg:grid-cols-5',
        className,
      )}
    >
      {children}
    </div>
  )
}

/**
 * KPI card — Surface + icon + value + trend + optional sparkline.
 * 2-up on phones (sparkline hidden), 2/3/4-up from lg.
 */
export function KpiCard({ label, value, trend, trendSuffix = '%', invertTrend = false, hint, icon, spark, accent = 'primary' }) {
  return (
    <Surface bodyClassName="p-4 lg:p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: 'var(--app-fg-muted)' }}>
            {label}
          </div>
          <div className="mt-2 text-[24px] leading-none font-bold" style={{ color: 'var(--app-fg-strong)' }}>
            {value}
          </div>
        </div>
        {icon && (
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ background: `var(--app-${accent}-soft)`, color: `var(--app-${accent})` }}
          >
            {icon}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {trend != null && <TrendChip value={trend} suffix={trendSuffix} invert={invertTrend} />}
          {hint && (
            <span className="text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>
              {hint}
            </span>
          )}
        </div>
        {spark && (
          <div className="hidden h-9 w-24 sm:block">
            <Chart
              type="area"
              data={spark.map((y, x) => ({ x, y }))}
              x="x"
              series={[{ key: 'y', name: label }]}
              height={36}
              palette={{ roles: [accent] }}
              grid={{ horizontal: false, vertical: false }}
              axisX={{ show: false }}
              axisY={{ show: false }}
              padding={{ top: 2, right: 0, bottom: 2, left: 0 }}
              legend={false}
              tooltip={false}
              line={{ curve: 'smooth', area: { show: true, fill: { opacity: 0.16 } } }}
            />
          </div>
        )}
      </div>
    </Surface>
  )
}
