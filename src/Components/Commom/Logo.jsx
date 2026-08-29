import { Link } from 'react-router-dom'
import clsx from 'clsx'

/**
 * The official OKS mark — a ring for the O, a solid red dot, then K and S —
 * with the invented product wordmark ("Bilkoss") beside it.
 *
 * Marks are driven from `currentColor` (set to --app-fg-strong, or forced white
 * via the `onDark` variant for coloured panels like the auth split). The dot is
 * always #ED0D11.
 */
export function OksMark({ size = 26, onDark = false, className }) {
  return (
    <svg
      viewBox="0 0 132 40"
      height={size}
      role="img"
      aria-label="OKS"
      className={clsx('shrink-0', className)}
      style={{ color: onDark ? '#ffffff' : 'var(--app-fg-strong)' }}
    >
      {/* O — ring */}
      <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="7" />
      {/* · — the red dot, always #ED0D11 */}
      <circle cx="46" cy="27" r="6" fill="#ED0D11" />
      {/* K S */}
      <text
        x="58"
        y="30"
        fill="currentColor"
        style={{
          font: '800 30px/1 var(--app-font, sans-serif)',
          letterSpacing: '-0.5px',
        }}
      >
        KS
      </text>
    </svg>
  )
}

export default function Logo({ to = '/', onDark = false, collapsed = false, className }) {
  const content = (
    <span className={clsx('flex items-center gap-2.5', className)}>
      <OksMark size={24} onDark={onDark} />
      {!collapsed && (
        <span
          className="text-[19px] font-extrabold tracking-tight"
          style={{ color: onDark ? '#fff' : 'var(--app-fg-strong)' }}
        >
          Bilkoss
        </span>
      )}
    </span>
  )
  if (!to) return content
  return (
    <Link to={to} className="link-reset inline-flex">
      {content}
    </Link>
  )
}
