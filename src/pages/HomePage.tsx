import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function CtaLink({ to, label, accent = false }: { to: string; label: string; accent?: boolean }) {
  return (
    <Link
      to={to}
      className={[
        'inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold transition',
        accent ? 'bg-[#d97706] text-white hover:bg-[#b86307]' : 'border border-slate-400 bg-white text-slate-800 hover:bg-slate-100',
      ].join(' ')}
    >
      {label}
    </Link>
  )
}

export function HomePage() {
  const { t } = useTranslation()

  return (
    <section className="space-y-8 pb-10">
      <section className="rounded-2xl border border-slate-300 bg-[#f4f4f4] px-5 py-6 shadow-sm sm:px-7 sm:py-8">
        <div className="max-w-4xl">
          <div className="text-xs font-bold uppercase tracking-[0.22em] text-[#d97706]">ST Spetsmontazh · CAMduct</div>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">{t('home.heroTitle')}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">{t('home.heroSubtitle')}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CtaLink to="/atlas" label={t('home.ctaAtlas')} accent />
            <CtaLink to="/split" label={t('home.ctaSpecification')} />
            <CtaLink to="/split?module=round-duct" label={t('home.ctaRound')} />
            <CtaLink to="/split?module=spiral-duct" label={t('home.ctaSpiral')} />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {['step01', 'step02', 'step03'].map((key, index) => (
          <div key={key} className="rounded-2xl border border-slate-300 bg-white px-5 py-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#d97706]">{String(index + 1).padStart(2, '0')}</div>
            <div className="mt-2 text-lg font-semibold text-slate-900">{t(`home.${key}Title`)}</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{t(`home.${key}Text`)}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {['lang', 'project', 'export', 'camduct'].map((item) => (
          <div key={item} className="rounded-2xl border border-slate-300 bg-white px-5 py-5 text-center shadow-sm">
            <div className="text-2xl font-semibold text-slate-900">{t(`home.counter.${item}.value`)}</div>
            <div className="mt-2 text-sm text-slate-600">{t(`home.counter.${item}.label`)}</div>
          </div>
        ))}
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-300 bg-white px-5 py-6 shadow-sm sm:px-7">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">{t('home.featureTitle')}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{t('home.featureSubtitle')}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {['catalog', 'calculators', 'specification', 'exchange', 'workflow', 'admin'].map((feature) => (
            <div key={feature} className="rounded-xl border border-slate-200 bg-[#f8f8f8] px-4 py-4">
              <div className="text-base font-semibold text-slate-900">{t(`home.feature.${feature}.title`)}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{t(`home.feature.${feature}.text`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-slate-300 bg-white px-5 py-6 shadow-sm sm:px-7">
          <h2 className="text-2xl font-semibold text-slate-900">{t('home.categoriesTitle')}</h2>
          <div className="mt-4 grid gap-3">
            <div className="rounded-xl border border-[#d97706] bg-[#fff7ed] px-4 py-4 text-slate-900">{t('home.categoryRound')}</div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-500">{t('home.categoryRectangular')}</div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-500">{t('home.categoryCombined')}</div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-300 bg-white px-5 py-6 shadow-sm sm:px-7">
          <h2 className="text-2xl font-semibold text-slate-900">{t('home.scenarioTitle')}</h2>
          <div className="mt-4 space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex gap-3 rounded-xl border border-slate-200 bg-[#f8f8f8] px-4 py-3">
                <div className="text-sm font-bold text-[#d97706]">{String(n).padStart(2, '0')}</div>
                <div className="text-sm text-slate-700">{t(`home.scenario${n}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-300 bg-[#f6f0df] px-5 py-6 shadow-sm sm:px-7">
        <h2 className="text-2xl font-semibold text-slate-900">{t('home.ctaBlockTitle')}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-700">{t('home.ctaBlockText')}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <CtaLink to="/atlas" label={t('home.ctaAtlas')} accent />
          <CtaLink to="/split" label={t('home.ctaCreateSpec')} />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-300 bg-white px-5 py-6 shadow-sm sm:px-7">
        <h2 className="text-2xl font-semibold text-slate-900">{t('home.contactTitle')}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{t('home.contactText')}</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-[#f8f8f8] px-4 py-4 text-sm text-slate-700">{t('home.contactPhone')}</div>
          <div className="rounded-xl border border-slate-200 bg-[#f8f8f8] px-4 py-4 text-sm text-slate-700">{t('home.contactEmail')}</div>
          <div className="rounded-xl border border-slate-200 bg-[#f8f8f8] px-4 py-4 text-sm text-slate-700">{t('home.contactObject')}</div>
          <div className="rounded-xl border border-slate-200 bg-[#f8f8f8] px-4 py-4 text-sm text-slate-700">{t('home.contactButton')}</div>
        </div>
      </section>

      <footer className="border-t border-slate-300 pt-4 text-sm text-slate-500">{t('home.footerText')}</footer>
    </section>
  )
}
