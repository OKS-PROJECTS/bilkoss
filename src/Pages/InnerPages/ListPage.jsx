import { useMemo, useState } from 'react'
import { Button, Chip } from 'oks-ui'
import { Plus, Download, Upload } from 'lucide-react'
import {
  PageHeader,
  Panel,
  DataTable,
  TableToolbar,
  SearchInput,
  StatGroup,
  KpiCard,
} from '../../Components/ui'

/**
 * List / CRUD archetype. Driven by a LIST_CONFIGS entry:
 * { title, subtitle, breadcrumbs?, columns, rows, searchKeys?, filters?, stats?,
 *   primaryAction? }
 */
export default function ListPage({ config }) {
  const { title, breadcrumbs, columns, rows, searchKeys = [], filters = [], stats, primaryAction } = config
  const [q, setQ] = useState('')
  const [activeFilter, setActiveFilter] = useState(null)

  const filtered = useMemo(() => {
    let out = rows
    if (q && searchKeys.length) {
      const needle = q.toLowerCase()
      out = out.filter((r) => searchKeys.some((k) => String(r[k] ?? '').toLowerCase().includes(needle)))
    }
    if (activeFilter != null) {
      const f = filters[activeFilter]
      if (f?.test) out = out.filter(f.test)
    }
    return out
  }, [rows, q, activeFilter, searchKeys, filters])

  return (
    <>
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        actions={
          <Button color="primary" size="sm" startContent={<Plus size={15} />}>
            {primaryAction || `Add ${title.replace(/s$/, '')}`}
          </Button>
        }
      />

      {stats?.length ? (
        <StatGroup cols={Math.min(stats.length, 4)} className="mb-5">
          {stats.map((s) => (
            <KpiCard key={s.label} label={s.label} value={s.value} trend={s.trend} hint={s.hint} icon={s.icon} accent={s.accent} />
          ))}
        </StatGroup>
      ) : null}

      <Panel>
        <TableToolbar
          className="mb-4"
          left={
            <>
              <div className="w-full sm:w-64">
                <SearchInput value={q} onChange={setQ} placeholder={`Search ${title.toLowerCase()}…`} />
              </div>
              {filters.map((f, i) => (
                <Chip
                  key={f.label}
                  variant={activeFilter === i ? 'solid' : 'bordered'}
                  color={activeFilter === i ? 'primary' : 'default'}
                  size="sm"
                  onClick={() => setActiveFilter((cur) => (cur === i ? null : i))}
                  className="cursor-pointer"
                >
                  {f.label}
                </Chip>
              ))}
            </>
          }
          right={
            <>
              <Button size="sm" variant="bordered" color="default" startContent={<Upload size={14} />}>
                Import
              </Button>
              <Button size="sm" variant="bordered" color="default" startContent={<Download size={14} />}>
                Export
              </Button>
            </>
          }
        />
        <DataTable columns={columns} rows={filtered} pageSize={config.pageSize || 10} selectable={config.selectable} />
      </Panel>
    </>
  )
}
