export type ProteinType = "fish" | "chicken-thigh" | "chicken-breast" | "steak";
export type GrainType = "brown-rice" | "quinoa" | "jasmine-rice";
export type LegumeType = "lentils" | "pinto-beans" | "black-beans";
export type BadgeVariant = "best" | "good" | "make";
export type CalloutVariant = "green" | "orange" | "blue" | "gold" | "red" | "plum" | "cast";
export type StorageLocation = "pantry" | "fridge";
export type MarinadeId =
  | "soy-garlic-ginger"
  | "smoked-paprika-garlic"
  | "lime-cumin"
  | "balsamic-herb";
export type MarinadeTiming = "sunday" | "tuesday";

export interface Ingredient {
  amount: string;
  name: string;
}

export interface Protein {
  id: ProteinType;
  name: string;
  icon: string;
  mealsPerWeek: string;
  weeklyQuantity: string;
  buyGuidance: string;
  cookMethod: string;
  storageNote: string;
  stats: string[];
}

export interface GrainOrLegume {
  id: GrainType | LegumeType;
  name: string;
  category: "grain" | "legume";
  rinseWarning?: boolean;
  keyNutrients: string;
  cookMethod: string;
  cookTime: string;
  weeklyUse: string;
  badge: BadgeVariant;
}

export interface Vegetable {
  name: string;
  tag: "default" | "swap" | "wildcard";
  prepNote: string;
  cookNote: string;
}

export interface ShoppingItem {
  id: string;
  category: string;
  name: string;
  quantity: string;
}

export interface PrepStep {
  id: string;
  elapsedMin: number | null;
  duration: string;
  title: string;
  body: string;
  dotColor: string;
  dotLabel?: string;
}

export interface EmergencyMeal {
  num: string;
  title: string;
  instructions: string;
}

export interface MealEntry {
  proteinType: ProteinType | "cast-iron" | "flex";
  label: string;
  detail: string;
}

export interface MealPlanDay {
  day: string;
  dayNote?: string;
  lunch: MealEntry;
  dinner: MealEntry;
  grain: string;
}

export interface Marinade {
  id: MarinadeId;
  name: string;
  bestFor: string;
  timing: MarinadeTiming;
  ingredients: Ingredient[];
  note: string;
}

export interface SauceStorageInfo {
  locations: StorageLocation[];
  batchable: boolean;
  shelfLife: string;
  note: string;
}

export interface Sauce {
  id: string;
  name: string;
  bestFor: string;
  proteinCategory: "fish" | "chicken" | "steak";
  ingredients: Ingredient[];
  storage: SauceStorageInfo;
  applicationNote: string;
}

export interface NutrientRow {
  nutrient: string;
  status: "good" | "watch" | "low";
  statusLabel: string;
  sources: string;
  notes: string;
}

export interface StorageRow {
  food: string;
  icon: string;
  window: string;
  notes: string;
}

export interface BatchRecipe {
  ingredients: Ingredient[];
  steps: string[];
  makes: string;
  keeps: string;
  reheating: string;
  alternativeMethod: string | null;
}

export interface BreakfastNutrients {
  protein: string;
  fiber: string;
  omega3s: string;
  antioxidants: string;
  glycemicIndex: string;
  morningPrepTime: string;
}

export interface Breakfast {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  description: string;
  batchRecipe: BatchRecipe;
  nutrients: BreakfastNutrients;
  toppings: string[];
  granolaNotes?: string;
}
