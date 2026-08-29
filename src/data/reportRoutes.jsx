/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { REPORT_CONFIGS } from './reports.jsx'

const ReportPage = lazy(() => import('../Pages/InnerPages/ReportPage'))

export const reportRoutePaths = Object.keys(REPORT_CONFIGS)
export const reportRoutes = reportRoutePaths.map((p) => (
  <Route key={p} path={p} element={<ReportPage config={REPORT_CONFIGS[p]} />} />
))
