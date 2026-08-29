import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import { NAV } from '../../data/nav'
import Logo from './Logo'

const rowBase = (depth) =>
  clsx(
    'group relative flex items-center gap-3 rounded-[5px] transition-colors',
    depth === 0 ? 'px-2.5 py-2.5 text-[13.5px] font-medium' : 'py-[7px] pr-2.5 text-[13px]',
  )

function useMenuColors() {
  return {
    fg: 'var(--app-menu-fg)',
    activeFg: 'var(--app-menu-active-fg)',
    activeBg: 'var(--app-menu-active-bg)',
    hoverBg: 'var(--app-menu-hover-bg)',
  }
}

function NavLeaf({ node, depth, onNavigate }) {
  const c = useMenuColors()
  return (
    <NavLink
      to={node.to}
      onClick={onNavigate}
      style={({ isActive }) => ({
        color: isActive ? c.activeFg : c.fg,
        background: isActive && depth === 0 ? c.activeBg : undefined,
        paddingLeft: depth === 0 ? undefined : `${12 + depth * 14}px`,
      })}
      className={({ isActive }) =>
        clsx(rowBase(depth), 'hover:text-[var(--app-menu-hover-fg)]', !isActive && 'hover:bg-[var(--app-menu-hover-bg)]')
      }
    >
      {node.icon && <node.icon size={18} className="shrink-0" />}
      {depth > 0 && (
        <span
          className="ml-1 h-1 w-1 shrink-0 rounded-full"
          style={{ background: 'currentColor', opacity: 0.5 }}
          aria-hidden
        />
      )}
      <span className="truncate">{node.label}</span>
    </NavLink>
  )
}

function NavGroup({ node, depth, onNavigate }) {
  const { pathname } = useLocation()
  const c = useMenuColors()
  const flatten = (n) => (n.children ? n.children.flatMap(flatten) : n.to ? [n.to] : [])
  const paths = flatten(node)
  const pathActive = paths.some((p) => pathname === p || pathname.startsWith(p + '/'))
  const [manual, setManual] = useState(null)
  const open = manual ?? pathActive

  return (
    <div>
      <button
        type="button"
        onClick={() => setManual(!open)}
        aria-expanded={open}
        style={{
          color: pathActive ? c.activeFg : c.fg,
          background: pathActive && depth === 0 ? c.activeBg : undefined,
          paddingLeft: depth === 0 ? undefined : `${12 + depth * 14}px`,
        }}
        className={clsx(
          rowBase(depth),
          'w-full hover:text-[var(--app-menu-hover-fg)]',
          !pathActive && 'hover:bg-[var(--app-menu-hover-bg)]',
        )}
      >
        {node.icon && <node.icon size={18} className="shrink-0" />}
        {depth > 0 && (
          <span className="ml-1 h-1 w-1 shrink-0 rounded-full" style={{ background: 'currentColor', opacity: 0.5 }} aria-hidden />
        )}
        <span className="flex-1 truncate text-left">{node.label}</span>
        <ChevronRight size={14} className="shrink-0 transition-transform" style={{ transform: open ? 'rotate(90deg)' : 'none' }} />
      </button>
      {open && (
        <div className="mt-0.5 mb-1 space-y-0.5">
          {node.children.map((child, i) => (
            <NavNode key={`${child.label}-${i}`} node={child} depth={depth + 1} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  )
}

function NavNode({ node, depth, onNavigate }) {
  if (node.heading) {
    return (
      <p
        className="px-2.5 pt-5 pb-2 text-[10px] font-bold tracking-[0.1em] uppercase first:pt-1"
        style={{ color: 'var(--app-menu-heading)' }}
      >
        {node.heading}
      </p>
    )
  }
  return node.children ? (
    <NavGroup node={node} depth={depth} onNavigate={onNavigate} />
  ) : (
    <NavLeaf node={node} depth={depth} onNavigate={onNavigate} />
  )
}

export default function Sidebar({ onNavigate }) {
  return (
    <div className="flex h-full flex-col" style={{ background: 'var(--app-menu-bg)' }}>
      <div
        className="flex h-[65px] shrink-0 items-center px-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        <Logo onDark />
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2.5 py-3">
        {NAV.map((node, i) => (
          <NavNode key={`${node.label || node.heading}-${i}`} node={node} depth={0} onNavigate={onNavigate} />
        ))}
      </nav>
    </div>
  )
}
