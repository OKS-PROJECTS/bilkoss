/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const p = {
  '/dashboards/ecommerce': lazy(() => import('./Dashboards/EcommerceDashboard')),
  '/dashboards/analytics': lazy(() => import('./Dashboards/AnalyticsDashboard')),
  '/dashboards/crm': lazy(() => import('./Dashboards/CrmDashboard')),
  '/dashboards/finance': lazy(() => import('./Dashboards/FinanceDashboard')),
  '/dashboards/projects': lazy(() => import('./Dashboards/ProjectsDashboard')),
}

export const bespokeRoutePaths = Object.keys(p)
export const bespokeRoutes = bespokeRoutePaths.map((path) => {
  const El = p[path]
  return <Route key={path} path={path} element={<El />} />
})
