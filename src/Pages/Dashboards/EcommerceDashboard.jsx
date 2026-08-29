import { useState } from 'react'
import { Button, Chart, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from 'oks-ui'
import { ShoppingCart, DollarSign, TrendingUp, CalendarDays, Clock, RefreshCw, MoreVertical, Star, Upload, Download } from 'lucide-react'
import {
  PageHeader,
  Panel,
  Surface,
  KpiCard,
  DataTable,
  DonutCard,
  EntityCell,
  StatusChip,
  Timeline,
} from '../../Components/ui'
import { money, fmtDate } from '../../lib/format'
import { topProducts, orders, recentActivity, revenueByLocation } from '../../data/ecommerce'

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
  { key: 'name', header: 'Product', render: (r) => <EntityCell name={r.name} sub={`By ${r.brand}`} icon={
        <span
          className="flex h-full w-full items-center justify-center rounded text-[12px] font-bold text-white"
          style={{ background: `linear-gradient(135deg, var(--oks-color-primary-400), var(--oks-color-primary-600))` }}
        >
          {r.name[0]}
        </span>
      } /> },
  { key: 'price', header: 'Price', align: 'right', render: (r) => money(r.price) },
  { key: 'qty', header: 'Qty', align: 'right' },
  { key: 'amount', header: 'Amount', align: 'right', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{money(r.amount)}</span> },
  { key: 'stock', header: 'Stock', render: (r) => <StatusChip status={r.stock} /> },
]

// dumbbell ranges per weekday (min–max), matching the reference's lollipop chart
const weekly = [
  { day: 'Mon', lo: 28, hi: 46 },
  { day: 'Tue', lo: 32, hi: 40 },
  { day: 'Wed', lo: 30, hi: 78 },
  { day: 'Thu', lo: 30, hi: 45 },
  { day: 'Fri', lo: 36, hi: 44 },
  { day: 'Sat', lo: 45, hi: 66 },
  { day: 'Sun', lo: 41, hi: 56 },
]

// 25-day series for the Sales Report (matches the reference's 1–25 x-axis)
const daily = Array.from({ length: 25 }, (_, i) => {
  const d = i + 1
  const wave = Math.sin(i / 2.4) * 18 + Math.sin(i / 6) * 10
  return {
    d,
    revenue: Math.round(52 + wave + (i > 14 && i < 20 ? 22 : 0)),
    orders: Math.round(38 + Math.cos(i / 2) * 12 + (i > 5 && i < 10 ? -8 : 0)),
  }
})

const RANGE_TABS = [
  { key: 'today', label: 'Today' },
  { key: 'monthly', label: 'Monthly' },
  { key: 'annual', label: 'Annual' },
]

