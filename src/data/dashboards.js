import { rng, fmtDate, daysAgo } from '../lib/format'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const monthSeries = (base, spread, seed = 0) =>
  MONTHS.map((month, i) => ({ month, value: Math.round(base + rng(i + seed) * spread + i * (spread / 24)) }))

/* ---- analytics ---- */
export const sessionsOverview = MONTHS.map((month, i) => ({
  month,
  sessions: 30 + Math.round(rng(i) * 24 + i * 1.4),
  users: 20 + Math.round(rng(i + 5) * 18 + i),
}))

export const trafficSources = [
  { source: 'Google', visitors: 18420, share: 41, change: 6.2 },
  { source: 'Direct', visitors: 12300, share: 27, change: 2.1 },
  { source: 'Referral', visitors: 6800, share: 15, change: -1.4 },
  { source: 'Social', visitors: 4100, share: 9, change: 4.9 },
  { source: 'Email', visitors: 3600, share: 8, change: 1.2 },
]

export const browsers = [
  { label: 'Chrome', value: 63 },
  { label: 'Safari', value: 19 },
  { label: 'Edge', value: 11 },
  { label: 'Firefox', value: 7 },
]

export const pageAnalytics = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  path: ['/', '/pricing', '/blog/launch', '/docs/intro', '/features', '/changelog', '/about', '/contact', '/careers', '/status', '/login', '/signup'][i],
  views: 2400 - i * 150 + Math.round(rng(i) * 200),
  unique: 1800 - i * 110,
  bounce: 32 + Math.round(rng(i + 2) * 30),
  avg: `${1 + (i % 3)}m ${10 + ((i * 7) % 50)}s`,
}))

export const subscriberChannels = [
  { label: 'Email Marketing', value: 6980, max: 10000, sub: '+6,980', color: 'secondary' },
  { label: 'Social Marketing', value: 4560, max: 10000, sub: '+4,560', color: 'primary' },
  { label: 'Referral Program', value: 3120, max: 10000, sub: '+3,120', color: 'success' },
  { label: 'Paid Ads', value: 1890, max: 10000, sub: '+1,890', color: 'warning' },
]

/* ---- crm ---- */
export const crmOverview = MONTHS.map((month, i) => ({
  month,
  won: 20 + Math.round(rng(i) * 30),
  lost: 8 + Math.round(rng(i + 3) * 16),
}))

export const leadSources = [
  { label: 'Website', value: 38 },
  { label: 'Referral', value: 24 },
  { label: 'Cold Call', value: 18 },
  { label: 'Event', value: 12 },
  { label: 'Partner', value: 8 },
]

export const deals = Array.from({ length: 10 }, (_, i) => ({
  id: `DEAL-${910 + i}`,
  name: ['Northwind Retail', 'Acme Logistics', 'Globex Media', 'Initech Cloud', 'Umbrella Health', 'Soylent Foods', 'Hooli Search', 'Pied Piper', 'Wonka Brands', 'Stark Industries'][i],
  owner: ['A. Diaz', 'M. Cole', 'R. Shaw', 'K. Ward', 'T. Foster'][i % 5],
  value: 4200 + i * 1800 + Math.round(rng(i) * 3000),
  stage: ['Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'][i % 5],
  close: fmtDate(daysAgo(-(5 + i * 6))),
}))

export const topPerformers = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  name: ['Alicia Diaz', 'Marcus Cole', 'Rae Shaw', 'Kendall Ward', 'Tomas Foster', 'Priya Nair'][i],
  deals: 24 - i * 3,
  revenue: 148000 - i * 18000,
}))

/* ---- finance ---- */
export const financeOverview = MONTHS.map((month, i) => ({
  month,
  income: 40 + Math.round(rng(i) * 30 + i),
  expense: 22 + Math.round(rng(i + 7) * 18),
}))

export const transactions = Array.from({ length: 16 }, (_, i) => ({
  id: `TXN-${52000 + i * 3}`,
  party: ['Figma Inc', 'AWS', 'Stripe Payout', 'Notion Labs', 'GitHub', 'Payroll Run', 'Slack', 'Adobe', 'Linear', 'Vercel'][i % 10],
  category: ['Software', 'Infrastructure', 'Revenue', 'Software', 'Software', 'Payroll', 'Software', 'Software', 'Software', 'Infrastructure'][i % 10],
  date: fmtDate(daysAgo(i * 2)),
  amount: (i % 3 === 2 ? 1 : -1) * (120 + Math.round(rng(i) * 3200)),
  method: ['Visa •• 4021', 'ACH', 'Wire', 'Amex •• 1180'][i % 4],
  status: ['Completed', 'Completed', 'Pending', 'Completed'][i % 4],
}))

export const accounts = [
  { label: 'Operating', value: 184320, delta: 4.2, color: 'primary' },
  { label: 'Savings', value: 92600, delta: 1.1, color: 'success' },
  { label: 'Payroll', value: 41880, delta: -2.4, color: 'warning' },
  { label: 'Tax Reserve', value: 63400, delta: 0.6, color: 'info' },
]

/* ---- projects ---- */
export const projectStatus = [
  { label: 'On Track', value: 18 },
  { label: 'At Risk', value: 6 },
  { label: 'Delayed', value: 3 },
  { label: 'Completed', value: 24 },
]

export const projectPerf = MONTHS.slice(0, 8).map((month, i) => ({
  month,
  planned: 20 + i * 4,
  actual: 18 + i * 4 + Math.round(rng(i) * 6 - 3),
}))

export const ongoingProjects = Array.from({ length: 8 }, (_, i) => ({
  id: `PRJ-${300 + i}`,
  name: ['Mobile app revamp', 'Billing v2', 'Design system', 'Data warehouse', 'SEO overhaul', 'Onboarding flow', 'API gateway', 'Partner portal'][i],
  lead: ['Alicia Diaz', 'Marcus Cole', 'Rae Shaw', 'Kendall Ward'][i % 4],
  progress: 20 + ((i * 13) % 75),
  due: fmtDate(daysAgo(-(4 + i * 5))),
  status: ['On Track', 'At Risk', 'Delayed', 'On Track'][i % 4],
}))

export const scheduleToday = [
  { id: 1, time: '09:00', title: 'Standup — Mobile squad', color: 'primary' },
  { id: 2, time: '11:30', title: 'Design review: billing v2', color: 'secondary' },
  { id: 3, time: '14:00', title: 'Client demo — Northwind', color: 'success' },
  { id: 4, time: '16:30', title: 'Retro — sprint 24', color: 'warning' },
]

export const taskList = Array.from({ length: 8 }, (_, i) => ({
  id: `TASK-${1200 + i}`,
  title: ['Fix checkout race condition', 'Write migration guide', 'Add dark-mode tokens', 'QA pass on invoices', 'Refactor auth guard', 'Update dependency lockfile', 'Draft Q3 roadmap', 'Instrument funnel events'][i],
  assignee: ['Alicia Diaz', 'Marcus Cole', 'Rae Shaw', 'Kendall Ward'][i % 4],
  priority: ['High', 'Medium', 'Low', 'High'][i % 4],
  status: ['In Progress', 'Review', 'Todo', 'Done'][i % 4],
}))
