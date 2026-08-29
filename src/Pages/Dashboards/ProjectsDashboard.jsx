import { FolderKanban, CheckCircle2, Clock3, AlertTriangle } from 'lucide-react'
import {
  PageHeader,
  Panel,
  Surface,
  DataTable,
  ChartCard,
  DonutCard,
  StatusChip,
  Meter,
  Timeline,
} from '../../Components/ui'
import { projectStatus, projectPerf, ongoingProjects, scheduleToday, taskList } from '../../data/dashboards'

const bc = [{ label: 'Bilkoss', to: '/' }, { label: 'Dashboard' }, { label: 'Projects' }]

const SUMMARY = [
  { label: 'Total Projects', value: '51', icon: <FolderKanban size={18} />, accent: 'primary' },
  { label: 'Completed', value: '24', icon: <CheckCircle2 size={18} />, accent: 'success' },
  { label: 'In Progress', value: '18', icon: <Clock3 size={18} />, accent: 'info' },
  { label: 'At Risk', value: '9', icon: <AlertTriangle size={18} />, accent: 'warning' },
]

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
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {SUMMARY.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-full"
                style={{ background: `var(--app-${s.accent}-soft)`, color: `var(--app-${s.accent})` }}
              >
                {s.icon}
              </span>
              <div>
                <p className="text-[22px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>{s.value}</p>
                <p className="text-[12px] font-medium" style={{ color: 'var(--app-fg-muted)' }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Surface>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel title="Project Status Breakdown">
          <DonutCard data={projectStatus} centerLabel="Projects" centerValue="51" roles={['success', 'warning', 'danger', 'primary']} />
        </Panel>
        <ChartCard
          className="xl:col-span-2"
          title="Projects Performance Overview"
          type="area"
          data={projectPerf}
          x="month"
          series={[
            { key: 'planned', name: 'Planned' },
            { key: 'actual', name: 'Actual' },
          ]}
          palette={{ roles: ['info', 'primary'] }}
          height={340}
        />
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
