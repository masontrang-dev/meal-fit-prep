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
            v-for="item in mealNavItems"
            :key="item.path"
            :to="item.path"
            class="nav-tab"
            active-class="nav-tab-active"
          >
            {{ item.label }}
          </RouterLink>

          <!-- More Dropdown -->
          <div
            class="nav-dropdown"
            @mouseenter="showMoreDropdown = true"
            @mouseleave="showMoreDropdown = false"
          >
            <button
              class="nav-tab nav-dropdown-trigger"
              @click.stop="showMoreDropdown = !showMoreDropdown"
            >
              More ▾
            </button>
            <Teleport to="body">
              <div
                v-if="showMoreDropdown"
                class="nav-dropdown-menu"
                @mouseenter="showMoreDropdown = true"
                @mouseleave="showMoreDropdown = false"
                :style="dropdownStyle"
              >
                <RouterLink
                  v-for="item in moreNavItems"
                  :key="item.path"
                  :to="item.path"
                  class="nav-dropdown-item"
                  active-class="nav-dropdown-item-active"
                  @click="showMoreDropdown = false"
                >
                  {{ item.label }}
                </RouterLink>
              </div>
            </Teleport>
          </div>
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
            v-for="item in mealNavItems"
            :key="item.path"
            :to="item.path"
            class="mobile-nav-item"
            active-class="mobile-nav-item-active"
            @click="showMobileMenu = false"
          >
            {{ item.label }}
          </RouterLink>
          <div class="mobile-nav-divider"></div>
          <RouterLink
            v-for="item in moreNavItems"
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";
import type { NavItem } from "@/types/common.types";

const mealNavItems: NavItem[] = [
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

const showMoreDropdown = ref(false);
const showMobileMenu = ref(false);
const dropdownTrigger = ref<HTMLElement | null>(null);
const dropdownPosition = ref({ top: 0, left: 0 });

const dropdownStyle = computed(() => ({
  position: "fixed" as const,
  top: `${dropdownPosition.value.top}px`,
  left: `${dropdownPosition.value.left}px`,
}));

const updateDropdownPosition = () => {
  const trigger = document.querySelector(".nav-dropdown-trigger");
  if (trigger) {
    const rect = trigger.getBoundingClientRect();
    dropdownPosition.value = {
      top: rect.bottom,
      left: rect.left,
    };
  }
};

onMounted(() => {
  window.addEventListener("scroll", updateDropdownPosition);
  window.addEventListener("resize", updateDropdownPosition);
  updateDropdownPosition();
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateDropdownPosition);
  window.removeEventListener("resize", updateDropdownPosition);
});

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
  z-index: 101;
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
  z-index: 999;
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

.mobile-nav-divider {
  height: 1px;
  background: var(--rule);
  margin: 8px 20px;
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

.nav-dropdown {
  position: relative;
  display: inline-block;
}

.nav-dropdown-trigger {
  cursor: pointer;
}

.nav-dropdown-menu {
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  z-index: 1000;
}

.nav-dropdown-item {
  display: block;
  padding: 10px 16px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink);
  text-decoration: none;
  transition: background-color 0.15s;
  white-space: nowrap;
}

.nav-dropdown-item:hover {
  background-color: var(--bg);
}

.nav-dropdown-item-active {
  background-color: var(--green-light);
  color: var(--green);
}

.nav-dropdown-item:first-child {
  border-radius: 4px 4px 0 0;
}

.nav-dropdown-item:last-child {
  border-radius: 0 0 4px 4px;
}
</style>
