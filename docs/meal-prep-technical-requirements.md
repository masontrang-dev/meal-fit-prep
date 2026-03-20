# Meal Prep & Fitness App — Technical Requirements

> **Version:** 1.0  
> **Stack:** Vue 3 + Pinia + Vue Router  
> **Persistence:** Pinia + pinia-plugin-persistedstate (localStorage)  
> **Styling:** Tailwind CSS with custom design tokens  
> **Last Updated:** March 2026

---

## 1. Tech Stack

| Layer            | Choice                                  | Notes                                                               |
| ---------------- | --------------------------------------- | ------------------------------------------------------------------- |
| Framework        | Vue 3 (Composition API)                 | Use `<script setup>` syntax throughout                              |
| State Management | Pinia                                   | One store per domain (meals, fitness, shopping, settings)           |
| Persistence      | pinia-plugin-persistedstate             | Persists selected stores to localStorage automatically              |
| Routing          | Vue Router 4                            | Hash-based routing (`createWebHashHistory`) for easy static hosting |
| Styling          | Tailwind CSS v3 + CSS custom properties | Tailwind for layout/spacing; CSS variables for design tokens        |
| Build Tool       | Vite                                    | Fast dev server, optimized production builds                        |
| Language         | TypeScript                              | Strict mode recommended                                             |
| Icons            | Lucide Vue Next                         | Consistent, tree-shakable icon set                                  |
| Package Manager  | npm or pnpm                             | pnpm preferred for speed                                            |

---

## 2. Project Setup

```bash
# Scaffold
npm create vue@latest meal-prep-app
# Select: TypeScript ✓, Vue Router ✓, Pinia ✓, Tailwind (via plugin or manual)

cd meal-prep-app
npm install

# Additional dependencies
npm install pinia-plugin-persistedstate
npm install lucide-vue-next
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        body: ["Jost", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

### `src/main.ts`

```ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router";
import App from "./App.vue";
import "./assets/main.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(pinia).use(router).mount("#app");
```

---

## 3. Design System

### 3.1 Google Fonts

Add to `index.html` `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=Jost:wght@300;400;500;600&display=swap"
  rel="stylesheet"
/>
```

### 3.2 CSS Custom Properties

Add to `src/assets/main.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Backgrounds */
    --bg: #f8f4ef;
    --paper: #fffefb;

    /* Text */
    --ink: #1e1a15;
    --muted: #8c7f70;

    /* Borders */
    --rule: #e6ddd2;

    /* Brand — Green (primary) */
    --green: #3b6e4c;
    --green-light: #edf5f0;
    --green-mid: #c8dfd0;

    /* Accent — Orange (chicken) */
    --orange: #c25520;
    --orange-light: #fdf1ec;

    /* Accent — Blue (fish) */
    --blue: #1d4a7c;
    --blue-light: #ecf2fa;

    /* Accent — Gold (steak / warnings) */
    --gold: #9c720e;
    --gold-light: #fdf7e8;

    /* Accent — Plum (nutrients / health) */
    --plum: #5c3570;
    --plum-light: #f5f0fa;

    /* Accent — Red (warnings / PKD) */
    --red: #8b2222;
    --red-light: #fdf0f0;

    /* Accent — Cast Iron (Wednesday / maroon) */
    --cast: #7a1f4a;
    --cast-light: #fceef5;
  }

  html {
    background-color: var(--bg);
    color: var(--ink);
    font-family: "Jost", sans-serif;
    font-weight: 300;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: "Cormorant Garamond", serif;
    font-weight: 700;
  }
}

