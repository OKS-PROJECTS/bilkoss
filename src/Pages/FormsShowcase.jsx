import { useLocation } from 'react-router-dom'
import {
  Form, FormFieldSet, TextField, TextAreaField, PasswordField, SelectField,
  SwitchField, Checkbox, CheckboxGroupField, RadioGroupField, RangeField,
  DatePickerField, FileField, PhoneField, OtpField, TextEditor, SteppedForm,
  defineStep, Button, useToast,
} from 'oks-ui'
import { PageHeader, Panel } from '../Components/ui'

const crumb = (leaf) => [{ label: 'Bilkoss', to: '/' }, { label: 'Forms' }, { label: leaf }]

const CONFIG = {
  '/forms/elements': { title: 'Basic Elements', render: ElementsBody },
  '/forms/validation': { title: 'Validation', render: ValidationBody },
  '/forms/wizard': { title: 'Wizard', render: WizardBody },
  '/forms/pickers': { title: 'Pickers', render: PickersBody },
  '/forms/uploads': { title: 'File Uploads', render: UploadsBody },
  '/forms/editor': { title: 'Text Editor', render: EditorBody },
  '/forms/layouts': { title: 'Layouts', render: LayoutsBody },
}

export default function FormsShowcase() {
  const { pathname } = useLocation()
  const cfg = CONFIG[pathname] || CONFIG['/forms/elements']
  const Body = cfg.render
  return (
    <>
      <PageHeader title={cfg.title} breadcrumbs={crumb(cfg.title)} />
      <Body />
    </>
  )
}

function ElementsBody() {
  const toast = useToast()
  return (
    <Panel title="Form controls" subtitle="Every field is an oks-ui component">
      <Form onSubmit={() => toast.success('Form submitted')} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Text" placeholder="Plain text" />
        <TextField label="Email" type="email" placeholder="you@example.com" />
        <PasswordField label="Password" />
        <SelectField label="Select" options={[{ label: 'One', value: '1' }, { label: 'Two', value: '2' }]} />
        <TextAreaField label="Textarea" placeholder="Multi-line…" className="sm:col-span-2" />
        <div className="flex flex-wrap items-center gap-6">
          <SwitchField label="Switch" defaultChecked />
          <Checkbox label="Checkbox" />
        </div>
        <RadioGroupField label="Radio group" options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]} />
        <CheckboxGroupField label="Checkbox group" options={[{ label: 'Email', value: 'e' }, { label: 'SMS', value: 's' }, { label: 'Push', value: 'p' }]} />
        <div className="sm:col-span-2"><Button type="submit" color="primary">Submit</Button></div>
      </Form>
    </Panel>
  )
}

function ValidationBody() {
  const toast = useToast()
  return (
    <Panel title="Validation" subtitle="Rules via oks-ui validation utilities — no zod, no react-hook-form">
      <Form onSubmit={() => toast.success('Valid — submitted')} validationMode="blur" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormFieldSet type="text" name="name" label="Name (required)" validation={{ rules: { required: true, minLength: 2 } }} />
        <FormFieldSet type="email" name="email" label="Email (required, format)" validation={{ rules: { required: true, email: true } }} />
        <FormFieldSet type="password" name="password" label="Strong password" validation={{ rules: { required: true, strongPassword: true } }} />
        <FormFieldSet type="password" name="confirm" label="Confirm password" validation={{ rules: { required: true, matchField: 'password' } }} />
        <FormFieldSet type="number" name="age" label="Age (18–120)" validation={{ rules: { min: 18, max: 120 } }} />
        <FormFieldSet type="text" name="code" label="Code (pattern A-Z0-9)" validation={{ rules: { pattern: '^[A-Z0-9]+$' } }} />
        <div className="sm:col-span-2"><Button type="submit" color="primary">Validate & submit</Button></div>
      </Form>
    </Panel>
  )
}

function WizardBody() {
  const toast = useToast()
  return (
    <Panel title="Multi-step form">
      <SteppedForm
        headerVariant="tabs"
        onSubmit={() => toast.success('Wizard complete')}
        steps={[
          defineStep({ key: 'a', title: 'Account', fields: [
            { type: 'text', name: 'name', label: 'Full name', validation: { rules: { required: true } } },
            { type: 'email', name: 'email', label: 'Email', validation: { rules: { required: true, email: true } } },
          ] }),
          defineStep({ key: 'b', title: 'Address', fields: [
            { type: 'text', name: 'street', label: 'Street' },
            { type: 'text', name: 'city', label: 'City' },
            { type: 'text', name: 'zip', label: 'ZIP' },
          ] }),
          defineStep({ key: 'c', title: 'Review', content: <p className="text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>Confirm and submit.</p> }),
        ]}
      />
    </Panel>
  )
}

function PickersBody() {
  return (
    <Panel title="Pickers">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <DatePickerField name="date" label="Date" showPresets />
        <DatePickerField name="range" label="Date range" range showPresets />
        <DatePickerField name="datetime" label="Date & time" withTime />
        <PhoneField name="phone" label="Phone" defaultCountryCode="US" />
        <div className="sm:col-span-2"><RangeField name="budget" label="Budget range" selection="range" min={0} max={1000} /></div>
        <OtpField name="otp" length={6} />
      </div>
    </Panel>
  )
}

function UploadsBody() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Panel title="Drop zone"><FileField name="a" label="Upload files" ui="dropzone" isDroppable maxFiles={5} preview="thumbnails" /></Panel>
      <Panel title="Inline"><FileField name="b" label="Attach a file" ui="inline" /></Panel>
    </div>
  )
}

function EditorBody() {
  return (
    <Panel title="Rich text editor">
      <TextEditor
        value={[{ type: 'heading', content: 'Release notes — 2.4' }, { type: 'paragraph', content: 'This editor is the oks-ui TextEditor block editor. Try the block menu.' }]}
        onChange={() => {}}
      />
    </Panel>
  )
}

function LayoutsBody() {
  return (
    <div className="space-y-6">
      <Panel title="Two-column">
        <Form onSubmit={() => {}} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="First name" />
          <TextField label="Last name" />
          <TextField label="Company" className="sm:col-span-2" />
          <SelectField label="Role" options={[{ label: 'Admin', value: 'a' }, { label: 'Member', value: 'm' }]} />
          <TextField label="Team" />
        </Form>
      </Panel>
      <Panel title="Horizontal (label left)">
        <div className="space-y-4">
          <TextField label="Email" labelPlacement="left" placeholder="you@example.com" />
          <TextField label="Website" labelPlacement="left" placeholder="https://" />
          <SelectField label="Timezone" labelPlacement="left" options={[{ label: 'UTC', value: 'utc' }, { label: 'PST', value: 'pst' }]} />
        </div>
      </Panel>
    </div>
  )
}
