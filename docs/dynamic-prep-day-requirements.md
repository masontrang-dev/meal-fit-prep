# Dynamic Prep Day & Cooking Mode — Requirements

> **Document Type:** Addendum to `fridge-engine-requirements.md` and `marinade-timing-requirements.md`
> **Depends on:** `meal-prep-technical-requirements.md`, `fridge-engine-requirements.md`, `marinade-timing-requirements.md`
> **Scope:** Sauce application timing, temperature adjustments, dynamic Prep Day tab, sauce inventory, cooking mode, concurrent timers, two-phase sauce alerts, timer persistence
> **Version:** 1.0 — March 2026

---

# Phase 1 — Sauce Application Timing & Temperature Adjustments

## 1.1 Overview

Every sauce and marinade needs two new properties that drive dynamic behavior in the Prep Day tab, the Sauces tab, and the Cast Iron tab:

- `applicationTiming` — when during cooking the sauce is applied
- `temperatureAdjustment` — whether the sauce requires a modified oven temperature

These are added to the `Sauce` interface alongside the `marinating` and `sundaySafe` fields defined in `marinade-timing-requirements.md`.

---

## 1.2 New Types

Add to `src/types/meal.types.ts`:

```ts
export type ApplicationTiming =
  | 'before'      // Apply before cooking — standard temp throughout
  | 'last-ten'    // Apply last 8–10 min — sugar or honey content
  | 'last-five'   // Apply last 3–5 min — butter based
  | 'serving'     // Never cooked — spoon over at serving or pan finish

export interface TemperatureAdjustment {
  adjusted: boolean
  tempF?:   number    // Override temperature e.g. 375 instead of 400
  note?:    string    // e.g. 'Reduce to 375°F to prevent honey burning'
}
```

---

## 1.3 Updated `Sauce` Interface

```ts
export interface Sauce {
  id:                    string
  name:                  string
  bestFor:               string
  proteinCategory:       'fish' | 'chicken' | 'steak' | 'shrimp'
  ingredients:           Ingredient[]
  storage:               SauceStorageInfo
  applicationNote:       string
  marinating:            MarinadeRequirement
  sundaySafe:            boolean
  applicationTiming:     ApplicationTiming      // ← new
  temperatureAdjustment: TemperatureAdjustment  // ← new
}
```

---

## 1.4 Full Sauce Classification Table

### Fish Sauces

| Sauce | `applicationTiming` | `temperatureAdjustment` |
|---|---|---|
| Lemon Garlic | `before` | None |
| Cajun Spice Rub | `before` | None |
| Soy Ginger Glaze | `last-ten` | None — fish cooks fast enough |
| Lemon Dill | `before` | None |
| Mango Salsa | `serving` | None |
| Garlic Butter (fish) | `last-five` | None |
| Herb Butter | `last-five` | None |
| Miso Glaze | `last-ten` | 375°F recommended ⚠️ |

### Chicken Sauces

| Sauce | `applicationTiming` | `temperatureAdjustment` |
|---|---|---|
| Italian Herb | `before` | None |
| Honey Mustard | `last-ten` | 375°F recommended ⚠️ |
| Mexican Dry Rub | `before` | None |
| Peanut Sauce | `before` | None |
| Buffalo-Ranch | `before` | None |
| Teriyaki Glaze | `last-ten` | 375°F recommended ⚠️ |
| Lemon Herb | `before` | None |

### Cast Iron Marinades

| Sauce | `applicationTiming` | `temperatureAdjustment` |
|---|---|---|
| Soy Garlic Ginger | `before` | None — cast iron high heat |
| Smoked Paprika Garlic | `before` | None |
| Lime Cumin | `before` | None |
| Balsamic Herb | `before` | None |
| Classic Salt & Pepper | `before` | None |
| Garlic Herb Butter | `serving` | None — pan finish after cooking |
| Red Wine Reduction | `serving` | None — pan sauce after cooking |
| Fresh Chimichurri | `serving` | None — spoon over at serving |
| Soy Garlic Pan Sauce | `serving` | None — deglaze after cooking |

### Shrimp Pan Sauces

| Sauce | `applicationTiming` | `temperatureAdjustment` |
|---|---|---|
| Garlic Butter | `serving` | None — pan sauce only |
| Cajun Butter | `serving` | None — pan sauce only |
| Soy Garlic Ginger (shrimp) | `serving` | None — pan sauce only |
| Lime Cumin (shrimp) | `serving` | None — pan sauce only |

