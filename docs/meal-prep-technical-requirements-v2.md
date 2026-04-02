# Meal Prep & Fitness App — Technical Requirements v2.0

> **Version:** 2.0  
> **Stack:** Vue 3 + Pinia + Vue Router + TypeScript  
> **Persistence:** Pinia + pinia-plugin-persistedstate (localStorage)  
> **Styling:** Tailwind CSS v3 + CSS custom properties  
> **Last Updated:** April 2026  
> **Focus:** Mobile-first UX, Performance, Accessibility, Modern Standards

---

## 1. Updated Tech Stack & Architecture

| Layer            | Choice                                  | Notes                                                               |
| ---------------- | --------------------------------------- | ------------------------------------------------------------------- |
| Framework        | Vue 3 (Composition API)                 | Use `<script setup>` syntax throughout                              |
| State Management | Pinia + Normalization                   | Add store normalization for large datasets                          |
| Persistence      | pinia-plugin-persistedstate + encryption| Encrypt sensitive data, add validation                              |
| Routing          | Vue Router 4 + lazy loading             | Route-level code splitting, prefetching                            |
| Styling          | Tailwind CSS v3 + Design System         | Standardized spacing scale, component library                       |
| Build Tool       | Vite + PWA                              | Add PWA plugin, service worker, manifest                           |
| Language         | TypeScript (strict mode)                | Enable strict mode, comprehensive type coverage                    |
| Icons            | Lucide Vue Next                         | Consistent, tree-shakable icon set                                  |
| Testing          | Vitest + Playwright + Cypress           | Unit, E2E, and visual regression testing                           |
| Internationalization | Vue I18n v9                        | Multi-language support from day one                                |
| Package Manager  | pnpm                                     | Faster installs, better dependency management                      |

---

## 2. Enhanced Project Setup

```bash
# Scaffold with enhanced features
npm create vue@latest meal-prep-app
# Select: TypeScript ✓, Vue Router ✓, Pinia ✓, Vitest ✓, E2E Testing ✓, ESLint ✓, Prettier ✓

cd meal-prep-app
pnpm install

# Enhanced dependencies
pnpm add pinia-plugin-persistedstate lucide-vue-next vue-i18n@9
pnpm add @vueuse/core @vueuse/motion
pnpm add -D tailwindcss postcss autoprefixer
pnpm add -D vitest @playwright/test @vitejs/plugin-pwa
pnpm add -D storybook @storybook/vue3 @storybook/addon-essentials
pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser

# Enhanced Tailwind config
npx tailwindcss init -p
```

