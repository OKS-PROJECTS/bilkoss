import { useState } from 'react'
import { Avatar, Button, TextField, Badge } from 'oks-ui'
import { Phone, Video, MoreVertical, Send, Search, Paperclip } from 'lucide-react'
import { PageHeader, Surface } from '../../Components/ui'
import { avatarUrl } from '../../data/more'

const CONVERSATIONS = [
  { id: 1, name: 'Ava Thompson', last: "I'll send the invoice by evening. Please check and confirm.", time: 'Just now', unread: 2, active: true },
  { id: 2, name: 'Noah Smith', last: 'Can you check the shared doc? Added some feedback.', time: '5 min', unread: 1 },
  { id: 3, name: 'Liam Johnson', last: 'Please approve the design so we can move to development.', time: '3:45 PM' },
  { id: 4, name: 'Emma Wilson', last: 'All tasks are completed. Do you want me to deploy?', time: '2 hr' },
  { id: 5, name: 'Olivia Martinez', last: 'Meeting rescheduled to Friday at 11 AM.', time: '4 hr' },
  { id: 6, name: 'William Davis', last: "I'm working on the bug fix, will update soon.", time: 'Yesterday', unread: 3 },
  { id: 7, name: 'Sophia Moore', last: 'Final draft is ready. Let me know your thoughts.', time: 'Yesterday' },
  { id: 8, name: 'Jackson Lee', last: "I've uploaded the assets. Please review them tonight.", time: '12 Jun' },
]

const THREAD = [
  { from: 'them', text: 'Hey — are you available for a quick call?', time: '08:55 am' },
  { from: 'me', text: 'Sure, give me 5 minutes. Just wrapping something up.', time: '08:57 am' },
  { from: 'them', text: 'Perfect. Let me know when you are ready.', time: '08:58 am' },
  { from: 'me', text: 'Ready now. Calling you.', time: '09:00 am' },
  { from: 'them', text: 'Thanks for your time earlier — that was a productive discussion.', time: '09:46 am' },
  { from: 'me', text: 'I will send over the updated files by noon.', time: '09:50 am' },
  { from: 'them', text: 'Great, I will review them once they arrive.', time: '09:52 am' },
  { from: 'me', text: 'Just sent them via Drive. Let me know if you have issues accessing.', time: '12:03 pm' },
  { from: 'them', text: 'Got them. Everything looks good so far.', time: '12:10 pm' },
]

export default function Chat() {
  const [active, setActive] = useState(1)
  const current = CONVERSATIONS.find((c) => c.id === active)

  return (
    <>
      <PageHeader title="Chat" breadcrumbs={[{ label: 'Bilkoss', to: '/' }, { label: 'Apps' }, { label: 'Chat' }]} />
      <Surface padded={false} className="overflow-hidden">
        <div className="flex h-[calc(100vh-220px)] min-h-[520px]">
          {/* conversation list */}
          <div className="flex w-full max-w-[320px] shrink-0 flex-col border-r lg:w-[320px]" style={{ borderColor: 'var(--app-border)' }}>
            <div className="border-b p-3" style={{ borderColor: 'var(--app-border)' }}>
              <TextField size="sm" variant="soft" radius="full" placeholder="Search people…" startIcon={<Search size={14} />} aria-label="Search conversations" />
            </div>
            <ul className="flex-1 overflow-y-auto">
              {CONVERSATIONS.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => setActive(c.id)}
                    className="flex w-full items-center gap-3 px-3 py-3 text-left transition-colors"
                    style={{ background: c.id === active ? 'var(--app-surface-2)' : undefined }}
                  >
                    <Badge isDot color={c.active ? 'success' : 'default'} placement="bottom-right">
                      <Avatar name={c.name} src={avatarUrl(c.name)} size="sm" showFallback />
                    </Badge>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate text-[13px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{c.name}</span>
                        <span className="shrink-0 text-[11px]" style={{ color: 'var(--app-fg-subtle)' }}>{c.time}</span>
                      </div>
                      <p className="truncate text-[12px]" style={{ color: 'var(--app-fg-muted)' }}>{c.last}</p>
                    </div>
                    {c.unread ? (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold text-white" style={{ background: 'var(--app-primary)' }}>
                        {c.unread}
                      </span>
                    ) : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* thread */}
          <div className="hidden min-w-0 flex-1 flex-col lg:flex">
            <div className="flex items-center justify-between gap-3 border-b border-dashed px-5 py-3" style={{ borderColor: 'var(--app-border)' }}>
              <div className="flex items-center gap-3">
                <Avatar name={current.name} src={avatarUrl(current.name)} size="sm" showFallback />
                <div>
                  <p className="text-[14px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>{current.name}</p>
                  <p className="flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--app-success)' }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" /> Active
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button isIconOnly size="sm" variant="bordered" color="default" aria-label="Voice call"><Phone size={15} /></Button>
                <Button isIconOnly size="sm" variant="bordered" color="default" aria-label="Video call"><Video size={15} /></Button>
                <Button isIconOnly size="sm" variant="bordered" color="default" aria-label="More"><MoreVertical size={15} /></Button>
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5" style={{ background: 'var(--app-surface-2)' }}>
              {THREAD.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[70%]">
                    <div
                      className="rounded-2xl px-3.5 py-2 text-[13px]"
                      style={
                        m.from === 'me'
                          ? { background: 'var(--app-primary)', color: '#fff', borderBottomRightRadius: 4 }
                          : { background: 'var(--app-surface)', color: 'var(--app-fg)', borderBottomLeftRadius: 4, border: '1px solid var(--app-border)' }
                      }
                    >
                      {m.text}
                    </div>
                    <p className={`mt-1 text-[11px] ${m.from === 'me' ? 'text-right' : ''}`} style={{ color: 'var(--app-fg-subtle)' }}>{m.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t p-3" style={{ borderColor: 'var(--app-border)' }}>
              <Button isIconOnly size="sm" variant="ghost" color="default" aria-label="Attach"><Paperclip size={16} /></Button>
              <div className="flex-1">
                <TextField size="sm" variant="soft" radius="full" placeholder="Enter message…" aria-label="Message" />
              </div>
              <Button color="primary" size="sm" endContent={<Send size={14} />}>Send</Button>
            </div>
          </div>
        </div>
      </Surface>
    </>
  )
}
