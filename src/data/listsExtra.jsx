import { EntityCell, StatusChip } from '../Components/ui'
import { money, fmtDate, daysAgo, rng } from '../lib/format'
import * as D from './more'

const bc = (group, leaf) => [{ label: 'Bilkoss', to: '/' }, { label: group }, { label: leaf }]
const rows = (n, fn) => Array.from({ length: n }, (_, i) => fn(i))

export const EXTRA_LIST_CONFIGS = {
  '/apps/ecommerce/sellers': {
    title: 'Sellers', breadcrumbs: bc('Ecommerce', 'Sellers'), searchKeys: ['name'],
    columns: [
      { key: 'name', header: 'Seller', render: (r) => <EntityCell name={r.name} sub={r.id} company /> },
      { key: 'products', header: 'Products', align: 'right', sortable: true },
      { key: 'rating', header: 'Rating', align: 'right' },
      { key: 'sales', header: 'Sales (30d)', align: 'right', render: (r) => money(r.sales, { compact: true }) },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: rows(16, (i) => ({
      id: `SLR-${200 + i}`, name: D.company(i), products: 40 + ((i * 23) % 180),
      rating: (3.9 + rng(i) * 1).toFixed(1), sales: 18000 + i * 6400, status: i % 5 === 0 ? 'On Hold' : 'Active',
    })),
  },
  '/apps/ecommerce/warehouse': {
    title: 'Warehouse', breadcrumbs: bc('Ecommerce', 'Warehouse'), searchKeys: ['name', 'location'],
    columns: [
      { key: 'name', header: 'Warehouse', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.name}</span> },
      { key: 'location', header: 'Location' },
      { key: 'capacity', header: 'Capacity', align: 'right', render: (r) => `${r.used}% used` },
      { key: 'skus', header: 'SKUs', align: 'right', sortable: true },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: rows(8, (i) => ({
      id: i, name: ['Oakland DC', 'Newark DC', 'Dallas DC', 'Reno DC', 'Atlanta DC', 'Columbus DC', 'Phoenix DC', 'Chicago DC'][i],
      location: ['CA', 'NJ', 'TX', 'NV', 'GA', 'OH', 'AZ', 'IL'][i], used: 40 + ((i * 13) % 55), skus: 800 + i * 340,
      status: i === 3 ? 'On Hold' : 'Active',
    })),
  },
  '/apps/ecommerce/product-stocks': {
    title: 'Product Stocks', breadcrumbs: bc('Ecommerce', 'Product Stocks'), searchKeys: ['name', 'sku'],
    filters: [{ label: 'Low stock', test: (r) => r.qty < 20 }, { label: 'Out of stock', test: (r) => r.qty === 0 }],
    columns: [
      { key: 'name', header: 'Product', render: (r) => <EntityCell name={r.name} sub={r.sku} icon={<span className="text-[11px] font-bold">{r.name[0]}</span>} /> },
      { key: 'warehouse', header: 'Warehouse' },
      { key: 'qty', header: 'On hand', align: 'right', sortable: true },
      { key: 'reserved', header: 'Reserved', align: 'right' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.qty === 0 ? 'Out of Stock' : r.qty < 20 ? 'Low Stock' : 'In Stock'} /> },
    ],
    rows: D.reviews.map((r, i) => ({ id: i, name: r.product, sku: `SK-${900 + i}`, warehouse: ['Oakland DC', 'Newark DC', 'Dallas DC'][i % 3], qty: [0, 8, 14, 40, 62, 120][i % 6], reserved: 2 + (i % 6) })),
  },
  '/apps/ecommerce/purchased-orders': {
    title: 'Purchased Orders', breadcrumbs: bc('Ecommerce', 'Purchased Orders'), searchKeys: ['id', 'supplier'],
    columns: [
      { key: 'id', header: 'PO', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-primary)' }}>{r.id}</span> },
      { key: 'supplier', header: 'Supplier' },
      { key: 'date', header: 'Ordered', sortable: true },
      { key: 'total', header: 'Total', align: 'right', sortable: true, sortValue: (r) => r.total, render: (r) => money(r.total) },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: rows(14, (i) => ({ id: `PO-${4400 + i}`, supplier: D.company(i + 2), date: fmtDate(daysAgo(i * 3 + 2)), total: 2400 + i * 1800, status: ['Completed', 'Pending', 'Processing', 'Cancelled'][i % 4] })),
  },
  '/apps/ecommerce/attributes': {
    title: 'Attributes', breadcrumbs: bc('Ecommerce', 'Attributes'), searchKeys: ['name'],
    columns: [
      { key: 'name', header: 'Attribute', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.name}</span> },
      { key: 'values', header: 'Values' },
      { key: 'products', header: 'Products', align: 'right', sortable: true },
      { key: 'type', header: 'Type' },
    ],
    rows: [
      { id: 1, name: 'Colour', values: 'Oak, Walnut, Charcoal, Ivory', products: 214, type: 'Swatch' },
      { id: 2, name: 'Material', values: 'Fabric, Leather, Velvet', products: 188, type: 'Select' },
      { id: 3, name: 'Size', values: '2-seat, 3-seat, Sectional', products: 96, type: 'Select' },
      { id: 4, name: 'Assembly', values: 'Flat-pack, Pre-assembled', products: 142, type: 'Toggle' },
      { id: 5, name: 'Warranty', values: '1 year, 3 years, 5 years', products: 260, type: 'Select' },
    ],
  },
  '/apps/crm/proposals': {
    title: 'Proposals', breadcrumbs: bc('CRM', 'Proposals'), searchKeys: ['id', 'client'],
    columns: [
      { key: 'id', header: 'Proposal', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-primary)' }}>{r.id}</span> },
      { key: 'client', header: 'Client', render: (r) => <EntityCell name={r.client} company /> },
      { key: 'value', header: 'Value', align: 'right', sortable: true, sortValue: (r) => r.value, render: (r) => money(r.value, { compact: true }) },
      { key: 'sent', header: 'Sent', sortable: true },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: rows(14, (i) => ({ id: `PRP-${700 + i}`, client: D.company(i), value: 8000 + i * 3200, sent: fmtDate(daysAgo(i * 4)), status: ['Draft', 'Pending', 'Approved', 'Rejected'][i % 4] })),
  },
  '/apps/crm/estimations': {
    title: 'Estimations', breadcrumbs: bc('CRM', 'Estimations'), searchKeys: ['id', 'client'],
    columns: [
      { key: 'id', header: 'Estimate', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-primary)' }}>{r.id}</span> },
      { key: 'client', header: 'Client', render: (r) => <EntityCell name={r.client} company /> },
      { key: 'hours', header: 'Hours', align: 'right' },
      { key: 'value', header: 'Est. value', align: 'right', sortable: true, sortValue: (r) => r.value, render: (r) => money(r.value) },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: rows(12, (i) => ({ id: `EST-${300 + i}`, client: D.company(i + 3), hours: 40 + i * 12, value: 6000 + i * 1900, status: ['Draft', 'Pending', 'Approved'][i % 3] })),
  },
  '/apps/crm/campaign': {
    title: 'Campaigns', breadcrumbs: bc('CRM', 'Campaign'), searchKeys: ['name', 'channel'],
    columns: [
      { key: 'name', header: 'Campaign', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.name}</span> },
      { key: 'channel', header: 'Channel' },
      { key: 'sent', header: 'Sent', align: 'right', render: (r) => r.sent.toLocaleString() },
      { key: 'open', header: 'Open rate', align: 'right' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: rows(10, (i) => ({ id: i, name: ['Summer Deals', 'Back to Office', 'Referral Push', 'Win-back', 'New Arrivals', 'Loyalty Boost', 'Flash Weekend', 'Holiday Preview', 'Re-engagement', 'VIP Preview'][i], channel: ['Email', 'SMS', 'Push', 'Email'][i % 4], sent: 4200 + i * 1800, open: `${28 + (i % 20)}%`, status: ['Active', 'Scheduled', 'Completed', 'Draft'][i % 4] })),
  },
  '/apps/crm/activities': {
    title: 'Activities', breadcrumbs: bc('CRM', 'Activities'), searchKeys: ['who', 'type'],
    columns: [
      { key: 'type', header: 'Type', render: (r) => <StatusChip status={r.type === 'Call' ? 'Completed' : r.type === 'Email' ? 'Pending' : 'New'} /> },
      { key: 'who', header: 'Contact', render: (r) => <EntityCell name={r.who} seed={r.who} /> },
      { key: 'summary', header: 'Summary' },
      { key: 'when', header: 'When', sortable: true },
    ],
    rows: rows(16, (i) => ({ id: i, type: ['Call', 'Email', 'Meeting', 'Note'][i % 4], who: D.person(i), summary: ['Discussed renewal terms', 'Sent pricing sheet', 'Demo of reporting module', 'Left voicemail', 'Follow-up on proposal'][i % 5], when: fmtDate(daysAgo(i)) })),
  },
  '/apps/finance/income': {
    title: 'Income', breadcrumbs: bc('Finance', 'Income'), searchKeys: ['source', 'category'],
    columns: [
      { key: 'source', header: 'Source', render: (r) => <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.source}</span> },
      { key: 'category', header: 'Category' },
      { key: 'date', header: 'Date', sortable: true },
      { key: 'amount', header: 'Amount', align: 'right', sortable: true, sortValue: (r) => r.amount, render: (r) => <span className="font-semibold" style={{ color: 'var(--app-success)' }}>+{money(r.amount)}</span> },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: rows(16, (i) => ({ id: i, source: D.company(i), category: ['Subscription', 'Services', 'One-off', 'Subscription'][i % 4], date: fmtDate(daysAgo(i * 2)), amount: 1200 + i * 640, status: ['Completed', 'Pending'][i % 2] })),
  },
  '/apps/finance/expense-category': {
    title: 'Expense Categories', breadcrumbs: bc('Finance', 'Expense Category'), searchKeys: ['name'],
    columns: [
      { key: 'name', header: 'Category', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.name}</span> },
      { key: 'count', header: 'Transactions', align: 'right', sortable: true },
      { key: 'total', header: 'Total (YTD)', align: 'right', sortable: true, sortValue: (r) => r.total, render: (r) => money(r.total, { compact: true }) },
      { key: 'budget', header: 'Budget', align: 'right', render: (r) => `${r.pct}% used` },
    ],
    rows: [
      { id: 1, name: 'Software', count: 148, total: 84200, pct: 71 },
      { id: 2, name: 'Infrastructure', count: 96, total: 128400, pct: 88 },
      { id: 3, name: 'Payroll', count: 24, total: 642000, pct: 66 },
      { id: 4, name: 'Marketing', count: 62, total: 96800, pct: 54 },
      { id: 5, name: 'Travel', count: 31, total: 22400, pct: 37 },
      { id: 6, name: 'Office', count: 44, total: 18600, pct: 42 },
    ],
  },
  '/apps/finance/banks-cards': {
    title: 'Banks & Cards', breadcrumbs: bc('Finance', 'Banks & Cards'), searchKeys: ['name'],
    columns: [
      { key: 'name', header: 'Account', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.name}</span> },
      { key: 'type', header: 'Type' },
      { key: 'number', header: 'Number', render: (r) => <span className="font-mono text-[12px]">{r.number}</span> },
      { key: 'balance', header: 'Balance', align: 'right', sortable: true, sortValue: (r) => r.balance, render: (r) => money(r.balance) },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: [
      { id: 1, name: 'Chase Operating', type: 'Checking', number: '•••• 4021', balance: 184320, status: 'Active' },
      { id: 2, name: 'Chase Savings', type: 'Savings', number: '•••• 8890', balance: 92600, status: 'Active' },
      { id: 3, name: 'Amex Business', type: 'Credit card', number: '•••• 1180', balance: -8420, status: 'Active' },
      { id: 4, name: 'Brex Card', type: 'Credit card', number: '•••• 3345', balance: -2210, status: 'Active' },
      { id: 5, name: 'Wise USD', type: 'Multi-currency', number: '•••• 7712', balance: 41880, status: 'On Hold' },
    ],
  },
  '/apps/hrm/departments': {
    title: 'Departments', breadcrumbs: bc('HRM', 'Departments'), searchKeys: ['name', 'lead'],
    columns: [
      { key: 'name', header: 'Department', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.name}</span> },
      { key: 'lead', header: 'Lead' },
      { key: 'headcount', header: 'Headcount', align: 'right', sortable: true },
      { key: 'open', header: 'Open roles', align: 'right' },
      { key: 'budget', header: 'Budget', align: 'right', render: (r) => money(r.budget, { compact: true }) },
    ],
    rows: [
      { id: 1, name: 'Engineering', lead: 'Marcus Cole', headcount: 34, open: 4, budget: 4200000 },
      { id: 2, name: 'Design', lead: 'Alicia Diaz', headcount: 9, open: 1, budget: 980000 },
      { id: 3, name: 'Sales', lead: 'Rae Shaw', headcount: 18, open: 3, budget: 2100000 },
      { id: 4, name: 'Marketing', lead: 'Kendall Ward', headcount: 11, open: 0, budget: 1400000 },
      { id: 5, name: 'Support', lead: 'Tomas Foster', headcount: 14, open: 2, budget: 980000 },
      { id: 6, name: 'Finance', lead: 'Priya Nair', headcount: 6, open: 0, budget: 720000 },
    ],
  },
  '/apps/hrm/attendance': {
    title: 'Attendance', breadcrumbs: bc('HRM', 'Attendance'), searchKeys: ['name'],
    columns: [
      { key: 'name', header: 'Employee', render: (r) => <EntityCell name={r.name} seed={r.name} /> },
      { key: 'in', header: 'Clock in' },
      { key: 'out', header: 'Clock out' },
      { key: 'hours', header: 'Hours', align: 'right' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: D.staff.slice(0, 16).map((s, i) => ({ id: s.id, name: s.name, in: i % 7 === 0 ? '—' : `0${8 + (i % 2)}:${(i * 7) % 60 < 10 ? '0' : ''}${(i * 7) % 60} AM`, out: i % 7 === 0 ? '—' : `0${5 + (i % 2)}:${(i * 11) % 60 < 10 ? '0' : ''}${(i * 11) % 60} PM`, hours: i % 7 === 0 ? '0.0' : (8 + (i % 3) * 0.5).toFixed(1), status: i % 7 === 0 ? 'On Hold' : i % 4 === 0 ? 'Pending' : 'Completed' })),
  },
  '/apps/hrm/holidays': {
    title: 'Holidays', breadcrumbs: bc('HRM', 'Holidays'), searchKeys: ['name'],
    columns: [
      { key: 'name', header: 'Holiday', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.name}</span> },
      { key: 'date', header: 'Date', sortable: true },
      { key: 'day', header: 'Day' },
      { key: 'region', header: 'Region' },
    ],
    rows: [
      { id: 1, name: 'Labor Day', date: '1 Sep 2026', day: 'Monday', region: 'US' },
      { id: 2, name: 'Thanksgiving', date: '26 Nov 2026', day: 'Thursday', region: 'US' },
      { id: 3, name: 'Christmas Day', date: '25 Dec 2026', day: 'Friday', region: 'Global' },
      { id: 4, name: 'New Year’s Day', date: '1 Jan 2027', day: 'Friday', region: 'Global' },
      { id: 5, name: 'Founders Day', date: '14 Feb 2027', day: 'Sunday', region: 'Company' },
    ],
  },
  '/apps/hrm/payroll': {
    title: 'Payroll', breadcrumbs: bc('HRM', 'Payroll'), searchKeys: ['name'],
    stats: [
      { label: 'Gross this run', value: '$482,900', trend: 1.2 },
      { label: 'Net paid', value: '$361,240', trend: 1.1 },
      { label: 'Employees', value: '92' },
      { label: 'Next run', value: 'Sep 30' },
    ],
    columns: [
      { key: 'name', header: 'Employee', render: (r) => <EntityCell name={r.name} sub={r.dept} seed={r.name} /> },
      { key: 'gross', header: 'Gross', align: 'right', render: (r) => money(r.gross) },
      { key: 'tax', header: 'Tax', align: 'right', render: (r) => money(r.tax) },
      { key: 'net', header: 'Net', align: 'right', sortable: true, sortValue: (r) => r.net, render: (r) => <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{money(r.net)}</span> },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: D.staff.map((s, i) => {
      const gross = Math.round(s.salary / 12)
      const tax = Math.round(gross * 0.26)
      return { id: s.id, name: s.name, dept: s.department, gross, tax, net: gross - tax, status: i % 6 === 0 ? 'Pending' : 'Completed' }
    }),
  },
  '/apps/hrm/leaves': {
    title: 'Leaves', breadcrumbs: bc('HRM', 'Leaves'), searchKeys: ['name', 'type'],
    filters: [{ label: 'Pending', test: (r) => r.status === 'Pending' }, { label: 'Approved', test: (r) => r.status === 'Approved' }],
    columns: [
      { key: 'name', header: 'Employee', render: (r) => <EntityCell name={r.name} seed={r.name} /> },
      { key: 'type', header: 'Type' },
      { key: 'from', header: 'From', sortable: true },
      { key: 'days', header: 'Days', align: 'right' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: D.staff.slice(0, 14).map((s, i) => ({ id: s.id, name: s.name, type: ['Annual', 'Sick', 'Unpaid', 'Parental'][i % 4], from: fmtDate(daysAgo(-(3 + i * 4))), days: 1 + (i % 5), status: ['Pending', 'Approved', 'Rejected', 'Approved'][i % 4] })),
  },
  '/apps/promo/gift-cards': {
    title: 'Gift Cards', breadcrumbs: bc('Promo', 'Gift Cards'), searchKeys: ['code'],
    columns: [
      { key: 'code', header: 'Card', render: (r) => <span className="rounded px-1.5 py-0.5 font-mono text-[12px] font-semibold" style={{ background: 'var(--app-surface-2)', color: 'var(--app-fg-strong)' }}>{r.code}</span> },
      { key: 'initial', header: 'Initial', align: 'right', render: (r) => money(r.initial) },
      { key: 'balance', header: 'Balance', align: 'right', sortable: true, sortValue: (r) => r.balance, render: (r) => money(r.balance) },
      { key: 'issued', header: 'Issued' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: rows(14, (i) => ({ id: i, code: `GC-${(rng(i) * 1e6 | 0).toString().padStart(6, '0')}`, initial: [25, 50, 100, 100, 250][i % 5], balance: [25, 12, 100, 0, 180][i % 5], issued: fmtDate(daysAgo(i * 6 + 4)), status: [0, 100, 180].includes([25, 12, 100, 0, 180][i % 5]) ? 'Active' : 'Active' })),
  },
  '/apps/promo/discounts': {
    title: 'Discounts', breadcrumbs: bc('Promo', 'Discounts'), searchKeys: ['name'],
    columns: [
      { key: 'name', header: 'Rule', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.name}</span> },
      { key: 'applies', header: 'Applies to' },
      { key: 'amount', header: 'Amount', align: 'right' },
      { key: 'window', header: 'Window' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: [
      { id: 1, name: 'Volume 10+', applies: 'All furniture', amount: '10%', window: 'Always', status: 'Active' },
      { id: 2, name: 'Clearance', applies: 'Tagged: clearance', amount: '30%', window: 'Sep 1 – Sep 30', status: 'Active' },
      { id: 3, name: 'First order', applies: 'New customers', amount: '$15', window: 'Always', status: 'Active' },
      { id: 4, name: 'Bundle deal', applies: 'Sofa + table', amount: '$60', window: 'Aug 1 – Sep 15', status: 'Scheduled' },
      { id: 5, name: 'Weekend flash', applies: 'Sitewide', amount: '20%', window: 'Ended', status: 'Closed' },
    ],
  },
  '/apps/more/vote-list': {
    title: 'Vote List', breadcrumbs: bc('More Apps', 'Vote List'), searchKeys: ['title'],
    columns: [
      { key: 'title', header: 'Proposal', render: (r) => <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.title}</span> },
      { key: 'author', header: 'Raised by' },
      { key: 'up', header: 'Votes', align: 'right', sortable: true },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: rows(12, (i) => ({ id: i, title: ['Adopt trunk-based dev', 'Move standup to async', 'Quarterly hack weeks', 'Public changelog', 'Open-source the CLI', 'Add a design ops role', '4-day trial in Q4', 'Sponsor a11y audit', 'Rotate on-call weekly', 'Kill the staging env', 'Dogfood mobile builds', 'Write ADRs'][i], author: D.person(i), up: 60 - i * 4, status: ['Open', 'Open', 'Closed', 'Pending'][i % 4] })),
  },
  '/apps/more/issue-tracker': {
    title: 'Issue Tracker', breadcrumbs: bc('More Apps', 'Issue Tracker'), searchKeys: ['id', 'title'],
    filters: [{ label: 'Open', test: (r) => r.status !== 'Closed' }, { label: 'Bugs', test: (r) => r.type === 'Bug' }],
    columns: [
      { key: 'id', header: 'ID', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-primary)' }}>{r.id}</span> },
      { key: 'title', header: 'Title', render: (r) => <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.title}</span> },
      { key: 'type', header: 'Type' },
      { key: 'assignee', header: 'Assignee' },
      { key: 'priority', header: 'Priority', render: (r) => <StatusChip status={r.priority === 'P0' || r.priority === 'P1' ? 'Overdue' : 'Pending'} /> },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: rows(18, (i) => ({ id: `BUG-${520 + i}`, title: D.tickets[i % D.tickets.length].subject, type: ['Bug', 'Task', 'Chore'][i % 3], assignee: D.person(i), priority: ['P0', 'P1', 'P2', 'P3'][i % 4], status: ['Open', 'In Progress', 'Review', 'Closed'][i % 4] })),
  },
  '/apps/more/manage': {
    title: 'Manage Apps', breadcrumbs: bc('More Apps', 'Manage Apps'), searchKeys: ['name'],
    columns: [
      { key: 'name', header: 'App', render: (r) => <EntityCell name={r.name} sub={r.category} company /> },
      { key: 'installed', header: 'Installed' },
      { key: 'scope', header: 'Scope' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: rows(12, (i) => ({ id: i, name: ['Slack', 'Stripe', 'Figma', 'Linear', 'Segment', 'Intercom', 'Zapier', 'Datadog', 'PagerDuty', 'Notion', 'HubSpot', 'Snowflake'][i], category: ['Chat', 'Payments', 'Design', 'Issues', 'Data', 'Support', 'Automation', 'Monitoring', 'On-call', 'Docs', 'CRM', 'Warehouse'][i], installed: fmtDate(daysAgo(20 + i * 25)), scope: ['Workspace', 'Org', 'Team'][i % 3], status: i === 5 ? 'On Hold' : 'Active' })),
  },
  '/apps/users/roles': {
    title: 'Roles', breadcrumbs: bc('Users', 'Roles'), searchKeys: ['name'],
    columns: [
      { key: 'name', header: 'Role', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.name}</span> },
      { key: 'members', header: 'Members', align: 'right', sortable: true },
      { key: 'scope', header: 'Scope' },
      { key: 'system', header: 'System', render: (r) => (r.system ? 'Yes' : 'No') },
    ],
    rows: [
      { id: 1, name: 'Administrator', members: 4, scope: 'Organization', system: true },
      { id: 2, name: 'Manager', members: 12, scope: 'Team', system: false },
      { id: 3, name: 'Editor', members: 28, scope: 'Team', system: false },
      { id: 4, name: 'Analyst', members: 9, scope: 'Read-only', system: false },
      { id: 5, name: 'Billing', members: 3, scope: 'Billing', system: true },
      { id: 6, name: 'Guest', members: 17, scope: 'Limited', system: true },
    ],
  },
}
