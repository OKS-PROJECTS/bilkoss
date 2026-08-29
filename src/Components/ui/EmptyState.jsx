import { Inbox } from 'lucide-react'

export default function EmptyState({ icon, title = 'Nothing here yet', description, action, className }) {
  const Icon = icon || Inbox
  return (
    <div className={`flex flex-col items-center justify-center px-6 py-12 text-center ${className || ''}`}>
      <span
        className="mb-3 flex h-12 w-12 items-center justify-center rounded-full"
        style={{ background: 'var(--app-surface-2)', color: 'var(--app-fg-subtle)' }}
      >
        <Icon size={22} />
      </span>
      <p className="text-[14px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
        {title}
      </p>
      {description && (
        <p className="mt-1 max-w-sm text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
