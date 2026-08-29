import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import 'oks-ui/styles.css'
import './styles/theme.css'
import { ToastProvider } from 'oks-ui'
import App from './App.jsx'

// theme boot — before first paint
const stored = localStorage.getItem('bilkoss-theme')
if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.setAttribute('data-theme', 'dark')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ToastProvider position="top-right">
        <App />
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
