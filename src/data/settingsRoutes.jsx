/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { SETTINGS_CONFIGS } from './settings.jsx'

const SettingsPage = lazy(() => import('../Pages/InnerPages/SettingsPage'))

export const settingsRoutePaths = Object.keys(SETTINGS_CONFIGS)
export const settingsRoutes = settingsRoutePaths.map((p) => (
  <Route key={p} path={p} element={<SettingsPage config={SETTINGS_CONFIGS[p]} />} />
))
