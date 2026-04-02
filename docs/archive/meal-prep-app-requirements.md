# Meal Prep & Fitness App — Product Requirements Document

> **Version:** 1.0  
> **Status:** Draft  
> **Last Updated:** March 2026  
> **Stack:** React or Vue (TBD) — single-page application

---

## 1. Overview

A personal health and meal planning web application for two people. Combines a weekly meal prep system with a fitness tracking plan. Designed for daily reference — shopping, cooking, tracking workouts, and monitoring health goals across an 11-week fitness program.

The application has two primary modules:

| Module               | Status                          |
| -------------------- | ------------------------------- |
| **Meal Prep System** | Defined — see sections below    |
| **Fitness Plan**     | `[PLACEHOLDER — see Section 9]` |

---

## 2. Design Principles

- **Mobile-first.** Primary use case is in the kitchen and at the grocery store on a phone.
- **Minimal friction.** Every feature should reduce decisions, not add them. The user should be able to open the app and know exactly what to do.
- **No login required** for core features. Optional account for cross-device sync.
- **Offline capable.** Shopping list and meal plan must work without an internet connection.
- **Whole foods only.** No integration with calorie-counting APIs or ultra-processed food databases. This is a clean eating plan, not a generic diet tracker.
- **DASH-friendly defaults.** Low-sodium guidance baked into recipes and notes throughout.
- **Health awareness.** Potassium, phosphorus, and sodium flagged in nutrient views for those with specific dietary needs. Not a medical tool — flagging only, with a standing recommendation to consult a healthcare provider.

---

## 3. Navigation Structure

Top-level navigation (tab bar on mobile, sticky top nav on desktop):

```
Meal Prep
  ├── Proteins & Grains
  ├── Shopping List
  ├── Prep Day
  ├── Meal Plan
  ├── Cast Iron Night
  ├── Sauces
  ├── Nutrients & Health
  └── Storage

Fitness Plan         ← [PLACEHOLDER — Section 9]

Settings / Preferences
```

---

## 4. Meal Prep Module

### 4.1 Proteins & Grains Tab

#### 4.1.1 Fish Section

- Display as a full-width card spanning the protein grid
- Fields: buy guidance, quantity per week (scaled for 2 people), thawing instructions, cooking method, storage warning ("eat Mon–Wed")
- Stat pills: protein content per serving, key nutritional benefit

**Fish options to display:**
| Fish | Notes |
|---|---|
| Salmon | Default. Best omega-3 content. Costco bag recommended. |
| Tilapia | Mild, inexpensive, versatile |
| Cod | Firm texture, holds up well baked |
| Mahi-Mahi | Optional swap, slightly heartier |

#### 4.1.2 Chicken Section

Two sub-cards within the chicken section:

**Thighs card:**

- Recommended for Sunday batch cooking
- Why: higher fat = stays moist when reheated, harder to overcook
- Quantity: 2–2.5 lbs for Sunday batch (reserve ~1 lb for Wednesday cast iron)
- Cook: 375°F, 35–40 min
- Stat pills: ~30g protein / 4oz, "most forgiving"

**Breast card:**

- Recommended for cast iron or fresh cook situations
- Why: leaner, better for weight loss, no reheating issue when eaten fresh
- Prep tips if batch cooking: pound to even thickness, pull at 165°F exactly, store with sauce, reheat at 50% power
- Optional: rotisserie chicken shortcut note (~$7–8, 4–5 shredded portions)
- Stat pills: ~35g protein / 4oz, "leanest option"

**Weekly quantity summary card:**

- Total: 3.5–4 lbs per week
- Breakdown: 2–2.5 lbs thighs (Sunday oven) + 1 lb thighs or breast (Wednesday cast iron marinade)

#### 4.1.3 Steak Section

- Full-width card
- Prominent label: **"Always cast iron — never oven"**
- Explanation: Maillard reaction requires high dry heat; oven cannot replicate crust on thin cuts
- Buy: flank or sirloin (leaner, 1.5–2 lbs = 4–6 portions for two)
- Strategy note: marinate Sunday (Sunday-safe marinades only), cook Wednesday for peak freshness; leftovers = Thursday lunch
- Cook to medium — not well done; a good sear is correct, heavily blackened/charred is what to avoid
- Stat pills: ~32g protein / 4oz, iron + zinc

#### 4.1.4 Grains & Legumes Table

Display as a sortable/scannable table with columns:

| Column             | Content                              |
| ------------------ | ------------------------------------ |
| Name               | Grain or legume                      |
| Key Nutrients      | 1–2 sentence summary                 |
| Cook Method & Time | Rice cooker or stovetop instructions |
| Weekly Use         | Which days / meals                   |
| Rating Badge       | Best / Good / Worth Making           |

