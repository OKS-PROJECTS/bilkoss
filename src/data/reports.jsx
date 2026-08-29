import { EntityCell } from '../Components/ui'
import { num, money } from '../lib/format'
import { pageAnalytics } from './dashboards'
import { products } from './ecommerce'

const bc = (group, leaf) => [{ label: 'Bilkoss', to: '/' }, { label: group }, { label: leaf }]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const ranges = [
  { key: '7d', label: '7 Days' },
  { key: '30d', label: '30 Days' },
  { key: '90d', label: '90 Days' },
]

export const REPORT_CONFIGS = {
  '/apps/ecommerce/sales': {
    title: 'Sales Report', breadcrumbs: bc('Ecommerce', 'Sales'), ranges,
    kpis: [
      { label: 'Gross sales', value: '$482,900', trend: 6.4, icon: null, accent: 'primary' },
      { label: 'Net sales', value: '$441,120', trend: 5.1, accent: 'success' },
      { label: 'Orders', value: '8,541', trend: 3.3, accent: 'info' },
      { label: 'Avg. order value', value: '$56.54', trend: -1.2, accent: 'warning' },
    ],
    chart: {
      title: 'Sales over time', type: 'area',
      data: months.map((month, i) => ({ month, sales: 28 + Math.round(Math.sin(i) * 8 + i * 1.6), refunds: 4 + (i % 5) })),
      x: 'month',
      series: [{ key: 'sales', name: 'Sales' }, { key: 'refunds', name: 'Refunds' }],
      palette: { roles: ['primary', 'danger'] },
    },
    table: {
      title: 'Top products by revenue',
      columns: [
        { key: 'name', header: 'Product', render: (r) => <EntityCell name={r.name} sub={`By ${r.brand}`} icon={<span className="text-[11px] font-bold">{r.name[0]}</span>} /> },
        { key: 'orders', header: 'Orders', align: 'right', sortable: true },
        { key: 'price', header: 'Price', align: 'right', render: (r) => money(r.price) },
        { key: 'rev', header: 'Revenue', align: 'right', sortable: true, sortValue: (r) => r.orders * r.price, render: (r) => money(r.orders * r.price, { compact: true }) },
      ],
      rows: products,
    },
  },

  '/apps/ecommerce/product-views': {
    title: 'Product Views', breadcrumbs: bc('Ecommerce', 'Product Views'), ranges,
    kpis: [
      { label: 'Total views', value: '312,884', trend: 9.1, accent: 'primary' },
      { label: 'Unique visitors', value: '184,201', trend: 4.7, accent: 'info' },
      { label: 'View → cart', value: '6.8%', trend: 0.4, accent: 'success' },
      { label: 'Bounce', value: '38.2%', trend: -2.1, invertTrend: true, accent: 'warning' },
    ],
    chart: {
      title: 'Views by day', type: 'area',
      data: months.map((month, i) => ({ month, views: 180 + Math.round(Math.cos(i) * 40 + i * 6) })),
      x: 'month', series: [{ key: 'views', name: 'Views' }], palette: { roles: ['primary'] },
    },
    table: {
      title: 'Most viewed pages',
      columns: [
        { key: 'path', header: 'Page', render: (r) => <span className="font-medium" style={{ color: 'var(--app-fg-strong)' }}>{r.path}</span> },
        { key: 'views', header: 'Views', align: 'right', sortable: true, render: (r) => num(r.views) },
        { key: 'unique', header: 'Unique', align: 'right', render: (r) => num(r.unique) },
        { key: 'bounce', header: 'Bounce', align: 'right', render: (r) => `${r.bounce}%` },
      ],
      rows: pageAnalytics,
    },
  },
}
