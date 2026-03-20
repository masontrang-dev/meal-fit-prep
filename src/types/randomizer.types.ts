export type FishVariety = "salmon" | "tilapia" | "cod" | "mahi-mahi";
export type ChickenCut = "thighs" | "breast";
export type CastIronProtein =
  | FishVariety
  | "chicken-thighs"
  | "chicken-breast"
  | "shrimp"
  | "flank-steak"
  | "sirloin-steak";
export type MarinadeTiming = "sunday" | "tuesday" | "season-wednesday";
export type GrainId = "brown-rice" | "quinoa" | "jasmine-rice";
export type LegumeId = "lentils" | "black-beans" | "chickpeas" | "pinto-beans";
export type VegetableId =
  | "broccoli"
  | "asparagus"
  | "zucchini"
  | "green-beans"
  | "cauliflower"
  | "brussels-sprouts"
  | "snap-peas"
  | "bok-choy"
  | "stir-fry-blend";

export interface SaturdayPrepItem {
  protein: string;
  sauce: string;
  sauceName: string;
  instructions: string;
  note: string;
}

export interface GeneratedPlan {
  batchFishVariety: FishVariety;
  batchFishSauce: string;
  batchChickenCut: ChickenCut;
  batchChickenSauce: string;
  castIronProtein: CastIronProtein;
  castIronSauce: string;
  marinadeTiming: MarinadeTiming;
  requiresSundayMarinade: boolean;
  isShrimp: boolean;
  roastingVeg1: VegetableId;
  roastingVeg2: VegetableId;
  grain1: GrainId;
  grain2: GrainId;
  legume: LegumeId;
  generatedAt: string;
  confirmedAt: string | null;
  saturdayPrepRequired: boolean;
  saturdayPrepItems: SaturdayPrepItem[];
  lateGenerationWarning: boolean;
}

export interface WeekHistory {
  weekNumber: number;
  fishVariety: FishVariety;
  fishSauce: string;
  chickenCut: ChickenCut;
  chickenSauce: string;
  castIronProtein: CastIronProtein;
  castIronMarinade: string;
  roastingVeg1: VegetableId;
  roastingVeg2: VegetableId;
  grain1: GrainId;
  grain2: GrainId;
  legume: LegumeId;
  confirmedAt: string;
}

export interface RepeatWindows {
  fishVariety: number;
  fishSauce: number;
  chickenCut: number;
  chickenSauce: number;
  castIronProtein: number;
  castIronMarinade: number;
  roastingVeg1: number;
  roastingVeg2: number;
  grain1: number;
  grain2: number;
  legume: number;
}

export interface FridgeEngineSettings {
  repeatWindows: RepeatWindows;
  steakFrequencyWeeks: number;
  shrimpFrequencyWeeks: number;
}

export interface WeightedOption {
  value: string;
  weight: number;
}
