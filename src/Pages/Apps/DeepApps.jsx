import { useState } from 'react'
import { Avatar, Button, TextField, Chip } from 'oks-ui'
import {
  Search, Trash2, Inbox, Send as SendIcon, FileText, Archive, Tag,
  ChevronLeft, ChevronRight, Folder, File, Image as ImageIcon, FileArchive,
  MoreVertical, Reply, Download, Grid3x3, List as ListIcon, Phone, Mail as MailIcon,
} from 'lucide-react'
import { PageHeader, Surface, Panel, SectionTitle } from '../../Components/ui'
import { avatarUrl, person, personEmail, contacts, fmtDate, daysAgo } from '../../data/more'

const bc = (leaf) => [{ label: 'Bilkoss', to: '/' }, { label: 'Apps' }, { label: leaf }]

/* ============================ EMAIL (3-pane) ============================ */

const FOLDERS = [
  { key: 'inbox', label: 'Inbox', icon: Inbox, count: 12 },
  { key: 'sent', label: 'Sent', icon: SendIcon },
  { key: 'drafts', label: 'Drafts', icon: FileText, count: 3 },
  { key: 'archive', label: 'Archive', icon: Archive },
  { key: 'trash', label: 'Trash', icon: Trash2 },
]
const LABELS = [
  { label: 'Personal', color: 'primary' },
  { label: 'Work', color: 'success' },
  { label: 'Billing', color: 'warning' },
  { label: 'Social', color: 'secondary' },
]
const MAILS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  from: person(i),
  email: personEmail(i),
  subject: [
    'Q3 planning notes and next steps', 'Invoice INV-20261 is ready', 'Re: design review feedback',
    'Your weekly summary', 'New comment on “Billing v2”', 'Contract renewal — action needed',
    'Welcome to the team', 'Server maintenance window', 'Photos from the offsite',
    'Payment received — thank you', 'Reminder: 1:1 tomorrow', 'API deprecation notice',
    'Draft: launch announcement', 'Security alert: new sign-in',
  ][i],
  preview: 'Here is a short preview of the message body so the list has something to show without opening the mail…',
  time: i < 3 ? `${9 + i}:0${i} AM` : fmtDate(daysAgo(i)),
  unread: i < 4,
  starred: i % 5 === 0,
}))

