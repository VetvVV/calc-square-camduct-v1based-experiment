import { describe, expect, it } from 'vitest'
import { atlasConfig } from '../config/atlas'

describe('atlas v1-based config', () => {
  it('contains all 14 round products in catalog config', () => {
    const round = atlasConfig.find((item) => item.categoryKey === 'round')
    expect(round?.products).toHaveLength(14)
  })

  it('marks R-001 and SPIRAL as active and others as coming soon without module links', () => {
    const round = atlasConfig.find((item) => item.categoryKey === 'round')
    const active = round?.products.filter((item) => item.status === 'available') ?? []
    const comingSoon = round?.products.filter((item) => item.status === 'coming-soon') ?? []

    expect(active.map((item) => item.code)).toEqual(['R-001', 'SPIRAL-001'])
    expect(comingSoon.every((item) => item.moduleKey === null)).toBe(true)
  })
})
