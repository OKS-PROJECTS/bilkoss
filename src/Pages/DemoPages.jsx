import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Avatar, AvatarGroup, Button, Chip, Checkbox, TextField } from 'oks-ui'
import * as Icons from 'lucide-react'
import {
  PageHeader, Panel, Surface, KpiCard, StatGroup, DataTable, ChartCard, DonutCard,
  MeterList, Timeline, ActivityFeed, EntityCell, StatusChip, EmptyState, SectionTitle,
} from '../Components/ui'
import { money, num } from '../lib/format'
import { person, avatarUrl, staff, companiesData, rng } from '../data/more'
import { salesByMonth } from '../data/ecommerce'

const crumb = (group, leaf) => [{ label: 'Bilkoss', to: '/' }, { label: group }, { label: leaf }]
const months = salesByMonth

/* ================= WIDGETS ================= */
export function WidgetsStatistics() {
  return (
    <>
      <PageHeader title="Statistics" breadcrumbs={crumb('Widgets', 'Statistics')} />
      <StatGroup cols={4} className="mb-6">
        <KpiCard label="Revenue" value="$248.9k" trend={6.2} icon={<Icons.DollarSign size={18} />} accent="primary" />
        <KpiCard label="Active users" value="18,204" trend={3.1} icon={<Icons.Users size={18} />} accent="info" />
        <KpiCard label="Conversion" value="3.48%" trend={-0.4} icon={<Icons.Target size={18} />} accent="success" />
        <KpiCard label="Churn" value="1.9%" trend={0.3} invertTrend icon={<Icons.UserMinus size={18} />} accent="warning" />
      </StatGroup>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel title="Goal progress"><MeterList items={[
          { label: 'New MRR', value: 68, sub: '68%' }, { label: 'Expansion', value: 41, sub: '41%' },
          { label: 'Support SLA', value: 92, sub: '92%', color: 'success' }, { label: 'NPS target', value: 74, sub: '74%', color: 'info' },
        ]} /></Panel>
        <Panel title="Channel split"><DonutCard data={[
          { label: 'Direct', value: 44 }, { label: 'Organic', value: 32 }, { label: 'Paid', value: 14 }, { label: 'Social', value: 10 },
        ]} centerLabel="Sessions" centerValue="128k" /></Panel>
        <Panel title="This week"><ActivityFeed items={[
          { id: 1, name: person(1), action: 'closed', target: 'Deal — Globex', time: '2h ago' },
          { id: 2, name: person(5), action: 'shipped', target: 'Release 2.4', time: '6h ago' },
          { id: 3, name: person(9), action: 'invited 3 teammates', time: '1d ago' },
          { id: 4, name: person(3), action: 'resolved', target: 'BUG-521', time: '1d ago' },
        ]} /></Panel>
      </div>
    </>
  )
}

export function WidgetsCharts() {
  return (
    <>
      <PageHeader title="Chart Widgets" breadcrumbs={crumb('Widgets', 'Chart Widgets')} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Revenue trend" type="area" data={months} x="month" series={[{ key: 'revenue', name: 'Revenue' }]} palette={{ roles: ['primary'] }} height={240} />
        <ChartCard title="Orders vs refunds" type="column" data={months} x="month" series={[{ key: 'orders', name: 'Orders' }, { key: 'revenue', name: 'Revenue' }]} palette={{ roles: ['primary', 'danger'] }} height={240} />
        <ChartCard title="Cumulative signups" type="line" data={months} x="month" series={[{ key: 'orders', name: 'Signups' }]} palette={{ roles: ['success'] }} height={240} />
        <Panel title="Category mix"><DonutCard data={[
          { label: 'Furniture', value: 48 }, { label: 'Lighting', value: 22 }, { label: 'Decor', value: 18 }, { label: 'Textiles', value: 12 },
        ]} centerLabel="Items" centerValue="4.2k" /></Panel>
      </div>
    </>
  )
}

