export type NavSection = 'meal' | 'fitness'

export interface NavItem {
  label: string
  path: string
  section: NavSection
}
