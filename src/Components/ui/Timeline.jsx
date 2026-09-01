import { Timeline as OksTimeline, TimelineItem, Avatar } from 'oks-ui'
import { avatarUrl } from '../../lib/format'

/**
 * Wrapper over oks-ui <Timeline>. Accepts the template's
 * `items: [{ id, title, description, time, by, color, icon }]` shape.
 */
export function Timeline({ items, className }) {
  return (
    <OksTimeline className={className}>
      {items.map((it) => (
        <TimelineItem key={it.id} title={it.title} time={it.time} icon={it.icon} color={it.color || 'primary'}>
          {it.description && (
            <p className="text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
              {it.description}
            </p>
          )}
          {it.by && (
            <p className="mt-1 text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>
              By {it.by}
            </p>
          )}
        </TimelineItem>
      ))}
    </OksTimeline>
  )
}

/** Activity feed — avatar-marker variant. items: [{ id, name, seed, action, target, time }] */
export function ActivityFeed({ items, className }) {
  return (
    <OksTimeline className={className}>
      {items.map((it) => (
        <TimelineItem
          key={it.id}
          icon={<Avatar name={it.name} src={avatarUrl(it.seed ?? it.name)} size="xs" showFallback />}
          time={it.time}
          title={
            <span className="text-[13px]" style={{ color: 'var(--app-fg)' }}>
              <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
                {it.name}
              </span>{' '}
              {it.action}{' '}
              {it.target && (
                <span className="font-medium" style={{ color: 'var(--app-primary)' }}>
                  {it.target}
                </span>
              )}
            </span>
          }
        />
      ))}
    </OksTimeline>
  )
}