---

## 1.5 Standard Cooking Temperatures & Times

These are the fixed base values used by the Prep Day tab for each protein type. The only values that change are when `temperatureAdjustment.adjusted` = true for the selected sauce.

```ts
export const standardCookConfig: Record<string, CookConfig> = {
  'fish':            { tempF: 400, durationMin: 12, durationMax: 15 },
  'chicken-thighs':  { tempF: 375, durationMin: 35, durationMax: 40 },
  'chicken-breast':  { tempF: 375, durationMin: 25, durationMax: 30 },
  'broccoli':        { tempF: 425, durationMin: 18, durationMax: 18 },
  'roasting-veg':    { tempF: 400, durationMin: 15, durationMax: 22 },
  'cast-iron-steak': { tempF: null, durationMin: 3,  durationMax: 4  }, // high heat, per side
  'cast-iron-shrimp':{ tempF: null, durationMin: 2,  durationMax: 3  }, // high heat, per side
  'cast-iron-chicken':{ tempF: null, durationMin: 4, durationMax: 5  }, // high heat, per side
  'lentils':         { tempF: null, durationMin: 22, durationMax: 22 }, // stovetop
  'brown-rice':      { tempF: null, durationMin: 45, durationMax: 50 }, // rice cooker
  'quinoa':          { tempF: null, durationMin: 15, durationMax: 18 }, // rice cooker or stovetop
  'jasmine-rice':    { tempF: null, durationMin: 20, durationMax: 20 }, // rice cooker
}

export interface CookConfig {
  tempF:       number | null  // null = stovetop or cast iron — no oven temp
  durationMin: number         // minutes
  durationMax: number         // minutes
}
```

### Temperature Override Logic

When rendering any oven step, the Prep Day tab applies this logic:

```ts
function getOvenTemp(protein: string, sauce: Sauce): number {
  if (sauce.temperatureAdjustment.adjusted && sauce.temperatureAdjustment.tempF) {
    return sauce.temperatureAdjustment.tempF
  }
  return standardCookConfig[protein].tempF
}
```

---

## 1.6 Sauce Application Timing Logic

For each protein in the plan, the Prep Day tab calculates the sauce application point as an absolute time offset from the start of cooking:

```ts
function getSauceApplicationOffset(
  protein: string,
  sauce: Sauce
): number | null {
  // Returns minutes from start of cooking when sauce should be applied
  // Returns null if sauce is applied before cooking or at serving

  const totalDuration = standardCookConfig[protein].durationMax

  switch (sauce.applicationTiming) {
    case 'last-ten':
      return totalDuration - 10    // e.g. 40 min chicken → alert at 30 min mark
    case 'last-five':
      return totalDuration - 5     // e.g. 15 min fish → alert at 10 min mark
    case 'before':
    case 'serving':
      return null                  // no mid-cook alert needed
  }
}
```

This offset drives the two-phase timer system defined in Phase 2.

---

## 1.7 Sauces Tab — Application Timing Indicator

Each sauce card in the Sauces tab gains a timing indicator line between the sauce name and the "For:" subtitle:

```
'before'    → No indicator (most sauces — default behavior)
'last-ten'  → 🕐 Apply last 8–10 minutes of cooking
'last-five' → 🕐 Apply last 3–5 minutes of cooking
'serving'   → 🍽️ Apply at serving — not cooked
```

Displayed as a small muted line. Only `last-ten` and `last-five` use the clock icon. `serving` uses the plate icon. `before` shows nothing.

Where `temperatureAdjustment.adjusted` = true, add below the timing indicator:

```
⚠️ Reduce oven to [tempF]°F — prevents burning
```

Displayed in gold/amber to match the caution level.

---

## 1.8 Cast Iron Tab — Application Timing on Marinade Cards

Marinade cards in the Cast Iron tab gain an application timing note in the card body, below the ingredient list:

```
'serving' sauces (Garlic Herb Butter, Red Wine Reduction,
Chimichurri, Soy Garlic Pan Sauce):
  → "Build this sauce in the pan after the protein is cooked
     and resting. Not a marinade — applied at serving."

'before' marinades (everything else):
  → "Apply before cooking. [Sunday / Tuesday] timing badge
     as already defined."
```

---

## 1.9 Data Files to Update

Add `applicationTiming` and `temperatureAdjustment` to every sauce object in:

