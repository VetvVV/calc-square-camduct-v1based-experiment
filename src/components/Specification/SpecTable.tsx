import { useNavigate } from 'react-router-dom'
import { useProjectStore } from '../../store/projectStore'
import { removeItem } from '../../domain/specification/specificationManager'
import { SpecRow } from './SpecRow'
import type { SpecificationItem } from '../../types'
import { useAppStore } from '../../store/appStore'
import { useTranslation } from 'react-i18next'
import { canEditSpecItem, canRemoveSpecItem } from '../../roles/permissions'

export function SpecTable() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const role = useAppStore((state) => state.role)
  const setActiveModule = useAppStore((state) => state.setActiveModule)
  const project = useProjectStore((state) => state.project)
  const setProject = useProjectStore((state) => state.setProject)
  const setEditingItemId = useProjectStore((state) => state.setEditingItemId)
  const setEditingDraft = useProjectStore((state) => state.setEditingDraft)

  const handleRemove = (itemId: string) => {
    if (!canRemoveSpecItem(role)) return
    setProject(removeItem(project, itemId))
  }

  const handleEdit = (item: SpecificationItem) => {
    if (!canEditSpecItem(role)) return
    setActiveModule(item.moduleKey)
    setEditingItemId(item.id)
    setEditingDraft({
      moduleKey: item.moduleKey,
      parameters: item.parameters,
      options: item.options,
      comment: item.comment,
      quantity: item.quantity,
      moduleMetadata: item.moduleMetadata,
    })
    navigate(`/split?module=${item.moduleKey}`)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm">
      <div className="border-b border-slate-300 bg-[#f4f4f4] px-5 py-4">
        <h3 className="text-lg font-semibold text-slate-900">{t('project.specificationTitle')}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-[#efefef] text-left text-slate-600">
            <tr>
              <th className="border-b border-slate-300 px-4 py-3">№</th>
              <th className="border-b border-slate-300 px-4 py-3">{t('spec.item')}</th>
              <th className="border-b border-slate-300 px-4 py-3">{t('spec.sizes')}</th>
              <th className="border-b border-slate-300 px-4 py-3">{t('spec.description')}</th>
              <th className="border-b border-slate-300 px-4 py-3">{t('spec.qty')}</th>
              <th className="border-b border-slate-300 px-4 py-3">{t('spec.material')}</th>
              <th className="border-b border-slate-300 px-4 py-3">{t('spec.thickness')}</th>
              <th className="border-b border-slate-300 px-4 py-3">{t('spec.area')}</th>
              <th className="border-b border-slate-300 px-4 py-3">{t('spec.mass')}</th>
              <th className="border-b border-slate-300 px-4 py-3">{t('spec.comment')}</th>
              <th className="border-b border-slate-300 px-4 py-3">{t('spec.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {project.items.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-4 py-8 text-center text-slate-500">{t('project.noItems')}</td>
              </tr>
            ) : (
              project.items.map((item, index) => (
                <SpecRow key={item.id} index={index} item={item} onRemove={handleRemove} onEdit={handleEdit} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
