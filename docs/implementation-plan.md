# Meal Prep & Fitness App — Implementation Plan

> **Version:** 1.0  
> **Based on:** Product Requirements v1.0 + Technical Requirements v1.0  
> **Stack:** Vue 3 + TypeScript + Pinia + Tailwind CSS  
> **Created:** March 2026

---

## Overview

This implementation plan breaks down the development of the Meal Prep & Fitness App into sequential phases. The app is a single-page Vue 3 application with two main modules: **Meal Prep** (fully specified) and **Fitness Plan** (placeholder for future implementation).

**Key Technical Decisions:**

- Vue 3 Composition API with `<script setup>` syntax
- Pinia for state management with localStorage persistence
- Tailwind CSS + CSS custom properties for styling
- Hash-based routing for static hosting compatibility
- TypeScript strict mode for type safety

---

## Phase 1: Foundation & Setup

**Goal:** Establish project infrastructure, design system, and core layout components.

### 1.1 Project Configuration ✓ (COMPLETED)

- [x] Scaffold Vue 3 + TypeScript + Vite project
- [x] Install Pinia and Vue Router
- [x] Install additional dependencies:
  - `pinia-plugin-persistedstate`
  - `lucide-vue-next`
  - Tailwind CSS (if not already configured)

### 1.2 Tailwind & Design System ✓ (COMPLETED)

- [x] Configure `tailwind.config.js` with custom font families
  - Display: Cormorant Garamond (serif)
  - Body: Jost (sans-serif)
- [x] Add Google Fonts to `index.html`:
  - Cormorant Garamond (weights: 600, 700, italic variants)
  - Jost (weights: 300, 400, 500, 600)
- [x] Define all CSS custom properties in `src/assets/main.css`:
  - Background colors (`--bg`, `--paper`)
  - Text colors (`--ink`, `--muted`)
  - Border colors (`--rule`)
  - Brand colors (green, orange, blue, gold, plum, red, cast)
  - Light variants for each accent color
- [x] Create utility component classes:
  - `.section-label`
  - `.callout` with color variants
  - `.pt-pill` (protein type pills)
  - `.badge` variants (best, good, make)
  - `.sb-*` (storage badges)
  - `.ns-*` (nutrient status badges)
  - `.t-*` (timing badges)
  - `.card`, `.data-table`
  - View transition animations

### 1.3 Pinia Configuration ✓ (COMPLETED)

- [x] Update `src/main.ts` to use `pinia-plugin-persistedstate`
- [x] Configure Vite with `@` alias for `src/` imports
- [x] Set `base: './'` in `vite.config.ts` for static hosting

### 1.4 TypeScript Interfaces ✓ (COMPLETED)

- [x] Create `src/types/meal.types.ts`:
  - `ProteinType`, `GrainType`, `LegumeType`, `BadgeVariant`, `CalloutVariant`
  - `StorageLocation`, `MarinadeId`, `MarinadeTiming`
  - `Ingredient`, `Protein`, `GrainOrLegume`, `Vegetable`
  - `ShoppingItem`, `PrepStep`, `EmergencyMeal`
  - `MealEntry`, `MealPlanDay`, `Marinade`, `Sauce`
  - `NutrientRow`, `StorageRow`
- [x] Create `src/types/common.types.ts`:
  - `NavSection`, `NavItem`
- [x] Create `src/types/fitness.types.ts` (placeholder)

**Deliverable:** Fully configured project with design system ready for component development.

---

## Phase 2: Data Layer

**Goal:** Populate all static data files that drive the application content.

### 2.1 Meal Prep Data Files ✓ (COMPLETED)

- [x] `src/data/proteins.ts` — Fish, chicken (thighs/breast), steak objects
- [x] `src/data/grainsLegumes.ts` — Grains (brown rice, quinoa, jasmine rice) + Legumes (lentils, pinto beans, black beans)
- [x] `src/data/vegetables.ts` — Broccoli (default) + 7 swap options
- [x] `src/data/marinades.ts` — 4 marinades with timing badges
- [x] `src/data/sauces.ts` — Fish (3), Chicken (3), Steak (3) sauces
- [x] `src/data/mealPlan.ts` — Weekly meal plan (Mon–Sat)
- [x] `src/data/prepTimeline.ts` — Sunday prep steps with timing
- [x] `src/data/emergencyMeals.ts` — 5 fallback meals
- [x] `src/data/nutrients.ts` — Nutrient status table rows
- [x] `src/data/storageGuide.ts` — Fridge life and reheating data
- [x] `src/data/shopping.ts` — Shopping list items by category

