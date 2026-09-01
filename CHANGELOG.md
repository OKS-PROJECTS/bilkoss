# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> Requires oks-ui ^1.1.1

## [Unreleased]

## [1.1.0] — 2026-09-01

### Changed

- Adopted the data-display, navigation and layout components that shipped in
  oks-ui 1.1. The `src/Components/ui/` layer now delegates to the real
  primitives — `Surface`→`Card`, `DataTable`→`Table`, `Pagination`→`Pagination`,
  `StatGroup`→`StatGroup`, `Accordion`→`Accordion`, `Timeline`→`Timeline`,
  `BoardView`→`Board`, `SegmentedControl`→`SegmentedControl`,
  `MeterList`/`Meter`→`Progress`, `Skeleton`→`Skeleton`, `EmptyState`→`EmptyState`,
  `Breadcrumbs`→`Breadcrumbs` — keeping every wrapper's props, so no page changed.
- `DonutCard` moved back onto `<Chart type="donut">` (with `pie.renderCenter` for
  the centre label) now that the chart stage-width bug is fixed upstream.
- `ChartCard` hides the Y axis with the documented `{ hide: true }`.

### Added

- Component Gallery: live examples of `Card` / `Stat` / `Progress` /
  `CircularProgress` / `Skeleton` / `EmptyState`, `Breadcrumbs` /
  `SegmentedControl` / `Accordion` / `Timeline` / `Nav` / `CommandPalette` (⌘K),
  and `Calendar` / `SplitLayout` / `Message` / a donut `Chart`.

### Fixed

- Dark mode: brand palette ramps for the `secondary` / `success` / `warning` /
  `danger` / `info` roles now hold in dark (oks-ui re-declares its palette under
  `:root[data-theme="dark"]` at a specificity that beat the plain-`:root`
  overrides — the overrides now match that specificity). Progress bars, chips and
  chart series render in brand colours in both themes.

### Removed

- The `Tabs variant="solid"` dark-track CSS patch (real `SegmentedControl` now).
- The `.donut-no-center` CSS patch (real `pie.renderCenter` slot now).

## [1.0.0] — 2026-08-29

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