- `src/data/fishSauces.ts`
- `src/data/chickenSauces.ts`
- `src/data/castIronMarinades.ts`
- `src/data/shrimpSauces.ts`

Add `standardCookConfig` export to:

- `src/data/cookConfig.ts` ← new file

---

# Phase 2 — Dynamic Prep Day Tab & Cooking Mode

## 2.1 Overview

The Prep Day tab has two modes:

**Reference Mode** — default on page load. Full timeline visible, all steps readable, collapsible sauce recipes inline. Used for planning and review before cooking begins.

**Cooking Mode** — activated by tapping "Start Cooking" on any step. Partial focus layout — active step highlighted and expanded with countdown timer, other steps visible but dimmed. Designed for use while standing at the stove.

Both modes are driven entirely by the confirmed plan from `randomizerStore`. When no plan is confirmed, the tab falls back to a generic static guide as it does today.

---

## 2.2 Sauce Inventory System

### Concept

The sauce inventory tracks which batchable sauces are currently in the user's fridge. When a sauce is marked in-stock, its preparation step is skipped in the Prep Day timeline — the step simply notes "using batch from fridge."

### Pinia Store — `sauceInventoryStore.ts`

**File:** `src/stores/sauceInventoryStore.ts`

```ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSauceInventoryStore = defineStore('sauceInventory', () => {

  // Record of sauce id → in-stock boolean
  const inventory = ref<Record<string, boolean>>({})

  function markInStock(sauceId: string) {
    inventory.value[sauceId] = true
  }

  function markUsedUp(sauceId: string) {
    inventory.value[sauceId] = false
  }

  function isInStock(sauceId: string): boolean {
    return inventory.value[sauceId] === true
  }

  function toggleStock(sauceId: string) {
    inventory.value[sauceId] = !inventory.value[sauceId]
  }

  // Returns all sauce ids currently in stock
  const inStockSauces = computed(() =>
    Object.entries(inventory.value)
      .filter(([_, inStock]) => inStock)
      .map(([id]) => id)
  )

  return { inventory, markInStock, markUsedUp, isInStock, toggleStock, inStockSauces }

}, {
  persist: true  // persists until user manually clears
})
```

### In-Stock Determination Logic

```ts
function shouldMakeSauce(sauce: Sauce, inventory: SauceInventoryStore): boolean {
  if (!sauce.storage.batchable) return true     // always make fresh
  return !inventory.isInStock(sauce.id)         // only make if not in stock
}
```

### Weekly Generation Prompt

When `generatePlan()` is called and the generated plan includes batchable sauces, display a prompt in FridgeView State C below the slot cards:

```
🧂 Do you still have these batch sauces?

  [ ] Honey Mustard      — made 2 weeks ago
  [ ] Italian Herb (dry) — pantry staple, always available
  [ ] Soy Ginger Glaze   — made last week

Check any you still have. Prep Day will skip their
preparation steps and note them as ready to use.

[Update Inventory]
```

Checked items are marked in-stock in `sauceInventoryStore`. Unchecked items are marked used-up. This prompt only appears for batchable sauces in the current week's plan — it never asks about sauces not being used this week.

---

## 2.3 Dynamic Prep Day Timeline

### Step Generation Logic

The Prep Day timeline is generated dynamically from the confirmed plan on every render. Steps are built in this order:

```ts
function buildPrepTimeline(plan: GeneratedPlan, inventory: SauceInventory): PrepStep[] {
  const steps: PrepStep[] = []

  // 1. Saturday night marinade step (if required)
  //    — already defined in marinade-timing-requirements.md
  //    — injected as first step when saturdayPrepRequired = true

  // 2. Sunday — Rice cooker on + oven preheat + chop
  steps.push(buildSetupStep(plan))

  // 3. Sunday — Wednesday marinade (if sunday-safe and not shrimp)
  if (plan.marinadeTiming === 'sunday') {
    steps.push(buildWednesdayMarinadeStep(plan))
  } else if (plan.marinadeTiming === 'tuesday') {
    steps.push(buildTuesdayMarinadeReminderStep(plan))
  }

  // 4. Sunday — Make sauces not already in stock
  const saucesToMake = getSaucesToMake(plan, inventory)
  if (saucesToMake.length > 0) {
    steps.push(buildMakeSaucesStep(saucesToMake, inventory))
  }

  // 5. Sunday — Season and pan proteins
  steps.push(buildSeasonStep(plan))

  // 6. Sunday — Oven step (dynamic temp per protein + sauce)
  steps.push(buildOvenStep(plan))

  // 7. Sunday — Lentils stovetop (if legume = lentils)
  if (plan.legume === 'lentils') {
    steps.push(buildLentilStep())
  }

  // 8. Sunday — Pull, cool, portion
  steps.push(buildPortionStep())

  return steps
}
```

