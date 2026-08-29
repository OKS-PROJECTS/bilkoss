import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  TextField,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
  Avatar,
  Tooltip,
} from 'oks-ui'
import {
  Menu,
  Search,
  Sun,
  Moon,
  Bell,
  Grid3x3,
  Maximize,
  Settings,
  Palette,
  Globe,
  LogOut,
  User,
  LayoutDashboard,
  ShoppingBag,
  MessagesSquare,
  Mail,
  Calendar,
  FolderKanban,
} from 'lucide-react'
import { avatarUrl } from '../../lib/format'

function useThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.getAttribute('data-theme') === 'dark')
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('bilkoss-theme', next ? 'dark' : 'light')
  }
  return { dark, toggle }
}

const APPS = [
  { label: 'Dashboard', to: '/dashboards/ecommerce', icon: LayoutDashboard },
  { label: 'E-Commerce', to: '/apps/ecommerce/products', icon: ShoppingBag },
  { label: 'Chat', to: '/apps/chat', icon: MessagesSquare },
  { label: 'Email', to: '/apps/email/inbox', icon: Mail },
  { label: 'Calendar', to: '/apps/more/calendar', icon: Calendar },
  { label: 'Projects', to: '/apps/projects/grid', icon: FolderKanban },
]

const NOTIES = [
  { id: 1, title: 'New order #ORD-4821 placed', time: '2m ago', color: 'success' },
  { id: 2, title: 'Payout of $2,480 processed', time: '1h ago', color: 'primary' },
  { id: 3, title: 'Inventory low: Velvet Chair', time: '3h ago', color: 'warning' },
  { id: 4, title: 'Refund request from A. Diaz', time: '5h ago', color: 'danger' },
]

export default function Header({ onOpenSidebar }) {
  const { dark, toggle } = useThemeToggle()
  const navigate = useNavigate()

  const goFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.()
    else document.exitFullscreen?.()
  }

  return (
    <header
      className="sticky top-0 z-30 flex h-[65px] items-center gap-2 px-3 sm:px-4"
      style={{ background: 'var(--app-header-bg)', boxShadow: 'var(--app-header-shadow)' }}
    >
      <Button
        isIconOnly
        variant="ghost"
        color="default"
        size="sm"
        className="lg:hidden"
        aria-label="Open menu"
        onPress={onOpenSidebar}
      >
        <Menu size={18} />
      </Button>

      <div className="hidden w-full max-w-sm md:block">
        <div className="seg-search">
          <TextField
            type="search"
            size="sm"
            variant="soft"
            radius="full"
            placeholder="Quick Search…"
            startIcon={<Search size={15} />}
            aria-label="Global search"
          />
        </div>
      </div>

      <nav className="ml-6 hidden items-center gap-5 text-[13.5px] font-medium lg:flex" style={{ color: 'var(--app-fg-muted)' }}>
        <span className="cursor-pointer hover:text-[var(--app-fg-strong)]">Mega Menu</span>
        <span className="cursor-pointer hover:text-[var(--app-fg-strong)]">Apps</span>
      </nav>

      <div className="ml-auto flex items-center gap-0.5">
        <Tooltip content={dark ? 'Light mode' : 'Dark mode'}>
          <Button isIconOnly variant="ghost" color="default" size="sm" aria-label="Toggle theme" onPress={toggle}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </Tooltip>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly variant="ghost" color="default" size="sm" aria-label="Apps">
              <Grid3x3 size={18} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Apps" onAction={(k) => navigate(String(k))}>
            {APPS.map((a) => (
              <DropdownItem key={a.to} itemKey={a.to} startContent={<a.icon size={16} />}>
                {a.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly variant="ghost" color="default" size="sm" aria-label="Notifications">
              <Badge content={NOTIES.length} color="danger" size="sm" placement="top-right">
                <Bell size={18} />
              </Badge>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Notifications">
            {NOTIES.map((n) => (
              <DropdownItem
                key={n.id}
                itemKey={n.id}
                description={n.time}
                startContent={
                  <span className="mt-1 h-2 w-2 rounded-full" style={{ background: `var(--app-${n.color})` }} />
                }
              >
                {n.title}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Tooltip content="Fullscreen">
          <Button
            isIconOnly
            variant="ghost"
            color="default"
            size="sm"
            className="hidden sm:inline-flex"
            aria-label="Toggle fullscreen"
            onPress={goFullscreen}
          >
            <Maximize size={17} />
          </Button>
        </Tooltip>

        <Button isIconOnly variant="ghost" color="default" size="sm" aria-label="Theme customizer" className="hidden md:inline-flex">
          <Palette size={17} />
        </Button>
        <Button
          isIconOnly
          variant="ghost"
          color="default"
          size="sm"
          aria-label="Settings"
          className="hidden md:inline-flex"
          onPress={() => navigate('/apps/users/account-settings')}
        >
          <Settings size={17} />
        </Button>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button variant="ghost" color="default" size="sm" aria-label="Language" className="hidden gap-1 sm:inline-flex">
              <Globe size={16} /> <span className="text-[12px] font-semibold">EN</span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Language">
            <DropdownItem itemKey="en">English</DropdownItem>
            <DropdownItem itemKey="es">Español</DropdownItem>
            <DropdownItem itemKey="de">Deutsch</DropdownItem>
            <DropdownItem itemKey="fr">Français</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <button className="ml-1 flex items-center gap-2 rounded-full pr-1 pl-0.5 transition-colors hover:bg-[var(--app-surface-2)]">
              <Avatar src={avatarUrl(7)} name="David Dev" size="sm" showFallback />
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-[13px] font-semibold" style={{ color: 'var(--app-fg-strong)' }}>
                  David Dev
                </span>
                <span className="block text-[11px]" style={{ color: 'var(--app-fg-muted)' }}>
                  Admin Head
                </span>
              </span>
            </button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Account" onAction={(k) => k !== 'logout' && navigate(String(k))}>
            <DropdownItem itemKey="/apps/users/profile" startContent={<User size={16} />}>
              Profile
            </DropdownItem>
            <DropdownItem itemKey="/apps/users/account-settings" startContent={<Settings size={16} />}>
              Account Settings
            </DropdownItem>
            <DropdownItem itemKey="logout" startContent={<LogOut size={16} />} showDivider>
              Sign out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  )
}
