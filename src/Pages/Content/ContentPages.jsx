import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Button, Chip, TextField } from 'oks-ui'
import { Check, Search, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { PageHeader, Panel, Surface, Accordion, Timeline, SectionTitle } from '../../Components/ui'
import { NAV } from '../../data/nav'
import { avatarUrl, person } from '../../data/more'

const bc = (leaf) => [{ label: 'Bilkoss', to: '/' }, { label: 'Pages' }, { label: leaf }]

/* ---------------- Profile ---------------- */
export function UserProfile() {
  return (
    <>
      <PageHeader title="Profile" breadcrumbs={[{ label: 'Bilkoss', to: '/' }, { label: 'Users' }, { label: 'Profile' }]} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Surface bodyClassName="p-6 text-center" className="lg:col-span-1">
          <Avatar name="David Dev" src={avatarUrl(7)} size="xl" showFallback className="mx-auto" />
          <h2 className="font-display mt-3 text-[18px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>David Dev</h2>
          <p className="text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>Admin Head · Engineering</p>
          <div className="mt-4 flex justify-center gap-2">
            <Button size="sm" color="primary">Follow</Button>
            <Button size="sm" variant="bordered" color="default">Message</Button>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t pt-4 text-center" style={{ borderColor: 'var(--app-border)' }}>
            {[['Projects', '24'], ['Tasks', '312'], ['Reviews', '89']].map(([l, v]) => (
              <div key={l}>
                <p className="text-[16px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>{v}</p>
                <p className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--app-fg-subtle)' }}>{l}</p>
              </div>
            ))}
          </div>
        </Surface>
        <div className="space-y-6 lg:col-span-2">
          <Panel title="About">
            <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--app-fg)' }}>
              Product-minded engineering lead. Ten years building admin tooling and internal
              platforms. Currently focused on the design system and the mobile rebuild.
            </p>
            <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[['Email', 'david@bilkoss.example'], ['Phone', '+1 (312) 555-0198'], ['Location', 'Remote — US'], ['Joined', 'Jan 2024']].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--app-fg-subtle)' }}>{k}</dt>
                  <dd className="text-[13.5px]" style={{ color: 'var(--app-fg-strong)' }}>{v}</dd>
                </div>
              ))}
            </dl>
          </Panel>
          <Panel title="Recent activity">
            <Timeline items={[
              { id: 1, title: 'Merged “new pagination component”', time: '2h ago', color: 'success' },
              { id: 2, title: 'Commented on Billing v2 spec', time: '5h ago', color: 'primary' },
              { id: 3, title: 'Closed BUG-524 — invoice export', time: '1d ago', color: 'info' },
              { id: 4, title: 'Opened PR for dark-mode tokens', time: '2d ago', color: 'secondary' },
            ]} />
          </Panel>
        </div>
      </div>
    </>
  )
}

/* ---------------- Pricing ---------------- */
const PLANS = [
  { name: 'Starter', price: '$0', period: 'forever', features: ['1 workspace', '3 dashboards', 'Community support', '7-day history'], cta: 'Get started' },
  { name: 'Team', price: '$29', period: 'per user / month', features: ['Unlimited dashboards', 'Role-based access', 'Priority support', '1-year history', 'API access'], cta: 'Start free trial', featured: true },
  { name: 'Enterprise', price: 'Custom', period: 'contact us', features: ['SSO & SCIM', 'Audit log export', 'Dedicated CSM', 'Unlimited history', 'SLA 99.9%'], cta: 'Talk to sales' },
]
export function Pricing() {
  return (
    <>
      <PageHeader title="Pricing" breadcrumbs={bc('Pricing')} />
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h2 className="font-display text-[22px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>Plans that scale with your team</h2>
          <p className="mt-2 text-[14px]" style={{ color: 'var(--app-fg-muted)' }}>Start free. Upgrade when you need roles, history and support.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((p) => (
            <Surface
              key={p.name}
              bodyClassName="p-6"
              className={p.featured ? 'ring-2 ring-[var(--app-primary)]' : undefined}
            >
              {p.featured && <Chip size="sm" color="primary" className="mb-3">Most popular</Chip>}
              <h3 className="font-display text-[16px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>{p.name}</h3>
              <p className="mt-2">
                <span className="font-display text-[30px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>{p.price}</span>{' '}
                <span className="text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>{p.period}</span>
              </p>
              <ul className="mt-4 space-y-2.5 text-[13px]">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2" style={{ color: 'var(--app-fg)' }}>
                    <Check size={15} style={{ color: 'var(--app-success)' }} /> {f}
                  </li>
                ))}
              </ul>
              <Button color={p.featured ? 'primary' : 'default'} variant={p.featured ? 'solid' : 'bordered'} fullWidth className="mt-6">
                {p.cta}
              </Button>
            </Surface>
          ))}
        </div>
      </div>
    </>
  )
}

