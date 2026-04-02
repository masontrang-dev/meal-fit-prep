# Sauce & Marinade Requirements — Complete Reference

> **Document Type:** Addendum and replacement for sauce content in `meal-prep-app-requirements.md`, `fridge-engine-requirements.md`, and `dynamic-prep-day-requirements.md`
> **Scope:** Complete restructured sauce list, simple + detailed recipe formats, ingredient scaling system, data model updates
> **Action Required:** Update all existing sauce content in the application with the recipes and structure defined in this document
> **Version:** 1.0 — March 2026

---

## 1. Sauce Tab Structure

The Sauces tab is reorganized into four sections. All existing sauce content in the app must be replaced with the content defined in this document.

```
Section 1 — Fish Sauces          (8 sauces)
Section 2 — Chicken Sauces       (7 sauces)
Section 3 — Cast Iron Sauces & Marinades  (9 sauces)
  — Steak Finishes first (5), Marinades second (4)
Section 4 — Shrimp Pan Sauces    (4 sauces)
```

Total: 28 sauce entries. Note that Soy Garlic Ginger and Lime Cumin appear in both Section 3 (as marinades) and Section 4 (as shrimp pan sauces). They are the same recipe used in two contexts. In the data model they are one sauce object referenced by two pools. In the UI they appear in both sections with a note indicating dual use.

---

## 2. Sauce Card Format

Every sauce card has two states:

### Simple (Default — Collapsed)
```
[Sauce Name]
[Best for — 1 line]
[Key flavor — 1 sentence]
[Badges: Storage · Marinating · Application Timing · Scaling]
[▼ Full Recipe]
```

### Detailed (Expanded)
```
[Sauce Name]
[Best for — 1 line]
[Key flavor — 1 sentence]
[Badges]

Ingredients (scaled to current context):
  [Quantity selector: Cast Iron 1lb | Batch 2.5lb | Batch 3lb | Custom]
  · [amount] [unit] [ingredient name]
  · ...

Method:
  [Step by step preparation]

Application:
  [When and how to apply during cooking]
  [Temperature note if applicable]

Pairs with:
  [Proteins · Grains · Vegetables]

Storage:
  [How long · Where · Batch notes]

Tips:
  [Optional — variations, substitutions, common mistakes]

[▲ Collapse]
```

---

## 3. Ingredient Scaling System

### 3.1 Base Yield

All recipes are expressed per **1 lb of protein** (baseYieldLbs = 1). The app multiplies by the target quantity.

### 3.2 Default Batch Sizes (Fixed in `settingsStore`)

```ts
const defaultBatchSizes = {
  batchFish:    3.0,    // lbs — Sunday fish batch
  batchChicken: 2.5,    // lbs — Sunday chicken batch
  castIron:     1.0,    // lbs — Wednesday cast iron, always fixed
}
```

User can adjust these in Settings. They do not pull from the confirmed plan — they are fixed defaults.

### 3.3 Scaling Behaviors

```ts
type ScalingBehavior = 'linear' | 'fixed' | 'diminishing'

// linear    — scales directly with protein weight
// fixed     — always same quantity regardless of batch size (pan sauces)
// diminishing — scales with a cap (aromatics, salt)
```

### 3.4 Ingredient Interface

```ts
interface Ingredient {
  amount:          number
  unit:            IngredientUnit
  name:            string
  scalingBehavior: ScalingBehavior
  maxMultiplier?:  number    // cap for diminishing — e.g. 1.5
}

type IngredientUnit =
  | 'tsp' | 'tbsp' | 'cup'
  | 'oz' | 'lb' | 'g'
  | 'clove' | 'piece' | 'pinch'
  | 'to-taste'
```

### 3.5 Scaling Rules

- `linear`: `scaledAmount = amount × (targetLbs / baseYieldLbs)`
- `fixed`: `scaledAmount = amount` (never changes)
- `diminishing`: `scaledAmount = amount × min(multiplier, maxMultiplier)`
- `to-taste`: always displays as "to taste" — never scaled
- All scaled amounts formatted to nearest sensible cooking fraction (¼, ⅓, ½, ⅔, ¾, etc.)

### 3.6 Quantity Selector UI

In the Sauces tab (reference mode), each expanded sauce card shows:

```
Quantity: [Cast Iron — 1 lb ▾]
            Cast Iron — 1 lb
            Batch Fish — 3 lbs
            Batch Chicken — 2.5 lbs
            Custom...
```

In Prep Day cooking mode, quantities are auto-calculated from `settingsStore` batch sizes — no selector shown.

---

## 4. Data Model Updates

### 4.1 Updated `Sauce` Interface

```ts
export interface Sauce {
  id:                    string
  name:                  string
  section:               'fish' | 'chicken' | 'cast-iron' | 'shrimp'
  bestFor:               string
  flavorProfile:         string          // 1 sentence for simple view
  baseYieldLbs:          number          // always 1
  scalingBehavior:       ScalingBehavior
  ingredients:           Ingredient[]
  method:                string[]        // ordered steps
  application:           string          // when/how to apply during cooking
  applicationTiming:     ApplicationTiming
  temperatureAdjustment: TemperatureAdjustment
  pairsWith:             PairsWith
  storage:               SauceStorageInfo
  marinating:            MarinadeRequirement
  sundaySafe:            boolean
  tips?:                 string          // optional variations / common mistakes
  dualUse?:              string          // note if sauce appears in multiple sections
}

export interface PairsWith {
  proteins:   string[]
  grains:     string[]
  vegetables: string[]
}
```

---

## 5. Section 1 — Fish Sauces

---

### 5.1 Lemon Garlic

**Simple:**
Best for all fish varieties. Bright, clean, Mediterranean baseline that works every time.
Badges: 🧊 Fridge 2–3 weeks · 📦 Batchable · Apply Before · Marinate 30 min

**Detailed:**

*Ingredients (per 1 lb fish):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 2 | tbsp | olive oil | linear |
| 1 | tbsp | lemon juice (fresh) | linear |
| 2 | clove | garlic, minced | diminishing (max 1.5×) |
| ½ | tsp | salt | diminishing (max 1.25×) |
| ¼ | tsp | black pepper | diminishing (max 1.25×) |
| 1 | tbsp | fresh or dried parsley | linear |

