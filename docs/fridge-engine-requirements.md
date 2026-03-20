# FridgeEngine — Requirements Document

> **Document Type:** Feature addition to existing meal prep app requirements
> **Depends on:** `meal-prep-technical-requirements.md`, `meal-prep-app-requirements.md`, `breakfast-tab-requirements.md`
> **Scope:** Randomizer engine, new sauces, chickpea legume addition, shrimp protein, favorite plan system, dynamic shopping list, all application changes outside the engine
> **Engine Name:** FridgeEngine
> **Version:** 1.0 — March 2026

---

## 1. Overview

The FridgeEngine generates a weekly ingredient selection (Sunday–Friday) by filling a defined set of slots from constrained pools. It respects user-configurable no-repeat windows, protein exclusion rules, frequency settings, and weighted probabilities.

The output is not a day-by-day meal schedule. It is a **weekly fridge summary** — what proteins, sauces, vegetables, grains, and legumes are available that week. The user composes their own meals from whatever is in the fridge. The only fixed anchor is Wednesday cast iron night.

Saturday is excluded from generation and remains a permanent flex/dine-out slot. A user toggle to include Saturday in future generation is noted in the backlog.

---

## 2. Slot Definitions

The FridgeEngine fills 7 slots each week:

| Slot | Name | Description |
|---|---|---|
| 1 | Batch Fish | 1 fish variety + 1 fish sauce — cooked Sunday, eat by Day 3 |
| 2 | Batch Chicken | Thighs or breast + 1 chicken sauce — cooked Sunday, eat by Day 5 |
| 3 | Cast Iron Protein | 1 protein + 1 marinade or pan sauce — cooked Wednesday evening |
| 4 | Roasting Vegetable | 1 vegetable — roasted Sunday, available all week |
| 5 | Grain | 1 grain — cooked Sunday, available all week |
| 6 | Legume | 1 legume — cooked Sunday, available all week |
| 7 | Shrimp Flag | Boolean — indicates whether shrimp is in batch or cast iron slot |

---

## 3. Protein Pools

### 3.1 Batch Fish Pool

| Variety | Notes |
|---|---|
| Salmon | Frozen fillets, Costco bag recommended |
| Tilapia | Mild, inexpensive, versatile |
| Cod | Firm texture, holds up well baked |
| Mahi-Mahi | Heartier, slightly firmer texture |

### 3.2 Batch Chicken Pool

| Option | Notes |
|---|---|
| Thighs | More forgiving, stays moist when reheated, recommended for batch |
| Breast | Leaner, better for weight loss, best eaten within 3–4 days |

The engine alternates thighs and breast naturally through the no-repeat logic. Chicken cut is tracked in history independently.

### 3.3 Cast Iron Protein Pool

| Protein | Type | Notes |
|---|---|---|
| Any fish variety | Fish | Must not be same variety as batch fish that week |
| Shrimp | Seafood | Uses pan sauce only — no Sunday marinade. Subject to frequency setting. |
| Chicken Thighs | Chicken | Must not be same cut as batch chicken that week |
| Chicken Breast | Chicken | Must not be same cut as batch chicken that week |
| Flank Steak | Red Meat | Subject to frequency setting |
| Sirloin Steak | Red Meat | Subject to frequency setting |

### 3.4 Shrimp

Shrimp follows the same cooking pattern as fish with a shorter consumption window:

```
Sunday batch cook  → eat Sunday through Tuesday (3 days)
Wednesday cast iron → eat Wednesday through Friday (3 days)
```

When shrimp is in any slot:
- Shopping list dynamically adds: Frozen raw shrimp, peeled and deveined — 1–1.5 lbs
- Shrimp uses pan sauces only (Garlic Butter, Cajun Butter, Soy Garlic Ginger, Lime Cumin)
- No Sunday marinade bag step — season just before cooking
- Prep Day tab renders shrimp-specific cast iron instruction variant

---

## 4. Sauce & Marinade Pools

### 4.1 Fish Sauce Pool

| Sauce | Best For | Batch | Storage |
|---|---|---|---|
| Lemon Garlic | All fish | Yes | Fridge 2–3 weeks (garlic powder version) |
| Cajun Spice Rub | Tilapia, cod | Yes — dry jar | Pantry indefinitely |
| Soy Ginger Glaze | Salmon especially | Yes | Fridge 2–3 weeks |
| Lemon Dill | Salmon, cod | Yes | Fridge 1 week |
| Mango Salsa | White fish, salmon | No — make fresh | Fridge 3 days |
| Garlic Butter | Any fish | No — make fresh | Fridge 5 days |
| Herb Butter | Any fish | No — make fresh | Fridge 5 days |
| Miso Glaze | Salmon especially | Yes | Fridge 2 weeks |

### 4.2 Chicken Sauce Pool

| Sauce | Best For | Batch | Storage |
|---|---|---|---|
| Italian Herb | Sunday batch, thighs or breast | Yes — dry base | Pantry indefinitely |
| Honey Mustard | Thighs | Yes | Fridge 2–3 weeks |
| Mexican Dry Rub | Bowl nights | Yes — dry jar | Pantry indefinitely |
| Peanut Sauce | Thighs | Yes | Fridge 1 week |
| Buffalo-Ranch | Breast or thighs | Yes | Fridge 1 week |
| Teriyaki Glaze | Thighs or breast | Yes | Fridge 2 weeks |
| Lemon Herb | Thighs or breast | Yes (garlic powder version) | Fridge 2 weeks |

