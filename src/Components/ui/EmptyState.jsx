import { isValidElement } from 'react'
import { EmptyState as OksEmptyState } from 'oks-ui'
import { Inbox } from 'lucide-react'

/**
 * Pass-through to oks-ui <EmptyState>. Keeps the template's defaults (an Inbox
 * icon, a default title) and the older `action` prop name as an alias. `icon`
 * accepts a Lucide component *or* a ready node.
 */
export default function EmptyState({
  icon,
  title = 'Nothing here yet',
  description,
  action,
  actions,
  className,
  ...rest
}) {
  const src = icon || Inbox
  const iconNode = isValidElement(src) ? src : (() => {
    const Icon = src
    return <Icon size={22} />
  })()
  return (
    <OksEmptyState
      title={title}
      description={description}
      icon={iconNode}
      actions={actions ?? action}
      className={className}
      {...rest}
    />
  )
}
