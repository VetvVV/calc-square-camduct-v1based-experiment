import { describe, expect, it } from 'vitest'
import {
  canAddSpecItem,
  canEditSpecItem,
  canExportProject,
  canImportProject,
  canPrintProject,
  canRemoveSpecItem,
  canViewDebugPanel,
  canViewSpecification,
  getCalculationLimit,
} from '../roles/permissions'

describe('role permissions', () => {
  it('guest sees atlas/calculator but not specification and add', () => {
    expect(canViewSpecification('guest')).toBe(false)
    expect(canAddSpecItem('guest')).toBe(false)
    expect(getCalculationLimit('guest')).toBe(5)
  })

  it('user sees specification and can add, but not edit/delete/export/import/print', () => {
    expect(canViewSpecification('user')).toBe(true)
    expect(canAddSpecItem('user')).toBe(true)
    expect(getCalculationLimit('user')).toBe(20)
    expect(canEditSpecItem('user')).toBe(false)
    expect(canRemoveSpecItem('user')).toBe(false)
    expect(canExportProject('user')).toBe(false)
    expect(canImportProject('user')).toBe(false)
    expect(canPrintProject('user')).toBe(false)
  })

  it('client can add edit remove but no debug', () => {
    expect(canAddSpecItem('client')).toBe(true)
    expect(canEditSpecItem('client')).toBe(true)
    expect(canRemoveSpecItem('client')).toBe(true)
    expect(canViewDebugPanel('client')).toBe(false)
  })

  it('service sees debug panel and admin sees everything relevant', () => {
    expect(canViewDebugPanel('service')).toBe(true)
    expect(canExportProject('service')).toBe(true)
    expect(canImportProject('service')).toBe(true)
    expect(canPrintProject('service')).toBe(true)
    expect(canViewDebugPanel('admin')).toBe(true)
    expect(canExportProject('admin')).toBe(true)
  })
})
