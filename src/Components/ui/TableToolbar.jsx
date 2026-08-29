import clsx from 'clsx'

/** Filter/search/action row above a DataTable. */
export default function TableToolbar({ left, right, className }) {
  return (
    <div className={clsx('flex flex-wrap items-center justify-between gap-3', className)}>
      <div className="flex flex-wrap items-center gap-2">{left}</div>
      <div className="flex flex-wrap items-center gap-2">{right}</div>
    </div>
  )
}
