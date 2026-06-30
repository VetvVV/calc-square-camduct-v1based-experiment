import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MaterialSummary } from '../components/Specification/MaterialSummary'
import { ProjectMetaForm } from '../components/Specification/ProjectMetaForm'
import { SpecActions } from '../components/Specification/SpecActions'
import { SpecSummary } from '../components/Specification/SpecSummary'
import { SpecTable } from '../components/Specification/SpecTable'
import { useAppStore } from '../store/appStore'
import { canViewSpecification } from '../roles/permissions'

export function SpecificationPage() {
  const { t } = useTranslation()
  const role = useAppStore((state) => state.role)

  if (!canViewSpecification(role)) {
    return (
      <section className="space-y-4 pb-8">
        <div className="rounded-2xl border border-slate-300 bg-white px-5 py-8 shadow-sm sm:px-6">
          <h1 className="text-2xl font-semibold text-slate-900">{t('page.specificationTitle')}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">{t('page.specificationGuestDescription')}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/atlas"
              className="inline-flex items-center justify-center rounded-md bg-[#d97706] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b86307]"
            >
              {t('page.specificationGoToAtlas')}
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-4 pb-8">
      <div className="rounded-2xl border border-slate-300 bg-[#f4f4f4] px-5 py-5 shadow-sm sm:px-6">
        <h1 className="text-2xl font-semibold text-slate-900">{t('page.specificationTitle')}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{t('page.specificationDescription')}</p>
      </div>

      <ProjectMetaForm />
      <SpecTable />
      <SpecSummary />
      <MaterialSummary />
      <SpecActions />
    </section>
  )
}
