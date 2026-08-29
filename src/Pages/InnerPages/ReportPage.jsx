import { PageHeader, Panel, StatGroup, KpiCard, ChartCard, DataTable } from '../../Components/ui'
import SegmentedControl from '../../Components/ui/SegmentedControl'
import { useState } from 'react'

/**
 * Report archetype. REPORT_CONFIGS entry:
 * { title, breadcrumbs?, kpis, chart:{type,data,x,series,...}, ranges?, table?:{columns,rows} }
 */
export default function ReportPage({ config }) {
  const { title, breadcrumbs, kpis = [], chart, table, ranges } = config
  const [range, setRange] = useState(ranges?.[0]?.key)

  return (
    <>
      <PageHeader
        title={title}
        breadcrumbs={breadcrumbs}
        actions={
          ranges ? <SegmentedControl options={ranges} value={range} onChange={setRange} /> : undefined
        }
      />
      {kpis.length > 0 && (
        <StatGroup cols={Math.min(kpis.length, 4)} className="mb-5">
          {kpis.map((k) => (
            <KpiCard key={k.label} {...k} />
          ))}
        </StatGroup>
      )}
      {chart && (
        <div className="mb-5">
          <ChartCard title={chart.title || 'Trend'} {...chart} />
        </div>
      )}
      {table && (
        <Panel title={table.title || 'Breakdown'}>
          <DataTable columns={table.columns} rows={table.rows} pageSize={table.pageSize || 8} />
        </Panel>
      )}
    </>
  )
}