### Enhanced `vite.config.ts`

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "Meal Fit Prep",
        short_name: "MealFit",
        description: "Smart meal planning and prep system",
        theme_color: "#3b6e4c",
        background_color: "#f5f0e8",
        display: "standalone",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router", "pinia"],
          ui: ["lucide-vue-next"],
          utils: ["@vueuse/core"],
        },
      },
    },
  },
  base: "./",
});
```

---

## 3. Enhanced Design System

### 3.1 Standardized Spacing Scale

```css
/* src/assets/design-tokens.css */
@layer base {
  :root {
    /* Standardized spacing scale */
    --space-0: 0;
    --space-1: 4px;    /* xs */
    --space-2: 8px;    /* sm */
    --space-3: 12px;   /* md */
    --space-4: 16px;   /* lg */
    --space-5: 20px;   /* xl */
    --space-6: 24px;   /* 2xl */
    --space-8: 32px;   /* 3xl */
    --space-10: 40px;  /* 4xl */
    --space-12: 48px;  /* 5xl */
    --space-16: 64px;  /* 6xl */
    --space-20: 80px;  /* 7xl */
    --space-24: 96px;  /* 8xl */

    /* Refined typography scale */
    --text-xs: 0.75rem;    /* 12px */
    --text-sm: 0.875rem;   /* 14px */
    --text-base: 1rem;     /* 16px */
    --text-lg: 1.125rem;   /* 18px */
    --text-xl: 1.25rem;    /* 20px */
    --text-2xl: 1.5rem;    /* 24px */
    --text-3xl: 1.875rem;  /* 30px */
    --text-4xl: 2.25rem;   /* 36px */
    --text-5xl: 3rem;      /* 48px */

    /* Enhanced color system with accessibility */
    --bg: #f5f0e8;
    --paper: #fffdf7;
    --ink: #2a2318;
    --ink-light: #6b5d4b;  /* Improved contrast */
    --muted: #8b7d6b;
    --rule: #e0d5c7;

    /* Semantic colors with proper contrast */
    --success: #059669;
    --success-light: #d1fae5;
    --warning: #d97706;
    --warning-light: #fef3c7;
    --error: #dc2626;
    --error-light: #fee2e2;
    --info: #2563eb;
    --info-light: #dbeafe;

    /* Touch target sizes */
    --touch-target: 44px;
    --touch-target-small: 40px;

    /* Z-index scale */
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal-backdrop: 1040;
    --z-modal: 1050;
    --z-popover: 1060;
    --z-tooltip: 1070;
    --z-toast: 1080;
  }
}
```

### 3.2 Enhanced Component Library

```css
/* Standardized button system */
@layer components {
  .btn {
    @apply inline-flex items-center justify-center;
    @apply font-medium text-sm;
    @apply transition-all duration-200;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
    min-height: var(--touch-target);
    min-width: var(--touch-target);
    padding: var(--space-2) var(--space-4);
    border-radius: 8px;
  }

  .btn-primary {
    @apply bg-green-600 text-white hover:bg-green-700;
    @apply focus:ring-green-500;
  }

  .btn-secondary {
    @apply bg-gray-100 text-gray-900 hover:bg-gray-200;
    @apply focus:ring-gray-500;
  }

  .btn-ghost {
    @apply text-gray-600 hover:text-gray-900 hover:bg-gray-100;
    @apply focus:ring-gray-500;
  }

  /* Enhanced card system */
  .card {
    @apply bg-white border border-gray-200 rounded-lg;
    @apply shadow-sm hover:shadow-md;
    @apply transition-shadow duration-200;
    padding: var(--space-5);
  }

  .card-interactive {
    @apply cursor-pointer hover:shadow-lg hover:border-gray-300;
    @apply active:scale-[0.98] active:shadow-sm;
  }

  /* Form controls */
  .form-control {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md;
    @apply focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent;
    @apply transition-colors duration-200;
  }

  .checkbox {
    @apply w-5 h-5 text-green-600 border-gray-300 rounded;
    @apply focus:ring-green-500 focus:ring-2;
    @apply transition-colors duration-200;
  }
}
```

---

## 4. Enhanced Project Structure

```
src/
├── assets/
│   ├── main.css                  # Enhanced design tokens
│   ├── design-tokens.css         # CSS custom properties
│   └── images/
│       ├── icons/               # Optimized icon set
│       └── photos/              # Meal photos with lazy loading
│
├── components/
│   ├── layout/
│   │   ├── AppMasthead.vue       # Enhanced with mobile-first design
│   │   ├── AppNav.vue            # Bottom navigation for mobile
│   │   ├── AppPage.vue           # Responsive layout wrapper
│   │   ├── MobileNav.vue         # Mobile-specific navigation
│   │   └── OnboardingTour.vue    # Interactive onboarding
│   │
│   ├── ui/
│   │   ├── Button.vue            # Standardized button component
│   │   ├── Card.vue              # Enhanced card with variants
│   │   ├── Modal.vue             # Accessible modal
│   │   ├── Tooltip.vue           # Accessible tooltip
│   │   ├── LoadingSpinner.vue    # Loading states
│   │   ├── ErrorBoundary.vue     # Error handling
│   │   ├── LazyImage.vue         # Optimized images
│   │   └── index.ts              # Component exports
│   │
│   ├── meal/
│   │   ├── ProteinCard.vue       # Enhanced with animations
│   │   ├── GrainsLegumesTable.vue # Responsive table
│   │   ├── VegetableGrid.vue     # Touch-optimized grid
│   │   ├── ShoppingCategory.vue  # Enhanced with swipe actions
│   │   ├── PrepTimeline.vue      # Interactive timeline
│   │   ├── CookingMode.vue       # Hands-free cooking mode
│   │   ├── MealPlanCalendar.vue  # Calendar integration
│   │   ├── NutritionTracker.vue  # Nutrition tracking
│   │   └── RecipeEditor.vue      # Custom recipe creation
│   │
│   ├── user/
│   │   ├── UserProfile.vue       # User preferences
│   │   ├── DietaryRestrictions.vue # Allergy/diet management
│   │   ├── ProgressDashboard.vue # Usage analytics
│   │   └── SettingsPanel.vue     # App settings
│   │
│   └── onboarding/
│       ├── WelcomeTour.vue       # First-time user experience
│       ├── FeatureHighlights.vue # Feature discovery
│       └── QuickStart.vue        # Quick setup flow
│
├── views/
│   ├── meal/
│   │   ├── OverviewView.vue       # Renamed from ProteinsGrainsView
│   │   ├── PlanView.vue          # Simplified meal planning
│   │   ├── ShopView.vue          # Enhanced shopping experience
│   │   ├── PrepView.vue          # Interactive prep mode
│   │   ├── CookView.vue          # Daily cooking guidance
│   │   ├── RecipesView.vue       # Recipe library
│   │   ├── NutritionView.vue     # Enhanced nutrition tracking
│   │   └── StorageView.vue       # Storage guide
│   │
│   ├── user/
│   │   ├── ProfileView.vue       # User profile management
│   │   ├── PreferencesView.vue   # Dietary restrictions
│   │   └── ProgressView.vue      # Analytics and insights
│   │
│   └── onboarding/
│       └── OnboardingView.vue    # First-time experience
│
├── stores/
│   ├── modules/
│   │   ├── userStore.ts          # User preferences and profile
│   │   ├── mealStore.ts          # Enhanced meal management
│   │   ├── shoppingStore.ts      # Smart shopping lists
│   │   ├── nutritionStore.ts     # Nutrition tracking
│   │   ├── progressStore.ts      # Usage analytics
│   │   └── onboardingStore.ts    # Onboarding state
│   │
│   ├── composables/
│   │   ├── useMealPlanning.ts    # Meal planning logic
│   │   ├── useNutrition.ts       # Nutrition calculations
│   │   ├── useShopping.ts        # Shopping list management
│   │   └── useProgress.ts        # Progress tracking
│   │
│   └── index.ts                  # Store composition
│
├── composables/
│   ├── useOnboarding.ts          # Onboarding logic
│   ├── useResponsive.ts          # Responsive utilities
│   ├── useAccessibility.ts       # Accessibility helpers
│   ├── useAnalytics.ts           # Usage tracking
│   └── useI18n.ts               # Internationalization
│
├── utils/
│   ├── performance.ts            # Performance monitoring
│   ├── accessibility.ts          # ARIA helpers
│   ├── validation.ts             # Form validation
│   ├── storage.ts                # Encrypted storage
│   └── constants.ts              # App constants
│
├── locales/
│   ├── en.json                   # English translations
│   ├── es.json                   # Spanish translations
│   ├── fr.json                   # French translations
│   └── de.json                   # German translations
│
├── types/
│   ├── user.types.ts             # User-related types
│   ├── meal.types.ts             # Enhanced meal types
│   ├── nutrition.types.ts        # Nutrition tracking types
│   ├── progress.types.ts         # Analytics types
│   └── common.types.ts           # Shared types
│
├── router/
│   ├── index.ts                  # Enhanced routing with lazy loading
│   ├── guards.ts                 # Navigation guards
│   └── middleware.ts             # Route middleware
│
├── tests/
│   ├── unit/                     # Vitest unit tests
│   ├── e2e/                      # Playwright E2E tests
│   ├── visual/                   # Visual regression tests
│   └── accessibility/            # Accessibility tests
│
└── stories/                      # Storybook stories
    ├── ui/
    ├── meal/
    └── user/