/* ---------------- FAQ ---------------- */
const FAQS = [
  { id: 'q1', title: 'How is Bilkoss billed?', content: 'Per active user, per month. Annual billing saves two months. You can change plans at any time and the difference is prorated.' },
  { id: 'q2', title: 'Can I import my existing data?', content: 'Yes — CSV import is available on every list view, and the API supports bulk creation. Enterprise plans include a guided migration.' },
  { id: 'q3', title: 'Do you offer SSO?', content: 'SAML SSO and SCIM provisioning are included on the Enterprise plan. Google and GitHub sign-in are available on all plans.' },
  { id: 'q4', title: 'What is your uptime?', content: 'We target 99.9% and publish a live status page. Enterprise customers get a contractual SLA with service credits.' },
  { id: 'q5', title: 'How do I cancel?', content: 'From Account Settings → Billing. Your workspace stays available until the end of the current period, and exports remain accessible for 30 days.' },
]
export function FAQ() {
  return (
    <>
      <PageHeader title="FAQ" breadcrumbs={bc('FAQ')} />
      <div className="mx-auto max-w-3xl">
        <Panel title="Frequently asked questions">
          <Accordion items={FAQS} defaultOpen={['q1']} />
        </Panel>
      </div>
    </>
  )
}

/* ---------------- Timeline ---------------- */
export function TimelinePage() {
  return (
    <>
      <PageHeader title="Timeline" breadcrumbs={bc('Timeline')} />
      <div className="mx-auto max-w-3xl">
        <Panel title="Company timeline">
          <Timeline items={[
            { id: 1, title: 'Series A closed', description: 'Raised $12M led by Vehement Capital to expand the platform team.', time: 'Aug 2026', color: 'success' },
            { id: 2, title: 'Mobile app 2.0 shipped', description: 'Full rebuild on the shared design system with offline support.', time: 'Jun 2026', color: 'primary' },
            { id: 3, title: 'Hit 10,000 workspaces', description: 'Crossed the milestone three months ahead of plan.', time: 'Apr 2026', color: 'info' },
            { id: 4, title: 'SOC 2 Type II', description: 'Completed the audit with zero exceptions.', time: 'Feb 2026', color: 'secondary' },
            { id: 5, title: 'Public launch', description: 'Came out of beta after 8 months with 400 design partners.', time: 'Nov 2025', color: 'warning' },
          ]} />
        </Panel>
      </div>
    </>
  )
}

/* ---------------- Gallery ---------------- */
export function GalleryPage() {
  const tiles = Array.from({ length: 12 }, (_, i) => i)
  const hues = ['primary', 'info', 'success', 'warning', 'danger', 'secondary']
  return (
    <>
      <PageHeader title="Gallery" breadcrumbs={bc('Gallery')} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {tiles.map((i) => (
          <div
            key={i}
            className="flex aspect-[4/3] items-end rounded-lg p-3"
            style={{
              background: `linear-gradient(140deg, var(--app-${hues[i % hues.length]}), var(--app-${hues[(i + 2) % hues.length]}))`,
            }}
          >
            <span className="text-[12px] font-semibold text-white/90">Asset {String(i + 1).padStart(2, '0')}</span>
          </div>
        ))}
      </div>
    </>
  )
}

