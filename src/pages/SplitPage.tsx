import { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ModuleCalculator } from '../components/Calculator/ModuleCalculator'
import { SplitLayout } from '../components/Layout/SplitLayout'
import { MaterialSummary } from '../components/Specification/MaterialSummary'
import { ProjectMetaForm } from '../components/Specification/ProjectMetaForm'
import { SpecActions } from '../components/Specification/SpecActions'
import { SpecSummary } from '../components/Specification/SpecSummary'
import { SpecTable } from '../components/Specification/SpecTable'
import { useAppStore } from '../store/appStore'
import { canViewSpecification } from '../roles/permissions'
import { useTranslation } from 'react-i18next'

export function SplitPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const setActiveModule = useAppStore((state) => state.setActiveModule)
  const role = useAppStore((state) => state.role)
  const module = searchParams.get('module')
  const isKnownModule = module === 'round-duct' || module === 'spiral-duct'
  const canSeeSpecification = canViewSpecification(role)

  useEffect(() => {
    if (isKnownModule) {
      setActiveModule(module)
    }
  }, [isKnownModule, module, setActiveModule])

  useEffect(() => {
    if (!canSeeSpecification && isKnownModule) {
      navigate(`/calculator?module=${module}`, { replace: true })
    }
  }, [canSeeSpecification, isKnownModule, module, navigate])

  if (!canSeeSpecification) {
    return (
      <section className="space-y-4 pb-8">
        <div className="rounded-2xl border border-slate-300 bg-white px-5 py-8 shadow-sm sm:px-6">
          <h1 className="text-2xl font-semibold text-slate-900">{t('page.splitTitle')}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{t('page.splitGuestDescription')}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to={isKnownModule ? `/calculator?module=${module}` : '/atlas'}
              className="inline-flex items-center justify-center rounded-md bg-[#d97706] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b86307]"
            >
              {t('page.splitGoToCalculator')}
            </Link>
            <Link
              to="/atlas"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              {t('page.splitGoToAtlas')}
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div className="border-b border-slate-300 pb-3">
        <h1 className="text-2xl font-semibold text-slate-900">{t('page.splitTitle')}</h1>
        <p className="mt-2 text-sm text-slate-600">{t('page.splitDescription')}</p>
      </div>

      <SplitLayout
        left={
          <>
            <ProjectMetaForm />
            <SpecTable />
            <SpecSummary />
            <MaterialSummary />
            <SpecActions />
          </>
        }
        right={<ModuleCalculator />}
      />
    </section>
  )
}