```

---

## 5. Enhanced Routing with Lazy Loading

```ts
// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/modules/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/plan",
    },
    {
      path: "/onboarding",
      name: "onboarding",
      component: () => import(
        /* webpackChunkName: "onboarding" */
        "@/views/onboarding/OnboardingView.vue"
      ),
      meta: { requiresAuth: false, hideNavigation: true },
    },
    {
      path: "/plan",
      name: "plan",
      component: () => import(
        /* webpackChunkName: "plan" */
        "@/views/meal/PlanView.vue"
      ),
      meta: { requiresAuth: false },
    },
    {
      path: "/shop",
      name: "shop",
      component: () => import(
        /* webpackChunkName: "shop" */
        "@/views/meal/ShopView.vue"
      ),
      meta: { requiresAuth: false },
    },
    {
      path: "/prep",
      name: "prep",
      component: () => import(
        /* webpackChunkName: "prep" */
        "@/views/meal/PrepView.vue"
      ),
      meta: { requiresAuth: false },
    },
    {
      path: "/cook",
      name: "cook",
      component: () => import(
        /* webpackChunkName: "cook" */
        "@/views/meal/CookView.vue"
      ),
      meta: { requiresAuth: false },
    },
    {
      path: "/recipes",
      name: "recipes",
      component: () => import(
        /* webpackChunkName: "recipes" */
        "@/views/meal/RecipesView.vue"
      ),
      meta: { requiresAuth: false },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import(
        /* webpackChunkName: "profile" */
        "@/views/user/ProfileView.vue"
      ),
      meta: { requiresAuth: true },
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import(
        /* webpackChunkName: "settings" */
        "@/views/user/SettingsView.vue"
      ),
      meta: { requiresAuth: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: "smooth" };
  },
});

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/onboarding");
  } else {
    next();
  }
});

export default router;
```

---

## 6. Enhanced State Management

### 6.1 Normalized Store Structure

```ts
// src/stores/modules/userStore.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { User, UserPreferences, DietaryRestrictions } from "@/types/user.types";

export const useUserStore = defineStore(
  "user",
  () => {
    // State
    const user = ref<User | null>(null);
    const preferences = ref<UserPreferences>({
      servings: 2,
      cuisinePreferences: [],
      skillLevel: "intermediate",
      timeConstraints: "moderate",
    });
    const dietaryRestrictions = ref<DietaryRestrictions>({
      allergies: [],
      diets: [],
      intolerances: [],
      dislikes: [],
    });
    const onboardingCompleted = ref(false);

    // Computed
    const isAuthenticated = computed(() => !!user.value);
    const hasDietaryRestrictions = computed(() => 
      dietaryRestrictions.value.allergies.length > 0 ||
      dietaryRestrictions.value.diets.length > 0 ||
      dietaryRestrictions.value.intolerances.length > 0
    );

    // Actions
    const setUser = (userData: User) => {
      user.value = userData;
    };

    const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
      preferences.value = { ...preferences.value, ...newPreferences };
    };

    const updateDietaryRestrictions = (restrictions: Partial<DietaryRestrictions>) => {
      dietaryRestrictions.value = { ...dietaryRestrictions.value, ...restrictions };
    };

    const completeOnboarding = () => {
      onboardingCompleted.value = true;
    };

    return {
      // State
      user,
      preferences,
      dietaryRestrictions,
      onboardingCompleted,
      
      // Computed
      isAuthenticated,
      hasDietaryRestrictions,
      
      // Actions
      setUser,
      updatePreferences,
      updateDietaryRestrictions,
      completeOnboarding,
    };
  },
  {
    persist: {
      key: "user-store",
      storage: localStorage,
      paths: ["preferences", "dietaryRestrictions", "onboardingCompleted"],
    },
  },
);
```

### 6.2 Enhanced Meal Store with Normalization

```ts
// src/stores/modules/mealStore.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "./userStore";
import type { MealPlan, Recipe, Ingredient } from "@/types/meal.types";

// Normalized data structure
interface MealStoreState {
  entities: {
    recipes: Record<string, Recipe>;
    ingredients: Record<string, Ingredient>;
    mealPlans: Record<string, MealPlan>;
  };
  currentPlan: string | null;
  favoritePlans: string[];
  customRecipes: string[];
}

