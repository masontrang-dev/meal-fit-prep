# Future Roadmap & Improvements

> **Document Type:** Strategic roadmap for meal prep application development  
> **Created:** March 2026  
> **Status:** Living document — update as priorities shift

---

## Overview

This document tracks planned features, enhancements, and known gaps in the meal prep application. Items are organized by priority tier and implementation phase.

**Current State:**
- ✅ Phase 1-10 Complete (Core meal prep module, accessibility, testing)
- ⚠️ Phase 11 Partial (Build configured, deployment pending)
- ❌ Phase 12+ Not started (Advanced features, fitness module)

---

## Priority Tier 1 — MVP Completion (Critical)

**Goal:** Complete the core meal prep experience as originally specified.

### 1.1 Sauce Data Schema Updates ⚠️ HIGH PRIORITY

**Status:** Partially implemented — missing critical properties

**Missing Properties on All Sauce Objects:**
- `applicationTiming` (before | last-ten | last-five | serving)
- `temperatureAdjustment` { adjusted: boolean, tempF?: number, note?: string }
- `marinating` (none | minimum | overnight)
- `sundaySafe` (boolean)
- `baseYieldLbs` (always 1)
- `scalingBehavior` (linear | fixed | diminishing)
- Ingredient-level `scalingBehavior` and `maxMultiplier`

**Files to Update:**
- `src/data/sauces/fish.ts` — 8 sauces
- `src/data/sauces/chicken.ts` — 7 sauces
- `src/data/sauces/steak.ts` — 9 marinades/finishes
- `src/data/sauces/shrimp.ts` — 4 pan sauces

**Reference:** `docs/sauce-requirements.md` (complete sauce specifications)

**Estimated Effort:** 4-6 hours

---

### 1.2 Marinade Timing Intelligence ❌ NOT IMPLEMENTED

**Status:** Not started — critical for user experience

**Features:**
- Detect overnight marinade requirements in FridgeEngine
- Saturday prep reminder when plan generated Sat or earlier
- Late generation warning when plan generated Sunday
- Saturday night prep step injection in Prep Day timeline
- Swap to same-day sauce option on Sunday generation
- Marinade timing badges on Cast Iron and Sauces tabs

**New Components:**
- `SaturdayPrepCard.vue` — reminder/warning card with swap options

**Store Updates:**
- `randomizerStore.ts` — add `saturdayPrepRequired`, `lateGenerationWarning` computed properties
- `randomizerStore.ts` — update `swapSlot()` to accept `excludeOvernight` parameter

**Engine Updates:**
- `fridgeEngine.ts` — Steps 9-10: detect overnight items, check generation day
- `fridgeEngine.ts` — add `getSauceById()` helper
- `fridgeEngine.ts` — add `overrides` parameter to `runFridgeEngine()`

**View Updates:**
- `FridgeView.vue` — render `SaturdayPrepCard` in State C
- `PrepDayView.vue` — inject Saturday night marinade step when applicable
- `CastIronView.vue` — add "Start Saturday" badge variant
- `SaucesView.vue` — add marinating time indicator

**Reference:** `docs/marinade-timing-requirements.md`

**Estimated Effort:** 8-10 hours

---

### 1.3 Missing Proteins & Legumes ⚠️ DATA GAP

**Status:** Documented but may not be implemented

**Missing Items:**
- Chickpeas (20% weight in legume pool)
- Shrimp (batch and cast iron slots with frequency setting)
- Shrimp pan sauces (4 sauces — already in data files, verify integration)

**Updates Required:**
- `src/data/grainsLegumes.ts` — add chickpeas entry
- `src/data/proteins.ts` — add shrimp entry
- `src/data/fridgeEngine.ts` — verify shrimp in cast iron pool logic
- `src/stores/randomizerStore.ts` — verify `shrimpFrequencyWeeks` setting

**Reference:** `docs/fridge-engine-requirements.md` sections 8, 3.4, 4.4

**Estimated Effort:** 2-3 hours

---

### 1.4 README.md Update ⚠️ DOCUMENTATION

**Status:** Still generic Vue/Vite template

