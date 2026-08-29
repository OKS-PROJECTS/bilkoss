import { Avatar } from 'oks-ui'
import clsx from 'clsx'
import { avatarUrl, initials } from '../../lib/format'

/**
 * Name + secondary line, with an avatar (photo for people, square initials for
 * companies). Used as a table cell renderer and in lists.
 */
export default function EntityCell({ name, sub, seed, src, company = false, size = 'sm', icon, className }) {
  return (
    <div className={clsx('flex items-center gap-2.5', className)}>
      {icon ? (
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded"
          style={{ background: 'var(--app-surface-2)', color: 'var(--app-fg-muted)' }}
        >
          {icon}
        </span>
      ) : (
        <Avatar
          name={name}
          src={src ?? (company ? undefined : avatarUrl(seed ?? name))}
          size={size === 'sm' ? 'sm' : 'md'}
          radius={company ? 'md' : 'full'}
          color={company ? 'primary' : 'default'}
          fallback={company ? initials(name) : undefined}
          showFallback
        />
      )}
      <div className="min-w-0">
        <div className="truncate text-[13.5px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
          {name}
        </div>
        {sub && (
          <div className="truncate text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>
            {sub}
          </div>
        )}
      </div>
    </div>
  )
}
