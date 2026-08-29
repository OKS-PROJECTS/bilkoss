import { Link } from 'react-router-dom'

export const REPO_URL = 'https://github.com/OKS-PROJECTS/bilkoss'

export default function Footer() {
  return (
    <footer
      className="mt-auto flex flex-wrap items-center justify-between gap-2 px-4 py-4 text-[12.5px] sm:px-6"
      style={{ color: 'var(--app-fg-muted)', borderTop: '1px solid var(--app-border)' }}
    >
      <span>
        {new Date().getFullYear()} © Bilkoss ·{' '}
        <span
          className="rounded px-1.5 py-0.5 text-[11px] font-semibold"
          style={{ background: 'var(--app-surface-2)', color: 'var(--app-fg)' }}
        >
          v0.1.0
        </span>
      </span>
      <span className="flex items-center gap-4">
        <Link to="/pages/about" className="hover:text-[var(--app-primary)]">
          About
        </Link>
        <Link to="/apps/support/tickets" className="hover:text-[var(--app-primary)]">
          Support
        </Link>
        <a href={REPO_URL} target="_blank" rel="noreferrer" className="hover:text-[var(--app-primary)]">
          Repository
        </a>
      </span>
    </footer>
  )
}