### 2.2 Fitness Data Files (Placeholder) ✓ (COMPLETED)

- [x] `src/data/fitness/` folder structure created
- [x] Placeholder files for future fitness content

**Deliverable:** All meal prep content structured as typed TypeScript data.

---

## Phase 3: Pinia Stores ✓ (COMPLETED)

**Goal:** Implement state management for shopping, meals, settings, and fitness (placeholder).

### 3.1 Shopping Store ✓ (COMPLETED)

- [x] `src/stores/shoppingStore.ts`:
  - `items` (Record<string, boolean>) — checked state
  - `weekLabel` (string) — current week display
  - `toggle(id)` — toggle item checked state
  - `resetWeek()` — uncheck all + update week label
  - `checkedCount`, `totalCount` computed properties
  - Enable persistence with `persist: true`

### 3.2 Meal Store ✓ (COMPLETED)

- [x] `src/stores/mealStore.ts`:
  - `selectedMarinade` (MarinadeId | null)
  - `selectedVegetable` (string, default: 'broccoli')
  - `setMarinade(id)`, `setVegetable(name)`
  - Enable persistence

### 3.3 Settings Store ✓ (COMPLETED)

- [x] `src/stores/settingsStore.ts`:
  - `servings` (1 | 2 | 3, default: 2)
  - `lastResetDate` (string | null)
  - `hasSeenPKDWarning` (boolean)
  - `acknowledgedPKDWarning()`, `setServings(n)`
  - Enable persistence

### 3.4 Fitness Store (Placeholder) ✓ (COMPLETED)

- [x] `src/stores/fitnessStore.ts`:
  - `milestones` (Record<number, boolean>)
  - `workoutLog` (any[] — to be typed later)
  - `currentWeek` (number, 1–11)
  - `toggleMilestone(index)`, `setWeek(week)`
  - Enable persistence

**Deliverable:** All stores functional with localStorage persistence.

---

## Phase 4: Layout Components ✓ (COMPLETED)

**Goal:** Build the app shell — masthead, navigation, and page wrapper.

### 4.1 Core Layout ✓ (COMPLETED)

- [x] `src/components/layout/AppMasthead.vue`:
  - Dark background (`var(--ink)`) with green bottom border
  - Title: "Meal Prep" + italic "for Two"
  - Pills row: "6 Lunches + 6 Dinners", "Whole Foods", etc.
  - Meta column (right): protein/grain/location summary (hidden on mobile)
- [x] `src/components/layout/AppNav.vue`:
  - Sticky top navigation, dark background
  - Two sections: Meal Prep tabs + Fitness tab
  - Active tab styling with green accent
  - Horizontal scroll on mobile
  - Uses `<RouterLink>` for navigation
- [x] `src/components/layout/AppPage.vue`:
  - Max-width wrapper (980px)
  - Responsive padding
  - Centers content

### 4.2 App Root ✓ (COMPLETED)

- [x] Update `src/App.vue`:
  - Render `AppMasthead`, `AppNav`, `AppPage`
  - `<RouterView>` with transition animation
  - Remove default Vue scaffolding content

**Deliverable:** App shell with navigation ready for view components.

---

## Phase 5: Shared UI Components

**Goal:** Build reusable UI components used across multiple views.

### 5.1 Basic UI Components

- [ ] `src/components/ui/CalloutBox.vue`:
  - Props: `variant` (CalloutVariant)
  - Slot: default content
  - Left border + tinted background per variant
- [ ] `src/components/ui/SectionLabel.vue`:
  - Small all-caps label with top border rule
  - Props: `label` (string)
- [ ] `src/components/ui/StatusBadge.vue`:
  - Props: `variant` ('best' | 'good' | 'make')
  - Renders styled badge pill
- [ ] `src/components/ui/ProteinPill.vue`:
  - Props: `type` (ProteinType | 'cast-iron' | 'flex')
  - Color-coded pill with icon/emoji
