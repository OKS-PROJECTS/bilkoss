import { Suspense, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Drawer, Loader } from 'oks-ui'
import Sidebar from './Sidebar'
import Header from './Header'
import Footer from './Footer'
import { useIsDesktop } from '../../lib/useMediaQuery'

export default function InnerTemplate() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const isDesktop = useIsDesktop()
  const { pathname } = useLocation()
  const mainRef = useRef(null)

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <div className="flex h-full" style={{ background: 'var(--app-bg)' }}>
      {/* desktop sidebar */}
      <aside className="hidden w-[245px] shrink-0 lg:block">
        <div className="fixed inset-y-0 left-0 w-[245px]">
          <Sidebar />
        </div>
      </aside>

      {/* mobile sidebar */}
      {!isDesktop && (
        <Drawer
          isOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
          position="left"
          width={260}
          classNames={{ body: '!p-0' }}
        >
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </Drawer>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onOpenSidebar={() => setMobileOpen(true)} />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6">
            <Suspense
              fallback={
                <div className="flex h-64 items-center justify-center">
                  <Loader variant="ring-dual" size={36} color="primary" label="Loading" />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
