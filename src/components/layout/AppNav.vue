<template>
  <nav class="app-nav">
    <div class="app-nav-inner">
      <div class="nav-section">
        <span class="nav-section-label">Meal Prep</span>
        <div class="nav-tabs">
          <RouterLink
            v-for="item in mealNavItems"
            :key="item.path"
            :to="item.path"
            class="nav-tab"
            active-class="nav-tab-active"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
      <!-- <div class="nav-section">
        <span class="nav-section-label">Fitness</span>
        <div class="nav-tabs">
          <RouterLink
            v-for="item in fitnessNavItems"
            :key="item.path"
            :to="item.path"
            class="nav-tab"
            active-class="nav-tab-active"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </div> -->
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { NavItem } from "@/types/common.types";

const mealNavItems: NavItem[] = [
  { label: "Meal Plan", path: "/meal/plan", section: "meal" },
  { label: "This Week's Fridge", path: "/meal/fridge", section: "meal" },
  { label: "Proteins & Grains", path: "/meal/proteins", section: "meal" },
  { label: "Shopping List", path: "/meal/shopping", section: "meal" },
  { label: "Prep Day", path: "/meal/prep", section: "meal" },
  { label: "Cast Iron", path: "/meal/cast-iron", section: "meal" },
  { label: "Sauces", path: "/meal/sauces", section: "meal" },
  { label: "Breakfasts", path: "/meal/breakfasts", section: "meal" },
  { label: "Nutrients", path: "/meal/nutrients", section: "meal" },
  { label: "Storage", path: "/meal/storage", section: "meal" },
];

const fitnessNavItems: NavItem[] = [{ label: "Fitness", path: "/fitness", section: "fitness" }];
</script>

<style scoped>
.app-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--ink);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  scrollbar-width: none;
}

.app-nav::-webkit-scrollbar {
  display: none;
}

.app-nav-inner {
  max-width: 980px;
  margin: 0 auto;
  display: flex;
  padding: 0 16px;
  min-width: max-content;
}

.nav-section {
  display: flex;
  align-items: center;
  gap: 0;
  flex-shrink: 0;
}

.nav-section-label {
  display: none;
}

.nav-tabs {
  display: flex;
}

.nav-tab {
  padding: 12px 16px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: none;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.15s;
  white-space: nowrap;
}

.nav-tab:hover {
  color: rgba(255, 255, 255, 0.8);
}

.nav-tab-active {
  color: #a8d4b8;
  border-bottom-color: #a8d4b8;
}

@media (max-width: 768px) {
  .app-nav-inner {
    padding: 0 12px;
  }

  .nav-tab {
    padding: 10px 12px;
    font-size: 0.68rem;
  }
}
</style>
