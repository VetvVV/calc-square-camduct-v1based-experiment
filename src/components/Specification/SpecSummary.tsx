import { useProjectStore } from '../../store/projectStore'
import { formatArea, formatMass } from '../../utils/format'
import { useTranslation } from 'react-i18next'

export function SpecSummary() {
  const totals = useProjectStore((state) => state.project.metadata?.totals)
  const { t } = useTranslation()

  return (
    <div className="rounded-xl border border-slate-300 bg-white shadow-sm">
      <div className="border-b border-slate-300 bg-[#f4f4f4] px-5 py-4">
        <h3 className="text-lg font-semibold text-slate-900">{t('summary.title')}</h3>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-[#fafafa] p-4">
          <div className="text-sm text-slate-500">{t('summary.items')}</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">{totals?.itemCount ?? 0}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-[#fafafa] p-4">
          <div className="text-sm text-slate-500">{t('summary.areaTotal')}</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">{formatArea(totals?.areaTotal ?? 0, t('unit.m2'))}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-[#fafafa] p-4">
          <div className="text-sm text-slate-500">{t('summary.massTotal')}</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">{formatMass(totals?.massTotal ?? 0, t('unit.kg'))}</div>
        </div>
      </div>
    </div>
  )
}