---

## 2.4 Make Sauces Step — Inline Collapsible Recipes

### Step Structure

```
Dot color: var(--green)
Time label: 10–15 min · Before seasoning proteins
Title: Make Your Sauces

Body:
  [For each sauce not in stock — batchable or fresh for Sunday use]

  ┌─────────────────────────────────────────────────────┐
  │ Honey Mustard Sauce                    [▼ Expand]   │
  │ For: Chicken Thighs — Sunday batch                  │
  └─────────────────────────────────────────────────────┘

  [Expanded state:]
  ┌─────────────────────────────────────────────────────┐
  │ Honey Mustard Sauce                    [▲ Collapse] │
  │ For: Chicken Thighs — Sunday batch                  │
  │                                                     │
  │ Ingredients:                                        │
  │   · 2 tbsp Dijon mustard                           │
  │   · 1 tbsp honey                                   │
  │   · ½ tsp garlic powder                            │
  │   · ¼ tsp salt · ¼ tsp black pepper               │
  │   · 1 tbsp olive oil                               │
  │                                                     │
  │ Method:                                             │
  │   Whisk all ingredients together.                   │
  │   Apply to chicken in last 10 min of baking.        │
  │   ⚠️ Oven at 375°F — not 400°F                     │
  │                                                     │
  │ [✓ Mark as made]                                    │
  └─────────────────────────────────────────────────────┘

  [For each sauce already in stock:]
  ✓ Italian Herb — using batch from fridge
```

### Collapse Behavior

- All sauce cards start collapsed by default in Reference Mode
- All sauce cards auto-expand in Cooking Mode when the Make Sauces step becomes active
- "Mark as made" button marks the sauce as in-stock in `sauceInventoryStore`
- Temperature warning shown inline if `temperatureAdjustment.adjusted` = true

---

## 2.5 Oven Step — Dynamic Temperature & Timing

The oven step is the most dynamic step in the timeline. It renders based on the specific proteins and sauces in the plan.

### Step Structure

```
Dot color: var(--orange)
Time label: [X] min · Hands off
Title: Everything in the Oven

Body:
  Oven is preheated. Load in this order:

  ① Fish fillets — Sheet Pan A
     Temperature: 400°F
     Duration: 12–15 min
     Sauce: Lemon Garlic — already applied ✓
     [▶ Start fish timer — 15 min]

  ② Chicken Thighs + Broccoli — Sheet Pan B
     Temperature: 375°F  ← [dynamic — Teriyaki Glaze triggers 375]
     Duration: 35–40 min
     Sauce: Teriyaki Glaze — apply at 25 min mark ⚠️
     [▶ Start chicken timer — 40 min]

  [If lentils cooking simultaneously:]
  ③ Lentils — Stovetop
     Bring to boil, reduce to low, cover
     Duration: 22 min
     [▶ Start lentil timer — 22 min]  [Optional — skip if using rice cooker logic]

  [If grain needs timing:]
  ④ Brown Rice — Rice Cooker
     Press start — fully hands off
     [No timer needed ✓]  ← rice cooker handles itself
```

### Temperature Conflict Handling

If fish and chicken require different temperatures (e.g. fish at 400°F, Teriyaki chicken at 375°F), and both are going in simultaneously, display a resolution note:

```
⚠️ Temperature Note
  Fish needs 400°F · Chicken needs 375°F this week.
  Two options:
  Option A: Bake fish first at 400°F (12–15 min),
            then reduce to 375°F and load chicken.
  Option B: Bake both at 375°F — add 3–5 min to fish cook time.
  Recommended: Option A for best results.
```

---

## 2.6 Cooking Mode

### Activation

A **"Start Cooking"** button appears at the top of the Prep Day tab when a confirmed plan exists. Tapping it activates Cooking Mode.

Alternatively, each individual step has a **"▶ Start"** button that activates Cooking Mode focused on that step — useful for jumping into a specific step mid-session.

### Layout — Partial Focus

