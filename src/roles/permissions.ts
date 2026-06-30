import type { UserRole } from '../types'

export type LockedFeature =
  | 'specification'
  | 'add'
  | 'edit'
  | 'remove'
  | 'files'
  | 'export'
  | 'import'
  | 'print'
  | 'debug'
  | 'camduct'

const allRoles: UserRole[] = ['guest', 'user', 'client', 'service', 'admin']
const unlimited = null

export function canViewAtlas(role: UserRole) {
  return allRoles.includes(role)
}

export function canViewCalculator(role: UserRole) {
  return allRoles.includes(role)
}

export function canUseCalculator(role: UserRole) {
  return allRoles.includes(role)
}

export function canViewSpecification(role: UserRole) {
  return role !== 'guest'
}

export function canAddSpecItem(role: UserRole) {
  return role !== 'guest'
}

export function canEditSpecItem(role: UserRole) {
  return ['client', 'service', 'admin'].includes(role)
}

export function canRemoveSpecItem(role: UserRole) {
  return ['client', 'service', 'admin'].includes(role)
}

export function canUseProjectFiles(role: UserRole) {
  return ['service', 'admin'].includes(role)
}

export function canExportProject(role: UserRole) {
  return ['service', 'admin'].includes(role)
}

export function canImportProject(role: UserRole) {
  return ['service', 'admin'].includes(role)
}

export function canPrintProject(role: UserRole) {
  return ['service', 'admin'].includes(role)
}

export function canViewInternalLogic(role: UserRole) {
  return ['service', 'admin'].includes(role)
}

export function canViewFormulaDetails(role: UserRole) {
  return role === 'admin'
}

export function canViewCamductMode(role: UserRole) {
  return ['service', 'admin'].includes(role)
}

export function canViewDebugPanel(role: UserRole) {
  return ['service', 'admin'].includes(role)
}

export function getCalculationLimit(role: UserRole) {
  if (role === 'guest') return 5
  if (role === 'user') return 20
  return unlimited
}

export function getLockedFeatureMessage(role: UserRole, feature: LockedFeature) {
  return `locked.${role}.${feature}`
}
