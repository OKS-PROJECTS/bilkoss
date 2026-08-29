import { EntityCell, StatusChip } from '../Components/ui'
import { money } from '../lib/format'
import * as D from './more'
import { products, orders, customers } from './ecommerce'
import { deals, transactions } from './dashboards'

const bcApp = (group, leaf) => [{ label: 'Bilkoss', to: '/' }, { label: group }, { label: leaf }]

const money0 = (v) => money(v, { compact: v >= 100000 })
const nameCell = (r) => <EntityCell name={r.name} sub={r.email || r.id} seed={r.id || r.name} />
const companyCell = (r) => <EntityCell name={r.name} sub={r.id} company />

export const LIST_CONFIGS = {
  '/apps/ecommerce/products': {
    title: 'Products', breadcrumbs: bcApp('Ecommerce', 'Products'),
    searchKeys: ['name', 'brand', 'sku'], selectable: true,
    stats: [
      { label: 'Products', value: '356', trend: 6.7 },
      { label: 'Active listings', value: '980', trend: 2.1 },
      { label: "Today's sales", value: '$2,856', trend: -4.5 },
      { label: 'Revenue', value: '$0.56M', trend: 8.2 },
    ],
    filters: [
      { label: 'Published', test: (r) => r.status === 'Published' },
      { label: 'Pending', test: (r) => r.status === 'Pending' },
      { label: 'Low stock', test: (r) => r.stock < 20 },
    ],
    columns: [
      { key: 'name', header: 'Product', render: (r) => <EntityCell name={r.name} sub={`By ${r.brand}`} icon={<span className="text-[11px] font-bold">{r.name[0]}</span>} /> },
      { key: 'sku', header: 'SKU' },
      { key: 'category', header: 'Category' },
      { key: 'stock', header: 'Stock', align: 'right', sortable: true },
      { key: 'price', header: 'Price', align: 'right', sortable: true, sortValue: (r) => r.price, render: (r) => money(r.price) },
      { key: 'orders', header: 'Orders', align: 'right', sortable: true },
      { key: 'rating', header: 'Rating', align: 'right' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
      { key: 'published', header: 'Published' },
    ],
    rows: products,
  },

  '/apps/ecommerce/orders': {
    title: 'Orders', breadcrumbs: bcApp('Ecommerce', 'Orders'),
    searchKeys: ['id', 'customer', 'email'], selectable: true,
    stats: [
      { label: 'Total orders', value: '1,280', trend: 4.1 },
      { label: 'Pending', value: '86', trend: -2.0 },
      { label: 'Completed', value: '1,024', trend: 6.6 },
      { label: 'Revenue', value: '$318k', trend: 3.3 },
    ],
    filters: [
      { label: 'Open', test: (r) => r.status !== 'Completed' && r.status !== 'Cancelled' },
      { label: 'Completed', test: (r) => r.status === 'Completed' },
      { label: 'Cancelled', test: (r) => r.status === 'Cancelled' },
    ],
    columns: [
      { key: 'id', header: '#ID', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-primary)' }}>#{r.id}</span> },
      { key: 'customer', header: 'Customer', render: (r) => <EntityCell name={r.customer} sub={r.email} seed={r.id} /> },
      { key: 'date', header: 'Date', sortable: true },
      { key: 'items', header: 'Items', align: 'right' },
      { key: 'amount', header: 'Amount', align: 'right', sortable: true, sortValue: (r) => r.amount, render: (r) => money(r.amount) },
      { key: 'payment', header: 'Payment' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: orders,
  },

  '/apps/ecommerce/customers': {
    title: 'Customers', breadcrumbs: bcApp('Ecommerce', 'Customers'),
    searchKeys: ['name', 'email', 'location'],
    columns: [
      { key: 'name', header: 'Customer', render: nameCell },
      { key: 'location', header: 'Location' },
      { key: 'orders', header: 'Orders', align: 'right', sortable: true },
      { key: 'spent', header: 'Spent', align: 'right', sortable: true, sortValue: (r) => r.spent, render: (r) => money(r.spent) },
      { key: 'joined', header: 'Joined' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: customers,
  },

  '/apps/ecommerce/categories': {
    title: 'Categories', breadcrumbs: bcApp('Ecommerce', 'Categories'), searchKeys: ['name'],
    columns: [
      { key: 'name', header: 'Category', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.name}</span> },
      { key: 'parent', header: 'Parent' },
      { key: 'products', header: 'Products', align: 'right', sortable: true },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status === 'Visible' ? 'Active' : 'On Hold'} /> },
    ],
    rows: D.categories,
  },

  '/apps/ecommerce/reviews': {
    title: 'Reviews', breadcrumbs: bcApp('Ecommerce', 'Reviews'), searchKeys: ['product', 'reviewer', 'title'],
    columns: [
      { key: 'product', header: 'Product', render: (r) => <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.product}</span> },
      { key: 'reviewer', header: 'Reviewer', render: (r) => <EntityCell name={r.reviewer} seed={r.id} sub={r.date} /> },
      { key: 'rating', header: 'Rating', align: 'right', render: (r) => `${r.rating}.0 / 5` },
      { key: 'title', header: 'Summary' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: D.reviews,
  },

  '/apps/ecommerce/refunds': {
    title: 'Refunds', breadcrumbs: bcApp('Ecommerce', 'Refunds'), searchKeys: ['id', 'customer'],
    columns: [
      { key: 'id', header: 'Order', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-primary)' }}>#{r.id}</span> },
      { key: 'customer', header: 'Customer', render: (r) => <EntityCell name={r.customer} sub={r.email} seed={r.id} /> },
      { key: 'date', header: 'Requested', sortable: true },
      { key: 'amount', header: 'Amount', align: 'right', render: (r) => money(r.amount) },
      { key: 'status', header: 'Status', render: () => <StatusChip status="Refunded" /> },
    ],
    rows: orders.filter((_, i) => i % 3 === 0),
  },

  '/apps/crm/contacts': {
    title: 'Contacts', breadcrumbs: bcApp('CRM', 'Contacts'), searchKeys: ['name', 'email', 'company'],
    columns: [
      { key: 'name', header: 'Name', render: nameCell },
      { key: 'company', header: 'Company' },
      { key: 'role', header: 'Role' },
      { key: 'phone', header: 'Phone' },
      { key: 'lastContact', header: 'Last contact', sortable: true },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: D.contacts,
  },

  '/apps/crm/leads': {
    title: 'Leads', breadcrumbs: bcApp('CRM', 'Leads'), searchKeys: ['name', 'company', 'source'],
    filters: [
      { label: 'New', test: (r) => r.status === 'New' },
      { label: 'Qualified', test: (r) => r.status === 'Qualified' },
    ],
    columns: [
      { key: 'name', header: 'Lead', render: (r) => <EntityCell name={r.name} sub={r.company} seed={r.id} /> },
      { key: 'source', header: 'Source' },
      { key: 'score', header: 'Score', align: 'right', sortable: true },
      { key: 'owner', header: 'Owner' },
      { key: 'created', header: 'Created', sortable: true },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: D.leadsData,
  },

  '/apps/crm/opportunities': {
    title: 'Opportunities', breadcrumbs: bcApp('CRM', 'Opportunities'), searchKeys: ['name', 'account'],
    columns: [
      { key: 'name', header: 'Opportunity', render: (r) => <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.name}</span> },
      { key: 'value', header: 'Value', align: 'right', sortable: true, sortValue: (r) => r.value, render: (r) => money0(r.value) },
      { key: 'probability', header: 'Win %', align: 'right', render: (r) => `${r.probability}%` },
      { key: 'stage', header: 'Stage', render: (r) => <StatusChip status={r.stage} /> },
      { key: 'close', header: 'Close date' },
    ],
    rows: D.opportunities,
  },

  '/apps/crm/deals': {
    title: 'Deals', breadcrumbs: bcApp('CRM', 'Deals'), searchKeys: ['name', 'owner'],
    columns: [
      { key: 'name', header: 'Deal', render: companyCell },
      { key: 'owner', header: 'Owner' },
      { key: 'value', header: 'Value', align: 'right', sortable: true, sortValue: (r) => r.value, render: (r) => money0(r.value) },
      { key: 'stage', header: 'Stage', render: (r) => <StatusChip status={r.stage} /> },
      { key: 'close', header: 'Close date' },
    ],
    rows: deals,
  },

  '/apps/crm/customers': {
    title: 'Customers', breadcrumbs: bcApp('CRM', 'Customers'), searchKeys: ['name', 'industry', 'location'],
    columns: [
      { key: 'name', header: 'Company', render: companyCell },
      { key: 'industry', header: 'Industry' },
      { key: 'location', header: 'Location' },
      { key: 'deals', header: 'Deals', align: 'right', sortable: true },
      { key: 'revenue', header: 'Revenue', align: 'right', sortable: true, sortValue: (r) => r.revenue, render: (r) => money0(r.revenue) },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status === 'Customer' ? 'Active' : r.status} /> },
    ],
    rows: D.companiesData,
  },

  '/apps/users/contacts': {
    title: 'Contacts', breadcrumbs: bcApp('Users', 'Contacts'), searchKeys: ['name', 'email', 'company'],
    columns: [
      { key: 'name', header: 'Name', render: nameCell },
      { key: 'company', header: 'Company' },
      { key: 'role', header: 'Role' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: D.contacts,
  },

  '/apps/invoice/list': {
    title: 'Invoices', breadcrumbs: bcApp('Invoice', 'Invoices'), searchKeys: ['id', 'client'], selectable: true,
    filters: [
      { label: 'Paid', test: (r) => r.status === 'Paid' },
      { label: 'Overdue', test: (r) => r.status === 'Overdue' },
      { label: 'Draft', test: (r) => r.status === 'Draft' },
    ],
    stats: [
      { label: 'Outstanding', value: '$48.2k', trend: -3.1 },
      { label: 'Paid (30d)', value: '$126k', trend: 7.4 },
      { label: 'Overdue', value: '$12.6k', trend: 1.9 },
      { label: 'Drafts', value: '4' },
    ],
    columns: [
      { key: 'id', header: 'Invoice', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-primary)' }}>{r.id}</span> },
      { key: 'client', header: 'Client', render: (r) => <EntityCell name={r.client} company /> },
      { key: 'issued', header: 'Issued', sortable: true },
      { key: 'due', header: 'Due', sortable: true },
      { key: 'amount', header: 'Amount', align: 'right', sortable: true, sortValue: (r) => r.amount, render: (r) => money(r.amount) },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: D.invoices,
  },

  '/apps/finance/expenses': {
    title: 'Expenses', breadcrumbs: bcApp('Finance', 'Expenses'), searchKeys: ['vendor', 'category'],
    columns: [
      { key: 'vendor', header: 'Vendor', render: (r) => <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.vendor}</span> },
      { key: 'category', header: 'Category' },
      { key: 'date', header: 'Date', sortable: true },
      { key: 'method', header: 'Method' },
      { key: 'amount', header: 'Amount', align: 'right', sortable: true, sortValue: (r) => r.amount, render: (r) => money(r.amount) },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: D.expenses,
  },

  '/apps/finance/transactions': {
    title: 'Transactions', breadcrumbs: bcApp('Finance', 'Transactions'), searchKeys: ['party', 'category'],
    columns: [
      { key: 'party', header: 'Description', render: (r) => <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.party}</span> },
      { key: 'category', header: 'Category' },
      { key: 'date', header: 'Date', sortable: true },
      { key: 'method', header: 'Method' },
      { key: 'amount', header: 'Amount', align: 'right', sortable: true, sortValue: (r) => r.amount, render: (r) => (
        <span className="font-semibold" style={{ color: r.amount < 0 ? 'var(--app-fg-strong)' : 'var(--app-success)' }}>
          {r.amount < 0 ? '−' : '+'}{money(Math.abs(r.amount))}
        </span>
      ) },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: transactions,
  },

  '/apps/hrm/staff': {
    title: 'Staff', breadcrumbs: bcApp('HRM', 'Staff'), searchKeys: ['name', 'email', 'department'],
    filters: [
      { label: 'Active', test: (r) => r.status === 'Active' },
      { label: 'On leave', test: (r) => r.status === 'On Leave' },
    ],
    columns: [
      { key: 'name', header: 'Employee', render: nameCell },
      { key: 'department', header: 'Department' },
      { key: 'title', header: 'Title' },
      { key: 'joined', header: 'Joined', sortable: true },
      { key: 'salary', header: 'Salary', align: 'right', sortable: true, sortValue: (r) => r.salary, render: (r) => money0(r.salary) },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status === 'On Leave' ? 'On Hold' : r.status} /> },
    ],
    rows: D.staff,
  },

  '/apps/support/tickets': {
    title: 'Tickets', breadcrumbs: bcApp('Support', 'Tickets'), searchKeys: ['id', 'subject', 'requester'],
    filters: [
      { label: 'Open', test: (r) => r.status === 'Open' },
      { label: 'Pending', test: (r) => r.status === 'Pending' },
      { label: 'Closed', test: (r) => r.status === 'Closed' },
    ],
    stats: [
      { label: 'Open tickets', value: '42', trend: -8.0, invertTrend: true },
      { label: 'Avg. first reply', value: '1h 12m', trend: -14 },
      { label: 'Resolved (7d)', value: '156', trend: 6 },
      { label: 'CSAT', value: '94%', trend: 1.2 },
    ],
    columns: [
      { key: 'id', header: 'Ticket', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-primary)' }}>{r.id}</span> },
      { key: 'subject', header: 'Subject', render: (r) => <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.subject}</span> },
      { key: 'requester', header: 'Requester' },
      { key: 'agent', header: 'Agent' },
      { key: 'priority', header: 'Priority', render: (r) => <StatusChip status={r.priority === 'Urgent' || r.priority === 'High' ? 'Overdue' : r.priority === 'Normal' ? 'Pending' : 'Completed'} /> },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
      { key: 'updated', header: 'Updated' },
    ],
    rows: D.tickets,
  },

  '/apps/promo/coupons': {
    title: 'Coupons', breadcrumbs: bcApp('Promo', 'Coupons'), searchKeys: ['code', 'type'],
    columns: [
      { key: 'code', header: 'Code', render: (r) => <span className="rounded px-1.5 py-0.5 font-mono text-[12px] font-semibold" style={{ background: 'var(--app-surface-2)', color: 'var(--app-fg-strong)' }}>{r.code}</span> },
      { key: 'type', header: 'Type' },
      { key: 'value', header: 'Value', align: 'right' },
      { key: 'used', header: 'Used', align: 'right', sortable: true, render: (r) => `${r.used} / ${r.limit}` },
      { key: 'expires', header: 'Expires' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status === 'Expired' ? 'Closed' : r.status} /> },
    ],
    rows: D.coupons,
  },

  '/apps/more/companies': {
    title: 'Companies', breadcrumbs: bcApp('More Apps', 'Companies'), searchKeys: ['name', 'industry'],
    columns: [
      { key: 'name', header: 'Company', render: companyCell },
      { key: 'industry', header: 'Industry' },
      { key: 'size', header: 'Size' },
      { key: 'location', header: 'Location' },
      { key: 'revenue', header: 'Revenue', align: 'right', sortable: true, sortValue: (r) => r.revenue, render: (r) => money0(r.revenue) },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status === 'Customer' ? 'Active' : r.status} /> },
    ],
    rows: D.companiesData,
  },

  '/apps/more/clients': {
    title: 'Clients', breadcrumbs: bcApp('More Apps', 'Clients'), searchKeys: ['name', 'industry'],
    columns: [
      { key: 'name', header: 'Client', render: companyCell },
      { key: 'industry', header: 'Industry' },
      { key: 'deals', header: 'Projects', align: 'right' },
      { key: 'revenue', header: 'Billed', align: 'right', render: (r) => money0(r.revenue) },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status === 'Customer' ? 'Active' : r.status} /> },
    ],
    rows: D.companiesData,
  },

  '/apps/more/api-keys': {
    title: 'API Keys', breadcrumbs: bcApp('More Apps', 'API Keys'), searchKeys: ['name', 'prefix'], primaryAction: 'Generate key',
    columns: [
      { key: 'name', header: 'Name', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.name}</span> },
      { key: 'prefix', header: 'Key', render: (r) => <span className="font-mono text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>{r.prefix}••••</span> },
      { key: 'scope', header: 'Scope' },
      { key: 'created', header: 'Created' },
      { key: 'lastUsed', header: 'Last used' },
      { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
    ],
    rows: D.apiKeys,
  },
}
