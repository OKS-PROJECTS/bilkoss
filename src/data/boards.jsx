const bc = (group, leaf) => [{ label: 'Bilkoss', to: '/' }, { label: group }, { label: leaf }]

const card = (id, title, tag, tagColor, assignees, due) => ({ id, title, tag, tagColor, assignees, due })

export const BOARD_CONFIGS = {
  '/apps/projects/kanban': {
    title: 'Kanban Board', breadcrumbs: bc('Projects', 'Kanban Board'),
    columns: [
      { id: 'backlog', title: 'Backlog', color: 'info', cards: [
        card('k1', 'Audit third-party scripts', 'Chore', 'info', [3, 8], 'Sep 12'),
        card('k2', 'Draft Q4 OKRs', 'Planning', 'secondary', [1], 'Sep 15'),
        card('k3', 'Spike: offline sync', 'Research', 'warning', [5, 2], 'Sep 20'),
      ] },
      { id: 'todo', title: 'To Do', color: 'primary', cards: [
        card('k4', 'Rebuild settings screen', 'Feature', 'primary', [8], 'Sep 8'),
        card('k5', 'Add empty states to tables', 'UI', 'primary', [2], 'Sep 9'),
      ] },
      { id: 'doing', title: 'In Progress', color: 'warning', cards: [
        card('k6', 'Checkout race condition', 'Bug', 'danger', [5], 'Sep 5'),
        card('k7', 'Dark-mode token pass', 'UI', 'primary', [3, 1], 'Sep 6'),
      ] },
      { id: 'review', title: 'Review', color: 'secondary', cards: [
        card('k8', 'Invoice PDF export', 'Bug', 'danger', [8, 2], 'Sep 4'),
      ] },
      { id: 'done', title: 'Done', color: 'success', cards: [
        card('k9', 'Migrate to Vite 8', 'Chore', 'success', [5], 'Aug 30'),
        card('k10', 'New pagination component', 'UI', 'success', [3], 'Aug 28'),
      ] },
    ],
  },

  '/apps/projects/team-board': {
    title: 'Team Board', breadcrumbs: bc('Projects', 'Team Board'),
    columns: [
      { id: 'alicia', title: 'Alicia Diaz', color: 'primary', cards: [
        card('t1', 'Design system — tokens', 'Design system', 'primary', [1], 'Sep 10'),
        card('t2', 'Review: settings screen', 'Review', 'secondary', [1], 'Sep 8'),
      ] },
      { id: 'marcus', title: 'Marcus Cole', color: 'info', cards: [
        card('t3', 'API gateway rollout', 'Infra', 'info', [2], 'Sep 14'),
      ] },
      { id: 'rae', title: 'Rae Shaw', color: 'warning', cards: [
        card('t4', 'Checkout race condition', 'Bug', 'danger', [5], 'Sep 5'),
        card('t5', 'Idempotency test suite', 'Testing', 'warning', [5], 'Sep 7'),
      ] },
      { id: 'kendall', title: 'Kendall Ward', color: 'success', cards: [
        card('t6', 'Onboarding funnel events', 'Analytics', 'success', [8], 'Sep 11'),
      ] },
    ],
  },

  '/apps/crm/pipeline': {
    title: 'Pipeline', breadcrumbs: bc('CRM', 'Pipeline'),
    columns: [
      { id: 'new', title: 'New', color: 'info', cards: [
        card('p1', 'Northwind Retail — renewal', '$24k', 'info', [1], 'Oct 1'),
        card('p2', 'Acme Logistics — new logo', '$18k', 'info', [2], 'Oct 4'),
      ] },
      { id: 'qualified', title: 'Qualified', color: 'primary', cards: [
        card('p3', 'Globex Media — expansion', '$42k', 'primary', [1], 'Oct 8'),
      ] },
      { id: 'proposal', title: 'Proposal', color: 'warning', cards: [
        card('p4', 'Initech Cloud — upsell', '$31k', 'warning', [2], 'Oct 12'),
        card('p5', 'Umbrella Health — new logo', '$56k', 'warning', [1], 'Oct 15'),
      ] },
      { id: 'won', title: 'Won', color: 'success', cards: [
        card('p6', 'Soylent Foods — renewal', '$28k', 'success', [2], 'Sep 28'),
      ] },
    ],
  },
}
