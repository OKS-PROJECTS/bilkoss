import clsx from 'clsx'
import { Card } from 'oks-ui'

/**
 * Card / surface primitive — now backed by oks-ui <Card> (reads
 * `--oks-color-surface` + `--oks-color-border`, both re-pointed to `--app-*` in
 * theme.css; the `.oksCard` rule there carries the reference card shadow).
 * Padding stays an explicit inner `p-5` so every existing call site keeps its
 * spacing.
 */
export function Surface({ as, className, bodyClassName, padded = true, children, ...rest }) {
  return (
    <Card as={as} radius="md" className={clsx('oks-surface flex flex-col', className)} {...rest}>
      {padded ? <div className={clsx('p-5', bodyClassName)}>{children}</div> : children}
    </Card>
  )
}

/** Card header: title (+ optional subtitle) left, actions right, optional divider. */
export function CardHeader({ title, subtitle, actions, divider = true, className }) {
  return (
    <div
      className={clsx('flex items-center justify-between gap-3 px-5 py-[15px]', className)}
      style={divider ? { borderBottom: '1px dashed var(--app-border)' } : undefined}
    >
      <div className="min-w-0">
        {typeof title === 'string' ? (
          <h3 className="text-[15px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
            {title}
          </h3>
        ) : (
          title
        )}
        {subtitle && (
          <p className="mt-0.5 text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  )
}

export function SectionTitle({ children, className, as: As = 'h2' }) {
  return (
    <As
      className={clsx('text-[11px] font-bold uppercase tracking-[0.09em]', className)}
      style={{ color: 'var(--app-fg-subtle)' }}
    >
      {children}
    </As>
  )
}

/** A titled card: header + padded body in one. */
export function Panel({ title, subtitle, actions, divider, children, className, bodyClassName }) {
  return (
    <Surface padded={false} className={className}>
      {(title || actions) && (
        <CardHeader title={title} subtitle={subtitle} actions={actions} divider={divider} />
      )}
      <div className={clsx('p-5', bodyClassName)}>{children}</div>
    </Surface>
  )
}
