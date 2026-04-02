<template>
  <!-- Desktop Navigation Only -->
  <nav class="app-nav hidden md:block lg:block">
    <div class="app-nav-inner">
      <div class="nav-section">
        <span class="nav-section-label">Meal Prep</span>
        <div class="nav-tabs">
          <RouterLink
            v-for="item in primaryNavItems"
            :key="item.path"
            :to="item.path"
            class="nav-tab"
            active-class="nav-tab-active"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </div>

      <!-- More dropdown for secondary items -->
      <div class="nav-section nav-section-more" v-if="secondaryNavItems.length > 0">
        <div
          class="nav-dropdown"
          @click="showMoreDropdown = !showMoreDropdown"
          v-click-outside="() => (showMoreDropdown = false)"
        >
          <span class="nav-tab nav-dropdown-toggle">
            More
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              class="nav-dropdown-icon"
              :class="{ 'nav-dropdown-icon-open': showMoreDropdown }"
            >
              <polyline points="3,6 9,6"></polyline>
              <polyline points="6,3 6,9" v-if="!showMoreDropdown"></polyline>
            </svg>
          </span>
          <div class="nav-dropdown-menu" :class="{ 'nav-dropdown-menu-open': showMoreDropdown }">
            <RouterLink
              v-for="item in secondaryNavItems"
              :key="item.path"
              :to="item.path"
              class="nav-dropdown-item"
              active-class="nav-dropdown-item-active"
              @click="showMoreDropdown = false"
            >
              {{ item.label }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Mobile Navigation handled by MobileNav.vue component -->
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import type { NavItem } from '@/types/common.types'

  const props = defineProps<{
    navItems?: NavItem[]
  }>()

  const showMoreDropdown = ref(false)
  const showMobileMenu = ref(false)

  // Split navigation into primary (max 5 items) and secondary
  const allNavItems = computed(
    () =>
      props.navItems || [
        { label: 'Ingredients Overview', path: '/overview', section: 'meal' },
        { label: 'Meal Plan', path: '/meal/fridge', section: 'meal' },
        { label: 'Shopping List', path: '/meal/shopping', section: 'meal' },
        { label: 'Prep Day', path: '/meal/prep', section: 'meal' },
        { label: 'Sauces', path: '/meal/sauces', section: 'meal' },
        { label: 'Breakfasts', path: '/meal/breakfasts', section: 'meal' },
        { label: 'Nutrients', path: '/meal/nutrients', section: 'meal' },
        { label: 'Storage', path: '/meal/storage', section: 'meal' },
      ]
  )

  const primaryNavItems = computed(() => allNavItems.value.slice(0, 5))
  const secondaryNavItems = computed(() => allNavItems.value.slice(5))

  // Click outside directive
  const vClickOutside = {
    mounted(el: HTMLElement & { _clickOutside?: (event: MouseEvent) => void }, binding: any) {
      el._clickOutside = (event: MouseEvent) => {
        if (!(el === event.target || el.contains(event.target as Node))) {
          binding.value(event)
        }
      }
      document.addEventListener('click', el._clickOutside)
    },
    unmounted(el: HTMLElement & { _clickOutside?: (event: MouseEvent) => void }) {
      if (el._clickOutside) {
        document.removeEventListener('click', el._clickOutside)
      }
    },
  }
</script>

<style scoped>
  .app-nav {
    position: sticky;
    top: 0;
    z-index: var(--z-sticky);
    background: var(--ink);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    min-height: 48px;
  }

  .app-nav-inner {
    max-width: 980px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
  }

  .nav-section {
    display: flex;
    align-items: center;
    gap: 0;
    flex-shrink: 0;
  }

  .nav-section-more {
    margin-left: auto;
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
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.15s;
    white-space: nowrap;
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }

  .nav-tab:hover {
    color: rgba(255, 255, 255, 0.8);
  }

  .nav-tab-active {
    color: #a8d4b8;
    border-bottom-color: #a8d4b8;
  }

  /* Dropdown styles */
  .nav-dropdown {
    position: relative;
  }

  .nav-dropdown-toggle {
    cursor: pointer;
    user-select: none;
  }

  .nav-dropdown-icon {
    margin-left: 4px;
    transition: transform 0.2s;
  }

  .nav-dropdown-icon-open {
    transform: rotate(45deg);
  }

  .nav-dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: var(--paper);
    border: 1px solid var(--rule);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 180px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: all 0.2s ease;
    z-index: var(--z-dropdown);
  }

  .nav-dropdown-menu-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .nav-dropdown-item {
    display: block;
    padding: 12px 16px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--ink);
    text-decoration: none;
    transition: background-color 0.15s;
    border-bottom: 1px solid transparent;
  }

  .nav-dropdown-item:first-child {
    border-radius: 8px 8px 0 0;
  }

  .nav-dropdown-item:last-child {
    border-radius: 0 0 8px 8px;
    border-bottom: none;
  }

  .nav-dropdown-item:hover {
    background-color: var(--bg);
  }

  .nav-dropdown-item-active {
    background-color: var(--green-light);
    color: var(--green);
    font-weight: 600;
  }

  /* Keyboard navigation support */
  .nav-dropdown-toggle:focus,
  .nav-tab:focus {
    outline: 2px solid #a8d4b8;
    outline-offset: 2px;
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .nav-dropdown-menu {
      background: var(--ink);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .nav-dropdown-item {
      color: rgba(255, 255, 255, 0.8);
    }

    .nav-dropdown-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .nav-dropdown-item-active {
      background-color: var(--green);
      color: white;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .nav-tab,
    .nav-dropdown-icon,
    .nav-dropdown-menu {
      transition: none;
    }
  }

  /* Mobile Hamburger Menu Styles */
  .app-nav-mobile {
    position: fixed;
    top: max(16px, env(safe-area-inset-top, 16px));
    left: 16px;
    z-index: var(--z-sticky);
  }

  .mobile-menu-btn {
    background: var(--ink);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 8px;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    backdrop-filter: blur(10px);
    background: rgba(0, 0, 0, 0.8);
  }

  .mobile-menu-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 1);
  }

  .mobile-menu-btn:focus {
    outline: 2px solid var(--green);
    outline-offset: 2px;
  }

  /* Mobile Overlay */
  .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: var(--z-modal);
  }

  /* Mobile Sidebar */
  .mobile-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 280px;
    background: var(--paper);
    box-shadow: 2px 0 12px rgba(0, 0, 0, 0.2);
    z-index: var(--z-modal);
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
    border-radius: 4px;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .mobile-close-btn:hover {
    color: rgba(255, 255, 255, 1);
    background: rgba(255, 255, 255, 0.1);
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
</style>