**Required Sections:**
- Project overview and purpose
- Feature list (meal prep module, FridgeEngine, cooking mode)
- Setup instructions (`npm install`, `npm run dev`)
- Available scripts
- Tech stack (Vue 3, TypeScript, Pinia, Tailwind)
- Deployment instructions
- Link to `/docs` folder for detailed requirements

**Reference:** `docs/implementation-plan.md` section 11.3

**Estimated Effort:** 1-2 hours

---

### 1.5 Phase 11 Completion — Build & Deployment

**Status:** Partially complete — build configured, not deployed

**Remaining Tasks:**
- [ ] Verify `vite.config.ts` has `base: './'` for static hosting
- [ ] Test production build: `npm run build`
- [ ] Verify `dist/` output works locally
- [ ] Deploy to Netlify or GitHub Pages
- [ ] Test deployed app in production environment

**Reference:** `docs/implementation-plan.md` section 11

**Estimated Effort:** 2-3 hours

---

## Priority Tier 2 — Enhanced Meal Prep Experience

**Goal:** Add dynamic features that make the app more intelligent and helpful during cooking.

### 2.1 Dynamic Prep Day Timeline Generation ❌ NOT IMPLEMENTED

**Status:** Not started — major feature

**Features:**
- Generate Prep Day timeline dynamically from confirmed plan
- Adjust oven temperatures based on selected sauces
- Handle temperature conflicts (e.g., fish at 400°F, chicken at 375°F)
- Inject sauce-specific steps and timing
- Skip sauce preparation steps for items already in inventory
- Render shrimp-specific instructions when applicable

**Dependencies:**
- Sauce data schema updates (Tier 1.1)
- Sauce inventory store integration

**New Components:**
- Update `PrepTimeline.vue` to accept dynamic steps
- Update `PrepStep.vue` to handle sauce application timing

**Reference:** `docs/dynamic-prep-day-requirements.md` Phase 1 & sections 2.3-2.5

**Estimated Effort:** 12-15 hours

---

### 2.2 Cooking Mode with Timer System ❌ NOT IMPLEMENTED

**Status:** Timer store exists but not integrated

**Features:**
- "Start Cooking" button activates cooking mode
- Partial focus layout — active step expanded, others dimmed
- Active timer bar at top (horizontal scrollable)
- Concurrent timer support (fish, chicken, lentils simultaneously)
- Two-phase timers for sauces (Phase 1 → sauce alert → Phase 2)
- Timer persistence via absolute timestamps
- Reconciliation on page return (handle expired timers)
- Exit cooking mode with timers continuing in background

**Timer Features:**
- Countdown display (MM:SS)
- Color-coded status (yellow active, red sauce alert, green phase 2)
- Sauce alert modal with instructions
- "Confirm sauce applied" → start phase 2 timer
- "Skip sauce" → continue with remaining time

**Existing Store:**
- `src/stores/timerStore.ts` — already implemented, needs integration

**New Components:**
- `CookTimer.vue` — individual timer card
- `TimerBar.vue` — horizontal timer container
- Update `PrepDayView.vue` — add cooking mode layout

**Reference:** `docs/dynamic-prep-day-requirements.md` Phase 2 & sections 2.6-2.11

**Estimated Effort:** 15-20 hours

---

### 2.3 Sauce Inventory Integration ⚠️ STORE EXISTS

**Status:** Store implemented but not integrated into UI

**Features:**
- Mark batchable sauces as in-stock
- Skip preparation steps for in-stock sauces in Prep Day timeline
- Weekly generation prompt: "Do you still have these batch sauces?"
- "Mark as made" button on sauce prep cards
- Inventory persists across weeks until manually cleared

**Existing Store:**
- `src/stores/sauceInventoryStore.ts` — already implemented

**Integration Points:**
- `FridgeView.vue` State C — sauce inventory prompt after slot cards
- `PrepDayView.vue` — skip in-stock sauces, show "using batch from fridge"
- Sauce prep cards — "Mark as made" button

**Reference:** `docs/dynamic-prep-day-requirements.md` section 2.2

**Estimated Effort:** 6-8 hours

---

### 2.4 Settings View — FridgeEngine Controls ❌ NOT IMPLEMENTED

**Status:** Not started — needed for user customization

