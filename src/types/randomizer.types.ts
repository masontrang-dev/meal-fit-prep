export type FishVariety = 'salmon' | 'tilapia' | 'cod' | 'mahi-mahi'
export type ChickenCut = 'thighs' | 'breast'
export type CastIronProtein =
  | FishVariety
  | 'chicken-thighs'
  | 'chicken-breast'
  | 'shrimp'
  | 'flank-steak'
  | 'sirloin-steak'
export type MarinadeTiming = 'sunday' | 'tuesday' | 'season-wednesday'
export type GrainId = 'brown-rice' | 'quinoa' | 'jasmine-rice'
export type LegumeId = 'lentils' | 'black-beans' | 'chickpeas' | 'pinto-beans'
export type VegetableId =
  | 'broccoli'
  | 'asparagus'
  | 'zucchini'
  | 'green-beans'
  | 'cauliflower'
  | 'brussels-sprouts'
  | 'snap-peas'
  | 'bok-choy'
  | 'stir-fry-blend'

export interface GeneratedPlan {
  batchFishVariety: FishVariety
  batchFishSauce: string
  batchChickenCut: ChickenCut
  batchChickenSauce: string
  castIronProtein: CastIronProtein
  castIronSauce: string
  marinadeTiming: MarinadeTiming
  requiresSundayMarinade: boolean
  isShrimp: boolean
  roastingVeg: VegetableId
  grain: GrainId
  legume: LegumeId
  generatedAt: string
  confirmedAt: string | null
}

export interface WeekHistory {
  weekNumber: number
  fishVariety: FishVariety
  fishSauce: string
  chickenCut: ChickenCut
  chickenSauce: string
  castIronProtein: CastIronProtein
  castIronMarinade: string
  roastingVeg: VegetableId
  grain: GrainId
  legume: LegumeId
  confirmedAt: string
}

export interface RepeatWindows {
  fishVariety: number
  fishSauce: number
  chickenCut: number
  chickenSauce: number
  castIronProtein: number
  castIronMarinade: number
  roastingVeg: number
  grain: number
  legume: number
}

export interface FridgeEngineSettings {
  repeatWindows: RepeatWindows
  steakFrequencyWeeks: number
  shrimpFrequencyWeeks: number
}

export interface WeightedOption {
  value: string
  weight: number
}