/* Utility classes that extend Tailwind */
@layer components {
  /* Section label — small all-caps with top border rule */
  .section-label {
    @apply text-[0.62rem] font-semibold tracking-[0.18em] uppercase border-t pt-[10px] mt-8 mb-4;
    color: var(--muted);
    border-color: var(--rule);
  }

  /* Callout variants */
  .callout {
    @apply border border-l-[3px] px-4 py-3 text-[0.83rem] leading-[1.7] mb-3;
    border-color: var(--rule);
    border-left-color: var(--green);
    background: var(--green-light);
  }
  .callout strong {
    @apply font-semibold;
  }
  .callout-orange {
    border-left-color: var(--orange) !important;
    background: var(--orange-light) !important;
  }
  .callout-blue {
    border-left-color: var(--blue) !important;
    background: var(--blue-light) !important;
  }
  .callout-gold {
    border-left-color: var(--gold) !important;
    background: var(--gold-light) !important;
  }
  .callout-red {
    border-left-color: var(--red) !important;
    background: var(--red-light) !important;
  }
  .callout-plum {
    border-left-color: var(--plum) !important;
    background: var(--plum-light) !important;
  }
  .callout-cast {
    border-left-color: var(--cast) !important;
    background: var(--cast-light) !important;
  }

  /* Protein type pill tags */
  .pt-pill {
    @apply inline-block px-2 py-[2px] text-[0.67rem] font-semibold rounded-sm mb-[3px];
  }
  .pt-pill-fish {
    background: var(--blue-light);
    color: var(--blue);
  }
  .pt-pill-chicken {
    background: var(--orange-light);
    color: var(--orange);
  }
  .pt-pill-steak {
    background: var(--gold-light);
    color: var(--gold);
  }
  .pt-pill-flex {
    background: var(--green-light);
    color: var(--green);
  }
  .pt-pill-cast {
    background: var(--cast-light);
    color: var(--cast);
  }

  /* Badge variants */
  .badge {
    @apply inline-block px-2 py-[2px] text-[0.67rem] font-semibold rounded-sm;
  }
  .badge-best {
    background: var(--green-light);
    color: var(--green);
    border: 1px solid var(--green-mid);
  }
  .badge-good {
    background: var(--gold-light);
    color: var(--gold);
    border: 1px solid #e8d090;
  }
  .badge-make {
    background: var(--blue-light);
    color: var(--blue);
    border: 1px solid #b8cce8;
  }

  /* Storage / sauce badges */
  .sb-pantry {
    @apply inline-block text-[0.62rem] font-bold tracking-[0.07em] uppercase px-[7px] py-[2px] rounded-sm mr-1;
    background: #f0f4e8;
    color: #4a6020;
    border: 1px solid #c8d8a0;
  }
  .sb-fridge {
    @apply inline-block text-[0.62rem] font-bold tracking-[0.07em] uppercase px-[7px] py-[2px] rounded-sm mr-1;
    background: var(--blue-light);
    color: var(--blue);
    border: 1px solid #b8cce8;
  }
  .sb-batch {
    @apply inline-block text-[0.62rem] font-bold tracking-[0.07em] uppercase px-[7px] py-[2px] rounded-sm mr-1;
    background: var(--cast-light);
    color: var(--cast);
    border: 1px solid #e8b8d0;
  }

  /* Nutrient status badges */
  .ns-good {
    @apply inline-block px-2 py-[2px] text-[0.66rem] font-semibold rounded-sm;
    background: var(--green-light);
    color: var(--green);
  }
  .ns-watch {
    @apply inline-block px-2 py-[2px] text-[0.66rem] font-semibold rounded-sm;
    background: var(--gold-light);
    color: var(--gold);
  }
  .ns-low {
    @apply inline-block px-2 py-[2px] text-[0.66rem] font-semibold rounded-sm;
    background: var(--red-light);
    color: var(--red);
  }

  /* Marinade timing badges */
  .t-sunday {
    @apply inline-block text-[0.64rem] font-bold tracking-[0.08em] uppercase px-2 py-[3px] rounded-sm whitespace-nowrap flex-shrink-0;
    background: var(--green-light);
    color: var(--green);
    border: 1px solid var(--green-mid);
  }
  .t-tuesday {
    @apply inline-block text-[0.64rem] font-bold tracking-[0.08em] uppercase px-2 py-[3px] rounded-sm whitespace-nowrap flex-shrink-0;
    background: var(--gold-light);
    color: var(--gold);
    border: 1px solid #e8d090;
  }

  /* Page card / paper surface */
  .card {
    background: var(--paper);
    border: 1px solid var(--rule);
  }

  /* Data tables */
  .data-table {
    @apply w-full text-[0.81rem];
    border: 1px solid var(--rule);
  }
  .data-table th {
    @apply text-left px-[14px] py-[10px] text-[0.62rem] font-semibold tracking-[0.12em] uppercase;
    background: var(--ink);
    color: var(--bg);
  }
  .data-table td {
    @apply px-[14px] py-[11px] align-top leading-[1.55];
    border-bottom: 1px solid var(--rule);
  }
  .data-table tr:last-child td {
    border-bottom: none;
  }
  .data-table tr:hover td {
    background: var(--bg);
  }

  /* View fade-in animation */
  .view-enter-active {
    @apply transition-all duration-200 ease-out;
  }
  .view-enter-from {
    @apply opacity-0 translate-y-1;
  }
}
```

### 3.3 Typography Scale

| Usage           | Font               | Size           | Weight | Class                                                       |
| --------------- | ------------------ | -------------- | ------ | ----------------------------------------------------------- |
| Page title      | Cormorant Garamond | 3–3.8rem clamp | 700    | `font-display text-5xl`                                     |
| Section heading | Cormorant Garamond | 1.1–1.5rem     | 700    | `font-display text-2xl`                                     |
| Card title      | Cormorant Garamond | 1.05rem        | 700    | `font-display text-lg`                                      |
| Nav label       | Jost               | 0.72rem        | 600    | `font-body text-xs font-semibold tracking-widest uppercase` |
| Section label   | Jost               | 0.62rem        | 600    | `.section-label` component class                            |
| Body text       | Jost               | 0.82rem        | 300    | `font-body text-sm font-light`                              |
| Small / meta    | Jost               | 0.72rem        | 500    | `font-body text-xs font-medium`                             |
| Badge / pill    | Jost               | 0.67rem        | 600    | Via badge component classes                                 |

### 3.4 Spacing & Layout

- Max content width: `980px`, centered with `mx-auto`
- Page padding: `px-6 pb-24 pt-9` (desktop), `px-4` (mobile)
- Card internal padding: `p-4` to `p-5`
- Gap between grid items: `gap-4`
- Section spacing: `mt-8 mb-4` for section labels

---

## 4. Project Structure

```
src/
├── assets/
│   └── main.css                  # Tailwind directives + CSS custom properties
│
├── components/
│   ├── layout/
│   │   ├── AppMasthead.vue       # Top header with title and meta pills
│   │   ├── AppNav.vue            # Sticky tab navigation bar
│   │   └── AppPage.vue           # Max-width wrapper with padding
│   │
│   ├── ui/
│   │   ├── CalloutBox.vue        # Colored callout with variant prop
│   │   ├── SectionLabel.vue      # Small all-caps section divider
│   │   ├── DataTable.vue         # Styled table with slot-based columns
│   │   ├── StatusBadge.vue       # Best / Good / Watch / PKD badges
│   │   ├── ProteinPill.vue       # Fish / Chicken / Steak / Cast Iron pill tag
│   │   ├── StorageBadge.vue      # Pantry / Fridge / Batchable badge
│   │   └── CheckItem.vue         # Tappable checkbox row (shopping list)
│   │
│   ├── meal/
│   │   ├── ProteinCard.vue       # Fish / Chicken / Steak info card
│   │   ├── GrainsLegumesTable.vue # Grains & legumes data table
│   │   ├── VegetableGrid.vue     # Veg rotation card grid
│   │   ├── ShoppingCategory.vue  # One category group in shopping list
│   │   ├── PrepTimeline.vue      # Sunday prep day step-by-step timeline
│   │   ├── PrepStep.vue          # Individual timeline step
│   │   ├── EmergencyMeals.vue    # "Missed Sunday" fallback panel
│   │   ├── MealPlanTable.vue     # Weekly meal plan table
│   │   ├── MealPlanRow.vue       # Single day row in meal plan
│   │   ├── CastIronInstructions.vue  # Sunday setup + Wednesday cook steps
│   │   ├── MarinadeCard.vue      # Individual marinade with timing badge
│   │   ├── SauceCard.vue         # Individual sauce with ingredients + storage
│   │   ├── NutrientTable.vue     # Nutrient status table
│   │   └── StorageGuide.vue      # Fridge life + reheating guide
│   │
│   └── fitness/
│       └── [PLACEHOLDER]         # See Section 10
│
├── views/
│   ├── meal/
│   │   ├── ProteinsGrainsView.vue
│   │   ├── ShoppingListView.vue
│   │   ├── PrepDayView.vue
│   │   ├── MealPlanView.vue
│   │   ├── CastIronView.vue
│   │   ├── SaucesView.vue
│   │   ├── NutrientsView.vue
│   │   └── StorageView.vue
│   │
│   └── fitness/
│       └── [PLACEHOLDER]         # See Section 10
│
├── stores/
│   ├── shoppingStore.ts          # Checked items, weekly reset
│   ├── mealStore.ts              # Meal plan data, marinade selection
│   ├── fitnessStore.ts           # [PLACEHOLDER] Workout log, milestones
│   └── settingsStore.ts          # App-wide preferences
│
├── data/
│   ├── proteins.ts               # Fish, chicken, steak data objects
│   ├── grainsLegumes.ts          # Grains and legumes data
│   ├── vegetables.ts             # Veg rotation data
│   ├── marinades.ts              # Marinade definitions
│   ├── sauces.ts                 # Sauce definitions
│   ├── mealPlan.ts               # Default weekly meal plan
│   ├── prepTimeline.ts           # Sunday prep timeline steps
│   ├── emergencyMeals.ts         # Fallback meal list
│   ├── nutrients.ts              # Nutrient status data
│   ├── storageGuide.ts           # Fridge life and reheating data
│   └── fitness/
│       └── [PLACEHOLDER]         # See Section 10
│
├── types/
│   ├── meal.types.ts             # All meal-related TypeScript interfaces
│   ├── fitness.types.ts          # [PLACEHOLDER]
│   └── common.types.ts           # Shared types (Badge, Callout variants, etc.)
│
├── router/
│   └── index.ts                  # Route definitions
│
└── App.vue                       # Root — masthead + nav + router-view
```

---

## 5. Routing

```ts
// src/router/index.ts
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/meal/proteins",
  },
  {
    path: "/meal",
    children: [
      {
        path: "proteins",
        component: () => import("@/views/meal/ProteinsGrainsView.vue"),
      },
      {
        path: "shopping",
        component: () => import("@/views/meal/ShoppingListView.vue"),
      },
      { path: "prep", component: () => import("@/views/meal/PrepDayView.vue") },
      {
        path: "plan",
        component: () => import("@/views/meal/MealPlanView.vue"),
      },
      {
        path: "cast-iron",
        component: () => import("@/views/meal/CastIronView.vue"),
      },
      {
        path: "sauces",
        component: () => import("@/views/meal/SaucesView.vue"),
      },
      {
        path: "nutrients",
        component: () => import("@/views/meal/NutrientsView.vue"),
      },
      {
        path: "storage",
        component: () => import("@/views/meal/StorageView.vue"),
      },
    ],
  },
  {
    path: "/fitness",
    // [PLACEHOLDER] — See Section 10
    children: [],
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0, behavior: "smooth" }),
});
```

> **Hash history** (`createWebHashHistory`) is used so the app can be served from any static host (GitHub Pages, Netlify, local file) without server-side routing configuration.

---

## 6. Pinia Stores

### 6.1 Shopping Store

```ts
// src/stores/shoppingStore.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface ShoppingItem {
  id: string; // e.g. 'fish-salmon'
  category: string;
  name: string;
  quantity: string;
  checked: boolean;
}

