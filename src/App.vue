<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import { onMounted } from "vue";
import AppMasthead from "./components/layout/AppMasthead.vue";
import AppNav from "./components/layout/AppNav.vue";
import AppPage from "./components/layout/AppPage.vue";
import StickyHeader from "./components/layout/StickyHeader.vue";
import { useTimerStore } from "./stores/timerStore";
import type { NavItem } from "@/types/common.types";

const timerStore = useTimerStore();
const appNavRef = ref();

const mealNavItems: NavItem[] = [
  { label: "Overview", path: "/overview", section: "meal" },
  { label: "Meal Plan", path: "/meal/fridge", section: "meal" },
  { label: "Shopping List", path: "/meal/shopping", section: "meal" },
  { label: "Prep Day", path: "/meal/prep", section: "meal" },
  { label: "Fresh Cook", path: "/meal/cast-iron", section: "meal" },
  { label: "Sauces", path: "/meal/sauces", section: "meal" },
  { label: "Breakfasts", path: "/meal/breakfasts", section: "meal" },
  { label: "Nutrients", path: "/meal/nutrients", section: "meal" },
  { label: "Storage", path: "/meal/storage", section: "meal" },
];

// For StickyHeader - first 6 items shown directly, last 3 in dropdown
const primaryNavItems: NavItem[] = [
  { label: "Overview", path: "/overview", section: "meal" },
  { label: "Meal Plan", path: "/meal/fridge", section: "meal" },
  { label: "Shopping List", path: "/meal/shopping", section: "meal" },
  { label: "Prep Day", path: "/meal/prep", section: "meal" },
  { label: "Fresh Cook", path: "/meal/cast-iron", section: "meal" },
  { label: "Sauces", path: "/meal/sauces", section: "meal" },
];

const moreNavItems: NavItem[] = [
  { label: "Breakfasts", path: "/meal/breakfasts", section: "meal" },
  { label: "Nutrients", path: "/meal/nutrients", section: "meal" },
  { label: "Storage", path: "/meal/storage", section: "meal" },
];

const toggleMobileMenu = () => {
  if (appNavRef.value) {
    appNavRef.value.toggleMobileMenu();
  }
};

onMounted(() => {
  timerStore.reconcileOnMount();
});
</script>

<template>
  <StickyHeader
    :nav-items="primaryNavItems"
    :more-items="moreNavItems"
    @toggle-mobile-menu="toggleMobileMenu"
  />
  <AppMasthead />
  <AppNav ref="appNavRef" :nav-items="mealNavItems" />
  <AppPage>
    <RouterView v-slot="{ Component }">
      <Transition name="view" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </AppPage>
</template>

<style scoped></style>
