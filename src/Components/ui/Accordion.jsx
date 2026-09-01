import { Accordion as OksAccordion, AccordionItem } from 'oks-ui'

/**
 * Wrapper over oks-ui <Accordion>. Accepts the template's
 * `items: [{ id, title, content }]` shape.
 */
export default function Accordion({ items, defaultOpen = [], multiple = false, variant = 'light', className }) {
  return (
    <OksAccordion
      className={className}
      variant={variant}
      selectionMode={multiple ? 'multiple' : 'single'}
      defaultExpandedKeys={defaultOpen}
    >
      {items.map((it) => (
        <AccordionItem key={it.id} itemKey={it.id} title={it.title} subtitle={it.subtitle}>
          {it.content}
        </AccordionItem>
      ))}
    </OksAccordion>
  )
}
