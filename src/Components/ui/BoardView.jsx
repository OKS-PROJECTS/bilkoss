import { Badge, Avatar, AvatarGroup } from 'oks-ui'
import clsx from 'clsx'
import { Surface } from './Surface'
import { avatarUrl } from '../../lib/format'

/**
 * Kanban / board — oks-ui ships none. Flex columns + Surface cards + Badge.
 * columns: [{ id, title, color?, cards: [{ id, title, tag?, tagColor?, assignees?:[seed], due? }] }]
 */
export default function BoardView({ columns, className }) {
  return (
    <div className={clsx('flex gap-4 overflow-x-auto pb-2', className)}>
      {columns.map((col) => (
        <div key={col.id} className="flex w-72 shrink-0 flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <span className="flex items-center gap-2 text-[13px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
              <span className="h-2 w-2 rounded-full" style={{ background: `var(--app-${col.color || 'primary'})` }} />
              {col.title}
            </span>
            <Badge content={col.cards.length} variant="soft" color="default" />
          </div>
          <div className="flex flex-col gap-3">
            {col.cards.map((card) => (
              <Surface key={card.id} bodyClassName="p-3.5">
                {card.tag && (
                  <span
                    className="mb-2 inline-block rounded px-1.5 py-0.5 text-[11px] font-semibold"
                    style={{
                      color: `var(--app-${card.tagColor || 'primary'})`,
                      background: `var(--app-${card.tagColor || 'primary'}-soft)`,
                    }}
                  >
                    {card.tag}
                  </span>
                )}
                <p className="text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
                  {card.title}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  {card.assignees?.length ? (
                    <AvatarGroup max={3} size="xs">
                      {card.assignees.map((s) => (
                        <Avatar key={s} src={avatarUrl(s)} name={`M${s}`} size="xs" showFallback />
                      ))}
                    </AvatarGroup>
                  ) : (
                    <span />
                  )}
                  {card.due && (
                    <span className="text-[11px]" style={{ color: 'var(--app-fg-subtle)' }}>
                      {card.due}
                    </span>
                  )}
                </div>
              </Surface>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
