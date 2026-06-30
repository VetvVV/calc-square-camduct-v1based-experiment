import { Outlet } from 'react-router-dom'
import { AppPersistence } from '../components/AppPersistence'
import { AppHeader } from '../components/Layout/AppHeader'
import { NavBar } from '../components/Layout/NavBar'
import { BuildBadge } from '../components/Layout/BuildBadge'

export function App() {
  return (
    <div className="min-h-screen bg-[#ececec] text-slate-900">
      <AppPersistence />
      <AppHeader />
      <NavBar />
      <main className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6">
        <Outlet />
      </main>
      <BuildBadge />
    </div>
  )
}
