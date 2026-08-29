import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

/**
 * Accordion / collapse — oks-ui ships none. button[aria-expanded] + a height
 * transition. `items: [{ id, title, content }]`
 */
export default function Accordion({ items, defaultOpen = [], multiple = false, className }) {
  const [open, setOpen] = useState(() => new Set(defaultOpen))
  const toggle = (id) =>
    setOpen((prev) => {
      const next = multiple ? new Set(prev) : new Set()
      if (prev.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <div className={clsx('divide-y', className)} style={{ borderColor: 'var(--app-border)' }}>
      {items.map((it) => {
        const isOpen = open.has(it.id)
        return (
          <div key={it.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(it.id)}
              className="flex w-full items-center justify-between gap-3 py-3.5 text-left text-[14px] font-semibold transition-colors"
              style={{ color: 'var(--app-fg-strong)' }}
            >
              {it.title}
              <ChevronDown
                size={16}
                className="shrink-0 transition-transform"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'none', color: 'var(--app-fg-muted)' }}
              />
            </button>
            <div
              className="grid transition-all duration-200"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <div className="pb-4 text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
                  {it.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
