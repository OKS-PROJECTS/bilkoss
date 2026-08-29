
import { ShoppingBag, Eye, Mail } from 'lucide-react'
import {
  PageHeader,
  Panel,
  Surface,
  DataTable,
  ChartCard,
  DonutCard,
  MeterList,
  TrendChip,
} from '../../Components/ui'
import { num } from '../../lib/format'
import { sessionsOverview, trafficSources, browsers, pageAnalytics, subscriberChannels } from '../../data/dashboards'

const bc = [{ label: 'Bilkoss', to: '/' }, { label: 'Dashboard' }, { label: 'Analytics' }]

function BigStat({ label, value, delta, icon, accent }) {
  return (
    <Surface bodyClassName="p-5">
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{ background: `var(--app-${accent}-soft)`, color: `var(--app-${accent})` }}
        >
          {icon}
        </span>
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: 'var(--app-fg-subtle)' }}>
            {label}
          </p>
          <p className="mt-0.5 flex items-center gap-2 text-[20px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
            {value} <TrendChip value={delta} />
          </p>
        </div>
      </div>
    </Surface>
  )
}

const PAGE_COLS = [
  { key: 'path', header: 'Page', render: (r) => <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.path}</span> },
  { key: 'views', header: 'Views', align: 'right', sortable: true, render: (r) => num(r.views) },
  { key: 'unique', header: 'Unique', align: 'right', sortable: true, render: (r) => num(r.unique) },
  { key: 'bounce', header: 'Bounce', align: 'right', render: (r) => `${r.bounce}%` },
  { key: 'avg', header: 'Avg. time', align: 'right' },
]

const SRC_COLS = [
  { key: 'source', header: 'Source' },
  { key: 'visitors', header: 'Visitors', align: 'right', render: (r) => num(r.visitors) },
  { key: 'share', header: 'Share', align: 'right', render: (r) => `${r.share}%` },
  { key: 'change', header: 'Change', align: 'right', render: (r) => <TrendChip value={r.change} /> },
]

export default function AnalyticsDashboard() {
  return (
    <>
      <PageHeader title="Analytics" breadcrumbs={bc} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ChartCard
          title="Total Orders"
          type="area"
          data={sessionsOverview}
          x="month"
          series={[{ key: 'sessions', name: 'Orders' }]}
          palette={{ roles: ['primary'] }}
          height={220}
          legend={false}
        />
        <Panel title="Total Visitors">
          <p className="text-[24px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
            16.46M <span className="align-middle"><TrendChip value={6.84} /></span>
          </p>
          <div className="mt-4 space-y-3">
            {[
              { label: 'Mobile', v: 69.4, sub: '41,927 sessions', color: 'secondary' },
              { label: 'Desktop', v: 30.6, sub: '18,476 sessions', color: 'primary' },
            ].map((x) => (
              <div key={x.label}>
                <div className="flex justify-between text-[12.5px]">
                  <span style={{ color: 'var(--app-fg-muted)' }}>{x.label}</span>
                  <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{x.v}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full" style={{ background: 'var(--app-surface-2)' }}>
                  <div className="h-full rounded-full" style={{ width: `${x.v}%`, background: `var(--app-${x.color})` }} />
                </div>
                <p className="mt-0.5 text-[11px]" style={{ color: 'var(--app-fg-subtle)' }}>{x.sub}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Total Subscribers">
          <p className="mb-4 text-[24px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
            11.12k <span className="align-middle"><TrendChip value={4.87} /></span>
          </p>
          <MeterList items={subscriberChannels} />
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-4">
        <ChartCard
          className="xl:col-span-3"
          title={<>Sessions Overview <span className="font-normal" style={{ color: 'var(--app-fg-subtle)' }}>(609.5k Sessions)</span></>}
          type="area"
          data={sessionsOverview}
          x="month"
          series={[
            { key: 'sessions', name: 'Sessions' },
            { key: 'users', name: 'Users' },
          ]}
          palette={{ roles: ['primary', 'info'] }}
          height={360}
        />
        <Panel title="Sessions by Browser">
          <DonutCard data={browsers} centerLabel="Top" centerValue="Chrome" roles={['primary', 'info', 'secondary', 'warning']} />
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <BigStat label="Goal completions" value="82%" delta={5.1} icon={<ShoppingBag size={18} />} accent="primary" />
        <BigStat label="Pages / session" value="4.7" delta={2.3} icon={<Eye size={18} />} accent="info" />
        <BigStat label="New subscribers" value="1,204" delta={-1.8} icon={<Mail size={18} />} accent="success" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <Panel className="xl:col-span-8" title="Page Analytics Overview">
          <DataTable columns={PAGE_COLS} rows={pageAnalytics} pageSize={8} />
        </Panel>
        <Panel className="xl:col-span-4" title="Top Traffic Sources">
          <DataTable columns={SRC_COLS} rows={trafficSources} pageSize={5} />
        </Panel>
      </div>
    </>
  )
}
