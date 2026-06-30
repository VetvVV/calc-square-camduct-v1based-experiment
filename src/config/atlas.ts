function buildPublicAssetPath(path: string) {
  return `${import.meta.env.BASE_URL}${path}`
}

export type AtlasProductStatus = 'available' | 'coming-soon'

export interface AtlasProductConfig {
  key: string
  moduleKey: 'round-duct' | 'spiral-duct' | null
  code: string
  status: AtlasProductStatus
  title: {
    ru: string
    uk: string
    en: string
  }
  statusLabel: {
    ru: string
    uk: string
    en: string
  }
  image: string
}

export interface AtlasCategoryConfig {
  categoryKey: string
  active: boolean
  title: {
    ru: string
    uk: string
    en: string
  }
  products: AtlasProductConfig[]
}

export const atlasConfig: AtlasCategoryConfig[] = [
  {
    categoryKey: 'round',
    active: true,
    title: {
      ru: 'Круглые изделия',
      uk: 'Круглі вироби',
      en: 'Round products',
    },
    products: [
      {
        key: 'r-001',
        moduleKey: 'round-duct',
        code: 'R-001',
        status: 'available',
        title: {
          ru: 'Труба прямошовная',
          uk: 'Труба прямошовна',
          en: 'Straight seam duct',
        },
        statusLabel: {
          ru: 'Открыть модуль расчёта',
          uk: 'Відкрити модуль розрахунку',
          en: 'Open calculator module',
        },
        image: buildPublicAssetPath('assets/atlas/01-round-duct-v2.png'),
      },
      {
        key: 'spiral-001',
        moduleKey: 'spiral-duct',
        code: 'SPIRAL-001',
        status: 'available',
        title: {
          ru: 'Труба спирально-навивная',
          uk: 'Труба спірально-навивна',
          en: 'Spiral duct',
        },
        statusLabel: {
          ru: 'Открыть модуль расчёта',
          uk: 'Відкрити модуль розрахунку',
          en: 'Open calculator module',
        },
        image: buildPublicAssetPath('assets/atlas/round-duct-spiro.png'),
      },
      {
        key: 'r-002',
        moduleKey: null,
        code: 'R-002',
        status: 'coming-soon',
        title: { ru: 'Отвод 45°', uk: 'Відвід 45°', en: '45° elbow' },
        statusLabel: { ru: 'В разработке / Модуль позже', uk: 'У розробці / Модуль пізніше', en: 'In development / Module later' },
        image: buildPublicAssetPath('assets/atlas/02-round-elbow-45.png'),
      },
      {
        key: 'r-003',
        moduleKey: null,
        code: 'R-003',
        status: 'coming-soon',
        title: { ru: 'Отвод 90°', uk: 'Відвід 90°', en: '90° elbow' },
        statusLabel: { ru: 'В разработке / Модуль позже', uk: 'У розробці / Модуль пізніше', en: 'In development / Module later' },
        image: buildPublicAssetPath('assets/atlas/02-round-elbow-90.png'),
      },
      {
        key: 'r-004',
        moduleKey: null,
        code: 'R-004',
        status: 'coming-soon',
        title: { ru: 'Переход круглый', uk: 'Перехід круглий', en: 'Round transition' },
        statusLabel: { ru: 'В разработке / Модуль позже', uk: 'У розробці / Модуль пізніше', en: 'In development / Module later' },
        image: buildPublicAssetPath('assets/atlas/03-round-transition-v4-welded-no-rivets.png'),
      },
      {
        key: 'r-005',
        moduleKey: null,
        code: 'R-005',
        status: 'coming-soon',
        title: { ru: 'Переход круглый со смещением', uk: 'Перехід круглий зі зміщенням', en: 'Offset round transition' },
        statusLabel: { ru: 'В разработке / Модуль позже', uk: 'У розробці / Модуль пізніше', en: 'In development / Module later' },
        image: buildPublicAssetPath('assets/atlas/04-round-offset-transition-v8-full-transition-seam.png'),
      },
      {
        key: 'r-006',
        moduleKey: null,
        code: 'R-006',
        status: 'coming-soon',
        title: { ru: 'Тройник круглый', uk: 'Трійник круглий', en: 'Round tee' },
        statusLabel: { ru: 'В разработке / Модуль позже', uk: 'У розробці / Модуль пізніше', en: 'In development / Module later' },
        image: buildPublicAssetPath('assets/atlas/05-round-tee-v6-even-shorter-trunk.png'),
      },
      {
        key: 'r-007',
        moduleKey: null,
        code: 'R-007',
        status: 'coming-soon',
        title: { ru: 'Тройник переходной', uk: 'Трійник перехідний', en: 'Transition tee' },
        statusLabel: { ru: 'В разработке / Модуль позже', uk: 'У розробці / Модуль пізніше', en: 'In development / Module later' },
        image: buildPublicAssetPath('assets/atlas/06-round-tee-custom-v2-transition-with-branch.png'),
      },
      {
        key: 'r-008',
        moduleKey: null,
        code: 'R-008',
        status: 'coming-soon',
        title: { ru: 'Заглушка круглая', uk: 'Заглушка кругла', en: 'Round cap' },
        statusLabel: { ru: 'В разработке / Модуль позже', uk: 'У розробці / Модуль пізніше', en: 'In development / Module later' },
        image: buildPublicAssetPath('assets/atlas/07-round-cap.png'),
      },
      {
        key: 'r-009',
        moduleKey: null,
        code: 'R-009',
        status: 'coming-soon',
        title: { ru: 'Врезка круглая', uk: 'Врізка кругла', en: 'Round inset' },
        statusLabel: { ru: 'В разработке / Модуль позже', uk: 'У розробці / Модуль пізніше', en: 'In development / Module later' },
        image: buildPublicAssetPath('assets/atlas/08-round-inset-v4-base-radius-joint.png'),
      },
      {
        key: 'r-010',
        moduleKey: null,
        code: 'R-010',
        status: 'coming-soon',
        title: { ru: 'Седло круглое', uk: 'Сідло кругле', en: 'Round saddle' },
        statusLabel: { ru: 'В разработке / Модуль позже', uk: 'У розробці / Модуль пізніше', en: 'In development / Module later' },
        image: buildPublicAssetPath('assets/atlas/09-round-saddle.png'),
      },
      {
        key: 'r-011',
        moduleKey: null,
        code: 'R-011',
        status: 'coming-soon',
        title: { ru: 'Ниппель круглый', uk: 'Ніпель круглий', en: 'Round nipple' },
        statusLabel: { ru: 'В разработке / Модуль позже', uk: 'У розробці / Модуль пізніше', en: 'In development / Module later' },
        image: buildPublicAssetPath('assets/atlas/10-round-nipple.png'),
      },
      {
        key: 'r-012',
        moduleKey: null,
        code: 'R-012',
        status: 'coming-soon',
        title: { ru: 'Шумоглушитель круглый', uk: 'Шумоглушник круглий', en: 'Round silencer' },
        statusLabel: { ru: 'В разработке / Модуль позже', uk: 'У розробці / Модуль пізніше', en: 'In development / Module later' },
        image: buildPublicAssetPath('assets/atlas/11-round-silencer.png'),
      },
      {
        key: 'r-013',
        moduleKey: null,
        code: 'R-013',
        status: 'coming-soon',
        title: { ru: 'Крестовина круглая', uk: 'Хрестовина кругла', en: 'Round cross' },
        statusLabel: { ru: 'В разработке / Модуль позже', uk: 'У розробці / Модуль пізніше', en: 'In development / Module later' },
        image: buildPublicAssetPath('assets/atlas/12-round-cross.png'),
      },
    ],
  },
  {
    categoryKey: 'rectangular',
    active: false,
    title: {
      ru: 'Прямоугольные изделия',
      uk: 'Прямокутні вироби',
      en: 'Rectangular products',
    },
    products: [],
  },
  {
    categoryKey: 'combined',
    active: false,
    title: {
      ru: 'Комбинированные изделия',
      uk: 'Комбіновані вироби',
      en: 'Combined products',
    },
    products: [],
  },
]
