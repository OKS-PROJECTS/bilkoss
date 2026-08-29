import { Button } from 'oks-ui'
import { Plus } from 'lucide-react'
import { PageHeader, BoardView } from '../../Components/ui'

/** Kanban archetype. BOARD_CONFIGS entry: { title, breadcrumbs?, columns } */
export default function BoardPage({ config }) {
  return (
    <>
      <PageHeader
        title={config.title}
        breadcrumbs={config.breadcrumbs}
        actions={
          <Button size="sm" color="primary" startContent={<Plus size={15} />}>
            Add card
          </Button>
        }
      />
      <BoardView columns={config.columns} />
    </>
  )
}