*Method:*
1. Whisk olive oil and lemon juice together
2. Add minced garlic, salt, pepper, and parsley
3. Stir to combine

*Application:*
Drizzle over fish before baking. For best flavor, let sit 30 minutes after applying. Bake at 400°F for 12–15 min.

*Pairs with:* All fish · Brown rice, quinoa · Asparagus, green beans, broccoli

*Storage:* Fridge 2–3 weeks using garlic powder instead of fresh. With fresh garlic use within 5–7 days. Pantry version: omit garlic and lemon, store dry herb blend indefinitely.

*Tips:* For a batchable version swap fresh garlic for ¾ tsp garlic powder. Add lemon juice fresh when applying each time.

---

### 5.2 Cajun Spice Rub

**Simple:**
Best for tilapia and cod. Bold, smoky, slightly spicy dry rub. Make a large jar and keep in the pantry indefinitely.
Badges: 🏠 Pantry indefinitely · 📦 Make a big jar · Apply Before · No marinating needed

**Detailed:**

*Ingredients (per 1 lb fish):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 1 | tsp | smoked paprika | linear |
| ½ | tsp | cayenne pepper | linear |
| ½ | tsp | garlic powder | linear |
| ½ | tsp | onion powder | linear |
| ½ | tsp | dried oregano | linear |
| ½ | tsp | salt | diminishing (max 1.25×) |
| 1 | tbsp | olive oil | linear |

*Method:*
1. Combine all dry spices in a bowl and mix well
2. For a big batch: multiply all spice quantities by 10–20 and store in a sealed jar in the pantry
3. When using: measure out the per-pound quantity and mix with olive oil to form a paste

*Application:*
Rub paste firmly onto both sides of fish. Apply before cooking — no marinating time needed, though 30 minutes improves flavor penetration. Bake at 400°F for 12–15 min.

*Pairs with:* Tilapia, cod, mahi-mahi · Brown rice, quinoa · Broccoli, cauliflower, snap peas

*Storage:* Dry spice blend: pantry, indefinitely in sealed jar. Paste (with oil): fridge 3–5 days.

*Tips:* Reduce cayenne to ¼ tsp for a milder version. Excellent on shrimp too — same preparation.

---

### 5.3 Soy Ginger Glaze

**Simple:**
Best for salmon. Sweet-savory Asian glaze applied only in the last 5 minutes of baking. Makes a beautiful caramelized finish.
Badges: 🧊 Fridge 2–3 weeks · 📦 Batchable · Apply Last 5 Min · No marinating needed

**Detailed:**

*Ingredients (per 1 lb fish):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 2 | tbsp | low-sodium soy sauce | linear |
| 1 | tsp | sesame oil | linear |
| 1 | tsp | honey | linear |
| ½ | tsp | garlic powder | linear |
| ½ | tsp | ground ginger | linear |

*Method:*
1. Whisk all ingredients together until honey is fully dissolved
2. For a batch: multiply and store in a sealed jar in the fridge

*Application:*
Do NOT apply at the start of baking — honey burns. Bake fish at 400°F for 7–10 minutes first. Brush glaze on in the last 5 minutes only. Watch closely — the glaze caramelizes quickly.

*Pairs with:* Salmon, mahi-mahi · Quinoa, brown rice · Bok choy, snap peas, edamame

*Storage:* Fridge 2–3 weeks. Soy sauce acts as a natural preservative.

*Tips:* Optional — broil on high for the final 2 minutes for a deeper caramelized finish. Watch carefully to avoid burning.

---

### 5.4 Lemon Dill

**Simple:**
Best for salmon and cod. Light, herbaceous, Scandinavian-inspired. Clean flavor that lets the fish shine.
Badges: 🧊 Fridge 1 week · Apply Before · Marinate 30 min–2 hrs

**Detailed:**

*Ingredients (per 1 lb fish):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 2 | tbsp | olive oil | linear |
| 1 | tbsp | lemon juice (fresh) | linear |
| ½ | tsp | lemon zest | linear |
| 1 | tsp | dried dill (or 1 tbsp fresh) | linear |
| 1 | clove | garlic, minced | diminishing (max 1.5×) |
| ¼ | tsp | salt | diminishing (max 1.25×) |
| ¼ | tsp | black pepper | diminishing (max 1.25×) |

*Method:*
1. Whisk olive oil and lemon juice together
2. Add lemon zest, dill, garlic, salt, and pepper
3. Stir to combine

*Application:*
Drizzle over fish and let sit 30 minutes minimum before baking. Bake at 400°F for 12–15 min.

*Pairs with:* Salmon, cod · Quinoa, jasmine rice · Asparagus, snap peas, green beans

*Storage:* Fridge 1 week with fresh garlic. 2 weeks with garlic powder substitution.

*Tips:* Fresh dill is significantly better than dried if available. Add 1 tsp capers for a more complex flavor. Works well cold as a dressed salad component.

---

### 5.5 Mango Salsa

**Simple:**
Best for white fish (tilapia, cod) and salmon. Bright, tropical, fresh. Made at serving — never cooked.
Badges: 🧊 Fridge 3 days · Not batchable — always fresh · Apply at Serving

**Detailed:**

*Ingredients (per 1 lb fish — fixed, not scaled):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 1 | cup | fresh or frozen mango, diced | fixed |
| ¼ | cup | red onion, finely diced | fixed |
| 1 | piece | jalapeño, seeded and minced | fixed |
| 2 | tbsp | fresh cilantro, chopped | fixed |
| 1 | tbsp | lime juice | fixed |
| ¼ | tsp | salt | fixed |

*Method:*
1. Dice mango into small even pieces (~½ inch)
2. Finely dice red onion and mince jalapeño
3. Combine all ingredients in a bowl
4. Stir gently and taste — adjust lime and salt
5. Let sit 10 minutes for flavors to combine

*Application:*
Spoon generously over cooked fish at serving. Do not cook — heat kills the fresh flavor. Make just before serving or up to a few hours ahead.

*Pairs with:* Tilapia, cod, salmon · Jasmine rice, quinoa · Any roasted vegetable

*Storage:* Fridge 3 days. Mango softens over time — best on day 1 or 2.

*Tips:* Frozen mango works well — thaw and drain excess liquid first. Can substitute pineapple for a different tropical variation. Omit jalapeño for a milder version.

