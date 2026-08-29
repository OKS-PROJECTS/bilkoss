/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { BOARD_CONFIGS } from './boards.jsx'

const BoardPage = lazy(() => import('../Pages/InnerPages/BoardPage'))

export const boardRoutePaths = Object.keys(BOARD_CONFIGS)
export const boardRoutes = boardRoutePaths.map((p) => (
  <Route key={p} path={p} element={<BoardPage config={BOARD_CONFIGS[p]} />} />
))
