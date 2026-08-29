/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { FORM_CONFIGS } from './forms.jsx'

const FormPage = lazy(() => import('../Pages/InnerPages/FormPage'))

export const formRoutePaths = Object.keys(FORM_CONFIGS)
export const formRoutes = formRoutePaths.map((p) => (
  <Route key={p} path={p} element={<FormPage config={FORM_CONFIGS[p]} />} />
))