**Entries:**

| Grain/Legume          | Key Nutrients                                                                    | Cook                                                                                     | Use                        | Badge        |
| --------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------- | ------------ |
| Brown Rice            | Fiber, magnesium, B vitamins. Slow-digesting carbs for sustained training energy | Rice cooker, 45–50 min. Cook large batch Sunday                                          | Mon + Tue meals            | Best         |
| Quinoa ⚠️ rinse first | Complete protein ~8g/cup. All 9 amino acids. High iron and magnesium             | Rice cooker or stovetop, 15–18 min. Cook Sunday                                          | Wed + Thu meals            | Best         |
| Green/Brown Lentils   | 18g protein + 16g fiber per cup. Cheapest protein source. No soaking             | Sauté onion + garlic 3 min → lentils + broth + cumin + salt → simmer 22 min. Cook Sunday | Thu + Fri + Sat            | Best         |
| Jasmine Rice          | Lighter, easier to digest. Good post-workout                                     | Rice cooker, 20 min                                                                      | Optional swap / taco night | Good         |
| Dried Pinto Beans     | High fiber + plant protein. No additives homemade. Freezes well                  | Soak overnight → simmer 1 hr. Make large batch, freeze portions                          | Saturday taco night        | Worth Making |
| Canned Black Beans    | Quick backup. Drain and rinse removes most sodium                                | Zero cook — drain, rinse, optionally warm                                                | Any day as quick side      | Good         |

> **Note:** All grains and lentils are cooked on Sunday. No mid-week grain cooking sessions. The only mid-week cooking is the 13-minute Wednesday cast iron dinner.

> **Quinoa rinse reminder:** Quinoa has a natural bitter coating (saponin). Rinse under cold water in a fine mesh strainer for 30 seconds before cooking.

#### 4.1.5 Vegetable Rotation Panel

Display as a grid of cards. One default, seven swaps:

| Vegetable             | Tag      | Notes                                                                                  |
| --------------------- | -------- | -------------------------------------------------------------------------------------- |
| Broccoli Florets      | Default  | Pre-cut bags everywhere. Roast 425°F 18 min or steam 4 min. Holds 4–5 days             |
| Asparagus             | Swap     | Snap off woody ends — only prep needed. Roast 12 min. Great with salmon                |
| Zucchini              | Swap     | Pre-sliced bags available. Roast 15 min. Mild, pairs with any protein                  |
| Green Beans           | Swap     | Frozen bags, steam 4 min. Zero prep. Good fiber and crunch                             |
| Snap Peas             | Swap     | Pre-washed bags. Raw or lightly sauté 3 min. High vitamin C                            |
| Cauliflower           | Swap     | Pre-cut or frozen. Roast like broccoli — 400°F 20 min. Very filling                    |
| Bok Choy              | Swap     | Baby bok choy halved — no chopping. Sauté with garlic 5 min. Good with Asian marinades |
| Frozen Stir-Fry Blend | Wildcard | Steam or sauté 5 min. Color and nutrient variety with zero thought                     |

---

### 4.2 Shopping List Tab

#### Behavior

- Interactive checklist — tap/click items to check off
- Checked items visually struck through and faded
- State persists in local storage (or user account if logged in)
- Reset button to uncheck all items for a new week
- Note at top: "Check which marinade you're making this week — add those ingredients if not already in your pantry"

#### Categories and Items

**🐟 Fish**
| Item | Quantity |
|---|---|
| Frozen salmon fillets | ~2 lbs |
| Frozen tilapia or cod fillets | ~1.5 lbs |
| Frozen mahi-mahi (optional swap) | ~1 lb |

**🍗 Chicken**
| Item | Quantity |
|---|---|
| Boneless skinless chicken thighs | 2.5–3 lbs |
| Chicken breast (for cast iron) | ~1 lb |
| Rotisserie chicken (optional shortcut) | 1 whole |

**🥩 Steak**
| Item | Quantity |
|---|---|
| Flank steak or sirloin | 1.5–2 lbs |

**🥦 Vegetables**
| Item | Quantity |
|---|---|
| Pre-cut broccoli florets | 3 bags |
| Pre-sliced mushrooms | 2 packs |
| Bell peppers | 3–4 |
| Yellow onions | 2–3 |
| Garlic bulb | 1–2 bulbs |
| Sweet potatoes | 4 medium |
| Pre-washed bagged salad kits | 2–3 bags |
| Swap vegetable (asparagus, zucchini, etc.) | 1 bag / bunch |

