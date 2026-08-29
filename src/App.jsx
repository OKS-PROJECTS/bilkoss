import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import InnerTemplate from './Components/Commom/InnerTemplate'
import { NAV_ROUTES } from './data/nav'
import { listRoutes, listRoutePaths } from './data/listRoutes'
import { formRoutes, formRoutePaths } from './data/formRoutes'
import { detailRoutes, detailRoutePaths } from './data/detailRoutes'
import { settingsRoutes, settingsRoutePaths } from './data/settingsRoutes'
import { boardRoutes, boardRoutePaths } from './data/boardRoutes'
import { reportRoutes, reportRoutePaths } from './data/reportRoutes'
import { bespokeRoutes, bespokeRoutePaths, SectionPage } from './Pages/bespokeRoutes'

const NotFound = lazy(() => import('./Pages/InnerPages/ComingSoon'))
const ErrorPage = lazy(() => import('./Pages/Errors/ErrorPage'))
const Maintenance = lazy(() => import('./Pages/Errors/Maintenance'))
const AuthPages = {
  SignIn: lazy(() => import('./Pages/Auth/AuthPages').then((m) => ({ default: m.SignIn }))),
  SignUp: lazy(() => import('./Pages/Auth/AuthPages').then((m) => ({ default: m.SignUp }))),
  ResetPassword: lazy(() => import('./Pages/Auth/AuthPages').then((m) => ({ default: m.ResetPassword }))),
  NewPassword: lazy(() => import('./Pages/Auth/AuthPages').then((m) => ({ default: m.NewPassword }))),
  TwoFactor: lazy(() => import('./Pages/Auth/AuthPages').then((m) => ({ default: m.TwoFactor }))),
  LockScreen: lazy(() => import('./Pages/Auth/AuthPages').then((m) => ({ default: m.LockScreen }))),
  SuccessMail: lazy(() => import('./Pages/Auth/AuthPages').then((m) => ({ default: m.SuccessMail }))),
  LoginPin: lazy(() => import('./Pages/Auth/AuthPages').then((m) => ({ default: m.LoginPin }))),
}

const CONFIGURED = new Set([
  ...listRoutePaths,
  ...formRoutePaths,
  ...detailRoutePaths,
  ...settingsRoutePaths,
  ...boardRoutePaths,
  ...reportRoutePaths,
  ...bespokeRoutePaths,
])

const AUTH = new Set([
  '/auth/sign-in', '/auth/sign-up', '/auth/reset-password', '/auth/new-password',
  '/auth/two-factor', '/auth/lock-screen', '/auth/success', '/auth/pin',
])
const ERRORS = new Set(['/errors/400', '/errors/401', '/errors/403', '/errors/404', '/errors/408', '/errors/500', '/errors/maintenance'])

const shellRoutes = NAV_ROUTES.filter(
  (p) => !CONFIGURED.has(p) && !AUTH.has(p) && !ERRORS.has(p),
)

export default function App() {
  return (
    <Routes>
      {/* shell-less */}
      <Route path="/auth/sign-in" element={<AuthPages.SignIn />} />
      <Route path="/auth/sign-up" element={<AuthPages.SignUp />} />
      <Route path="/auth/reset-password" element={<AuthPages.ResetPassword />} />
      <Route path="/auth/new-password" element={<AuthPages.NewPassword />} />
      <Route path="/auth/two-factor" element={<AuthPages.TwoFactor />} />
      <Route path="/auth/lock-screen" element={<AuthPages.LockScreen />} />
      <Route path="/auth/success" element={<AuthPages.SuccessMail />} />
      <Route path="/auth/pin" element={<AuthPages.LoginPin />} />
      <Route path="/errors/400" element={<ErrorPage code={400} />} />
      <Route path="/errors/401" element={<ErrorPage code={401} />} />
      <Route path="/errors/403" element={<ErrorPage code={403} />} />
      <Route path="/errors/404" element={<ErrorPage code={404} />} />
      <Route path="/errors/408" element={<ErrorPage code={408} />} />
      <Route path="/errors/500" element={<ErrorPage code={500} />} />
      <Route path="/errors/maintenance" element={<Maintenance />} />

      {/* the shell */}
      <Route element={<InnerTemplate />}>
        <Route path="/" element={<Navigate to="/dashboards/ecommerce" replace />} />
        <Route path="/dashboard" element={<Navigate to="/dashboards/ecommerce" replace />} />
        <Route path="/dashboards" element={<Navigate to="/dashboards/ecommerce" replace />} />

        {bespokeRoutes}
        {listRoutes}
        {formRoutes}
        {detailRoutes}
        {settingsRoutes}
        {boardRoutes}
        {reportRoutes}

        {shellRoutes.map((p) => (
          <Route key={p} path={p} element={<SectionPage />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
