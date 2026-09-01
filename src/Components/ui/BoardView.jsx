import { useState } from 'react'
import { Board, Badge, Avatar, AvatarGroup } from 'oks-ui'
import clsx from 'clsx'
import { Surface } from './Surface'
import { avatarUrl } from '../../lib/format'

/**
 * Kanban / board — backed by oks-ui <Board>. Accepts the template's
 * `columns: [{ id, title, color?, cards: [...] }]` shape; flattens the nested
 * cards into the flat `items` model Board expects and keeps the reference card
 * design in `renderCard`.
 */
export default function BoardView({ columns, className, isDragDisabled = false }) {
  const [items, setItems] = useState(() =>
    columns.flatMap((col) => (col.cards || []).map((card) => ({ ...card, __col: col.id }))),
  )

  const boardColumns = columns.map(({ id, title, color }) => ({ id, title, color: color || 'default' }))

  return (
    <Board
      aria-label="Board"
      className={className}
      columns={boardColumns}
      items={items}
      getItemId={(it) => String(it.id)}
      getItemColumn={(it) => it.__col}
      isDragDisabled={isDragDisabled}
      onItemMove={({ itemId, to }) =>
        setItems((prev) => {
          const next = prev.filter((it) => String(it.id) !== itemId)
          const moved = prev.find((it) => String(it.id) === itemId)
          if (!moved) return prev
          const inTarget = next.filter((it) => it.__col === to.columnId)
          const before = next.filter((it) => it.__col !== to.columnId)
          inTarget.splice(to.index, 0, { ...moved, __col: to.columnId })
          return [...before, ...inTarget]
        })
      }
      renderColumnHeader={(col, { count }) => (
        <div className="flex w-full items-center justify-between px-1">
          <span className="flex items-center gap-2 text-[13px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
            <span className="h-2 w-2 rounded-full" style={{ background: `var(--app-${col.color === 'default' ? 'primary' : col.color})` }} />
            {col.title}
          </span>
          <Badge content={count} variant="soft" color="default" />
        </div>
      )}
      renderCard={(card) => (
        <Surface bodyClassName="p-3.5" className={clsx('w-full')}>
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
      )}
    />
  )
}