**Features:**
- No-repeat window sliders (9 independent settings: fish variety, fish sauce, chicken cut, chicken sauce, cast iron protein, cast iron marinade, roasting veg, grain, legume)
- Steak frequency setting (default 2 weeks, range 1-8)
- Shrimp frequency setting (default 3 weeks, range 1-8)
- Batch size defaults (fish 3lb, chicken 2.5lb, cast iron 1lb)
- Reset to defaults button
- Servings selector (already exists in masthead — verify)

**New View:**
- `SettingsView.vue` — dedicated settings page

**Store Updates:**
- `settingsStore.ts` — add FridgeEngine settings namespace

**Reference:** `docs/fridge-engine-requirements.md` section 15.3

**Estimated Effort:** 8-10 hours

---

## Priority Tier 3 — Advanced Features

**Goal:** Polish the experience with intelligent helpers and automation.

### 3.1 Ingredient Scaling System ❌ NOT IMPLEMENTED

**Status:** Documented but not implemented

**Features:**
- Scale sauce recipes based on protein quantity
- Three scaling behaviors: linear, fixed, diminishing
- Quantity selector on sauce cards (Cast Iron 1lb | Batch Fish 3lb | Batch Chicken 2.5lb | Custom)
- Auto-scale in Prep Day cooking mode based on settings
- Display scaled amounts in sensible cooking fractions (¼, ⅓, ½, ⅔, ¾)

**Data Updates:**
- All sauce ingredients need `scalingBehavior` and `maxMultiplier` properties

**New Components:**
- `QuantitySelector.vue` — dropdown for sauce cards
- Update `SauceCard.vue` — add quantity selector, calculate scaled amounts

**Reference:** `docs/sauce-requirements.md` section 3

**Estimated Effort:** 10-12 hours

---

### 3.2 Dynamic Shopping List from Confirmed Plan ⚠️ PARTIAL

**Status:** Static shopping list exists, dynamic generation not implemented

**Features:**
- Generate shopping list from confirmed plan
- Add shrimp when in plan
- Add marinade-specific ingredients
- Add sauce-specific ingredients (if not in inventory)
- Adjust vegetable quantities based on roasting veg selection
- Scale quantities based on servings setting

**Current State:**
- `ShoppingListView.vue` — static checklist
- `shoppingStore.ts` — manages checked state only

**Updates Required:**
- `shoppingStore.ts` — generate items from `confirmedPlan`
- Dynamic category injection based on plan

**Reference:** `docs/fridge-engine-requirements.md` section 15.4

**Estimated Effort:** 8-10 hours

---

### 3.3 Expandable Sauce Cards with Full Recipes ⚠️ PARTIAL

**Status:** Sauce cards exist but may not have full recipe format

**Features:**
- Simple view (collapsed): name, best for, key flavor, badges, "▼ Full Recipe"
- Detailed view (expanded): ingredients, method, application, pairs with, storage, tips
- Quantity selector in detailed view
- Collapsible/expandable interaction

**Updates Required:**
- `SauceCard.vue` — add expand/collapse state
- Add full recipe content to all sauce objects

**Reference:** `docs/sauce-requirements.md` section 2

**Estimated Effort:** 6-8 hours

---

### 3.4 Quantity Scaling (1 / 2 / 3+ People) ⚠️ PARTIAL

**Status:** Servings selector exists in masthead, not fully integrated

**Features:**
- Scale all protein quantities
- Scale all grain/legume quantities
- Scale sauce recipes
- Update shopping list quantities
- Update meal plan portions

**Current State:**
- `settingsStore.ts` — has `servings` property
- Masthead — has servings selector UI

**Integration Required:**
- FridgeEngine — scale batch sizes based on servings
- Shopping list — scale quantities
- Sauce recipes — scale ingredients

**Reference:** `docs/meal-prep-app-requirements.md` section 4.2 (future enhancement)

**Estimated Effort:** 10-12 hours

---

### 3.5 "What's for Dinner Tonight?" Quick View ❌ NOT IMPLEMENTED

**Status:** Not started — nice-to-have feature

**Features:**
- Detect current day of week
- Display today's lunch and dinner from confirmed plan
- Show reheating instructions
- Link to relevant sauce
- Quick access from masthead or home view