export function EmailInbox() {
  const [folder, setFolder] = useState('inbox')
  const [selected, setSelected] = useState(0)
  const mail = MAILS[selected]
  return (
    <>
      <PageHeader title="Inbox" breadcrumbs={bc('Email')} actions={<Button color="primary" size="sm" as="a" href="/apps/email/compose">Compose</Button>} />
      <Surface padded={false} className="overflow-hidden">
        <div className="flex h-[calc(100vh-220px)] min-h-[540px]">
          <div className="hidden w-52 shrink-0 flex-col border-r p-3 lg:flex" style={{ borderColor: 'var(--app-border)' }}>
            {FOLDERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFolder(f.key)}
                className="flex items-center justify-between gap-2 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors"
                style={{
                  background: folder === f.key ? 'var(--app-primary-soft)' : undefined,
                  color: folder === f.key ? 'var(--app-primary)' : 'var(--app-fg)',
                }}
              >
                <span className="flex items-center gap-2"><f.icon size={15} /> {f.label}</span>
                {f.count ? <span className="text-[11px] font-bold">{f.count}</span> : null}
              </button>
            ))}
            <SectionTitle className="mt-5 mb-2 px-2.5">Labels</SectionTitle>
            {LABELS.map((l) => (
              <span key={l.label} className="flex items-center gap-2 px-2.5 py-1.5 text-[13px]" style={{ color: 'var(--app-fg)' }}>
                <span className="h-2 w-2 rounded-full" style={{ background: `var(--app-${l.color})` }} /> {l.label}
              </span>
            ))}
          </div>

          <div className="flex w-full flex-col border-r md:max-w-[340px]" style={{ borderColor: 'var(--app-border)' }}>
            <div className="border-b p-3" style={{ borderColor: 'var(--app-border)' }}>
              <TextField size="sm" variant="soft" radius="full" placeholder="Search mail…" startIcon={<Search size={14} />} aria-label="Search mail" />
            </div>
            <ul className="flex-1 overflow-y-auto">
              {MAILS.map((m) => (
                <li key={m.id}>
                  <button
                    onClick={() => setSelected(m.id)}
                    className="flex w-full gap-3 border-b px-3 py-3 text-left transition-colors"
                    style={{ borderColor: 'var(--app-border)', background: m.id === selected ? 'var(--app-surface-2)' : undefined }}
                  >
                    <Avatar name={m.from} src={avatarUrl(m.from)} size="sm" showFallback />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-[13px]" style={{ color: 'var(--app-fg-strong)', fontWeight: m.unread ? 700 : 500 }}>{m.from}</span>
                        <span className="shrink-0 text-[11px]" style={{ color: 'var(--app-fg-subtle)' }}>{m.time}</span>
                      </div>
                      <p className="truncate text-[12.5px]" style={{ color: 'var(--app-fg)', fontWeight: m.unread ? 600 : 400 }}>{m.subject}</p>
                      <p className="truncate text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>{m.preview}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden min-w-0 flex-1 flex-col md:flex">
            <div className="flex items-center justify-between gap-3 border-b border-dashed px-5 py-3" style={{ borderColor: 'var(--app-border)' }}>
              <h2 className="font-display text-[16px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>{mail.subject}</h2>
              <div className="flex gap-1">
                <Button isIconOnly size="sm" variant="bordered" color="default" aria-label="Archive"><Archive size={15} /></Button>
                <Button isIconOnly size="sm" variant="bordered" color="default" aria-label="Delete"><Trash2 size={15} /></Button>
                <Button isIconOnly size="sm" variant="bordered" color="default" aria-label="Label"><Tag size={15} /></Button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="mb-4 flex items-center gap-3">
                <Avatar name={mail.from} src={avatarUrl(mail.from)} size="md" showFallback />
                <div>
                  <p className="text-[14px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{mail.from}</p>
                  <p className="text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>{mail.email} · {mail.time}</p>
                </div>
              </div>
              <div className="space-y-3 text-[13.5px] leading-relaxed" style={{ color: 'var(--app-fg)' }}>
                <p>Hi David,</p>
                <p>Following up on our conversation — I have pulled together the notes and next steps below. Let me know if anything looks off before I circulate it more widely.</p>
                <p>The main open item is the timeline for the second phase. Everything else is on track and the team is in good shape heading into the sprint.</p>
                <p>Best,<br />{mail.from}</p>
              </div>
            </div>
            <div className="border-t p-4" style={{ borderColor: 'var(--app-border)' }}>
              <Button color="primary" size="sm" startContent={<Reply size={14} />}>Reply</Button>
            </div>
          </div>
        </div>
      </Surface>
    </>
  )
}

export function EmailDetails() {
  const mail = MAILS[0]
  return (
    <>
      <PageHeader title="Message" breadcrumbs={bc('Email')} />
      <Panel title={mail.subject}>
        <div className="mb-5 flex items-center gap-3">
          <Avatar name={mail.from} src={avatarUrl(mail.from)} size="md" showFallback />
          <div className="flex-1">
            <p className="text-[14px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{mail.from}</p>
            <p className="text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>to me · {mail.time}</p>
          </div>
          <Button isIconOnly size="sm" variant="bordered" color="default" aria-label="More"><MoreVertical size={15} /></Button>
        </div>
        <div className="space-y-3 text-[13.5px] leading-relaxed" style={{ color: 'var(--app-fg)' }}>
          <p>Hi David,</p>
          <p>Attaching the finalised deck and the summary of decisions from today. The recording is in the shared drive if anyone missed it.</p>
          <p>Thanks,<br />{mail.from}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 border-t pt-4" style={{ borderColor: 'var(--app-border)' }}>
          {['Q3-deck.pdf', 'decisions.md'].map((a) => (
            <span key={a} className="flex items-center gap-2 rounded-md border px-3 py-2 text-[12.5px]" style={{ borderColor: 'var(--app-border)', color: 'var(--app-fg)' }}>
              <FileText size={14} /> {a} <Download size={13} className="opacity-60" />
            </span>
          ))}
        </div>
      </Panel>
    </>
  )
}

export function EmailCompose() {
  return (
    <>
      <PageHeader title="Compose" breadcrumbs={bc('Email')} />
      <Panel title="New message">
        <div className="space-y-4">
          <TextField label="To" placeholder="recipient@example.com" />
          <TextField label="Subject" placeholder="Subject line" />
          <TextField label="Message" placeholder="Write your message…" className="[&_input]:h-40" />
          <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: 'var(--app-border)' }}>
            <Button variant="bordered" color="default" size="sm" startContent={<FileText size={14} />}>Attach</Button>
            <div className="flex gap-2">
              <Button variant="bordered" color="default" size="sm">Save draft</Button>
              <Button color="primary" size="sm" endContent={<SendIcon size={14} />}>Send</Button>
            </div>
          </div>
        </div>
      </Panel>
    </>
  )
}

