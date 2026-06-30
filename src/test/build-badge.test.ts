import { describe, expect, it } from 'vitest'
import { buildInfo } from '../build-info'

describe('build badge info', () => {
  it('contains version and datetime, but regular badge does not require commit hash', () => {
    expect(buildInfo.version).toBeTruthy()
    expect(buildInfo.buildDateTime).toMatch(/\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}/)
    expect(buildInfo.stage).toBe('MVP')
  })
})
