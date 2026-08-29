import { Button } from 'oks-ui'
import { Wrench } from 'lucide-react'
import { OksMark } from '../../Components/Commom/Logo'

export default function Maintenance() {
  return (
    <div
      className="flex min-h-full flex-col items-center justify-center px-6 py-16 text-center"
      style={{ background: 'var(--app-bg)' }}
    >
      <OksMark size={30} />
      <span
        className="mt-10 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ background: 'var(--app-primary-soft)', color: 'var(--app-primary)' }}
      >
        <Wrench size={28} />
      </span>
      <h1 className="mt-6 text-[22px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
        Down for maintenance
      </h1>
      <p className="mt-2 max-w-md text-[14px]" style={{ color: 'var(--app-fg-muted)' }}>
        Bilkoss is getting an upgrade. We will be back online within the hour — thanks for your patience.
      </p>
      <Button color="primary" variant="bordered" className="mt-6" onPress={() => window.location.reload()}>
        Retry now
      </Button>
    </div>
  )
}
