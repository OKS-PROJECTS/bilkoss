import { Tabs, Tab, Form, FormFieldSet, Button, useToast } from 'oks-ui'
import { PageHeader, Panel } from '../../Components/ui'
import { useIsDesktop } from '../../lib/useMediaQuery'

/**
 * Settings panel archetype. SETTINGS_CONFIGS entry:
 * { title, breadcrumbs?, tabs: [{ key, label, groups: [{ title?, fields: [...] }] }] }
 */
export default function SettingsPage({ config }) {
  const { title, breadcrumbs, tabs = [] } = config
  const isDesktop = useIsDesktop()
  const toast = useToast()

  return (
    <>
      <PageHeader title={title} breadcrumbs={breadcrumbs} />
      <Panel>
        <Tabs
          isVertical={isDesktop}
          variant={isDesktop ? 'light' : 'underlined'}
          color="primary"
          classNames={{ base: isDesktop ? 'flex gap-6' : 'flex flex-col gap-4' }}
        >
          {tabs.map((t) => (
            <Tab key={t.key} title={t.label}>
              <Form onSubmit={() => toast.success('Settings updated')} className="max-w-2xl space-y-6 pt-1">
                {t.groups.map((g, gi) => (
                  <div key={gi}>
                    {g.title && (
                      <h4 className="mb-3 text-[13px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
                        {g.title}
                      </h4>
                    )}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {g.fields.map((f) => (
                        <div key={f.name} className={f.full ? 'sm:col-span-2' : undefined}>
                          <FormFieldSet type={f.type} name={f.name} label={f.label} options={f.options} placeholder={f.placeholder} description={f.description} {...f.props} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="flex gap-2 pt-2">
                  <Button type="submit" color="primary">
                    Save changes
                  </Button>
                  <Button type="reset" variant="bordered" color="default">
                    Cancel
                  </Button>
                </div>
              </Form>
            </Tab>
          ))}
        </Tabs>
      </Panel>
    </>
  )
}