**🌾 Grains & Legumes**
| Item | Quantity |
|---|---|
| Brown rice (dry) | 2 lb bag |
| Quinoa (dry) | 1 lb bag |
| Green or brown lentils (dry) | 1 lb bag |
| Dried pinto beans (optional) | 1 lb bag |
| Canned black beans (backup) | 2 cans |

**🧂 Pantry & Condiments**
| Item | Quantity |
|---|---|
| Olive oil | If low |
| Avocado oil (for cast iron) | 1 bottle |
| Low-sodium soy sauce | 1 bottle |
| Sesame oil | Small bottle |
| Honey | If low |
| Dijon mustard | If low |
| Balsamic vinegar | If low |
| Red wine vinegar | If low |
| Low-sodium chicken or vegetable broth | 1 carton |

**🌿 Spices & Herbs**
| Item | Quantity |
|---|---|
| Smoked paprika | If low |
| Ground cumin | If low |
| Chili powder | If low |
| Garlic powder | If low |
| Onion powder | If low |
| Italian seasoning blend | If low |
| Dried rosemary + thyme | If low |
| Cayenne pepper | If low |
| Fresh parsley | 1 bunch |
| Lemons | 4–5 |
| Limes | 3–4 |

#### Future Enhancement

- Dynamic marinade ingredient injection: when a user selects which marinade they're making this week, the relevant ingredients auto-add to the shopping list if not already checked off
- Quantity scaling: adjust for 1 person or 3+ people

---

### 4.3 Prep Day Tab

#### Overview

Sunday afternoon session. ~90–100 minutes total. Mostly hands-off oven time. **Everything for the week is completed here** — including Wednesday cast iron setup. The only mid-week cooking after this is the 13-minute Wednesday cast iron dinner.

Display as an interactive timeline. Each step has:

- Time marker (elapsed and active duration)
- Step title
- Expandable detail body
- Color-coded dot by activity type

#### Saturday Night Pre-Step

- Move frozen fish from freezer to fridge (thaws overnight)
- If making refried pinto beans: soak 1 cup dried beans in water overnight

#### Sunday Timeline

**Step 1 — 0 min | Rice Cooker On + Oven Preheat + Chop Everything**

- Start brown rice in rice cooker (45 min, fully hands-off)
- Preheat oven to 400°F
- Line two sheet pans with foil
- Chop all aromatics in one session:
  - Dice 1 large onion — half for lentils, half for Wednesday cast iron container
  - Mince 5–6 garlic cloves — divide same way
  - Slice bell peppers into strips for Wednesday
  - Slice mushrooms for Wednesday
- Store Wednesday vegetables (onion half, garlic half, bell pepper strips, mushrooms) in a labeled container in the fridge

**Step 2 — 15 min | Wednesday Marinade Setup (2 min active)**

- Set aside ~1 lb chicken thighs/breast or steak for Wednesday
- Mix chosen marinade (see Cast Iron tab)
- Pour over protein in zip-lock bag, squeeze out air, label "Wednesday," refrigerate
- **Marinade timing rules:**
  - ✅ Sunday-safe: Soy Garlic Ginger, Smoked Paprika Garlic (oil/soy-based, no significant acid — safe 2–5 days, flavor improves)
  - ⚠️ Tuesday only: Lime Cumin, Balsamic Herb (citrus/vinegar acid breaks down protein texture after 1–2 days on chicken; slightly longer on steak)

**Step 3 — 18 min | Season All Proteins**

- Fish (~3 lbs): pat completely dry, coat with olive oil, season per Sauces tab, lay flat on foil-lined sheet pan
- Chicken thighs (~2–2.5 lbs): season with olive oil + Italian herbs + minced garlic + salt + pepper, place on second sheet pan with broccoli florets tossed in olive oil + salt
- Quinoa: rinse in fine mesh strainer 30 seconds, add to rice cooker after brown rice finishes (or stovetop 15 min)

**Step 4 — 28 min | Oven + Lentils on Stovetop (hands-off)**

- Fish into oven: 12–15 min
- Chicken + broccoli into oven: 35–40 min
- Set timers
- While oven runs — lentils on stovetop:
  - Heat 1 tbsp olive oil in medium pot over medium heat
  - Sauté lentil-portion of onion + garlic, 3 min until soft
  - Add 1.5 cups dry lentils + 3 cups low-sodium broth + 1 tsp cumin + ½ tsp salt
  - Bring to boil, reduce to low, cover, simmer 22 min

**Step 5 — 65 min | Pull, Rest, Cool, Portion**

