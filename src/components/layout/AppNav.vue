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
      <div class="nav-section">
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
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { NavItem } from '@/types/common.types'

const mealNavItems: NavItem[] = [
  { label: 'Proteins & Grains', path: '/meal/proteins', section: 'meal' },
  { label: 'Shopping List', path: '/meal/shopping', section: 'meal' },
  { label: 'Prep Day', path: '/meal/prep', section: 'meal' },
  { label: 'Meal Plan', path: '/meal/plan', section: 'meal' },
  { label: 'Cast Iron', path: '/meal/cast-iron', section: 'meal' },
  { label: 'Sauces', path: '/meal/sauces', section: 'meal' },
  { label: 'Nutrients', path: '/meal/nutrients', section: 'meal' },
  { label: 'Storage', path: '/meal/storage', section: 'meal' }
]

const fitnessNavItems: NavItem[] = [
  { label: 'Overview', path: '/fitness', section: 'fitness' }
]
</script>

<style scoped>
.app-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--ink);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.app-nav-inner {
  max-width: 980px;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.app-nav-inner::-webkit-scrollbar {
  display: none;
}

.nav-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  flex-shrink: 0;
}

.nav-section-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--muted);
  padding: 0 1rem;
  white-space: nowrap;
}

.nav-tabs {
  display: flex;
  gap: 0.25rem;
}

.nav-tab {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--bg);
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
  white-space: nowrap;
  opacity: 0.7;
}

.nav-tab:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.05);
}

.nav-tab-active {
  opacity: 1;
  background: var(--green);
  font-weight: 500;
}

@media (max-width: 768px) {
  .app-nav-inner {
    gap: 1rem;
    padding: 0 0.5rem;
  }

  .nav-section-label {
    padding: 0 0.5rem;
    font-size: 0.65rem;
  }

  .nav-tab {
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>
