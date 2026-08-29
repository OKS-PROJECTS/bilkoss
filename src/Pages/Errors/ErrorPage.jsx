import { Link } from 'react-router-dom'
import { Button } from 'oks-ui'
import { OksMark } from '../../Components/Commom/Logo'

const PRESETS = {
  400: { title: 'Bad Request', text: 'The server could not understand the request.' },
  401: { title: 'Unauthorized', text: 'You need to sign in to view this page.' },
  403: { title: 'Forbidden', text: 'You do not have permission to access this resource.' },
  404: { title: 'Page Not Found', text: "The page you are looking for was moved, removed or never existed." },
  408: { title: 'Request Timeout', text: 'The server timed out waiting for the request.' },
  500: { title: 'Internal Server Error', text: 'Something went wrong on our end. Please try again shortly.' },
}

export default function ErrorPage({ code = 404 }) {
  const p = PRESETS[code] || PRESETS[404]
  return (
    <div
      className="flex min-h-full flex-col items-center justify-center px-6 py-16 text-center"
      style={{ background: 'var(--app-bg)' }}
    >
      <OksMark size={30} />
      <p className="mt-10 text-[88px] leading-none font-extrabold" style={{ color: 'var(--app-primary)' }}>
        {code}
      </p>
      <h1 className="mt-3 text-[22px] font-bold" style={{ color: 'var(--app-fg-strong)' }}>
        {p.title}
      </h1>
      <p className="mt-2 max-w-md text-[14px]" style={{ color: 'var(--app-fg-muted)' }}>
        {p.text}
      </p>
      <Button as={Link} to="/" color="primary" className="mt-6">
        Back to home
      </Button>
    </div>
  )
}
