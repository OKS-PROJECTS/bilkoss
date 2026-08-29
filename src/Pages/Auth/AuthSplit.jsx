import { Link } from 'react-router-dom'
import Logo from '../../Components/Commom/Logo'

/**
 * Shell-less split screen: form panel left, coloured brand panel right.
 * Cloned from the reference's distinctive auth layout.
 */
export default function AuthSplit({ heading, sub, children, footer }) {
  return (
    <div className="grid min-h-full lg:grid-cols-2" style={{ background: 'var(--app-surface)' }}>
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <Logo to="/" />
          <h1 className="mt-10 text-[22px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
            {heading}
          </h1>
          {sub && (
            <p className="mt-1.5 text-[13.5px]" style={{ color: 'var(--app-fg-muted)' }}>
              {sub}
            </p>
          )}
          <div className="mt-7">{children}</div>
          {footer && (
            <p className="mt-6 text-center text-[13px]" style={{ color: 'var(--app-fg-muted)' }}>
              {footer}
            </p>
          )}
          <p className="mt-10 text-center text-[12px]" style={{ color: 'var(--app-fg-subtle)' }}>
            © {new Date().getFullYear()} Bilkoss — built with oks-ui
          </p>
        </div>
      </div>

      <div
        className="relative hidden items-center justify-center overflow-hidden lg:flex"
        style={{
          background:
            'linear-gradient(135deg, var(--oks-color-primary-600), var(--oks-color-primary-800))',
        }}
      >
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="relative max-w-md px-12 text-center text-white">
          <Logo to={null} onDark />
          <p className="mt-8 text-[20px] leading-relaxed font-semibold">
            The admin template that shows off everything oks-ui can build.
          </p>
          <p className="mt-4 text-[14px] text-white/80">
            Tables, charts, forms, the shell — every pixel composed from a single
            CSS-variable component library.
          </p>
        </div>
      </div>
    </div>
  )
}

export const AuthLink = ({ to, children }) => (
  <Link to={to} className="font-semibold" style={{ color: 'var(--app-primary)' }}>
    {children}
  </Link>
)
