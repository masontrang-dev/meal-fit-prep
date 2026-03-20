import type {
  GeneratedPlan,
  WeekHistory,
  FridgeEngineSettings,
  WeightedOption,
  FishVariety,
  ChickenCut,
  CastIronProtein,
  SaturdayPrepItem,
} from "@/types/randomizer.types";
import type { Sauce } from "@/types/meal.types";
import { allSauces } from "@/data/sauces";

export const fishVarieties: FishVariety[] = ["salmon", "tilapia", "cod", "mahi-mahi"];

export const fishSauces = [
  "lemon-garlic",
  "cajun-spice",
  "soy-ginger-glaze",
  "lemon-dill",
  "mango-salsa",
  "garlic-butter",
  "herb-butter",
  "miso-glaze",
];

export const chickenSauces = [
  "italian-herb",
  "honey-mustard",
  "mexican-dry-rub",
  "peanut-sauce",
  "buffalo-ranch",
  "teriyaki-glaze",
  "lemon-herb",
];

export const castIronMarinades = [
  "soy-garlic-ginger",
  "smoked-paprika-garlic",
  "lime-cumin",
  "balsamic-herb",
  "salt-pepper",
  "garlic-herb-butter",
  "red-wine-reduction",
  "chimichurri",
  "soy-garlic-pan-sauce",
];

export const shrimpSauces = [
  "shrimp-garlic-butter",
  "shrimp-cajun-butter",
  "shrimp-soy-garlic-ginger",
  "shrimp-lime-cumin",
];

export const roastingVegetables: WeightedOption[] = [
  { value: "broccoli", weight: 0.2 },
  { value: "asparagus", weight: 0.12 },
  { value: "zucchini", weight: 0.12 },
  { value: "green-beans", weight: 0.12 },
  { value: "cauliflower", weight: 0.12 },
  { value: "brussels-sprouts", weight: 0.1 },
  { value: "snap-peas", weight: 0.1 },
  { value: "bok-choy", weight: 0.07 },
  { value: "stir-fry-blend", weight: 0.05 },
];

export const grains: WeightedOption[] = [
  { value: "brown-rice", weight: 0.45 },
  { value: "quinoa", weight: 0.35 },
  { value: "jasmine-rice", weight: 0.2 },
];

export const legumes: WeightedOption[] = [
  { value: "lentils", weight: 0.45 },
  { value: "black-beans", weight: 0.25 },
  { value: "chickpeas", weight: 0.2 },
  { value: "pinto-beans", weight: 0.1 },
];

export const sundaySafeMarinades = [
  "soy-garlic-ginger",
  "smoked-paprika-garlic",
  "salt-pepper",
  "garlic-herb-butter",
  "red-wine-reduction",
  "chimichurri",
  "soy-garlic-pan-sauce",
  "shrimp-garlic-butter",
  "shrimp-cajun-butter",
];

function pickFrom(
  slotKey: string,
  pool: string[],
  history: WeekHistory[],
  settings: FridgeEngineSettings,
): string {
  const window = (settings.repeatWindows as any)[slotKey] ?? 2;
  const recentlyUsed = history
    .slice(-window)
    .map((w) => (w as any)[slotKey])
    .filter((v): v is string => v !== undefined);
  let eligible = pool.filter((item) => !recentlyUsed.includes(item));

  let relaxed = window;
  while (eligible.length === 0 && relaxed > 0) {
    relaxed--;
    const relaxedRecent = history
      .slice(-relaxed)
      .map((w) => (w as any)[slotKey])
      .filter((v): v is string => v !== undefined);
    eligible = pool.filter((item) => !relaxedRecent.includes(item));
  }

  if (eligible.length === 0) return pool[0]!;
  return eligible[Math.floor(Math.random() * eligible.length)]!;
}

