import { useEffect, useMemo, useState } from 'react'
import { calculateSpiralDuct } from '../../domain/calculators'
import { buildDescription } from '../../domain/descriptions/descriptionBuilder'
import { filterMessagesByRole } from '../../domain/messages/messageFilter'
import { ParameterField } from './ParameterField'
import { CalculatorResult } from './CalculatorResult'
import { MessageList } from './MessageList'
import { AdminDebugPanel } from './AdminDebugPanel'
import { SectionLengthSelector } from './SectionLengthSelector'
import { materialOptions } from '../../constants/materials'
import { useProjectStore } from '../../store/projectStore'
import { addItem, replaceItem } from '../../domain/specification/specificationManager'
import { createSpecificationItem } from '../../domain/specification/itemFactory'
import { useAppStore } from '../../store/appStore'
import { useTranslation } from 'react-i18next'
import { getGuestUsageLimitState, incrementGuestUsage } from '../../utils/guestUsage'
import { Alert } from '../Common/Alert'
import {
  canAddSpecItem,
  canViewDebugPanel,
  canViewInternalLogic,
  getCalculationLimit,
} from '../../roles/permissions'

export function SpiralDuctCalculator() {
  const { t, i18n } = useTranslation()
  const role = useAppStore((state) => state.role)
  const camductMode = useAppStore((state) => state.camductMode)
  const project = useProjectStore((state) => state.project)
  const setProject = useProjectStore((state) => state.setProject)
  const editingItemId = useProjectStore((state) => state.editingItemId)
  const editingDraft = useProjectStore((state) => state.editingDraft)
  const setEditingItemId = useProjectStore((state) => state.setEditingItemId)
  const setEditingDraft = useProjectStore((state) => state.setEditingDraft)

  const [A, setA] = useState(250)
  const [B, setB] = useState(6000)
  const [Q, setQ] = useState(1)
  const [material, setMaterial] = useState('galvanized')
  const [thickness, setThickness] = useState(0.5)
  const [spiralSectionLength, setSpiralSectionLength] = useState<6000 | 5000 | 4000 | 3000 | 2000>(6000)
  const [comment, setComment] = useState('')
  const [usageCount, setUsageCount] = useState(() => getGuestUsageLimitState().count)

  useEffect(() => {
    if (!editingItemId || editingDraft?.moduleKey !== 'spiral-duct') return

    const parameters = (editingDraft.parameters ?? {}) as Record<string, unknown>
    const options = (editingDraft.options ?? {}) as Record<string, unknown>
    setA(Number(parameters.A ?? 250))
    setB(Number(parameters.B ?? 6000))
    setQ(Number((parameters.Q as number | undefined) ?? 1))
    setMaterial(String(options.material ?? 'galvanized'))
    setThickness(Number(options.thickness ?? 0.5))
    setSpiralSectionLength(Number(options.spiralSectionLength ?? 6000) as 6000 | 5000 | 4000 | 3000 | 2000)
    setComment(String(editingDraft.comment ?? ''))
  }, [editingDraft, editingItemId])

  const result = useMemo(
    () => calculateSpiralDuct({ A, B, Q, material, thickness, spiralSectionLength }),
    [A, B, Q, material, thickness, spiralSectionLength],
  )

  const description = useMemo(
    () =>
      buildDescription(i18n.t.bind(i18n), 'spiral-duct', {
        A,
        B,
        splitSummary: result.splitInfo?.summary,
        splitCount: result.splitInfo?.count,
        sectionLength: spiralSectionLength,
      }),
    [A, B, i18n, result.splitInfo?.count, result.splitInfo?.summary, spiralSectionLength],
  )

  const visibleMessages = filterMessagesByRole(result.messages, role)
  const limit = getCalculationLimit(role)
  const limitReached = limit !== null && usageCount >= limit
  const canAdd = canAddSpecItem(role)
  const isEditingLocked = editingItemId && role === 'user'

  const handleAdd = () => {
    if (!canAdd || limitReached || isEditingLocked) return

    const item = createSpecificationItem('spiral-duct')
    item.quantity = Q
    item.comment = comment
    item.parameters = { A, B, Q }
    item.options = { material, thickness, spiralSectionLength }
    item.calculated = {
      areaRaw: result.calculated.areaRaw,
      areaDisplay: result.calculated.areaDisplay,
      massRaw: result.calculated.massRaw,
      massDisplay: result.calculated.massDisplay,
    }
    item.moduleMetadata = result.moduleMetadata
    item.messages = result.messages

    if (editingItemId) {
      item.id = editingItemId
      setProject(replaceItem(project, editingItemId, item))
      setEditingItemId(null)
      setEditingDraft(null)
    } else {
      setProject(addItem(project, item))
    }

    if (limit !== null) {
      const nextUsage = incrementGuestUsage()
      setUsageCount(nextUsage.count)
    }
  }

  const materialConfig = materialOptions.find((option) => option.key === material) ?? materialOptions[0]

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#d6cdb7] bg-[#f6f0df] shadow-sm">
        <div className="border-b border-[#d6cdb7] bg-[#efe6cf] px-4 py-3">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#5b4e2a]">SPIRAL-001 / {t('product.spiralDuct')}</h3>
              <p className="text-sm text-[#6d6247]">{t('product.spiralDuctDescription')}</p>
            </div>
            <div className="text-sm font-medium text-[#8a5a10]">{result.splitInfo?.summary}</div>
          </div>
        </div>

        <div className="space-y-4 p-4">
          {limit !== null ? (
            <Alert tone={limitReached ? 'warning' : 'info'} title={t('message.calculationLimit.title')}>
              {t('message.calculationLimit.description', { limit, used: usageCount, remaining: Math.max(limit - usageCount, 0) })}
            </Alert>
          ) : null}

          {!canAdd ? (
            <Alert tone="warning" title={t('locked.guest.addTitle')}>
              {t('locked.guest.addDescription')}
            </Alert>
          ) : null}

          {isEditingLocked ? (
            <Alert tone="warning" title={t('locked.user.editTitle')}>
              {t('locked.user.editDescription')}
            </Alert>
          ) : null}

          <div className="grid gap-3 md:grid-cols-2">
            <ParameterField label={camductMode && canViewInternalLogic(role) ? 'A / ØD' : 'ØD'}>
              <input type="number" value={A} onChange={(e) => setA(Number(e.target.value || 0))} className="h-9 w-full rounded-md border border-[#c9bea0] bg-white px-3" />
            </ParameterField>
            <ParameterField label={camductMode && canViewInternalLogic(role) ? 'B / L' : 'L'}>
              <input type="number" value={B} onChange={(e) => setB(Number(e.target.value || 0))} className="h-9 w-full rounded-md border border-[#c9bea0] bg-white px-3" />
            </ParameterField>
            <ParameterField label="Q">
              <input type="number" value={Q} onChange={(e) => setQ(Number(e.target.value || 1))} className="h-9 w-full rounded-md border border-[#c9bea0] bg-white px-3" />
            </ParameterField>
            <ParameterField label={t('split.spiralBySelectedLength')}>
              <SectionLengthSelector value={spiralSectionLength} onChange={setSpiralSectionLength} />
            </ParameterField>
            <ParameterField label={t('common.material')}>
              <select value={material} onChange={(e) => setMaterial(e.target.value)} className="h-9 w-full rounded-md border border-[#c9bea0] bg-white px-3">
                {materialOptions.map((option) => (
                  <option key={option.key} value={option.key}>{t(`material.${option.key}`)}</option>
                ))}
              </select>
            </ParameterField>
            <ParameterField label={t('common.thickness')}>
              <select value={thickness} onChange={(e) => setThickness(Number(e.target.value))} className="h-9 w-full rounded-md border border-[#c9bea0] bg-white px-3">
                {materialConfig.thicknesses.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </ParameterField>
          </div>

          <ParameterField label={t('common.comment')}>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="min-h-20 w-full rounded-md border border-[#c9bea0] bg-white px-3 py-2" />
          </ParameterField>

          {canAdd ? (
            <button type="button" disabled={Boolean(limitReached || isEditingLocked)} onClick={handleAdd} className="rounded-md bg-[#d97706] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300">
              {editingItemId ? t('action.updateItem') : t('action.addToProject')}
            </button>
          ) : null}
        </div>
      </div>

      <CalculatorResult area={result.calculated.areaDisplay} mass={result.calculated.massDisplay} description={description} />
      <MessageList messages={visibleMessages} />
      {canViewDebugPanel(role) ? <AdminDebugPanel data={{ camductMode, result }} /> : null}
    </div>
  )
}