export function WidgetsSocial() {
  const stats = [
    { net: 'Followers', v: '48.2k', d: 4.1, icon: Icons.Users, c: 'primary' },
    { net: 'Impressions', v: '1.2M', d: 8.7, icon: Icons.Eye, c: 'info' },
    { net: 'Engagement', v: '3.9%', d: -0.6, icon: Icons.Heart, c: 'danger' },
    { net: 'Mentions', v: '312', d: 12.4, icon: Icons.AtSign, c: 'secondary' },
  ]
  return (
    <>
      <PageHeader title="Social" breadcrumbs={crumb('Widgets', 'Social')} />
      <StatGroup cols={4} className="mb-6">
        {stats.map((s) => <KpiCard key={s.net} label={s.net} value={s.v} trend={s.d} icon={<s.icon size={18} />} accent={s.c} />)}
      </StatGroup>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Follower growth" type="area" data={months} x="month" series={[{ key: 'orders', name: 'Followers' }]} palette={{ roles: ['primary'] }} height={260} />
        <Panel title="Top posts">
          <ul className="space-y-3">
            {['Behind the scenes of our design system', 'We are hiring — 4 roles open', 'Customer story: Northwind Retail', 'Changelog: 2.4 is out'].map((t, i) => (
              <li key={t} className="flex items-center justify-between gap-3 text-[13px]">
                <span className="truncate" style={{ color: 'var(--app-fg)' }}>{t}</span>
                <span className="shrink-0 font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{num(4200 - i * 700)} likes</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  )
}

/* ================= CHARTS ================= */
export function ChartsLineArea() {
  return (
    <>
      <PageHeader title="Line & Area" breadcrumbs={crumb('Charts', 'Line & Area')} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Basic line" type="line" data={months} x="month" series={[{ key: 'revenue', name: 'Revenue' }]} palette={{ roles: ['primary'] }} height={260} />
        <ChartCard title="Multi-series area" type="area" data={months} x="month" series={[{ key: 'revenue', name: 'Revenue' }, { key: 'orders', name: 'Orders' }]} palette={{ roles: ['primary', 'info'] }} height={260} />
        <ChartCard title="Stepline" type="line" data={months} x="month" series={[{ key: 'orders', name: 'Active' }]} palette={{ roles: ['secondary'] }} line={{ curve: 'stepline' }} height={260} />
        <ChartCard title="Gradient area" type="area" data={months} x="month" series={[{ key: 'revenue', name: 'MRR' }]} palette={{ roles: ['success'] }} height={260} />
      </div>
    </>
  )
}
export function ChartsComparisons() {
  return (
    <>
      <PageHeader title="Comparisons" breadcrumbs={crumb('Charts', 'Comparisons')} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Column" type="column" data={months} x="month" series={[{ key: 'orders', name: 'Orders' }]} palette={{ roles: ['primary'] }} height={260} />
        <ChartCard title="Grouped column" type="column" data={months} x="month" series={[{ key: 'orders', name: 'Orders' }, { key: 'revenue', name: 'Revenue' }]} palette={{ roles: ['primary', 'info'] }} height={260} />
        <ChartCard title="Stacked column" type="column" data={months} x="month" series={[{ key: 'orders', name: 'New' }, { key: 'revenue', name: 'Returning' }]} palette={{ roles: ['primary', 'secondary'] }} column={{ stacked: true }} height={260} />
        <ChartCard title="Horizontal bar" type="bar" data={months.slice(0, 6)} x="month" series={[{ key: 'revenue', name: 'Revenue' }]} palette={{ roles: ['success'] }} height={260} />
      </div>
    </>
  )
}
export function ChartsDistributions() {
  const donut = [
    { label: 'Chrome', value: 63 }, { label: 'Safari', value: 19 }, { label: 'Edge', value: 11 }, { label: 'Firefox', value: 7 },
  ]
  return (
    <>
      <PageHeader title="Distributions" breadcrumbs={crumb('Charts', 'Distributions')} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Panel title="Pie chart"><DonutCard data={donut} centerLabel="Users" centerValue="48k" roles={['primary','info','secondary','warning']} /></Panel>
        <Panel title="Donut"><DonutCard data={donut} centerLabel="Users" centerValue="48k" /></Panel>
        <Panel title="Breakdown"><DonutCard data={donut} centerLabel="Total" roles={['primary','info','secondary','warning']} legend={false} /></Panel>
      </div>
    </>
  )
}
export function ChartsProgress() {
  return (
    <>
      <PageHeader title="Progress & Gauges" breadcrumbs={crumb('Charts', 'Progress & Gauges')} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Goal meters"><MeterList items={[
          { label: 'Q3 revenue', value: 82, sub: '$4.1M / $5M' },
          { label: 'Headcount plan', value: 66, sub: '61 / 92', color: 'info' },
          { label: 'Uptime (30d)', value: 99.94, max: 100, sub: '99.94%', color: 'success' },
          { label: 'Support backlog', value: 24, sub: '24 open', color: 'warning' },
        ]} /></Panel>
        <Panel title="Completion gauge">
          <DonutCard data={[{ label: 'Done', value: 68 }, { label: 'Remaining', value: 32 }]} centerLabel="Complete" centerValue="68%" colors={['var(--app-primary)', 'var(--app-surface-2)']} legend={false} />
        </Panel>
      </div>
    </>
  )
}

/* ================= ICONS ================= */
export function IconsLucide() {
  const [q, setQ] = useState('')
  const names = Object.keys(Icons).filter((k) => /^[A-Z]/.test(k) && k !== 'Icon' && !k.endsWith('Icon') && typeof Icons[k] === 'object')
  const filtered = (q ? names.filter((n) => n.toLowerCase().includes(q.toLowerCase())) : names).slice(0, 240)
  return (
    <>
      <PageHeader title="Lucide Icons" breadcrumbs={crumb('Icons', 'Lucide')} />
      <Panel>
        <div className="mb-4 max-w-xs">
          <TextField type="search" value={q} onChange={setQ} placeholder="Search icons…" startIcon={<Icons.Search size={15} />} aria-label="Search icons" />
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-8">
          {filtered.map((n) => {
            const I = Icons[n]
            return (
              <div key={n} className="flex flex-col items-center gap-1.5 rounded-md border p-3 text-center" style={{ borderColor: 'var(--app-border)' }}>
                <I size={20} style={{ color: 'var(--app-fg)' }} />
                <span className="w-full truncate text-[10px]" style={{ color: 'var(--app-fg-subtle)' }}>{n}</span>
              </div>
            )
          })}
        </div>
      </Panel>
    </>
  )
}

/* ================= TABLES ================= */
export function StaticTables() {
  return (
    <>
      <PageHeader title="Static Tables" breadcrumbs={crumb('Tables', 'Static Tables')} />
      <div className="space-y-6">
        <Panel title="Basic table">
          <div className="overflow-x-auto">
            <table className="w-full text-[13.5px]">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--app-border)' }}>
                  {['Name', 'Title', 'Department', 'Status'].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--app-fg-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staff.slice(0, 6).map((s) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--app-border)' }}>
                    <td className="px-4 py-3"><EntityCell name={s.name} sub={s.email} seed={s.name} /></td>
                    <td className="px-4 py-3">{s.title}</td>
                    <td className="px-4 py-3">{s.department}</td>
                    <td className="px-4 py-3"><StatusChip status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel title="Striped &amp; bordered">
          <div className="overflow-x-auto rounded-md border" style={{ borderColor: 'var(--app-border)' }}>
            <table className="w-full text-[13.5px]">
              <thead style={{ background: 'var(--app-surface-2)' }}>
                <tr>{['Company', 'Industry', 'Deals', 'Revenue'].map((h) => <th key={h} className="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--app-fg-muted)' }}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {companiesData.slice(0, 6).map((c, i) => (
                  <tr key={c.id} style={{ background: i % 2 ? 'var(--app-surface-2)' : undefined }}>
                    <td className="px-4 py-3 font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{c.name}</td>
                    <td className="px-4 py-3">{c.industry}</td>
                    <td className="px-4 py-3">{c.deals}</td>
                    <td className="px-4 py-3">{money(c.revenue, { compact: true })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </>
  )
}
export function DataTableDemo() {
  return (
    <>
      <PageHeader title="Data Table" breadcrumbs={crumb('Tables', 'Data Table')} />
      <Panel title="Employees" subtitle="Sortable, paginated, selectable — composed from a <table> + oks-ui Checkbox">
        <DataTable
          selectable
          columns={[
            { key: 'name', header: 'Employee', render: (r) => <EntityCell name={r.name} sub={r.email} seed={r.name} /> },
            { key: 'department', header: 'Department', sortable: true },
            { key: 'title', header: 'Title' },
            { key: 'joined', header: 'Joined', sortable: true },
            { key: 'salary', header: 'Salary', align: 'right', sortable: true, sortValue: (r) => r.salary, render: (r) => money(r.salary, { compact: true }) },
            { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status === 'On Leave' ? 'On Hold' : r.status} /> },
          ]}
          rows={staff}
          pageSize={8}
        />
      </Panel>
    </>
  )
}

/* ================= PROJECTS (grid/list/activity) ================= */
const PROJECTS = Array.from({ length: 9 }, (_, i) => ({
  id: `PRJ-${300 + i}`,
  name: ['Mobile app revamp', 'Billing v2', 'Design system', 'Data warehouse', 'SEO overhaul', 'Onboarding flow', 'API gateway', 'Partner portal', 'Help center'][i],
  lead: person(i * 3),
  members: [i, i + 2, i + 4, i + 6],
  progress: 15 + ((i * 17) % 80),
  status: ['On Track', 'At Risk', 'Delayed', 'On Track'][i % 4],
  due: ['18 Sep', '30 Sep', '12 Oct', '2 Nov'][i % 4],
}))
export function ProjectsGrid() {
  return (
    <>
      <PageHeader title="My Projects" breadcrumbs={crumb('Projects', 'My Projects')} actions={<Button color="primary" size="sm">New project</Button>} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <Surface key={p.id} bodyClassName="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-[15px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>{p.name}</p>
                <p className="text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>{p.id} · Lead {p.lead}</p>
              </div>
              <StatusChip status={p.status} />
            </div>
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-[12px]"><span style={{ color: 'var(--app-fg-muted)' }}>Progress</span><span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{p.progress}%</span></div>
              <div className="h-2 overflow-hidden rounded-full" style={{ background: 'var(--app-surface-2)' }}>
                <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: 'var(--app-primary)' }} />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <AvatarGroup max={3} size="xs">
                {p.members.map((m) => <Avatar key={m} src={avatarUrl(m * 4)} name={`M${m}`} size="xs" />)}
              </AvatarGroup>
              <span className="text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>Due {p.due}</span>
            </div>
          </Surface>
        ))}
      </div>
    </>
  )
}
export function ProjectsList() {
  return (
    <>
      <PageHeader title="Projects List" breadcrumbs={crumb('Projects', 'Projects List')} actions={<Button color="primary" size="sm">New project</Button>} />
      <Panel>
        <DataTable
          columns={[
            { key: 'name', header: 'Project', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.name}</span> },
            { key: 'lead', header: 'Lead' },
            { key: 'progress', header: 'Progress', width: 160, render: (r) => (
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: 'var(--app-surface-2)' }}>
                  <div className="h-full rounded-full" style={{ width: `${r.progress}%`, background: 'var(--app-primary)' }} />
                </div>
                <span className="text-[12px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.progress}%</span>
              </div>
            ) },
            { key: 'due', header: 'Due' },
            { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
          ]}
          rows={PROJECTS}
          pageSize={8}
        />
      </Panel>
    </>
  )
}
export function ProjectsActivity() {
  return (
    <>
      <PageHeader title="Activity Stream" breadcrumbs={crumb('Projects', 'Activity Stream')} />
      <div className="mx-auto max-w-3xl">
        <Panel title="Recent activity">
          <Timeline items={Array.from({ length: 10 }, (_, i) => ({
            id: i,
            title: [`${person(i)} moved a card to In Progress`, `${person(i)} commented on Billing v2`, `${person(i)} closed BUG-${520 + i}`, `${person(i)} pushed 3 commits`][i % 4],
            description: ['“Checkout race condition” — added idempotency key', 'Left a suggestion about the tax rounding', 'Verified on staging, shipping in 2.4', 'main ← feature/dark-mode-tokens'][i % 4],
            time: `${i + 1}h ago`,
            color: ['primary', 'secondary', 'success', 'info'][i % 4],
          }))} />
        </Panel>
      </div>
    </>
  )
}

