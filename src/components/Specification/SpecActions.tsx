import { useMemo, useRef, useState } from 'react'
import { deserializeProject, serializeProject } from '../../data/serialization'
import { clearProjectFromStorage, loadProjectFromStorage, saveProjectToStorage } from '../../data/storage'
import { migrateImportedProject } from '../../data/migrations'
import { validateImportedProject } from '../../data/importValidation'
import { validateProjectForExport } from '../../data/exportValidation'
import { withRecalculatedTotals } from '../../domain/specification/specificationManager'
import type { SpecificationProject } from '../../types'
import { useProjectStore } from '../../store/projectStore'
import { downloadTextFile } from '../../utils/download'
import { Alert } from '../Common/Alert'
import { StatusBanner } from '../Common/StatusBanner'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../store/appStore'
import { canExportProject, canImportProject, canUseProjectFiles } from '../../roles/permissions'

interface ActionState {
  tone: 'info' | 'warning' | 'error' | 'success'
  title: string
  description: string
  issues?: string[]
}

export function SpecActions() {
  const { t } = useTranslation()
  const role = useAppStore((state) => state.role)
  const project = useProjectStore((state) => state.project)
  const setProject = useProjectStore((state) => state.setProject)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [actionState, setActionState] = useState<ActionState | null>(null)

  const canUseFiles = canUseProjectFiles(role)
  const canExport = canExportProject(role)
  const canImport = canImportProject(role)

  const projectStats = useMemo(
    () => ({
      items: project.items.length,
      area: project.metadata?.totals?.areaTotal ?? 0,
      mass: project.metadata?.totals?.massTotal ?? 0,
    }),
    [project],
  )

  const handleLocked = (feature: 'files' | 'export' | 'import') => {
    setActionState({
      tone: 'warning',
      title: t(`locked.${role}.${feature}Title`),
      description: t(`locked.${role}.${feature}Description`),
    })
  }

  const handleSaveLocal = () => {
    if (!canUseFiles) return handleLocked('files')
    saveProjectToStorage(project)
    setActionState({ tone: 'success', title: t('action.saveLocalSuccessTitle'), description: t('action.saveLocalSuccessDescription', { name: project.name || t('project.untitled') }) })
  }

  const handleOpenLocal = () => {
    if (!canUseFiles) return handleLocked('files')
    const loaded = loadProjectFromStorage()
    setProject(loaded)
    setActionState({ tone: 'success', title: t('action.openLocalSuccessTitle'), description: t('action.openLocalSuccessDescription', { name: loaded.name || t('project.untitled') }) })
  }

  const handleClearLocal = () => {
    if (!canUseFiles) return handleLocked('files')
    clearProjectFromStorage()
    setActionState({ tone: 'warning', title: t('action.clearLocalSuccessTitle'), description: t('action.clearLocalSuccessDescription') })
  }

  const handleExportJson = () => {
    if (!canExport) return handleLocked('export')
    const validation = validateProjectForExport(project)
    if (!validation.valid) {
      setActionState({ tone: 'error', title: t('action.exportErrorTitle'), description: t('action.exportErrorDescription'), issues: validation.issues })
      return
    }
    downloadTextFile('calc-square-project.json', serializeProject(project))
    setActionState({ tone: 'success', title: t('action.exportSuccessTitle'), description: t('action.exportSuccessDescription', { items: project.items.length }) })
  }

  const handlePickFile = () => {
    if (!canImport) return handleLocked('import')
    fileInputRef.current?.click()
  }

  const handleImportJson = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const raw = await file.text()
      const parsed = deserializeProject(raw)
      const validation = validateImportedProject(parsed)

      if (!validation.valid) {
        setActionState({ tone: 'error', title: t('action.importErrorTitle'), description: t('action.importErrorDescription', { fileName: file.name }), issues: validation.issues })
        event.target.value = ''
        return
      }

      const migrated = migrateImportedProject(parsed as SpecificationProject)
      const normalized = withRecalculatedTotals(migrated)
      setProject(normalized)
      setActionState({ tone: 'success', title: t('action.importSuccessTitle'), description: t('action.importSuccessDescription', { fileName: file.name, items: normalized.items.length }) })
    } catch {
      setActionState({ tone: 'error', title: t('action.importErrorTitle'), description: t('action.importParseErrorDescription', { fileName: file.name }) })
    } finally {
      event.target.value = ''
    }
  }

  return (
    <div className="rounded-xl border border-slate-300 bg-white shadow-sm">
      <div className="border-b border-slate-300 bg-[#f4f4f4] px-5 py-4">
        <h3 className="text-lg font-semibold text-slate-900">{t('action.projectActionsTitle')}</h3>
        <p className="mt-1 text-sm text-slate-600">{t('action.projectActionsDescription')}</p>
      </div>

      <div className="grid grid-cols-3 gap-2 p-4 text-center text-xs text-slate-600">
        <div className="rounded-lg border border-slate-200 bg-[#fafafa] px-3 py-2"><div className="font-semibold text-slate-900">{projectStats.items}</div><div>{t('action.statsItems')}</div></div>
        <div className="rounded-lg border border-slate-200 bg-[#fafafa] px-3 py-2"><div className="font-semibold text-slate-900">{projectStats.area.toFixed(3)}</div><div>{t('common.area')}</div></div>
        <div className="rounded-lg border border-slate-200 bg-[#fafafa] px-3 py-2"><div className="font-semibold text-slate-900">{projectStats.mass.toFixed(2)}</div><div>{t('common.mass')}</div></div>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-5">
        <button type="button" onClick={handleSaveLocal} className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700">{t('action.saveLocal')}</button>
        <button type="button" onClick={handleOpenLocal} className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700">{t('action.openLocal')}</button>
        <button type="button" onClick={handleExportJson} className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700">{t('action.exportJson')}</button>
        <button type="button" onClick={handlePickFile} className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700">{t('action.importJson')}</button>
        <button type="button" onClick={handleClearLocal} className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700">{t('action.clearLocal')}</button>
      </div>

      {actionState ? (
        <div className="space-y-3 p-4 pt-0">
          <StatusBanner tone={actionState.tone} title={actionState.title} description={actionState.description} />
          {actionState.issues?.length ? (
            <Alert tone="error" title={t('action.issueListTitle')}>
              <ul className="list-disc space-y-1 pl-5">{actionState.issues.map((issue) => <li key={issue}>{issue}</li>)}</ul>
            </Alert>
          ) : null}
        </div>
      ) : null}

      <input ref={fileInputRef} type="file" accept="application/json,.json" className="hidden" onChange={handleImportJson} />
    </div>
  )
}
