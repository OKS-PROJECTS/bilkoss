import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { Breadcrumbs as OksBreadcrumbs, BreadcrumbItem } from 'oks-ui'

/** Navigation trail — oks-ui <Breadcrumbs>. items: [{ label, to? }] */
export function Breadcrumbs({ items = [] }) {
  return (
    <OksBreadcrumbs aria-label="Breadcrumb" classNames={{ base: 'text-[13px]' }}>
      {items.map((it, i) => {
        const last = i === items.length - 1
        return it.to && !last ? (
          <BreadcrumbItem key={i} as={Link} to={it.to}>
            {it.label}
          </BreadcrumbItem>
        ) : (
          <BreadcrumbItem key={i} isCurrent={last}>
            {it.label}
          </BreadcrumbItem>
        )
      })}
    </OksBreadcrumbs>
  )
}

/**
 * The title band the reference shows on every inner page: page title left,
 * breadcrumb trail right. Optional actions sit left of the breadcrumb.
 */
export default function PageHeader({ title, breadcrumbs, actions, className }) {
  return (
    <div className={clsx('mb-6 flex min-h-[36px] flex-wrap items-center justify-between gap-3', className)}>
      <h1 className="font-display text-[16px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
        {title}
      </h1>
      <div className="flex flex-wrap items-center gap-3">
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
      </div>
    </div>
  )
}