- [ ] `src/components/ui/StorageBadge.vue`:
  - Props: `type` ('pantry' | 'fridge' | 'batch')
  - Small uppercase badge
- [ ] `src/components/ui/CheckItem.vue`:
  - Props: `itemId`, `name`, `quantity`
  - Emits: `toggle(itemId)`
  - Full-row tappable checkbox
  - Reads checked state from shoppingStore
  - Strikethrough + opacity when checked

### 5.2 Data Display Components

- [ ] `src/components/ui/DataTable.vue`:
  - Slot-based table with styled headers
  - Responsive hover states
  - Props: `headers` (string[])
  - Slots: column content

**Deliverable:** Reusable component library for consistent UI.

---

## Phase 6: Meal Prep Components

**Goal:** Build domain-specific components for meal prep views.

### 6.1 Protein & Grain Components

- [ ] `src/components/meal/ProteinCard.vue`:
  - Props: `protein` (Protein)
  - Display: name, icon, buy guidance, cook method, stats
- [ ] `src/components/meal/GrainsLegumesTable.vue`:
  - Props: `items` (GrainOrLegume[])
  - Table with columns: name, nutrients, cook method, use, badge
  - Quinoa rinse warning callout
  - Displays both grains and legumes in single table
- [ ] `src/components/meal/VegetableGrid.vue`:
  - Props: `vegetables` (Vegetable[])
  - Grid of cards with tag badges (default/swap/wildcard)

### 6.2 Shopping & Prep Components

- [ ] `src/components/meal/ShoppingCategory.vue`:
  - Props: `category` (string), `items` (ShoppingItem[])
  - Renders category header + CheckItem list
- [ ] `src/components/meal/PrepTimeline.vue`:
  - Props: `steps` (PrepStep[])
  - Vertical timeline with colored dots
  - Elapsed time + duration display
- [ ] `src/components/meal/PrepStep.vue`:
  - Props: `step` (PrepStep)
  - Individual timeline step with expandable detail
- [ ] `src/components/meal/EmergencyMeals.vue`:
  - Props: `meals` (EmergencyMeal[])
  - Collapsible panel with fallback meal list

### 6.3 Meal Plan Components

- [ ] `src/components/meal/MealPlanTable.vue`:
  - Props: `days` (MealPlanDay[])
  - Weekly table with protein pills
  - Hide grain column on mobile
- [ ] `src/components/meal/MealPlanRow.vue`:
  - Props: `day` (MealPlanDay)
  - Single day row with lunch/dinner/grain

### 6.4 Cast Iron & Sauce Components

- [ ] `src/components/meal/CastIronInstructions.vue`:
  - Sunday setup steps (5 min)
  - Wednesday cooking steps (13 min)
  - Prominent "steak always cast iron" callout
- [ ] `src/components/meal/MarinadeCard.vue`:
  - Props: `marinade` (Marinade)
  - Name, timing badge, ingredients, note
- [ ] `src/components/meal/SauceCard.vue`:
  - Props: `sauce` (Sauce)
  - Name, best for, ingredients, storage badges, shelf life

### 6.5 Nutrient & Storage Components

- [ ] `src/components/meal/NutrientTable.vue`:
  - Props: `nutrients` (NutrientRow[])
  - Status badges + sources + notes
- [ ] `src/components/meal/StorageGuide.vue`:
  - Props: `items` (StorageRow[])
  - Fridge life + reheating instructions

**Deliverable:** All meal prep components ready for view assembly.

---

## Phase 7: Routing & Views

**Goal:** Configure routes and build all meal prep view pages.

### 7.1 Router Configuration

- [ ] Update `src/router/index.ts`:
  - Use `createWebHashHistory` for static hosting
  - Redirect `/` to `/meal/proteins`
  - Define all `/meal/*` routes
  - Placeholder `/fitness` routes
  - Scroll behavior: smooth scroll to top on route change

### 7.2 Meal Prep Views

- [ ] `src/views/meal/ProteinsGrainsView.vue`:
  - Fish section (full-width card)
  - Chicken section (thighs + breast cards + summary)
  - Steak section (cast iron warning)
  - Grains & legumes table
  - Vegetable rotation grid
- [ ] `src/views/meal/ShoppingListView.vue`:
  - Week label display
  - Category groups with CheckItem components
  - Checked count / total count display
  - Reset week button
  - Marinade selection note
