import { Avatar, Button } from 'oks-ui'
import { Surface, StatusChip } from '../Components/ui'
import { money, avatarUrl } from '../lib/format'
import { products, orders } from './ecommerce'
import { invoices, staff, companiesData, tickets } from './more'

const bc = (group, leaf) => [{ label: 'Bilkoss', to: '/' }, { label: group }, { label: leaf }]

const ProfileHeader = ({ name, sub, meta, tag }) => (
  <Surface bodyClassName="p-5">
    <div className="flex flex-wrap items-center gap-4">
      <Avatar name={name} src={avatarUrl(name)} size="lg" showFallback />
      <div className="min-w-0 flex-1">
        <h2 className="font-display text-[18px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>{name}</h2>
        <p className="text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>{sub}</p>
      </div>
      {tag && <StatusChip status={tag} />}
      <div className="flex gap-2">
        <Button size="sm" variant="bordered" color="default">Message</Button>
        <Button size="sm" color="primary">Edit</Button>
      </div>
    </div>
    {meta && (
      <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-4" style={{ borderColor: 'var(--app-border)' }}>
        {meta.map((m) => (
          <div key={m.label}>
            <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--app-fg-subtle)' }}>{m.label}</p>
            <p className="mt-0.5 text-[14px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{m.value}</p>
          </div>
        ))}
      </div>
    )}
  </Surface>
)

const p0 = products[0]
const o0 = orders[0]
const inv0 = invoices[0]
const s0 = staff[0]
const co0 = companiesData[0]
const tk0 = tickets[0]

