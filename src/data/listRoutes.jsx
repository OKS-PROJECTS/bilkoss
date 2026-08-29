/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { LIST_CONFIGS } from './lists.jsx'

const ListPage = lazy(() => import('../Pages/InnerPages/ListPage'))

export const listRoutePaths = Object.keys(LIST_CONFIGS)
export const listRoutes = listRoutePaths.map((p) => (
  <Route key={p} path={p} element={<ListPage config={LIST_CONFIGS[p]} />} />
))
