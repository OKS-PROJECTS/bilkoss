import { Button } from 'oks-ui'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function range(page, total) {
  const out = []
  const push = (v) => out.push(v)
  const window = 1
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= page - window && i <= page + window)) push(i)
    else if (out[out.length - 1] !== '…') push('…')
  }
  return out
}

export default function Pagination({ page, pageCount, onPage, summary }) {
  if (pageCount <= 1 && !summary) return null
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
      {summary && (
        <span className="text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
          {summary}
        </span>
      )}
      {pageCount > 1 && (
        <div className="flex items-center gap-1">
          <Button
            isIconOnly
            size="sm"
            variant="bordered"
            color="default"
            aria-label="Previous page"
            isDisabled={page <= 1}
            onPress={() => onPage(page - 1)}
          >
            <ChevronLeft size={16} />
          </Button>
          {range(page, pageCount).map((p, i) =>
            p === '…' ? (
              <span key={`e${i}`} className="px-1.5 text-[13px]" style={{ color: 'var(--app-fg-subtle)' }}>
                …
              </span>
            ) : (
              <Button
                key={p}
                isIconOnly
                size="sm"
                aria-label={`Page ${p}`}
                aria-current={p === page ? 'page' : undefined}
                variant={p === page ? 'solid' : 'bordered'}
                color={p === page ? 'primary' : 'default'}
                onPress={() => onPage(p)}
              >
                {p}
              </Button>
            ),
          )}
          <Button
            isIconOnly
            size="sm"
            variant="bordered"
            color="default"
            aria-label="Next page"
            isDisabled={page >= pageCount}
            onPress={() => onPage(page + 1)}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  )
}
