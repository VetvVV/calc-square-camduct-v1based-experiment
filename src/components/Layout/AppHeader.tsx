import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../store/appStore'
import { CamductToggle } from '../Calculator/CamductToggle'
import { canViewCamductMode } from '../../roles/permissions'

const languageOptions = [
  { key: 'ru', short: 'RU', label: 'Русский' },
  { key: 'uk', short: 'UK', label: 'Українська' },
  { key: 'en', short: 'EN', label: 'English' },
] as const

export function AppHeader() {
  const { t, i18n } = useTranslation()
  const role = useAppStore((state) => state.role)
  const setRole = useAppStore((state) => state.setRole)
  const [languageOpen, setLanguageOpen] = useState(false)

  const currentLanguage = i18n.language.startsWith('uk')
    ? languageOptions[1]
    : i18n.language.startsWith('en')
      ? languageOptions[2]
      : languageOptions[0]

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

          <div className="relative">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={languageOpen}
              onClick={() => setLanguageOpen((value) => !value)}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-slate-400 bg-white px-3 text-sm font-semibold text-slate-700"
            >
              <span>{currentLanguage.short}</span>
              <span className="text-[10px] text-slate-500">▾</span>
            </button>

            {languageOpen ? (
              <div className="absolute right-0 z-20 mt-2 min-w-[180px] overflow-hidden rounded-md border border-slate-300 bg-white shadow-lg">
                {languageOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => {
                      void i18n.changeLanguage(option.key)
                      setLanguageOpen(false)
                    }}
                    className={[
                      'flex w-full items-center justify-between px-3 py-2 text-left text-sm transition hover:bg-slate-50',
                      currentLanguage.key === option.key ? 'bg-[#fff7ed] text-[#b45309]' : 'text-slate-700',
                    ].join(' ')}
                  >
                    <span className="font-semibold">{option.short}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          {canViewCamductMode(role) ? <CamductToggle /> : null}
        </div>
      </div>
    </header>
  )
}