export const DETAIL_CONFIGS = {
  '/apps/ecommerce/product-details': {
    title: 'Product Details', breadcrumbs: bc('Ecommerce', 'Product Details'),
    sections: [
      { title: 'Overview', rows: [
        { label: 'Name', value: p0.name }, { label: 'SKU', value: p0.sku },
        { label: 'Brand', value: p0.brand }, { label: 'Category', value: p0.category },
        { label: 'Price', value: money(p0.price) }, { label: 'Stock', value: `${p0.stock} units` },
        { label: 'Status', value: <StatusChip status={p0.status} /> }, { label: 'Published', value: p0.published },
      ] },
      { title: 'Description', rows: [
        { label: 'Summary', value: 'Hand-finished frame with high-resilience foam cushions and a stain-resistant woven cover. Ships flat-packed with tools included.' },
      ] },
    ],
    aside: [
      { title: 'Performance', rows: [
        { label: 'Units sold (30d)', value: '214' }, { label: 'Revenue (30d)', value: money(214 * p0.price, { compact: true }) },
        { label: 'Return rate', value: '2.1%' }, { label: 'Avg. rating', value: `${p0.rating} / 5` },
      ] },
    ],
  },

  '/apps/ecommerce/order-details': {
    title: 'Order Details', breadcrumbs: bc('Ecommerce', 'Order Details'),
    header: <ProfileHeader name={o0.customer} sub={o0.email} tag={o0.status} meta={[
      { label: 'Order', value: `#${o0.id}` }, { label: 'Date', value: o0.date },
      { label: 'Items', value: o0.items }, { label: 'Total', value: money(o0.amount) },
    ]} />,
    sections: [
      { title: 'Items', rows: products.slice(0, 3).map((p) => ({ label: p.name, value: `${money(p.price)} × 1` })) },
      { title: 'Payment', rows: [
        { label: 'Method', value: o0.payment }, { label: 'Status', value: <StatusChip status="Completed" /> },
        { label: 'Subtotal', value: money(o0.amount - 12) }, { label: 'Shipping', value: money(12) },
      ] },
    ],
    aside: [
      { title: 'Shipping address', rows: [
        { label: 'Recipient', value: o0.customer }, { label: 'Address', value: '4517 Washington Ave, Manchester, KY 39495' },
        { label: 'Carrier', value: 'UPS Ground' }, { label: 'Tracking', value: '1Z 999 AA1 01 2345 6784' },
      ] },
    ],
  },

  '/apps/ecommerce/seller-details': {
    title: 'Seller Details', breadcrumbs: bc('Ecommerce', 'Seller Details'),
    header: <ProfileHeader name="Homeluxe Furnishings" sub="Verified seller since 2022" tag="Active" meta={[
      { label: 'Products', value: '142' }, { label: 'Rating', value: '4.7 / 5' },
      { label: 'Sales (30d)', value: '$86.4k' }, { label: 'Fulfilment', value: '98.2%' },
    ]} />,
    sections: [
      { title: 'Business', rows: [
        { label: 'Legal name', value: 'Homeluxe Furnishings LLC' }, { label: 'Tax ID', value: 'US-84-2910township' },
        { label: 'Contact', value: 'ops@homeluxe.example' }, { label: 'Phone', value: '+1 (415) 555-0142' },
        { label: 'Warehouse', value: 'Oakland, CA' }, { label: 'Payout cycle', value: 'Weekly' },
      ] },
    ],
    aside: [{ title: 'Compliance', rows: [
      { label: 'KYC', value: <StatusChip status="Completed" /> }, { label: 'Bank verified', value: <StatusChip status="Completed" /> },
      { label: 'Open disputes', value: '0' },
    ] }],
  },

  '/apps/invoice/details': {
    title: 'Single Invoice', breadcrumbs: bc('Invoice', 'Single Invoice'),
    sections: [
      { title: `Invoice ${inv0.id}`, rows: [
        { label: 'Bill to', value: inv0.client }, { label: 'Status', value: <StatusChip status={inv0.status} /> },
        { label: 'Issued', value: inv0.issued }, { label: 'Due', value: inv0.due },
      ] },
      { title: 'Line items', rows: [
        { label: 'Design retainer — August', value: money(4800) },
        { label: 'Additional revisions (6h)', value: money(900) },
        { label: 'Subtotal', value: money(5700) },
        { label: 'Tax (8%)', value: money(456) },
        { label: 'Total due', value: <strong>{money(inv0.amount)}</strong> },
      ] },
    ],
    aside: [{ title: 'Actions', content: (
      <div className="flex flex-col gap-2">
        <Button color="primary" fullWidth>Send invoice</Button>
        <Button variant="bordered" color="default" fullWidth>Download PDF</Button>
        <Button variant="bordered" color="default" fullWidth>Record payment</Button>
      </div>
    ) }],
  },

  '/apps/projects/details': {
    title: 'View Project', breadcrumbs: bc('Projects', 'View Project'),
    header: <ProfileHeader name="Mobile app revamp" sub="Q3 initiative · 8 members" tag="On Track" meta={[
      { label: 'Progress', value: '62%' }, { label: 'Due', value: '18 Sep 2026' },
      { label: 'Budget', value: '$84k' }, { label: 'Tasks', value: '48 / 77' },
    ]} />,
    sections: [
      { title: 'Summary', rows: [
        { label: 'Objective', value: 'Rebuild the customer mobile app on a shared design system with offline support.' },
        { label: 'Lead', value: 'Alicia Diaz' }, { label: 'Sponsor', value: 'Marcus Cole' },
        { label: 'Start', value: '2 Jun 2026' }, { label: 'Methodology', value: 'Scrum · 2-week sprints' },
      ] },
    ],
    aside: [{ title: 'Health', rows: [
      { label: 'Schedule', value: <StatusChip status="Active" /> }, { label: 'Budget', value: <StatusChip status="Pending" /> },
      { label: 'Scope', value: <StatusChip status="Active" /> },
    ] }],
  },

  '/apps/tasks/details': {
    title: 'Task Details', breadcrumbs: bc('Tasks', 'Task Details'),
    sections: [
      { title: 'Fix checkout race condition', rows: [
        { label: 'Project', value: 'Billing v2' }, { label: 'Assignee', value: 'Rae Shaw' },
        { label: 'Priority', value: <StatusChip status="Overdue" /> }, { label: 'Status', value: <StatusChip status="In Progress" /> },
        { label: 'Due', value: '5 Sep 2026' }, { label: 'Estimate', value: '6h' },
      ] },
      { title: 'Description', rows: [
        { label: 'Detail', value: 'Two concurrent submits can double-charge when the network retries. Add an idempotency key and a client-side lock.' },
      ] },
    ],
    aside: [{ title: 'Checklist', rows: [
      { label: 'Reproduce', value: <StatusChip status="Completed" /> }, { label: 'Add idempotency key', value: <StatusChip status="In Progress" /> },
      { label: 'Write test', value: <StatusChip status="Todo" /> },
    ] }],
  },

  '/apps/support/ticket-details': {
    title: 'Ticket Details', breadcrumbs: bc('Support', 'Ticket Details'),
    header: <ProfileHeader name={tk0.requester} sub={`${tk0.id} · opened ${tk0.updated}`} tag={tk0.status} meta={[
      { label: 'Priority', value: tk0.priority }, { label: 'Agent', value: tk0.agent },
      { label: 'Category', value: 'Billing' }, { label: 'SLA', value: '4h left' },
    ]} />,
    sections: [
      { title: tk0.subject, rows: [
        { label: 'Message', value: 'Exporting an invoice to PDF spins forever and never downloads. Chrome 128, macOS. Works for one older invoice but not recent ones.' },
      ] },
      { title: 'Internal notes', rows: [
        { label: 'Triage', value: 'Reproduced on staging with invoices that have >20 line items — timeout in the render worker.' },
      ] },
    ],
    aside: [{ title: 'Requester', rows: [
      { label: 'Plan', value: 'Business' }, { label: 'Tickets', value: '7 total' }, { label: 'Since', value: 'Jan 2024' },
    ] }],
  },

  '/apps/hrm/staff-profile': {
    title: 'Staff Profile', breadcrumbs: bc('HRM', 'Staff Profile'),
    header: <ProfileHeader name={s0.name} sub={`${s0.title} · ${s0.department}`} tag={s0.status} meta={[
      { label: 'Employee ID', value: s0.id }, { label: 'Joined', value: s0.joined },
      { label: 'Manager', value: 'Marcus Cole' }, { label: 'Location', value: 'Remote — US' },
    ]} />,
    sections: [
      { title: 'Personal', rows: [
        { label: 'Email', value: s0.email }, { label: 'Phone', value: '+1 (312) 555-0198' },
        { label: 'Birthday', value: '14 Mar' }, { label: 'Emergency contact', value: 'K. Ward — +1 (312) 555-0112' },
      ] },
      { title: 'Compensation', rows: [
        { label: 'Base salary', value: money(s0.salary) }, { label: 'Pay cycle', value: 'Monthly' },
        { label: 'Equity', value: '0.04%' }, { label: 'Next review', value: 'Oct 2026' },
      ] },
    ],
    aside: [{ title: 'Time off', rows: [
      { label: 'Annual balance', value: '12 days' }, { label: 'Sick balance', value: '6 days' }, { label: 'Pending requests', value: '1' },
    ] }],
  },

  '/apps/users/role-details': {
    title: 'Role Details', breadcrumbs: bc('Users', 'Role Details'),
    sections: [
      { title: 'Administrator', rows: [
        { label: 'Members', value: '4' }, { label: 'Created', value: '12 Jan 2024' },
        { label: 'Scope', value: 'Organization-wide' }, { label: 'Editable', value: 'No (system role)' },
      ] },
      { title: 'Permissions', rows: [
        { label: 'Billing', value: 'Full' }, { label: 'Users & roles', value: 'Full' },
        { label: 'Content', value: 'Full' }, { label: 'API keys', value: 'Full' }, { label: 'Audit log', value: 'Read' },
      ] },
    ],
    aside: [{ title: 'Members', content: (
      <ul className="space-y-3">
        {staff.slice(0, 4).map((m) => (
          <li key={m.id} className="flex items-center gap-2.5">
            <Avatar name={m.name} src={avatarUrl(m.name)} size="sm" showFallback />
            <span className="text-[13px] font-medium" style={{ color: 'var(--app-fg-strong)' }}>{m.name}</span>
          </li>
        ))}
      </ul>
    ) }],
  },

  '/apps/crm/customers-detail': {
    title: 'Company', breadcrumbs: bc('CRM', 'Company'),
    header: <ProfileHeader name={co0.name} sub={`${co0.industry} · ${co0.location}`} tag="Customer" meta={[
      { label: 'Size', value: co0.size }, { label: 'Deals', value: co0.deals },
      { label: 'Revenue', value: money(co0.revenue, { compact: true }) }, { label: 'Owner', value: 'Alicia Diaz' },
    ]} />,
    sections: [{ title: 'About', rows: [
      { label: 'Website', value: `www.${co0.name.toLowerCase().replace(/\s/g, '')}.example` },
      { label: 'Primary contact', value: 'Jane Cooper' }, { label: 'Renewal', value: '1 Dec 2026' },
    ] }],
    aside: [{ title: 'Health', rows: [{ label: 'Usage', value: 'Growing' }, { label: 'NPS', value: '9' }, { label: 'Support load', value: 'Low' }] }],
  },
}
