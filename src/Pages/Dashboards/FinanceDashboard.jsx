import { Form, FormFieldSet, Button, Alert } from 'oks-ui'
import { TrendingUp, TrendingDown, PiggyBank, LineChart, EyeOff, Send, Download as DownloadIcon } from 'lucide-react'
import { PageHeader, Panel, Surface, DataTable, EntityCell, StatusChip, TrendChip, Sparkline } from '../../Components/ui'
import { money } from '../../lib/format'
import { financeOverview, transactions } from '../../data/dashboards'

const bc = [{ label: 'Bilkoss', to: '/' }, { label: 'Dashboard' }, { label: 'Finance' }]

const STAT_CARDS = [
  { label: 'Total Income', value: '$51.68k', pct: 8.72, icon: <TrendingUp size={17} />, accent: 'success', spark: [20, 24, 22, 30, 28, 34, 40, 44, 42, 48, 52, 51] },
  { label: 'Total Expenses', value: '$24.03k', pct: -3.28, icon: <TrendingDown size={17} />, accent: 'danger', spark: [30, 28, 32, 26, 30, 24, 28, 22, 26, 24, 23, 24] },
  { label: 'Investments', value: '$43.10k', pct: 5.1, icon: <LineChart size={17} />, accent: 'primary', spark: [10, 14, 18, 16, 22, 26, 24, 30, 34, 38, 40, 43] },
  { label: 'Savings', value: '$18.64k', pct: 2.4, icon: <PiggyBank size={17} />, accent: 'info', spark: [8, 10, 12, 11, 14, 16, 15, 18, 17, 18, 18, 19] },
]

const OVERVIEW_STATS = [
  { label: 'Revenue', value: '$29.56k', icon: <TrendingUp size={13} />, color: 'success' },
  { label: 'Expenses', value: '$15.08k', icon: <TrendingDown size={13} />, color: 'danger' },
  { label: 'Investment', value: '$3.67k', icon: <LineChart size={13} />, color: 'primary' },
  { label: 'Savings', value: '$6.72k', icon: <PiggyBank size={13} />, color: 'info' },
]

