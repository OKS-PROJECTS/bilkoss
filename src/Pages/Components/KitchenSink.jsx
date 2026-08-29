import { useState } from 'react'
import {
  Button,
  Modal,
  Drawer,
  useToast,
  Form,
  FormFieldSet,
  LoopFields,
  DatePickerField,
  FileField,
  PhoneField,
  SteppedForm,
  defineStep,
} from 'oks-ui'
import { PageHeader, Panel } from '../../Components/ui'

const bc = [{ label: 'Bilkoss', to: '/' }, { label: 'Components' }, { label: 'Kitchen Sink' }]

export default function KitchenSink() {
  const toast = useToast()
  const [modal, setModal] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [drawer, setDrawer] = useState(false)

  return (
    <>
      <PageHeader title="Kitchen Sink" breadcrumbs={bc} />
      <p className="mb-6 max-w-2xl text-[13.5px]" style={{ color: 'var(--app-fg-muted)' }}>
        The interactive oks-ui primitives — overlays, toasts, repeatable field groups, pickers and
        the multi-step form.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Overlays">
          <div className="flex flex-wrap gap-3">
            <Button color="primary" onPress={() => setModal(true)}>Open modal</Button>
            <Button variant="bordered" color="danger" onPress={() => setConfirm(true)}>Confirm dialog</Button>
            <Button variant="bordered" color="default" onPress={() => setDrawer(true)}>Open drawer</Button>
          </div>
        </Panel>

        <Panel title="Toasts">
          <div className="flex flex-wrap gap-3">
            <Button variant="soft" color="success" onPress={() => toast.success('Saved successfully')}>Success</Button>
            <Button variant="soft" color="warning" onPress={() => toast.warning('Storage almost full')}>Warning</Button>
            <Button variant="soft" color="danger" onPress={() => toast.error('Something went wrong')}>Error</Button>
            <Button
              variant="soft"
              color="primary"
              onPress={() => toast.promise(new Promise((r) => setTimeout(r, 1400)), { loading: 'Uploading…', success: 'Uploaded', error: 'Failed' })}
            >
              Promise
            </Button>
          </div>
        </Panel>

        <Panel title="Pickers" className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <DatePickerField name="date" label="Date" showPresets />
            <PhoneField name="phone" label="Phone" defaultCountryCode="US" />
            <FileField name="file" label="Attachment" ui="dropzone" isDroppable />
          </div>
        </Panel>

        <Panel title="Repeatable fields (LoopFields)" className="lg:col-span-2">
          <Form onSubmit={() => toast.success('Line items captured')}>
            <LoopFields group="items" minItems={1} maxItems={5} addTitle="Add line item">
              {(index) => (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <FormFieldSet type="text" name={`items.${index}.desc`} label="Description" placeholder="Consulting" />
                  <FormFieldSet type="number" name={`items.${index}.qty`} label="Qty" placeholder="1" />
                  <FormFieldSet type="number" name={`items.${index}.rate`} label="Rate" placeholder="0.00" />
                </div>
              )}
            </LoopFields>
            <Button type="submit" color="primary" className="mt-4">Save items</Button>
          </Form>
        </Panel>

        <Panel title="Stepped form" className="lg:col-span-2">
          <SteppedForm
            headerVariant="progress"
            onSubmit={() => toast.success('Onboarding complete')}
            steps={[
              defineStep({ key: 'account', title: 'Account', fields: [
                { type: 'text', name: 'name', label: 'Full name', validation: { rules: { required: true } } },
                { type: 'email', name: 'email', label: 'Email', validation: { rules: { required: true, email: true } } },
              ] }),
              defineStep({ key: 'company', title: 'Company', fields: [
                { type: 'text', name: 'company', label: 'Company name' },
                { type: 'select', name: 'size', label: 'Team size', options: [{ label: '1–10', value: 's' }, { label: '11–50', value: 'm' }, { label: '50+', value: 'l' }] },
              ] }),
              defineStep({ key: 'done', title: 'Confirm', content: (
                <p className="text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>Review your details and submit to finish onboarding.</p>
              ) }),
            ]}
          />
        </Panel>
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="Invite teammates" actions={
        <>
          <Button variant="bordered" color="default" onPress={() => setModal(false)}>Cancel</Button>
          <Button color="primary" onPress={() => { setModal(false); toast.success('Invites sent') }}>Send invites</Button>
        </>
      }>
        <Form onSubmit={() => {}}>
          <FormFieldSet type="email" name="invite" label="Email addresses" placeholder="teammate@example.com" />
        </Form>
      </Modal>

      <Modal
        isOpen={confirm}
        onClose={() => setConfirm(false)}
        role="alertdialog"
        title="Delete workspace?"
        actions={
          <>
            <Button variant="bordered" color="default" onPress={() => setConfirm(false)}>Cancel</Button>
            <Button color="danger" onPress={() => { setConfirm(false); toast.error('Workspace deleted') }}>Delete</Button>
          </>
        }
      >
        <p className="text-[13.5px]" style={{ color: 'var(--app-fg-muted)' }}>
          This permanently removes the workspace and all of its data. This action cannot be undone.
        </p>
      </Modal>

      <Drawer isOpen={drawer} onClose={() => setDrawer(false)} position="right" title="Filters" width={360}>
        <Form onSubmit={() => setDrawer(false)} className="space-y-4">
          <FormFieldSet type="select" name="status" label="Status" options={[{ label: 'Any', value: '' }, { label: 'Active', value: 'a' }, { label: 'Archived', value: 'x' }]} />
          <FormFieldSet type="datepicker" name="range" label="Date range" props={{ range: true }} />
          <Button type="submit" color="primary" fullWidth>Apply filters</Button>
        </Form>
      </Drawer>
    </>
  )
}