export const useShoppingStore = defineStore(
  "shopping",
  () => {
    const items = ref<Record<string, boolean>>({});
    // key = item id, value = checked state
    // Populated from data/shopping.ts on first load

    const weekLabel = ref<string>("");
    // e.g. 'Week of March 23' — set on weekly reset

    function toggle(id: string) {
      items.value[id] = !items.value[id];
    }

    function resetWeek() {
      Object.keys(items.value).forEach((k) => {
        items.value[k] = false;
      });
      weekLabel.value = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      });
    }

    const checkedCount = computed(
      () => Object.values(items.value).filter(Boolean).length,
    );

    const totalCount = computed(() => Object.keys(items.value).length);

    return { items, weekLabel, toggle, resetWeek, checkedCount, totalCount };
  },
  {
    persist: true, // pinia-plugin-persistedstate — writes to localStorage
  },
);
```

### 6.2 Meal Store

```ts
// src/stores/mealStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";

type MarinadeId =
  | "soy-garlic-ginger"
  | "smoked-paprika-garlic"
  | "lime-cumin"
  | "balsamic-herb";

export const useMealStore = defineStore(
  "meal",
  () => {
    const selectedMarinade = ref<MarinadeId | null>(null);
    // User picks this week's marinade — drives shopping list injection (future)

    const selectedVegetable = ref<string>("broccoli");
    // This week's vegetable swap selection

    function setMarinade(id: MarinadeId) {
      selectedMarinade.value = id;
    }

    function setVegetable(name: string) {
      selectedVegetable.value = name;
    }

    return { selectedMarinade, selectedVegetable, setMarinade, setVegetable };
  },
  {
    persist: true,
  },
);
```

### 6.3 Settings Store

```ts
// src/stores/settingsStore.ts
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore(
  "settings",
  () => {
    const servings = ref<1 | 2 | 3>(2);
    // Future: scale shopping quantities and protein amounts

    const lastResetDate = ref<string | null>(null);
    // ISO date string of last weekly reset

    const hasSeenPKDWarning = ref<boolean>(false);
    // Suppress PKD banner after first acknowledgement if desired

    function acknowledgedPKDWarning() {
      hasSeenPKDWarning.value = true;
    }

    function setServings(n: 1 | 2 | 3) {
      servings.value = n;
    }

    return {
      servings,
      lastResetDate,
      hasSeenPKDWarning,
      acknowledgedPKDWarning,
      setServings,
    };
  },
  {
    persist: true,
  },
);
```

### 6.4 Fitness Store — Placeholder

```ts
// src/stores/fitnessStore.ts
// [PLACEHOLDER — See Section 10]