---

### 5.6 Garlic Butter

**Simple:**
Best for any fish variety. Rich, classic butter sauce applied in the last 3–5 minutes of baking. Simple and universally loved.
Badges: 🧊 Fridge 5 days · Apply Last 3–5 Min · No marinating needed

**Detailed:**

*Ingredients (per 1 lb fish):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 2 | tbsp | unsalted butter | fixed |
| 1 | tbsp | olive oil | fixed |
| 2 | clove | garlic, minced | diminishing (max 1.5×) |
| 1 | tbsp | lemon juice | fixed |
| ¼ | tsp | salt | fixed |
| ¼ | tsp | black pepper | fixed |
| 1 | tbsp | fresh parsley, chopped | fixed |

*Method:*
1. In a small saucepan over medium heat, melt butter with olive oil
2. Add garlic and cook 60 seconds until fragrant — do not brown
3. Add lemon juice, salt, pepper, and parsley
4. Remove from heat

*Application:*
Bake fish at 400°F for 8–10 minutes first. Spoon garlic butter over fish in the last 3–5 minutes and return to oven. The butter bastes the fish and creates a golden finish.

*Pairs with:* All fish varieties, especially cod and mahi-mahi · Brown rice, quinoa · Asparagus, green beans, broccoli

*Storage:* Make fresh — 5 days in fridge but best made the day of. Reheat gently before using.

*Tips:* Do not brown the garlic — bitter flavor. Can substitute ghee for a nuttier flavor with higher smoke point. Add ½ tsp capers for a piccata variation.

---

### 5.7 Herb Butter

**Simple:**
Best for any fish, especially cod and mahi-mahi. Elevated finishing sauce with fresh herbs. Applied last 3–5 minutes of baking.
Badges: 🧊 Fridge 5 days · Apply Last 3–5 Min · No marinating needed

**Detailed:**

*Ingredients (per 1 lb fish):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 2 | tbsp | unsalted butter | fixed |
| 1 | tbsp | olive oil | fixed |
| 2 | clove | garlic, minced | diminishing (max 1.5×) |
| 1 | tsp | fresh or dried thyme | fixed |
| 1 | tsp | fresh or dried parsley | fixed |
| 1 | tbsp | lemon juice | fixed |
| ¼ | tsp | salt | fixed |
| ¼ | tsp | black pepper | fixed |

*Method:*
1. Melt butter with olive oil in a small pan over medium heat
2. Add garlic, cook 60 seconds until fragrant
3. Add thyme, parsley, lemon juice, salt, and pepper
4. Remove from heat immediately

*Application:*
Bake fish at 400°F for 8–10 minutes first. Spoon herb butter over fish in the last 3–5 minutes. Return to oven and watch closely — herbs can darken quickly.

*Pairs with:* Cod, mahi-mahi, tilapia · Quinoa, brown rice · Asparagus, green beans, zucchini

*Storage:* Fridge 5 days. Best made fresh. Can be made in advance and reheated gently.

*Tips:* Fresh herbs make a noticeable difference here. Rosemary works well as a thyme substitute. For a compound butter version: mix softened butter with herbs, roll in plastic wrap, freeze — slice off a piece to melt over cooked fish at serving.

---

### 5.8 Miso Glaze

**Simple:**
Best for salmon and mahi-mahi. Umami-rich Japanese-inspired glaze. Applied before baking — watch carefully as honey and miso can burn.
Badges: 🧊 Fridge 2 weeks · 📦 Batchable · Apply Before (last 8–10 min) · Marinate 30 min–4 hrs · ⚠️ 375°F recommended

**Detailed:**

*Ingredients (per 1 lb fish):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 2 | tbsp | white miso paste | linear |
| 1 | tbsp | low-sodium soy sauce | linear |
| 1 | tbsp | honey | linear |
| 1 | tbsp | rice vinegar | linear |
| 1 | tsp | sesame oil | linear |
| ½ | tsp | ground ginger | linear |

*Method:*
1. Whisk all ingredients together until smooth and fully combined
2. Miso paste can be lumpy — keep whisking until dissolved
3. For a batch: multiply and store in a sealed jar in the fridge

*Application:*
Spread glaze over fish. Marinate 30 min minimum, up to 4 hours. Bake at 375°F (not 400°F — honey and miso burn at higher heat) for 12–15 min. Optional: broil on high for final 2 minutes for a caramelized finish — watch carefully.

*Pairs with:* Salmon, mahi-mahi · Quinoa, brown rice · Bok choy, snap peas, edamame

*Storage:* Fridge 2 weeks. White miso paste itself keeps months refrigerated.

*Shopping note:* Add white miso paste to pantry staples once this sauce enters regular rotation.

*Tips:* White miso is milder and sweeter than red miso — do not substitute. If the glaze thickens in the fridge, whisk in a few drops of warm water before using.

---

## 6. Section 2 — Chicken Sauces

---

### 6.1 Italian Herb

**Simple:**
The Sunday batch workhorse. Savory, garlicky, Mediterranean. Versatile with any grain or vegetable — the reliable baseline for the week.
Badges: 🏠 Pantry (dry version) · 📦 Make a big jar · Apply Before · Overnight recommended

**Detailed:**

*Ingredients (per 1 lb chicken):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 2 | tbsp | olive oil | linear |
| 1½ | tsp | Italian seasoning blend | linear |
| 2 | clove | garlic, minced | diminishing (max 1.5×) |
| ½ | tsp | lemon zest | linear |
| ½ | tsp | salt | diminishing (max 1.25×) |
| ¼ | tsp | black pepper | diminishing (max 1.25×) |

*Method:*
1. Whisk olive oil, Italian seasoning, lemon zest, salt, and pepper together
2. Add minced garlic and stir
3. For a batchable dry version: combine Italian seasoning + garlic powder + salt + pepper in a jar. Add fresh olive oil and garlic when applying.

*Application:*
Coat chicken thoroughly on all sides. Marinate overnight for best results, minimum 2 hours. Bake thighs at 375°F for 35–40 min, breast at 375°F for 25–30 min.

*Pairs with:* Thighs and breast · Brown rice, quinoa, lentils · Broccoli, zucchini, asparagus