export default function EcommerceDashboard() {
  const [range, setRange] = useState('monthly')

  return (
    <>
      <PageHeader
        title="eCommerce"
        breadcrumbs={[{ label: 'Bilkoss', to: '/' }, { label: 'Dashboard' }, { label: 'eCommerce' }]}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-7">
        {/* KPI block — 2x2 */}
        <div className="grid grid-cols-2 gap-6 xl:col-span-3">
          <Surface padded={false} className="overflow-hidden">
            <div className="flex items-start justify-between gap-2 p-5">
              <div>
                <h3 className="text-[14px] font-semibold tracking-[0.04em] whitespace-nowrap uppercase" style={{ color: 'var(--app-fg-subtle)' }}>
                  Good Day,
                </h3>
                <p className="font-display mt-2 text-[22px] leading-tight font-bold whitespace-nowrap" style={{ color: 'var(--app-fg-strong)' }}>
                  David Dev!
                </p>
              </div>
              <svg width="72" height="60" viewBox="0 0 72 60" fill="none" className="hidden shrink-0 xl:block" aria-hidden>
                <rect x="30" y="6" width="30" height="48" rx="5" fill="var(--app-primary-soft)" />
                <rect x="35" y="12" width="20" height="30" rx="2" fill="var(--app-surface)" />
                <path d="M37 34l4-5 4 3 6-8" stroke="var(--app-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="16" cy="40" r="10" fill="var(--app-warn-soft)" />
                <path d="M16 34v6l4 2" stroke="var(--app-warn)" strokeWidth="2" strokeLinecap="round" />
              </svg>
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
          className="xl:col-span-2"
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

        <Panel
          className="xl:col-span-2"
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
        >
          <div className="space-y-3.5 pt-1">
            {weekly.map((w) => {
              const pct = (n) => ((n - 20) / 60) * 100
              return (
                <div key={w.day} className="flex items-center gap-3">
                  <span className="w-8 shrink-0 text-[12px] font-medium" style={{ color: 'var(--app-fg-muted)' }}>{w.day}</span>
                  <div className="relative h-3 flex-1">
                    <span className="absolute top-1/2 h-px w-full -translate-y-1/2" style={{ background: 'var(--app-border)' }} />
                    <span
                      className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full"
                      style={{ left: `${pct(w.lo)}%`, width: `${pct(w.hi) - pct(w.lo)}%`, background: 'var(--app-primary)' }}
                    />
                    <span className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2" style={{ left: `${pct(w.lo)}%`, borderColor: 'var(--app-primary)', background: 'var(--app-surface)' }} />
                    <span className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ left: `${pct(w.hi)}%`, background: 'var(--app-primary)' }} />
                  </div>
                </div>
              )
            })}
            <div className="flex justify-between pt-1 pl-11 text-[11px]" style={{ color: 'var(--app-fg-subtle)' }}>
              {[20, 30, 40, 50, 60, 70, 80].map((n) => <span key={n}>{n}</span>)}
            </div>
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Surface padded={false}>
          <div className="flex items-center justify-between px-5 py-[15px]">
            <h3 className="font-display text-[15px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>
              Sales Report <span className="font-normal" style={{ color: 'var(--app-fg-subtle)' }}>(25,822 Orders)</span>
            </h3>
          </div>
          <div className="grid grid-cols-3 border-y border-dashed" style={{ borderColor: 'var(--app-border)' }}>
            {RANGE_TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setRange(t.key)}
                className="py-3 text-center text-[13.5px] font-semibold transition-colors"
                style={{
                  color: range === t.key ? 'var(--app-primary)' : 'var(--app-fg-muted)',
                  boxShadow: range === t.key ? 'inset 0 -2px 0 0 var(--app-primary)' : undefined,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="p-5">
            <div className="mb-3 grid grid-cols-3 gap-3">
              {[
                { label: 'Revenue', value: '$78,224.68', icon: <DollarSign size={13} /> },
                { label: 'Orders', value: '8,541', icon: <ShoppingCart size={13} /> },
                { label: 'Growth Rate', value: '25.30%', icon: <TrendingUp size={13} /> },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-[12px] font-medium" style={{ color: 'var(--app-fg-muted)' }}>{s.label}</p>
                  <p className="mt-1 flex items-center justify-center gap-1.5 text-[15px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
                    <span style={{ color: 'var(--app-success)' }}>{s.icon}</span>
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-[13px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
              Today&apos;s Earning: $8,975.30
            </p>
            <p className="mb-1 text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>
              Property PS007 is not receiving hits — sessions are down across the store.
            </p>
            <Chart
              type="area"
              data={daily}
              x="d"
              series={[
                { key: 'revenue', name: 'Total Revenue' },
                { key: 'orders', name: 'Orders' },
              ]}
              palette={{ colors: ['var(--app-violet)', 'var(--app-ok)'] }}
              height={260}
              legend={{ position: 'bottom' }}
              grid={{ horizontal: true, vertical: false }}
              axisY={{ show: false }}
              line={{ curve: 'smooth', markers: { size: 0 }, area: { show: true, fill: { opacity: 0.12 } } }}
            />
          </div>
        </Surface>

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
