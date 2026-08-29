const bc = (group, leaf) => [{ label: 'Bilkoss', to: '/' }, { label: group }, { label: leaf }]

const f = (type, name, label, extra = {}) => ({ type, name, label, ...extra })

export const FORM_CONFIGS = {
  '/apps/hrm/salary-slip': {
    title: 'Create Salary Slip',
    breadcrumbs: bc('HRM', 'Create Salary Slip'),
    submitLabel: 'Generate slip',
    groups: [
      {
        title: 'Employee & period',
        fields: [
          f('select', 'employee', 'Employee', { required: true, options: ['Alicia Diaz', 'Marcus Cole', 'Rae Shaw', 'Kendall Ward'].map((v) => ({ label: v, value: v })) }),
          f('select', 'month', 'Pay period', { options: ['August 2026', 'July 2026', 'June 2026'].map((v) => ({ label: v, value: v })) }),
          f('datepicker', 'payDate', 'Payment date'),
          f('select', 'method', 'Method', { options: [{ label: 'Bank transfer', value: 'ach' }, { label: 'Wire', value: 'wire' }] }),
        ],
      },
      {
        title: 'Earnings & deductions',
        fields: [
          f('number', 'basic', 'Basic salary', { props: { prefix: '$' } }),
          f('number', 'allowance', 'Allowances', { props: { prefix: '$' } }),
          f('number', 'tax', 'Tax withheld', { props: { prefix: '$' } }),
          f('number', 'other', 'Other deductions', { props: { prefix: '$' } }),
        ],
      },
      { title: 'Notes', fields: [f('textarea', 'notes', 'Notes on the slip', { full: true })] },
    ],
  },
  '/apps/ecommerce/product-add': {
    title: 'Add Product',
    breadcrumbs: bc('Ecommerce', 'Add Product'),
    submitLabel: 'Publish product',
    groups: [
      {
        title: 'Product details',
        fields: [
          f('text', 'name', 'Product name', { required: true, full: true, placeholder: 'Modern Fabric Sofa Set' }),
          f('textarea', 'description', 'Description', { full: true, placeholder: 'Describe the product…' }),
          f('text', 'sku', 'SKU', { placeholder: 'FN-9021' }),
          f('text', 'brand', 'Brand', { placeholder: 'Homeluxe' }),
          f('select', 'category', 'Category', {
            options: ['Furniture', 'Living', 'Bedroom', 'Kitchen', 'Office', 'Lighting'].map((v) => ({ label: v, value: v })),
          }),
          f('select', 'status', 'Status', { options: [{ label: 'Draft', value: 'draft' }, { label: 'Published', value: 'published' }] }),
        ],
      },
      {
        title: 'Pricing & inventory',
        fields: [
          f('number', 'price', 'Price', { required: true, placeholder: '0.00', props: { prefix: '$' } }),
          f('number', 'compareAt', 'Compare-at price', { placeholder: '0.00', props: { prefix: '$' } }),
          f('number', 'stock', 'Stock quantity', { placeholder: '0' }),
          f('text', 'barcode', 'Barcode', { placeholder: '0000000000000' }),
        ],
      },
      { title: 'Media', fields: [f('file', 'images', 'Product images', { full: true, props: { ui: 'dropzone', isDroppable: true, maxFiles: 6 } })] },
    ],
    sidePanels: [
      {
        title: 'Organization',
        fields: [
          f('text', 'tags', 'Tags', { placeholder: 'sofa, living-room' }),
          f('select', 'vendor', 'Vendor', { options: [{ label: 'In-house', value: 'in' }, { label: 'Dropship', value: 'ds' }] }),
          f('switch', 'featured', 'Featured product'),
        ],
      },
    ],
  },

  '/apps/ecommerce/order-add': {
    title: 'Add / Edit Order',
    breadcrumbs: bc('Ecommerce', 'Add Order'),
    submitLabel: 'Create order',
    groups: [
      {
        title: 'Customer',
        fields: [
          f('text', 'customer', 'Customer name', { required: true }),
          f('email', 'email', 'Email', { required: true }),
          f('phone', 'phone', 'Phone'),
          f('select', 'payment', 'Payment method', { options: ['Credit Card', 'UPI', 'PayPal', 'Bank Transfer'].map((v) => ({ label: v, value: v })) }),
        ],
      },
      {
        title: 'Shipping address',
        fields: [
          f('text', 'line1', 'Address line 1', { full: true }),
          f('text', 'city', 'City'),
          f('text', 'zip', 'ZIP / Postal code'),
          f('select', 'country', 'Country', { options: ['United States', 'United Kingdom', 'Germany', 'Australia'].map((v) => ({ label: v, value: v })) }),
        ],
      },
    ],
  },

  '/apps/invoice/create': {
    title: 'New Invoice',
    breadcrumbs: bc('Invoice', 'New Invoice'),
    submitLabel: 'Send invoice',
    groups: [
      {
        title: 'Invoice details',
        fields: [
          f('text', 'number', 'Invoice number', { props: { defaultValue: 'INV-20273' } }),
          f('text', 'client', 'Bill to', { required: true }),
          f('datepicker', 'issued', 'Issue date'),
          f('datepicker', 'due', 'Due date'),
        ],
      },
      {
        title: 'Line items',
        fields: [
          f('text', 'item1', 'Description', { full: true, placeholder: 'Design retainer — August' }),
          f('number', 'qty1', 'Qty', { placeholder: '1' }),
          f('number', 'rate1', 'Rate', { placeholder: '0.00', props: { prefix: '$' } }),
        ],
      },
      { title: 'Notes', fields: [f('textarea', 'notes', 'Notes to client', { full: true })] },
    ],
  },

  '/apps/tasks/create': {
    title: 'Create Task',
    breadcrumbs: bc('Tasks', 'Create Task'),
    submitLabel: 'Create task',
    groups: [
      {
        title: 'Task',
        fields: [
          f('text', 'title', 'Title', { required: true, full: true }),
          f('textarea', 'description', 'Description', { full: true }),
          f('select', 'project', 'Project', { options: ['Mobile app revamp', 'Billing v2', 'Design system'].map((v) => ({ label: v, value: v })) }),
          f('select', 'assignee', 'Assignee', { options: ['Alicia Diaz', 'Marcus Cole', 'Rae Shaw'].map((v) => ({ label: v, value: v })) }),
          f('select', 'priority', 'Priority', { options: ['Low', 'Medium', 'High', 'Urgent'].map((v) => ({ label: v, value: v })) }),
          f('datepicker', 'due', 'Due date'),
        ],
      },
    ],
  },

  '/apps/support/ticket-create': {
    title: 'New Ticket',
    breadcrumbs: bc('Support', 'New Ticket'),
    submitLabel: 'Submit ticket',
    groups: [
      {
        title: 'Ticket',
        fields: [
          f('text', 'subject', 'Subject', { required: true, full: true }),
          f('select', 'priority', 'Priority', { options: ['Low', 'Normal', 'High', 'Urgent'].map((v) => ({ label: v, value: v })) }),
          f('select', 'category', 'Category', { options: ['Billing', 'Bug', 'Feature request', 'Account'].map((v) => ({ label: v, value: v })) }),
          f('textarea', 'body', 'Describe the issue', { full: true }),
          f('file', 'attachments', 'Attachments', { full: true, props: { ui: 'dropzone' } }),
        ],
      },
    ],
  },

  '/apps/hrm/staff-add': {
    title: 'Add Staff',
    breadcrumbs: bc('HRM', 'Add Staff'),
    submitLabel: 'Add employee',
    groups: [
      {
        title: 'Personal',
        fields: [
          f('text', 'first', 'First name', { required: true }),
          f('text', 'last', 'Last name', { required: true }),
          f('email', 'email', 'Work email', { required: true }),
          f('phone', 'phone', 'Phone'),
        ],
      },
      {
        title: 'Employment',
        fields: [
          f('select', 'department', 'Department', { options: ['Engineering', 'Design', 'Sales', 'Marketing', 'Support', 'Finance'].map((v) => ({ label: v, value: v })) }),
          f('text', 'title', 'Job title'),
          f('datepicker', 'start', 'Start date'),
          f('number', 'salary', 'Annual salary', { props: { prefix: '$' } }),
        ],
      },
    ],
  },

  '/apps/hrm/leave-add': {
    title: 'Add Leave',
    breadcrumbs: bc('HRM', 'Add Leave'),
    submitLabel: 'Request leave',
    groups: [
      {
        title: 'Leave request',
        fields: [
          f('select', 'employee', 'Employee', { options: ['Alicia Diaz', 'Marcus Cole', 'Rae Shaw'].map((v) => ({ label: v, value: v })) }),
          f('select', 'type', 'Leave type', { options: ['Annual', 'Sick', 'Unpaid', 'Parental'].map((v) => ({ label: v, value: v })) }),
          f('datepicker', 'range', 'Dates', { props: { range: true } }),
          f('textarea', 'reason', 'Reason', { full: true }),
        ],
      },
    ],
  },

  '/apps/more/blog/add': {
    title: 'Add Article',
    breadcrumbs: bc('More Apps', 'Add Article'),
    submitLabel: 'Publish article',
    groups: [
      {
        title: 'Article',
        fields: [
          f('text', 'title', 'Title', { required: true, full: true }),
          f('text', 'slug', 'Slug', { full: true, placeholder: 'my-first-post' }),
          f('select', 'category', 'Category', { options: ['Product', 'Engineering', 'Design', 'Company'].map((v) => ({ label: v, value: v })) }),
          f('text', 'tags', 'Tags'),
          f('textarea', 'excerpt', 'Excerpt', { full: true }),
          f('textarea', 'body', 'Body', { full: true, props: { rows: 8 } }),
        ],
      },
      { title: 'Cover image', fields: [f('file', 'cover', 'Cover', { full: true, props: { ui: 'dropzone' } })] },
    ],
  },
}