```
┌─────────────────────────────────────────────────────────┐
│  COOKING MODE                              [Exit ✕]     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ACTIVE TIMERS                                          │
│  ┌────────────────────────┐  ┌────────────────────────┐ │
│  │ 🔴 Chicken + Broccoli  │  │ 🟡 Fish Fillets        │ │
│  │       28:14            │  │       08:43            │ │
│  │   ⚠️ Glaze at 30 min   │  │   ✓ No mid-cook sauce  │ │
│  │   [Phase 1 of 2]       │  │                        │ │
│  └────────────────────────┘  └────────────────────────┘ │
│  ┌────────────────────────┐                             │
│  │ 🟢 Lentils (stovetop)  │                             │
│  │       19:30            │                             │
│  └────────────────────────┘                             │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  ACTIVE STEP                                            │
│  ─────────────────────────────────────────────────────  │
│  Step 5 of 8 · Everything in the Oven                  │
│                                                         │
│  [Full step content — expanded]                        │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  NEXT UP                                                │
│  Step 6 — Pull, cool, and portion          [dimmed]     │
│  Step 7 — Breakfast prep                  [dimmed]     │
├─────────────────────────────────────────────────────────┤
│  COMPLETED                                              │
│  ✓ Step 1 — Setup                                       │
│  ✓ Step 2 — Wednesday marinade                          │
│  ✓ Step 3 — Make sauces                                 │
│  ✓ Step 4 — Season proteins                             │
└─────────────────────────────────────────────────────────┘
```

### Active Timer Card Colors

| Color | Meaning |
|---|---|
| 🔴 Red | Sauce alert coming — less than 5 min until application point |
| 🟡 Yellow | Active — cooking in progress |
| 🟢 Green | Active — no sauce alert |
| ⚫ Grey | Completed |

---

## 2.7 Timer System

### Timer Store — `timerStore.ts`

**File:** `src/stores/timerStore.ts`

```ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type TimerStatus =
  | 'idle'
  | 'running'
  | 'paused-for-sauce'  // waiting for user to confirm sauce applied
  | 'phase-2'           // post-sauce final cook phase
  | 'completed'
  | 'expired'           // end time passed while user was away

export interface ActiveTimer {
  id:                string      // unique — e.g. 'chicken-thighs-sunday'
  label:             string      // display name e.g. 'Chicken + Broccoli'
  phase:             1 | 2
  status:            TimerStatus
  endTime:           number      // absolute timestamp (ms) — persisted
  totalDurationMs:   number      // original duration in ms
  sauceAlertAtMs?:   number      // absolute timestamp when sauce alert fires
  sauceName?:        string      // name of sauce to apply at alert
  sauceInstructions?: string     // how to apply it
  sauceApplied:      boolean
  hasTimer:          boolean     // false = display only (rice cooker)
  completed:         boolean
  expired:           boolean
  expiredByMs?:      number      // how long ago it expired when user returned
}

export const useTimerStore = defineStore('timers', () => {

  const timers = ref<ActiveTimer[]>([])

  // Computed remaining ms for a given timer — recalculated from absolute endTime
  function getRemainingMs(timerId: string): number {
    const timer = timers.value.find(t => t.id === timerId)
    if (!timer || !timer.hasTimer) return 0
    if (timer.status === 'paused-for-sauce') return 0
    return Math.max(0, timer.endTime - Date.now())
  }

  function startTimer(timer: Omit<ActiveTimer, 'status' | 'completed' | 'expired' | 'sauceApplied'>) {
    const existing = timers.value.findIndex(t => t.id === timer.id)
    const newTimer: ActiveTimer = {
      ...timer,
      status: 'running',
      completed: false,
      expired: false,
      sauceApplied: false,
    }
    if (existing >= 0) {
      timers.value[existing] = newTimer
    } else {
      timers.value.push(newTimer)
    }
  }

  function confirmSauceApplied(timerId: string, phase2DurationMs: number) {
    const timer = timers.value.find(t => t.id === timerId)
    if (!timer) return
    timer.sauceApplied = true
    timer.phase = 2
    timer.status = 'phase-2'
    timer.endTime = Date.now() + phase2DurationMs  // new absolute end time for phase 2
  }

  function skipSauce(timerId: string, remainingMs: number) {
    const timer = timers.value.find(t => t.id === timerId)
    if (!timer) return
    timer.sauceApplied = false
    timer.phase = 2
    timer.status = 'phase-2'
    timer.endTime = Date.now() + remainingMs
  }

  function completeTimer(timerId: string) {
    const timer = timers.value.find(t => t.id === timerId)
    if (!timer) return
    timer.status = 'completed'
    timer.completed = true
  }

  function clearCompleted() {
    timers.value = timers.value.filter(t => !t.completed)
  }

  function clearAll() {
    timers.value = []
  }

  // Called on mount — reconciles timers against current time
  function reconcileOnMount() {
    const now = Date.now()
    timers.value.forEach(timer => {
      if (!timer.hasTimer || timer.completed) return

      if (timer.status === 'running' || timer.status === 'phase-2') {
        if (timer.endTime <= now) {
          // Timer expired while user was away
          timer.expired = true
          timer.expiredByMs = now - timer.endTime
          timer.status = 'expired'
        }
        // If sauce alert passed while away but timer not yet done
        if (
          timer.sauceAlertAtMs &&
          timer.sauceAlertAtMs <= now &&
          !timer.sauceApplied &&
          timer.phase === 1 &&
          timer.endTime > now
        ) {
          timer.status = 'paused-for-sauce'
        }
      }
    })
  }

  const activeTimers = computed(() =>
    timers.value.filter(t => !t.completed)
  )

  const hasActiveTimers = computed(() =>
    activeTimers.value.length > 0
  )

  return {
    timers,
    activeTimers,
    hasActiveTimers,
    getRemainingMs,
    startTimer,
    confirmSauceApplied,
    skipSauce,
    completeTimer,
    clearCompleted,
    clearAll,
    reconcileOnMount,
  }

}, {
  persist: true  // endTime persists across page leaves via localStorage
})
```