*Storage:* Dry blend: pantry indefinitely. Wet marinade: fridge 1 week with fresh garlic, 2 weeks with garlic powder.

*Tips:* Add ½ tsp red pepper flakes for heat. Works equally well on fish in a pinch.

---

### 6.2 Honey Mustard

**Simple:**
Sweet, tangy, and crowd-pleasing. Best on thighs. Apply in the last 10 minutes — honey burns at high heat. Use 375°F.
Badges: 🧊 Fridge 2–3 weeks · 📦 Batchable · Apply Last 8–10 Min · ⚠️ 375°F · Marinate 2+ hrs

**Detailed:**

*Ingredients (per 1 lb chicken):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 2 | tbsp | Dijon mustard | linear |
| 1 | tbsp | honey | linear |
| ½ | tsp | garlic powder | linear |
| ¼ | tsp | salt | diminishing (max 1.25×) |
| ¼ | tsp | black pepper | diminishing (max 1.25×) |
| 1 | tbsp | olive oil | linear |

*Method:*
1. Whisk all ingredients together until smooth
2. Honey and mustard can separate — whisk thoroughly
3. For a batch: multiply and store in sealed jar in fridge

*Application:*
Marinate chicken 2+ hours (overnight preferred). Bake at 375°F. Apply a fresh layer of sauce in the last 8–10 minutes for a glazed finish. The reserved sauce adds a second layer of flavor — do not use the same marinade you used on raw chicken.

*Pairs with:* Thighs · Brown rice, quinoa · Broccoli, green beans, cauliflower

*Storage:* Fridge 2–3 weeks. Dijon is already preserved — the blend is very stable.

*Tips:* Always keep reserved sauce separate from marinade used on raw chicken. For a spicier version add ½ tsp whole grain mustard or ¼ tsp cayenne.

---

### 6.3 Mexican Dry Rub

**Simple:**
Bold, smoky, Chipotle-style flavor. Excellent for grain bowls. Make a big jar — the most useful pantry rub in the collection.
Badges: 🏠 Pantry indefinitely · 📦 Make a big jar · Apply Before · Marinate 1–2 hrs

**Detailed:**

*Ingredients (per 1 lb chicken):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 1 | tsp | ground cumin | linear |
| 1 | tsp | chili powder | linear |
| ½ | tsp | garlic powder | linear |
| ½ | tsp | onion powder | linear |
| ½ | tsp | smoked paprika | linear |
| ½ | tsp | salt | diminishing (max 1.25×) |
| 1 | tbsp | olive oil | linear |

*Method:*
1. Combine all dry spices and mix well
2. For a big batch: multiply dry ingredients by 10–20 and store in a sealed jar in pantry
3. When using: measure per-pound quantity and mix with olive oil to form a paste

*Application:*
Rub paste firmly over all surfaces of chicken. Let sit 1–2 hours minimum, overnight improves depth. Bake thighs at 375°F for 35–40 min, breast at 375°F for 25–30 min.

*Pairs with:* Thighs and breast · Brown rice, quinoa, black beans, lentils · Bell peppers, broccoli, cauliflower

*Storage:* Dry blend: pantry indefinitely. Paste with oil: fridge 3–5 days.

*Tips:* Serve over rice with black beans and salsa for a Chipotle-style bowl. Add ¼ tsp cayenne for heat. Works well on fish and shrimp too.

---

### 6.4 Peanut Sauce

**Simple:**
Rich, nutty, Southeast Asian-inspired. Best on thighs. Marinate overnight — the peanut flavor penetrates deeply. Outstanding over rice with stir-fry vegetables.
Badges: 🧊 Fridge 1 week · Apply Before · Overnight recommended

**Detailed:**

*Ingredients (per 1 lb chicken):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 2 | tbsp | natural peanut butter (creamy) | linear |
| 1 | tbsp | low-sodium soy sauce | linear |
| 1 | tbsp | lime juice | linear |
| 1 | tsp | sesame oil | linear |
| 1 | tsp | honey | linear |
| ½ | tsp | garlic powder | linear |
| ½ | tsp | ground ginger | linear |
| 2 | tbsp | warm water (to thin) | fixed |

*Method:*
1. Combine peanut butter and soy sauce — it will look broken at first
2. Add lime juice, sesame oil, honey, garlic powder, and ginger
3. Whisk vigorously or use a fork to emulsify
4. Add warm water 1 tbsp at a time until pourable consistency

*Application:*
Coat chicken thoroughly — peanut sauce is thick, use hands to ensure even coverage. Marinate overnight minimum for best flavor. Bake thighs at 375°F for 35–40 min. Sauce will caramelize on the outside.

*Pairs with:* Thighs · Brown rice, quinoa · Bok choy, snap peas, stir-fry blend, broccoli

*Storage:* Fridge 1 week. Natural peanut butter separates — stir before each use.

*Shopping note:* Natural peanut butter (ingredients: peanuts, salt only) works significantly better than processed peanut butter in this recipe.

*Tips:* Make extra sauce and serve alongside for dipping. Add ½–1 tsp sriracha or chili flakes for heat. Thin with coconut milk instead of water for a richer version.

---

### 6.5 Buffalo-Ranch

**Simple:**
Bold, tangy, crowd-favorite American flavor. Works on both thighs and breast. Great for salad bowls and wraps.
Badges: 🧊 Fridge 1 week · Apply Before · Marinate 2+ hrs

**Detailed:**

