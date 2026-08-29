import { Form, FormFieldSet, Button, useToast } from 'oks-ui'
import { PageHeader, Panel } from '../../Components/ui'

/**
 * Create / edit form archetype. FORM_CONFIGS entry:
 * { title, subtitle, breadcrumbs?, groups: [{ title?, fields: [{ type, name, label, ... }] }],
 *   submitLabel? }
 */
export default function FormPage({ config }) {
  const { title, breadcrumbs, groups = [], submitLabel = 'Save' } = config
  const toast = useToast()

  return (
    <>
      <PageHeader title={title} breadcrumbs={breadcrumbs} />
      <Form
        onSubmit={() => toast.success(`${title} saved`)}
        className="grid grid-cols-1 gap-5 lg:grid-cols-3"
      >
        <div className="space-y-5 lg:col-span-2">
          {groups.map((g, gi) => (
            <Panel key={gi} title={g.title} subtitle={g.subtitle}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {g.fields.map((f) => (
                  <div key={f.name} className={f.full ? 'sm:col-span-2' : undefined}>
                    <FormFieldSet
                      type={f.type}
                      name={f.name}
                      label={f.label}
                      placeholder={f.placeholder}
                      description={f.description}
                      options={f.options}
                      validation={f.required ? { rules: { required: true } } : undefined}
                      {...f.props}
                    />
                  </div>
                ))}
              </div>
            </Panel>
          ))}
        </div>

        <div className="space-y-5">
          <Panel title="Actions">
            <div className="flex flex-col gap-2">
              <Button type="submit" color="primary" fullWidth>
                {submitLabel}
              </Button>
              <Button type="reset" variant="bordered" color="default" fullWidth>
                Reset
              </Button>
            </div>
          </Panel>
          {config.sidePanels?.map((p, i) => (
            <Panel key={i} title={p.title}>
              <div className="grid grid-cols-1 gap-4">
                {p.fields.map((f) => (
                  <FormFieldSet key={f.name} type={f.type} name={f.name} label={f.label} options={f.options} placeholder={f.placeholder} {...f.props} />
                ))}
              </div>
            </Panel>
          ))}
        </div>
      </Form>
    </>
  )
}