---

## 2.8 Timer Persistence — Page Leave & Return

### How It Works

Timers store `endTime` as an absolute Unix timestamp (milliseconds). When the user leaves and returns, remaining time is recalculated from `endTime - Date.now()` — no background process required.

```ts
// In the timer display component — computed every tick
const remainingMs = computed(() => Math.max(0, props.timer.endTime - Date.now()))
const remainingDisplay = computed(() => formatMs(remainingMs.value))
```

`reconcileOnMount()` is called in `App.vue` `onMounted` hook to immediately handle any timers that fired while the user was away.

### Expired Timer UI

When a timer's `endTime` has passed on return:

```
⚠️ Chicken + Broccoli — Timer expired 4 min ago
   [If sauce not yet applied and phase = 1:]
   Apply Teriyaki Glaze now if you haven't already.
   [Already applied — start 10 min final timer]
   [Skip glaze]

   [If phase 2 or no sauce alert:]
   Check on your protein — it may be done.
   [Mark as complete]
```

### Sauce Alert — Mid-Cook Pause

When `Date.now()` reaches `sauceAlertAtMs` during an active Phase 1 timer:

1. Timer pauses visually (keeps counting but changes color to red)
2. Active step card expands sauce application instructions
3. Prominent alert displayed:

```
🔴 Time to apply the sauce!

  Teriyaki Glaze — Chicken Thighs
  Open oven, brush glaze evenly over all pieces.
  Close oven — 10 minutes remaining.

  [✓ Done — Start 10 min final timer]
  [Skip glaze]
```

Tapping "Done" calls `confirmSauceApplied()` — sets `endTime` to `now + 10min`, advances to Phase 2.
Tapping "Skip glaze" calls `skipSauce()` — continues timer with remaining original time.

---

## 2.9 Timer Component Spec

**File:** `src/components/meal/CookTimer.vue`

```
Props:
  - timer: ActiveTimer

Behavior:
  - Displays label, phase indicator, countdown MM:SS
  - Color: yellow (running) → red (sauce alert imminent < 5 min)
            → flashing red (sauce alert now) → green (phase 2)
  - Tick interval: setInterval 1000ms, updates remainingMs
  - On component unmount: clearInterval (prevent memory leaks)
  - On component mount: reads endTime, calculates remaining immediately
    (no delay even if component mounts mid-count)
  - Shows sauce name and alert time if sauceAlertAtMs set
  - Shows "Phase 1 of 2" / "Phase 2 of 2" when applicable

Emits:
  - sauce-alert-fired (when sauceAlertAtMs reached)
  - timer-completed   (when endTime reached)
  - confirm-sauce-applied (user tapped done)
  - skip-sauce            (user tapped skip)
```

**File:** `src/components/meal/TimerBar.vue`

