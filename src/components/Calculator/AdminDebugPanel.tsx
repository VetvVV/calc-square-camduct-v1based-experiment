import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface AdminDebugPanelProps {
  data: unknown
}

export function AdminDebugPanel({ data }: AdminDebugPanelProps) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="overflow-hidden rounded-xl border border-[#d6cdb7] bg-[#f6f0df] shadow-sm">
      <div className="flex flex-col gap-3 border-b border-[#d6cdb7] bg-[#efe6cf] px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="inline-flex items-center rounded-full border border-[#e5b56e] bg-[#fff8ec] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b86205]">
            CAMduct / service
          </div>
          <h4 className="mt-2 text-sm font-semibold text-[#5b4e2a]">{t('message.debug.title')}</h4>
          <p className="mt-1 text-xs leading-5 text-[#6d6247]">{t('message.debug.description')}</p>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="rounded-md border border-[#cdbf98] bg-white px-3 py-2 text-xs font-medium text-[#5b4e2a]"
        >
          {expanded ? t('action.hideDebug') : t('action.showDebug')}
        </button>
      </div>

      <div className="grid gap-4 px-4 py-4 lg:grid-cols-[220px_1fr]">
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <div className="rounded-lg border border-[#ded8c4] bg-white p-3">
            <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">JSON</div>
            <div className="mt-1 text-sm font-semibold text-slate-900">Live payload</div>
          </div>
          <div className="rounded-lg border border-[#ded8c4] bg-white p-3">
            <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Visibility</div>
            <div className="mt-1 text-sm font-semibold text-slate-900">Admin / Service</div>
          </div>
          <div className="rounded-lg border border-[#ded8c4] bg-white p-3">
            <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Mode</div>
            <div className="mt-1 text-sm font-semibold text-[#b86205]">Internal trace</div>
          </div>
        </div>

        {expanded ? (
          <pre className="max-h-[32rem] overflow-auto rounded-lg border border-[#ded8c4] bg-white p-4 text-xs leading-6 text-slate-900">{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <div className="rounded-lg border border-dashed border-[#cdbf98] bg-white/70 p-6 text-sm text-[#6d6247]">
            {t('message.debug.collapsedHint')}
          </div>
        )}
      </div>
    </section>
  )
}
