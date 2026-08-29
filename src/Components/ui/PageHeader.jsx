import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import clsx from 'clsx'

export function Breadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
        {items.map((it, i) => {
          const last = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-1.5">
              {it.to && !last ? (
                <Link to={it.to} className="transition-colors hover:text-[var(--app-primary)]">
                  {it.label}
                </Link>
              ) : (
                <span style={last ? { color: 'var(--app-fg)' } : undefined}>{it.label}</span>
              )}
              {!last && <ChevronRight size={13} className="opacity-60" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/**
 * The title band the reference shows on every inner page:
 * page title left, breadcrumb trail right, optional actions row.
 */
export default function PageHeader({ title, breadcrumbs, actions, className }) {
  return (
    <div className={clsx('mb-5 flex flex-wrap items-center justify-between gap-3', className)}>
      <h1 className="text-[18px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
        {title}
      </h1>
      <div className="flex flex-wrap items-center gap-3">
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      </div>
    </div>
  )
}
