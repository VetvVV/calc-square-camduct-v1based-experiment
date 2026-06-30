import { describe, expect, it } from 'vitest'
import { atlasConfig } from '../config/atlas'

describe('atlasConfig', () => {
  it('contains round category with R-001 and SPIRAL-001 products', () => {
    const roundCategory = atlasConfig.find((category) => category.categoryKey === 'round')
    expect(roundCategory).toBeDefined()
    expect(roundCategory?.products.slice(0, 2).map((product) => product.code)).toEqual(['R-001', 'SPIRAL-001'])
  })
})
