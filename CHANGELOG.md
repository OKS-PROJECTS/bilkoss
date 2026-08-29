# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> Requires oks-ui ^1.0.3

## [Unreleased]

## [0.1.0] — 2026-08-29

### Added

- Vite + React 19 scaffold, Tailwind v4 (layout only), react-router-dom v7, oxlint.
- Design-token layer (`src/styles/theme.css`) — brand ramp, semantic roles, the
  `--app-*` semantic layer, full light + dark themes, and the global oks-ui patches.
- App shell — recursive collapsible sidebar, header control cluster, inner layout
  frame with a mobile drawer and scroll-to-top on navigation.
- `src/Components/ui/` composition layer, built entirely from oks-ui primitives:
  Surface / CardHeader / Panel, DataTable, Pagination, TableToolbar, SearchInput,
  Stat / StatGroup / KpiCard, StatusChip / TrendChip, EntityCell, ChartCard,
  DonutCard, SegmentedControl, Accordion, Timeline / ActivityFeed, MeterList,
  BoardView, EmptyState, Skeleton, PageHeader / Breadcrumbs.
- Config-driven archetypes: ListPage, FormPage, DetailPage, SettingsPage,
  BoardPage, ReportPage — one config object per screen.
- Five dashboards (eCommerce, Analytics, CRM, Finance, Projects).
- Deep app pages: Chat, Email (3-pane), Calendar, Contacts, File Manager,
  Projects (grid / list / kanban / team board / activity), Tasks, Blog, Forum,
  Social feed, AI assistant, Todo, Pin board, Permissions matrix.
- Component gallery + kitchen sink covering the full oks-ui surface.
- Content pages: Pricing, FAQ, Timeline, Gallery, About, Contact, Privacy,
  Terms, Sitemap, Search results, Profile, Empty page.
- Split-screen authentication (Sign in / up, Reset / New password, 2FA, Lock,
  Success, PIN) and standalone error pages (400 / 401 / 403 / 404 / 408 / 500 /
  Maintenance).
- Every `NAV_ROUTES` entry resolves to a real, working page.
