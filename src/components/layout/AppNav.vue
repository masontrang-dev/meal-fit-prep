<template>
  <nav class="app-nav">
    <!-- Mobile Hamburger Button -->
    <button
      class="mobile-menu-btn"
      @click="showMobileMenu = !showMobileMenu"
      aria-label="Toggle menu"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>

    <div class="app-nav-inner">
      <div class="nav-section">
        <span class="nav-section-label">Meal Prep</span>
        <div class="nav-tabs">
          <RouterLink
            v-for="item in allNavItems"
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

    <!-- Mobile Sidebar Menu -->
    <Teleport to="body">
      <div v-if="showMobileMenu" class="mobile-overlay" @click="showMobileMenu = false"></div>
      <div class="mobile-sidebar" :class="{ 'mobile-sidebar-open': showMobileMenu }">
        <div class="mobile-sidebar-header">
          <span class="mobile-sidebar-title">Menu</span>
          <button class="mobile-close-btn" @click="showMobileMenu = false" aria-label="Close menu">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="mobile-nav-items">
          <RouterLink
            v-for="item in allNavItems"
            :key="item.path"
            :to="item.path"
            class="mobile-nav-item"
            active-class="mobile-nav-item-active"
            @click="showMobileMenu = false"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import type { NavItem } from "@/types/common.types";

const props = defineProps<{
  navItems?: NavItem[];
}>();

// Use provided nav items or fallback to default
const allNavItems = computed(
  () =>
    props.navItems || [
      { label: "Overview", path: "/overview", section: "meal" },
      { label: "Meal Plan", path: "/meal/fridge", section: "meal" },
      { label: "Shopping List", path: "/meal/shopping", section: "meal" },
      { label: "Prep Day", path: "/meal/prep", section: "meal" },
      { label: "Fresh Cook", path: "/meal/cast-iron", section: "meal" },
      { label: "Sauces", path: "/meal/sauces", section: "meal" },
      { label: "Breakfasts", path: "/meal/breakfasts", section: "meal" },
      { label: "Nutrients", path: "/meal/nutrients", section: "meal" },
      { label: "Storage", path: "/meal/storage", section: "meal" },
    ],
);

const moreNavItems: NavItem[] = [];

const showMobileMenu = ref(false);

// Expose method for parent component to call
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

defineExpose({
  toggleMobileMenu,
});
</script>

<style scoped>
.app-nav {
  position: sticky;
  top: 0;
  z-index: 99;
  background: var(--ink);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  overflow-y: visible;
  scrollbar-width: none;
  min-height: 48px;
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

/* Mobile Hamburger Button */
.mobile-menu-btn {
  display: none;
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 8px;
  z-index: 98;
}

.mobile-menu-btn:hover {
  color: rgba(255, 255, 255, 1);
}

/* Mobile Overlay */
.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
}

/* Mobile Sidebar */
.mobile-sidebar {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 280px;
  background: var(--paper);
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.2);
  z-index: 998;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
}

.mobile-sidebar-open {
  transform: translateX(0);
}

.mobile-sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--rule);
  background: var(--ink);
}

.mobile-sidebar-title {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
}

.mobile-close-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 4px;
}

.mobile-close-btn:hover {
  color: rgba(255, 255, 255, 1);
}

.mobile-nav-items {
  padding: 8px 0;
}

.mobile-nav-item {
  display: block;
  padding: 14px 20px;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--ink);
  text-decoration: none;
  transition: background-color 0.15s;
  border-left: 3px solid transparent;
}

.mobile-nav-item:hover {
  background-color: var(--bg);
}

.mobile-nav-item-active {
  background-color: var(--green-light);
  border-left-color: var(--green);
  color: var(--green);
  font-weight: 600;
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: block;
  }

  .mobile-overlay {
    display: block;
  }

  .mobile-sidebar {
    display: block;
  }

  .app-nav-inner {
    padding: 0 12px;
  }

  .nav-tabs {
    display: none;
  }
}
</style>