- [ ] `src/views/meal/PrepDayView.vue`:
  - Saturday night pre-step callout
  - Sunday timeline (6 steps)
  - Emergency meals panel (collapsible)
- [ ] `src/views/meal/MealPlanView.vue`:
  - Weekly meal plan table
  - Thursday steak note callout
  - Saturday taco night note
- [ ] `src/views/meal/CastIronView.vue`:
  - Header with subtitle
  - Sunday setup instructions
  - Wednesday cooking instructions (13 min)
  - 4 marinade cards with timing badges
- [ ] `src/views/meal/SaucesView.vue`:
  - Three sections: Fish / Chicken / Steak
  - Sauce cards in each section
  - Storage badge legend
- [ ] `src/views/meal/NutrientsView.vue`:
  - PKD warning banner (CalloutBox red variant)
  - DASH diet alignment note
  - Nutrient status table
  - Fitness plan connection callouts
  - PKD & water note
- [ ] `src/views/meal/StorageView.vue`:
  - Fridge life table
  - Reheating guide
  - Recommended containers note

### 7.3 Fitness Views (Placeholder)

- [ ] Create placeholder view files in `src/views/fitness/`
- [ ] Add "Coming Soon" message to fitness routes

**Deliverable:** All meal prep views functional and navigable.

---

## Phase 8: Interactivity & State Integration

**Goal:** Wire up Pinia stores to components for full interactivity.

### 8.1 Shopping List Integration

- [ ] Connect `CheckItem` to `shoppingStore.toggle()`
- [ ] Display checked count in shopping list header
- [ ] Implement weekly reset button functionality
- [ ] Initialize shopping items from data file on first load

### 8.2 Meal Store Integration

- [ ] Marinade selection UI (future enhancement placeholder)
- [ ] Vegetable swap selection (future enhancement placeholder)

### 8.3 Settings Integration

- [ ] PKD warning acknowledgment (if implementing dismissible banner)
- [ ] Servings selector (future enhancement placeholder)

**Deliverable:** Fully interactive shopping list with persistent state.

---

## Phase 9: Responsive Design & Polish

**Goal:** Ensure mobile-first responsive design and smooth UX.

### 9.1 Responsive Audit

- [ ] Test at 375px (mobile)
  - Single column layouts
  - Horizontal scrolling nav
  - Stacked protein cards
  - Collapsed meal plan table (hide grain column)
- [ ] Test at 768px (tablet)
  - Two-column grids for cards
  - Full meal plan table
- [ ] Test at 1280px (desktop)
  - Three-column grids
  - Max-width content centering

### 9.2 Animations & Transitions

- [ ] Route change fade-in animation (`.view-enter-active`)
- [ ] Checkbox check/uncheck smooth transition
- [ ] Collapsible panel animations (emergency meals)

### 9.3 Touch & Interaction

- [ ] Verify 44×44px minimum touch targets on mobile
- [ ] Test horizontal nav scroll on mobile
- [ ] Smooth scrolling behavior

**Deliverable:** Polished, responsive UI across all device sizes.

---

## Phase 10: Accessibility & Testing

**Goal:** Ensure accessibility compliance and test core functionality.

### 10.1 Accessibility Audit

- [ ] Keyboard navigation for all interactive elements
- [ ] ARIA labels on checkboxes and buttons
- [ ] Color contrast check (WCAG AA minimum)
- [ ] Screen reader testing for shopping list
- [ ] Focus indicators visible on all focusable elements

### 10.2 Functional Testing

- [ ] Shopping list: check/uncheck items, verify persistence
- [ ] Shopping list: weekly reset clears all items
- [ ] Navigation: all tabs accessible, active state correct
- [ ] Data display: all content renders correctly
- [ ] localStorage: verify state persists across page reloads

### 10.3 Browser Testing

- [ ] Test in Safari (iOS + macOS)
- [ ] Test in Chrome (mobile + desktop)
- [ ] Test in Firefox
- [ ] Verify hash routing works in all browsers

**Deliverable:** Accessible, tested application ready for deployment.

---

## Phase 11: Build & Deployment

**Goal:** Prepare for production deployment to static hosting.

### 11.1 Build Configuration

