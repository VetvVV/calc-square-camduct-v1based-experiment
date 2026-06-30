import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ModuleCalculator } from '../components/Calculator/ModuleCalculator'
import { useAppStore } from '../store/appStore'
import { canViewSpecification } from '../roles/permissions'

export function CalculatorPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const setActiveModule = useAppStore((state) => state.setActiveModule)
  const role = useAppStore((state) => state.role)

  useEffect(() => {
    const module = searchParams.get('module')
    if (module === 'round-duct' || module === 'spiral-duct') {
      setActiveModule(module)
    }
  }, [searchParams, setActiveModule])

  const module = searchParams.get('module')
  const isKnownModule = module === 'round-duct' || module === 'spiral-duct'
  const canOpenWorkspace = canViewSpecification(role)

  return (
    <section className="space-y-4 pb-8">
      <div className="rounded-2xl border border-slate-300 bg-[#f4f4f4] px-5 py-5 shadow-sm sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#d97706]">{t('page.calculatorKicker')}</div>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">{t('page.calculatorTitle')}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{t('page.calculatorDescription')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/atlas"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {t('page.calculatorBackToAtlas')}
            </Link>
            {canOpenWorkspace ? (
              <Link
                to={isKnownModule ? `/split?module=${module}` : '/split'}
                className="inline-flex items-center justify-center rounded-md bg-[#d97706] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b86307]"
              >
                {t('page.calculatorOpenWorkspace')}
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      {isKnownModule ? (
        <div className="min-w-0 rounded-2xl border border-slate-300 bg-[#f4f4f4] p-3 shadow-sm sm:p-4">
          <ModuleCalculator />
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-300 bg-white px-5 py-8 shadow-sm sm:px-6">
          <h2 className="text-lg font-semibold text-slate-900">{t('page.calculatorModuleRequiredTitle')}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{t('page.calculatorModuleRequiredDescription')}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/atlas"
              className="inline-flex items-center justify-center rounded-md bg-[#d97706] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b86307]"
            >
              {t('page.calculatorGoToAtlas')}
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