### 4.3 Cast Iron Marinade Pool

Used for chicken and steak in the cast iron slot. Not used for shrimp.

| Marinade | Best For | Timing | Notes |
|---|---|---|---|
| Soy Garlic Ginger | Chicken thighs or breast | ✅ Sunday safe | Oil + soy based, no significant acid |
| Smoked Paprika Garlic | Flank steak | ✅ Sunday safe | Oil based, no acid |
| Lime Cumin | Chicken or steak | ⚠️ Tuesday only | Citrus acid — max 24 hrs chicken, 48 hrs steak |
| Balsamic Herb | Chicken thighs or sirloin | ⚠️ Tuesday only | Vinegar based — max 48 hrs |
| Classic Salt & Pepper | Any steak | ✅ Sunday safe | Day-of seasoning fine too |
| Garlic Herb Butter | Steak | ✅ Sunday safe | Pan finish — not a marinade |
| Red Wine Reduction | Steak | ✅ Sunday safe | Pan sauce — build after cooking |
| Fresh Chimichurri | Flank steak | ✅ Sunday safe | Spoon over at serving |
| Soy Garlic Pan Sauce | Steak or chicken | ✅ Sunday safe | Deglaze pan after cooking |

### 4.4 Shrimp Sauce Pool

Pan sauces only — built in the cast iron pan after shrimp is cooked. Never used as a marinade.

| Sauce | Character |
|---|---|
| Garlic Butter | Classic, rich, pairs with any grain |
| Cajun Butter | Bold, spicy, pairs with quinoa and bell pepper |
| Soy Garlic Ginger | Asian-leaning, pairs with rice and bok choy |
| Lime Cumin | Mexican-leaning, pairs with black beans and jasmine rice |

---

## 5. New Sauce Recipes

### 5.1 Herb Butter — Fish

```
Name: Herb Butter
For: Any fish — baked or cast iron
Type: Finishing sauce / baste
Batch: No — make fresh weekly
Storage: 🧊 Fridge — 5 days

Ingredients (feeds 2):
  · 2 tbsp unsalted butter
  · 1 tbsp olive oil
  · 2 garlic cloves, minced
  · 1 tsp fresh or dried thyme
  · 1 tsp fresh or dried parsley
  · Juice of ½ lemon
  · ¼ tsp salt
  · ¼ tsp black pepper

Method:
  Melt butter with olive oil in small pan over medium heat.
  Add garlic, cook 60 seconds until fragrant.
  Add herbs, lemon juice, salt, and pepper.
  Spoon over fish for the last 3 minutes of baking,
  or finish cast iron fish with it directly in the pan.

Pairs with: All fish varieties, especially cod and mahi-mahi.
            Brown rice, quinoa, asparagus, green beans.
```

### 5.2 Miso Glaze — Fish

```
Name: Miso Glaze
For: Salmon especially — baked
Type: Glaze — applied before baking
Batch: Yes
Storage: 🧊 Fridge · 📦 Batchable — keeps 2 weeks.
         White miso paste keeps months refrigerated.

Ingredients (feeds 2):
  · 2 tbsp white miso paste
  · 1 tbsp low-sodium soy sauce
  · 1 tbsp honey
  · 1 tbsp rice vinegar
  · 1 tsp sesame oil
  · ½ tsp ground ginger

Method:
  Whisk all ingredients together.
  Spread over fish and marinate 30 min minimum
  (up to 4 hours refrigerated).
  Bake at 400°F for 12–15 min.
  Watch carefully — honey and miso can burn at high heat.
  Optional: broil last 2 minutes for a caramelized finish.

Pairs with: Salmon, mahi-mahi. Quinoa, brown rice,
            bok choy, snap peas, edamame.
Shopping note: Add white miso paste to pantry staples
               once this sauce enters rotation.
```

### 5.3 Teriyaki Glaze — Chicken

```
Name: Teriyaki Glaze
For: Chicken thighs or breast — Sunday batch
Type: Marinade and basting sauce
Batch: Yes
Storage: 🧊 Fridge · 📦 Batchable — keeps 2 weeks
Sunday marinade: Yes — 2+ hours or overnight

Ingredients (feeds 2, Sunday batch):
  · 3 tbsp low-sodium soy sauce
  · 1 tbsp honey
  · 1 tbsp rice vinegar
  · 1 tsp sesame oil
  · ½ tsp garlic powder
  · ½ tsp ground ginger
  · 1 tsp cornstarch mixed with 1 tbsp cold water
    (optional — for thickened glaze finish)

Method:
  Combine all ingredients except cornstarch slurry.
  Marinate chicken overnight or minimum 2 hours.
  Bake at 375°F as normal.
  Optional glazed finish: heat remaining marinade in a small
  saucepan over medium heat, add cornstarch slurry, stir until
  thickened, brush over chicken in last 5 minutes of baking.

Pairs with: Brown rice, quinoa, snap peas, bok choy,
            stir-fry veg blend, edamame.
Note: Pairs naturally with Asian cast iron marinades
      the same week (Soy Garlic Ginger, Soy Ginger Glaze)
      for a cohesive weekly flavor theme without repetition.
Shopping note: Add rice vinegar and cornstarch to pantry
               staples once this sauce enters rotation.
```

