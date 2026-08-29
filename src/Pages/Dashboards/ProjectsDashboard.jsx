import { Button, Chart } from 'oks-ui'
import { Briefcase, FileText, DollarSign, TrendingUp, Clock, Play } from 'lucide-react'
import {
  PageHeader,
  Panel,
  Surface,
  DataTable,
  DonutCard,
  StatusChip,
  Meter,
  Timeline,
  TrendChip,
} from '../../Components/ui'
import { projectPerf, ongoingProjects, scheduleToday, taskList } from '../../data/dashboards'

const bc = [{ label: 'Bilkoss', to: '/' }, { label: 'Dashboard' }, { label: 'Projects' }]

const SUMMARY = [
  { label: 'Total Projects', value: '6,847', pct: -9.19, icon: <Briefcase size={17} />, accent: 'primary' },
  { label: 'Total Tasks', value: '9.60k', pct: 26.87, icon: <FileText size={17} />, accent: 'info' },
  { label: 'Avg. Project Earnings', value: '$98.24k', pct: 3.51, icon: <DollarSign size={17} />, accent: 'warning' },
  { label: 'Productivity', value: '87.84%', pct: -1.05, icon: <TrendingUp size={17} />, accent: 'success' },
]

const OVERVIEW_STATS = [
  { label: 'Number of Projects', value: '7,845' },
  { label: 'Active Projects', value: '289' },
  { label: 'Revenue', value: '$982.50k' },
  { label: 'Working Hours', value: '~12,559h' },
]

const perfBars = projectPerf.map((p, i) => ({ ...p, month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'][i] }))

const PRJ_COLS = [
  { key: 'name', header: 'Project', render: (r) => <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.name}</span> },
  { key: 'lead', header: 'Lead' },
  { key: 'progress', header: 'Progress', width: 160, render: (r) => (
    <div className="flex items-center gap-2">
      <Meter value={r.progress} className="flex-1" />
      <span className="text-[12px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{r.progress}%</span>
    </div>
  ) },
  { key: 'due', header: 'Due' },
  { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
]

const TASK_COLS = [
  { key: 'title', header: 'Task', render: (r) => <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.title}</span> },
  { key: 'assignee', header: 'Assignee' },
  { key: 'priority', header: 'Priority', render: (r) => <StatusChip status={r.priority === 'High' ? 'Overdue' : r.priority === 'Medium' ? 'Pending' : 'Completed'} /> },
  { key: 'status', header: 'Status', render: (r) => <StatusChip status={r.status} /> },
]

export default function ProjectsDashboard() {
  return (
    <>
      <PageHeader title="Projects" breadcrumbs={bc} />

      <Surface bodyClassName="p-5">
        <div className="grid grid-cols-2 gap-5 divide-y sm:divide-x sm:divide-y-0 md:grid-cols-3 xl:grid-cols-5" style={{ borderColor: 'var(--app-border)' }}>
          {SUMMARY.map((s) => (
            <div key={s.label} className="pt-4 first:pt-0 sm:pt-0 sm:pl-5 sm:first:pl-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--app-fg-subtle)' }}>{s.label}</p>
              <p className="mt-2 flex items-center gap-2 text-[22px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: `var(--app-${s.accent}-soft)`, color: `var(--app-${s.accent})` }}>{s.icon}</span>
                {s.value}
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>
                <TrendChip value={s.pct} /> Since last month
              </p>
            </div>
          ))}
          <div className="pt-4 first:pt-0 sm:pt-0 sm:pl-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--app-fg-subtle)' }}>Today&apos;s Hours</p>
            <p className="mt-2 flex items-center gap-2 text-[22px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
              <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: 'var(--app-secondary-soft)', color: 'var(--app-violet)' }}><Clock size={17} /></span>
              05:30
            </p>
            <Button size="sm" color="info" variant="soft" className="mt-2" startContent={<Play size={12} />}>Start Tracker</Button>
          </div>
        </div>
      </Surface>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel title="Project Status Breakdown">
          <DonutCard
            data={[
              { label: 'Completed', value: 965 },
              { label: 'In Progress', value: 75 },
              { label: 'Yet to Start', value: 102 },
              { label: 'Cancelled', value: 96 },
            ]}
            centerLabel="Projects"
            centerValue="1,238"
            legend={false}
            roles={['primary', 'warning', 'info', 'danger']}
          />
          <ul className="mt-4 grid grid-cols-2 gap-3 text-[12.5px]">
            {[['Completed', '965', 'primary'], ['In Progress', '75', 'warning'], ['Yet to Start', '102', 'info'], ['Cancelled', '96', 'danger']].map(([l, n, c]) => (
              <li key={l} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5" style={{ color: 'var(--app-fg)' }}><span className="h-2 w-2 rounded-full" style={{ background: `var(--app-${c})` }} />{l}</span>
                <span className="font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{n}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel className="xl:col-span-2" title="Projects Performance Overview">
          <div className="mb-4 grid grid-cols-2 gap-4 border-b border-dashed pb-4 sm:grid-cols-4" style={{ borderColor: 'var(--app-border)' }}>
            {OVERVIEW_STATS.map((s) => (
              <div key={s.label}>
                <p className="text-[16px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>{s.value}</p>
                <p className="text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
          <Chart
            type="column"
            data={perfBars}
            x="month"
            series={[
              { key: 'planned', name: 'Planned' },
              { key: 'actual', name: 'Actual' },
            ]}
            palette={{ roles: ['primary', 'warning'] }}
            column={{ radius: 2 }}
            height={280}
            legend={{ position: 'bottom' }}
            grid={{ horizontal: true, vertical: false }}
          />
        </Panel>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-4">
        <Panel title="Today's Schedule">
          <Timeline
            items={scheduleToday.map((s) => ({ id: s.id, title: s.title, time: s.time, color: s.color }))}
          />
        </Panel>
        <Panel className="xl:col-span-3" title="Ongoing Projects">
          <DataTable columns={PRJ_COLS} rows={ongoingProjects} pageSize={6} />
        </Panel>
      </div>

      <Panel className="mt-6" title="Tasks">
        <DataTable columns={TASK_COLS} rows={taskList} pageSize={8} />
      </Panel>
    </>
  )
}
