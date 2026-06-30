import { useTranslation } from 'react-i18next'
import { buildInfo } from '../../build-info'

export function BuildBadge() {
  const { t } = useTranslation()

  return (
    <div className="fixed bottom-3 right-3 z-30 rounded-full border border-slate-300 bg-white/92 px-3 py-1.5 text-xs text-slate-600 shadow-sm backdrop-blur">
      {t('build.badge', {
        version: buildInfo.version,
        stage: buildInfo.stage,
        dateTime: buildInfo.buildDateTime,
      })}
    </div>
  )
}