### 5.4 Lemon Herb — Chicken

```
Name: Lemon Herb
For: Chicken thighs or breast — Sunday batch
Type: Wet marinade
Batch: Yes (garlic powder version)
Storage: 🧊 Fridge — 1 week with fresh garlic,
                      2 weeks with garlic powder substitution
Sunday marinade: Yes — 2+ hours or overnight

Ingredients (feeds 2, Sunday batch):
  · 2 tbsp olive oil
  · Juice of 1 lemon
  · Zest of ½ lemon
  · 1 tsp dried oregano
  · 1 tsp dried thyme
  · 3 garlic cloves, minced
    (or ¾ tsp garlic powder for longer batch shelf life)
  · ½ tsp salt
  · ¼ tsp black pepper
  · 1 tbsp fresh parsley, chopped (optional)

Method:
  Combine all ingredients.
  Marinate chicken 2 hours minimum, overnight preferred.
  Bake thighs at 375°F for 35–40 min,
  breast at 375°F for 25–30 min.
  Bright, clean flavor — the most versatile chicken
  sauce in the pool.

Pairs with: Quinoa, jasmine rice, asparagus, zucchini,
            green beans, snap peas.
Note: Most Mediterranean of the chicken sauces.
      Pairs naturally with chimichurri steak or herb
      butter fish weeks for a cohesive weekly flavor theme.
```

---

## 6. Vegetable Pool

### 6.1 Roasting Vegetables (Randomized Slot)

One variety selected per week. Broccoli weighted higher as the most available pre-cut option.

| Vegetable | Weight | Prep Notes |
|---|---|---|
| Broccoli Florets | 20% | Pre-cut bags. Roast 425°F 18 min or steam 4 min. |
| Asparagus | 12% | Snap off woody ends only. Roast 425°F 12 min. |
| Zucchini | 12% | Pre-sliced bags available. Roast 400°F 15 min. |
| Green Beans | 12% | Frozen bags, steam 4 min. Zero prep. |
| Cauliflower | 12% | Pre-cut or frozen. Roast 400°F 20 min. |
| Brussels Sprouts | 10% | Halve and roast 400°F 22 min. |
| Snap Peas | 10% | Pre-washed bags. Raw or sauté 3 min. |
| Bok Choy | 7% | Baby bok choy halved. Sauté with garlic 5 min. |
| Frozen Stir-Fry Blend | 5% | Steam or sauté 5 min. Maximum convenience. |

### 6.2 Fixed Vegetables (Not Randomized)

These appear every week regardless of the engine output:

| Vegetable | Role |
|---|---|
| Yellow onion | Aromatics — lentils and cast iron pan |
| Garlic | Aromatics — all proteins and grains |
| Bell peppers | Cast iron pan veg — pre-sliced Sunday |
| Mushrooms | Cast iron pan veg — pre-sliced Sunday |
| Pre-washed salad kits | Lunch sides — always on standing shopping list |
| Sweet potatoes | Side or base — standing shopping list |

---

## 7. Grain Pool

| Grain | Weight | Cook | No-Repeat Window |
|---|---|---|---|
| Brown Rice | 45% | Rice cooker 45–50 min | 2 weeks |
| Quinoa | 35% | Rice cooker or stovetop 15–18 min. Rinse first. | 2 weeks |
| Jasmine Rice | 20% | Rice cooker 20 min | 2 weeks |

All grains cooked Sunday. All keep 5–6 days refrigerated.

---

## 8. Legume Pool

| Legume | Weight | Cook | No-Repeat Window |
|---|---|---|---|
| Lentils | 45% | Stovetop 22 min — sauté onion + garlic, add lentils + broth + cumin | 3 weeks |
| Black Beans | 25% | Canned — drain, rinse, optionally warm | 3 weeks |
| Chickpeas | 20% | Canned — drain, rinse. Optional: roast at 425°F 25 min | 3 weeks |
| Pinto Beans | 10% | Dried — soak overnight, simmer 1 hr. Freeze in portions. | 3 weeks |

All legumes cooked or prepared Sunday.

---

## 9. Exclusion & Constraint Rules

### 9.1 Protein Exclusion Rules

```
Rule 1 — Fish variety exclusion:
  If batch fish = salmon → cast iron cannot be salmon
  Any other fish variety is permitted in cast iron
  (batch tilapia + cast iron salmon = allowed ✓)
  (batch salmon + cast iron salmon = not allowed ✗)

Rule 2 — Chicken cut exclusion:
  If batch chicken = thighs → cast iron cannot be thighs
  If batch chicken = breast → cast iron cannot be breast
  (batch thighs + cast iron breast = allowed ✓)
  (batch breast + cast iron breast = not allowed ✗)

Rule 3 — Shrimp weekly exclusion:
  Shrimp cannot appear in both batch and cast iron
  slots in the same week.
  (batch shrimp + cast iron shrimp = not allowed ✗)

Rule 4 — Steak frequency:
  Steak only eligible in cast iron slot when
  weeks since last steak >= steakFrequencyWeeks setting.
  Default: 2 weeks.

Rule 5 — Shrimp frequency:
  Shrimp only eligible when
  weeks since last shrimp >= shrimpFrequencyWeeks setting.
  Default: 3 weeks.
```

