import { useState } from 'react'
import {
  Button,
  ButtonGroup,
  Alert,
  Loader,
  Chip,
  Badge,
  Avatar,
  AvatarGroup,
  Divider,
  Tabs,
  Tab,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  TextField,
  TextAreaField,
  PasswordField,
  SelectField,
  SwitchField,
  Checkbox,
  RadioGroupField,
  RangeField,
  OtpField,
  Card,
  CardBody,
  Stat,
  StatGroup,
  Progress,
  CircularProgress,
  Skeleton,
  EmptyState,
  Accordion,
  AccordionItem,
  Timeline,
  TimelineItem,
  SegmentedControl,
  Breadcrumbs,
  BreadcrumbItem,
  Calendar,
  SplitLayout,
  SplitPane,
  Message,
  MessageList,
  Nav,
  CommandPalette,
  useCommandPalette,
  Chart,
} from 'oks-ui'
import { Check, Star, Bell, Trash2, Inbox, LayoutDashboard, Users, FileText, Settings } from 'lucide-react'
import { PageHeader, Panel, SectionTitle } from '../../Components/ui'
import { avatarUrl } from '../../lib/format'

const bc = [{ label: 'Bilkoss', to: '/' }, { label: 'Components' }, { label: 'Overview' }]

function Row({ children }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>
}
const NAV_ITEMS = [
  { key: 'dash', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { key: 'team', label: 'Team', icon: <Users size={16} />, children: [
    { key: 'members', label: 'Members' },
    { key: 'roles', label: 'Roles' },
  ] },
  { key: 'docs', label: 'Documents', icon: <FileText size={16} />, badge: 4 },
  { key: 'settings', label: 'Settings', icon: <Settings size={16} /> },
]

const PALETTE_ITEMS = [
  { id: 'new', label: 'New document', shortcut: ['⌘', 'N'] },
  { id: 'search', label: 'Search people', keywords: ['team', 'members'] },
  { id: 'settings', label: 'Open settings', shortcut: ['⌘', ','] },
  { id: 'theme', label: 'Toggle dark mode' },
]

export default function ComponentGallery() {
  const [range, setRange] = useState(40)
  const [seg, setSeg] = useState('week')
  const [navKey, setNavKey] = useState('dash')
  const [loaded, setLoaded] = useState(false)
  const palette = useCommandPalette()
  return (
    <>
      <PageHeader title="Component Gallery" breadcrumbs={bc} />
      <p className="mb-6 max-w-2xl text-[13.5px]" style={{ color: 'var(--app-fg-muted)' }}>
        Every control on this page is an <strong>oks-ui</strong> primitive or composed from oks-ui
        primitives — no other component library anywhere in this template. The lower panels show the
        data-display, navigation and layout components that shipped in oks-ui 1.1 and replaced this
        template's earlier hand-rolled versions.
      </p>

      <div className="space-y-6">
        <Panel title="Buttons">
          <div className="space-y-4">
            <Row>
              <Button color="primary">Solid</Button>
              <Button variant="soft" color="primary">Soft</Button>
              <Button variant="bordered" color="default">Bordered</Button>
              <Button variant="ghost" color="default">Ghost</Button>
              <Button variant="link" color="primary">Link</Button>
            </Row>
            <Row>
              <Button color="success">Success</Button>
              <Button color="warning">Warning</Button>
              <Button color="danger">Danger</Button>
              <Button color="primary" isLoading>Loading</Button>
              <Button color="primary" isDisabled>Disabled</Button>
              <Button color="primary" startContent={<Check size={15} />}>With icon</Button>
            </Row>
            <Row>
              <ButtonGroup color="primary" variant="bordered">
                <Button>Day</Button>
                <Button>Week</Button>
                <Button>Month</Button>
              </ButtonGroup>
              <Button isIconOnly color="primary" aria-label="Star"><Star size={16} /></Button>
              <Button size="sm" color="primary">Small</Button>
              <Button size="lg" color="primary">Large</Button>
            </Row>
          </div>
        </Panel>

        <Panel title="Feedback">
          <div className="space-y-3">
            <Alert color="success" variant="soft" title="Saved" description="Your changes have been published." isClosable />
            <Alert color="warning" variant="soft" title="Heads up" description="Your trial ends in 3 days." />
            <Alert color="danger" variant="soft" title="Payment failed" description="Update your card to avoid interruption." />
            <Row>
              <Loader variant="ring-dual" color="primary" />
              <Loader variant="dots-sweep" color="primary" />
              <Loader variant="pulse" color="primary" />
            </Row>
          </div>
        </Panel>

        <Panel title="Data display">
          <div className="space-y-4">
            <Row>
              <Chip color="primary">Primary</Chip>
              <Chip variant="soft" color="success">Active</Chip>
              <Chip variant="bordered" color="default">Draft</Chip>
              <Chip variant="dot" color="warning">Pending</Chip>
              <Chip variant="soft" color="danger" onClose={() => {}}>Dismissible</Chip>
              <Chip variant="soft" color="primary" avatar={<Avatar src={avatarUrl(3)} name="A" size="xs" />}>With avatar</Chip>
            </Row>
            <Row>
              <Badge content="5" color="danger"><Bell size={20} /></Badge>
              <Badge content="99+" color="primary"><Bell size={20} /></Badge>
              <Badge isDot color="success"><Avatar src={avatarUrl(9)} name="B" size="sm" /></Badge>
              <AvatarGroup max={4}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <Avatar key={n} src={avatarUrl(n * 5)} name={`M${n}`} size="sm" />
                ))}
              </AvatarGroup>
            </Row>
            <Divider>Section divider</Divider>
            <Row>
              <Tooltip content="Delete this item">
                <Button isIconOnly variant="bordered" color="default" aria-label="Delete"><Trash2 size={16} /></Button>
              </Tooltip>
              <Dropdown>
                <DropdownTrigger><Button variant="bordered" color="default">Open menu</Button></DropdownTrigger>
                <DropdownMenu aria-label="Demo menu">
                  <DropdownItem itemKey="a">Edit</DropdownItem>
                  <DropdownItem itemKey="b">Duplicate</DropdownItem>
                  <DropdownItem itemKey="c" showDivider>Archive</DropdownItem>
                  <DropdownItem itemKey="d">Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Row>
          </div>
        </Panel>

        <Panel title="Navigation">
          <Tabs color="primary" variant="underlined">
            <Tab key="overview" title="Overview">
              <p className="pt-3 text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>Underlined tabs — the default for in-page section switching.</p>
            </Tab>
            <Tab key="activity" title="Activity">
              <p className="pt-3 text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>Second panel content.</p>
            </Tab>
            <Tab key="settings" title="Settings">
              <p className="pt-3 text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>Third panel content.</p>
            </Tab>
          </Tabs>
        </Panel>

        <Panel title="Form fields">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Full name" placeholder="Jane Cooper" />
            <TextField label="Email" type="email" placeholder="jane@example.com" startIcon={<span>@</span>} />
            <PasswordField label="Password" />
            <SelectField label="Role" options={[{ label: 'Admin', value: 'a' }, { label: 'Editor', value: 'e' }, { label: 'Viewer', value: 'v' }]} />
            <TextAreaField label="Notes" placeholder="Type here…" className="sm:col-span-2" />
            <div className="flex items-center gap-6">
              <SwitchField label="Notifications" defaultChecked />
              <Checkbox label="I agree" />
            </div>
            <RadioGroupField label="Plan" options={[{ label: 'Monthly', value: 'm' }, { label: 'Annual', value: 'a' }]} />
            <div className="sm:col-span-2">
              <RangeField label={`Budget: ${range}`} value={range} onChange={setRange} min={0} max={100} />
            </div>
            <div className="sm:col-span-2">
              <SectionTitle className="mb-2">One-time code</SectionTitle>
              <OtpField length={6} />
            </div>
          </div>
        </Panel>

        <Panel title="Data display — new in oks-ui 1.1" subtitle="Card, Stat, Progress, Skeleton, EmptyState — shipped components that replaced the template's composed workarounds.">
          <div className="space-y-6">
            <StatGroup columns={4}>
              <Card radius="md"><CardBody><Stat label="Revenue" value="$248.9k" delta="6.2%" trend="up" /></CardBody></Card>
              <Card radius="md"><CardBody><Stat label="Active users" value="18,204" delta="3.1%" trend="up" /></CardBody></Card>
              <Card radius="md"><CardBody><Stat label="Conversion" value="3.48%" delta="0.4%" trend="down" /></CardBody></Card>
              <Card radius="md"><CardBody><Stat label="Churn" value="1.9%" delta="0.3%" trend="flat" /></CardBody></Card>
            </StatGroup>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <Progress label="Storage" value={62} showValueLabel color="primary" />
                <Progress label="Bandwidth" value={88} showValueLabel color="warning" />
                <Progress label="Indexing…" color="info" aria-label="Indexing" />
              </div>
              <div className="flex items-center gap-6">
                <CircularProgress value={72} showValueLabel color="primary" />
                <CircularProgress value={40} showValueLabel color="success" />
                <CircularProgress aria-label="Loading" color="info" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <SectionTitle className="mb-2">Skeleton</SectionTitle>
                <div className="flex items-center gap-3">
                  <Skeleton variant="circle" width={44} height={44} />
                  <div className="flex-1"><Skeleton variant="text" lines={3} /></div>
                </div>
                <Button size="sm" variant="bordered" color="default" className="mt-3" onPress={() => setLoaded((v) => !v)}>
                  Toggle loaded
                </Button>
                <Skeleton isLoaded={loaded} className="mt-3">
                  <p className="text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>Content revealed once loaded.</p>
                </Skeleton>
              </div>
              <div>
                <SectionTitle className="mb-2">EmptyState</SectionTitle>
                <EmptyState
                  size="sm"
                  icon={<Inbox size={22} />}
                  title="No messages"
                  description="New messages will show up here."
                  actions={<Button size="sm" color="primary">Compose</Button>}
                />
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Navigation & disclosure — new in oks-ui 1.1" subtitle="Breadcrumbs, SegmentedControl, Accordion, Timeline, Nav, ⌘K CommandPalette.">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Breadcrumbs aria-label="Breadcrumb">
                <BreadcrumbItem href="#">Home</BreadcrumbItem>
                <BreadcrumbItem href="#">Projects</BreadcrumbItem>
                <BreadcrumbItem isCurrent>Bilkoss</BreadcrumbItem>
              </Breadcrumbs>
              <SegmentedControl
                aria-label="Range"
                value={seg}
                onChange={setSeg}
                options={[
                  { label: 'Day', value: 'day' },
                  { label: 'Week', value: 'week' },
                  { label: 'Month', value: 'month' },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Accordion variant="splitted" defaultExpandedKeys={['a']}>
                <AccordionItem itemKey="a" title="What is included?">
                  <p className="text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>Every screen is assembled from oks-ui primitives.</p>
                </AccordionItem>
                <AccordionItem itemKey="b" title="Can I theme it?">
                  <p className="text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>Re-point the design tokens — light and dark flip together.</p>
                </AccordionItem>
              </Accordion>
              <Timeline>
                <TimelineItem title="Deployed v1.1" time="2h ago" color="success">
                  <p className="text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>Adopted the newly-shipped components.</p>
                </TimelineItem>
                <TimelineItem title="Opened PR" time="5h ago" color="primary" />
                <TimelineItem title="Kicked off refresh" time="1d ago" color="info" />
              </Timeline>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <SectionTitle className="mb-2">Nav</SectionTitle>
                <div className="rounded-md border p-2" style={{ borderColor: 'var(--app-border)', maxWidth: 260 }}>
                  <Nav
                    aria-label="Demo navigation"
                    items={NAV_ITEMS}
                    selectedKey={navKey}
                    onItemSelect={(item) => !item.children && setNavKey(item.key)}
                    defaultExpandedKeys={['team']}
                  />
                </div>
              </div>
              <div>
                <SectionTitle className="mb-2">CommandPalette (⌘K)</SectionTitle>
                <Button variant="bordered" color="default" onPress={palette.open}>
                  Open command palette
                </Button>
                <CommandPalette
                  {...palette.getPaletteProps()}
                  items={PALETTE_ITEMS}
                  onSelect={() => palette.close()}
                  placeholder="Type a command…"
                  blur="sm"
                  footer={<span className="text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>↑↓ to navigate · ↵ to select · esc to close</span>}
                />
              </div>
            </div>
          </div>
        </Panel>

        <Panel title="Layout — new in oks-ui 1.1" subtitle="Calendar, SplitLayout, Message / MessageList.">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <SectionTitle className="mb-2">Calendar</SectionTitle>
              <Calendar defaultValue="2026-09-12" />
            </div>
            <div className="space-y-6">
              <div>
                <SectionTitle className="mb-2">SplitLayout</SectionTitle>
                <div style={{ height: 160 }}>
                  <SplitLayout direction="horizontal">
                    <SplitPane defaultSize="40%" isResizable minSize={120}>
                      <div className="h-full p-3 text-[13px]" style={{ background: 'var(--app-surface-2)', color: 'var(--app-fg-muted)' }}>List pane</div>
                    </SplitPane>
                    <SplitPane>
                      <div className="h-full p-3 text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>Detail pane — drag the divider.</div>
                    </SplitPane>
                  </SplitLayout>
                </div>
              </div>
              <div>
                <SectionTitle className="mb-2">Chart — donut</SectionTitle>
                <Chart
                  type="donut"
                  height={200}
                  data={[
                    { label: 'Direct', value: 42 },
                    { label: 'Referral', value: 28 },
                    { label: 'Social', value: 18 },
                    { label: 'Email', value: 12 },
                  ]}
                  x="label"
                  series={[{ key: 'value', name: 'Sessions' }]}
                  palette={{ roles: ['primary', 'info', 'secondary', 'warning'] }}
                  legend
                  unstyled
                />
              </div>
              <div>
                <SectionTitle className="mb-2">Message / MessageList</SectionTitle>
                <MessageList isLive={false}>
                  <Message author="Ava" avatar={<Avatar src={avatarUrl(12)} name="Ava" size="xs" />} timestamp="09:41">
                    Are we still on for the review?
                  </Message>
                  <Message align="end" author="You" timestamp="09:42" status="read">
                    Yes — sending the deck now.
                  </Message>
                </MessageList>
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </>
  )
}
