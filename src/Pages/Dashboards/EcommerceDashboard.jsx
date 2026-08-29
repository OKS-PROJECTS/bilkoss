import { useState } from 'react'
import { Button } from 'oks-ui'
import { ShoppingCart, DollarSign, TrendingUp, RotateCcw } from 'lucide-react'
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
import SegmentedControl from '../../Components/ui/SegmentedControl'
import { money } from '../../lib/format'
import {
  topProducts,
  orders,
  salesByMonth,
  trafficChannels,
  revenueByLocation,
  recentActivity,
} from '../../data/ecommerce'

const KPIS = [
  { label: 'Orders', value: '4,680', trend: -1.89, hint: 'vs last month', icon: <ShoppingCart size={18} />, accent: 'primary', spark: [12, 18, 14, 22, 19, 26, 24, 30] },
  { label: 'Revenue', value: '$36.10k', trend: -5.23, hint: 'vs last month', icon: <DollarSign size={18} />, accent: 'success', spark: [30, 28, 33, 31, 26, 24, 27, 25] },
  { label: 'Growth', value: '+12.04%', trend: 4.87, hint: 'vs last month', icon: <TrendingUp size={18} />, accent: 'info', spark: [8, 9, 11, 10, 13, 12, 15, 17] },
  { label: 'Refunds', value: '312', trend: 2.1, invertTrend: true, hint: 'vs last month', icon: <RotateCcw size={18} />, accent: 'warning', spark: [5, 4, 6, 5, 7, 6, 8, 7] },
]

const ORDER_COLS = [
  { key: 'id', header: '#ID', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-primary)' }}>#{r.id}</span> },
  { key: 'customer', header: 'Customer', render: (r) => <EntityCell name={r.customer} sub={r.email} seed={r.id} /> },
  { key: 'date', header: 'Date' },
  { key: 'amount', header: 'Amount', align: 'right', render: (r) => money(r.amount) },
  { key: 'payment', header: 'Payment' },
  { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
]

const PROD_COLS = [
  { key: 'name', header: 'Product', render: (r) => <EntityCell name={r.name} sub={`By ${r.brand}`} icon={<span className="text-[11px] font-bold">{r.name[0]}</span>} /> },
  { key: 'price', header: 'Price', align: 'right', render: (r) => money(r.price) },
  { key: 'qty', header: 'Qty', align: 'right' },
  { key: 'amount', header: 'Amount', align: 'right', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{money(r.amount)}</span> },
  { key: 'stock', header: 'Stock', render: (r) => <StatusChip status={r.stock} /> },
]

export default function EcommerceDashboard() {
  const [metric, setMetric] = useState('revenue')
  return (
    <>
      <PageHeader
        title="E-Commerce"
        breadcrumbs={[{ label: 'Bilkoss', to: '/' }, { label: 'Dashboards' }, { label: 'E-Commerce' }]}
      />

      <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-4">
        <Panel className="lg:col-span-1" title="Good day, David">
          <p className="text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
            Here is what is happening with your store today.
          </p>
          <div className="mt-4 space-y-2 text-[13px]">
            <div className="flex justify-between"><span style={{ color: 'var(--app-fg-muted)' }}>Today's earnings</span><span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>$8,975.30</span></div>
            <div className="flex justify-between"><span style={{ color: 'var(--app-fg-muted)' }}>New customers</span><span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>46</span></div>
            <div className="flex justify-between"><span style={{ color: 'var(--app-fg-muted)' }}>Conversion</span><span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>3.24%</span></div>
          </div>
        </Panel>
        <div className="grid grid-cols-2 gap-5 lg:col-span-3 lg:grid-cols-3">
          {KPIS.slice(0, 3).map((k) => (
            <KpiCard key={k.label} {...k} />
          ))}
        </div>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <ChartCard
          className="lg:col-span-2"
          title="Sales Report"
          subtitle="25,822 orders this period"
          actions={
            <SegmentedControl
              options={[
                { key: 'revenue', label: 'Revenue' },
                { key: 'orders', label: 'Orders' },
              ]}
              value={metric}
              onChange={setMetric}
            />
          }
          type="area"
          data={salesByMonth}
          x="month"
          series={[{ key: metric, name: metric === 'revenue' ? 'Revenue' : 'Orders' }]}
          palette={{ roles: [metric === 'revenue' ? 'primary' : 'info'] }}
          dataFormat={metric === 'revenue' ? { prefix: '$', suffix: 'k' } : undefined}
          height={300}
        />
        <Panel title="Store Performance">
          <DonutCard
            centerLabel="Total"
            centerValue="140"
            data={[
              { label: 'Completed', value: 78 },
              { label: 'Pending', value: 34 },
              { label: 'Cancelled', value: 28 },
            ]}
            roles={['success', 'warning', 'danger']}
          />
        </Panel>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <ChartCard
          className="lg:col-span-2"
          title="Weekly Performance Insights"
          type="column"
          data={salesByMonth.slice(0, 7).map((d, i) => ({ day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i], orders: d.orders, refunds: Math.round(d.orders * 0.18) }))}
          x="day"
          series={[
            { key: 'orders', name: 'Orders' },
            { key: 'refunds', name: 'Refunds' },
          ]}
          palette={{ roles: ['primary', 'warning'] }}
          height={280}
        />
        <Panel title="Traffic Channels">
          <DonutCard
            centerLabel="Sessions"
            centerValue="128k"
            data={trafficChannels}
            roles={['primary', 'info', 'secondary', 'warning', 'success']}
          />
        </Panel>
      </div>

      <Panel
        className="mb-5"
        title="Top Selling Products"
        actions={<Button size="sm" variant="bordered" color="default">View all</Button>}
      >
        <DataTable columns={PROD_COLS} rows={topProducts} pageSize={6} />
      </Panel>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Recent Orders"
          actions={<Button size="sm" variant="bordered" color="default">Export</Button>}
        >
          <DataTable columns={ORDER_COLS} rows={orders.slice(0, 8)} pageSize={5} />
        </Panel>
        <Panel title="Recent Activity">
          <Timeline items={recentActivity} />
        </Panel>
      </div>

      <div className="mt-5">
        <Panel title="Revenue by Location">
          <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {revenueByLocation.map((r) => (
              <div key={r.label} className="flex items-center justify-between border-b py-2 text-[13px]" style={{ borderColor: 'var(--app-border)' }}>
                <span style={{ color: 'var(--app-fg)' }}>{r.label}</span>
                <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{money(r.value, { compact: true })}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  )
}
