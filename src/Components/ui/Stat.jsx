import clsx from 'clsx'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Surface } from './Surface'
import { TrendChip } from './chips'

/** Small inline stat — label over value, optional trend. */
export function Stat({ label, value, trend, trendSuffix, hint, className }) {
  return (
    <div className={clsx('min-w-0', className)}>
      <div className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: 'var(--app-fg-subtle)' }}>
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
        'grid grid-cols-2 gap-6',
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
 * KPI card — matches the reference's stat cards: uppercase muted label, a
 * restrained value, a "delta · since last month" line, and a soft icon disc.
 * 2-up on phones, 2/3/4-up from lg.
 */
export function KpiCard({ label, value, trend, trendSuffix = '%', invertTrend = false, hint = 'Since last month', icon, accent = 'primary' }) {
  const up = (trend ?? 0) >= 0
  const good = invertTrend ? !up : up
  const Arrow = up ? ArrowUpRight : ArrowDownRight
  return (
    <Surface bodyClassName="p-5">
      <div className="flex items-start justify-between gap-3">
        <h5 className="text-[13px] font-semibold tracking-[0.03em] uppercase" style={{ color: 'var(--app-fg-subtle)' }}>
          {label}
        </h5>
        {icon && (
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[19px]"
            style={{ background: `var(--app-${accent}-soft)`, color: `var(--app-${accent})` }}
          >
            {icon}
          </span>
        )}
      </div>
      <p className="font-display mt-4 text-[28px] leading-none font-bold" style={{ color: 'var(--app-fg-strong)' }}>
        {value}
      </p>
      {trend != null && (
        <p className="mt-3 mb-0 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[12.5px]" style={{ color: 'var(--app-fg-muted)' }}>
          <span
            className="inline-flex items-center gap-0.5 font-semibold"
            style={{ color: good ? 'var(--app-success)' : 'var(--app-danger)' }}
          >
            <Arrow size={14} />
            {Math.abs(trend)}
            {trendSuffix}
          </span>
          <span className="whitespace-nowrap">{hint}</span>
        </p>
      )}
    </Surface>
  )
}