- Fish comes out first. Chicken + broccoli a few minutes later. Lentils off stovetop.
- ⚠️ **Let everything cool 10 minutes before lidding containers** — steam trapped in containers makes food soggy by Monday
- Portion into containers: 2 portions per container (one lunch for both) or individual
- Label by day or protein type
- Brown rice, quinoa, and lentils into separate large containers

**Step 6 — ~90–100 min | Done**

What's now in the fridge:

- Cooked fish containers (eat Mon–Wed)
- Cooked chicken containers (eat Mon–Fri)
- Brown rice batch
- Quinoa batch
- Lentil batch
- Wednesday protein in labeled zip-lock (marinating)
- Wednesday vegetables in labeled container (pre-sliced)

#### Emergency Week Section

Display when user taps "What if I missed Sunday?" — collapsible panel or separate card at bottom of Prep Day tab.

Five no-prep fallback meals requiring no Sunday session:

| #   | Meal                                 | Instructions                                                                                                                                            |
| --- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Rotisserie Chicken + Bagged Salad    | Buy whole rotisserie chicken (~$7). Shred over salad kit. Add canned black beans. 5 min, zero cooking.                                                  |
| 2   | Canned Tuna + Rice + Frozen Veg      | Drain tuna, season with olive oil + lemon + salt. Rice cooker on. Steam frozen veg 4 min. Done in 20 min hands-off.                                     |
| 3   | Frozen Fish + Microwave Sweet Potato | Thaw fillet in cold water 30 min. Bake 15 min at 400°F. Microwave sweet potato 5 min simultaneously.                                                    |
| 4   | Eggs + Black Beans + Rice            | Scramble 3 eggs. Warm canned black beans with cumin. Rice cooker or microwave rice. High protein, no shopping needed.                                   |
| 5   | One-Pot Lentil Soup                  | Sauté onion + garlic 3 min → 1 cup dry lentils + 3 cups broth + diced canned tomatoes + cumin + smoked paprika → simmer 25 min. Serves 2, keeps 5 days. |

---

### 4.4 Meal Plan Tab

Display as a weekly table. All portions feed 2 people.

| Day       | Lunch (×2)                                    | Dinner (×2)                                                         | Grain / Side              |
| --------- | --------------------------------------------- | ------------------------------------------------------------------- | ------------------------- |
| Monday    | Fish — Baked salmon + broccoli                | Chicken — Chicken thigh + roasted veg                               | Brown rice                |
| Tuesday   | Chicken — Chicken + salad kit                 | Fish — Tilapia or cod + broccoli                                    | Brown rice + black beans  |
| Wednesday | Fish — Salmon + quinoa bowl + veg             | 🔥 Cast Iron — Marinated chicken or steak + mushrooms + bell pepper | Quinoa (from Sunday)      |
| Thursday  | Steak — Cast iron leftovers + quinoa + veg ⚠️ | Chicken — Chicken thigh + lentils + broccoli                        | Quinoa or lentils         |
| Friday    | Chicken — Last chicken portions + salad kit   | Fish — Salmon + lentils + sautéed mushrooms & onions                | Lentils (from Sunday)     |
| Saturday  | Flex — Remaining proteins or dine out         | Flex — Refried bean tacos, dine out, or cook fresh                  | Jasmine rice or tortillas |

> ⚠️ **Thursday steak note:** Thursday lunch uses Wednesday's cast iron leftover steak. Only valid if steak was used for Wednesday's cast iron. If chicken was used instead, substitute with a remaining protein. Do not use Sunday-cooked steak for Thursday lunch — by Thursday that is day 4 and approaching the safe window limit.

> **Saturday refried bean taco night:** Soak pinto beans Saturday morning. Simmer 1 hour with diced onion + garlic + cumin + salt. Mash to desired texture. Serve with remaining chicken or steak, salsa, avocado. Freeze leftover beans in portions.

#### Future Enhancement

- Weekly meal plan selector: swap proteins on any day and update the plan
- Tap a meal to see sauce recommendation and reheating instructions
- "What's for dinner tonight?" quick view tied to current day of the week

---

### 4.5 Cast Iron Night Tab

#### Header

Prominent display: **Wednesday Cast Iron Night**  
Subtitle: Everything prepped Sunday · 13 minutes to cook Wednesday · Fresh dinner mid-week

#### Sunday Setup Instructions (5 min total)

1. Choose protein: ~1 lb chicken thighs, breast, or flank steak (feeds 2)
2. Mix marinade of choice (1 minute)
3. Pour over protein in zip-lock bag, squeeze out air, label "Wednesday," refrigerate
4. Slice bell peppers, mushrooms, onion — store in separate labeled container in fridge

#### Wednesday Cooking Instructions (13 min)

