# Breakfast Tab — Requirements Update

> **Document Type:** Incremental update to `meal-prep-technical-requirements.md` and `meal-prep-app-requirements.md`
> **Purpose:** Add a dedicated Breakfasts tab to the Meal Prep module
> **Scope:** New tab, new view, new data file, two new components, minor store addition
> **No schedule or per-person attribution — breakfasts are flexible and shared options**

---

## 1. Navigation Change

Add **Breakfasts** as a new tab in the Meal Prep nav bar, positioned between **Proteins & Grains** and **Shopping List**:

```
Meal Prep Nav (updated order):
  1. Proteins & Grains    → /meal/proteins
  2. Breakfasts           → /meal/breakfasts   ← NEW
  3. Shopping List        → /meal/shopping
  4. Prep Day             → /meal/prep
  5. Meal Plan            → /meal/plan
  6. Cast Iron Night      → /meal/cast-iron
  7. Sauces               → /meal/sauces
  8. Nutrients & Health   → /meal/nutrients
  9. Storage              → /meal/storage
```

---

## 2. New Route

Add to `src/router/index.ts` inside the `/meal` children array:

```ts
{ path: 'breakfasts', component: () => import('@/views/meal/BreakfastsView.vue') },
```

---

## 3. New View

**File:** `src/views/meal/BreakfastsView.vue`

### Layout (top to bottom):

1. **Flexible note callout** (green variant)
2. **Section label** — "Breakfast Options"
3. **Breakfast card grid** — 2 columns desktop, 1 column mobile
   - Card 1: Steel Cut Oats
   - Card 2: Chia Seed Pudding
4. **Section label** — "Sunday Batch Prep"
5. **Batch prep instructions block**
6. **Section label** — "Nutritional Highlights"
7. **Nutrient comparison table**

---

## 4. Content Specification

### 4.1 Flexible Note Callout

Variant: `green`

> Breakfasts are flexible — eat what works each morning. These two options are easy to batch prep on Sunday and require no cooking on weekday mornings. Neither is required every day.

---

### 4.2 Breakfast Cards

#### Card 1 — Steel Cut Oats

```
Icon: 🥣
Title: Steel Cut Oats
Subtitle: Savory style — egg, soy sauce, hot sauce

Why steel cut over rolled:
Less processed, slower digesting, keeps you full significantly longer.
Lower glycemic index — no mid-morning energy crash.

How to eat it:
Cook a batch, reheat one portion each morning in 90 seconds.
Top with a fried egg, a drizzle of low-sodium soy sauce, and hot sauce.
Savory oats are common in East Asian breakfasts — nutritionally excellent.
The egg adds protein and healthy fat; soy sauce adds umami; hot sauce
adds flavor with essentially zero calories.

Batch cook ratio:
1 cup dry steel cut oats + 3 cups water + pinch of salt
Simmer covered 22–25 min → makes ~3 large servings
Stores in fridge up to 5 days
Reheat: 90 seconds microwave with a splash of water
```

#### Card 2 — Chia Seed Pudding

```
Icon: 🫙
Title: Chia Seed Pudding
Subtitle: With raspberries, blueberries, and granola

How to eat it:
Make jars Sunday night. Grab one from the fridge each morning.
Add fruit and granola in the morning — not ahead of time
(granola goes soggy, berries bleed into the pudding overnight).

Per jar recipe:
3 tbsp chia seeds
¾ cup milk (any — dairy, almond, oat)
Small drizzle of honey or maple syrup
Stir well, lid, refrigerate overnight

Toppings (add fresh each morning):
Fresh raspberries and/or blueberries
Granola — check label, look for under 8g sugar per serving

Granola note:
Many store-bought granolas are high in added sugar.
Look for one with under 8g sugar per serving, or make a simple
batch with oats + honey + nuts.

Makes: 1 jar (scale up — make 5 at once on Sunday)
Stores: 5 days refrigerated (without toppings)
```

---

### 4.3 Sunday Batch Prep Instructions

Display as a simple two-column card grid (one card per breakfast option):

#### Oats Batch Card

