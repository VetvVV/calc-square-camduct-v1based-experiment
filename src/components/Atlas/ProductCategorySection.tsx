import type { AtlasCategoryConfig } from '../../config/atlas'
import { VariantCard } from './VariantCard'
import { useTranslation } from 'react-i18next'

interface ProductCategorySectionProps {
  category: AtlasCategoryConfig
}

export function ProductCategorySection({ category }: ProductCategorySectionProps) {
  const { i18n, t } = useTranslation()
  const language = i18n.language.startsWith('uk') ? 'uk' : i18n.language.startsWith('en') ? 'en' : 'ru'

  return (
    <section className="space-y-4">
      <div className="border-b border-slate-300 pb-3">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">{category.title[language]}</h2>
            <p className="mt-1 text-sm text-slate-600">
              {category.active ? t('atlas.floatingCatalogHint') : t('atlas.comingLaterCategory')}
            </p>
          </div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {category.active ? t('atlas.activeCategory') : t('atlas.laterCategory')}
          </div>
        </div>
      </div>

      {category.active ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-x-2 gap-y-6 xl:grid-cols-[repeat(6,minmax(0,1fr))] 2xl:grid-cols-[repeat(6,minmax(0,1fr))]">
          {category.products.map((product) => (
            <VariantCard key={product.key} product={product} />
          ))}
        </div>
      ) : (
        <div className="px-1 py-3 text-sm text-slate-500">{t('atlas.comingLaterCategory')}</div>
      )}
    </section>
  )
}