```
Displays all active timers in a horizontal scrollable row
at the top of Cooking Mode — always visible regardless
of which step is active.

Props:
  - timers: ActiveTimer[]

Behavior:
  - Each timer renders as a compact CookTimer card
  - Horizontal scroll if more than 2 timers
  - Sticky at top of cooking mode layout
  - Tapping a timer card scrolls the active step
    panel to that timer's corresponding step
```

---

## 2.10 Optional Timers — Rice Cooker

The rice cooker step has `hasTimer: false` by default. The step card renders a toggle:

```
🍚 Brown Rice — Rice Cooker
   Press start on rice cooker — fully hands off.

   [Add optional timer anyway]  ← renders a basic countdown if tapped
                                   not two-phase, no sauce alert
```

When tapped, a simple countdown timer is added with `hasTimer: true` and no `sauceAlertAtMs`. This gives the user a visual reference if they want it without forcing it on them.

---

## 2.11 Cooking Mode Step Navigation

### Step Completion

Each step in Cooking Mode has a **"Mark as done"** button. Tapping it:
1. Marks the step complete (moved to Completed section)
2. Auto-expands the next step
3. If the next step has a timer, shows "▶ Start [Item] timer" prominently

### Manual Navigation

User can tap any step to expand it regardless of which step is "active." This allows jumping back to review a previous step or skip ahead to preview a future one without disrupting the active timers.

### Exit Cooking Mode

Tapping "Exit ✕" in the header:
1. Returns to Reference Mode layout
2. Active timers continue running in the background (persisted via store)
3. A small timer indicator bar remains visible at the top of Reference Mode showing any still-running timers
4. Tapping the indicator bar re-enters Cooking Mode

---

## 2.12 Wednesday Cast Iron — Cooking Mode Support

The Cast Iron tab gets its own **"Start Wednesday Cook"** button that launches a simplified Cooking Mode for the cast iron session:

```
Wednesday Cast Iron — Cooking Mode

ACTIVE TIMER
┌──────────────────────────────────┐
│ 🟡 [Cast Iron Protein]           │
│          03:45                   │
│   Side 1 of 2 — don't move it   │
│   [Flip] → starts side 2 timer  │
└──────────────────────────────────┘

Steps:
1. Heat cast iron 2 min — high heat    [▶ Start 2 min preheat]
2. Add avocado oil
3. Cook side 1                         [▶ Start side 1 timer]
4. Flip                                [Flip → side 2 timer]
5. Add vegetables to pan               [at last 2 min]
6. Rest 3–5 min                        [▶ Start rest timer]
7. [If serving sauce:]
   Build [Sauce Name] in pan           [inline recipe — collapsible]
8. Slice and serve
```

The flip button replaces the standard timer completion — rather than "mark as done," the user taps "Flip" which starts a new timer for Side 2 automatically.

For steak, the rest timer fires after Side 2 completes and prompts:
```
⏱️ Resting — 4:00
   Do not cut yet. Resting keeps the juices inside.
   [Build pan sauce now if applicable — collapsible recipe]
```

---

## 2.13 Background Timer Behavior Note

> **Future Feature — Not in current scope**
>
> Background timer notifications (firing when the app is not in focus) require the Web Notifications API with user permission, or a native mobile app wrapper (Capacitor, Ionic). This is noted for a future release.
>
> **Current behavior:** If the user leaves the page, timers persist via absolute `endTime` timestamps stored in Pinia localStorage. On return, `reconcileOnMount()` immediately calculates how much time has passed and shows the correct remaining time or an expired state. The user is assumed to remain on the page during active cooking sessions.

---

## 2.14 New Files Summary

| File | Purpose |
|---|---|
| `src/stores/timerStore.ts` | All timer state — concurrent, two-phase, persistent |
| `src/stores/sauceInventoryStore.ts` | Sauce in-stock tracking — persists until cleared |
| `src/data/cookConfig.ts` | Standard cooking temps and durations per protein type |
| `src/components/meal/CookTimer.vue` | Individual countdown timer card |
| `src/components/meal/TimerBar.vue` | Sticky concurrent timer bar — cooking mode header |
| `src/components/meal/SauceRecipeCard.vue` | Collapsible inline sauce recipe in prep timeline |
| `src/components/meal/CookingModeLayout.vue` | Partial focus cooking mode wrapper |
| `src/components/meal/SauceAlertModal.vue` | Mid-cook sauce application alert |
| `src/components/meal/CastIronCookMode.vue` | Wednesday cast iron cooking mode |

---

## 2.15 Summary of All Affected Files

