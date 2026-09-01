import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { Stat as OksStat, StatGroup as OksStatGroup } from 'oks-ui'
import { Surface } from './Surface'

/**
 * Small inline stat — pass-through to oks-ui <Stat>. `trend` here is a signed
 * number (the reference's "+6.2%" style); map it to oks-ui's `delta` + `trend`.
 */
export function Stat({ label, value, trend, trendSuffix = '%', hint, className }) {
  const dir = trend == null ? undefined : trend > 0 ? 'up' : trend < 0 ? 'down' : 'flat'
  return (
    <OksStat
      className={className}
      label={label}
      value={value}
      help={hint}
      trend={dir}
      delta={trend == null ? undefined : `${Math.abs(trend)}${trendSuffix}`}
    />
  )
}

/** Responsive KPI grid — oks-ui <StatGroup>. `cols` kept as an alias for `columns`. */
export function StatGroup({ cols = 4, columns, children, className }) {
  return (
    <OksStatGroup columns={columns ?? cols} className={className}>
      {children}
    </OksStatGroup>
  )
}

/**
 * KPI card — the reference's dashboard stat card: uppercase muted label, a large
 * value, a "delta · since last month" line, and a soft icon disc. Kept as a
 * bespoke composition over <Surface> for reference fidelity.
 */
export function KpiCard({ label, value, trend, trendSuffix = '%', invertTrend = false, hint = 'Since last month', icon, accent = 'primary' }) {
  const up = (trend ?? 0) >= 0
  const good = invertTrend ? !up : up
  const Arrow = up ? ArrowUpRight : ArrowDownRight
  return (
    <Surface bodyClassName="p-5">
      <div className="flex items-start justify-between gap-3">
        <h5 className="text-[14px] font-semibold tracking-[0.04em] uppercase" style={{ color: 'var(--app-fg-subtle)' }}>
          {label}
        </h5>
        {icon && (
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[20px]"
            style={{ background: `var(--app-${accent}-soft)`, color: `var(--app-${accent})` }}
          >
            {icon}
          </span>
        )}
      </div>
      <p className="font-display mt-4 text-[30px] leading-none font-bold lg:text-[34px]" style={{ color: 'var(--app-fg-strong)' }}>
        {value}
      </p>
      {trend != null && (
        <p className="mt-4 mb-0 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[12.5px]" style={{ color: 'var(--app-fg-muted)' }}>
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
