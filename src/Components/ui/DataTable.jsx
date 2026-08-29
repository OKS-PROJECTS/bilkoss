import { useMemo, useState } from 'react'
import { Checkbox } from 'oks-ui'
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'
import clsx from 'clsx'
import Pagination from './Pagination'
import Skeleton from './Skeleton'
import EmptyState from './EmptyState'

/**
 * Data table — oks-ui ships none. Composed from <table> + <Checkbox> + our
 * Pagination + Skeleton. Supports column config, cell renderers, client sort,
 * row selection, pagination, sticky header, empty + loading states.
 *
 * columns: [{ key, header, align?, sortable?, sortValue?(row), render?(row), width? }]
 */
export default function DataTable({
  columns,
  rows,
  getRowKey = (r, i) => r.id ?? i,
  pageSize = 10,
  selectable = false,
  onRowClick,
  loading = false,
  emptyContent,
  stickyHeader = true,
  dense = false,
  className,
}) {
  const [sort, setSort] = useState(null) // { key, dir }
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(() => new Set())

  const sorted = useMemo(() => {
    if (!sort) return rows
    const col = columns.find((c) => c.key === sort.key)
    if (!col) return rows
    const val = col.sortValue || ((r) => r[col.key])
    const copy = [...rows]
    copy.sort((a, b) => {
      const av = val(a)
      const bv = val(b)
      if (av == null) return 1
      if (bv == null) return -1
      const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv))
      return sort.dir === 'asc' ? cmp : -cmp
    })
    return copy
  }, [rows, sort, columns])

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const curPage = Math.min(page, pageCount)
  const pageRows = sorted.slice((curPage - 1) * pageSize, curPage * pageSize)

  const toggleSort = (key) =>
    setSort((s) =>
      s?.key === key ? (s.dir === 'asc' ? { key, dir: 'desc' } : null) : { key, dir: 'asc' },
    )

  const allOnPageSelected = pageRows.length > 0 && pageRows.every((r, i) => selected.has(getRowKey(r, i)))
  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (allOnPageSelected) pageRows.forEach((r, i) => next.delete(getRowKey(r, i)))
      else pageRows.forEach((r, i) => next.add(getRowKey(r, i)))
      return next
    })
  }
  const toggleRow = (key) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })

  const cellPad = dense ? 'px-3 py-2' : 'px-4 py-3'

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead
            className={clsx(stickyHeader && 'sticky top-0 z-10')}
            style={{ background: 'var(--app-surface-2)' }}
          >
            <tr>
              {selectable && (
                <th className={clsx(cellPad, 'w-10')}>
                  <Checkbox
                    aria-label="Select all rows on this page"
                    isSelected={allOnPageSelected}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((col) => {
                const active = sort?.key === col.key
                const Icon = !active ? ChevronsUpDown : sort.dir === 'asc' ? ChevronUp : ChevronDown
                return (
                  <th
                    key={col.key}
                    className={clsx(
                      cellPad,
                      'text-[11px] font-bold uppercase tracking-[0.05em] whitespace-nowrap',
                      col.align === 'right' && 'text-right',
                      col.align === 'center' && 'text-center',
                      !col.align && 'text-left',
                    )}
                    style={{ color: 'var(--app-fg-muted)', width: col.width }}
                  >
                    {col.sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(col.key)}
                        className={clsx(
                          'inline-flex items-center gap-1 transition-colors hover:text-[var(--app-fg-strong)]',
                          col.align === 'right' && 'flex-row-reverse',
                        )}
                      >
                        {col.header}
                        <Icon size={13} className={active ? 'opacity-100' : 'opacity-40'} />
                      </button>
                    ) : (
                      col.header
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: Math.min(pageSize, 6) }).map((_, i) => (
                <tr key={i} style={{ borderTop: '1px solid var(--app-border)' }}>
                  {selectable && <td className={cellPad} />}
                  {columns.map((col) => (
                    <td key={col.key} className={cellPad}>
                      <Skeleton className="h-3.5" />
                    </td>
                  ))}
                </tr>
              ))
            ) : pageRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  {emptyContent || <EmptyState />}
                </td>
              </tr>
            ) : (
              pageRows.map((row, i) => {
                const key = getRowKey(row, i)
                return (
                  <tr
                    key={key}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={clsx(
                      'transition-colors',
                      onRowClick && 'cursor-pointer',
                      'hover:bg-[var(--app-surface-2)]',
                    )}
                    style={{ borderTop: '1px solid var(--app-border)' }}
                  >
                    {selectable && (
                      <td className={cellPad} onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          aria-label="Select row"
                          isSelected={selected.has(key)}
                          onChange={() => toggleRow(key)}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={clsx(
                          cellPad,
                          'align-middle',
                          col.align === 'right' && 'text-right',
                          col.align === 'center' && 'text-center',
                        )}
                        style={{ color: 'var(--app-fg)' }}
                      >
                        {col.render ? col.render(row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {!loading && sorted.length > 0 && (
        <Pagination
          page={curPage}
          pageCount={pageCount}
          onPage={setPage}
          summary={`Showing ${(curPage - 1) * pageSize + 1}–${Math.min(curPage * pageSize, sorted.length)} of ${sorted.length}`}
        />
      )}
    </div>
  )
}
