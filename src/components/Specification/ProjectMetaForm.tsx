import { useTranslation } from 'react-i18next'
import { useProjectStore } from '../../store/projectStore'

export function ProjectMetaForm() {
  const { t } = useTranslation()
  const project = useProjectStore((state) => state.project)

  return (
    <div className="rounded-xl border border-slate-300 bg-white shadow-sm">
      <div className="border-b border-slate-300 bg-[#f4f4f4] px-5 py-4">
        <h3 className="text-lg font-semibold text-slate-900">{t('project.metadataTitle')}</h3>
      </div>
      <div className="grid gap-3 p-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-[#fafafa] p-4">
          <div className="text-sm text-slate-500">{t('project.project')}</div>
          <div className="mt-1 font-medium text-slate-900">{project.name}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-[#fafafa] p-4">
          <div className="text-sm text-slate-500">{t('project.customer')}</div>
          <div className="mt-1 font-medium text-slate-900">{project.customer || '—'}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-[#fafafa] p-4">
          <div className="text-sm text-slate-500">{t('project.object')}</div>
          <div className="mt-1 font-medium text-slate-900">{project.object || '—'}</div>
        </div>
      </div>
    </div>
  )
}