import { defineStore } from "pinia";
import { ref } from "vue";

export const useFitnessStore = defineStore(
  "fitness",
  () => {
    // Milestone completions
    const milestones = ref<Record<number, boolean>>({});

    // Workout log — to be fully typed in Section 10
    const workoutLog = ref<any[]>([]);

    // Current week (1–11)
    const currentWeek = ref<number>(1);

    function toggleMilestone(index: number) {
      milestones.value[index] = !milestones.value[index];
    }

    function setWeek(week: number) {
      currentWeek.value = week;
    }

    return { milestones, workoutLog, currentWeek, toggleMilestone, setWeek };
  },
  {
    persist: true,
  },
);
```

---

## 7. TypeScript Interfaces

```ts
// src/types/meal.types.ts

export type ProteinType = "fish" | "chicken-thigh" | "chicken-breast" | "steak";
export type GrainType = "brown-rice" | "quinoa" | "jasmine-rice";
export type LegumeType = "lentils" | "pinto-beans" | "black-beans";
export type BadgeVariant = "best" | "good" | "make";
export type CalloutVariant =
  | "green"
  | "orange"
  | "blue"
  | "gold"
  | "red"
  | "plum"
  | "cast";
export type StorageLocation = "pantry" | "fridge";
export type MarinadeId =
  | "soy-garlic-ginger"
  | "smoked-paprika-garlic"
  | "lime-cumin"
  | "balsamic-herb";
