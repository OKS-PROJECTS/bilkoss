/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Route } from 'react-router-dom'

const p = {
  '/dashboards/ecommerce': lazy(() => import('./Dashboards/EcommerceDashboard')),
}

export const bespokeRoutePaths = Object.keys(p)
export const bespokeRoutes = bespokeRoutePaths.map((path) => {
  const El = p[path]
  return <Route key={path} path={path} element={<El />} />
})
