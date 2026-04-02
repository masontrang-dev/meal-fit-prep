# Marinade Timing Intelligence — Requirements

> **Document Type:** Addendum to `fridge-engine-requirements.md`
> **Depends on:** `fridge-engine-requirements.md`, `meal-prep-technical-requirements.md`
> **Scope:** Overnight marinade detection, Saturday prep flagging, late generation warnings, UI handling across all affected views
> **Version:** 1.0 — March 2026

---

## 1. Overview

Some sauces and marinades require overnight marinating (8–12 hours) to achieve their intended flavor. When the FridgeEngine selects one of these sauces, the app must:

1. Detect that overnight marinating is required
2. Determine whether the generation timing allows for Saturday night prep
3. Surface a Saturday prep reminder if the plan was generated in time
4. Warn the user and offer alternatives if the plan was generated too late (Sunday)
5. Inject a Saturday night step into the Prep Day timeline when applicable

This feature requires additions to the `Sauce` interface, `GeneratedPlan` interface, the FridgeEngine algorithm, the Pinia randomizer store, and four views.

---

## 2. Marinade Requirement Classification

Every sauce and marinade in all pools requires a `marinating` property. Three possible values:

```ts
export type MarinadeRequirement =
  | 'none'       // No marinating — season just before cooking or finish sauce in pan
  | 'minimum'    // 30 min – 4 hours — same day is sufficient
  | 'overnight'  // 8–12 hours — must start the night before cooking
```

### 2.1 Full Sauce Classification Table

#### Fish Sauces

| Sauce | `marinating` | Notes |
|---|---|---|
| Lemon Garlic | `minimum` | 30 min sufficient |
| Cajun Spice Rub | `minimum` | 1 hour sufficient |
| Soy Ginger Glaze | `none` | Applied last 5 min of baking only |
| Lemon Dill | `minimum` | 1–2 hours sufficient |
| Mango Salsa | `none` | Spoon over at serving |
| Garlic Butter | `none` | Applied last 3 min of baking |
| Herb Butter | `none` | Applied last 3 min of baking |
| Miso Glaze | `minimum` | 30 min minimum, 4 hours preferred |

#### Chicken Sauces

| Sauce | `marinating` | Notes |
|---|---|---|
| Italian Herb | `overnight` | Overnight preferred for full herb penetration |
| Honey Mustard | `minimum` | 2 hours sufficient |
| Mexican Dry Rub | `minimum` | Dry rub — 1–2 hours fine, overnight better |
| Peanut Sauce | `overnight` | Needs time to fully penetrate |
| Buffalo-Ranch | `minimum` | 2 hours fine |
| Teriyaki Glaze | `overnight` | Overnight strongly recommended |
| Lemon Herb | `overnight` | Citrus and herbs benefit significantly from overnight |

#### Cast Iron Marinades

| Marinade | `marinating` | Notes |
|---|---|---|
| Soy Garlic Ginger | `overnight` | Overnight = significantly better flavor |
| Smoked Paprika Garlic | `minimum` | Oil rub — 2 hours sufficient |
| Lime Cumin | `minimum` | Citrus acts fast — 2 hours max on chicken |
| Balsamic Herb | `minimum` | 2–4 hours sufficient |
| Classic Salt & Pepper | `none` | Season just before cooking |
| Garlic Herb Butter | `none` | Pan finish — not a marinade |
| Red Wine Reduction | `none` | Pan sauce — built after cooking |
| Fresh Chimichurri | `none` | Spoon over at serving |
| Soy Garlic Pan Sauce | `none` | Deglaze pan after cooking |

#### Shrimp Pan Sauces

| Sauce | `marinating` | Notes |
|---|---|---|
| Garlic Butter | `none` | Pan sauce only — never marinate shrimp |
| Cajun Butter | `none` | Pan sauce only — never marinate shrimp |
| Soy Garlic Ginger (shrimp) | `none` | Pan sauce only when used for shrimp |
| Lime Cumin (shrimp) | `none` | Pan sauce only when used for shrimp |

---

## 3. Interface Updates

### 3.1 `Sauce` Interface — Two New Fields

Add to existing `Sauce` interface in `src/types/meal.types.ts`:

```ts
export interface Sauce {
  id:              string
  name:            string
  bestFor:         string
  proteinCategory: 'fish' | 'chicken' | 'steak' | 'shrimp'
  ingredients:     Ingredient[]
  storage:         SauceStorageInfo
  applicationNote: string
  marinating:      MarinadeRequirement   // ← new
  sundaySafe:      boolean               // ← new
}

export type MarinadeRequirement = 'none' | 'minimum' | 'overnight'
```

`sundaySafe` mirrors the existing cast iron marinade timing logic already defined in `fridge-engine-requirements.md` Section 9.2 but expresses it as a boolean directly on the sauce object for easier engine consumption.