function pickWeighted(
  slotKey: string,
  pool: WeightedOption[],
  history: WeekHistory[],
  settings: FridgeEngineSettings,
): string {
  const window = (settings.repeatWindows as any)[slotKey] ?? 2;
  const recentlyUsed = history
    .slice(-window)
    .map((w) => (w as any)[slotKey])
    .filter((v): v is string => v !== undefined);
  let eligible = pool.filter((item) => !recentlyUsed.includes(item.value));

  if (eligible.length === 0) eligible = pool;

  const totalWeight = eligible.reduce((sum, item) => sum + item.weight, 0);
  let rand = Math.random() * totalWeight;
  for (const item of eligible) {
    rand -= item.weight;
    if (rand <= 0) return item.value;
  }
  return eligible[eligible.length - 1]!.value;
}

function getWeeksSince(proteinType: string, history: WeekHistory[]): number {
  for (let i = history.length - 1; i >= 0; i--) {
    const week = history[i];
    if (!week) continue;
    if (proteinType === "steak") {
      if (week.castIronProtein === "flank-steak" || week.castIronProtein === "sirloin-steak") {
        return history.length - i;
      }
    } else if (proteinType === "shrimp") {
      if (week.castIronProtein === "shrimp") {
        return history.length - i;
      }
    }
  }
  return 999;
}

function buildCastIronPool({
  fishVarieties,
  batchFishVariety,
  batchChickenCut,
  steakEligible,
  shrimpEligible,
  history,
  settings,
}: {
  fishVarieties: FishVariety[];
  batchFishVariety: FishVariety;
  batchChickenCut: ChickenCut;
  steakEligible: boolean;
  shrimpEligible: boolean;
  history: WeekHistory[];
  settings: FridgeEngineSettings;
}): CastIronProtein[] {
  const pool: CastIronProtein[] = [];

  fishVarieties.filter((f) => f !== batchFishVariety).forEach((f) => pool.push(f));

  if (batchChickenCut !== "thighs") pool.push("chicken-thighs");
  if (batchChickenCut !== "breast") pool.push("chicken-breast");

  if (steakEligible) {
    pool.push("flank-steak");
    pool.push("sirloin-steak");
  }

  if (shrimpEligible) pool.push("shrimp");

  const window = settings.repeatWindows.castIronProtein ?? 2;
  const recentlyUsed = history.slice(-window).map((w) => w.castIronProtein);
  const filtered = pool.filter((p) => !recentlyUsed.includes(p));

  return filtered.length > 0 ? filtered : pool;
}

function getSauceById(id: string): Sauce {
  const sauce = allSauces.find((s) => s.id === id);
  if (!sauce) throw new Error(`Sauce not found: ${id}`);
  return sauce;
}