const TXN_COLS = [
  { key: 'id', header: 'ID', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-primary)' }}>#TX{900 - Number(String(r.id).replace(/\D/g, '') || 0) % 900}</span> },
  { key: 'party', header: 'Name / Business', render: (r) => <EntityCell name={r.party} seed={r.party} company /> },
  { key: 'category', header: 'Description', render: (r) => r.category },
  {
    key: 'amount', header: 'Amount', align: 'right', sortable: true, sortValue: (r) => r.amount,
    render: (r) => (
      <span className="font-semibold" style={{ color: r.amount < 0 ? 'var(--app-danger)' : 'var(--app-success)' }}>
        {r.amount < 0 ? '−' : '+'}USD {money(Math.abs(r.amount)).replace('$', '')}
      </span>
    ),
  },
  { key: 'date', header: 'Timestamp', sortable: true },
  { key: 'type', header: 'Type', render: (r) => (r.amount < 0 ? 'Debit' : 'Credit') },
  { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
]

export default function FinanceDashboard() {
  return (
    <>
      <PageHeader title="Finance" breadcrumbs={bc} />

      <Alert
        color="primary"
        variant="soft"
        className="mb-6"
        title="Dear David Dev"
        description="We kindly encourage you to review your recent transactions and financial commitments to ensure your account stays in good standing."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Surface bodyClassName="p-5">
          <p className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: 'var(--app-fg-subtle)' }}>Total Balance</p>
          <p className="font-display mt-2 flex items-center gap-2 text-[26px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
            $76,852.36 <EyeOff size={16} className="opacity-40" />
          </p>
          <div className="mt-4 flex items-center gap-3 rounded-lg p-3" style={{ background: 'var(--app-surface-2)' }}>
            <span className="flex h-9 w-12 shrink-0 items-center justify-center rounded" style={{ background: 'linear-gradient(135deg, var(--app-primary), var(--app-violet))' }} />
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>$59,258.25</p>
              <p className="text-[11px]" style={{ color: 'var(--app-fg-subtle)' }}>•••• •••• •••• 3698</p>
            </div>
            <button className="text-[12px] font-semibold underline" style={{ color: 'var(--app-primary)' }}>Details</button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button color="primary" startContent={<Send size={14} />}>Transfer</Button>
            <Button variant="soft" color="info" startContent={<DownloadIcon size={14} />}>Request</Button>
          </div>
        </Surface>

        <div className="grid grid-cols-2 gap-6 xl:col-span-2">
          {STAT_CARDS.map((s) => (
            <Surface key={s.label} bodyClassName="p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: `var(--app-${s.accent}-soft)`, color: `var(--app-${s.accent})` }}>{s.icon}</span>
              <p className="font-display mt-3 text-[22px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>{s.value}</p>
              <p className="text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>{s.label}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <TrendChip value={s.pct} />
                <Sparkline data={s.spark} color={s.accent} width={80} height={28} />
              </div>
            </Surface>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel className="xl:col-span-2" title="Financial Overview">
          <div className="mb-4 grid grid-cols-2 gap-4 border-b border-dashed pb-4 sm:grid-cols-4" style={{ borderColor: 'var(--app-border)' }}>
            {OVERVIEW_STATS.map((s) => (
              <div key={s.label}>
                <p className="text-[12px] font-medium" style={{ color: 'var(--app-fg-muted)' }}>{s.label}</p>
                <p className="mt-1 flex items-center gap-1.5 text-[16px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
                  <span style={{ color: `var(--app-${s.color})` }}>{s.icon}</span>{s.value}
                </p>
              </div>
            ))}
          </div>
          <FinanceChart />
        </Panel>

        <Panel title="Quick Transfer">
          <Form onSubmit={() => {}} className="space-y-4">
            <FormFieldSet type="select" name="from" label="Send from" options={['Operating', 'Savings', 'Payroll'].map((a) => ({ label: a, value: a }))} />
            <FormFieldSet type="text" name="to" label="To (name or IBAN)" placeholder="Jane Cooper" />
            <FormFieldSet type="number" name="amount" label="Amount" placeholder="0.00" props={{ prefix: '$' }} />
            <FormFieldSet type="textarea" name="note" label="Note (optional)" />
            <Button type="submit" color="primary" fullWidth>Send transfer</Button>
          </Form>
        </Panel>
      </div>

      <Panel
        className="mt-6"
        title={<>Recent Transactions <span className="font-normal" style={{ color: 'var(--app-fg-subtle)' }}>(95.6k+ Transactions)</span></>}
      >
        <DataTable columns={TXN_COLS} rows={transactions} pageSize={10} />
      </Panel>
    </>
  )
}

function FinanceChart() {
  // gold columns for expenses + a purple dashed line for the net trend
  const data = financeOverview.map((m) => ({ ...m, net: m.income - m.expense }))
  return (
    <div className="relative">
      <div className="flex h-[280px] items-end gap-2">
        {data.map((m) => {
          const maxV = 60
          return (
            <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full flex-1 items-end justify-center gap-0.5">
                <span className="w-1/3 rounded-t" style={{ height: `${(m.income / maxV) * 100}%`, background: 'var(--app-surface-2)' }} />
                <span className="w-1/3 rounded-t" style={{ height: `${(m.expense / maxV) * 100}%`, background: 'var(--app-warn)' }} />
              </div>
              <span className="text-[10px]" style={{ color: 'var(--app-fg-subtle)' }}>{m.month}</span>
            </div>
          )
        })}
      </div>
      <svg className="pointer-events-none absolute inset-x-0 top-0 h-[262px] w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
        <polyline
          points={data.map((m, i) => `${(i / (data.length - 1)) * 100},${100 - (m.net / 40) * 100}`).join(' ')}
          fill="none"
          stroke="var(--app-violet)"
          strokeWidth="1"
          strokeDasharray="2 2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mt-3 flex flex-wrap gap-4 text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: 'var(--app-surface-2)' }} /> Total Income</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: 'var(--app-warn)' }} /> Total Expenses</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: 'var(--app-violet)' }} /> Net</span>
      </div>
    </div>
  )
}