### 3.2 `GeneratedPlan` Interface — New Fields

Add to `GeneratedPlan` in `src/types/randomizer.types.ts`:

```ts
export interface GeneratedPlan {
  // ... all existing fields ...

  // Overnight marinade detection
  saturdayPrepRequired:  boolean
  saturdayPrepItems:     SaturdayPrepItem[]
  lateGenerationWarning: boolean   // true if generated on Sunday and overnight items exist
}

export interface SaturdayPrepItem {
  protein:        string   // e.g. 'chicken-thighs', 'flank-steak'
  sauce:          string   // sauce id
  sauceName:      string   // display name
  instructions:   string   // full marinade instructions pulled from sauce data
  note:           string   // contextual note e.g. 'Batch chicken — marinate Saturday night'
}
```

---

## 4. Engine Algorithm Updates

Add overnight detection as the final step in `runFridgeEngine` after all slots are filled. Add to `src/data/fridgeEngine.ts`:

```ts
// Step 9 — Detect overnight marinade requirements

const chickenSauceData  = getSauceById(plan.batchChickenSauce)
const castIronSauceData = getSauceById(plan.castIronSauce)

const chickenNeedsOvernight =
  chickenSauceData.marinating === 'overnight'

const castIronNeedsOvernight =
  plan.marinadeTiming !== 'season-wednesday' &&
  castIronSauceData.marinating === 'overnight'

plan.saturdayPrepRequired = chickenNeedsOvernight || castIronNeedsOvernight

plan.saturdayPrepItems = [
  ...(chickenNeedsOvernight ? [{
    protein:      plan.batchChickenCut,
    sauce:        plan.batchChickenSauce,
    sauceName:    chickenSauceData.name,
    instructions: chickenSauceData.applicationNote,
    note:         'Batch chicken — marinate Saturday night for Sunday bake',
  }] : []),
  ...(castIronNeedsOvernight && plan.marinadeTiming === 'sunday' ? [{
    protein:      plan.castIronProtein,
    sauce:        plan.castIronSauce,
    sauceName:    castIronSauceData.name,
    instructions: castIronSauceData.applicationNote,
    note:         'Cast iron protein — marinate Saturday night. Sunday-safe marinade — stays in fridge until Wednesday.',
  }] : []),
]

// Step 10 — Detect late generation (generated on Sunday)
const generatedOnSunday = new Date().getDay() === 0

plan.lateGenerationWarning = generatedOnSunday && plan.saturdayPrepRequired
```

### 4.1 Helper Function

Add `getSauceById` to `fridgeEngine.ts`:

```ts
import { allSauces } from '@/data/sauces'

function getSauceById(id: string): Sauce {
  const sauce = allSauces.find(s => s.id === id)
  if (!sauce) throw new Error(`Sauce not found: ${id}`)
  return sauce
}
```

`allSauces` is a combined export from the existing sauce data files that merges fish, chicken, steak, and shrimp sauce arrays into a single flat array indexed by `id`.

---

## 5. Pinia Store Updates

No new store actions required. The `saturdayPrepRequired`, `saturdayPrepItems`, and `lateGenerationWarning` fields are generated by the engine and live on `pendingPlan` and `confirmedPlan` objects already managed by `randomizerStore`.

Add two computed properties to `randomizerStore.ts` for convenient template access:

```ts
const saturdayPrepRequired = computed(() =>
  pendingPlan.value?.saturdayPrepRequired ?? false
)

const lateGenerationWarning = computed(() =>
  pendingPlan.value?.lateGenerationWarning ?? false
)
```

---

## 6. UI — Three Scenarios

### Scenario A — Generated Saturday or Earlier, Overnight Items Present

`saturdayPrepRequired` = true, `lateGenerationWarning` = false

Display a **Saturday Prep Reminder card** on:
- FridgeView pending state (State C) — below the slot cards, above the Confirm button
- Prep Day tab — as a new timeline step above the existing Saturday night pre-step

```
Callout variant: gold
Icon: 🧂
Title: Start these marinades tonight — Saturday

For each item in saturdayPrepItems:
  · [Protein display name] — [Sauce name]
    [Full instructions from sauce.applicationNote]
    Combine ingredients, coat protein in zip-lock bag,
    label with protein name, refrigerate overnight.

If cast iron item present:
  Note: "This marinade is Sunday-safe — it will continue
  improving in flavor through Wednesday. No need to
  re-bag or adjust on Sunday."
```

### Scenario B — Generated on Sunday, Overnight Items Present

`saturdayPrepRequired` = true, `lateGenerationWarning` = true

Display a **Late Generation Warning** on FridgeView pending state (State C) — above the slot cards, prominent position:

```
Callout variant: orange
Icon: ⚠️
Title: Some sauces work best with an overnight marinade

Body:
  Since you're generating on Sunday, you have two options
  for each affected item:

For each item in saturdayPrepItems:
  [Protein] — [Sauce name] requires overnight marinating.

  Option 1 — Swap to a same-day sauce
  [🔀 Swap chicken sauce]     ← triggers swapSlot('batchChickenSauce')
  [🔀 Swap cast iron marinade] ← triggers swapSlot('castIronSauce')
  The engine will pick a minimum or none sauce instead.

  Option 2 — Proceed with shorter marinade
  2–4 hours is still fine. Flavor will be slightly
  less developed but the meal will still be good.
  [Proceed anyway]  ← dismisses warning, keeps current plan
```

When the user taps a swap button from this warning, the engine re-randomizes that slot excluding all `overnight` sauces for this generation only. This is a one-time filter applied to the swap — it does not permanently exclude overnight sauces from future generations.

Add a filter parameter to `swapSlot` in `randomizerStore.ts`:

```ts
function swapSlot(
  slotKey: keyof GeneratedPlan,
  excludeOvernight: boolean = false
) {
  if (!pendingPlan.value) return
  const partial = runFridgeEngine(
    weekHistory.value,
    engineSettings.value,
    { [slotKey]: { excludeOvernight } }  // slot-level override
  )
  pendingPlan.value = {
    ...pendingPlan.value,
    [slotKey]: partial[slotKey],
  }
}
```

Update `runFridgeEngine` signature to accept optional slot-level overrides:

```ts
export function runFridgeEngine(
  history: WeekHistory[],
  settings: FridgeEngineSettings,
  overrides?: Partial<Record<keyof GeneratedPlan, { excludeOvernight?: boolean }>>
): GeneratedPlan
```

When `excludeOvernight` = true for a slot, filter that slot's pool before running `pickFrom`:

```ts
const filteredChickenSauces = overrides?.batchChickenSauce?.excludeOvernight
  ? chickenSauces.filter(id => getSauceById(id).marinating !== 'overnight')
  : chickenSauces
```

### Scenario C — No Overnight Items

`saturdayPrepRequired` = false

No warning shown. Normal generation flow. No changes to any view.

---

## 7. Prep Day Tab — Saturday Night Step

When `confirmedPlan.saturdayPrepRequired` = true, inject a new timeline step as the **first step** in the Prep Day timeline, before the existing Saturday night fish thaw step.

### New Step Definition

```
Dot color:  var(--gold)
Time label: Saturday Night — The Night Before
Title:      Marinade Prep — Start Tonight

Body:
  [For each item in confirmedPlan.saturdayPrepItems]

  [Protein display name] — [Sauce name]
  [Full marinade instructions]

  Steps:
    1. Combine all marinade ingredients in a small bowl
    2. Place [protein] in a zip-lock bag
    3. Pour marinade over protein, squeeze out all air, seal
    4. Label the bag with the protein name
    5. Refrigerate overnight

  [If cast iron item:]
    This cast iron marinade is Sunday-safe — leave it in the
    fridge from Saturday night through Wednesday evening.
    No need to adjust or re-bag on Sunday. The longer it
    marinates, the better the flavor.

  [If chicken batch item:]
    This bag goes straight into the oven Sunday afternoon.
    No additional prep needed on Sunday for this protein.
```

### Existing Saturday Night Step — Updated

The existing Saturday night step (fish thaw + optional bean soak) is preserved but rendered after the new marinade step:

```
Dot color:  var(--muted)
Time label: Saturday Night — Also Tonight
Title:      Fish Thaw + Optional Bean Soak

Body: [existing content unchanged]
```

---

## 8. Cast Iron Tab — Marinade Timing Badge Updates

The existing marinade timing badges (`Sunday Safe` / `Tuesday Only`) on each marinade card gain a third state:

```
Sunday Safe    — green badge   — can marinate from Saturday or Sunday
Tuesday Only   — gold badge    — acid-based, marinate Tuesday only
Saturday Night — amber badge   — overnight required, start Saturday
```

Update badge logic:

```ts
function getMarinadeBadge(sauce: Sauce): { label: string; variant: string } {
  if (sauce.marinating === 'overnight' && sauce.sundaySafe) {
    return { label: 'Start Saturday', variant: 't-saturday' }
  }
  if (sauce.sundaySafe) {
    return { label: 'Sunday Safe', variant: 't-sunday' }
  }
  return { label: 'Tuesday Only', variant: 't-tuesday' }
}
```

Add `t-saturday` CSS class to `main.css`:

```css
.t-saturday {
  @apply inline-block text-[0.64rem] font-bold tracking-[0.08em] uppercase
         px-2 py-[3px] rounded-sm whitespace-nowrap flex-shrink-0;
  background: var(--gold-light);
  color: var(--gold);
  border: 1px solid #e8d090;
}
```

Note: `t-tuesday` and `t-saturday` share the same visual style intentionally — both are caution-level timing constraints. The label text is what distinguishes them.

---

## 9. Sauces Tab — Marinating Time Indicator

Each sauce card in the Sauces tab gains a small marinating time indicator below the sauce name:

```
'none'      → No indicator shown (most sauces)
'minimum'   → Small muted label: "Marinate 30 min – 4 hrs"
'overnight' → Small amber label: "⏰ Overnight marinade recommended"
```

Display as a subtitle line between the sauce name and the "For:" line on each card. Only `overnight` uses a colored indicator — `minimum` uses muted text, `none` shows nothing.

---

## 10. FridgeView — Slot Card Overnight Indicator

In FridgeView State C (pending plan), each slot card that contains an overnight sauce displays a small indicator below the sauce name:

```
🐔 Batch Chicken
   Thighs — Teriyaki Glaze
   ⏰ Start Saturday night
   [🔀 Swap]
```

Tapping the indicator on a Sunday-generated plan triggers the swap flow described in Scenario B Section 6 — offering to swap to a same-day sauce.

On a Saturday-or-earlier generated plan, tapping the indicator scrolls to the Saturday prep reminder card rather than offering a swap.

---

## 11. Data File Updates

### 11.1 All Sauce Data Files

Every sauce object in the following files needs `marinating` and `sundaySafe` fields added per the classification table in Section 2.1:

- `src/data/fishSauces.ts`
- `src/data/chickenSauces.ts`
- `src/data/castIronMarinades.ts`
- `src/data/shrimpSauces.ts`

### 11.2 Combined Sauce Export

Add to `src/data/sauces.ts`:

```ts
import { fishSauces }          from './fishSauces'
import { chickenSauces }       from './chickenSauces'
import { castIronMarinades }   from './castIronMarinades'
import { shrimpSauces }        from './shrimpSauces'

export const allSauces: Sauce[] = [
  ...fishSauces,
  ...chickenSauces,
  ...castIronMarinades,
  ...shrimpSauces,
]
```

This combined array is consumed by `getSauceById` in `fridgeEngine.ts`.

---

## 12. New Component

**File:** `src/components/meal/SaturdayPrepCard.vue`

```
Props:
  - items: SaturdayPrepItem[]
  - isLateGeneration: boolean

Behavior:
  - Renders gold callout when isLateGeneration = false
    (Saturday or earlier — this is a reminder)
  - Renders orange callout when isLateGeneration = true
    (Sunday — this is a warning with swap options)
  - For each item: protein name, sauce name,
    full instructions, contextual note
  - Emits: swap-chicken-sauce, swap-cast-iron-sauce
  - Emits: proceed-anyway (dismisses warning on Sunday)
```

---

## 13. Summary of All Affected Files

| File | Change |
|---|---|
| `src/types/meal.types.ts` | Add `MarinadeRequirement` type, `marinating` and `sundaySafe` to `Sauce` interface |
| `src/types/randomizer.types.ts` | Add `saturdayPrepRequired`, `saturdayPrepItems`, `lateGenerationWarning` to `GeneratedPlan`. Add `SaturdayPrepItem` interface |
| `src/data/fishSauces.ts` | Add `marinating` + `sundaySafe` to all sauce objects |
| `src/data/chickenSauces.ts` | Add `marinating` + `sundaySafe` to all sauce objects |
| `src/data/castIronMarinades.ts` | Add `marinating` + `sundaySafe` to all marinade objects |
| `src/data/shrimpSauces.ts` | Add `marinating` + `sundaySafe` to all sauce objects |
| `src/data/sauces.ts` | Add combined `allSauces` export |
| `src/data/fridgeEngine.ts` | Add Steps 9–10 to engine, `getSauceById` helper, `overrides` parameter to `runFridgeEngine` |
| `src/stores/randomizerStore.ts` | Add `saturdayPrepRequired` + `lateGenerationWarning` computed properties. Update `swapSlot` signature |
| `src/views/meal/FridgeView.vue` | Render `SaturdayPrepCard` in State C |
| `src/views/meal/PrepDayView.vue` | Inject Saturday night marinade step when `saturdayPrepRequired` = true |
| `src/views/meal/CastIronView.vue` | Add `t-saturday` badge variant to marinade cards |
| `src/views/meal/SaucesView.vue` | Add marinating time indicator to sauce cards |
| `src/components/meal/SaturdayPrepCard.vue` | New component |
| `src/assets/main.css` | Add `.t-saturday` CSS class |

---

*End of marinade timing intelligence requirements.*
