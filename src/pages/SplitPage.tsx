import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ModuleCalculator } from '../components/Calculator/ModuleCalculator'
import { SplitLayout } from '../components/Layout/SplitLayout'
import { MaterialSummary } from '../components/Specification/MaterialSummary'
import { ProjectMetaForm } from '../components/Specification/ProjectMetaForm'
import { SpecActions } from '../components/Specification/SpecActions'
import { SpecSummary } from '../components/Specification/SpecSummary'
import { SpecTable } from '../components/Specification/SpecTable'
import { useAppStore } from '../store/appStore'
import { canViewSpecification } from '../roles/permissions'
import { Alert } from '../components/Common/Alert'
import { useTranslation } from 'react-i18next'

export function SplitPage() {
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

  return (
    <section className="space-y-4">
      <div className="border-b border-slate-300 pb-3">
        <h1 className="text-2xl font-semibold text-slate-900">{t('page.splitTitle')}</h1>
        <p className="mt-2 text-sm text-slate-600">{t('page.splitDescription')}</p>
      </div>

      <SplitLayout
        left={
          canViewSpecification(role) ? (
            <>
              <ProjectMetaForm />
              <SpecTable />
              <SpecSummary />
              <MaterialSummary />
              <SpecActions />
            </>
          ) : (
            <Alert tone="warning" title={t('locked.guest.specificationTitle')}>
              {t('locked.guest.specificationDescription')}
            </Alert>
          )
        }
        right={<ModuleCalculator />}
      />
    </section>
  )
}
