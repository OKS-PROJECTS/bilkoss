import { rng, fmtDate, daysAgo, money } from '../lib/format'

const FIRST = ['James', 'Olivia', 'Liam', 'Ava', 'Noah', 'Mia', 'Ethan', 'Zoe', 'Lucas', 'Aria', 'Mason', 'Nora', 'Leo', 'Ivy', 'Owen', 'Ruby', 'Adam', 'Faye', 'Cole', 'Iris']
const LAST = ['Reed', 'Hayes', 'Ward', 'Foster', 'Bennett', 'Shaw', 'Cole', 'Diaz', 'Nair', 'Frost', 'Lane', 'Marsh', 'Wells', 'Kerr', 'Pratt', 'Boone', 'Vance', 'Quinn', 'Rhodes', 'Sable']
const COMPANIES = ['Northwind', 'Acme Logistics', 'Globex Media', 'Initech Cloud', 'Umbrella Health', 'Soylent Foods', 'Hooli', 'Pied Piper', 'Wonka Brands', 'Stark Industries', 'Wayne Labs', 'Tyrell Corp', 'Cyberdyne', 'Massive Dynamic', 'Vehement Capital']

export const person = (i) => `${FIRST[i % FIRST.length]} ${LAST[(i * 3) % LAST.length]}`
export const personEmail = (i) => `${FIRST[i % FIRST.length].toLowerCase()}.${LAST[(i * 3) % LAST.length].toLowerCase()}@example.com`
export const company = (i) => COMPANIES[i % COMPANIES.length]

export const rows = (n, fn) => Array.from({ length: n }, (_, i) => fn(i))

export { fmtDate, daysAgo, money, rng }

/* ---- shared datasets ---- */

export const contacts = rows(28, (i) => ({
  id: `CT-${1000 + i}`,
  name: person(i),
  email: personEmail(i),
  phone: `+1 (${200 + (i % 700)}) ${100 + (i % 800)}-${(1000 + i * 7) % 9999}`,
  company: company(i),
  role: ['Buyer', 'Decision Maker', 'Influencer', 'Champion'][i % 4],
  status: ['Active', 'Active', 'Inactive', 'Active'][i % 4],
  lastContact: fmtDate(daysAgo(i * 3)),
}))

export const companiesData = rows(20, (i) => ({
  id: `CO-${500 + i}`,
  name: company(i),
  industry: ['Retail', 'Logistics', 'Media', 'SaaS', 'Healthcare', 'Food'][i % 6],
  size: ['11–50', '51–200', '201–500', '500+'][i % 4],
  location: ['United States', 'United Kingdom', 'Germany', 'Canada', 'Australia', 'France'][i % 6],
  deals: 1 + (i % 8),
  revenue: 24000 + i * 8600 + Math.round(rng(i) * 12000),
  status: ['Customer', 'Prospect', 'Partner', 'Customer'][i % 4],
}))

export const leadsData = rows(24, (i) => ({
  id: `LD-${3000 + i}`,
  name: person(i + 2),
  company: company(i + 1),
  source: ['Website', 'Referral', 'Cold Call', 'Event', 'Partner'][i % 5],
  score: 20 + ((i * 13) % 80),
  owner: person(i * 5),
  status: ['New', 'Contacted', 'Qualified', 'Lost'][i % 4],
  created: fmtDate(daysAgo(i * 2)),
}))

export const opportunities = rows(20, (i) => ({
  id: `OP-${7000 + i}`,
  name: `${company(i)} — ${['renewal', 'expansion', 'new logo', 'upsell'][i % 4]}`,
  account: company(i),
  value: 6000 + i * 2400 + Math.round(rng(i) * 5000),
  probability: 20 + ((i * 11) % 75),
  stage: ['Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'][i % 5],
  close: fmtDate(daysAgo(-(6 + i * 5))),
}))

export const invoices = rows(22, (i) => ({
  id: `INV-${20250 + i}`,
  client: company(i),
  issued: fmtDate(daysAgo(i * 4 + 3)),
  due: fmtDate(daysAgo(i * 4 - 11)),
  amount: 480 + i * 320 + Math.round(rng(i) * 2400),
  status: ['Paid', 'Pending', 'Overdue', 'Paid', 'Draft'][i % 5],
}))

