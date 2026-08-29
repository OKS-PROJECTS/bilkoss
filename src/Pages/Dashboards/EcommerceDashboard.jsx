import { useState } from 'react'
import { Button, Chart, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from 'oks-ui'
import { ShoppingCart, DollarSign, TrendingUp, CalendarDays, Clock, RefreshCw, MoreVertical, Star, Upload, Download } from 'lucide-react'
import {
  PageHeader,
  Panel,
  Surface,
  KpiCard,
  DataTable,
  ChartCard,
  DonutCard,
  EntityCell,
  StatusChip,
  Timeline,
} from '../../Components/ui'
import SegmentedControl from '../../Components/ui/SegmentedControl'
import { money, fmtDate } from '../../lib/format'
import { topProducts, orders, salesByMonth, recentActivity, revenueByLocation } from '../../data/ecommerce'

const now = new Date(2026, 7, 29, 17, 44)

const KPIS = [
  { label: 'Orders', value: '4,680', trend: -1.89, icon: <ShoppingCart size={18} />, accent: 'primary' },
  { label: 'Revenue', value: '$36.10k', trend: -5.23, icon: <DollarSign size={18} />, accent: 'success' },
  { label: 'Growth', value: '+12.04%', trend: 4.87, icon: <TrendingUp size={18} />, accent: 'info' },
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

const weekly = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
  day,
  orders: 42 + ((i * 17) % 38),
  refunds: 8 + ((i * 5) % 14),
}))

export default function EcommerceDashboard() {
  const [range, setRange] = useState('monthly')

  return (
    <>
      <PageHeader
        title="eCommerce"
        breadcrumbs={[{ label: 'Bilkoss', to: '/' }, { label: 'Dashboard' }, { label: 'eCommerce' }]}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* KPI block — 2x2 */}
        <div className="grid grid-cols-2 gap-6">
          <Surface padded={false} className="overflow-hidden">
            <div className="p-5">
              <h3 className="text-[14px] font-semibold tracking-[0.04em] uppercase" style={{ color: 'var(--app-fg-subtle)' }}>
                Good Day,
              </h3>
              <p className="font-display mt-2 text-[24px] leading-tight font-bold" style={{ color: 'var(--app-fg-strong)' }}>
                David Dev!
              </p>
            </div>
            <div
              className="flex items-center justify-between gap-2 px-5 py-3 text-[12.5px] font-semibold"
              style={{ background: 'var(--app-surface-2)', color: 'var(--app-fg-muted)' }}
            >
              <span className="flex items-center gap-1.5">
                <CalendarDays size={14} /> {fmtDate(now)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> 5:44 PM
              </span>
            </div>
          </Surface>
          {KPIS.map((k) => (
            <KpiCard key={k.label} {...k} />
          ))}
        </div>

        <Panel
          title="Store Performance Analytics"
          actions={
            <Button size="sm" variant="bordered" color="default" startContent={<RefreshCw size={13} />}>
              Refresh
            </Button>
          }
        >
          <DonutCard
            centerLabel="Total"
            centerValue="140"
            height={220}
            legend={false}
            data={[
              { label: 'Completed', value: 78 },
              { label: 'Pending', value: 34 },
              { label: 'Cancelled', value: 28 },
            ]}
            colors={['var(--oks-color-primary-500)', 'var(--app-warn)', 'var(--app-border-strong)']}
          />
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[12px] font-semibold tracking-wide uppercase" style={{ color: 'var(--app-danger)' }}>
            <Star size={12} fill="currentColor" /> Poor Sales
          </p>
        </Panel>

        <ChartCard
          title="Weekly Performance Insights"
          actions={
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="ghost" color="default" aria-label="Options">
                  <MoreVertical size={16} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Widget options">
                <DropdownItem itemKey="refresh">Refresh data</DropdownItem>
                <DropdownItem itemKey="download">Download report</DropdownItem>
                <DropdownItem itemKey="share">Share insights</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          }
          type="bar"
          data={weekly}
          x="day"
          series={[{ key: 'orders', name: 'Orders' }]}
          palette={{ roles: ['primary'] }}
          bar={{ radius: 3 }}
          legend={false}
          height={260}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel
          title={<>Sales Report <span className="font-normal" style={{ color: 'var(--app-fg-subtle)' }}>(25,822 Orders)</span></>}
          actions={
            <SegmentedControl
              options={[
                { key: 'today', label: 'Today' },
                { key: 'monthly', label: 'Monthly' },
                { key: 'annual', label: 'Annual' },
              ]}
              value={range}
              onChange={setRange}
            />
          }
        >
          <div className="mb-4 grid grid-cols-3 gap-3">
            {[
              { label: 'Revenue', value: '$78,224.68', icon: <DollarSign size={13} />, trend: '+5.2%' },
              { label: 'Orders', value: '8,541', icon: <ShoppingCart size={13} />, trend: '+3.1%' },
              { label: 'Growth Rate', value: '25.30%', icon: <TrendingUp size={13} />, trend: '+4.8%' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-[12px] font-medium" style={{ color: 'var(--app-fg-muted)' }}>{s.label}</p>
                <p className="mt-1 flex items-center gap-1.5 text-[15px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
                  <span style={{ color: 'var(--app-success)' }}>{s.icon}</span>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
          <Chart
            type="area"
            data={salesByMonth}
            x="month"
            series={[
              { key: 'revenue', name: 'Total Revenue' },
              { key: 'orders', name: 'Orders' },
            ]}
            palette={{ roles: ['primary', 'secondary'] }}
            height={280}
            legend={{ position: 'bottom' }}
            grid={{ horizontal: true, vertical: false }}
            axisY={{ show: false }}
            line={{ curve: 'smooth', markers: { size: 0 }, area: { show: true, fill: { opacity: 0.14 } } }}
          />
        </Panel>

        <Panel
          title="Top Selling Products"
          actions={
            <div className="flex gap-2">
              <Button size="sm" variant="bordered" color="default" startContent={<Upload size={13} />}>Import</Button>
              <Button size="sm" variant="bordered" color="default" startContent={<Download size={13} />}>Export</Button>
            </div>
          }
        >
          <DataTable columns={PROD_COLS} rows={topProducts} pageSize={6} />
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
        <Panel
          className="xl:col-span-5"
          title={<>Recent Orders <span className="font-normal" style={{ color: 'var(--app-fg-subtle)' }}>(186.25k Transactions)</span></>}
          actions={<Button size="sm" variant="bordered" color="default" startContent={<Download size={13} />}>Export</Button>}
        >
          <DataTable columns={ORDER_COLS} rows={orders.slice(0, 8)} pageSize={5} />
        </Panel>

        <Panel className="xl:col-span-4" title="Revenue by Locations">
          <div
            className="mb-4 rounded-md p-3 text-[13px]"
            style={{ background: 'var(--app-primary-soft)', color: 'var(--app-primary)' }}
          >
            <strong>Congratulations!</strong> You've just hit a new record — <strong>25.9k orders</strong> this month.
          </div>
          <ul className="space-y-3">
            {revenueByLocation.map((r) => (
              <li key={r.label} className="flex items-center justify-between border-b pb-2 text-[13px]" style={{ borderColor: 'var(--app-border)' }}>
                <span style={{ color: 'var(--app-fg)' }}>{r.label}</span>
                <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
                  {money(r.value, { compact: true })} Revenue
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="xl:col-span-3" title="Recent Activity">
          <Timeline items={recentActivity} />
        </Panel>
      </div>
    </>
  )
}