/* ============================ CALENDAR ============================ */

const EVENTS = {
  4: [{ t: 'Design review', c: 'primary' }],
  8: [{ t: 'Sprint planning', c: 'secondary' }, { t: 'Client call', c: 'success' }],
  12: [{ t: 'Payroll run', c: 'warning' }],
  15: [{ t: 'All-hands', c: 'primary' }],
  19: [{ t: 'Release 2.4', c: 'danger' }],
  22: [{ t: '1:1 — Marcus', c: 'info' }],
  27: [{ t: 'Board meeting', c: 'primary' }],
}

export function CalendarPage() {
  const first = new Date(2026, 8, 1)
  const startDay = first.getDay()
  const days = 30
  const cells = [...Array(startDay).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)]
  return (
    <>
      <PageHeader
        title="Calendar"
        breadcrumbs={bc('Calendar')}
        actions={
          <div className="flex items-center gap-2">
            <Button isIconOnly size="sm" variant="bordered" color="default" aria-label="Previous month"><ChevronLeft size={15} /></Button>
            <span className="text-[13px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>September 2026</span>
            <Button isIconOnly size="sm" variant="bordered" color="default" aria-label="Next month"><ChevronRight size={15} /></Button>
            <Button color="primary" size="sm">New event</Button>
          </div>
        }
      />
      <Surface padded={false} className="overflow-hidden">
        <div className="grid grid-cols-7 border-b text-center text-[11px] font-bold uppercase tracking-wide" style={{ borderColor: 'var(--app-border)', color: 'var(--app-fg-muted)' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="py-2.5">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((d, i) => (
            <div
              key={i}
              className="min-h-[104px] border-r border-b p-1.5"
              style={{ borderColor: 'var(--app-border)', background: d === 29 ? 'var(--app-primary-soft)' : undefined }}
            >
              {d && (
                <>
                  <div className="mb-1 text-right text-[12px] font-semibold" style={{ color: 'var(--app-fg-muted)' }}>{d}</div>
                  <div className="space-y-1">
                    {(EVENTS[d] || []).map((e, j) => (
                      <div
                        key={j}
                        className="truncate rounded px-1.5 py-0.5 text-[11px] font-medium"
                        style={{ background: `var(--app-${e.c}-soft)`, color: `var(--app-${e.c})` }}
                      >
                        {e.t}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Surface>
    </>
  )
}

/* ============================ CONTACTS (card grid) ============================ */

export function ContactsGrid() {
  const [view, setView] = useState('grid')
  return (
    <>
      <PageHeader
        title="Contacts"
        breadcrumbs={bc('Contacts')}
        actions={
          <div className="flex gap-2">
            <Button isIconOnly size="sm" variant={view === 'grid' ? 'solid' : 'bordered'} color={view === 'grid' ? 'primary' : 'default'} aria-label="Grid view" onPress={() => setView('grid')}><Grid3x3 size={14} /></Button>
            <Button isIconOnly size="sm" variant={view === 'list' ? 'solid' : 'bordered'} color={view === 'list' ? 'primary' : 'default'} aria-label="List view" onPress={() => setView('list')}><ListIcon size={14} /></Button>
            <Button color="primary" size="sm">Add contact</Button>
          </div>
        }
      />
      <div className={view === 'grid' ? 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'space-y-3'}>
        {contacts.slice(0, 16).map((c) =>
          view === 'grid' ? (
            <Surface key={c.id} bodyClassName="p-5 text-center">
              <Avatar name={c.name} src={avatarUrl(c.name)} size="lg" showFallback className="mx-auto" />
              <p className="mt-3 text-[14px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{c.name}</p>
              <p className="text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>{c.role} · {c.company}</p>
              <div className="mt-3 flex justify-center gap-2">
                <Button isIconOnly size="sm" variant="bordered" color="default" aria-label="Call"><Phone size={14} /></Button>
                <Button isIconOnly size="sm" variant="bordered" color="default" aria-label="Email"><MailIcon size={14} /></Button>
              </div>
            </Surface>
          ) : (
            <Surface key={c.id} bodyClassName="flex items-center gap-3 p-3.5">
              <Avatar name={c.name} src={avatarUrl(c.name)} size="sm" showFallback />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13.5px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{c.name}</p>
                <p className="truncate text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>{c.email}</p>
              </div>
              <Chip size="sm" variant="soft" color="default">{c.company}</Chip>
            </Surface>
          ),
        )}
      </div>
    </>
  )
}

/* ============================ FILE MANAGER ============================ */

const FILES = [
  { name: 'Brand assets', type: 'folder', size: '128 items', icon: Folder, color: 'primary' },
  { name: 'Contracts', type: 'folder', size: '24 items', icon: Folder, color: 'primary' },
  { name: 'Q3 report.pdf', type: 'file', size: '2.4 MB', icon: FileText, color: 'danger' },
  { name: 'launch-hero.png', type: 'file', size: '1.1 MB', icon: ImageIcon, color: 'success' },
  { name: 'design-system.fig', type: 'file', size: '18 MB', icon: File, color: 'secondary' },
  { name: 'backup-2026-08.zip', type: 'file', size: '312 MB', icon: FileArchive, color: 'warning' },
  { name: 'roadmap.md', type: 'file', size: '12 KB', icon: FileText, color: 'info' },
  { name: 'invoices', type: 'folder', size: '61 items', icon: Folder, color: 'primary' },
]

export function FileManager() {
  return (
    <>
      <PageHeader title="File Manager" breadcrumbs={bc('File Manager')} actions={<Button color="primary" size="sm">Upload</Button>} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Panel title="Storage">
          <p className="text-[24px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>68.4 GB</p>
          <p className="text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>of 100 GB used</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full" style={{ background: 'var(--app-surface-2)' }}>
            <div className="h-full rounded-full" style={{ width: '68%', background: 'var(--app-primary)' }} />
          </div>
          <ul className="mt-4 space-y-2 text-[12.5px]">
            {[['Documents', '18 GB', 'primary'], ['Images', '24 GB', 'success'], ['Archives', '21 GB', 'warning'], ['Other', '5 GB', 'info']].map(([l, s, c]) => (
              <li key={l} className="flex items-center justify-between">
                <span className="flex items-center gap-2" style={{ color: 'var(--app-fg)' }}><span className="h-2 w-2 rounded-full" style={{ background: `var(--app-${c})` }} />{l}</span>
                <span style={{ color: 'var(--app-fg-muted)' }}>{s}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel className="lg:col-span-3" title="My Drive" subtitle="Bilkoss / Workspace">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {FILES.map((f) => (
              <div key={f.name} className="rounded-lg border p-3.5 transition-colors hover:bg-[var(--app-surface-2)]" style={{ borderColor: 'var(--app-border)' }}>
                <span className="flex h-9 w-9 items-center justify-center rounded-md" style={{ background: `var(--app-${f.color}-soft)`, color: `var(--app-${f.color})` }}>
                  <f.icon size={18} />
                </span>
                <p className="mt-2.5 truncate text-[13px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{f.name}</p>
                <p className="text-[11px]" style={{ color: 'var(--app-fg-subtle)' }}>{f.size}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  )
}
