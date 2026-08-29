import clsx from 'clsx'

/**
 * Card / surface primitive — oks-ui ships none.
 * Built from a div + --app-* tokens.
 */
export function Surface({ as: As = 'div', className, bodyClassName, padded = true, children, ...rest }) {
  return (
    <As
      className={clsx('oks-surface flex flex-col', className)}
      style={{
        background: 'var(--app-surface)',
        border: 'var(--app-card-border)',
        borderRadius: 'var(--app-card-radius)',
        boxShadow: 'var(--app-card-shadow)',
      }}
      {...rest}
    >
      {padded ? <div className={clsx('p-5', bodyClassName)}>{children}</div> : children}
    </As>
  )
}

/** Card header: title (+ optional subtitle) left, actions right, optional divider. */
export function CardHeader({ title, subtitle, actions, divider = true, className }) {
  return (
    <div
      className={clsx('flex items-start justify-between gap-3 px-5 pt-5', divider && 'pb-4', className)}
      style={divider ? { borderBottom: '1px solid var(--app-border)' } : undefined}
    >
      <div className="min-w-0">
        {typeof title === 'string' ? (
          <h3 className="text-[15px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
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
