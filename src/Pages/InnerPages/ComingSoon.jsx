import { useLocation } from 'react-router-dom'
import { Button } from 'oks-ui'
import { Hammer } from 'lucide-react'
import { PageHeader, Panel, EmptyState } from '../../Components/ui'

export default function ComingSoon() {
  const { pathname } = useLocation()
  const name = pathname.split('/').filter(Boolean).slice(-1)[0]?.replace(/-/g, ' ') || 'Page'
  return (
    <>
      <PageHeader title={name.replace(/\b\w/g, (c) => c.toUpperCase())} breadcrumbs={[{ label: 'Bilkoss', to: '/' }, { label: name }]} />
      <Panel>
        <EmptyState
          icon={Hammer}
          title="This screen is on the way"
          description="This route is wired into the shell — its full page is being built in a later pass."
          action={
            <Button as="a" href="/" color="primary" size="sm">
              Back to dashboard
            </Button>
          }
        />
      </Panel>
    </>
  )
}