1. Pull marinated protein and vegetable container from fridge
2. Pat protein lightly dry with paper towel (improves browning)
3. Heat cast iron on high 2 minutes until just beginning to smoke
4. Add small drizzle of avocado oil (high smoke point, ideal for cast iron)
5. Cook protein:
   - Chicken thighs or breast: 4–5 min per side, do not move
   - Flank steak: 3–4 min per side, do not move
6. Last 2 minutes: add pre-sliced veg around the protein
7. Rest 3–5 min before slicing — do not skip
8. Serve over quinoa or brown rice (from Sunday)

> **Steak is always cast iron — never oven.** Flank and sirloin are thin cuts that require the intense dry heat of cast iron to form a proper crust. The oven produces an inferior result for these cuts.

#### Marinade Cards

Each card displays: name, best protein pairing, marinade timing badge, ingredient list with quantities, and a preparation note.

**Marinade 1 — Soy Garlic Ginger**

- Best for: chicken thighs or breast
- Timing: ✅ Sunday-safe (oil + soy-based, no significant acid, safe 2–5 days, flavor improves over time)
- Ingredients:
  - 3 tbsp low-sodium soy sauce
  - 1 tbsp sesame oil
  - 1 tsp honey
  - 3 garlic cloves, minced
  - ½ tsp ground ginger
  - Cracked black pepper to taste
- Note: No significant acid — safe from Sunday through Wednesday. Flavor deepens over time.

**Marinade 2 — Smoked Paprika Garlic**

- Best for: flank steak
- Timing: ✅ Sunday-safe (oil-based, no acid)
- Ingredients:
  - 2 tbsp olive oil
  - 1 tbsp smoked paprika
  - 4 garlic cloves, minced
  - 1 tsp ground cumin
  - ½ tsp salt
  - ½ tsp cracked black pepper
- Note: Rub into steak firmly on both sides. Excellent sliced thin over lentils or quinoa.

**Marinade 3 — Lime Cumin**

- Best for: chicken or flank steak, Mexican bowl style
- Timing: ⚠️ Tuesday only (citrus acid breaks down chicken texture after ~24 hrs; up to 48 hrs on steak)
- Ingredients:
  - Juice of 2 limes
  - 2 tbsp olive oil
  - 1 tsp ground cumin
  - 1 tsp chili powder
  - ½ tsp garlic powder
  - ½ tsp salt
- Note: Marinate Tuesday evening for Wednesday. Serve over quinoa with black beans + salsa.

**Marinade 4 — Balsamic Herb**

- Best for: chicken thighs or sirloin
- Timing: ⚠️ Tuesday only (vinegar-based, best under 48 hrs)
- Ingredients:
  - 2 tbsp balsamic vinegar
  - 2 tbsp olive oil
  - 1 tsp Dijon mustard
  - 2 garlic cloves, minced
  - 1 tsp dried rosemary
  - ½ tsp dried thyme
  - ½ tsp salt
- Note: Less acidic than lime so slightly more forgiving, but still best under 48 hrs.

---

### 4.6 Sauces Tab

Display as three sections (Fish / Chicken / Steak), each containing sauce cards.

Each card displays:

- Sauce name
- Best use / protein pairing
- Ingredient list with quantities (per 2 servings)
- Storage badge(s): Pantry / Fridge / Batchable
- Shelf life
- Preparation or application note

#### Fish Sauces

**Lemon Garlic**

- For: all fish, the reliable baseline
- Ingredients: 2 tbsp olive oil · juice of 1 lemon · 3 garlic cloves minced · ½ tsp salt · ¼ tsp black pepper · 1 tbsp fresh or dried parsley
- Storage: 🧊 Fridge · 📦 Batchable — use garlic powder instead of fresh to extend to 2–3 weeks refrigerated; with fresh garlic use within 5–7 days
- Note: Drizzle over fish before baking at 400°F.

**Cajun Spice Rub**

- For: tilapia or cod, bold and smoky
- Ingredients: 1 tsp smoked paprika · ½ tsp cayenne · ½ tsp garlic powder · ½ tsp onion powder · ½ tsp dried oregano · ½ tsp salt · 1 tbsp olive oil to bind when applying
- Storage: 🏠 Pantry · 📦 Make a big jar — all dry spices, keeps indefinitely sealed
- Note: Mix into paste with olive oil when applying.

**Soy Ginger Glaze**

- For: salmon especially, applied last 5 minutes of baking only
- Ingredients: 2 tbsp low-sodium soy sauce · 1 tsp sesame oil · 1 tsp honey · ½ tsp garlic powder · ½ tsp ground ginger
- Storage: 🧊 Fridge · 📦 Batchable — keeps 2–3 weeks; soy sauce acts as preservative
- Note: Brush on last 5 min only — honey burns if added at the start.

