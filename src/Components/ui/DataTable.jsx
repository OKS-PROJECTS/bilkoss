import { useMemo, useState } from 'react'
import { Table } from 'oks-ui'
import Pagination from './Pagination'
import EmptyState from './EmptyState'

const ALIGN = { left: 'start', right: 'end', center: 'center', start: 'start', end: 'end' }

/**
 * Data table — backed by oks-ui <Table> (it owns sort semantics, row selection,
 * sticky header, loading skeletons and the empty state). This wrapper keeps the
 * template's column shape and adds client-side pagination (Table does not bundle
 * it) via the `bottomContent` slot.
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
  ariaLabel = 'Data table',
  className,
}) {
  const [sort, setSort] = useState(null) // TableSortDescriptor | null
  const [page, setPage] = useState(1)

  const cols = useMemo(
    () =>
      columns.map((c) => ({
        key: c.key,
        header: c.header,
        align: ALIGN[c.align] || undefined,
        sortable: c.sortable,
        sortValue: c.sortValue,
        render: c.render,
        width: c.width,
      })),
    [columns],
  )

  const sorted = useMemo(() => {
    if (!sort) return rows
    const col = columns.find((c) => c.key === sort.column)
    if (!col) return rows
    const val = col.sortValue || ((r) => r[col.key])
    const copy = [...rows]
    copy.sort((a, b) => {
      const av = val(a)
      const bv = val(b)
      if (av == null) return 1
      if (bv == null) return -1
      const cmp =
        typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv))
      return sort.direction === 'ascending' ? cmp : -cmp
    })
    return copy
  }, [rows, sort, columns])

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  const curPage = Math.min(page, pageCount)
  const pageRows = sorted.slice((curPage - 1) * pageSize, curPage * pageSize)

  return (
    <Table
      aria-label={ariaLabel}
      className={className}
      columns={cols}
      rows={pageRows}
      getRowKey={getRowKey}
      isCompact={dense}
      stickyHeader={stickyHeader}
      isLoading={loading}
      loadingRowCount={Math.min(pageSize, 6)}
      emptyContent={emptyContent || <EmptyState />}
      selectionMode={selectable ? 'multiple' : 'none'}
      sortDescriptor={sort}
      onSortChange={setSort}
      onRowAction={onRowClick ? (_key, row) => onRowClick(row) : undefined}
      bottomContent={
        !loading && sorted.length > 0 ? (
          <Pagination
            page={curPage}
            pageCount={pageCount}
            onPage={setPage}
            summary={`Showing ${(curPage - 1) * pageSize + 1}–${Math.min(curPage * pageSize, sorted.length)} of ${sorted.length}`}
          />
        ) : null
      }
    />
  )
}