### 9.2 Marinade / Sauce Timing Rules

```
Sunday-safe marinades (can marinate from Sunday → Wednesday):
  Soy Garlic Ginger, Smoked Paprika Garlic,
  Classic Salt & Pepper, Garlic Herb Butter,
  Red Wine Reduction, Fresh Chimichurri,
  Soy Garlic Pan Sauce

Tuesday-only marinades (marinate Tuesday evening only):
  Lime Cumin     — citrus acid, max 24 hrs chicken / 48 hrs steak
  Balsamic Herb  — vinegar based, max 48 hrs

Shrimp — no marinade ever:
  Season just before cooking Wednesday.
  Build pan sauce in cast iron after shrimp is cooked.
  No Sunday bag step when shrimp is in cast iron slot.
```

---

## 10. No-Repeat Windows — Defaults & Adjustability

All windows are stored in `settingsStore` under the `fridgeEngine` namespace and are independently user-adjustable via the Settings view.

| Slot | Default Window | Min | Max |
|---|---|---|---|
| Fish variety | 2 weeks | 1 | 8 |
| Fish sauce | 3 weeks | 1 | 8 |
| Chicken cut | 1 week | 1 | 4 |
| Chicken sauce | 3 weeks | 1 | 8 |
| Cast iron protein | 2 weeks | 1 | 8 |
| Cast iron marinade | 3 weeks | 1 | 8 |
| Roasting vegetable | 2 weeks | 1 | 8 |
| Grain | 2 weeks | 1 | 8 |
| Legume | 3 weeks | 1 | 8 |

### 10.1 Fallback Rule

If applying the no-repeat window produces an empty eligible pool, the engine relaxes the window by 1 week and retries. This repeats until at least 1 item is eligible. If the pool has only 1 item total, that item is always returned regardless of history. This fallback is silent — no user-facing indication.

---

## 11. Engine Algorithm

```ts
function runFridgeEngine(history: WeekHistory[], settings: FridgeEngineSettings): GeneratedPlan {

  // Step 1 — Batch fish
  const batchFishVariety = pickFrom('fishVariety', fishVarieties, history, settings)
  const batchFishSauce   = pickFrom('fishSauce', fishSauces, history, settings)

  // Step 2 — Batch chicken
  const batchChickenCut   = pickFrom('chickenCut', ['thighs', 'breast'], history, settings)
  const batchChickenSauce = pickFrom('chickenSauce', chickenSauces, history, settings)

  // Step 3 — Cast iron protein
  const weeksSinceSteak  = getWeeksSince('steak', history)
  const weeksSinceShrimp = getWeeksSince('shrimp', history)

  const castIronPool = buildCastIronPool({
    fishVarieties,
    batchFishVariety,
    batchChickenCut,
    steakEligible:  weeksSinceSteak  >= settings.steakFrequencyWeeks,
    shrimpEligible: weeksSinceShrimp >= settings.shrimpFrequencyWeeks,
    history,
    settings,
  })

  const castIronProtein = pickFrom('castIronProtein', castIronPool, history, settings)

  // Step 4 — Cast iron marinade or sauce
  const isShrimp    = castIronProtein === 'shrimp'
  const saucePool   = isShrimp ? shrimpSauces : castIronMarinades
  const castIronSauce = pickFrom('castIronMarinade', saucePool, history, settings)

  // Step 5 — Determine marinade timing
  const sundaySafeSauces = [
    'soy-garlic-ginger', 'smoked-paprika-garlic', 'classic-salt-pepper',
    'garlic-herb-butter', 'red-wine-reduction', 'fresh-chimichurri', 'soy-garlic-pan-sauce',
    'garlic-butter', 'cajun-butter', // shrimp pan sauces
  ]
  const requiresSundayMarinade = !isShrimp && sundaySafeSauces.includes(castIronSauce)
  const marinadeTiming = isShrimp
    ? 'season-wednesday'
    : sundaySafeSauces.includes(castIronSauce)
      ? 'sunday'
      : 'tuesday'

  // Step 6 — Roasting vegetable
  const roastingVeg = pickWeighted('roastingVeg', roastingVegetables, history, settings)

  // Step 7 — Grain
  const grain = pickWeighted('grain', grains, history, settings)

  // Step 8 — Legume
  const legume = pickWeighted('legume', legumes, history, settings)

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
    roastingVeg,
    grain,
    legume,
    generatedAt: new Date().toISOString(),
    confirmedAt: null,
  }
}
```

### 11.1 `pickFrom` Helper

```ts
function pickFrom(
  slotKey: string,
  pool: string[],
  history: WeekHistory[],
  settings: FridgeEngineSettings
): string {
  const window = settings.repeatWindows[slotKey] ?? 2
  const recentlyUsed = history.slice(-window).map(w => w[slotKey])
  let eligible = pool.filter(item => !recentlyUsed.includes(item))

  // Fallback — relax window until at least 1 item eligible
  let relaxed = window
  while (eligible.length === 0 && relaxed > 0) {
    relaxed--
    const relaxedRecent = history.slice(-relaxed).map(w => w[slotKey])
    eligible = pool.filter(item => !relaxedRecent.includes(item))
  }

  if (eligible.length === 0) return pool[0]
  return eligible[Math.floor(Math.random() * eligible.length)]
}
```

