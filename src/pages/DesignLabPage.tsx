import { Link } from 'react-router-dom'

type LabTheme = 'industrial' | 'premium' | 'cad'

const labThemes: Array<{
  key: LabTheme
  badge: string
  title: string
  description: string
  accentLabel: string
  bullets: string[]
}> = [
  {
    key: 'industrial',
    badge: '01 · Industrial Compact',
    title: 'Плотный инженерный интерфейс для ежедневной рабочей нагрузки',
    description:
      'Стиль для профессионального инструмента, где приоритетом остаются таблицы, параметры, быстрый ввод и визуальная дисциплина.',
    accentLabel: 'Плотность / расчёт / таблицы',
    bullets: ['Компактные панели', 'Строгая геометрия', 'Минимум декоративности'],
  },
  {
    key: 'premium',
    badge: '02 · Premium Technical SaaS',
    title: 'Светлый SaaS-стиль с аккуратной премиальной подачей',
    description:
      'Подходит для клиентского и коммерческого контура: современный hero, мягкие карточки, чистая структура и оранжевый брендовый акцент.',
    accentLabel: 'Hero / карточки / бренд',
    bullets: ['Мягкие тени', 'Чистые CTA', 'Дорогой, но строгий вид'],
  },
  {
    key: 'cad',
    badge: '03 · CAD / CAM Dashboard',
    title: 'Инженерный dashboard с ощущением CAD/CAM рабочего пространства',
    description:
      'Фокус на модульности, статусах, спецификации и визуальном ощущении производственного центра управления.',
    accentLabel: 'Панели / статус / atlas',
    bullets: ['Бейджи статусов', 'Компактные рабочие блоки', 'Сильнее ощущение dashboard'],
  },
]

function LabButton({ label, variant = 'primary' }: { label: string; variant?: 'primary' | 'secondary' | 'ghost' }) {
  return <button className={`dl-btn dl-btn--${variant}`}>{label}</button>
}