export type MarinadeTiming = "sunday" | "tuesday";

export interface Ingredient {
  amount: string; // e.g. '3 tbsp'
  name: string; // e.g. 'low-sodium soy sauce'
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
  elapsedMin: number;
  duration: string;
  title: string;
  body: string; // Can contain markdown-style bold
  dotColor: string; // CSS custom property e.g. 'var(--blue)'
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
```

```ts
// src/types/common.types.ts

export type NavSection = "meal" | "fitness";

export interface NavItem {
  label: string;
  path: string;
  section: NavSection;
}
```

---

## 8. Key Component Specifications

### 8.1 `AppNav.vue`

```
Props: none
Emits: none
Behavior:
  - Sticky top, z-index 100
  - Background: var(--ink)
  - Two nav groups: Meal Prep tabs + Fitness tab
  - Active tab: color var(--green-light equivalent), bottom border accent
  - Horizontal scroll on mobile, no scrollbar visible
  - Uses <RouterLink> for each item
  - Tab labels: uppercase, 0.72rem, font-weight 600, letter-spacing wide
```

### 8.2 `CalloutBox.vue`

```
Props:
  - variant: CalloutVariant (default: 'green')
Slots:
  - default (content)
Behavior:
  - Left border 3px, background tinted per variant
  - Uses CSS custom properties for color — variant maps to --{color} and --{color}-light
```

Example usage:

```vue
<CalloutBox variant="red">
  <strong>PKD Warning:</strong> Consult your nephrologist...
</CalloutBox>
```

### 8.3 `CheckItem.vue`

```
Props:
  - itemId: string
  - name: string
  - quantity: string
Emits:
  - toggle(itemId: string)
Behavior:
  - Full row is tappable (touch target >= 44px)
  - Reads checked state from shoppingStore
  - Checked: opacity 0.35, text struck through
  - Checkbox visual: 15x15px, border var(--rule), rounded-sm
  - When checked: background var(--green), shows ✓
  - Smooth opacity transition on check/uncheck
```

### 8.4 `MarinadeCard.vue`

```
Props:
  - marinade: Marinade
Behavior:
  - Header row: name (Cormorant Garamond) + timing badge (right-aligned)
  - Timing badge: t-sunday (green) or t-tuesday (gold)
  - Ingredient list with bullet · prefix in var(--green)
  - Italicized note at bottom, separated by top border rule
```

### 8.5 `SauceCard.vue`

```
Props:
  - sauce: Sauce
Behavior:
  - Name in Cormorant Garamond display font
  - "For:" subtitle in muted small caps
  - Ingredient list with quantity + name
  - Storage section at bottom with badge row (sb-pantry / sb-fridge / sb-batch)
  - Shelf life and application note below badges
```

### 8.6 `PrepTimeline.vue`

```
Props:
  - steps: PrepStep[]
Behavior:
  - Vertical line down left side (var(--rule), 2px)
  - Each step has a colored dot (20px circle, color from step.dotColor)
  - Elapsed time in small muted caps above title
  - Title in Cormorant Garamond
  - Body text with support for <strong> highlighting
  - Ordered list within body styled with 2.1 line-height
```

### 8.7 `MealPlanTable.vue`

```
Props:
  - days: MealPlanDay[]
Behavior:
  - Table: 4 columns (Day, Lunch, Dinner, Grain)
  - Each cell has a ProteinPill above the meal description
  - Wednesday dinner always renders a cast iron pill (🔥)
  - Thursday lunch note rendered as a small warning below the cell content
  - Hover state: background var(--bg)
  - Grain column hidden on mobile (< 640px)
```

---

## 9. App.vue Structure

```vue
<template>
  <AppMasthead />
  <AppNav />
  <AppPage>
    <RouterView v-slot="{ Component }">
      <Transition name="view">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </AppPage>
</template>
```

### `AppMasthead.vue` layout:

```
Background: var(--ink)
Bottom border: 3px solid var(--green)
Grid: 1fr auto (title left, meta right)
Padding: py-9 px-8

Title:
  - "Meal Prep" + line break + italic "for Two"
  - Font: Cormorant Garamond 700
  - Italic em: color #a8d4b8 (light green on dark)

Pills row below title:
  - "6 Lunches + 6 Dinners" / "Whole Foods" / "DASH Friendly" / "Sunday Prep + Wed Cast Iron"
  - Background rgba(255,255,255,0.1), border rgba(255,255,255,0.2)
  - Font: 0.68rem, 500 weight, uppercase, letter-spacing 0.1em

Meta (right column, hidden on mobile):
  - "Fish · Chicken · Steak"
  - "Brown Rice · Quinoa · Lentils"
  - "2 People · San Diego"
  - Color rgba(255,255,255,0.5)
```

---

## 10. Fitness Plan Module — PLACEHOLDER

> **⚠️ This section is reserved for fitness plan technical requirements.**
>
> The fitness module shares the same Vue app, design system, router, and Pinia store layer as the Meal Prep module. It lives under the `/fitness` route prefix.
>
> **Known store integration with Meal Prep module:**
>
> - `fitnessStore.currentWeek` — referenced in meal plan to surface post/pre-workout meal guidance
> - `fitnessStore.milestones` — persistent checkbox state, same pattern as shopping store
> - `fitnessStore.workoutLog` — dated entries used to flag same-day meal container suggestions
> - `settingsStore.servings` — shared across both modules
>
> **Expected routes under `/fitness`:**
>
> ```
> /fitness/overview
> /fitness/schedule
> /fitness/exercises
> /fitness/milestones
> ```
>
> **Expected components under `src/components/fitness/`:**
>
> ```
> PhaseCard.vue            — Phase 1/2/3 summary card
> WeekCard.vue             — Collapsible weekly schedule card
> DayCell.vue              — Single day in the week grid
> ExerciseRow.vue          — Expandable exercise with form tips
> MilestoneRow.vue         — Checkable milestone with week label
> WorkoutBadge.vue         — Cardio / Strength / Combo / Rest pill
> ```
>
> **Content defined in product requirements document Section 9 — insert technical detail here when ready.**

---

## 11. Static Hosting

The app requires no server. Build output is a static `dist/` folder deployable to:

| Host         | Command                                                         | Notes                                |
| ------------ | --------------------------------------------------------------- | ------------------------------------ |
| GitHub Pages | `npm run build` → push `dist/` to `gh-pages` branch             | Use `vite-plugin-gh-pages` or manual |
| Netlify      | Connect repo, build command `npm run build`, publish dir `dist` | Automatic deploys on push            |
| Local        | `npm run build` → open `dist/index.html`                        | Works directly due to hash routing   |

### `vite.config.ts`

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "./", // Relative paths — required for local file and GitHub Pages subfolder hosting
});
```

---

## 12. Development Checklist

### Phase 1 — Foundation

- [ ] Scaffold Vue 3 + TypeScript + Vite project
- [ ] Install and configure Pinia + pinia-plugin-persistedstate
- [ ] Install Tailwind CSS, configure `tailwind.config.js`
- [ ] Add Google Fonts to `index.html`
- [ ] Define all CSS custom properties in `main.css`
- [ ] Define all TypeScript interfaces in `src/types/`
- [ ] Populate all data files in `src/data/`
- [ ] Configure Vue Router with all meal routes
- [ ] Build `AppMasthead`, `AppNav`, `AppPage` layout components
- [ ] Build all `ui/` shared components (CalloutBox, SectionLabel, badges, CheckItem)

### Phase 2 — Meal Prep Views

- [ ] ProteinsGrainsView — protein cards, grain table, veg rotation grid
- [ ] ShoppingListView — category groups, check/uncheck, weekly reset button
- [ ] PrepDayView — timeline, emergency meals panel
- [ ] MealPlanView — weekly table with protein pills and notes
- [ ] CastIronView — Sunday setup, Wednesday steps, marinade cards
- [ ] SaucesView — three sections, sauce cards with full ingredient lists and storage badges
- [ ] NutrientsView — PKD callout, DASH note, nutrient status table, fitness connection callouts
- [ ] StorageView — fridge life grid, reheating guide

### Phase 3 — Fitness Module

- [ ] `[PLACEHOLDER]` — implement after fitness requirements are finalized in Section 10

### Phase 4 — Polish

- [ ] Responsive audit: mobile 375px, tablet 768px, desktop 1280px
- [ ] Transition animations on route change
- [ ] Accessibility audit: keyboard nav, ARIA labels on checkboxes, contrast check
- [ ] localStorage persistence smoke test: check items, reload, verify state
- [ ] Weekly reset flow: uncheck all shopping items, update week label

---

_End of technical requirements. Fitness module technical detail to be added to Section 10._
