import { atlasConfig } from '../config/atlas'
import { ProductCategorySection } from '../components/Atlas/ProductCategorySection'
import { useTranslation } from 'react-i18next'

export function AtlasPage() {
  const { t } = useTranslation()

  return (
    <section className="space-y-6 pb-8">
      <div className="border-b border-slate-300 pb-4">
        <h1 className="text-2xl font-semibold text-slate-900">{t('page.atlasTitle')}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{t('page.atlasDescription')}</p>
      </div>

      <div className="space-y-8">
        {atlasConfig.map((category) => (
          <ProductCategorySection key={category.categoryKey} category={category} />
        ))}
      </div>
    </section>
  )
}
