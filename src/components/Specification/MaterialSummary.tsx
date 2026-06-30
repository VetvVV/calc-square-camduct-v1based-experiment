import { useMemo } from 'react'
import { useProjectStore } from '../../store/projectStore'
import { calculateMaterialSummary } from '../../domain/specification/materials'
import { formatArea, formatMass } from '../../utils/format'
import { useTranslation } from 'react-i18next'

export function MaterialSummary() {
  const items = useProjectStore((state) => state.project.items)
  const { t } = useTranslation()

  const summary = useMemo(() => calculateMaterialSummary(items), [items])

  return (
    <div className="rounded-xl border border-slate-300 bg-white shadow-sm">
      <div className="border-b border-slate-300 bg-[#f4f4f4] px-5 py-4">
        <h3 className="text-lg font-semibold text-slate-900">{t('materials.title')}</h3>
      </div>

      {summary.length === 0 ? (
        <p className="p-4 text-sm text-slate-600">{t('materials.noData')}</p>
      ) : (
        <div className="overflow-x-auto p-4">
          <table className="min-w-full text-sm">
            <thead className="text-left text-slate-500">
              <tr>
                <th className="px-3 py-2">{t('spec.material')}</th>
                <th className="px-3 py-2">{t('spec.thickness')}</th>
                <th className="px-3 py-2">{t('summary.items')}</th>
                <th className="px-3 py-2">{t('spec.area')}</th>
                <th className="px-3 py-2">{t('spec.mass')}</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((row) => (
                <tr key={`${row.material}-${row.thickness}`} className="border-t border-slate-100">
                  <td className="px-3 py-2">{t(`material.${row.material}`)}</td>
                  <td className="px-3 py-2">{row.thickness}</td>
                  <td className="px-3 py-2">{row.itemCount}</td>
                  <td className="px-3 py-2">{formatArea(row.areaTotal, t('unit.m2'))}</td>
                  <td className="px-3 py-2">{formatMass(row.massTotal, t('unit.kg'))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
