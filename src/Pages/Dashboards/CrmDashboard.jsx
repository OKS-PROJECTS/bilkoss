import { Users, UserCheck, Handshake, DollarSign } from 'lucide-react'
import {
  PageHeader,
  Panel,
  KpiCard,
  DataTable,
  ChartCard,
  DonutCard,
  EntityCell,
  StatusChip,
  Timeline,
} from '../../Components/ui'
import { money, num } from '../../lib/format'
import { crmOverview, leadSources, deals, topPerformers } from '../../data/dashboards'
import { recentActivity } from '../../data/ecommerce'

const bc = [{ label: 'Bilkoss', to: '/' }, { label: 'Dashboard' }, { label: 'CRM' }]

const KPIS = [
  { label: 'Leads Generated', value: '2,481', trend: 8.1, icon: <Users size={18} />, accent: 'primary' },
  { label: 'Qualified Leads', value: '1,024', trend: 3.4, icon: <UserCheck size={18} />, accent: 'info' },
  { label: 'Deals Closed', value: '318', trend: -2.2, icon: <Handshake size={18} />, accent: 'warning' },
  { label: 'Revenue Generated', value: '$482k', trend: 6.7, icon: <DollarSign size={18} />, accent: 'success' },
]

const DEAL_COLS = [
  { key: 'name', header: 'Deal', render: (r) => <EntityCell name={r.name} sub={r.id} company /> },
  { key: 'owner', header: 'Owner' },
  { key: 'value', header: 'Value', align: 'right', sortable: true, sortValue: (r) => r.value, render: (r) => money(r.value, { compact: true }) },
  { key: 'stage', header: 'Stage', render: (r) => <StatusChip status={r.stage} /> },
  { key: 'close', header: 'Close date' },
]

const PERF_COLS = [
  { key: 'name', header: 'Rep', render: (r) => <EntityCell name={r.name} seed={r.name} /> },
  { key: 'deals', header: 'Deals', align: 'right' },
  { key: 'revenue', header: 'Revenue', align: 'right', render: (r) => money(r.revenue, { compact: true }) },
]

export default function CrmDashboard() {
  return (
    <>
      <PageHeader title="CRM" breadcrumbs={bc} />

      <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
        {KPIS.map((k) => (
          <KpiCard key={k.label} {...k} hint="vs last quarter" />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ChartCard
          className="xl:col-span-2"
          title="Overview (Current Year)"
          type="column"
          data={crmOverview}
          x="month"
          series={[
            { key: 'won', name: 'Won' },
            { key: 'lost', name: 'Lost' },
          ]}
          palette={{ roles: ['primary', 'danger'] }}
          column={{ stacked: true, radius: 3 }}
          height={360}
        />
        <Panel title="Lead Source">
          <DonutCard data={leadSources} centerLabel="Leads" centerValue={num(leadSources.reduce((s, d) => s + d.value, 0))} />
        </Panel>
      </div>

      <Panel className="mt-6" title="Deal Status">
        <DataTable columns={DEAL_COLS} rows={deals} pageSize={8} />
      </Panel>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel title="Top Performing">
          <DataTable columns={PERF_COLS} rows={topPerformers} pageSize={6} />
        </Panel>
        <Panel title="Location by Session">
          <DataTable
            columns={[
              { key: 'label', header: 'Country' },
              { key: 'value', header: 'Sessions', align: 'right', render: (r) => num(r.value * 137) },
            ]}
            rows={leadSources}
            pageSize={5}
          />
        </Panel>
        <Panel title="Recent Activity">
          <Timeline items={recentActivity} />
        </Panel>
      </div>
    </>
  )
}
