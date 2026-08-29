import { Avatar } from 'oks-ui'
import clsx from 'clsx'
import { avatarUrl } from '../../lib/format'

/**
 * Timeline / activity rail — oks-ui ships none. A div rail + dot markers.
 * items: [{ id, title, description, time, by, color?, icon? }]
 */
export function Timeline({ items, className }) {
  return (
    <ul className={clsx('relative space-y-5', className)}>
      <span
        className="absolute top-1 bottom-1 left-[7px] w-px"
        style={{ background: 'var(--app-border)' }}
        aria-hidden
      />
      {items.map((it) => (
        <li key={it.id} className="relative pl-7">
          <span
            className="absolute top-1 left-0 h-3.5 w-3.5 rounded-full border-2"
            style={{
              borderColor: `var(--app-${it.color || 'primary'})`,
              background: 'var(--app-surface)',
            }}
          />
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[13.5px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
              {it.title}
            </p>
            {it.time && (
              <span className="shrink-0 text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>
                {it.time}
              </span>
            )}
          </div>
          {it.description && (
            <p className="mt-0.5 text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
              {it.description}
            </p>
          )}
          {it.by && (
            <p className="mt-1 text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>
              By {it.by}
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}

/** Activity feed — avatar rail variant. items: [{ id, name, seed, action, target, time }] */
export function ActivityFeed({ items, className }) {
  return (
    <ul className={clsx('space-y-4', className)}>
      {items.map((it) => (
        <li key={it.id} className="flex gap-3">
          <Avatar name={it.name} src={avatarUrl(it.seed ?? it.name)} size="sm" showFallback />
          <div className="min-w-0 flex-1">
            <p className="text-[13px]" style={{ color: 'var(--app-fg)' }}>
              <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
                {it.name}
              </span>{' '}
              {it.action}{' '}
              {it.target && (
                <span className="font-medium" style={{ color: 'var(--app-primary)' }}>
                  {it.target}
                </span>
              )}
            </p>
            <p className="mt-0.5 text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>
              {it.time}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