#### Chicken Sauces

**Italian Herb**

- For: Sunday batch, the workhorse
- Ingredients: 2 tbsp olive oil · 1½ tsp Italian seasoning blend · 3 garlic cloves minced · zest of ½ lemon · ½ tsp salt · ¼ tsp black pepper
- Storage: 🏠 Pantry (dry version) · 📦 Batchable — make dry blend in bulk, add fresh garlic and oil when applying
- Note: Rub all over thighs and bake. Pairs with any grain or salad.

**Honey Mustard**

- For: chicken thighs, sweet and savory
- Ingredients: 2 tbsp Dijon mustard · 1 tbsp honey · ½ tsp garlic powder · ¼ tsp salt · ¼ tsp black pepper · 1 tbsp olive oil
- Storage: 🧊 Fridge · 📦 Batchable — keeps 2–3 weeks; Dijon is already preserved
- Note: Coat and bake. Great with broccoli.

**Mexican Dry Rub**

- For: bowl nights, Chipotle-style
- Ingredients: 1 tsp ground cumin · 1 tsp chili powder · ½ tsp garlic powder · ½ tsp onion powder · ½ tsp smoked paprika · ½ tsp salt · 1 tbsp olive oil to bind when applying
- Storage: 🏠 Pantry · 📦 Make a big jar — best candidate for a large batch, keeps months sealed
- Note: Add olive oil only when applying. Serve over rice with black beans and salsa.

#### Steak Sauces

**Classic Salt & Pepper**

- For: any cut, always works
- Ingredients: 1 tsp coarse sea salt or kosher salt · 1 tsp cracked black pepper · 1 tbsp avocado oil (for pan) · 1 tbsp butter (last minute, baste) · 1 garlic clove smashed (optional, in pan)
- Storage: 🏠 Pantry — staples, no batch needed
- Note: Press salt and pepper firmly into both sides before cooking.

**Fresh Chimichurri**

- For: flank steak, spoon over at serving
- Ingredients: ½ cup fresh parsley finely chopped · 3 garlic cloves minced · 3 tbsp olive oil · 1 tbsp red wine vinegar · ¼ tsp red pepper flakes · ¼ tsp salt
- Storage: 🧊 Fridge · use within 5–7 days — not ideal for long batches. Make weekly (3 min) or buy Trader Joe's jar.
- ⚠️ Note: Never store fresh garlic in oil at room temperature — refrigerate only.

**Soy Garlic Pan Sauce**

- For: cast iron steak or chicken
- Ingredients: 2 tbsp low-sodium soy sauce · 1 tbsp sesame oil · 2 garlic cloves minced · 1 tsp honey · ½ tsp ground ginger
- Storage: 🧊 Fridge · 📦 Batchable — keeps 2–3 weeks. Use as marinade or deglaze pan after cooking.
- Note: Pour into hot pan after cooking to deglaze — creates an instant sauce over everything.

---

### 4.7 Nutrients & Health Tab

#### DASH Diet Alignment Note

- Use low-sodium soy sauce throughout (regular = ~900mg sodium/tbsp; low-sodium = ~450mg; coconut aminos = lower still)
- Season with herbs and citrus rather than salt where possible
- Target: under 1,500–2,300mg total sodium daily

#### Nutrient Status Table

| Nutrient     | Status                  | Main Sources                                 | Notes                                                                                      |
| ------------ | ----------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Protein      | ✅ Well covered         | Fish, chicken, steak, lentils, quinoa        | ~100–130g/day. Discuss total target with your doctor if you have specific dietary needs    |
| Omega-3s     | ✅ Well covered         | Salmon 3–4×/week                             | Reduces exercise inflammation, supports workout recovery                                   |
| Fiber        | ✅ Well covered         | Lentils, brown rice, quinoa, broccoli, beans | 25–35g/day. Supports gut health, satiety, stable training energy                           |
| Iron         | ✅ Well covered         | Steak 2×/week, lentils, quinoa               | Heme iron from steak absorbs best. Bell peppers and lemon boost non-heme absorption        |
| Magnesium    | ✅ Good                 | Brown rice, lentils, salmon, quinoa          | Important for muscle function and sleep. Exercise increases needs                          |
| Zinc         | ✅ Good                 | Steak, chicken, lentils                      | Supports immune function and recovery                                                      |
| B Vitamins   | ✅ Well covered         | All animal proteins, lentils, quinoa         | B12 from animal proteins. B6 and folate from lentils and quinoa                            |
| Vitamin D    | ⚠️ Worth monitoring     | Salmon provides some                         | Most people are deficient. Consider D3 1,000–2,000 IU/day — discuss with doctor            |
| Potassium    | ⚠️ Discuss with doctor  | Salmon, lentils, sweet potato, quinoa        | Moderate-to-high potassium foods. Your doctor may advise limiting based on your needs      |
| Phosphorus   | ⚠️ Discuss with doctor  | Fish, chicken, lentils                       | High-protein diets tend to be high in phosphorus. Monitor if labs indicate elevated levels |
| Sodium       | ⚠️ Actively manage      | Soy sauce, seasoning blends                  | Low-sodium soy sauce throughout. DASH target: under 1,500–2,300mg/day                      |
| Antioxidants | 🔴 Improve with variety | Broccoli, bell peppers                       | Rotate vegetables weekly (see vegetable rotation panel) to improve micronutrient diversity |