```
Title: Steel Cut Oats Batch
When: Sunday evening
Time: ~25 min (mostly hands-off)

Steps:
1. Combine 1 cup dry steel cut oats + 3 cups water + pinch of salt in a medium pot
2. Bring to a boil over medium-high heat
3. Reduce to low, cover, simmer 22–25 min
4. Remove from heat, let cool 10 min before lidding
5. Store in a single container in the fridge

Makes: ~3 large servings
Keeps: 5 days refrigerated
Reheat per serving: 90 sec microwave + splash of water, stir

Alternative — slow cooker overnight:
Combine same ratio before bed, cook on low 6–8 hrs.
Ready when you wake up. No active time at all.
```

#### Chia Jars Batch Card

```
Title: 5 Chia Pudding Jars
When: Sunday evening (takes ~5 min)
Time: 5 min active, overnight passive

Steps:
1. Line up 5 small mason jars (4oz or 8oz)
2. Add 3 tbsp chia seeds to each jar
3. Add ¾ cup milk to each jar
4. Add a small drizzle of honey or maple syrup to each
5. Stir each jar well — chia seeds clump if unstirred
6. Lid and refrigerate overnight

Makes: 5 jars (Mon–Fri)
Keeps: 5 days refrigerated (without toppings)
Add toppings: fresh each morning — raspberries, blueberries, granola

Storage tip: Standard Ball mason jars work perfectly.
4oz jars for a lighter breakfast, 8oz for a larger one.
```

---

### 4.4 Nutritional Highlights Table

Display as a comparison table with columns: Nutrient · Steel Cut Oats · Chia Pudding

| Nutrient | Steel Cut Oats | Chia Seed Pudding |
|---|---|---|
| Protein | ~5g per serving (more with egg: +6g) | ~5g per jar (more with Greek yogurt added) |
| Fiber | ~4g — slow digesting, very filling | ~10g — chia seeds are exceptionally high in fiber |
| Omega-3s | Minimal | High — chia seeds are one of the best plant-based omega-3 sources |
| Antioxidants | Low on their own | High — raspberries and blueberries are among the best fruits for antioxidants |
| Glycemic Index | Low — sustained energy, no crash | Low — chia gel slows digestion significantly |
| Prep time (morning) | 90 sec reheat | Zero — grab jar from fridge |
| Best for | Post-workout mornings, savory preference | Busy mornings, lighter appetite, sweet preference |
| Customizable | Yes — toppings, sweet or savory | Yes — any fruit, milk type, sweetener |

Add a small callout below the table (gold variant):

> **Granola note:** Granola is the one ingredient here worth reading the label on. Many store-bought versions have 12–18g of added sugar per serving. Look for options under 8g sugar per serving, or make a simple batch: rolled oats + a drizzle of honey + nuts + a pinch of salt, baked at 325°F for 20 min. Keeps 2 weeks in a jar.

---

## 5. New Data File

**File:** `src/data/breakfasts.ts`

