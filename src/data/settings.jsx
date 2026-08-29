const bc = (group, leaf) => [{ label: 'Bilkoss', to: '/' }, { label: group }, { label: leaf }]
const f = (type, name, label, extra = {}) => ({ type, name, label, ...extra })

export const SETTINGS_CONFIGS = {
  '/apps/ecommerce/settings': {
    title: 'Store Settings', breadcrumbs: bc('Ecommerce', 'Settings'),
    tabs: [
      {
        key: 'general', label: 'General',
        groups: [{
          title: 'Storefront',
          fields: [
            f('text', 'name', 'Store name', { props: { defaultValue: 'Bilkoss Home' } }),
            f('email', 'email', 'Support email', { props: { defaultValue: 'help@bilkoss.example' } }),
            f('select', 'currency', 'Default currency', { options: ['USD', 'EUR', 'GBP', 'AUD'].map((v) => ({ label: v, value: v })) }),
            f('select', 'timezone', 'Timezone', { options: ['UTC', 'America/New_York', 'Europe/London'].map((v) => ({ label: v, value: v })) }),
          ],
        }],
      },
      {
        key: 'checkout', label: 'Checkout',
        groups: [{
          title: 'Checkout behaviour',
          fields: [
            f('switch', 'guest', 'Allow guest checkout', { props: { defaultChecked: true } }),
            f('switch', 'tips', 'Show tipping option'),
            f('select', 'tax', 'Tax calculation', { options: [{ label: 'Automatic', value: 'auto' }, { label: 'Manual', value: 'manual' }] }),
            f('text', 'terms', 'Terms URL', { full: true }),
          ],
        }],
      },
      {
        key: 'shipping', label: 'Shipping',
        groups: [{
          title: 'Zones & rates',
          fields: [
            f('text', 'origin', 'Ship-from ZIP'),
            f('number', 'flat', 'Flat rate', { props: { prefix: '$' } }),
            f('number', 'freeOver', 'Free shipping over', { props: { prefix: '$' } }),
            f('switch', 'intl', 'Enable international shipping'),
          ],
        }],
      },
      {
        key: 'notifications', label: 'Notifications',
        groups: [{
          title: 'Email me when',
          fields: [
            f('switch', 'order', 'A new order is placed', { props: { defaultChecked: true } }),
            f('switch', 'refund', 'A refund is requested', { props: { defaultChecked: true } }),
            f('switch', 'lowstock', 'A product is low on stock'),
            f('switch', 'review', 'A review is submitted'),
          ],
        }],
      },
    ],
  },

  '/apps/users/account-settings': {
    title: 'Account Settings', breadcrumbs: bc('Users', 'Account Settings'),
    tabs: [
      {
        key: 'profile', label: 'Profile',
        groups: [{
          fields: [
            f('text', 'first', 'First name', { props: { defaultValue: 'David' } }),
            f('text', 'last', 'Last name', { props: { defaultValue: 'Dev' } }),
            f('email', 'email', 'Email', { props: { defaultValue: 'david@bilkoss.example' } }),
            f('phone', 'phone', 'Phone'),
            f('textarea', 'bio', 'Bio', { full: true }),
          ],
        }],
      },
      {
        key: 'security', label: 'Security',
        groups: [{
          title: 'Password',
          fields: [
            f('password', 'current', 'Current password'),
            f('password', 'next', 'New password'),
            f('password', 'confirm', 'Confirm new password'),
          ],
        }, {
          title: 'Two-factor',
          fields: [f('switch', '2fa', 'Require an authenticator code on sign in', { props: { defaultChecked: true } })],
        }],
      },
      {
        key: 'notifications', label: 'Notifications',
        groups: [{
          title: 'Product',
          fields: [
            f('switch', 'digest', 'Weekly summary email', { props: { defaultChecked: true } }),
            f('switch', 'mentions', 'When someone @mentions me', { props: { defaultChecked: true } }),
            f('switch', 'assigned', 'When a task is assigned to me', { props: { defaultChecked: true } }),
            f('switch', 'marketing', 'Product news and tips'),
          ],
        }],
      },
      {
        key: 'appearance', label: 'Appearance',
        groups: [{
          fields: [
            f('radio', 'theme', 'Theme', { options: [{ label: 'System', value: 'system' }, { label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }] }),
            f('select', 'density', 'Density', { options: [{ label: 'Comfortable', value: 'comfortable' }, { label: 'Compact', value: 'compact' }] }),
            f('select', 'start', 'Landing page', { options: ['eCommerce Dashboard', 'Analytics Dashboard', 'Tasks'].map((v) => ({ label: v, value: v })) }),
          ],
        }],
      },
    ],
  },
}
