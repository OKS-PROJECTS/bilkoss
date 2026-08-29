/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const D = (name) => (m) => ({ default: m[name] })
const deep = () => import('./Apps/DeepApps')
const content = () => import('./Content/ContentPages')
const demo = () => import('./DemoPages')

const p = {
  '/dashboards/ecommerce': lazy(() => import('./Dashboards/EcommerceDashboard')),
  '/dashboards/analytics': lazy(() => import('./Dashboards/AnalyticsDashboard')),
  '/dashboards/crm': lazy(() => import('./Dashboards/CrmDashboard')),
  '/dashboards/finance': lazy(() => import('./Dashboards/FinanceDashboard')),
  '/dashboards/projects': lazy(() => import('./Dashboards/ProjectsDashboard')),

  '/components': lazy(() => import('./Components/ComponentGallery')),
  '/components/kitchen-sink': lazy(() => import('./Components/KitchenSink')),

  '/apps/chat': lazy(() => import('./Apps/Chat')),
  '/apps/email/inbox': lazy(() => deep().then(D('EmailInbox'))),
  '/apps/email/details': lazy(() => deep().then(D('EmailDetails'))),
  '/apps/email/compose': lazy(() => deep().then(D('EmailCompose'))),
  '/apps/more/calendar': lazy(() => deep().then(D('CalendarPage'))),
  '/apps/users/contacts': lazy(() => deep().then(D('ContactsGrid'))),
  '/apps/more/file-manager': lazy(() => deep().then(D('FileManager'))),

  '/apps/users/profile': lazy(() => content().then(D('UserProfile'))),
  '/pages/pricing': lazy(() => content().then(D('Pricing'))),
  '/pages/faq': lazy(() => content().then(D('FAQ'))),
  '/pages/timeline': lazy(() => content().then(D('TimelinePage'))),
  '/pages/gallery': lazy(() => content().then(D('GalleryPage'))),
  '/pages/about': lazy(() => content().then(D('AboutUs'))),
  '/pages/contact': lazy(() => content().then(D('ContactUs'))),
  '/pages/privacy-policy': lazy(() => content().then(D('PrivacyPolicy'))),
  '/pages/terms': lazy(() => content().then(D('TermsConditions'))),
  '/pages/sitemap': lazy(() => content().then(D('Sitemap'))),
  '/pages/search-results': lazy(() => content().then(D('SearchResults'))),
  '/pages/empty': lazy(() => content().then(D('EmptyPage'))),

  '/widgets/statistics': lazy(() => demo().then(D('WidgetsStatistics'))),
  '/widgets/charts': lazy(() => demo().then(D('WidgetsCharts'))),
  '/widgets/social': lazy(() => demo().then(D('WidgetsSocial'))),
  '/charts/line-area': lazy(() => demo().then(D('ChartsLineArea'))),
  '/charts/comparisons': lazy(() => demo().then(D('ChartsComparisons'))),
  '/charts/distributions': lazy(() => demo().then(D('ChartsDistributions'))),
  '/charts/progress': lazy(() => demo().then(D('ChartsProgress'))),
  '/icons/lucide': lazy(() => demo().then(D('IconsLucide'))),
  '/tables/static': lazy(() => demo().then(D('StaticTables'))),
  '/tables/data-table': lazy(() => demo().then(D('DataTableDemo'))),

  '/apps/projects/grid': lazy(() => demo().then(D('ProjectsGrid'))),
  '/apps/projects/list': lazy(() => demo().then(D('ProjectsList'))),
  '/apps/projects/activity': lazy(() => demo().then(D('ProjectsActivity'))),
  '/apps/more/blog/list': lazy(() => demo().then(D('BlogList'))),
  '/apps/more/blog/grid': lazy(() => demo().then(D('BlogGrid'))),
  '/apps/more/blog/article': lazy(() => demo().then(D('BlogArticle'))),
  '/apps/more/forum/view': lazy(() => demo().then(D('ForumView'))),
  '/apps/more/forum/post': lazy(() => demo().then(D('ForumPost'))),
  '/apps/more/social-feed': lazy(() => demo().then(D('SocialFeed'))),
  '/apps/more/ai': lazy(() => demo().then(D('AiAssistant'))),
  '/apps/more/todo': lazy(() => demo().then(D('TodoApp'))),
  '/apps/more/pin-board': lazy(() => demo().then(D('PinBoard'))),
  '/apps/users/permissions': lazy(() => demo().then(D('PermissionsMatrix'))),
}

export const bespokeRoutePaths = Object.keys(p)
export const bespokeRoutes = bespokeRoutePaths.map((path) => {
  const El = p[path]
  return <Route key={path} path={path} element={<El />} />
})

export const SectionPage = lazy(() => demo().then(D('SectionPage')))