export const useMealStore = defineStore(
  "meal",
  () => {
    // Normalized state
    const state = ref<MealStoreState>({
      entities: {
        recipes: {},
        ingredients: {},
        mealPlans: {},
      },
      currentPlan: null,
      favoritePlans: [],
      customRecipes: [],
    });

    const userStore = useUserStore();

    // Selectors
    const currentMealPlan = computed(() => 
      state.value.currentPlan ? state.value.entities.mealPlans[state.value.currentPlan] : null
    );

    const availableRecipes = computed(() => {
      const recipes = Object.values(state.value.entities.recipes);
      
      // Filter based on dietary restrictions
      if (userStore.hasDietaryRestrictions) {
        return recipes.filter(recipe => 
          isRecipeCompatible(recipe, userStore.dietaryRestrictions)
        );
      }
      
      return recipes;
    });

    const favoriteMealPlans = computed(() => 
      state.value.favoritePlans.map(id => state.value.entities.mealPlans[id])
    );

    // Actions
    const addRecipe = (recipe: Recipe) => {
      state.value.entities.recipes[recipe.id] = recipe;
    };

    const createMealPlan = (plan: MealPlan) => {
      state.value.entities.mealPlans[plan.id] = plan;
      state.value.currentPlan = plan.id;
    };

    const updateMealPlan = (planId: string, updates: Partial<MealPlan>) => {
      if (state.value.entities.mealPlans[planId]) {
        state.value.entities.mealPlans[planId] = {
          ...state.value.entities.mealPlans[planId],
          ...updates,
        };
      }
    };

    const addToFavorites = (planId: string) => {
      if (!state.value.favoritePlans.includes(planId)) {
        state.value.favoritePlans.push(planId);
      }
    };

    return {
      // State
      state,
      
      // Selectors
      currentMealPlan,
      availableRecipes,
      favoriteMealPlans,
      
      // Actions
      addRecipe,
      createMealPlan,
      updateMealPlan,
      addToFavorites,
    };
  },
  {
    persist: {
      key: "meal-store",
      storage: localStorage,
      paths: ["state.entities.customRecipes", "state.favoritePlans"],
    },
  },
);

// Helper function
function isRecipeCompatible(recipe: Recipe, restrictions: DietaryRestrictions): boolean {
  // Implementation for checking recipe compatibility
  return true;
}
```

---

## 7. Enhanced Component Specifications

### 7.1 Mobile-First Navigation

```vue
<!-- src/components/layout/AppNav.vue -->
<template>
  <nav class="app-nav">
    <!-- Desktop Navigation -->
    <div class="desktop-nav hidden lg:block">
      <div class="nav-tabs">
        <RouterLink
          v-for="item in primaryNav"
          :key="item.path"
          :to="item.path"
          class="nav-tab"
          active-class="nav-tab-active"
        >
          <Icon :name="item.icon" class="nav-icon" />
          {{ item.label }}
        </RouterLink>
      </div>
    </div>

    <!-- Mobile Bottom Navigation -->
    <div class="mobile-nav lg:hidden">
      <RouterLink
        v-for="item in mobileNav"
        :key="item.path"
        :to="item.path"
        class="mobile-nav-item"
        active-class="mobile-nav-item-active"
      >
        <Icon :name="item.icon" class="mobile-nav-icon" />
        <span class="mobile-nav-label">{{ item.label }}</span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/modules/userStore";
import { Icon } from "@/components/ui";

const route = useRoute();
const userStore = useUserStore();

const primaryNav = [
  { label: "Plan", path: "/plan", icon: "calendar" },
  { label: "Shop", path: "/shop", icon: "shopping-cart" },
  { label: "Prep", path: "/prep", icon: "clock" },
  { label: "Cook", path: "/cook", icon: "chef-hat" },
  { label: "Recipes", path: "/recipes", icon: "book" },
];

const mobileNav = [
  { label: "Plan", path: "/plan", icon: "calendar" },
  { label: "Shop", path: "/shop", icon: "shopping-cart" },
  { label: "Prep", path: "/prep", icon: "clock" },
  { label: "Cook", path: "/cook", icon: "chef-hat" },
];
</script>

<style scoped>
.app-nav {
  @apply bg-white border-t border-gray-200;
  @apply fixed bottom-0 left-0 right-0 z-50;
  @apply lg:relative lg:border-t-0 lg:border-b lg:border-gray-200;
}

.desktop-nav {
  @apply px-6 py-4;
}

.mobile-nav {
  @apply flex justify-around items-center;
  @apply px-2 py-2;
  @apply safe-area-inset-bottom;
}

.mobile-nav-item {
  @apply flex flex-col items-center justify-center;
  @apply p-2 rounded-lg transition-colors;
  @apply min-h-[var(--touch-target)] min-w-[var(--touch-target)];
}

.mobile-nav-item-active {
  @apply bg-green-50 text-green-600;
}

.mobile-nav-icon {
  @apply w-6 h-6 mb-1;
}

.mobile-nav-label {
  @apply text-xs font-medium;
}
</style>
```

### 7.2 Enhanced Onboarding Component

```vue
<!-- src/components/onboarding/WelcomeTour.vue -->
<template>
  <div class="onboarding-tour">
    <Transition name="tour-slide" mode="out-in">
      <div
        v-for="(step, index) in tourSteps"
        v-show="currentStep === index"
        :key="step.id"
        class="tour-step"
      >
        <div class="tour-content">
          <div class="tour-visual">
            <img
              :src="step.image"
              :alt="step.title"
              class="tour-image"
              loading="lazy"
            />
          </div>
          
          <div class="tour-text">
            <h2 class="tour-title">{{ step.title }}</h2>
            <p class="tour-description">{{ step.description }}</p>
            
            <div v-if="step.highlight" class="tour-highlight">
              <div class="highlight-icon">✨</div>
              <span>{{ step.highlight }}</span>
            </div>
          </div>
        </div>

        <div class="tour-actions">
          <div class="tour-progress">
            <div
              v-for="(_, i) in tourSteps"
              :key="i"
              class="progress-dot"
              :class="{ active: i <= currentStep }"
            />
          </div>

          <div class="tour-buttons">
            <Button
              v-if="currentStep > 0"
              variant="ghost"
              @click="previousStep"
            >
              Previous
            </Button>
            
            <Button
              v-if="currentStep < tourSteps.length - 1"
              @click="nextStep"
            >
              Next
            </Button>
            
            <Button
              v-else
              @click="completeTour"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/modules/userStore";
import { Button } from "@/components/ui";

const router = useRouter();
const userStore = useUserStore();

