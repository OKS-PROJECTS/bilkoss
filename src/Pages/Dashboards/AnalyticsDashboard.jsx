import { Chart, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from 'oks-ui'
import { ShoppingBag, Eye, Users as UsersIcon, Clock, ChevronDown, Download, Upload, Mail } from 'lucide-react'
import { PageHeader, Panel, DataTable, DonutCard, MeterList, TrendChip } from '../../Components/ui'
import { num } from '../../lib/format'
import { pageAnalytics, subscriberChannels } from '../../data/dashboards'

const bc = [{ label: 'Bilkoss', to: '/' }, { label: 'Dashboard' }, { label: 'Analytics' }]

const orderRange = ['1D', '3D', '5D', '7D', '9D', '11D', '13D', '15D'].map((d, i) => ({
  d,
  orders: 44 + Math.round(Math.sin(i / 1.5) * 30 + (i === 4 ? 60 : 0) + i * 4),
  refunds: 6 + Math.round(Math.cos(i) * 5 + i),
}))

const sessions30 = Array.from({ length: 30 }, (_, i) => ({
  d: i + 1,
  sessions: 15 + Math.round(Math.sin(i / 4) * 4 + i * 0.18),
  users: 22 + Math.round(Math.sin(i / 3 + 1) * 3 + i * 0.22),
}))

const goals = [
  { goal: 'Total Visitors', completed: '824,300', target: '1,000,000', progress: 82 },
  { goal: 'Mobile Traffic', completed: '41,927', target: '60,000', progress: 69 },
  { goal: 'Desktop Traffic', completed: '18,476', target: '30,000', progress: 61 },
]

const trafficRows = [
  { source: 'Google', code: 'G', visitors: 67500, share: 72.15, color: 'primary' },
  { source: 'Instagram', code: 'IG', visitors: 7920, share: 28.65, color: 'danger' },
  { source: 'LinkedIn', code: 'in', visitors: 5410, share: 18.4, color: 'info' },
  { source: 'YouTube', code: 'YT', visitors: 3120, share: 11.2, color: 'warning' },
  { source: 'Direct', code: 'D', visitors: 2480, share: 8.9, color: 'secondary' },
]

const RangeMenu = () => (
  <Dropdown placement="bottom-end">
    <DropdownTrigger>
      <Button size="sm" variant="bordered" color="default" endContent={<ChevronDown size={13} />}>
        Last 90 Days
      </Button>
    </DropdownTrigger>
    <DropdownMenu aria-label="Range">
      <DropdownItem itemKey="7">Last 7 Days</DropdownItem>
      <DropdownItem itemKey="30">Last 30 Days</DropdownItem>
      <DropdownItem itemKey="90">Last 90 Days</DropdownItem>
    </DropdownMenu>
  </Dropdown>
)

const ValueHead = ({ icon, accent, value, delta }) => (
  <div className="flex items-center gap-3">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: `var(--app-${accent}-soft)`, color: `var(--app-${accent})` }}>
      {icon}
    </span>
    <p className="flex items-center gap-2 text-[22px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
      {value} <TrendChip value={delta} />
    </p>
  </div>
)

const InlineStat = ({ icon, label, value, delta }) => (
  <div className="flex items-start gap-2.5">
    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: 'var(--app-surface-2)', color: 'var(--app-fg-muted)' }}>
      {icon}
    </span>
    <div>
      <p className="text-[12px] font-medium" style={{ color: 'var(--app-fg-muted)' }}>{label}</p>
      <p className="flex items-center gap-1.5 text-[16px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
        {value} <TrendChip value={delta} />
      </p>
    </div>
  </div>
)

const PAGE_COLS = [
  { key: 'path', header: 'Page', render: (r) => <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.path}</span> },
  { key: 'views', header: 'Views', align: 'right', sortable: true, render: (r) => num(r.views) },
  { key: 'unique', header: 'Unique', align: 'right', sortable: true, render: (r) => num(r.unique) },
  { key: 'bounce', header: 'Bounce', align: 'right', render: (r) => `${r.bounce}%` },
  { key: 'avg', header: 'Avg. time', align: 'right' },
]

