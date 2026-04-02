<script setup lang="ts">
  import { ref } from 'vue'
  import { RouterView } from 'vue-router'
  import { onMounted } from 'vue'
  import AppMasthead from './components/layout/AppMasthead.vue'
  import AppNav from './components/layout/AppNav.vue'
  import BottomNavigation from './components/layout/BottomNavigation.vue'
  import AppPage from './components/layout/AppPage.vue'
  import { useTimerStore } from './stores/timerStore'
  import type { NavItem } from '@/types/common.types'

  const timerStore = useTimerStore()

  const mealNavItems: NavItem[] = [
    { label: 'Ingredients Overview', path: '/overview', section: 'meal' },
    { label: 'Meal Plan', path: '/meal/fridge', section: 'meal' },
    { label: 'Shopping List', path: '/meal/shopping', section: 'meal' },
    { label: 'Prep Day', path: '/meal/prep', section: 'meal' },
    { label: 'Sauces', path: '/meal/sauces', section: 'meal' },
    { label: 'Breakfasts', path: '/meal/breakfasts', section: 'meal' },
    { label: 'Nutrients', path: '/meal/nutrients', section: 'meal' },
    { label: 'Storage', path: '/meal/storage', section: 'meal' },
  ]

  onMounted(() => {
    timerStore.reconcileOnMount()
  })
</script>

<template>
  <!-- Desktop Navigation -->
  <AppNav :nav-items="mealNavItems" />

  <!-- Bottom Navigation (Mobile & Desktop) -->
  <BottomNavigation />

  <AppMasthead />
  <AppPage>
    <RouterView v-slot="{ Component }">
      <Transition name="view" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </AppPage>
</template>

<style scoped></style>