### 11.2 `pickWeighted` Helper

```ts
function pickWeighted(
  slotKey: string,
  pool: { value: string; weight: number }[],
  history: WeekHistory[],
  settings: FridgeEngineSettings
): string {
  const window = settings.repeatWindows[slotKey] ?? 2
  const recentlyUsed = history.slice(-window).map(w => w[slotKey])
  let eligible = pool.filter(item => !recentlyUsed.includes(item.value))

  if (eligible.length === 0) eligible = pool

  const totalWeight = eligible.reduce((sum, item) => sum + item.weight, 0)
  let rand = Math.random() * totalWeight
  for (const item of eligible) {
    rand -= item.weight
    if (rand <= 0) return item.value
  }
  return eligible[eligible.length - 1].value
}
```

### 11.3 `buildCastIronPool` Helper

```ts
function buildCastIronPool({
  fishVarieties,
  batchFishVariety,
  batchChickenCut,
  steakEligible,
  shrimpEligible,
  history,
  settings,
}): string[] {

  const pool: string[] = []

  // Add fish varieties — exclude same variety as batch fish only
  fishVarieties
    .filter(f => f !== batchFishVariety)
    .forEach(f => pool.push(f))

  // Add chicken — exclude same cut as batch chicken
  if (batchChickenCut !== 'thighs') pool.push('chicken-thighs')
  if (batchChickenCut !== 'breast') pool.push('chicken-breast')

  // Add steak if eligible
  if (steakEligible) {
    pool.push('flank-steak')
    pool.push('sirloin-steak')
  }

  // Add shrimp if eligible
  if (shrimpEligible) pool.push('shrimp')

  // Apply no-repeat window for cast iron protein
  const window = settings.repeatWindows.castIronProtein ?? 2
  const recentlyUsed = history.slice(-window).map(w => w.castIronProtein)
  const filtered = pool.filter(p => !recentlyUsed.includes(p))

  return filtered.length > 0 ? filtered : pool
}
```

---

## 12. TypeScript Interfaces

```ts
// Add to src/types/randomizer.types.ts

export type FishVariety    = 'salmon' | 'tilapia' | 'cod' | 'mahi-mahi'
export type ChickenCut     = 'thighs' | 'breast'
export type CastIronProtein =
  | FishVariety
  | 'chicken-thighs'
  | 'chicken-breast'
  | 'shrimp'
  | 'flank-steak'
  | 'sirloin-steak'
export type MarinadeTiming = 'sunday' | 'tuesday' | 'season-wednesday'
export type GrainId        = 'brown-rice' | 'quinoa' | 'jasmine-rice'
export type LegumeId       = 'lentils' | 'black-beans' | 'chickpeas' | 'pinto-beans'
export type VegetableId    =
  | 'broccoli' | 'asparagus' | 'zucchini' | 'green-beans'
  | 'cauliflower' | 'brussels-sprouts' | 'snap-peas' | 'bok-choy'
  | 'stir-fry-blend'

export interface GeneratedPlan {
  batchFishVariety:         FishVariety
  batchFishSauce:           string
  batchChickenCut:          ChickenCut
  batchChickenSauce:        string
  castIronProtein:          CastIronProtein
  castIronSauce:            string
  marinadeTiming:           MarinadeTiming
  requiresSundayMarinade:   boolean
  isShrimp:                 boolean
  roastingVeg:              VegetableId
  grain:                    GrainId
  legume:                   LegumeId
  generatedAt:              string   // ISO date string
  confirmedAt:              string | null
}

export interface WeekHistory {
  weekNumber:       number
  fishVariety:      FishVariety
  fishSauce:        string
  chickenCut:       ChickenCut
  chickenSauce:     string
  castIronProtein:  CastIronProtein
  castIronMarinade: string
  roastingVeg:      VegetableId
  grain:            GrainId
  legume:           LegumeId
  confirmedAt:      string
}

export interface RepeatWindows {
  fishVariety:      number
  fishSauce:        number
  chickenCut:       number
  chickenSauce:     number
  castIronProtein:  number
  castIronMarinade: number
  roastingVeg:      number
  grain:            number
  legume:           number
}

export interface FridgeEngineSettings {
  repeatWindows:        RepeatWindows
  steakFrequencyWeeks:  number
  shrimpFrequencyWeeks: number
}

export interface WeightedOption {
  value:  string
  weight: number
}
```

---

## 13. Pinia Store — `randomizerStore.ts`

**File:** `src/stores/randomizerStore.ts`

```ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  GeneratedPlan,
  WeekHistory,
  RepeatWindows,
  FridgeEngineSettings,
  CastIronProtein,
} from '@/types/randomizer.types'
import { runFridgeEngine } from '@/data/fridgeEngine'

export const useRandomizerStore = defineStore('randomizer', () => {

  // Staged plan — generated, not yet confirmed
  const pendingPlan = ref<GeneratedPlan | null>(null)

  // Locked current week plan
  const confirmedPlan = ref<GeneratedPlan | null>(null)

  // User's saved favorite — fallback when no confirmed plan exists
  const favoritePlan = ref<GeneratedPlan | null>(null)

  // Full history of confirmed weeks — drives no-repeat logic
  const weekHistory = ref<WeekHistory[]>([])

  // No-repeat windows — all user adjustable
  const repeatWindows = ref<RepeatWindows>({
    fishVariety:      2,
    fishSauce:        3,
    chickenCut:       1,
    chickenSauce:     3,
    castIronProtein:  2,
    castIronMarinade: 3,
    roastingVeg:      2,
    grain:            2,
    legume:           3,
  })

  // Frequency settings — user adjustable
  const steakFrequencyWeeks  = ref<number>(2)
  const shrimpFrequencyWeeks = ref<number>(3)

  // The plan currently displayed in the meal plan view
  const activePlan = computed(() =>
    confirmedPlan.value ?? favoritePlan.value ?? null
  )

  const hasConfirmedPlan = computed(() => confirmedPlan.value !== null)
  const hasFavoritePlan  = computed(() => favoritePlan.value !== null)
  const hasPendingPlan   = computed(() => pendingPlan.value !== null)

  const engineSettings = computed<FridgeEngineSettings>(() => ({
    repeatWindows:        repeatWindows.value,
    steakFrequencyWeeks:  steakFrequencyWeeks.value,
    shrimpFrequencyWeeks: shrimpFrequencyWeeks.value,
  }))

  // Generate a new plan and stage it as pending
  function generatePlan() {
    pendingPlan.value = runFridgeEngine(weekHistory.value, engineSettings.value)
  }

  // Re-randomize a single slot in the pending plan
  function swapSlot(slotKey: keyof GeneratedPlan) {
    if (!pendingPlan.value) return
    const partial = runFridgeEngine(weekHistory.value, engineSettings.value)
    pendingPlan.value = {
      ...pendingPlan.value,
      [slotKey]: partial[slotKey],
    }
  }

  // Confirm pending plan — locks it and writes to history
  function confirmPlan() {
    if (!pendingPlan.value) return
    confirmedPlan.value = {
      ...pendingPlan.value,
      confirmedAt: new Date().toISOString(),
    }
    weekHistory.value.push(planToHistory(confirmedPlan.value))
    pendingPlan.value = null
  }

  // Save current confirmed plan as favorite
  function saveAsFavorite() {
    if (!confirmedPlan.value) return
    favoritePlan.value = { ...confirmedPlan.value }
  }

  // Reset confirmed plan (start of new week)
  function resetWeek() {
    confirmedPlan.value = null
  }

  // Reset all FridgeEngine settings to defaults
  function resetSettings() {
    repeatWindows.value = {
      fishVariety:      2,
      fishSauce:        3,
      chickenCut:       1,
      chickenSauce:     3,
      castIronProtein:  2,
      castIronMarinade: 3,
      roastingVeg:      2,
      grain:            2,
      legume:           3,
    }
    steakFrequencyWeeks.value  = 2
    shrimpFrequencyWeeks.value = 3
  }

  function planToHistory(plan: GeneratedPlan): WeekHistory {
    return {
      weekNumber:       weekHistory.value.length + 1,
      fishVariety:      plan.batchFishVariety,
      fishSauce:        plan.batchFishSauce,
      chickenCut:       plan.batchChickenCut,
      chickenSauce:     plan.batchChickenSauce,
      castIronProtein:  plan.castIronProtein,
      castIronMarinade: plan.castIronSauce,
      roastingVeg:      plan.roastingVeg,
      grain:            plan.grain,
      legume:           plan.legume,
      confirmedAt:      plan.confirmedAt ?? new Date().toISOString(),
    }
  }

  return {
    pendingPlan,
    confirmedPlan,
    favoritePlan,
    weekHistory,
    repeatWindows,
    steakFrequencyWeeks,
    shrimpFrequencyWeeks,
    activePlan,
    hasConfirmedPlan,
    hasFavoritePlan,
    hasPendingPlan,
    engineSettings,
    generatePlan,
    swapSlot,
    confirmPlan,
    saveAsFavorite,
    resetWeek,
    resetSettings,
  }

}, {
  persist: true
})
```

---

## 14. New Data File — `src/data/fridgeEngine.ts`

This file contains all pool definitions and exports the `runFridgeEngine` function.