**New Component:**
- `TodaysMeals.vue` — quick reference card

**Reference:** `docs/meal-prep-app-requirements.md` section 4.4 (future enhancement)

**Estimated Effort:** 4-6 hours

---

### 3.6 Pantry Tracker ❌ NOT IMPLEMENTED

**Status:** Backlog item

**Features:**
- Track owned pantry staples (olive oil, spices, etc.)
- Auto-remove owned items from shopping list
- "Running low" indicators
- Replenish reminders

**New Store:**
- `pantryStore.ts` — track inventory

**New View:**
- Pantry tab or section in Settings

**Reference:** `docs/implementation-plan.md` section 12.1

**Estimated Effort:** 12-15 hours

---

## Priority Tier 4 — Fitness Module

**Goal:** Implement the fitness tracking component of the application.

### 4.1 Fitness Plan Requirements Definition ❌ NOT STARTED

**Status:** No requirements document exists

**Needed:**
- Define 11-week fitness program structure
- Specify phases, weeks, exercises, sets/reps
- Define milestone system
- Workout logging requirements
- Progress tracking requirements
- Integration points with meal plan (pre/post-workout flags)

**Deliverable:**
- `docs/fitness-plan-requirements.md` — comprehensive spec

**Reference:** `docs/meal-prep-app-requirements.md` section 9 (placeholder)

**Estimated Effort:** 8-10 hours (requirements writing)

---

### 4.2 Fitness Data Model & Store ❌ NOT STARTED

**Status:** Placeholder store exists

**Current State:**
- `src/stores/fitnessStore.ts` — minimal placeholder
- `src/data/fitness/` — folder exists but empty

**Required:**
- Define TypeScript interfaces for fitness data
- Populate fitness data files (phases, weeks, exercises)
- Implement fitness store with workout logging
- Milestone tracking
- Current week tracking

**Dependencies:**
- Fitness requirements document (Tier 4.1)

**Estimated Effort:** 12-15 hours

---

### 4.3 Fitness Views & Components ❌ NOT STARTED

**Status:** Placeholder view exists

**Required Views:**
- Fitness overview (current week, progress)
- Weekly schedule
- Exercise library with instructions
- Workout logging interface
- Milestone tracker

**New Components:**
- `PhaseCard.vue`
- `WeekCard.vue`
- `ExerciseRow.vue`
- `WorkoutLogger.vue`
- `MilestoneTracker.vue`

**Dependencies:**
- Fitness data model (Tier 4.2)

**Estimated Effort:** 20-25 hours

---

### 4.4 Meal-Fitness Integration ❌ NOT STARTED

**Status:** Not started

**Features:**
- Flag meals as pre-workout or post-workout
- Recommend meal timing based on workout schedule
- Calorie/macro tracking (optional)
- Recovery day meal suggestions

**Dependencies:**
- Fitness module implementation (Tier 4.2-4.3)

**Estimated Effort:** 8-10 hours

---

## Priority Tier 5 — Future Enhancements (Backlog)

**Goal:** Long-term improvements and nice-to-have features.

### 5.1 User Accounts & Cloud Sync

**Features:**
- Optional user accounts (no login required for core features)
- Cross-device state synchronization
- Cloud backup of history and favorites
- Shared grocery lists (link sharing)

**Tech Stack:**
- Firebase or Supabase for backend
- Authentication (email/password, Google, Apple)

**Estimated Effort:** 30-40 hours

---

### 5.2 Print-Friendly Views

**Features:**
- Print-optimized shopping list
- Print-optimized meal plan
- Print-optimized Prep Day timeline
- PDF export option

**Estimated Effort:** 6-8 hours

---

### 5.3 Progress Photos & Measurements

**Features:**
- Photo upload and timeline
- Body measurements tracking
- Weight tracking
- Progress charts

**Estimated Effort:** 15-20 hours

---

### 5.4 Meal Plan Protein Swap

**Features:**
- Tap any meal in meal plan to swap protein
- Regenerate that day only
- Maintain rest of week unchanged

**Estimated Effort:** 6-8 hours

---

### 5.5 Offline PWA Support

**Features:**
- Service worker for offline access
- Cache critical assets
- Offline-first architecture
- Install as app on mobile

