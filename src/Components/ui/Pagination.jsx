import { Pagination as OksPagination } from 'oks-ui'

/**
 * Wrapper over oks-ui <Pagination>. Keeps the template's call signature
 * (`{ page, pageCount, onPage, summary }`) — `summary` is a pre-formatted
 * "Showing X–Y of Z" string the caller builds.
 */
export default function Pagination({ page, pageCount, onPage, summary }) {
  if (pageCount <= 1 && !summary) return null
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
      {summary ? (
        <span className="text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
          {summary}
        </span>
      ) : (
        <span />
      )}
      {pageCount > 1 && (
        <OksPagination page={page} pageCount={pageCount} onChange={onPage} size="sm" />
      )}
    </div>
  )
}
