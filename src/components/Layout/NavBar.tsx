import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../store/appStore'
import { canViewSpecification } from '../../roles/permissions'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-2 text-sm font-semibold transition-colors',
    isActive ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-700 hover:bg-white/70',
  ].join(' ')

export function NavBar() {
  const { t } = useTranslation()
  const role = useAppStore((state) => state.role)
  const canSeeProjectModes = canViewSpecification(role)

  return (
    <div className="border-b border-slate-300 bg-[#e4e4e4]">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 px-4 py-2 sm:px-6">
        <nav className="flex flex-wrap gap-2">
          <NavLink to="/" className={linkClass} end>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/atlas" className={linkClass}>
            {t('nav.atlas')}
          </NavLink>
          {canSeeProjectModes ? (
            <NavLink to="/split" className={linkClass}>
              {t('nav.split')}
            </NavLink>
          ) : null}
          {canSeeProjectModes ? (
            <NavLink to="/specification" className={linkClass}>
              {t('nav.specification')}
            </NavLink>
          ) : null}
        </nav>
      </div>
    </div>
  )
}