const currentStep = ref(0);

const tourSteps = [
  {
    id: "welcome",
    title: "Welcome to Meal Fit Prep",
    description: "Smart meal planning designed for busy people who want to eat healthy without the stress.",
    image: "/images/onboarding/welcome.svg",
    highlight: "Plan meals in 2 minutes, shop in 5 minutes",
  },
  {
    id: "plan",
    title: "Plan Your Week",
    description: "Our smart algorithm creates personalized meal plans based on your preferences and dietary needs.",
    image: "/images/onboarding/plan.svg",
    highlight: "AI-powered meal suggestions",
  },
  {
    id: "shop",
    title: "Smart Shopping Lists",
    description: "Automatically generated shopping lists with exact quantities. Check off what you already have.",
    image: "/images/onboarding/shop.svg",
    highlight: "Never overbuy ingredients again",
  },
  {
    id: "prep",
    title: "Sunday Prep Day",
    description: "Follow our step-by-step timeline to prep everything for the week in about 90 minutes.",
    image: "/images/onboarding/prep.svg",
    highlight: "Mostly hands-off cooking time",
  },
];

const nextStep = () => {
  if (currentStep.value < tourSteps.length - 1) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
};

const completeTour = () => {
  userStore.completeOnboarding();
  router.push("/plan");
};
</script>

<style scoped>
.onboarding-tour {
  @apply min-h-screen bg-gradient-to-br from-green-50 to-blue-50;
  @apply flex flex-col justify-center p-6;
}

.tour-step {
  @apply max-w-md mx-auto w-full;
}

.tour-content {
  @apply text-center mb-8;
}

.tour-visual {
  @apply mb-6;
}

.tour-image {
  @apply w-64 h-64 mx-auto object-contain;
}

.tour-title {
  @apply text-2xl font-bold text-gray-900 mb-4;
}

.tour-description {
  @apply text-lg text-gray-600 mb-6 leading-relaxed;
}

.tour-highlight {
  @apply inline-flex items-center gap-2;
  @apply bg-green-100 text-green-800 px-4 py-2 rounded-full;
  @apply text-sm font-medium;
}

.tour-actions {
  @apply space-y-4;
}

.tour-progress {
  @apply flex justify-center gap-2;
}

.progress-dot {
  @apply w-2 h-2 rounded-full bg-gray-300;
  @apply transition-colors duration-300;
}

.progress-dot.active {
  @apply bg-green-600;
}

.tour-buttons {
  @apply flex justify-between items-center;
}

.tour-slide-enter-active,
.tour-slide-leave-active {
  @apply transition-all duration-300 ease-in-out;
}

.tour-slide-enter-from {
  @apply opacity-0 translate-x-8;
}

.tour-slide-leave-to {
  @apply opacity-0 -translate-x-8;
}
</style>
```

---

## 8. Enhanced TypeScript Interfaces

### 8.1 User Management Types

```ts
// src/types/user.types.ts
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  lastLoginAt: Date;
}

export interface UserPreferences {
  servings: 1 | 2 | 3 | 4;
  cuisinePreferences: CuisineType[];
  skillLevel: "beginner" | "intermediate" | "advanced";
  timeConstraints: "minimal" | "moderate" | "flexible";
  budgetLevel: "economy" | "moderate" | "premium";
  favoriteRecipes: string[];
  avoidedIngredients: string[];
}

export interface DietaryRestrictions {
  allergies: AllergyType[];
  diets: DietType[];
  intolerances: IntoleranceType[];
  dislikes: string[];
  customRestrictions: string[];
}

export interface UserProfile {
  user: User;
  preferences: UserPreferences;
  dietaryRestrictions: DietaryRestrictions;
  onboardingCompleted: boolean;
  subscriptionTier: "free" | "premium" | "lifetime";
}

export type CuisineType = 
  | "italian" | "mexican" | "asian" | "mediterranean" 
  | "american" | "indian" | "thai" | "french";

export type AllergyType = 
  | "dairy" | "eggs" | "fish" | "shellfish" 
  | "tree-nuts" | "peanuts" | "wheat" | "soy";

export type DietType = 
  | "vegetarian" | "vegan" | "pescatarian" 
  | "keto" | "paleo" | "gluten-free" | "dairy-free";

export type IntoleranceType = 
  | "lactose" | "fructose" | "histamine" | "nightshades";
```

### 8.2 Enhanced Meal Types

```ts
// src/types/meal.types.ts
export interface Recipe {
  id: string;
  name: string;
  description: string;
  images: RecipeImage[];
  prepTime: number; // minutes
  cookTime: number; // minutes
  totalTime: number; // minutes
  difficulty: "easy" | "medium" | "hard";
  servings: number;
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
  nutrition: NutritionInfo;
  tags: RecipeTag[];
  dietaryInfo: DietaryInfo;
  storage: StorageInfo;
  source: RecipeSource;
  rating: number;
  reviewCount: number;
  isCustom: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipeImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  type: "hero" | "step" | "final";
}

export interface RecipeIngredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  notes?: string;
  substitutions?: string[];
}

export interface RecipeInstruction {
  step: number;
  title?: string;
  description: string;
  images?: string[];
  timer?: number;
  temperature?: number;
  equipment?: string[];
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  servings: number;
}

export interface DietaryInfo {
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isDairyFree: boolean;
  isKeto: boolean;
  isPaleo: boolean;
  allergens: AllergyType[];
}

export interface StorageInfo {
  fridgeLife: number; // days
  freezerLife: number; // days
  reheatingInstructions: string;
  storageNotes: string[];
}