function LabStyleSection({
  badge,
  title,
  description,
  accentLabel,
  bullets,
  theme,
}: {
  badge: string
  title: string
  description: string
  accentLabel: string
  bullets: string[]
  theme: LabTheme
}) {
  return (
    <section className={`dl-theme dl-theme--${theme}`}>
      <div className="dl-theme__hero dl-reveal">
        <div className="dl-theme__hero-copy">
          <div className="dl-kicker">{badge}</div>
          <h2>{title}</h2>
          <p>{description}</p>
          <div className="dl-theme__cta-row">
            <LabButton label="Primary action" variant="primary" />
            <LabButton label="Secondary" variant="secondary" />
            <LabButton label="Ghost" variant="ghost" />
          </div>
          <div className="dl-theme__meta">
            <span className="dl-pill dl-pill--accent">{accentLabel}</span>
            <span className="dl-pill">Hover / Active / Focus states enabled</span>
          </div>
        </div>
        <div className="dl-preview-panel dl-card dl-card--interactive">
          <div className="dl-preview-toolbar">
            <span className="dl-dot" />
            <span className="dl-dot" />
            <span className="dl-dot" />
            <div className="dl-preview-caption">calc-square / workspace preview</div>
          </div>
          <div className="dl-preview-grid">
            <div className="dl-stat-card">
              <span>Active module</span>
              <strong>Round duct / CAMduct</strong>
            </div>
            <div className="dl-stat-card">
              <span>Project stage</span>
              <strong>MVP / Design lab</strong>
            </div>
            <div className="dl-stat-card">
              <span>Specification</span>
              <strong>12 items / 348.6 m²</strong>
            </div>
          </div>
          <div className="dl-wireframe">
            <div className="dl-wireframe__sidebar">
              <span className="dl-wire-badge">Atlas</span>
              <span className="dl-wire-badge">Split</span>
              <span className="dl-wire-badge">Spec</span>
            </div>
            <div className="dl-wireframe__main">
              <div className="dl-wire-row" />
              <div className="dl-wire-row dl-wire-row--short" />
              <div className="dl-wire-columns">
                <div className="dl-wire-box" />
                <div className="dl-wire-box" />
                <div className="dl-wire-box" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dl-feature-grid dl-reveal">
        {bullets.map((bullet, index) => (
          <article key={bullet} className="dl-card dl-card--interactive dl-feature-card">
            <div className="dl-feature-card__index">0{index + 1}</div>
            <h3>{bullet}</h3>
            <p>
              Вариант показывает, как может выглядеть рабочий слой проекта для сценариев расчёта площади,
              разбивки секций и подготовки спецификации.
            </p>
          </article>
        ))}
      </div>

      <div className="dl-layout-grid dl-reveal">
        <article className="dl-card dl-atlas-card dl-card--interactive">
          <div className="dl-card__header">
            <div>
              <div className="dl-card__eyebrow">Atlas card</div>
              <h3>R-013 · Крестовина круглая</h3>
            </div>
            <span className="dl-status-chip">coming soon</span>
          </div>
          <div className="dl-atlas-visual">
            <img src={`${import.meta.env.BASE_URL}assets/atlas/12-round-cross.png`} alt="R-013 round cross preview" />
          </div>
          <div className="dl-atlas-meta">
            <span className="dl-pill">Galvanized steel</span>
            <span className="dl-pill">Atlas preview</span>
            <span className="dl-pill">No layout changes</span>
          </div>
        </article>

        <article className="dl-card dl-card--interactive">
          <div className="dl-card__header">
            <div>
              <div className="dl-card__eyebrow">Calculation panel</div>
              <h3>Панель параметров расчёта</h3>
            </div>
            <span className="dl-status-chip dl-status-chip--accent">active</span>
          </div>
          <div className="dl-form-grid">
            {[
              ['Диаметр', '400 mm'],
              ['Длина', '1250 mm'],
              ['Толщина', '0.7 mm'],
              ['Секция', '1250 / 1250 / 900'],
            ].map(([label, value]) => (
              <label key={label} className="dl-field">
                <span>{label}</span>
                <div className="dl-input">{value}</div>
              </label>
            ))}
          </div>
          <div className="dl-action-row">
            <LabButton label="Рассчитать" variant="primary" />
            <LabButton label="Очистить" variant="secondary" />
          </div>
        </article>

        <article className="dl-card dl-card--interactive">
          <div className="dl-card__header">
            <div>
              <div className="dl-card__eyebrow">Mini specification</div>
              <h3>Фрагмент спецификации</h3>
            </div>
            <span className="dl-status-chip">ready</span>
          </div>
          <div className="dl-spec-table">
            <div className="dl-spec-table__head">
              <span>Code</span>
              <span>Qty</span>
              <span>Area</span>
            </div>
            {[
              ['R-001', '12', '26.84'],
              ['R-006', '2', '4.92'],
              ['R-013', '1', '2.17'],
            ].map((row) => (
              <div key={row[0]} className="dl-spec-table__row">
                <span>{row[0]}</span>
                <span>{row[1]}</span>
                <span>{row[2]} m²</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  )
}

export function DesignLabPage() {
  return (
    <section className="dl-page">
      <div className="dl-page__intro dl-reveal">
        <div>
          <div className="dl-kicker">Experiment / design arena</div>
          <h1>Design Lab · визуальные направления для Calc Square / CAMduct</h1>
          <p>
            Отдельная экспериментальная страница для выбора будущего стиля проекта до переноса идей в
            основную v2. Текущие рабочие страницы приложения не меняются.
          </p>
        </div>
        <div className="dl-page__intro-actions">
          <LabButton label="Выбрать направление" variant="primary" />
          <Link to="/" className="dl-inline-link">
            Вернуться на Home
          </Link>
        </div>
      </div>

      {labThemes.map((theme) => (
        <LabStyleSection
          key={theme.key}
          badge={theme.badge}
          title={theme.title}
          description={theme.description}
          accentLabel={theme.accentLabel}
          bullets={theme.bullets}
          theme={theme.key}
        />
      ))}
    </section>
  )
}
