import { Button } from 'oks-ui'
import { PageHeader, Panel } from '../../Components/ui'

/**
 * Entity detail archetype. DETAIL_CONFIGS entry:
 * { title, subtitle, breadcrumbs?, header?: ReactNode, aside?: [{title, rows:[{label,value}]}],
 *   sections: [{ title, rows: [{ label, value }] }] }
 */
export default function DetailPage({ config }) {
  const { title, breadcrumbs, header, sections = [], aside = [], actions } = config
  return (
    <>
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        actions={actions || <Button size="sm" variant="bordered" color="default">Edit</Button>}
      />
      {header && <div className="mb-5">{header}</div>}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          {sections.map((s, i) => (
            <Panel key={i} title={s.title}>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                {s.rows.map((r) => (
                  <div key={r.label} className="flex flex-col">
                    <dt className="text-[12px] font-medium uppercase tracking-wide" style={{ color: 'var(--app-fg-subtle)' }}>
                      {r.label}
                    </dt>
                    <dd className="mt-0.5 text-[13.5px]" style={{ color: 'var(--app-fg-strong)' }}>
                      {r.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Panel>
          ))}
        </div>
        <div className="space-y-5">
          {aside.map((s, i) => (
            <Panel key={i} title={s.title}>
              {s.content || (
                <dl className="space-y-3">
                  {s.rows?.map((r) => (
                    <div key={r.label} className="flex items-center justify-between gap-3 text-[13px]">
                      <dt style={{ color: 'var(--app-fg-muted)' }}>{r.label}</dt>
                      <dd className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
                        {r.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </Panel>
          ))}
        </div>
      </div>
    </>
  )
}