export interface MealPlan {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  meals: PlannedMeal[];
  shoppingList: ShoppingList;
  prepSchedule: PrepSchedule;
  nutritionSummary: NutritionInfo;
  estimatedCost: number;
  tags: string[];
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlannedMeal {
  id: string;
  date: Date;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  recipe: Recipe;
  servings: number;
  notes?: string;
  isPrepped: boolean;
  isEaten: boolean;
}

export interface ShoppingList {
  id: string;
  items: ShoppingItem[];
  categories: ShoppingCategory[];
  totalCost: number;
  checkedItems: Record<string, boolean>;
  batchedSauces: Record<string, boolean>;
}

export interface ShoppingItem {
  id: string;
  ingredient: RecipeIngredient;
  category: string;
  quantity: number;
  unit: string;
  checked: boolean;
  cost?: number;
  notes?: string;
}
```

---

## 9. Enhanced Performance & Accessibility

### 9.1 Performance Monitoring

```ts
// src/utils/performance.ts
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTiming(name: string): void {
    this.metrics.set(name, performance.now());
  }

  endTiming(name: string): number {
    const startTime = this.metrics.get(name);
    if (!startTime) {
      console.warn(`No start time found for ${name}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.metrics.delete(name);
    
    // Log performance warnings
    if (duration > 100) {
      console.warn(`Slow operation: ${name} took ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  measureRender(name: string, fn: () => void): void {
    this.startTiming(name);
    fn();
    this.endTiming(name);
  }

  // Web Vitals monitoring
  observeWebVitals(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          switch (entry.entryType) {
            case 'navigation':
              this.handleNavigationEntry(entry as PerformanceNavigationTiming);
              break;
            case 'paint':
              this.handlePaintEntry(entry as PerformancePaintTiming);
              break;
            case 'largest-contentful-paint':
              this.handleLCPEntry(entry as PerformanceEntry);
              break;
          }
        }
      });

      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
    }
  }

  private handleNavigationEntry(entry: PerformanceNavigationTiming): void {
    console.log(`Navigation load time: ${entry.loadEventEnd - entry.loadEventStart}ms`);
  }

  private handlePaintEntry(entry: PerformancePaintTiming): void {
    console.log(`${entry.name}: ${entry.startTime}ms`);
  }

  private handleLCPEntry(entry: PerformanceEntry): void {
    console.log(`Largest Contentful Paint: ${entry.startTime}ms`);
  }
}