export default function AnalyticsDashboard() {
  return (
    <>
      <PageHeader title="Analytics" breadcrumbs={bc} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel title="Total Orders" actions={<RangeMenu />}>
          <ValueHead icon={<ShoppingBag size={18} />} accent="primary" value="$659.80k" delta={-3.21} />
          <Chart
            type="column"
            data={orderRange}
            x="d"
            series={[
              { key: 'orders', name: 'Orders' },
              { key: 'refunds', name: 'Refunds' },
            ]}
            palette={{ roles: ['primary', 'success'] }}
            column={{ stacked: true, radius: 2 }}
            height={210}
            legend={{ position: 'bottom' }}
            axisY={{ show: true, tickCount: 4 }}
            grid={{ horizontal: true, vertical: false }}
          />
        </Panel>

        <Panel title="Total Visitors" actions={<RangeMenu />}>
          <ValueHead icon={<Eye size={18} />} accent="secondary" value="82.30M" delta={6.84} />
          <div className="mt-4 grid grid-cols-2 gap-4">
            {[
              { label: 'Mobile Phone', v: 69.4, sub: '41,927 sessions', color: 'secondary' },
              { label: 'Desktop', v: 30.6, sub: '18,476 sessions', color: 'info' },
            ].map((x) => (
              <div key={x.label}>
                <p className="text-[12px] font-medium" style={{ color: 'var(--app-fg-muted)' }}>{x.label}</p>
                <p className="text-[16px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>{x.v}%</p>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--app-surface-2)' }}>
                  <div className="h-full rounded-full" style={{ width: `${x.v}%`, background: `var(--app-${x.color})` }} />
                </div>
                <p className="mt-0.5 text-[11px]" style={{ color: 'var(--app-fg-subtle)' }}>{x.sub}</p>
              </div>
            ))}
          </div>
          <table className="mt-4 w-full text-[12.5px]">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--app-border)' }}>
                {['Goal', 'Completed', 'Target', 'Progress'].map((h) => (
                  <th key={h} className="py-2 text-left text-[10px] font-bold uppercase tracking-wide" style={{ color: 'var(--app-fg-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {goals.map((g) => (
                <tr key={g.goal} style={{ borderBottom: '1px solid var(--app-border)' }}>
                  <td className="py-2" style={{ color: 'var(--app-fg-strong)' }}>{g.goal}</td>
                  <td className="py-2" style={{ color: 'var(--app-fg-muted)' }}>{g.completed}</td>
                  <td className="py-2" style={{ color: 'var(--app-fg-muted)' }}>{g.target}</td>
                  <td className="py-2 font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{g.progress}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title="Total Subscribers" actions={<RangeMenu />}>
          <ValueHead icon={<Mail size={18} />} accent="success" value="11.12k" delta={4.87} />
          <div className="mt-4">
            <MeterList items={subscriberChannels} />
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-4">
        <Panel
          className="xl:col-span-3"
          title={<>Sessions Overview <span className="font-normal" style={{ color: 'var(--app-fg-subtle)' }}>(609.5k Sessions)</span></>}
          actions={
            <div className="flex gap-2">
              <Button size="sm" variant="bordered" color="default" startContent={<Download size={13} />}>Export</Button>
              <Button size="sm" variant="bordered" color="default" startContent={<Upload size={13} />}>Import</Button>
            </div>
          }
        >
          <div className="mb-4 grid grid-cols-2 gap-4 border-b border-dashed pb-4 sm:grid-cols-4" style={{ borderColor: 'var(--app-border)' }}>
            <InlineStat icon={<UsersIcon size={15} />} label="Users" value="39.03k" delta={3.02} />
            <InlineStat icon={<Eye size={15} />} label="Sessions" value="42.15k" delta={-4.78} />
            <InlineStat icon={<ShoppingBag size={15} />} label="Bounce Rate" value="21.20%" delta={-31.39} />
            <InlineStat icon={<Clock size={15} />} label="Session Duration" value="3m 12s" delta={7.92} />
          </div>
          <Chart
            type="area"
            data={sessions30}
            x="d"
            series={[
              { key: 'sessions', name: 'Sessions' },
              { key: 'users', name: 'Users' },
            ]}
            palette={{ colors: ['var(--app-primary)', 'var(--app-warn)'] }}
            height={300}
            legend={{ position: 'bottom' }}
            axisY={{ show: false }}
            grid={{ horizontal: true, vertical: false }}
            line={{ curve: 'smooth', markers: { size: 0 }, area: { show: true, fill: { opacity: 0.1 } } }}
          />
        </Panel>

        <Panel title="Sessions by Browser">
          <DonutCard
            data={[
              { label: 'Chrome', value: 63 },
              { label: 'Safari', value: 19 },
              { label: 'Edge', value: 11 },
              { label: 'Firefox', value: 7 },
            ]}
            centerLabel="Top"
            centerValue="Chrome"
            roles={['primary', 'info', 'secondary', 'warning']}
          />
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <Panel className="xl:col-span-7" title="User Geography Intelligence">
          <div className="grid grid-cols-12 gap-1.5">
            {Array.from({ length: 84 }).map((_, i) => {
              const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453 % 1)
              const on = v > 0.55
              return (
                <div
                  key={i}
                  className="aspect-square rounded-[3px]"
                  style={{ background: on ? `color-mix(in srgb, var(--app-primary) ${Math.round(v * 70 + 25)}%, transparent)` : 'var(--app-surface-2)' }}
                />
              )
            })}
          </div>
          <ul className="mt-4 space-y-3">
            {[['United States', '67.5k', 72], ['India', '7.92k', 28], ['United Kingdom', '5.4k', 19], ['Germany', '3.1k', 12]].map(([c, n, p]) => (
              <li key={c}>
                <div className="mb-1 flex justify-between text-[12.5px]">
                  <span style={{ color: 'var(--app-fg)' }}>{c}</span>
                  <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{n} <span style={{ color: 'var(--app-fg-subtle)' }}>({p}%)</span></span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--app-surface-2)' }}>
                  <div className="h-full rounded-full" style={{ width: `${p}%`, background: 'var(--app-primary)' }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="xl:col-span-5" title="Top Traffic Sources">
          <ul className="space-y-4">
            {trafficRows.map((t) => (
              <li key={t.source} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold" style={{ background: `var(--app-${t.color}-soft)`, color: `var(--app-${t.color})` }}>
                  {t.code}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between text-[12.5px]">
                    <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>{t.source}</span>
                    <span style={{ color: 'var(--app-fg-muted)' }}>{num(t.visitors)} <span style={{ color: 'var(--app-fg-subtle)' }}>({t.share}%)</span></span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--app-surface-2)' }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.min(t.share, 100)}%`, background: `var(--app-${t.color})` }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel className="mt-6" title="Page Analytics Overview">
        <DataTable columns={PAGE_COLS} rows={pageAnalytics} pageSize={8} />
      </Panel>
    </>
  )
}