#### Fitness Plan Connection

- Post-workout: eat a prepped container within 30–60 min after treadmill or strength sessions
- Pre-workout: eat a grain-containing meal 1–2 hrs before a session (brown rice, quinoa, or lentils)
- Omega-3s from salmon 3–4×/week actively reduce muscle soreness — especially relevant during early weeks returning to training
- Cardio creates calorie deficit → burns fat. Strength training builds muscle → raises resting metabolism. This plan fuels both.

#### Hydration Note

> High water intake supports overall health and performance. Target 80–100 oz (2.5–3 liters) per day. Use thirst and pale yellow urine color as real-time indicators.

---

### 4.8 Storage Tab

#### Fridge Life Table

| Food                                           | Safe Window                     | Key Notes                                                                                   |
| ---------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------- |
| Cooked Fish                                    | 3–4 days                        | Eat Mon–Wed. Most time-sensitive protein. Reheat at 50% power 90 sec or oven 275°F covered. |
| Cooked Chicken Thighs                          | 4–5 days                        | Most forgiving. Good through Friday. Splash of water before reheating.                      |
| Cooked Chicken Breast                          | 3–4 days                        | Dries out faster than thighs. Store with sauce. 50% microwave power only.                   |
| Cooked Steak                                   | 3–4 days                        | Slice before storing. Excellent cold over quinoa or salad.                                  |
| Marinating Raw Protein (Sunday-safe marinades) | 2–5 days                        | Safe and improving in flavor through Wednesday.                                             |
| Marinating Raw Protein (Tuesday marinades)     | 1–2 days                        | Citrus/vinegar-based. Use within 24–48 hrs.                                                 |
| Pre-Sliced Raw Vegetables                      | 4–5 days                        | Bell peppers, mushrooms, onions sliced Sunday keep well through Wednesday.                  |
| Brown Rice (cooked)                            | 5 days                          | Large batch from Sunday. Reheat with splash of water, covered, 90 sec.                      |
| Quinoa (cooked)                                | 5–6 days                        | Keeps longer than rice. Great cold in salads.                                               |
| Lentils (cooked)                               | 5 days                          | Add splash of broth when reheating if dried out.                                            |
| Roasted Vegetables                             | 4–5 days                        | Cook slightly underdone Sunday. Keep separate from proteins.                                |
| Refried Beans                                  | 5 days fridge / 3 months frozen | Freeze in portions — future taco nights are zero effort.                                    |
| Batch Sauces (fridge)                          | 2–3 weeks                       | Soy Ginger Glaze, Honey Mustard, Soy Garlic Pan Sauce. Sealed jars.                         |

#### Reheating Guide

| Food             | Method                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------- |
| Fish             | 50% microwave power, 90 sec. Or oven 275°F, 10 min covered with foil. Never high heat. |
| Chicken + Steak  | Splash of water, loosely covered, 90 sec–2 min full power. Steak also great cold.      |
| Grains + Lentils | Splash of water, covered, 60–90 sec. Fluff grains with fork after.                     |

#### Recommended Containers

- Glass 2-compartment meal prep containers — keeps protein and grain separate, microwave and dishwasher safe. ~$25–30 for a set of 6.
- One large container per grain batch (rice, quinoa, lentils)
- Mason jars for sauces and any overnight preparations

---

## 5. State Management Requirements

| State                              | Scope    | Persistence                     |
| ---------------------------------- | -------- | ------------------------------- |
| Shopping list checked items        | Per week | Local storage (reset each week) |
| Current week number (fitness plan) | Global   | Local storage                   |
| Marinade selection for the week    | Per week | Local storage                   |
| Milestone completions (fitness)    | Global   | Local storage                   |
| Workout log entries                | Per day  | Local storage or account        |
| Active tab / navigation state      | Session  | In-memory                       |
| Emergency week mode                | Session  | In-memory                       |

