/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { DETAIL_CONFIGS } from './details.jsx'

const DetailPage = lazy(() => import('../Pages/InnerPages/DetailPage'))

export const detailRoutePaths = Object.keys(DETAIL_CONFIGS)
export const detailRoutes = detailRoutePaths.map((p) => (
  <Route key={p} path={p} element={<DetailPage config={DETAIL_CONFIGS[p]} />} />
))
