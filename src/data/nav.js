import {
  LayoutDashboard,
  ShoppingBag,
  MessagesSquare,
  FolderKanban,
  ListChecks,
  ReceiptText,
  Contact,
  UsersRound,
  Wallet,
  BriefcaseBusiness,
  Mail,
  LifeBuoy,
  TicketPercent,
  Boxes,
  FileText,
  ShieldCheck,
  TriangleAlert,
  PanelLeft,
  PanelTop,
  Component,
  LayoutGrid,
  ChartColumnBig,
  TextCursorInput,
  Table2,
  Sparkles,
  Map,
  Layers,
} from 'lucide-react'

/**
 * The sidebar, mirrored from the reference's information architecture.
 * NAV  — the tree the <Sidebar> renders.
 * NAV_ROUTES — a flat, deduped list of every leaf `to`, drives the fallback map.
 */
export const NAV = [
  { heading: 'Main' },
  {
    label: 'Dashboards',
    icon: LayoutDashboard,
    children: [
      { label: 'E-Commerce', to: '/dashboards/ecommerce' },
      { label: 'Analytics', to: '/dashboards/analytics' },
      { label: 'CRM', to: '/dashboards/crm' },
      { label: 'Finance', to: '/dashboards/finance' },
      { label: 'Projects', to: '/dashboards/projects' },
    ],
  },

  { heading: 'Apps' },
  {
    label: 'E-Commerce',
    icon: ShoppingBag,
    children: [
      {
        label: 'Products',
        children: [
          { label: 'Products', to: '/apps/ecommerce/products' },
          { label: 'Products Grid', to: '/apps/ecommerce/products-grid' },
          { label: 'Product Details', to: '/apps/ecommerce/product-details' },
          { label: 'Add Product', to: '/apps/ecommerce/product-add' },
        ],
      },
      { label: 'Categories', to: '/apps/ecommerce/categories' },
      {
        label: 'Orders',
        children: [
          { label: 'Orders', to: '/apps/ecommerce/orders' },
          { label: 'Order Details', to: '/apps/ecommerce/order-details' },
          { label: 'Add / Edit Order', to: '/apps/ecommerce/order-add' },
        ],
      },
      { label: 'Customers', to: '/apps/ecommerce/customers' },
      { label: 'Cart', to: '/apps/ecommerce/cart' },
      { label: 'Checkout', to: '/apps/ecommerce/checkout' },
      {
        label: 'Sellers',
        children: [
          { label: 'Sellers', to: '/apps/ecommerce/sellers' },
          { label: 'Seller Details', to: '/apps/ecommerce/seller-details' },
        ],
      },
      { label: 'Refunds', to: '/apps/ecommerce/refunds' },
      { label: 'Reviews', to: '/apps/ecommerce/reviews' },
      {
        label: 'Inventory',
        children: [
          { label: 'Warehouse', to: '/apps/ecommerce/warehouse' },
          { label: 'Product Stocks', to: '/apps/ecommerce/product-stocks' },
          { label: 'Purchased Orders', to: '/apps/ecommerce/purchased-orders' },
        ],
      },
      {
        label: 'Reports',
        children: [
          { label: 'Product Views', to: '/apps/ecommerce/product-views' },
          { label: 'Sales', to: '/apps/ecommerce/sales' },
        ],
      },
      { label: 'Attributes', to: '/apps/ecommerce/attributes' },
      { label: 'Settings', to: '/apps/ecommerce/settings' },
    ],
  },
  { label: 'Chat', icon: MessagesSquare, to: '/apps/chat' },
  {
    label: 'Projects',
    icon: FolderKanban,
    children: [
      { label: 'My Projects', to: '/apps/projects/grid' },
      { label: 'Projects List', to: '/apps/projects/list' },
      { label: 'View Project', to: '/apps/projects/details' },
      { label: 'Kanban Board', to: '/apps/projects/kanban' },
      { label: 'Team Board', to: '/apps/projects/team-board' },
      { label: 'Activity Stream', to: '/apps/projects/activity' },
    ],
  },
  {
    label: 'Tasks',
    icon: ListChecks,
    children: [
      { label: 'Task List', to: '/apps/tasks/list' },
      { label: 'Task Details', to: '/apps/tasks/details' },
      { label: 'Create Task', to: '/apps/tasks/create' },
    ],
  },
  {
    label: 'Invoice',
    icon: ReceiptText,
    children: [
      { label: 'Invoices', to: '/apps/invoice/list' },
      { label: 'Single Invoice', to: '/apps/invoice/details' },
      { label: 'New Invoice', to: '/apps/invoice/create' },
    ],
  },
  {
    label: 'CRM',
    icon: Contact,
    children: [
      { label: 'Contacts', to: '/apps/crm/contacts' },
      { label: 'Opportunities', to: '/apps/crm/opportunities' },
      { label: 'Deals', to: '/apps/crm/deals' },
      { label: 'Leads', to: '/apps/crm/leads' },
      { label: 'Pipeline', to: '/apps/crm/pipeline' },
      { label: 'Campaign', to: '/apps/crm/campaign' },
      { label: 'Proposals', to: '/apps/crm/proposals' },
      { label: 'Estimations', to: '/apps/crm/estimations' },
      { label: 'Customers', to: '/apps/crm/customers' },
      { label: 'Activities', to: '/apps/crm/activities' },
    ],
  },
  {
    label: 'Users',
    icon: UsersRound,
    children: [
      { label: 'Contacts', to: '/apps/users/contacts' },
      { label: 'Profile', to: '/apps/users/profile' },
      { label: 'Account Settings', to: '/apps/users/account-settings' },
      { label: 'Roles', to: '/apps/users/roles' },
      { label: 'Role Details', to: '/apps/users/role-details' },
      { label: 'Permissions', to: '/apps/users/permissions' },
    ],
  },
  {
    label: 'Finance',
    icon: Wallet,
    children: [
      {
        label: 'Expenses',
        children: [
          { label: 'Expenses', to: '/apps/finance/expenses' },
          { label: 'Expense Category', to: '/apps/finance/expense-category' },
        ],
      },
      { label: 'Income', to: '/apps/finance/income' },
      { label: 'Transactions', to: '/apps/finance/transactions' },
      { label: 'Banks & Cards', to: '/apps/finance/banks-cards' },
    ],
  },
  {
    label: 'HRM',
    icon: BriefcaseBusiness,
    children: [
      {
        label: 'Staff',
        children: [
          { label: 'Staff List', to: '/apps/hrm/staff' },
          { label: 'Staff Profile', to: '/apps/hrm/staff-profile' },
          { label: 'Add Staff', to: '/apps/hrm/staff-add' },
        ],
      },
      { label: 'Departments', to: '/apps/hrm/departments' },
      { label: 'Attendance', to: '/apps/hrm/attendance' },
      {
        label: 'Leaves',
        children: [
          { label: 'Leaves', to: '/apps/hrm/leaves' },
          { label: 'Add Leave', to: '/apps/hrm/leave-add' },
        ],
      },
      { label: 'Holidays', to: '/apps/hrm/holidays' },
      { label: 'Payroll', to: '/apps/hrm/payroll' },
      { label: 'Create Salary Slip', to: '/apps/hrm/salary-slip' },
    ],
  },
  {
    label: 'Email',
    icon: Mail,
    children: [
      { label: 'Inbox', to: '/apps/email/inbox' },
      { label: 'Details', to: '/apps/email/details' },
      { label: 'Compose', to: '/apps/email/compose' },
    ],
  },
  {
    label: 'Support Center',
    icon: LifeBuoy,
    children: [
      { label: 'Tickets List', to: '/apps/support/tickets' },
      { label: 'Ticket Details', to: '/apps/support/ticket-details' },
      { label: 'New Ticket', to: '/apps/support/ticket-create' },
    ],
  },
  {
    label: 'Promo',
    icon: TicketPercent,
    children: [
      { label: 'Coupons', to: '/apps/promo/coupons' },
      { label: 'Gift Cards', to: '/apps/promo/gift-cards' },
      { label: 'Discounts', to: '/apps/promo/discounts' },
    ],
  },
  {
    label: 'More Apps',
    icon: Boxes,
    children: [
      { label: 'Social Feed', to: '/apps/more/social-feed' },
      { label: 'AI Assistant', to: '/apps/more/ai' },
      { label: 'File Manager', to: '/apps/more/file-manager' },
      { label: 'Calendar', to: '/apps/more/calendar' },
      { label: 'Companies', to: '/apps/more/companies' },
      { label: 'Todo', to: '/apps/more/todo' },
      { label: 'Pin Board', to: '/apps/more/pin-board' },
      { label: 'Clients', to: '/apps/more/clients' },
      { label: 'Vote List', to: '/apps/more/vote-list' },
      { label: 'Issue Tracker', to: '/apps/more/issue-tracker' },
      { label: 'API Keys', to: '/apps/more/api-keys' },
      { label: 'Manage Apps', to: '/apps/more/manage' },
      {
        label: 'Blog',
        children: [
          { label: 'Blog List', to: '/apps/more/blog/list' },
          { label: 'Blog Grid', to: '/apps/more/blog/grid' },
          { label: 'Article', to: '/apps/more/blog/article' },
          { label: 'Add Article', to: '/apps/more/blog/add' },
        ],
      },
    ],
  },

  { heading: 'Custom Pages' },
  {
    label: 'Pages',
    icon: FileText,
    children: [
      { label: 'About Us', to: '/pages/about' },
      { label: 'Contact Us', to: '/pages/contact' },
      { label: 'Pricing', to: '/pages/pricing' },
      { label: 'Timeline', to: '/pages/timeline' },
      { label: 'Gallery', to: '/pages/gallery' },
      { label: 'FAQ', to: '/pages/faq' },
      { label: 'Sitemap', to: '/pages/sitemap' },
      { label: 'Search Results', to: '/pages/search-results' },
      { label: 'Privacy Policy', to: '/pages/privacy-policy' },
      { label: 'Terms & Conditions', to: '/pages/terms' },
      { label: 'Empty Page', to: '/pages/empty' },
    ],
  },
  {
    label: 'Authentication',
    icon: ShieldCheck,
    children: [
      { label: 'Sign In', to: '/auth/sign-in' },
      { label: 'Sign Up', to: '/auth/sign-up' },
      { label: 'Reset Password', to: '/auth/reset-password' },
      { label: 'New Password', to: '/auth/new-password' },
      { label: 'Two Factor', to: '/auth/two-factor' },
      { label: 'Lock Screen', to: '/auth/lock-screen' },
      { label: 'Success Mail', to: '/auth/success' },
      { label: 'Login with PIN', to: '/auth/pin' },
    ],
  },
  {
    label: 'Error Pages',
    icon: TriangleAlert,
    children: [
      { label: '400 Bad Request', to: '/errors/400' },
      { label: '401 Unauthorized', to: '/errors/401' },
      { label: '403 Forbidden', to: '/errors/403' },
      { label: '404 Not Found', to: '/errors/404' },
      { label: '408 Request Timeout', to: '/errors/408' },
      { label: '500 Internal Server', to: '/errors/500' },
      { label: 'Maintenance', to: '/errors/maintenance' },
    ],
  },

  { heading: 'Layouts' },
  {
    label: 'Layout Options',
    icon: PanelTop,
    children: [
      { label: 'Horizontal', to: '/layouts/horizontal' },
      { label: 'Boxed', to: '/layouts/boxed' },
      { label: 'Compact', to: '/layouts/compact' },
    ],
  },
  {
    label: 'Sidebars',
    icon: PanelLeft,
    children: [
      { label: 'Light Menu', to: '/layouts/sidebar-light' },
      { label: 'Compact Menu', to: '/layouts/sidebar-compact' },
      { label: 'On-Hover Menu', to: '/layouts/sidebar-on-hover' },
    ],
  },

  { heading: 'Components' },
  {
    label: 'Component Gallery',
    icon: Component,
    children: [
      { label: 'Overview', to: '/components' },
      { label: 'Kitchen Sink', to: '/components/kitchen-sink' },
    ],
  },
  {
    label: 'Widgets',
    icon: LayoutGrid,
    children: [
      { label: 'Statistics', to: '/widgets/statistics' },
      { label: 'Chart Widgets', to: '/widgets/charts' },
      { label: 'Social', to: '/widgets/social' },
    ],
  },
  {
    label: 'Charts',
    icon: ChartColumnBig,
    children: [
      { label: 'Line & Area', to: '/charts/line-area' },
      { label: 'Comparisons', to: '/charts/comparisons' },
      { label: 'Distributions', to: '/charts/distributions' },
      { label: 'Progress & Gauges', to: '/charts/progress' },
    ],
  },
  {
    label: 'Forms',
    icon: TextCursorInput,
    children: [
      { label: 'Basic Elements', to: '/forms/elements' },
      { label: 'Validation', to: '/forms/validation' },
      { label: 'Wizard', to: '/forms/wizard' },
      { label: 'Pickers', to: '/forms/pickers' },
      { label: 'File Uploads', to: '/forms/uploads' },
      { label: 'Text Editor', to: '/forms/editor' },
      { label: 'Layouts', to: '/forms/layouts' },
    ],
  },
  {
    label: 'Tables',
    icon: Table2,
    children: [
      { label: 'Static Tables', to: '/tables/static' },
      { label: 'Data Table', to: '/tables/data-table' },
    ],
  },
  {
    label: 'Icons',
    icon: Sparkles,
    children: [{ label: 'Lucide', to: '/icons/lucide' }],
  },
  {
    label: 'Maps',
    icon: Map,
    children: [
      { label: 'Vector Map', to: '/maps/vector' },
      { label: 'Region Heatmap', to: '/maps/heatmap' },
    ],
  },
  {
    label: 'Menu Levels',
    icon: Layers,
    children: [
      {
        label: 'Second Level',
        children: [
          { label: 'Item 2.1', to: '/menu/level-2-1' },
          { label: 'Item 2.2', to: '/menu/level-2-2' },
        ],
      },
      {
        label: 'Second Level',
        children: [
          {
            label: 'Third Level',
            children: [
              { label: 'Item 3.1', to: '/menu/level-3-1' },
              { label: 'Item 3.2', to: '/menu/level-3-2' },
            ],
          },
        ],
      },
    ],
  },
]

const collect = (items) =>
  items.flatMap((n) => (n.children ? collect(n.children) : n.to ? [n.to] : []))

export const NAV_ROUTES = Array.from(
  new Set(NAV.flatMap((s) => (s.children ? collect(s.children) : s.to ? [s.to] : []))),
)