**Estimated Effort:** 10-12 hours

---

## Testing & Quality Assurance

### Accessibility Audits Needed

**Missing Coverage:**
- FridgeView slot cards and interactions
- Cooking Mode timer interface
- Expandable sauce cards
- Saturday prep warnings
- Settings view controls

**Reference:** `docs/accessibility-audit.md` (covers Phase 1-10 only)

**Estimated Effort:** 4-6 hours per new feature area

---

### Functional Testing Updates

**Missing Test Coverage:**
- FridgeEngine randomization logic
- No-repeat window enforcement
- Frequency settings (steak, shrimp)
- Cooking Mode timer system
- Timer persistence and reconciliation
- Sauce inventory persistence
- Marinade timing detection

**Reference:** `docs/functional-testing.md` (covers Phase 1-10 only)

**Estimated Effort:** 8-10 hours

---

## Known Issues & Technical Debt

### 1. Sauce Data Inconsistency
- Current sauce objects missing critical properties
- Ingredient schema incomplete
- **Impact:** Blocks dynamic Prep Day and cooking mode
- **Priority:** Critical

### 2. Navigation Order Verification Needed
- Breakfast tab position (should be between Proteins & Grains and Shopping List)
- Fridge tab position (should be between Meal Plan and Cast Iron Night)
- **Impact:** Minor UX issue
- **Priority:** Low

### 3. Generic Template Files Still Present
- `HelloWorld.vue`, `TheWelcome.vue`, `WelcomeItem.vue` in components
- `AboutView.vue`, `HomeView.vue` in views
- `counter.ts` in stores
- **Impact:** Code clutter
- **Priority:** Low (cleanup task)

---

## Estimated Total Effort by Tier

| Tier | Description | Estimated Hours |
|------|-------------|-----------------|
| **Tier 1** | MVP Completion | 17-24 hours |
| **Tier 2** | Enhanced Meal Prep | 49-63 hours |
| **Tier 3** | Advanced Features | 56-72 hours |
| **Tier 4** | Fitness Module | 48-60 hours |
| **Tier 5** | Future Enhancements | 67-88 hours |
| **Testing** | QA & Accessibility | 12-16 hours |
| **Total** | | **249-323 hours** |

---

## Recommended Implementation Order

### Sprint 1 (MVP Completion) — 2-3 weeks
1. Sauce data schema updates (Tier 1.1)
2. Marinade timing intelligence (Tier 1.2)
3. Missing proteins/legumes (Tier 1.3)
4. README update (Tier 1.4)
5. Deploy to production (Tier 1.5)

### Sprint 2 (Dynamic Prep Day) — 3-4 weeks
1. Dynamic Prep Day timeline (Tier 2.1)
2. Sauce inventory integration (Tier 2.3)
3. Settings view for FridgeEngine (Tier 2.4)

### Sprint 3 (Cooking Mode) — 3-4 weeks
1. Cooking Mode with timers (Tier 2.2)
2. Testing and accessibility audits
3. Bug fixes and polish

### Sprint 4+ (Advanced Features & Fitness)
- Prioritize based on user feedback after Sprint 1-3 deployment
- Consider fitness module vs. advanced meal prep features

---

## Success Metrics

### MVP Success Criteria
- ✅ All sauce data complete and consistent
- ✅ Marinade timing intelligence working
- ✅ Chickpeas and shrimp in rotation
- ✅ Deployed to production hosting
- ✅ README reflects actual application

### Enhanced Experience Success Criteria
- ✅ Dynamic Prep Day generates correctly from any plan
- ✅ Cooking Mode timers work reliably
- ✅ Sauce inventory reduces prep time
- ✅ Settings allow full customization

### Long-term Success Criteria
- ✅ Fitness module fully integrated
- ✅ User accounts and sync working
- ✅ 100% accessibility compliance maintained
- ✅ Positive user feedback on usability

---

## Maintenance & Updates

This roadmap should be reviewed and updated:
- After each sprint completion
- When new requirements emerge
- When priorities shift based on user feedback
- Quarterly for long-term planning

**Last Updated:** March 2026  
**Next Review:** After Sprint 1 completion

---

*End of roadmap document.*