| File | Change |
|---|---|
| `src/types/meal.types.ts` | Add `ApplicationTiming`, `TemperatureAdjustment` types and fields to `Sauce` |
| `src/types/randomizer.types.ts` | No changes in this phase |
| `src/data/fishSauces.ts` | Add `applicationTiming` + `temperatureAdjustment` to all objects |
| `src/data/chickenSauces.ts` | Add `applicationTiming` + `temperatureAdjustment` to all objects |
| `src/data/castIronMarinades.ts` | Add `applicationTiming` + `temperatureAdjustment` to all objects |
| `src/data/shrimpSauces.ts` | Add `applicationTiming` + `temperatureAdjustment` to all objects |
| `src/data/cookConfig.ts` | New file — standard cooking configs per protein |
| `src/stores/timerStore.ts` | New file — full timer system |
| `src/stores/sauceInventoryStore.ts` | New file — sauce inventory |
| `src/views/meal/PrepDayView.vue` | Full rewrite — dynamic timeline, reference + cooking mode |
| `src/views/meal/CastIronView.vue` | Add Wednesday cooking mode, application timing notes |
| `src/views/meal/SaucesView.vue` | Add `applicationTiming` indicator and temp adjustment warning |
| `src/components/meal/CookTimer.vue` | New component |
| `src/components/meal/TimerBar.vue` | New component |
| `src/components/meal/SauceRecipeCard.vue` | New component |
| `src/components/meal/CookingModeLayout.vue` | New component |
| `src/components/meal/SauceAlertModal.vue` | New component |
| `src/components/meal/CastIronCookMode.vue` | New component |
| `src/assets/main.css` | Timer color states — red, yellow, green variants |
| `App.vue` | Call `timerStore.reconcileOnMount()` in `onMounted` hook |

---

## 2.16 Development Checklist

### Phase 1 — Sauce Timing & Temperature
- [ ] Add `ApplicationTiming` and `TemperatureAdjustment` types to `meal.types.ts`
- [ ] Update `Sauce` interface with new fields
- [ ] Add `applicationTiming` + `temperatureAdjustment` to all sauce data objects
- [ ] Create `src/data/cookConfig.ts` with `standardCookConfig`
- [ ] Add timing indicator to Sauces tab sauce cards
- [ ] Add temperature warning to Sauces tab sauce cards
- [ ] Add application timing note to Cast Iron tab marinade cards
- [ ] Implement `getOvenTemp()` helper in `fridgeEngine.ts`
- [ ] Implement `getSauceApplicationOffset()` helper in `fridgeEngine.ts`

### Phase 2 — Dynamic Prep Day & Cooking Mode
- [ ] Create `sauceInventoryStore.ts` with persist
- [ ] Create `timerStore.ts` with persist and `reconcileOnMount()`
- [ ] Call `reconcileOnMount()` in `App.vue` `onMounted`
- [ ] Rewrite `PrepDayView.vue` — dynamic timeline from confirmed plan
- [ ] Build `buildPrepTimeline()` function with all step generators
- [ ] Build `SauceRecipeCard.vue` — collapsible inline recipe
- [ ] Build `CookTimer.vue` — countdown with phase support and sauce alert
- [ ] Build `TimerBar.vue` — concurrent sticky timer bar
- [ ] Build `CookingModeLayout.vue` — partial focus layout
- [ ] Build `SauceAlertModal.vue` — mid-cook pause and prompt
- [ ] Implement temperature conflict detection and resolution note
- [ ] Add optional timer toggle to rice cooker step
- [ ] Build `CastIronCookMode.vue` — flip timer, rest timer, pan sauce
- [ ] Add "Start Wednesday Cook" button to Cast Iron tab
- [ ] Weekly generation sauce inventory prompt in FridgeView State C
- [ ] Expired timer handling — UI for all expired states
- [ ] Cooking mode exit — persist timer bar in reference mode
- [ ] Accessibility — timer announcements for screen readers

---

## 2.17 Backlog

- [ ] Background notifications via Web Notifications API — future native app feature
- [ ] Voice prompts — "Time to apply the glaze" spoken alert using Web Speech API
- [ ] Cooking history — log what was cooked and when for future reference
- [ ] Custom timer — user adds an ad-hoc timer outside the generated plan
- [ ] Timer sharing — share active timers with a partner on the same network
- [ ] Haptic feedback on timer completion — navigator.vibrate() where supported

---

*End of dynamic prep day and cooking mode requirements.*