/* ---------------- About ---------------- */
export function AboutUs() {
  const team = Array.from({ length: 4 }, (_, i) => ({ name: person(i * 4), role: ['CEO', 'CTO', 'Head of Design', 'Head of Sales'][i] }))
  return (
    <>
      <PageHeader title="About Us" breadcrumbs={bc('About Us')} />
      <div className="mx-auto max-w-4xl space-y-6">
        <Panel title="Our story">
          <p className="text-[14px] leading-relaxed" style={{ color: 'var(--app-fg)' }}>
            Bilkoss started as an internal admin toolkit and grew into a product used by thousands of
            teams. We believe operational software should be as considered as the customer-facing kind —
            fast, legible, and pleasant to use every day.
          </p>
        </Panel>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[['2019', 'Founded'], ['92', 'People'], ['10k+', 'Workspaces'], ['38', 'Countries']].map(([v, l]) => (
            <Surface key={l} bodyClassName="p-5 text-center">
              <p className="font-display text-[24px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>{v}</p>
              <p className="text-[12px] uppercase tracking-wide" style={{ color: 'var(--app-fg-subtle)' }}>{l}</p>
            </Surface>
          ))}
        </div>
        <Panel title="Leadership">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {team.map((m) => (
              <div key={m.name} className="text-center">
                <Avatar name={m.name} src={avatarUrl(m.name)} size="lg" showFallback className="mx-auto" />
                <p className="mt-2 text-[13px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{m.name}</p>
                <p className="text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>{m.role}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  )
}

/* ---------------- Contact ---------------- */
export function ContactUs() {
  return (
    <>
      <PageHeader title="Contact Us" breadcrumbs={bc('Contact Us')} />
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          {[[Mail, 'Email', 'hello@bilkoss.example'], [Phone, 'Phone', '+1 (415) 555-0180'], [MapPin, 'Office', '548 Market St, San Francisco']].map(([Icon, l, v]) => (
            <Surface key={l} bodyClassName="flex items-start gap-3 p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: 'var(--app-primary-soft)', color: 'var(--app-primary)' }}>
                <Icon size={16} />
              </span>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: 'var(--app-fg-subtle)' }}>{l}</p>
                <p className="text-[13.5px]" style={{ color: 'var(--app-fg-strong)' }}>{v}</p>
              </div>
            </Surface>
          ))}
        </div>
        <Panel className="lg:col-span-2" title="Send a message">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Name" placeholder="Jane Cooper" />
            <TextField label="Email" type="email" placeholder="jane@example.com" />
            <TextField label="Subject" placeholder="How can we help?" className="sm:col-span-2" />
            <TextField label="Message" placeholder="Write your message…" className="sm:col-span-2 [&_input]:h-28" />
          </div>
          <Button color="primary" className="mt-4" endContent={<ArrowRight size={15} />}>Send message</Button>
        </Panel>
      </div>
    </>
  )
}

/* ---------------- Legal ---------------- */
function LegalPage({ title, leaf, sections }) {
  return (
    <>
      <PageHeader title={title} breadcrumbs={bc(leaf)} />
      <div className="mx-auto max-w-3xl">
        <Panel>
          <p className="mb-6 text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>Last updated 1 August 2026</p>
          <div className="space-y-6">
            {sections.map((s) => (
              <section key={s.h}>
                <h3 className="font-display mb-2 text-[15px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>{s.h}</h3>
                <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--app-fg)' }}>{s.p}</p>
              </section>
            ))}
          </div>
        </Panel>
      </div>
    </>
  )
}
export function PrivacyPolicy() {
  return <LegalPage title="Privacy Policy" leaf="Privacy Policy" sections={[
    { h: '1. Overview', p: 'This policy explains what data Bilkoss collects, why, and the choices you have. It applies to the product and this marketing site.' },
    { h: '2. Data we collect', p: 'Account details you provide, usage data generated as you work, and diagnostic data to keep the service reliable. We do not sell personal data.' },
    { h: '3. How we use it', p: 'To operate the service, provide support, improve features, and meet legal obligations. Aggregated, de-identified data may inform product decisions.' },
    { h: '4. Retention', p: 'We keep account data while your workspace is active and for 30 days after cancellation, after which it is deleted or anonymised.' },
    { h: '5. Your rights', p: 'You can access, correct, export or delete your data from Account Settings, or by contacting privacy@bilkoss.example.' },
  ]} />
}
export function TermsConditions() {
  return <LegalPage title="Terms & Conditions" leaf="Terms & Conditions" sections={[
    { h: '1. Agreement', p: 'By using Bilkoss you agree to these terms. If you are using it on behalf of an organisation, you accept them for that organisation.' },
    { h: '2. Accounts', p: 'You are responsible for activity under your account and for keeping credentials secure. Notify us of any unauthorised use.' },
    { h: '3. Acceptable use', p: 'Do not misuse the service, attempt to disrupt it, or use it to store unlawful content. We may suspend accounts that violate this section.' },
    { h: '4. Billing', p: 'Paid plans renew automatically until cancelled. Fees are non-refundable except where required by law.' },
    { h: '5. Liability', p: 'The service is provided “as is”. Our aggregate liability is limited to the amount paid in the preceding twelve months.' },
  ]} />
}