---

## 6. Responsive Design Requirements

- **Mobile (< 640px):** Single column layouts. Protein cards stack vertically. Meal plan table collapses grain column. Navigation is a scrollable horizontal tab bar.
- **Tablet (640px–1024px):** Two-column grids for protein and sauce cards. Full meal plan table visible.
- **Desktop (> 1024px):** Three-column grids. Sticky sidebar navigation optional. Max content width 980px centered.

---

## 7. Accessibility Requirements

- All interactive elements keyboard navigable
- Shopping list checkboxes have proper ARIA labels
- Color is never the sole indicator of status (badges always include text)
- Minimum touch target size 44×44px on mobile
- Sufficient color contrast on all text (WCAG AA minimum)

---

## 8. Data Architecture Notes

All data should be stored as structured JSON to enable future enhancements:

```json
{
  "proteins": [...],
  "grains": [...],
  "vegetables": [...],
  "sauces": [...],
  "marinades": [...],
  "mealPlan": {
    "monday": { "lunch": {...}, "dinner": {...}, "grain": "..." },
    "tuesday": { "lunch": {...}, "dinner": {...}, "grain": "..." },
    "wednesday": { "lunch": {...}, "dinner": {...}, "grain": "..." },
    "thursday": { "lunch": {...}, "dinner": {...}, "grain": "..." },
    "friday": { "lunch": {...}, "dinner": {...}, "grain": "..." },
    "saturday": { "lunch": {...}, "dinner": {...}, "grain": "..." }
  },
  "prepTimeline": [...],
  "emergencyMeals": [...],
  "nutrients": [...],
  "storageGuide": [...]
}
```

This allows the meal plan and shopping list to be dynamically generated and adjusted (e.g., swapping proteins, selecting this week's marinade, scaling for 1 or 3+ people) rather than being hardcoded UI.

---

## 9. Fitness Plan Module — PLACEHOLDER

> **⚠️ This section is reserved for the fitness plan integration.**
>
> The fitness plan is a separate but connected module that lives alongside the Meal Prep module in the same application. It shares the same design system, navigation structure, and state management layer.
>
> **Known integration points with the Meal Prep module:**
>
> - Post-workout meals: the meal plan should surface a "post-workout" flag on meals eaten within 60 min of a logged workout
> - Pre-workout meals: flag grain-containing meals 1–2 hrs before a logged workout
> - Weekly protein target: fitness module sets a protein goal (currently ~100–130g/day, pending nephrologist guidance) that the nutrients tab references
> - Water tracking: shared between both modules
>
> **Fitness plan content defined in a separate reference document — insert here when ready.**
>
> **Tabs expected (based on existing HTML version):**
>
> - Overview (11-week summary, weekly template, phase descriptions)
> - Weekly Schedule (all 11 weeks, day-by-day, collapsible)
> - Exercises (Day A Push, Day B Pull + Core, Cardio Methods — with expandable form tips)
> - Nutrition (links to Meal Prep module)
> - Milestones (interactive checkboxes, persistent state)
>
> **Phases:**
>
> - Phase 1 — Rebuild (Weeks 1–3): habit formation, ankle recovery, easy effort
> - Phase 2 — Build (Weeks 4–8): intervals, steeper inclines, strength added
> - Phase 3 — Peak (Weeks 9–11): sustained challenge, heavier lifts, jogging
>
> **Equipment:** HOA gym treadmill + home dumbbells (no bench)
>
> **Special considerations:** ankle injury recovery in early weeks; PKD kidney health informs protein and hydration targets

---

## 10. Future Enhancements (Backlog)

- [ ] Dynamic marinade ingredient injection into shopping list
- [ ] Meal plan protein swap — change any day's protein and cascade updates
- [ ] Quantity scaling (1 person / 2 people / 3+ people)
- [ ] "What's for dinner tonight?" quick view based on current day
- [ ] Weekly reset flow — uncheck shopping list, optionally rotate marinade
- [ ] Tap a meal plan entry to see recommended sauce and reheating method
- [ ] Pantry tracker — mark which dry spices and staples you already have
- [ ] Optional account / cloud sync for cross-device access
- [ ] Print-friendly view for shopping list
- [ ] Shared grocery list (send to partner via link)
- [ ] Fitness plan: workout logging with sets, reps, and weights
- [ ] Fitness plan: progress photos and measurements tracker
- [ ] Fitness plan: rest day vs. workout day meal suggestions
- [ ] Integrate fitness and meal modules — surface "post-workout meal" flag in meal plan

---

_End of requirements document. Fitness Plan module content to be inserted in Section 9._