*Ingredients (per 1 lb chicken):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 2 | tbsp | hot sauce (Frank's RedHot recommended) | linear |
| 1 | tbsp | ranch dressing | linear |
| 1 | tbsp | olive oil | linear |
| ½ | tsp | garlic powder | linear |
| ¼ | tsp | onion powder | linear |
| ¼ | tsp | salt | diminishing (max 1.25×) |
| ¼ | tsp | black pepper | diminishing (max 1.25×) |

*Method:*
1. Whisk hot sauce, ranch, and olive oil together
2. Add garlic powder, onion powder, salt, and pepper
3. Mix until combined

*Application:*
Coat chicken on all sides. Marinate 2+ hours minimum. Bake thighs at 375°F for 35–40 min, breast at 375°F for 25–30 min. Brush with a fresh layer of hot sauce in the last 5 minutes for a more intense flavor.

*Pairs with:* Thighs and breast · Brown rice, quinoa · Broccoli, cauliflower, celery sticks

*Storage:* Fridge 1 week.

*Tips:* Best served over a salad kit — the classic buffalo chicken salad. Frank's RedHot is the standard; Tabasco or Crystal are valid substitutes. For extra heat add another tbsp of hot sauce.

---

### 6.6 Teriyaki Glaze

**Simple:**
Sweet, savory, Japanese-inspired. Marinate overnight, then apply a fresh glaze in the last 10 minutes for a caramelized finish. Use 375°F — honey burns at 400°F.
Badges: 🧊 Fridge 2 weeks · 📦 Batchable · Apply Last 8–10 Min · ⚠️ 375°F · Overnight recommended

**Detailed:**

*Ingredients (per 1 lb chicken):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 1 | tbsp | low-sodium soy sauce | linear |
| 1 | tsp | honey | linear |
| 1 | tsp | rice vinegar | linear |
| ⅓ | tsp | sesame oil | linear |
| ¼ | tsp | garlic powder | linear |
| ¼ | tsp | ground ginger | linear |
| 1 | tsp | cornstarch + 1 tbsp cold water | fixed |

*Method:*
1. Whisk soy sauce, honey, rice vinegar, sesame oil, garlic powder, and ginger until honey dissolves
2. For a batch: multiply and store in sealed jar
3. Cornstarch slurry is optional — for a thicker glazed finish only

*Application:*
Marinate chicken overnight. Bake at 375°F. In the last 8–10 minutes, optionally heat reserved (unused) marinade in a small saucepan, add cornstarch slurry, stir until thickened, brush over chicken. Return to oven.

*Pairs with:* Thighs and breast · Brown rice, quinoa · Snap peas, bok choy, stir-fry blend

*Storage:* Fridge 2 weeks. Stir before using if ingredients have separated.

*Shopping note:* Add rice vinegar and cornstarch to pantry staples once this sauce enters rotation.

*Tips:* Always use reserved sauce for the glaze step — never reuse marinade that touched raw chicken. Pairs naturally with Asian cast iron marinades the same week for a cohesive flavor theme.

---

### 6.7 Lemon Herb

**Simple:**
Bright, clean, Mediterranean. The most versatile chicken sauce — pairs with everything. Marinate overnight for maximum herb penetration.
Badges: 🧊 Fridge 2 weeks (garlic powder version) · Apply Before · Overnight recommended

**Detailed:**

*Ingredients (per 1 lb chicken):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 2 | tbsp | olive oil | linear |
| 1 | tbsp | lemon juice (fresh) | linear |
| ½ | tsp | lemon zest | linear |
| 1 | tsp | dried oregano | linear |
| 1 | tsp | dried thyme | linear |
| 2 | clove | garlic, minced | diminishing (max 1.5×) |
| ½ | tsp | salt | diminishing (max 1.25×) |
| ¼ | tsp | black pepper | diminishing (max 1.25×) |
| 1 | tbsp | fresh parsley, chopped (optional) | fixed |

*Method:*
1. Whisk olive oil and lemon juice together
2. Add lemon zest, oregano, thyme, garlic, salt, and pepper
3. Stir to combine

*Application:*
Coat chicken thoroughly. Marinate 2 hours minimum, overnight preferred. Bake thighs at 375°F for 35–40 min, breast at 375°F for 25–30 min.

*Pairs with:* Thighs and breast · Quinoa, jasmine rice · Asparagus, zucchini, green beans, snap peas

*Storage:* Fridge 1 week with fresh garlic, 2 weeks with garlic powder substitution.

*Tips:* Most Mediterranean of the chicken sauces. Pairs naturally with chimichurri steak or herb butter fish weeks for a cohesive weekly flavor theme.

---

## 7. Section 3 — Cast Iron Sauces & Marinades

*Note: The following 5 steak finishes are applied after cooking or in the final moments. The 4 marinades that follow are applied before cooking and also work on chicken and fish in the cast iron slot.*

---

### 7.1 Classic Salt & Pepper

**Simple:**
The purest expression of steak. Coarse salt, cracked pepper, a knob of butter. This is all great steak needs. Always the right choice.
Badges: 🏠 Pantry staples · Apply Before · No marinating needed

**Detailed:**

*Ingredients (per 1 lb steak — fixed, pan sauce):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 1 | tsp | coarse sea salt or kosher salt | to-taste |
| 1 | tsp | cracked black pepper | to-taste |
| 1 | tbsp | avocado oil (for pan) | fixed |
| 1 | tbsp | unsalted butter (finish) | fixed |
| 1 | clove | garlic, smashed (optional) | fixed |

*Method:*
1. Season steak generously on both sides — press salt and pepper firmly in
2. Let sit at room temperature 20–30 minutes before cooking
3. Heat cast iron until smoking. Add avocado oil.
4. Cook steak without moving (flank/sirloin: 3–4 min per side)
5. In the last minute add butter and optionally garlic to the pan
6. Tilt pan and baste steak repeatedly with the foaming butter
7. Rest 5 minutes before slicing

*Application:*
Season before cooking. Butter baste at the end. This is a finish technique, not a sauce.

*Pairs with:* Flank steak, sirloin · Brown rice, quinoa, lentils · Any roasted vegetable

*Storage:* Pantry staples — no preparation needed ahead of time.

*Tips:* The quality of the salt matters here. Kosher salt or fleur de sel makes a noticeable difference. Rest the steak — this is not optional. Cutting too early loses all the juices.

---

### 7.2 Garlic Herb Butter

**Simple:**
Rich compound butter finish. Melt over sliced steak at serving. Elevates even a simple cut. Can be made ahead and frozen.
Badges: 🧊 Fridge 1 week · Freezer 3 months · Apply at Serving · No marinating needed

**Detailed:**

*Ingredients (per 1 lb steak — fixed pan finish):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 2 | tbsp | unsalted butter, softened | fixed |
| 2 | clove | garlic, minced | fixed |
| 1 | tsp | fresh rosemary, finely chopped | fixed |
| 1 | tsp | fresh thyme, finely chopped | fixed |
| 1 | tsp | fresh parsley, finely chopped | fixed |
| ¼ | tsp | salt | fixed |
| ¼ | tsp | black pepper | fixed |

*Method:*
1. Mix softened butter with all other ingredients until combined
2. For batch: roll in plastic wrap into a log shape, refrigerate or freeze
3. Slice off medallions as needed

*Application:*
Place a slice of compound butter directly on the sliced steak immediately after resting. The residual heat melts the butter into a sauce. Alternatively melt in the hot pan after removing steak and spoon over.

*Pairs with:* Flank steak, sirloin · Brown rice, quinoa · Asparagus, green beans, broccoli

*Storage:* Fridge 1 week. Frozen log keeps 3 months — slice off what you need each time.

*Tips:* Make a large frozen log at the start of the month — it requires zero Sunday prep after that. Slice a medallion directly from frozen and place on hot steak. Blue cheese version: substitute 1 tbsp crumbled blue cheese for some of the butter.

---

### 7.3 Red Wine Reduction

**Simple:**
Rich, elegant pan sauce built after the steak is cooked. Uses the fond (browned bits) in the cast iron for maximum flavor. Restaurant-quality in 5 minutes.
Badges: 🧊 Fridge 3 days · Not batchable — always fresh · Apply at Serving (pan sauce)

**Detailed:**

*Ingredients (per 1 lb steak — fixed pan sauce):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| ½ | cup | dry red wine | fixed |
| ¼ | cup | low-sodium beef or chicken broth | fixed |
| 1 | clove | garlic, minced | fixed |
| 1 | tsp | fresh thyme or ½ tsp dried | fixed |
| 1 | tbsp | unsalted butter | fixed |
| | | salt and pepper | to-taste |

*Method:*
1. Remove cooked steak from pan and set aside to rest
2. Reduce heat to medium — pan should still have browned bits
3. Add garlic and cook 30 seconds
4. Pour in red wine — it will sizzle aggressively
5. Scrape up all the browned bits from the bottom (this is the flavor)
6. Add broth and thyme — simmer until reduced by half, about 3–4 minutes
7. Remove from heat, swirl in cold butter until melted and glossy
8. Season to taste

*Application:*
Spoon over sliced steak at serving. Build the sauce while the steak is resting — timing aligns perfectly.

*Pairs with:* Flank steak, sirloin · Brown rice, quinoa · Asparagus, mushrooms, broccoli

*Storage:* Make fresh every time. Can be made 3 days ahead and reheated gently.

*Tips:* Use a wine you'd actually drink — cooking wine is noticeably inferior. A simple Cabernet, Merlot, or Côtes du Rhône works well. The butter at the end (monter au beurre) is what makes it glossy and restaurant-quality — don't skip it.

---

### 7.4 Fresh Chimichurri

**Simple:**
Vibrant, herby Argentinian sauce. Spoon generously over sliced steak at serving. One of the best steak sauces in the world. Takes 3 minutes to make.
Badges: 🧊 Fridge 5–7 days · Apply at Serving · No marinating needed

**Detailed:**

*Ingredients (per 1 lb steak — fixed finishing sauce):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| ½ | cup | fresh parsley, finely chopped | fixed |
| 3 | clove | garlic, minced | fixed |
| 3 | tbsp | olive oil | fixed |
| 1 | tbsp | red wine vinegar | fixed |
| ¼ | tsp | red pepper flakes | fixed |
| ¼ | tsp | salt | fixed |
| ¼ | tsp | black pepper | fixed |

*Method:*
1. Finely chop parsley — don't use a food processor, hand-chopped is better texture
2. Mince garlic finely
3. Combine all ingredients and stir
4. Taste and adjust — more vinegar for brightness, more oil for richness
5. Let sit 10 minutes before serving for flavors to develop

*Application:*
Spoon generously over sliced steak at serving. Can also be used as a marinade — coat steak and let sit 30 minutes before cooking. Never cooked — always applied at the end.

*Pairs with:* Flank steak, sirloin · Brown rice, quinoa, lentils · Any roasted vegetable

*Storage:* Fridge 5–7 days. Parsley darkens over time but flavor remains good through day 5. Never store fresh herb sauces with garlic in oil at room temperature — refrigerate only.

*Shortcut:* Trader Joe's chimichurri jar is a reliable store-bought alternative for weeks when you don't want to make it fresh.

*Tips:* Flat-leaf (Italian) parsley is significantly better than curly parsley for chimichurri. Can add 2 tbsp fresh oregano for a more traditional Argentine version. Make double — it keeps and is excellent on eggs, fish, and grain bowls too.

---

### 7.5 Soy Garlic Pan Sauce

**Simple:**
Fast, savory pan sauce built by deglazing the cast iron after cooking. Works on steak and chicken. The simplest restaurant technique you can do at home.
Badges: 🧊 Fridge 2–3 weeks (sauce base) · 📦 Batchable (base only) · Apply at Serving (pan sauce)

**Detailed:**

*Ingredients (per 1 lb protein — fixed pan sauce):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 2 | tbsp | low-sodium soy sauce | fixed |
| 1 | tbsp | sesame oil | fixed |
| 2 | clove | garlic, minced | fixed |
| 1 | tsp | honey | fixed |
| ½ | tsp | ground ginger | fixed |

*Method:*
1. Combine soy sauce, sesame oil, honey, and ginger in a small bowl
2. Remove cooked protein from pan and set aside to rest
3. Reduce heat to medium — pan will have browned bits
4. Add garlic to pan and cook 30 seconds
5. Pour sauce into hot pan — it will bubble and sizzle
6. Scrape up all browned bits
7. Simmer 60–90 seconds until slightly reduced
8. Spoon over protein at serving

*Application:*
Build in the pan immediately after cooking. Also works as a marinade for the cast iron protein — coat and let sit 2+ hours (Sunday-safe). In marinade use: wipe excess before cooking to prevent burning, then build a fresh batch in the pan after.

*Pairs with:* Steak, chicken breast, chicken thighs · Brown rice, quinoa · Bok choy, snap peas, stir-fry blend

*Storage:* Sauce base (without garlic): fridge 2–3 weeks. Always make the garlic component fresh.

*Tips:* This is the same base as Soy Garlic Ginger marinade — the pan sauce version omits the ginger and is built in the pan rather than used as a marinade. Can be used interchangeably based on preference.

---

### 7.6 Soy Garlic Ginger Marinade

**Simple:**
The best all-around cast iron marinade. Works on chicken, steak, and fish. Oil and soy-based — Sunday-safe, flavor only improves over 2–5 days.
Badges: 🧊 Fridge 2 weeks (pre-mixed) · ✅ Sunday Safe · Apply Before · Overnight recommended

**Detailed:**

*Ingredients (per 1 lb protein):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 3 | tbsp | low-sodium soy sauce | linear |
| 1 | tbsp | sesame oil | linear |
| 1 | tsp | honey | linear |
| 3 | clove | garlic, minced | diminishing (max 1.5×) |
| ½ | tsp | ground ginger | linear |
| | | cracked black pepper | to-taste |

*Method:*
1. Combine all ingredients and whisk until honey dissolves
2. Pour over protein in zip-lock bag on Sunday
3. Squeeze out air, seal, label with protein name and "Wednesday"
4. Refrigerate — the longer it marinates the better

*Application:*
Pat protein lightly dry before cooking — improves cast iron browning. Cook on high heat cast iron (chicken: 4–5 min per side, steak: 3–4 min per side). The marinade creates a beautiful dark crust.

*Also used as:* Shrimp pan sauce (see Section 4) — built in the pan after shrimp is cooked rather than used as a marinade.

*Pairs with:* Chicken thighs, chicken breast, flank steak · Brown rice, quinoa · Bok choy, snap peas, stir-fry blend

*Storage:* Mixed without protein: fridge 2 weeks. Once protein is added: refrigerate up to 5 days (chicken) or 5 days (steak).

---

### 7.7 Smoked Paprika Garlic Marinade

**Simple:**
Bold, smoky, deep flavor. Best on flank steak. Oil-based rub — Sunday-safe, no acid. Simple and reliable.
Badges: 🧊 Fridge 1 week · ✅ Sunday Safe · Apply Before · Marinate 2+ hrs

**Detailed:**

*Ingredients (per 1 lb protein):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 2 | tbsp | olive oil | linear |
| 1 | tbsp | smoked paprika | linear |
| 4 | clove | garlic, minced | diminishing (max 1.5×) |
| 1 | tsp | ground cumin | linear |
| ½ | tsp | salt | diminishing (max 1.25×) |
| ½ | tsp | cracked black pepper | diminishing (max 1.25×) |

*Method:*
1. Combine all ingredients and mix into a paste
2. Rub firmly into both sides of steak or chicken
3. Place in zip-lock bag, seal, refrigerate

*Application:*
Minimum 2 hours, overnight improves depth significantly. Pat lightly dry before hitting the cast iron. Cook on high heat — the smoked paprika creates a beautiful crust.

*Pairs with:* Flank steak, sirloin, chicken thighs · Lentils, quinoa · Any roasted vegetable

*Storage:* Mixed paste: fridge 1 week.

*Tips:* Smoked paprika (not regular paprika) is essential — the smoky flavor is the point. Substitute with chipotle powder for a spicier version.

---

### 7.8 Lime Cumin Marinade

**Simple:**
Mexican-inspired brightness. Citrus-based — marinate Tuesday only (acid breaks down chicken texture after 24 hrs). Excellent for bowl nights.
Badges: 🧊 Fridge 2 days · ⚠️ Tuesday Only · Apply Before · Marinate 2 hrs max on chicken / 48 hrs on steak

**Detailed:**

*Ingredients (per 1 lb protein):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 2 | tbsp | lime juice (fresh, ~1 lime) | linear |
| 2 | tbsp | olive oil | linear |
| 1 | tsp | ground cumin | linear |
| 1 | tsp | chili powder | linear |
| ½ | tsp | garlic powder | linear |
| ½ | tsp | salt | diminishing (max 1.25×) |

*Method:*
1. Whisk all ingredients together
2. Pour over protein in zip-lock bag Tuesday evening
3. Refrigerate — cook Wednesday

*Application:*
Marinate Tuesday evening only. Lime acid acts fast — 2 hours maximum on chicken breast or thighs to prevent mushy texture. Steak can handle up to 48 hours. Pat lightly dry before cooking.

*Also used as:* Shrimp pan sauce (see Section 4) — squeeze lime directly into pan after cooking shrimp, add spices and oil.

*Pairs with:* Chicken breast, chicken thighs, flank steak · Quinoa, jasmine rice, black beans · Bell peppers, broccoli

*Storage:* Marinade without protein: 2 days. With protein: cook within 24 hours (chicken) or 48 hours (steak).

---

### 7.9 Balsamic Herb Marinade

**Simple:**
Slightly sweet, deeply savory. Great on chicken thighs and sirloin. Vinegar-based — Tuesday only. Excellent with mushrooms in the pan.
Badges: 🧊 Fridge 2 days · ⚠️ Tuesday Only · Apply Before · Marinate 2–4 hrs

**Detailed:**

*Ingredients (per 1 lb protein):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 2 | tbsp | balsamic vinegar | linear |
| 2 | tbsp | olive oil | linear |
| 1 | tsp | Dijon mustard | linear |
| 2 | clove | garlic, minced | diminishing (max 1.5×) |
| 1 | tsp | dried rosemary | linear |
| ½ | tsp | dried thyme | linear |
| ½ | tsp | salt | diminishing (max 1.25×) |

*Method:*
1. Whisk balsamic vinegar, olive oil, and Dijon mustard together
2. Add garlic, rosemary, thyme, and salt
3. Stir to combine
4. Pour over protein in zip-lock bag Tuesday evening

*Application:*
Marinate Tuesday evening — 2–4 hours is sufficient. Balsamic is less acidic than citrus so slightly more forgiving, but best under 48 hours. Excellent with mushrooms and bell pepper added to the cast iron pan in the last 2 minutes of cooking.

*Pairs with:* Chicken thighs, sirloin steak · Quinoa, brown rice · Mushrooms, bell peppers, asparagus

*Storage:* Marinade without protein: fridge 1 week. With protein: cook within 48 hours.

---

## 8. Section 4 — Shrimp Pan Sauces

*Note: Shrimp is never marinated ahead of time — acid breaks down shrimp texture in minutes. All shrimp sauces are pan sauces built in the cast iron after shrimp is cooked. Season shrimp with salt, pepper, and a pinch of the dry spices just before cooking.*

*Soy Garlic Ginger and Lime Cumin from Section 3 also work as shrimp pan sauces — see those entries for full recipes. They are listed here for reference.*

---

### 8.1 Garlic Butter (Shrimp)

**Simple:**
Classic, rich, universally loved. The best shrimp pan sauce. Built in 2 minutes after shrimp is cooked. Works with any grain.
Badges: 🏠 Pantry + fridge staples · Always fresh — not batchable · Apply at Serving (pan sauce)

**Detailed:**

*Ingredients (per 1 lb shrimp — fixed pan sauce):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 3 | tbsp | unsalted butter | fixed |
| 4 | clove | garlic, minced | fixed |
| 1 | tbsp | lemon juice | fixed |
| ¼ | tsp | red pepper flakes | fixed |
| ¼ | tsp | salt | fixed |
| 1 | tbsp | fresh parsley, chopped (optional) | fixed |

*Method:*
1. Cook shrimp first (2–3 min per side on high heat cast iron)
2. Remove shrimp and set aside
3. Reduce heat to medium
4. Add butter — let melt
5. Add garlic — cook 60 seconds until fragrant, do not brown
6. Add lemon juice and red pepper flakes — it will sizzle
7. Return shrimp to pan, toss to coat
8. Add parsley and serve immediately

*Application:*
Always built after shrimp is cooked. Return shrimp to the pan just long enough to coat — shrimp overcooks in seconds. Serve immediately.

*Pairs with:* Shrimp · Quinoa, jasmine rice, brown rice · Any roasted vegetable

*Storage:* Make fresh every time. Sauce takes 2 minutes — there is no reason to batch this.

*Tips:* Do not brown the garlic — bitter flavor ruins the sauce. The lemon juice is essential — it brightens and balances the richness of the butter. Add capers for a piccata variation.

---

### 8.2 Cajun Butter (Shrimp)

**Simple:**
Bold, spicy, deeply flavored. The most exciting shrimp pan sauce. Same technique as Garlic Butter with Cajun spices added. Outstanding over quinoa with roasted bell pepper.
Badges: 🏠 Pantry + fridge staples · Always fresh — not batchable · Apply at Serving (pan sauce)

**Detailed:**

*Ingredients (per 1 lb shrimp — fixed pan sauce):*
| Amount | Unit | Ingredient | Scaling |
|---|---|---|---|
| 3 | tbsp | unsalted butter | fixed |
| 4 | clove | garlic, minced | fixed |
| 1 | tsp | smoked paprika | fixed |
| ½ | tsp | cayenne pepper | fixed |
| ½ | tsp | onion powder | fixed |
| 1 | tbsp | lemon juice | fixed |
| ¼ | tsp | salt | fixed |

*Method:*
1. Cook shrimp first (2–3 min per side)
2. Remove shrimp and set aside
3. Reduce heat to medium — add butter
4. Add garlic — cook 30 seconds
5. Add smoked paprika, cayenne, and onion powder — bloom spices in butter 30 seconds
6. Add lemon juice
7. Return shrimp, toss to coat, serve immediately

*Application:*
Same as Garlic Butter — built after cooking, serve immediately. The spices bloom in the butter for maximum flavor — that 30-second step matters.

*Pairs with:* Shrimp · Quinoa, brown rice · Bell peppers, broccoli, cauliflower

*Storage:* Make fresh every time.

*Tips:* Reduce cayenne to ¼ tsp for a milder version. Add a splash of hot sauce at the end for extra heat and acidity.

---

### 8.3 Soy Garlic Ginger (Shrimp)

*See Section 3.6 — Soy Garlic Ginger Marinade for full recipe.*

When used for shrimp: build as a pan sauce after cooking rather than as a marinade. Add sauce ingredients to the hot pan after removing shrimp, cook 60 seconds, return shrimp and toss to coat.

---

### 8.4 Lime Cumin (Shrimp)

*See Section 3.8 — Lime Cumin Marinade for full recipe.*

When used for shrimp: build as a pan sauce after cooking. Squeeze 1 lime directly into hot pan, add cumin and chili powder, toss shrimp to coat. Do not marinate shrimp in lime juice — even 10 minutes of acid contact begins to denature the protein.

---

## 9. Implementation Notes

### 9.1 Action Required

All existing sauce content in the application must be replaced with the content defined in this document. This includes:

- Sauces tab — all four sections, all 28 entries
- Prep Day tab — inline sauce recipes in the Make Sauces step
- Cast Iron tab — marinade card content
- FridgeEngine sauce pool arrays — sauce IDs must match `id` fields defined here

### 9.2 Sauce IDs

Use these IDs throughout the data model:

```
Fish Sauces:
  lemon-garlic · cajun-spice-rub · soy-ginger-glaze
  lemon-dill · mango-salsa · garlic-butter-fish
  herb-butter · miso-glaze

Chicken Sauces:
  italian-herb · honey-mustard · mexican-dry-rub
  peanut-sauce · buffalo-ranch · teriyaki-glaze · lemon-herb

Cast Iron Sauces & Marinades:
  classic-salt-pepper · garlic-herb-butter · red-wine-reduction
  fresh-chimichurri · soy-garlic-pan-sauce
  soy-garlic-ginger · smoked-paprika-garlic
  lime-cumin · balsamic-herb

Shrimp Pan Sauces:
  garlic-butter-shrimp · cajun-butter
  soy-garlic-ginger (shared ID) · lime-cumin (shared ID)
```

Note: `soy-garlic-ginger` and `lime-cumin` are shared IDs — one sauce object referenced by both the cast iron marinade pool and the shrimp sauce pool. The `dualUse` field on the sauce object indicates this.

### 9.3 New Files

| File | Purpose |
|---|---|
| `src/data/fishSauces.ts` | 8 fish sauce objects — full interface |
| `src/data/chickenSauces.ts` | 7 chicken sauce objects — full interface |
| `src/data/castIronSauces.ts` | 9 cast iron sauce and marinade objects |
| `src/data/shrimpSauces.ts` | 4 shrimp pan sauce objects (2 unique + 2 shared refs) |
| `src/data/sauces.ts` | Combined `allSauces` export — flat array of all unique sauce objects |

---

*End of sauce and marinade requirements document.*