// Composable for performance monitoring
export function usePerformance() {
  const monitor = PerformanceMonitor.getInstance();

  const measureComponent = (name: string) => {
    onMounted(() => monitor.startTiming(`component-${name}`));
    onUnmounted(() => monitor.endTiming(`component-${name}`));
  };

  return {
    monitor,
    measureComponent,
  };
}
```

### 9.2 Accessibility Utilities

```ts
// src/utils/accessibility.ts
export class AccessibilityManager {
  static announceToScreenReader(message: string): void {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;

    document.body.appendChild(announcement);
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  static trapFocus(element: HTMLElement): () => void {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener("keydown", handleTabKey);
    firstElement?.focus();

    return () => {
      element.removeEventListener("keydown", handleTabKey);
    };
  }

  static checkColorContrast(
    foreground: string,
    background: string
  ): { ratio: number; passes: boolean } {
    // Simplified contrast calculation
    const getLuminance = (color: string): number => {
      const rgb = color.match(/\d+/g);
      if (!rgb) return 0;

      const [r, g, b] = rgb.map(Number);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    };

    const fgLuminance = getLuminance(foreground);
    const bgLuminance = getLuminance(background);

    const ratio = (Math.max(fgLuminance, bgLuminance) + 0.05) /
                  (Math.min(fgLuminance, bgLuminance) + 0.05);

    return {
      ratio: Math.round(ratio * 100) / 100,
      passes: ratio >= 4.5, // WCAG AA standard
    };
  }

  static generateUniqueId(prefix = "id"): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Composable for accessibility
export function useAccessibility() {
  const announce = (message: string) => {
    AccessibilityManager.announceToScreenReader(message);
  };

  const generateId = (prefix?: string) => {
    return AccessibilityManager.generateUniqueId(prefix);
  };

  return {
    announce,
    generateId,
  };
}
```

---

## 10. Enhanced Testing Strategy

### 10.1 Unit Testing Setup

```ts
// tests/unit/components/Button.test.ts
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { Button } from "@/components/ui";

describe("Button", () => {
  it("renders with default props", () => {
    const wrapper = mount(Button, {
      slots: {
        default: "Click me",
      },
    });

    expect(wrapper.text()).toBe("Click me");
    expect(wrapper.classes()).toContain("btn");
  });

  it("applies variant classes correctly", () => {
    const wrapper = mount(Button, {
      props: {
        variant: "primary",
      },
    });

    expect(wrapper.classes()).toContain("btn-primary");
  });

  it("handles click events", async () => {
    const wrapper = mount(Button);
    
    await wrapper.trigger("click");
    
    expect(wrapper.emitted()).toHaveProperty("click");
  });

  it("is accessible", () => {
    const wrapper = mount(Button, {
      props: {
        ariaLabel: "Submit form",
      },
    });

    const button = wrapper.find("button");
    expect(button.attributes("aria-label")).toBe("Submit form");
  });

  it("meets touch target requirements", () => {
    const wrapper = mount(Button);
    const button = wrapper.find("button");

    const styles = window.getComputedStyle(button.element);
    const minHeight = parseInt(styles.minHeight);
    const minWidth = parseInt(styles.minWidth);

    expect(minHeight).toBeGreaterThanOrEqual(44);
    expect(minWidth).toBeGreaterThanOrEqual(44);
  });
});
```

### 10.2 E2E Testing Setup

```ts
// tests/e2e/meal-planning.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Meal Planning Flow", () => {
  test("user can create a meal plan", async ({ page }) => {
    await page.goto("/plan");

    // Check if user is onboarding
    if (await page.locator('[data-testid="onboarding"]').isVisible()) {
      await page.click('[data-testid="skip-onboarding"]');
    }

    // Generate meal plan
    await page.click('[data-testid="generate-plan"]');
    await page.waitForSelector('[data-testid="meal-plan-generated"]');

    // Verify meal plan is displayed
    await expect(page.locator('[data-testid="meal-plan"]')).toBeVisible();

    // Customize a meal
    await page.click('[data-testid="swap-monday-lunch"]');
    await page.click('[data-testid="select-recipe-salmon"]');

    // Confirm plan
    await page.click('[data-testid="confirm-plan"]');

    // Navigate to shopping list
    await page.click('[data-testid="nav-shop"]');
    
    // Verify shopping list is populated
    await expect(page.locator('[data-testid="shopping-list"]')).toBeVisible();
    await expect(page.locator('[data-testid="shopping-item"]')).toHaveCount.greaterThan(0);
  });

  test("meal planning respects dietary restrictions", async ({ page }) => {
    await page.goto("/profile");
    
    // Set dietary restrictions
    await page.click('[data-testid="dietary-restrictions"]');
    await page.check('[data-testid="restriction-vegetarian"]');
    await page.click('[data-testid="save-preferences"]');

    // Go to meal planning
    await page.goto("/plan");
    await page.click('[data-testid="generate-plan"]');

    // Verify all meals are vegetarian
    const meals = await page.locator('[data-testid="meal-item"]');
    const count = await meals.count();
    
    for (let i = 0; i < count; i++) {
      const meal = meals.nth(i);
      await expect(meal).toContainText("vegetarian");
    }
  });

  test("mobile navigation works correctly", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/plan");

    // Verify bottom navigation is visible
    await expect(page.locator('[data-testid="mobile-nav"]')).toBeVisible();

    // Test navigation items
    await page.click('[data-testid="nav-shop"]');
    await expect(page).toHaveURL("/shop");

    await page.click('[data-testid="nav-prep"]');
    await expect(page).toHaveURL("/prep");
  });
});
```

---

## 11. Enhanced Development Workflow

### 11.1 ESLint Configuration

```json
// .eslintrc.json
{
  "extends": [
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    "plugin:vue/vue3-recommended",
    "plugin:accessibility/recommended"
  ],
  "plugins": ["accessibility"],
  "rules": {
    "vue/multi-word-component-names": "off",
    "accessibility/click-events-have-key-events": "warn",
    "accessibility/alt-text": "error",
    "accessibility/aria-props": "error",
    "accessibility/aria-role": "error",
    "accessibility/interactive-supports-focus": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn"
  },
  "overrides": [
    {
      "files": ["*.vue"],
      "rules": {
        "accessibility/no-autofocus": "warn",
        "accessibility/no-interactive-element-to-noninteractive-role": "error"
      }
    }
  ]
}
```

### 11.2 Prettier Configuration

```json
// .prettierrc.json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "endOfLine": "lf",
  "arrowParens": "avoid",
  "vueIndentScriptAndStyle": false
}
```

### 11.3 GitHub Actions CI/CD

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20"
          cache: "pnpm"
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Type check
        run: pnpm type-check
        
      - name: Lint
        run: pnpm lint
        
      - name: Unit tests
        run: pnpm test:unit
        
      - name: E2E tests
        run: pnpm test:e2e
        
      - name: Accessibility tests
        run: pnpm test:accessibility
        
      - name: Visual regression tests
        run: pnpm test:visual

  build:
    needs: test
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20"
          cache: "pnpm"
          
      - name: Install dependencies
        run: pnpm install
        
      - name: Build
        run: pnpm build
        
      - name: Bundle analysis
        run: pnpm bundle-analyze
        
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/

  deploy:
    if: github.ref == 'refs/heads/main'
    needs: [test, build]
    runs-on: ubuntu-latest
    
    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
          
      - name: Deploy to production
        run: |
          # Deployment logic here
          echo "Deploying to production..."
```

---

## 12. Enhanced Development Checklist

### Phase 1: Foundation & Mobile UX (Weeks 1-4)

#### Week 1: Setup & Infrastructure
- [ ] Scaffold Vue 3 project with enhanced dependencies
- [ ] Configure PWA plugin and service worker
- [ ] Set up internationalization (Vue I18n)
- [ ] Configure enhanced ESLint + Prettier + accessibility rules
- [ ] Set up testing infrastructure (Vitest + Playwright)
- [ ] Configure CI/CD pipeline
- [ ] Implement design system with standardized tokens
- [ ] Create component library foundation

#### Week 2: Mobile Navigation & Layout
- [ ] Implement mobile-first bottom navigation
- [ ] Create responsive layout components
- [ ] Add touch-optimized interactions
- [ ] Implement safe area handling for mobile devices
- [ ] Add swipe gestures for navigation
- [ ] Create mobile-specific card layouts
- [ ] Implement collapsible sections for dense content

#### Week 3: Onboarding & User Management
- [ ] Build interactive onboarding tour
- [ ] Create user profile system
- [ ] Implement dietary restrictions management
- [ ] Add user preferences system
- [ ] Create settings panel
- [ ] Implement user data persistence with encryption

#### Week 4: Accessibility & Performance
- [ ] Conduct accessibility audit (WCAG 2.1 AA)
- [ ] Implement ARIA labels and keyboard navigation
- [ ] Add focus management and screen reader support
- [ ] Implement performance monitoring
- [ ] Add lazy loading for images and components
- [ ] Optimize bundle size with code splitting

### Phase 2: Core Features Enhancement (Weeks 5-8)

