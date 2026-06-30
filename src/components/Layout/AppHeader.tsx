import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../store/appStore'
import { CamductToggle } from '../Calculator/CamductToggle'
import { canViewCamductMode } from '../../roles/permissions'

export function AppHeader() {
  const { t, i18n } = useTranslation()
  const role = useAppStore((state) => state.role)
  const setRole = useAppStore((state) => state.setRole)

  return (
    <header className="border-b border-slate-300 bg-[#ececec]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-3 sm:px-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-4">
          <img src={`${import.meta.env.BASE_URL}assets/logos/stspecmontazh-logo-dark.png`} alt="ST Spetsmontazh" className="h-11 w-auto object-contain" />
          <div>
            <div className="text-lg font-semibold tracking-tight text-slate-900">{t('app.title')}</div>
            <div className="text-sm text-slate-600">{t('app.subtitle')}</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 xl:justify-end">
          <select
            aria-label="role"
            value={role}
            onChange={(event) => setRole(event.target.value as typeof role)}
            className="h-9 rounded-md border border-slate-400 bg-white px-3 text-sm text-slate-700"
          >
            <option value="guest">{t('role.guest')}</option>
            <option value="user">{t('role.user')}</option>
            <option value="client">{t('role.client')}</option>
            <option value="service">{t('role.service')}</option>
            <option value="admin">{t('role.admin')}</option>
          </select>

          <div className="flex items-center gap-1 rounded-md border border-slate-400 bg-white p-1">
            {['ru', 'uk', 'en'].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => void i18n.changeLanguage(lang)}
                className={[
                  'rounded px-2.5 py-1 text-xs font-semibold uppercase',
                  i18n.language === lang ? 'bg-[#d97706] text-white' : 'text-slate-700 hover:bg-slate-100',
                ].join(' ')}
              >
                {lang}
              </button>
            ))}
          </div>

          {canViewCamductMode(role) ? <CamductToggle /> : null}
        </div>
      </div>
    </header>
  )
}
