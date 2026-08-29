import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import { NAV } from '../../data/nav'
import Logo from './Logo'

const flatten = (n) => (n.children ? n.children.flatMap(flatten) : n.to ? [n.to] : [])

function NavLeaf({ node, depth, onNavigate }) {
  return (
    <NavLink
      to={node.to}
      onClick={onNavigate}
      style={({ isActive }) => ({
        color: isActive
          ? depth === 0
            ? 'var(--app-menu-active-fg)'
            : 'var(--app-menu-hover-fg)'
          : 'var(--app-menu-fg)',
        background: isActive && depth === 0 ? 'var(--app-menu-active-bg)' : undefined,
        paddingLeft: depth === 0 ? '10px' : `${18 + (depth - 1) * 16}px`,
        fontWeight: isActive && depth > 0 ? 600 : depth === 0 ? 500 : 400,
      })}
      className={({ isActive }) =>
        clsx(
          'flex items-center gap-3 rounded-[5px] transition-colors',
          depth === 0 ? 'px-2.5 py-2.5 text-[13.5px]' : 'py-[7px] pr-2.5 text-[12.75px]',
          'hover:text-[var(--app-menu-hover-fg)]',
          !isActive && 'hover:bg-[var(--app-menu-hover-bg)]',
        )
      }
    >
      {node.icon && <node.icon size={18} strokeWidth={1.6} className="shrink-0" />}
      <span className="truncate">{node.label}</span>
    </NavLink>
  )
}

function NavGroup({ node, depth, onNavigate }) {
  const { pathname } = useLocation()
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
          color: pathActive ? 'var(--app-menu-active-fg)' : 'var(--app-menu-fg)',
          background: pathActive && depth === 0 ? 'var(--app-menu-active-bg)' : undefined,
          paddingLeft: depth === 0 ? '10px' : `${18 + (depth - 1) * 16}px`,
          fontWeight: depth === 0 ? 500 : 400,
        }}
        className={clsx(
          'flex w-full items-center gap-3 rounded-[5px] transition-colors',
          depth === 0 ? 'px-2.5 py-2.5 text-[13.5px]' : 'py-[7px] pr-2.5 text-[12.75px]',
          'hover:text-[var(--app-menu-hover-fg)]',
          !pathActive && 'hover:bg-[var(--app-menu-hover-bg)]',
        )}
      >
        {node.icon && <node.icon size={18} strokeWidth={1.6} className="shrink-0" />}
        <span className="flex-1 truncate text-left">{node.label}</span>
        <ChevronRight
          size={14}
          className="shrink-0 opacity-70 transition-transform"
          style={{ transform: open ? 'rotate(90deg)' : 'none' }}
        />
      </button>
      {open && (
        <div className="mt-0.5 mb-1 space-y-px">
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
        className="px-2.5 pt-[22px] pb-2 text-[10px] font-bold tracking-[0.1em] uppercase first:pt-1.5"
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
    <div className="app-sidebar flex h-full flex-col" style={{ background: 'var(--app-menu-bg)' }}>
      <div className="flex h-[65px] shrink-0 items-center px-4">
        <Logo onDark />
      </div>
      <nav className="flex-1 space-y-px overflow-y-auto px-2.5 pt-1 pb-6">
        {NAV.map((node, i) => (
          <NavNode key={`${node.label || node.heading}-${i}`} node={node} depth={0} onNavigate={onNavigate} />
        ))}
      </nav>
    </div>
  )
}