/* ================= BLOG / FORUM / SOCIAL ================= */
const POSTS = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  title: ['Designing for operational clarity', 'How we cut dashboard load by 60%', 'A pragmatic take on design tokens', 'Shipping a mobile rebuild in one quarter', 'What we learned from 400 design partners', 'Our approach to empty states', 'Accessibility is a feature', 'The case against another chart library', 'Writing changelogs people read'][i],
  author: person(i * 2),
  category: ['Design', 'Engineering', 'Design', 'Product', 'Company', 'Design', 'Engineering', 'Engineering', 'Company'][i],
  date: ['12 Aug', '5 Aug', '28 Jul', '19 Jul', '10 Jul', '2 Jul', '24 Jun', '15 Jun', '6 Jun'][i],
  read: `${4 + (i % 6)} min`,
  hue: ['primary', 'info', 'success', 'warning', 'secondary', 'danger'][i % 6],
}))
export function BlogList() {
  return (
    <>
      <PageHeader title="Blog" breadcrumbs={crumb('More Apps', 'Blog List')} actions={<Button color="primary" size="sm" as={Link} to="/apps/more/blog/add">Write</Button>} />
      <div className="mx-auto max-w-3xl space-y-4">
        {POSTS.map((p) => (
          <Surface key={p.id} bodyClassName="flex gap-4 p-4">
            <div className="hidden h-20 w-28 shrink-0 rounded-md sm:block" style={{ background: `linear-gradient(140deg, var(--app-${p.hue}), var(--app-${p.hue}-soft))` }} />
            <div className="min-w-0">
              <Chip size="sm" variant="soft" color="default">{p.category}</Chip>
              <Link to="/apps/more/blog/article" className="font-display mt-1.5 block text-[15px] font-bold hover:underline" style={{ color: 'var(--app-fg-strong)' }}>{p.title}</Link>
              <p className="mt-1 text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>{p.author} · {p.date} · {p.read} read</p>
            </div>
          </Surface>
        ))}
      </div>
    </>
  )
}
export function BlogGrid() {
  return (
    <>
      <PageHeader title="Blog Grid" breadcrumbs={crumb('More Apps', 'Blog Grid')} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {POSTS.map((p) => (
          <Surface key={p.id} padded={false} className="overflow-hidden">
            <div className="h-32" style={{ background: `linear-gradient(140deg, var(--app-${p.hue}), var(--app-${p.hue}-soft))` }} />
            <div className="p-4">
              <Chip size="sm" variant="soft" color="default">{p.category}</Chip>
              <Link to="/apps/more/blog/article" className="font-display mt-2 block text-[14px] font-bold hover:underline" style={{ color: 'var(--app-fg-strong)' }}>{p.title}</Link>
              <p className="mt-1 text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>{p.date} · {p.read} read</p>
            </div>
          </Surface>
        ))}
      </div>
    </>
  )
}
export function BlogArticle() {
  return (
    <>
      <PageHeader title="Article" breadcrumbs={crumb('More Apps', 'Article')} />
      <article className="mx-auto max-w-2xl">
        <Chip size="sm" variant="soft" color="primary">Design</Chip>
        <h1 className="font-display mt-3 text-[26px] leading-tight font-bold" style={{ color: 'var(--app-fg-strong)' }}>
          Designing for operational clarity
        </h1>
        <div className="mt-3 flex items-center gap-3">
          <Avatar name={person(2)} src={avatarUrl(person(2))} size="sm" showFallback />
          <span className="text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>{person(2)} · 12 Aug 2026 · 6 min read</span>
        </div>
        <div className="mt-6 h-56 rounded-lg" style={{ background: 'linear-gradient(140deg, var(--app-primary), var(--app-info))' }} />
        <div className="mt-6 space-y-4 text-[14px] leading-relaxed" style={{ color: 'var(--app-fg)' }}>
          <p>Operational software lives or dies by how quickly someone can find the one number they came for. Everything else is in service of that.</p>
          <p>We start every screen from the question it answers, then work outward — the primary metric, the trend, the table, the actions. If a widget does not help answer the question, it does not ship.</p>
          <h2 className="font-display pt-2 text-[17px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>Consistency beats cleverness</h2>
          <p>A predictable card, a predictable table, a predictable page header. When the shell never surprises you, the data gets all of your attention.</p>
        </div>
      </article>
    </>
  )
}
export function ForumView() {
  const threads = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: ['Best practice for multi-tenant theming?', 'How do you handle stale HMR in Vite 8?', 'Show & tell: our onboarding flow', 'Feature request: saved table views', 'Do you centralise client state or keep it local?', 'Anyone using the API for bulk import?', 'Dark-mode contrast on chart labels', 'Weekly wins thread', 'Roadmap Q4 discussion', 'Tips for writing changelogs'][i],
    author: person(i),
    replies: (i * 7) % 40,
    views: 120 + i * 46,
    tag: ['Help', 'Discussion', 'Show & tell', 'Feature', 'Discussion'][i % 5],
  }))
  return (
    <>
      <PageHeader title="Forum" breadcrumbs={crumb('More Apps', 'Forum View')} actions={<Button color="primary" size="sm" as={Link} to="/apps/more/forum/post">New topic</Button>} />
      <Panel padded={false}>
        <ul>
          {threads.map((t) => (
            <li key={t.id} className="flex items-center gap-3 border-b px-5 py-3.5 last:border-0" style={{ borderColor: 'var(--app-border)' }}>
              <Avatar name={t.author} src={avatarUrl(t.author)} size="sm" showFallback />
              <div className="min-w-0 flex-1">
                <Link to="/apps/more/forum/post" className="block truncate text-[13.5px] font-semibold hover:text-[var(--app-primary)]" style={{ color: 'var(--app-fg-strong)' }}>{t.title}</Link>
                <p className="text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>{t.author} · {t.tag}</p>
              </div>
              <div className="hidden shrink-0 text-right text-[12px] sm:block" style={{ color: 'var(--app-fg-muted)' }}>
                {t.replies} replies · {t.views} views
              </div>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  )
}
export function ForumPost() {
  return (
    <>
      <PageHeader title="Topic" breadcrumbs={crumb('More Apps', 'Forum Post')} />
      <div className="mx-auto max-w-3xl space-y-4">
        <Panel title="Best practice for multi-tenant theming?">
          <div className="flex gap-3">
            <Avatar name={person(0)} src={avatarUrl(person(0))} size="sm" showFallback />
            <div>
              <p className="text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>{person(0)} · 2 days ago</p>
              <p className="mt-1 text-[13.5px] leading-relaxed" style={{ color: 'var(--app-fg)' }}>
                We need per-tenant brand colours without shipping a stylesheet per tenant. Leaning toward CSS
                custom properties on a wrapper element. Anyone doing this at scale?
              </p>
            </div>
          </div>
        </Panel>
        {[1, 2].map((i) => (
          <Surface key={i} bodyClassName="flex gap-3 p-4">
            <Avatar name={person(i * 3)} src={avatarUrl(person(i * 3))} size="sm" showFallback />
            <div>
              <p className="text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>{person(i * 3)} · {i} day ago</p>
              <p className="mt-1 text-[13px] leading-relaxed" style={{ color: 'var(--app-fg)' }}>
                {i === 1
                  ? 'CSS variables on a wrapper works great. Define a full token set on :root, override the handful of brand tokens per tenant. That is exactly how this template does it.'
                  : 'Watch out for third-party components that hard-code colours — you will end up with a few !important patches. Otherwise it scales fine.'}
              </p>
            </div>
          </Surface>
        ))}
        <Panel><TextField label="Reply" placeholder="Write a reply…" className="[&_input]:h-24" /><Button color="primary" size="sm" className="mt-3">Post reply</Button></Panel>
      </div>
    </>
  )
}
export function SocialFeed() {
  const feed = Array.from({ length: 6 }, (_, i) => ({
    id: i, author: person(i * 2),
    text: ['Shipped the new pagination component today — small thing, big quality-of-life win.', 'The offsite photos are up in the drive. Great few days.', 'Reminder: design review moved to 2pm.', 'We just crossed 10k workspaces. Thanks everyone.', 'Poll: async standup or keep the sync one?', 'New changelog entry is live.'][i],
    likes: (i * 13) % 40 + 4, comments: (i * 5) % 12,
    hue: ['primary', 'info', 'success', 'warning', 'secondary', 'danger'][i % 6],
  }))
  return (
    <>
      <PageHeader title="Social Feed" breadcrumbs={crumb('More Apps', 'Social Feed')} />
      <div className="mx-auto max-w-2xl space-y-4">
        <Panel><TextField placeholder="Share an update…" aria-label="New post" /><div className="mt-3 flex justify-end"><Button color="primary" size="sm">Post</Button></div></Panel>
        {feed.map((f) => (
          <Surface key={f.id} bodyClassName="p-4">
            <div className="flex items-center gap-3">
              <Avatar name={f.author} src={avatarUrl(f.author)} size="sm" showFallback />
              <div>
                <p className="text-[13px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{f.author}</p>
                <p className="text-[11px]" style={{ color: 'var(--app-fg-subtle)' }}>{f.id + 1}h ago</p>
              </div>
            </div>
            <p className="mt-3 text-[13.5px]" style={{ color: 'var(--app-fg)' }}>{f.text}</p>
            {f.id % 2 === 0 && <div className="mt-3 h-40 rounded-md" style={{ background: `linear-gradient(140deg, var(--app-${f.hue}), var(--app-${f.hue}-soft))` }} />}
            <div className="mt-3 flex gap-4 text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>
              <span className="flex items-center gap-1"><Icons.Heart size={14} /> {f.likes}</span>
              <span className="flex items-center gap-1"><Icons.MessageCircle size={14} /> {f.comments}</span>
              <span className="flex items-center gap-1"><Icons.Share2 size={14} /> Share</span>
            </div>
          </Surface>
        ))}
      </div>
    </>
  )
}

/* ================= MISC APP LEAVES ================= */
export function AiAssistant() {
  return (
    <>
      <PageHeader title="AI Assistant" breadcrumbs={crumb('More Apps', 'AI Assistant')} />
      <Surface padded={false} className="mx-auto max-w-3xl overflow-hidden">
        <div className="space-y-4 p-5" style={{ background: 'var(--app-surface-2)', minHeight: 380 }}>
          {[
            { r: 'a', t: 'Hi David — I can summarise a report, draft an email, or explain a metric. What do you need?' },
            { r: 'u', t: 'Summarise this month’s sales performance.' },
            { r: 'a', t: 'Gross sales were $482,900 (+6.4% MoM) across 8,541 orders. Average order value dipped 1.2% to $56.54. Furniture drove 61% of revenue; refunds held steady at 4.2%.' },
          ].map((m, i) => (
            <div key={i} className={`flex ${m.r === 'u' ? 'justify-end' : ''}`}>
              <div className="max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px]" style={m.r === 'u'
                ? { background: 'var(--app-primary)', color: '#fff' }
                : { background: 'var(--app-surface)', border: '1px solid var(--app-border)', color: 'var(--app-fg)' }}>
                {m.t}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t p-3" style={{ borderColor: 'var(--app-border)' }}>
          <TextField className="flex-1" size="sm" variant="soft" radius="full" placeholder="Ask anything…" aria-label="Prompt" />
          <Button color="primary" size="sm" endContent={<Icons.Send size={14} />}>Send</Button>
        </div>
      </Surface>
    </>
  )
}
export function TodoApp() {
  const [items, setItems] = useState(() => Array.from({ length: 8 }, (_, i) => ({
    id: i, text: ['Review Q3 board deck', 'Approve payroll run', 'Reply to Northwind renewal', 'Merge dark-mode PR', 'Book venue for offsite', 'Update the roadmap doc', 'Check staging deploy', 'Prep 1:1 notes'][i], done: i > 5,
  })))
  const toggle = (id) => setItems((p) => p.map((x) => (x.id === id ? { ...x, done: !x.done } : x)))
  return (
    <>
      <PageHeader title="Todo" breadcrumbs={crumb('More Apps', 'Todo')} />
      <div className="mx-auto max-w-xl">
        <Panel title={`Tasks — ${items.filter((i) => !i.done).length} open`}>
          <ul className="space-y-1">
            {items.map((it) => (
              <li key={it.id} className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-[var(--app-surface-2)]">
                <Checkbox isSelected={it.done} onChange={() => toggle(it.id)} aria-label={it.text} />
                <span className="text-[13.5px]" style={{ color: it.done ? 'var(--app-fg-subtle)' : 'var(--app-fg)', textDecoration: it.done ? 'line-through' : 'none' }}>{it.text}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  )
}
export function PinBoard() {
  const notes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    text: ['Ask design about the empty-state illustration set', 'Follow up: Stripe settlement timing', 'Idea: keyboard shortcuts for the command palette', 'Remember to rotate the API signing key', 'Customer quote for the case study', 'Check a11y on the date picker', 'Draft the 2.5 release notes', 'Book the all-hands room'][i],
    hue: ['warning', 'primary', 'success', 'info', 'secondary', 'danger', 'warning', 'primary'][i],
  }))
  return (
    <>
      <PageHeader title="Pin Board" breadcrumbs={crumb('More Apps', 'Pin Board')} />
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {notes.map((n) => (
          <div key={n.id} className="mb-4 break-inside-avoid rounded-lg p-4 text-[13px]" style={{ background: `var(--app-${n.hue}-soft)`, color: 'var(--app-fg-strong)' }}>
            {n.text}
          </div>
        ))}
      </div>
    </>
  )
}
export function PermissionsMatrix() {
  const roles = ['Admin', 'Manager', 'Editor', 'Analyst', 'Guest']
  const perms = ['View dashboards', 'Edit content', 'Manage users', 'Manage billing', 'Export data', 'API access', 'Delete records']
  const grant = (ri, pi) => ri === 0 || (ri === 1 && pi < 5) || (ri === 2 && pi < 2) || (ri === 3 && (pi === 0 || pi === 4)) || (ri === 4 && pi === 0)
  return (
    <>
      <PageHeader title="Permissions" breadcrumbs={crumb('Users', 'Permissions')} />
      <Panel padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead style={{ background: 'var(--app-surface-2)' }}>
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--app-fg-muted)' }}>Permission</th>
                {roles.map((r) => <th key={r} className="px-4 py-3 text-center text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--app-fg-muted)' }}>{r}</th>)}
              </tr>
            </thead>
            <tbody>
              {perms.map((p, pi) => (
                <tr key={p} style={{ borderTop: '1px solid var(--app-border)' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: 'var(--app-fg-strong)' }}>{p}</td>
                  {roles.map((r, ri) => (
                    <td key={r} className="px-4 py-3 text-center">
                      {grant(ri, pi)
                        ? <Icons.Check size={16} className="mx-auto" style={{ color: 'var(--app-success)' }} />
                        : <Icons.Minus size={16} className="mx-auto" style={{ color: 'var(--app-fg-subtle)' }} />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}

/* ================= GENERIC SECTION (layouts, plugins, menu, maps) ================= */
const SECTION_COPY = {
  '/layouts/horizontal': ['Horizontal Layout', 'The nav can also run as a horizontal bar under the header. This template ships the vertical shell; the horizontal variant reuses the same NAV tree.'],
  '/layouts/boxed': ['Boxed Layout', 'A max-width container centres the app on very wide screens. Toggle it from Appearance settings.'],
  '/layouts/compact': ['Compact Layout', 'Tighter row heights and gutters throughout — good for dense, data-heavy workflows.'],
  '/layouts/sidebar-light': ['Light Sidebar', 'A light-on-light sidebar treatment. The active row uses a soft primary tint instead of the dark fill.'],
  '/layouts/sidebar-compact': ['Compact Sidebar', 'Icon-only rail that expands on hover — maximises horizontal space for content.'],
  '/layouts/sidebar-on-hover': ['On-Hover Sidebar', 'Collapsed to a rail by default; hovering reveals labels in a flyout without shifting the layout.'],
  '/maps/vector': ['Vector Map', 'A token-coloured SVG map. oks-ui has no map primitive, so this is composed from paths + --app-* fills.'],
  '/maps/heatmap': ['Region Heatmap', 'A choropleth built from a div grid, coloured by value against the primary ramp — since <Chart> has no heatmap type.'],
  '/menu/level-2-1': ['Menu Item 2.1', 'A second-level menu leaf. This page exists so every nav entry resolves to a real screen.'],
  '/menu/level-2-2': ['Menu Item 2.2', 'A second-level menu leaf.'],
  '/menu/level-3-1': ['Menu Item 3.1', 'A third-level menu leaf, three groups deep in the sidebar.'],
  '/menu/level-3-2': ['Menu Item 3.2', 'A third-level menu leaf.'],
}
export function SectionPage() {
  const { pathname } = useLocation()
  const [title, body] = SECTION_COPY[pathname] || [
    pathname.split('/').filter(Boolean).slice(-1)[0].replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    'This screen is wired into the shell with the standard page header and card frame.',
  ]
  const isMap = pathname.startsWith('/maps')
  return (
    <>
      <PageHeader title={title} breadcrumbs={[{ label: 'Bilkoss', to: '/' }, { label: title }]} />
      <Panel title={title}>
        <p className="max-w-2xl text-[13.5px] leading-relaxed" style={{ color: 'var(--app-fg-muted)' }}>{body}</p>
        {isMap ? (
          <div className="mt-5 grid grid-cols-6 gap-1.5 sm:grid-cols-12">
            {Array.from({ length: 96 }).map((_, i) => {
              const v = rng(i)
              return <div key={i} className="aspect-square rounded-sm" style={{ background: `color-mix(in srgb, var(--app-primary) ${Math.round(v * 90 + 8)}%, var(--app-surface-2))` }} />
            })}
          </div>
        ) : (
          <div className="mt-5">
            <SectionTitle className="mb-2">Preview</SectionTitle>
            <EmptyState icon={Icons.LayoutTemplate} title="Layout preview" description="Switch this option on from Account Settings → Appearance to see it applied to the whole app." />
          </div>
        )}
      </Panel>
    </>
  )
}
