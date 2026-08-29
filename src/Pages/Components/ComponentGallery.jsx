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
} from 'oks-ui'
import { Check, Star, Bell, Trash2 } from 'lucide-react'
import { PageHeader, Panel, SectionTitle } from '../../Components/ui'
import { avatarUrl } from '../../lib/format'

const bc = [{ label: 'Bilkoss', to: '/' }, { label: 'Components' }, { label: 'Overview' }]

function Row({ children }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>
}
export default function ComponentGallery() {
  const [range, setRange] = useState(40)
  return (
    <>
      <PageHeader title="Component Gallery" breadcrumbs={bc} />
      <p className="mb-6 max-w-2xl text-[13.5px]" style={{ color: 'var(--app-fg-muted)' }}>
        Every control on this page is an <strong>oks-ui</strong> primitive or composed from oks-ui
        primitives — no other component library anywhere in this template.
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
      </div>
    </>
  )
}
