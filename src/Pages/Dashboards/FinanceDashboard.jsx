import { Form, FormFieldSet, Button } from 'oks-ui'
import { Wallet, ArrowDownLeft, ArrowUpRight, PiggyBank } from 'lucide-react'
import {
  PageHeader,
  Panel,
  Surface,
  KpiCard,
  DataTable,
  ChartCard,
  StatusChip,
  TrendChip,
} from '../../Components/ui'
import { money } from '../../lib/format'
import { financeOverview, transactions, accounts } from '../../data/dashboards'

const bc = [{ label: 'Bilkoss', to: '/' }, { label: 'Dashboard' }, { label: 'Finance' }]

const TXN_COLS = [
  { key: 'party', header: 'Description', render: (r) => (
    <div>
      <div className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.party}</div>
      <div className="text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>{r.category} · {r.method}</div>
    </div>
  ) },
  { key: 'date', header: 'Date', sortable: true },
  { key: 'amount', header: 'Amount', align: 'right', sortable: true, sortValue: (r) => r.amount, render: (r) => (
    <span className="font-semibold" style={{ color: r.amount < 0 ? 'var(--app-fg-strong)' : 'var(--app-success)' }}>
      {r.amount < 0 ? '−' : '+'}{money(Math.abs(r.amount))}
    </span>
  ) },
  { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
]

export default function FinanceDashboard() {
  return (
    <>
      <PageHeader title="Finance" breadcrumbs={bc} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Surface className="xl:col-span-1" bodyClassName="p-5">
          <p className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: 'var(--app-fg-subtle)' }}>
            Total Balance
          </p>
          <p className="mt-2 text-[28px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
            {money(382200, { compact: true })}
          </p>
          <p className="mt-1"><TrendChip value={3.1} /> <span className="text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>this month</span></p>
        </Surface>
        <div className="grid grid-cols-2 gap-6 xl:col-span-2 xl:grid-cols-4">
          {accounts.map((a, i) => (
            <KpiCard
              key={a.label}
              label={a.label}
              value={money(a.value, { compact: true })}
              trend={a.delta}
              hint="30d"
              accent={a.color}
              icon={[<Wallet key="a" size={16} />, <PiggyBank key="b" size={16} />, <ArrowUpRight key="c" size={16} />, <ArrowDownLeft key="d" size={16} />][i]}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ChartCard
          className="xl:col-span-2"
          title="Financial Overview"
          type="area"
          data={financeOverview}
          x="month"
          series={[
            { key: 'income', name: 'Income' },
            { key: 'expense', name: 'Expense' },
          ]}
          palette={{ roles: ['success', 'danger'] }}
          height={380}
        />
        <Panel title="Quick Transfer">
          <Form onSubmit={() => {}} className="space-y-4">
            <FormFieldSet
              type="select"
              name="from"
              label="From account"
              options={accounts.map((a) => ({ label: a.label, value: a.label }))}
            />
            <FormFieldSet type="text" name="to" label="To (name or IBAN)" placeholder="Jane Cooper" />
            <FormFieldSet type="number" name="amount" label="Amount" placeholder="0.00" props={{ prefix: '$' }} />
            <Button type="submit" color="primary" fullWidth>
              Send transfer
            </Button>
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