export function runFridgeEngine(
  history: WeekHistory[],
  settings: FridgeEngineSettings,
  overrides?: Partial<Record<keyof GeneratedPlan, { excludeOvernight?: boolean }>>,
): GeneratedPlan {
  const batchFishVariety = pickFrom("fishVariety", fishVarieties, history, settings) as FishVariety;

  const filteredFishSauces = overrides?.batchFishSauce?.excludeOvernight
    ? fishSauces.filter((id) => getSauceById(id).marinating !== "overnight")
    : fishSauces;
  const batchFishSauce = pickFrom("fishSauce", filteredFishSauces, history, settings);

  const batchChickenCut = pickFrom(
    "chickenCut",
    ["thighs", "breast"],
    history,
    settings,
  ) as ChickenCut;

  const filteredChickenSauces = overrides?.batchChickenSauce?.excludeOvernight
    ? chickenSauces.filter((id) => getSauceById(id).marinating !== "overnight")
    : chickenSauces;
  const batchChickenSauce = pickFrom("chickenSauce", filteredChickenSauces, history, settings);

  const weeksSinceSteak = getWeeksSince("steak", history);
  const weeksSinceShrimp = getWeeksSince("shrimp", history);

  const castIronPool = buildCastIronPool({
    fishVarieties,
    batchFishVariety,
    batchChickenCut,
    steakEligible: weeksSinceSteak >= settings.steakFrequencyWeeks,
    shrimpEligible: weeksSinceShrimp >= settings.shrimpFrequencyWeeks,
    history,
    settings,
  });

  const castIronProtein = pickFrom(
    "castIronProtein",
    castIronPool,
    history,
    settings,
  ) as CastIronProtein;

  const isShrimp = castIronProtein === "shrimp";
  const saucePool = isShrimp ? shrimpSauces : castIronMarinades;

  const filteredCastIronSauces = overrides?.castIronSauce?.excludeOvernight
    ? saucePool.filter((id) => getSauceById(id).marinating !== "overnight")
    : saucePool;
  const castIronSauce = pickFrom("castIronMarinade", filteredCastIronSauces, history, settings);

  const marinadeTiming = isShrimp
    ? ("season-wednesday" as const)
    : sundaySafeMarinades.includes(castIronSauce)
      ? ("sunday" as const)
      : ("tuesday" as const);

  const requiresSundayMarinade = !isShrimp && sundaySafeMarinades.includes(castIronSauce);

  const roastingVeg1 = pickWeighted("roastingVeg1", roastingVegetables, history, settings);
  const eligibleVeg2 = roastingVegetables.filter((v) => v.value !== roastingVeg1);
  const roastingVeg2 = pickWeighted("roastingVeg2", eligibleVeg2, history, settings);

  const grain1 = pickWeighted("grain1", grains, history, settings);
  const eligibleGrain2 = grains.filter((g) => g.value !== grain1);
  const grain2 = pickWeighted("grain2", eligibleGrain2, history, settings);

  const legume = pickWeighted("legume", legumes, history, settings);

  // Step 9 — Detect overnight marinade requirements
  const chickenSauceData = getSauceById(batchChickenSauce);
  const castIronSauceData = getSauceById(castIronSauce);

  const chickenNeedsOvernight = chickenSauceData.marinating === "overnight";

  const castIronNeedsOvernight =
    marinadeTiming !== "season-wednesday" && castIronSauceData.marinating === "overnight";

  const saturdayPrepRequired = chickenNeedsOvernight || castIronNeedsOvernight;

  const saturdayPrepItems: SaturdayPrepItem[] = [
    ...(chickenNeedsOvernight
      ? [
          {
            protein: batchChickenCut,
            sauce: batchChickenSauce,
            sauceName: chickenSauceData.name,
            instructions: chickenSauceData.applicationNote,
            note: "Batch chicken — marinate Saturday night for Sunday bake",
          },
        ]
      : []),
    ...(castIronNeedsOvernight && marinadeTiming === "sunday"
      ? [
          {
            protein: castIronProtein,
            sauce: castIronSauce,
            sauceName: castIronSauceData.name,
            instructions: castIronSauceData.applicationNote,
            note: "Cast iron protein — marinate Saturday night. Sunday-safe marinade — stays in fridge until Wednesday.",
          },
        ]
      : []),
  ];

  // Step 10 — Detect late generation (generated on Sunday)
  const generatedOnSunday = new Date().getDay() === 0;

  const lateGenerationWarning = generatedOnSunday && saturdayPrepRequired;

  return {
    batchFishVariety,
    batchFishSauce,
    batchChickenCut,
    batchChickenSauce,
    castIronProtein,
    castIronSauce,
    marinadeTiming,
    requiresSundayMarinade,
    isShrimp,
    roastingVeg1: roastingVeg1 as any,
    roastingVeg2: roastingVeg2 as any,
    grain1: grain1 as any,
    grain2: grain2 as any,
    legume: legume as any,
    generatedAt: new Date().toISOString(),
    confirmedAt: null,
    saturdayPrepRequired,
    saturdayPrepItems,
    lateGenerationWarning,
  };
}