export const staff = rows(24, (i) => ({
  id: `EMP-${400 + i}`,
  name: person(i),
  email: personEmail(i),
  department: ['Engineering', 'Design', 'Sales', 'Marketing', 'Support', 'Finance'][i % 6],
  title: ['Engineer', 'Designer', 'Account Exec', 'Marketer', 'Support Lead', 'Analyst'][i % 6],
  joined: fmtDate(daysAgo(120 + i * 40)),
  status: ['Active', 'Active', 'On Leave', 'Active'][i % 4],
  salary: 62000 + i * 3400,
}))

export const tickets = rows(24, (i) => ({
  id: `TK-${9100 + i}`,
  subject: [
    'Cannot export invoice PDF', 'Login loop after password reset', '2FA code not arriving',
    'Webhook retries flooding logs', 'Dark mode contrast on tables', 'Billing address won’t save',
    'API rate limit unclear', 'Team seat not released', 'CSV import drops last row', 'Slow dashboard on Safari',
  ][i % 10],
  requester: person(i),
  priority: ['Urgent', 'High', 'Normal', 'Low'][i % 4],
  agent: person(i * 3),
  status: ['Open', 'Pending', 'On Hold', 'Closed'][i % 4],
  updated: `${1 + (i % 12)}h ago`,
}))

export const coupons = rows(18, (i) => ({
  id: `CPN-${100 + i}`,
  code: ['WELCOME15', 'SUMMER25', 'FREESHIP', 'VIP30', 'BUNDLE10', 'FLASH40'][i % 6] + (i > 5 ? i : ''),
  type: i % 2 ? 'Percentage' : 'Fixed',
  value: i % 2 ? `${5 + (i % 8) * 5}%` : money(5 + (i % 10) * 5),
  used: (i * 37) % 400,
  limit: 500,
  expires: fmtDate(daysAgo(-(10 + i * 4))),
  status: ['Active', 'Active', 'Expired', 'Scheduled'][i % 4],
}))

export const categories = rows(14, (i) => ({
  id: `CAT-${20 + i}`,
  name: ['Furniture', 'Living', 'Bedroom', 'Kitchen', 'Office', 'Lighting', 'Decor', 'Outdoor', 'Storage', 'Textiles', 'Rugs', 'Wall Art', 'Kids', 'Electronics'][i],
  products: 12 + ((i * 17) % 140),
  parent: i < 5 ? '—' : ['Furniture', 'Living', 'Kitchen'][i % 3],
  status: i % 5 === 0 ? 'Hidden' : 'Visible',
}))

export const apiKeys = rows(8, (i) => ({
  id: `KEY-${i + 1}`,
  name: ['Production', 'Staging', 'CI pipeline', 'Analytics export', 'Partner: Northwind', 'Mobile app', 'Zapier', 'Backup job'][i],
  prefix: `bk_live_${(rng(i) * 1e9).toString(36).slice(0, 8)}`,
  created: fmtDate(daysAgo(20 + i * 30)),
  lastUsed: `${i + 1}d ago`,
  scope: ['Full access', 'Read only', 'Write only'][i % 3],
  status: i === 4 ? 'Revoked' : 'Active',
}))

export const expenses = rows(20, (i) => ({
  id: `EXP-${800 + i}`,
  vendor: ['AWS', 'Figma', 'Notion', 'GitHub', 'Slack', 'Adobe', 'Google Ads', 'Linear', 'Vercel', 'Zoom'][i % 10],
  category: ['Infrastructure', 'Software', 'Software', 'Software', 'Software', 'Software', 'Marketing', 'Software', 'Infrastructure', 'Software'][i % 10],
  date: fmtDate(daysAgo(i * 3)),
  amount: 120 + Math.round(rng(i) * 3400),
  method: ['Visa •• 4021', 'Amex •• 1180', 'ACH'][i % 3],
  status: ['Approved', 'Pending', 'Approved', 'Rejected'][i % 4],
}))

export const reviews = rows(18, (i) => ({
  id: `RV-${600 + i}`,
  product: ['Modern Fabric Sofa', 'Velvet Recliner', 'Oak Coffee Table', 'TV Stand', 'Lounge Chair', 'Desk Lamp'][i % 6],
  reviewer: person(i),
  rating: 3 + (i % 3),
  title: ['Great value', 'Better than expected', 'Slightly firm', 'Fast shipping', 'Would buy again', 'Colour differs'][i % 6],
  date: fmtDate(daysAgo(i * 5)),
  status: ['Published', 'Pending', 'Published', 'Rejected'][i % 4],
}))