- [ ] Verify `vite.config.ts` has `base: './'`
- [ ] Test production build: `npm run build`
- [ ] Verify `dist/` output works locally (open `index.html`)

### 11.2 Deployment Options

- [ ] **Option A: Netlify**
  - Connect GitHub repo
  - Build command: `npm run build`
  - Publish directory: `dist`
- [ ] **Option B: GitHub Pages**
  - Push `dist/` to `gh-pages` branch
  - Enable GitHub Pages in repo settings
- [ ] **Option C: Local/Manual**
  - Serve `dist/` folder as-is

### 11.3 Documentation

- [ ] Update `README.md` with:
  - Project overview
  - Setup instructions
  - Available scripts
  - Deployment instructions
- [ ] Move requirements docs to `docs/` folder
- [ ] Add this implementation plan to `docs/`

**Deliverable:** Production-ready build deployed to static hosting.

---

## Phase 12: Future Enhancements (Backlog)

**Goal:** Planned features for post-launch iterations.

### 12.1 Meal Prep Enhancements

- [ ] Dynamic marinade ingredient injection into shopping list
- [ ] Meal plan protein swap functionality
- [ ] Quantity scaling (1 / 2 / 3+ people)
- [ ] "What's for dinner tonight?" quick view
- [ ] Tap meal to see sauce recommendation
- [ ] Pantry tracker for owned ingredients
- [ ] Print-friendly shopping list view
- [ ] Shared grocery list (link sharing)

### 12.2 Fitness Module Implementation

- [ ] Define fitness data types in `fitness.types.ts`
- [ ] Populate fitness data files (phases, weeks, exercises, milestones)
- [ ] Build fitness components (PhaseCard, WeekCard, ExerciseRow, etc.)
- [ ] Build fitness views (Overview, Schedule, Exercises, Milestones)
- [ ] Integrate fitness store with meal plan (post/pre-workout flags)
- [ ] Workout logging functionality

### 12.3 Advanced Features

- [ ] Optional user accounts for cloud sync
- [ ] Cross-device state synchronization
- [ ] Progress photos and measurements tracker
- [ ] Workout sets/reps/weights logging
- [ ] Rest day vs. workout day meal suggestions

**Deliverable:** Roadmap for continued development.

---

## Success Criteria

### Minimum Viable Product (MVP)

- ✅ All 8 meal prep views functional and navigable
- ✅ Shopping list with persistent check/uncheck state
- ✅ Weekly reset functionality
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Accessible keyboard navigation and ARIA labels
- ✅ Deployed to static hosting

### Post-MVP Goals

- Interactive marinade selection
- Fitness module implementation
- Dynamic meal plan customization
- Cross-device sync

---

## Timeline Estimate

| Phase                             | Estimated Time  | Dependencies  |
| --------------------------------- | --------------- | ------------- |
| Phase 1: Foundation               | 4–6 hours       | None          |
| Phase 2: Data Layer               | 3–4 hours       | Phase 1       |
| Phase 3: Pinia Stores             | 2–3 hours       | Phase 1, 2    |
| Phase 4: Layout Components        | 2–3 hours       | Phase 1       |
| Phase 5: Shared UI Components     | 4–5 hours       | Phase 1       |
| Phase 6: Meal Prep Components     | 8–10 hours      | Phase 1, 2, 5 |
| Phase 7: Routing & Views          | 10–12 hours     | Phase 1–6     |
| Phase 8: Interactivity            | 2–3 hours       | Phase 3, 7    |
| Phase 9: Responsive Design        | 3–4 hours       | Phase 7       |
| Phase 10: Accessibility & Testing | 3–4 hours       | Phase 7–9     |
| Phase 11: Build & Deployment      | 1–2 hours       | Phase 10      |
| **Total MVP**                     | **42–56 hours** |               |

**Note:** Fitness module implementation (Phase 12.2) estimated at additional 20–30 hours once requirements are finalized.

---

## Next Steps

1. **Complete Phase 1.1** — Install remaining dependencies
2. **Begin Phase 1.2** — Configure Tailwind and design system
3. **Populate data files** (Phase 2) in parallel with component development
4. **Build incrementally** — complete one view at a time, test as you go

---

_This implementation plan is a living document. Update as requirements evolve or technical decisions change._