```ts
// src/data/fridgeEngine.ts

import type {
  GeneratedPlan,
  WeekHistory,
  FridgeEngineSettings,
  WeightedOption,
} from '@/types/randomizer.types'

// ── Pools ──────────────────────────────────────────────

export const fishVarieties = ['salmon', 'tilapia', 'cod', 'mahi-mahi']

export const fishSauces = [
  'lemon-garlic', 'cajun-spice', 'soy-ginger-glaze',
  'lemon-dill', 'mango-salsa', 'garlic-butter',
  'herb-butter', 'miso-glaze',
]

export const chickenSauces = [
  'italian-herb', 'honey-mustard', 'mexican-dry-rub',
  'peanut-sauce', 'buffalo-ranch', 'teriyaki-glaze', 'lemon-herb',
]

export const castIronMarinades = [
  'soy-garlic-ginger', 'smoked-paprika-garlic', 'lime-cumin',
  'balsamic-herb', 'classic-salt-pepper', 'garlic-herb-butter',
  'red-wine-reduction', 'fresh-chimichurri', 'soy-garlic-pan-sauce',
]

export const shrimpSauces = [
  'garlic-butter', 'cajun-butter',
  'soy-garlic-ginger', 'lime-cumin',
]

export const roastingVegetables: WeightedOption[] = [
  { value: 'broccoli',         weight: 0.20 },
  { value: 'asparagus',        weight: 0.12 },
  { value: 'zucchini',         weight: 0.12 },
  { value: 'green-beans',      weight: 0.12 },
  { value: 'cauliflower',      weight: 0.12 },
  { value: 'brussels-sprouts', weight: 0.10 },
  { value: 'snap-peas',        weight: 0.10 },
  { value: 'bok-choy',         weight: 0.07 },
  { value: 'stir-fry-blend',   weight: 0.05 },
]

export const grains: WeightedOption[] = [
  { value: 'brown-rice',   weight: 0.45 },
  { value: 'quinoa',       weight: 0.35 },
  { value: 'jasmine-rice', weight: 0.20 },
]

export const legumes: WeightedOption[] = [
  { value: 'lentils',      weight: 0.45 },
  { value: 'black-beans',  weight: 0.25 },
  { value: 'chickpeas',    weight: 0.20 },
  { value: 'pinto-beans',  weight: 0.10 },
]

// ── Sunday-safe marinade IDs ───────────────────────────

export const sundaySafeMarinades = [
  'soy-garlic-ginger', 'smoked-paprika-garlic', 'classic-salt-pepper',
  'garlic-herb-butter', 'red-wine-reduction', 'fresh-chimichurri',
  'soy-garlic-pan-sauce', 'garlic-butter', 'cajun-butter',
]

// ── Main engine export ─────────────────────────────────

export function runFridgeEngine(
  history: WeekHistory[],
  settings: FridgeEngineSettings
): GeneratedPlan {
  // Implementation as defined in Section 11
  // pickFrom, pickWeighted, buildCastIronPool helpers
  // defined and called here
}
```

---

## 15. Application Changes Outside the FridgeEngine

All items below require implementation in the existing app independently of the engine itself.

### 15.1 New Route

Add to `src/router/index.ts`:
```ts
{ path: 'fridge', component: () => import('@/views/meal/FridgeView.vue') }
```

Add **This Week's Fridge** to the main nav between **Meal Plan** and **Cast Iron Night**.

---

### 15.2 Meal Plan Tab — Replaced by FridgeView

The existing static meal plan table is replaced by `FridgeView.vue` which has four states:

**State A — No plan, no favorite:**
```
Empty state illustration
"No plan generated yet"
[Generate This Week] button  ← primary CTA
```

**State B — No plan, favorite exists:**
```
Showing saved favorite label
Full favorite plan displayed (read-only)
[Generate New Week] button
```

**State C — Pending plan (generated, not confirmed):**
```
"Review your week" heading
6 slot cards, each showing:
  - Slot label (Batch Fish, Batch Chicken, etc.)
  - Selected value + sauce
  - Eat-by guidance
  - [🔀 Swap] button

Wednesday cast iron card highlighted with cast color
Marinade timing badge on cast iron card (Sunday / Tuesday / Season Wednesday)

[Confirm Week] button — primary, prominent
[Regenerate All]   button — secondary
```

**State D — Confirmed plan (locked):**
```
"This week's fridge" heading
6 slot cards, read-only
Wednesday cast iron reminder prominent

[Save as Favorite ⭐] button
[Generate Next Week]  button — available Friday onward
```

---

### 15.3 Settings View — FridgeEngine Section

Add a **FridgeEngine** section to the app settings view:

```
FridgeEngine Settings
─────────────────────────────────────────
Steak frequency      Every [2] weeks   stepper 1–8
Shrimp frequency     Every [3] weeks   stepper 1–8

No-Repeat Windows
  Fish variety       [2] weeks         stepper 1–8
  Fish sauce         [3] weeks         stepper 1–8
  Chicken cut        [1] week          stepper 1–4
  Chicken sauce      [3] weeks         stepper 1–8
  Cast iron protein  [2] weeks         stepper 1–8
  Cast iron marinade [3] weeks         stepper 1–8
  Roasting veg       [2] weeks         stepper 1–8
  Grain              [2] weeks         stepper 1–8
  Legume             [3] weeks         stepper 1–8

[Reset to defaults]
```

All values stored in `randomizerStore` under `repeatWindows`. Reset restores all defaults defined in Section 10.

---

### 15.4 Shopping List — Dynamic Updates on Confirm

When `confirmPlan()` is called, the shopping store updates the following line items dynamically:

| FridgeEngine Output | Shopping List Change |
|---|---|
| `batchFishVariety` | Updates fish line item to selected variety |
| `castIronProtein` = steak | Adds flank or sirloin steak line item |
| `castIronProtein` = shrimp | Adds "Frozen raw shrimp, peeled and deveined — 1–1.5 lbs" |
| `castIronProtein` = fish variety | Adds that fish variety if different from batch fish |
| `roastingVeg` | Updates roasting veg line item |
| `grain` | Updates grain line item |
| `legume` = lentils | Updates to "Green or brown lentils (dry)" |
| `legume` = black-beans | Updates to "Canned black beans — 2 cans" |
| `legume` = chickpeas | Updates to "Canned chickpeas — 2 cans" |
| `legume` = pinto-beans | Updates to "Dried pinto beans — 1 lb bag" |
| `batchFishSauce` = miso-glaze | Adds "White miso paste" if not already present |
| `batchChickenSauce` = teriyaki-glaze | Adds "Rice vinegar" and "Cornstarch" if not present |
| `castIronSauce` = lime-cumin (Tuesday) | Adds "Limes — 4" |

