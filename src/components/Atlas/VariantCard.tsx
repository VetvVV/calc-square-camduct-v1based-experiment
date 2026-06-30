import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import type { AtlasProductConfig } from '../../config/atlas'

interface VariantCardProps {
  product: AtlasProductConfig
}

export function VariantCard({ product }: VariantCardProps) {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const language = i18n.language.startsWith('uk') ? 'uk' : i18n.language.startsWith('en') ? 'en' : 'ru'
  const isAvailable = product.status === 'available' && product.moduleKey

  return (
    <button
      type="button"
      onClick={() => {
        if (isAvailable) {
          navigate(`/calculator?module=${product.moduleKey}`)
        }
      }}
      className={[
        'group w-full text-center transition-transform duration-150',
        isAvailable ? 'cursor-pointer hover:-translate-y-0.5' : 'cursor-default',
      ].join(' ')}
      disabled={!isAvailable}
    >
      <div className="mx-auto flex min-h-[214px] w-full max-w-[210px] items-end justify-center px-2 py-3">
        <img
          src={product.image}
          alt={product.title[language]}
          className="max-h-[146px] w-full object-contain object-center drop-shadow-[0_12px_10px_rgba(0,0,0,0.14)]"
        />
      </div>

      <div className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#d97706]">{product.code}</div>
      <div className="mt-1 text-sm leading-5 text-slate-900">{product.title[language]}</div>
      <div className={[
        'mt-1 text-xs',
        isAvailable ? 'text-emerald-700' : 'text-slate-500',
      ].join(' ')}>
        {product.statusLabel[language]}
      </div>
    </button>
  )
}
