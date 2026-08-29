import { useState } from 'react'
import { Alert, Button, ButtonGroup, Chart } from 'oks-ui'
import { Users, UserCheck, Handshake, DollarSign, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react'
import {
  PageHeader, Panel, Surface, DataTable, DonutCard, EntityCell, Timeline, Sparkline,
} from '../../Components/ui'
import { money, num } from '../../lib/format'
import { crmOverview, leadSources, deals, topPerformers } from '../../data/dashboards'
import { recentActivity } from '../../data/ecommerce'

const bc = [{ label: 'Bilkoss', to: '/' }, { label: 'Dashboard' }, { label: 'CRM' }]

const KPIS = [
  { label: 'Leads Generated', value: '48.20k', pct: 5.12, note: '2.3k Up', up: true, icon: <Users size={18} />, accent: 'primary', spark: [30, 34, 32, 40, 44, 52, 48, 58, 55, 62] },
  { label: 'Qualified Leads', value: '12.80k', pct: -3.45, note: '0.4k Down', up: false, icon: <UserCheck size={18} />, accent: 'info', spark: [60, 55, 58, 52, 50, 46, 48, 44, 46, 43] },
  { label: 'Deals Closed', value: '9.75k', pct: 2.94, note: '1.1k Up', up: true, icon: <Handshake size={18} />, accent: 'warning', spark: [20, 24, 22, 28, 26, 30, 34, 32, 38, 41] },
  { label: 'Revenue Generated', value: '$482k', pct: 6.71, note: '$28k Up', up: true, icon: <DollarSign size={18} />, accent: 'success', spark: [40, 44, 42, 50, 55, 52, 60, 64, 62, 70] },
]

const OVERVIEW_STATS = [
  { label: 'Revenue', value: '$56.63k', pct: -3.91 },
  { label: 'Orders', value: '9,842', pct: 8.72 },
  { label: 'New Users', value: '95.30k', pct: 11.2 },
  { label: 'New Contract', value: '851', pct: 0 },
]


const DEAL_COLS = [
  { key: 'id', header: 'Deal ID', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-primary)' }}>#{r.id}</span> },
  { key: 'name', header: 'Deal name', render: (r) => <EntityCell name={r.name} company /> },
  { key: 'owner', header: 'Company', render: (r) => r.owner },
  {
    key: 'stage', header: 'Pipeline', width: 130,
    render: (r) => {
      const steps = ['Qualified', 'Proposal', 'Negotiation', 'Won']
      const done = r.stage === 'Lost' ? 1 : steps.indexOf(r.stage) + 1
      return (
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <span key={i} className="h-1.5 w-6 rounded-full" style={{ background: i < done ? `var(--app-${r.stage === 'Lost' ? 'danger' : 'success'})` : 'var(--app-surface-2)' }} />
          ))}
        </div>
      )
    },
  },
  { key: 'close', header: 'Closing date' },
  { key: 'value', header: 'Value', align: 'right', sortable: true, sortValue: (r) => r.value, render: (r) => money(r.value, { compact: true }) },
]

const PERF_COLS = [
  { key: 'name', header: 'Rep', render: (r) => <EntityCell name={r.name} seed={r.name} /> },
  { key: 'deals', header: 'Deals', align: 'right' },
  { key: 'revenue', header: 'Revenue', align: 'right', render: (r) => money(r.revenue, { compact: true }) },
]

export default function CrmDashboard() {
  const [rangeFilter, setRangeFilter] = useState('1Y')
  return (
    <>
      <PageHeader title="CRM" breadcrumbs={bc} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((k) => (
          <Surface key={k.label} bodyClassName="p-5">
            <p className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: 'var(--app-fg-subtle)' }}>{k.label}</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: `var(--app-${k.accent}-soft)`, color: `var(--app-${k.accent})` }}>{k.icon}</span>
                <span className="font-display text-[24px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>{k.value}</span>
              </span>
              <Sparkline data={k.spark} color={k.accent} width={72} height={30} />
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-[12.5px]" style={{ color: 'var(--app-fg-muted)' }}>
              <span className="inline-flex items-center gap-0.5 font-semibold" style={{ color: k.up ? 'var(--app-success)' : 'var(--app-danger)' }}>
                {k.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{Math.abs(k.pct)}%
              </span>
              {k.note}
            </p>
          </Surface>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Overview (Current Year)"
          actions={
            <ButtonGroup size="sm" variant="bordered" color="default">
              {['All', '1M', '6M', '1Y'].map((r) => (
                <Button key={r} onPress={() => setRangeFilter(r)} style={rangeFilter === r ? { background: 'var(--app-primary-soft)', color: 'var(--app-primary)' } : undefined}>
                  {r}
                </Button>
              ))}
            </ButtonGroup>
          }
        >
          <Alert color="warning" variant="soft" className="mb-4" title="Heads up" description="We regret to inform you that one of our data servers is degraded. Metrics may lag by a few minutes." />
          <div className="mb-4 grid grid-cols-2 gap-4 border-b border-dashed pb-4 sm:grid-cols-4" style={{ borderColor: 'var(--app-border)' }}>
            {OVERVIEW_STATS.map((s) => (
              <div key={s.label}>
                <p className="text-[12px] font-medium" style={{ color: 'var(--app-fg-muted)' }}>{s.label}</p>
                <p className="mt-1 text-[16px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>{s.value}</p>
                <p className="text-[11px] font-semibold" style={{ color: s.pct > 0 ? 'var(--app-success)' : s.pct < 0 ? 'var(--app-danger)' : 'var(--app-fg-subtle)' }}>
                  {s.pct > 0 ? '+' : ''}{s.pct}%
                </p>
              </div>
            ))}
          </div>
          <Chart
            type="column"
            data={crmOverview}
            x="month"
            series={[{ key: 'won', name: 'Won' }, { key: 'lost', name: 'Lost' }]}
            palette={{ colors: ['var(--app-ok)', 'var(--app-warn)'] }}
            column={{ radius: 2 }}
            height={280}
            legend={{ position: 'bottom' }}
            grid={{ horizontal: true, vertical: false }}
          />
          <Button size="sm" variant="bordered" color="default" className="mt-3" startContent={<RefreshCw size={13} />}>Refresh data</Button>
        </Panel>

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
          <ul className="space-y-3.5">
            {leadSources.map((l, i) => (
              <li key={l.label}>
                <div className="mb-1 flex justify-between text-[12.5px]">
                  <span style={{ color: 'var(--app-fg)' }}>{['United States', 'India', 'United Kingdom', 'Germany', 'Canada'][i]}</span>
                  <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{num(l.value * 137)}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--app-surface-2)' }}>
                  <div className="h-full rounded-full" style={{ width: `${l.value}%`, background: 'var(--app-primary)' }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Recent Activity">
          <Timeline items={recentActivity} />
        </Panel>
      </div>
    </>
  )
}