Standing items that never change: aromatics, salad kits, sweet potatoes, olive oil, avocado oil, low-sodium soy sauce, sesame oil, broth, lemons, fresh parsley.

---

### 15.5 Prep Day Tab — Dynamic Cast Iron Step

The Wednesday marinade step in the prep day timeline renders dynamically based on confirmed plan:

**When `marinadeTiming` = `sunday`:**
```
Step 2 — 15 min | Wednesday Marinade — Do It Now
Mix [castIronSauce] marinade. Pour over [castIronProtein]
in zip-lock bag. Label "Wednesday." Refrigerate.
```

**When `marinadeTiming` = `tuesday`:**
```
Step 2 — 15 min | Note — Tuesday Marinade This Week
[castIronSauce] contains acid — marinate Tuesday evening only.
Recipe available in Cast Iron tab. Set a reminder for Tuesday.
```

**When `marinadeTiming` = `season-wednesday`:**
```
Step 2 — Skipped | No Sunday Marinade This Week
Shrimp is this week's cast iron protein.
Season shrimp just before cooking Wednesday.
No marinade bag step needed today.
```

---

### 15.6 Cast Iron Tab — Dynamic Marinade Highlight

When a confirmed plan exists, the Cast Iron tab highlights the selected marinade card for the current week with a visual indicator (e.g. green border, "This week" badge). All other marinade cards remain visible for reference but are visually de-emphasized.

If `marinadeTiming` = `tuesday`, display a banner:
```
⚠️ This week's marinade (Lime Cumin / Balsamic Herb) should be
   applied Tuesday evening — not Sunday. Acid-based marinades
   break down protein texture if left longer than 24–48 hours.
```

---

### 15.7 Proteins & Grains Tab — Chickpea Addition

Add chickpeas to the legumes section:

```
Chickpeas
Key nutrients: 15g protein + 13g fiber per cup cooked.
               High in iron and folate.
Cook method:   Canned — drain, rinse, ready immediately.
               Optional: toss with olive oil + smoked paprika
               + salt, roast at 425°F for 25 min for a crispy
               texture excellent as a salad topper or snack.
               Dried — soak overnight, simmer 1–1.5 hrs.
Weekly use:    Any day as a side or bowl base.
               Roasted version excellent on salad kit lunches.
Badge:         Best
```

---

### 15.8 Storage Tab — New Entries

Add to the fridge life grid:

```
🍤 Cooked Shrimp — 3 days
   Reheat: 50% microwave power, 60 sec max.
   Or quick toss in warm pan with butter, 90 sec.
   Best eaten within 2 days for optimal texture.

🫘 Chickpeas (canned, drained) — 5 days
   Store in sealed container refrigerated.
   Roasted chickpeas: 2 days (lose crunch after that —
   re-roast at 425°F 5 min to partially restore).
```

---

### 15.9 Sauces Tab — New Entries

Add the following to the Sauces tab. All have full ingredient lists with quantities as established in existing sauce cards.

**Under Fish Sauces:**
- Herb Butter — recipe in Section 5.1
- Miso Glaze — recipe in Section 5.2

**Under Chicken Sauces:**
- Teriyaki Glaze — recipe in Section 5.3
- Lemon Herb — recipe in Section 5.4

**New sub-section: Shrimp Pan Sauces**
- Garlic Butter
- Cajun Butter
- Note at top of sub-section: "Shrimp pan sauces are not marinades — they are built in the cast iron pan after the shrimp is cooked. Never marinate shrimp ahead of time."

---

## 16. New Files Summary

| File | Purpose |
|---|---|
| `src/data/fridgeEngine.ts` | Pool definitions + `runFridgeEngine` function |
| `src/stores/randomizerStore.ts` | FridgeEngine Pinia store |
| `src/types/randomizer.types.ts` | All FridgeEngine TypeScript interfaces |
| `src/views/meal/FridgeView.vue` | Meal plan tab replacement — 4 states |
| `src/components/meal/FridgeSlotCard.vue` | Individual slot card with swap button |
| `src/components/meal/FridgeEmptyState.vue` | Empty state when no plan exists |

---

## 17. Backlog

- [ ] Saturday toggle — include Saturday in generation window
- [ ] Flavor theme pairing suggestions — flag when fish sauce + chicken sauce + cast iron marinade form a cohesive weekly theme (e.g. all Asian, all Mediterranean)
- [ ] History view — show last N weeks of confirmed plans
- [ ] Export week — share the week's fridge summary as text or image
- [ ] Ingredient conflict detection — flag when two sauces selected in the same week require the same perishable ingredient (e.g. fresh parsley in both chimichurri and herb butter)
- [ ] Seasonal vegetable weighting — adjust veg pool weights by season (e.g. asparagus weighted higher in spring)
- [ ] Add more fish varieties — swordfish, halibut, sea bass
- [ ] Add more legumes — edamame, white beans

---

*End of FridgeEngine requirements document.*