#### Week 5: Enhanced Meal Planning
- [ ] Implement AI-powered meal recommendations
- [ ] Add meal customization options
- [ ] Create calendar integration
- [ ] Implement meal scheduling
- [ ] Add serving size adjustments
- [ ] Create recipe favoriting system

#### Week 6: Smart Shopping Lists
- [ ] Enhance shopping list with smart categorization
- [ ] Add ingredient substitution suggestions
- [ ] Implement cost tracking
- [ ] Add barcode scanning (mobile)
- [ ] Create pantry management system
- [ ] Implement swipe actions for item management

#### Week 7: Interactive Cooking Mode
- [ ] Build hands-free cooking mode
- [ ] Add voice commands for cooking
- [ ] Implement step-by-step cooking guidance
- [ ] Add timer integration
- [ ] Create smart home appliance integration
- [ ] Implement cooking progress tracking

#### Week 8: Nutrition & Analytics
- [ ] Build comprehensive nutrition tracking
- [ ] Add macro and micronutrient analysis
- [ ] Implement nutrition goal setting
- [ ] Create progress dashboard
- [ ] Add usage analytics and insights
- [ ] Implement meal rating system

### Phase 3: Advanced Features (Weeks 9-12)

#### Week 9: Custom Recipes & Community
- [ ] Build custom recipe creation tools
- [ ] Implement recipe sharing system
- [ ] Add community features
- [ ] Create recipe rating and review system
- [ ] Implement recipe import from URLs
- [ ] Add meal photo sharing

#### Week 10: Mobile Apps & Native Features
- [ ] Develop React Native mobile apps
- [ ] Implement push notifications
- [ ] Add offline support
- [ ] Create background sync
- [ ] Implement native camera integration
- [ ] Add widget support (iOS/Android)

#### Week 11: AI & Machine Learning
- [ ] Implement ML-based preference learning
- [ ] Add predictive meal suggestions
- [ ] Create smart grocery recommendations
- [ ] Implement cooking time optimization
- [ ] Add dietary requirement AI analysis
- [ ] Create personalized nutrition insights

#### Week 12: Polish & Launch Preparation
- [ ] Comprehensive testing (unit, E2E, visual, accessibility)
- [ ] Performance optimization and monitoring
- [ ] Security audit and hardening
- [ ] Documentation completion
- [ ] Launch preparation and marketing materials
- [ ] Beta testing and feedback incorporation

---

## 13. Success Metrics & Quality Gates

### 13.1 Performance Metrics
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s
- **Cumulative Layout Shift:** < 0.1
- **Bundle Size:** < 500KB (gzipped)

### 13.2 Accessibility Metrics
- **WCAG 2.1 AA Compliance:** 100%
- **Keyboard Navigation:** Full coverage
- **Screen Reader Support:** Full coverage
- **Color Contrast:** All combinations pass
- **Touch Targets:** Minimum 44px

### 13.3 User Experience Metrics
- **Task Completion Rate:** > 85%
- **User Satisfaction:** > 4.5/5
- **Mobile Usability Score:** > 90/100
- **Error Rate:** < 1%
- **Support Tickets:** < 5% of active users

### 13.4 Code Quality Metrics
- **TypeScript Coverage:** > 95%
- **Test Coverage:** > 90%
- **ESLint Errors:** 0
- **Accessibility Violations:** 0
- **Bundle Analysis:** No duplicate dependencies

---

## 14. Migration Strategy

### 14.1 Phase 1 Migration (Current → v2.0)

```typescript
// Migration script for existing users
export async function migrateUserDataV1toV2() {
  const oldData = localStorage.getItem("meal-store");
  if (!oldData) return;

  try {
    const parsed = JSON.parse(oldData);
    
    // Migrate to new normalized structure
    const newData = {
      entities: {
        recipes: normalizeRecipes(parsed.recipes || {}),
        ingredients: normalizeIngredients(parsed.ingredients || {}),
        mealPlans: normalizeMealPlans(parsed.mealPlans || {}),
      },
      currentPlan: parsed.currentPlan || null,
      favoritePlans: parsed.favoritePlans || [],
      customRecipes: parsed.customRecipes || [],
    };

    // Store in new format
    localStorage.setItem("meal-store-v2", JSON.stringify(newData));
    
    // Remove old data
    localStorage.removeItem("meal-store");
    
    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    // Handle migration failure
  }
}
```

### 14.2 Data Validation & Cleanup

```typescript
// Store hydration validation
export function validateStoreData(data: any): boolean {
  if (!data || typeof data !== "object") return false;
  
  // Validate structure
  if (!data.entities || typeof data.entities !== "object") return false;
  
  // Validate required entities
  const requiredEntities = ["recipes", "ingredients", "mealPlans"];
  for (const entity of requiredEntities) {
    if (!data.entities[entity] || typeof data.entities[entity] !== "object") {
      return false;
    }
  }
  
  return true;
}
```

---

## 15. Conclusion

This enhanced technical requirements document addresses all critical improvements identified in the UI/UX review while maintaining the solid foundation of the original application. The focus on mobile-first design, accessibility, performance, and modern development practices will ensure the application is competitive in today's market.

Key improvements include:
- **Mobile-first navigation** with bottom navigation bar
- **Comprehensive onboarding** for new users
- **Enhanced accessibility** meeting WCAG 2.1 AA standards
- **Performance optimizations** with lazy loading and code splitting
- **Modern development workflow** with comprehensive testing
- **Scalable architecture** supporting future growth
- **Internationalization** support for global markets
- **Enhanced user management** with dietary restrictions and preferences

The implementation roadmap provides a clear path from the current state to a market-ready application that can compete with leading meal prep platforms.

---

*End of enhanced technical requirements v2.0. This document should guide all development efforts for the next 12 weeks.*