```ts
import type { Breakfast } from '@/types/meal.types'

export const breakfasts: Breakfast[] = [
  {
    id: 'steel-cut-oats',
    name: 'Steel Cut Oats',
    subtitle: 'Savory style — egg, soy sauce, hot sauce',
    icon: '🥣',
    description: `Less processed and slower digesting than rolled oats.
      Lower glycemic index means sustained energy with no mid-morning crash.
      Top with a fried egg, low-sodium soy sauce, and hot sauce.`,
    batchRecipe: {
      ingredients: [
        { amount: '1 cup', name: 'steel cut oats' },
        { amount: '3 cups', name: 'water' },
        { amount: '1 pinch', name: 'salt' },
      ],
      steps: [
        'Combine oats, water, and salt in a medium pot',
        'Bring to a boil over medium-high heat',
        'Reduce to low, cover, simmer 22–25 min',
        'Cool 10 min before lidding and refrigerating',
      ],
      makes: '~3 large servings',
      keeps: '5 days refrigerated',
      reheating: '90 sec microwave with a splash of water',
      alternativeMethod: 'Slow cooker overnight — same ratio, low 6–8 hrs',
    },
    nutrients: {
      protein: '~5g per serving (+6g with egg)',
      fiber: '~4g',
      omega3s: 'Minimal',
      antioxidants: 'Low on their own',
      glycemicIndex: 'Low',
      morningPrepTime: '90 sec reheat',
    },
    toppings: ['Fried egg', 'Low-sodium soy sauce', 'Hot sauce'],
  },
  {
    id: 'chia-pudding',
    name: 'Chia Seed Pudding',
    subtitle: 'With raspberries, blueberries, and granola',
    icon: '🫙',
    description: `Make 5 jars Sunday night — grab one each morning with zero effort.
      Add fruit and granola fresh each morning, not ahead of time.`,
    batchRecipe: {
      ingredients: [
        { amount: '3 tbsp', name: 'chia seeds (per jar)' },
        { amount: '¾ cup', name: 'milk — dairy, almond, or oat (per jar)' },
        { amount: '1 drizzle', name: 'honey or maple syrup (per jar)' },
      ],
      steps: [
        'Line up 5 mason jars',
        'Add 3 tbsp chia seeds to each jar',
        'Add ¾ cup milk to each jar',
        'Add a small drizzle of honey or maple syrup',
        'Stir each jar well — chia seeds clump if unstirred',
        'Lid and refrigerate overnight',
      ],
      makes: '5 jars (Mon–Fri)',
      keeps: '5 days refrigerated (without toppings)',
      reheating: 'No reheating — serve cold',
      alternativeMethod: null,
    },
    nutrients: {
      protein: '~5g per jar',
      fiber: '~10g — exceptionally high',
      omega3s: 'High — one of the best plant-based sources',
      antioxidants: 'High — from raspberries and blueberries',
      glycemicIndex: 'Low — chia gel slows digestion',
      morningPrepTime: 'Zero — grab from fridge',
    },
    toppings: ['Fresh raspberries', 'Fresh blueberries', 'Low-sugar granola'],
    granolaNotes: 'Look for under 8g sugar per serving. Or make your own: rolled oats + honey + nuts + pinch of salt, baked at 325°F for 20 min. Keeps 2 weeks in a jar.',
  },
]
```

---

## 6. New TypeScript Interface

Add to `src/types/meal.types.ts`:

```ts
export interface BatchRecipe {
  ingredients: Ingredient[]
  steps: string[]
  makes: string
  keeps: string
  reheating: string
  alternativeMethod: string | null
}

export interface BreakfastNutrients {
  protein: string
  fiber: string
  omega3s: string
  antioxidants: string
  glycemicIndex: string
  morningPrepTime: string
}

export interface Breakfast {
  id: string
  name: string
  subtitle: string
  icon: string
  description: string
  batchRecipe: BatchRecipe
  nutrients: BreakfastNutrients
  toppings: string[]
  granolaNotes?: string
}
```

---

## 7. New Components

### `BreakfastCard.vue`

```
File: src/components/meal/BreakfastCard.vue

Props:
  - breakfast: Breakfast

Layout:
  - Header: icon + name (Cormorant Garamond display font) + subtitle (muted small caps)
  - Description body text
  - Toppings list with · prefix in var(--green)
  - Granola note if present (italic, separated by top border rule)
  - Card surface: var(--paper), border var(--rule)
  - No color-coding needed — breakfasts are neutral (no protein type association)
```

### `BatchPrepCard.vue`

```
File: src/components/meal/BatchPrepCard.vue

Props:
  - breakfast: Breakfast
  - (renders the batchRecipe property)

Layout:
  - Title: "[Name] Batch"
  - When + Time meta row (small muted text)
  - Ingredients list with amount + name
  - Numbered steps list
  - Makes / Keeps / Reheat stat row at bottom
  - Alternative method note if present (italic callout-style)
  - Card surface: var(--paper), border var(--rule)
```

---

## 8. Prep Day Tab Update

In `src/views/meal/PrepDayView.vue`, add a reference at the bottom of the Sunday timeline (after the final "Done" step) pointing to the Breakfasts tab:

```
Add a small callout (green variant) after the timeline:

"Sunday breakfast prep: After portioning your meals, make the oat batch
and/or 5 chia pudding jars. Both take under 10 minutes combined and are
covered in full on the Breakfasts tab."
```

This keeps the prep day timeline focused on lunch and dinner prep while acknowledging breakfast prep exists without duplicating the content.

---

## 9. No Changes Required To

- Shopping list (breakfasts are not included — shopped separately as before)
- Meal plan table (no breakfast rows — flexible)
- Nutrients tab (breakfast nutritional info lives on the Breakfasts tab itself)
- Pinia stores (no breakfast state needed — nothing to persist)
- Storage tab (storage guidance is embedded in the batch prep cards)

---

*End of breakfast tab requirements update.*
