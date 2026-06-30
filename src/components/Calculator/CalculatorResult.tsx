import { formatArea, formatMass } from '../../utils/format'
import { useTranslation } from 'react-i18next'

interface CalculatorResultProps {
  area: number
  mass: number | null
  description: string
}

export function CalculatorResult({ area, mass, description }: CalculatorResultProps) {
  const { t } = useTranslation()

  return (
    <div className="rounded-xl border border-slate-300 bg-white shadow-sm">
      <div className="border-b border-slate-300 bg-[#f4f4f4] px-4 py-3">
        <h4 className="text-lg font-semibold text-slate-900">{t('calculator.resultTitle')}</h4>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        <div className="rounded-lg border border-slate-200 bg-[#fafafa] p-4">
          <div className="text-sm text-slate-500">{t('common.area')}</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">{formatArea(area, t('unit.m2'))}</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-[#fafafa] p-4">
          <div className="text-sm text-slate-500">{t('common.mass')}</div>
          <div className="mt-1 text-xl font-semibold text-slate-900">{formatMass(mass, t('unit.kg'))}</div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="rounded-lg border border-slate-200 bg-[#fafafa] p-4 text-sm text-slate-700">{description}</div>
      </div>
    </div>
  )
}