/* ---------------- Sitemap ---------------- */
export function Sitemap() {
  return (
    <>
      <PageHeader title="Sitemap" breadcrumbs={bc('Sitemap')} />
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {NAV.filter((n) => n.children).map((group) => (
          <div key={group.label} className="mb-6 break-inside-avoid">
            <SectionTitle className="mb-2">{group.label}</SectionTitle>
            <ul className="space-y-1.5">
              {group.children.flatMap((c) => (c.children ? c.children : [c])).filter((c) => c.to).map((leaf) => (
                <li key={leaf.to}>
                  <Link to={leaf.to} className="text-[13px] hover:text-[var(--app-primary)]" style={{ color: 'var(--app-fg-muted)' }}>
                    {leaf.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

/* ---------------- Search results ---------------- */
export function SearchResults() {
  const [q, setQ] = useState('dashboard')
  const results = [
    { title: 'eCommerce Dashboard', path: '/dashboards/ecommerce', type: 'Page', snippet: 'Orders, revenue, growth, store performance and recent activity for the storefront.' },
    { title: 'Analytics Dashboard', path: '/dashboards/analytics', type: 'Page', snippet: 'Sessions, visitors, traffic sources and page analytics over time.' },
    { title: 'Orders', path: '/apps/ecommerce/orders', type: 'List', snippet: 'Every order across all channels with filters and export.' },
    { title: 'Sales Report', path: '/apps/ecommerce/sales', type: 'Report', snippet: 'Gross and net sales, order counts and top products by revenue.' },
    { title: 'Account Settings', path: '/apps/users/account-settings', type: 'Settings', snippet: 'Profile, security, notifications and appearance preferences.' },
  ]
  return (
    <>
      <PageHeader title="Search Results" breadcrumbs={bc('Search Results')} />
      <div className="mx-auto max-w-3xl">
        <div className="mb-5">
          <TextField value={q} onChange={setQ} placeholder="Search…" startIcon={<Search size={15} />} aria-label="Search" />
        </div>
        <p className="mb-4 text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>About {results.length} results for “{q}”</p>
        <div className="space-y-3">
          {results.map((r) => (
            <Surface key={r.path} bodyClassName="p-4">
              <div className="flex items-center gap-2">
                <Link to={r.path} className="font-display text-[15px] font-bold hover:underline" style={{ color: 'var(--app-primary)' }}>{r.title}</Link>
                <Chip size="sm" variant="soft" color="default">{r.type}</Chip>
              </div>
              <p className="mt-0.5 text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>bilkoss.example{r.path}</p>
              <p className="mt-1 text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>{r.snippet}</p>
            </Surface>
          ))}
        </div>
      </div>
    </>
  )
}

/* ---------------- Empty ---------------- */
export function EmptyPage() {
  return (
    <>
      <PageHeader title="Empty Page" breadcrumbs={bc('Empty Page')} />
      <Panel>
        <div className="py-16 text-center">
          <p className="font-display text-[16px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>A blank canvas</p>
          <p className="mx-auto mt-1 max-w-sm text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
            Use this starter page as the basis for a new screen — the shell, page header and card are wired up.
          </p>
        </div>
      </Panel>
    </>
  )
}
