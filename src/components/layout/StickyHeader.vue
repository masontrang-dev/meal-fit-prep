<template>
  <header class="sticky-header" :class="{ 'sticky-header-visible': isVisible }">
    <div class="sticky-header-inner">
      <!-- Mobile layout -->
      <div class="mobile-layout">
        <button class="mobile-menu-btn" @click="$emit('toggleMobileMenu')" aria-label="Toggle menu">
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
        <div class="brand-wordmark">
          <span class="brand-icon">🥗</span>
          <span class="brand-text">MealFit</span>
        </div>
      </div>

      <!-- Desktop layout -->
      <div class="desktop-layout">
        <div class="brand-section">
          <button @click="navigateToHome" class="brand-button">
            <span class="brand-icon">🥗</span>
            <span class="brand-text">MealFit</span>
          </button>
        </div>
        <nav class="nav-tabs">
          <RouterLink
            v-for="item in primaryNavItems"
            :key="item.path"
            :to="item.path"
            class="nav-tab"
            active-class="nav-tab-active"
          >
            {{ item.label }}
          </RouterLink>

          <!-- More Dropdown -->
          <div
            v-if="moreNavItems && moreNavItems.length > 0"
            class="nav-dropdown"
            @mouseenter="showMoreDropdown = true"
            @mouseleave="showMoreDropdown = false"
          >
            <button
              ref="dropdownTrigger"
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
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import type { NavItem } from "@/types/common.types";

const props = defineProps<{
  navItems: NavItem[];
  moreItems?: NavItem[];
}>();

const emit = defineEmits<{
  toggleMobileMenu: [];
}>();

const router = useRouter();
const isVisible = ref(false);
const showMoreDropdown = ref(false);
const dropdownTrigger = ref<HTMLElement | null>(null);
const dropdownPosition = ref({ top: 0, left: 0 });
let lastScrollY = 0;
const scrollThreshold = 200; // Show sticky header after scrolling 200px
let scrollTimer: number | null = null;

// For condensed view, show first 6 items and put only specific ones in dropdown
const primaryNavItems = computed(() => {
  return props.navItems.slice(0, 6);
});

const moreNavItems = computed(() => {
  const remainingItems = props.navItems.slice(6);
  return [...remainingItems, ...(props.moreItems || [])];
});

const navigateToHome = () => {
  router.push("/overview");
};

const updateDropdownPosition = () => {
  const trigger = dropdownTrigger.value;
  if (trigger) {
    const rect = trigger.getBoundingClientRect();
    dropdownPosition.value = {
      top: rect.bottom + 2,
      left: rect.left,
    };
  }
};

const dropdownStyle = computed(() => ({
  position: "fixed" as const,
  top: `${dropdownPosition.value.top}px`,
  left: `${dropdownPosition.value.left}px`,
}));

const handleScroll = () => {
  // Throttle scroll events for better mobile performance
  if (scrollTimer) {
    clearTimeout(scrollTimer);
  }

  scrollTimer = window.setTimeout(() => {
    const currentScrollY = window.scrollY;

    // Use requestAnimationFrame for smoother performance on mobile
    requestAnimationFrame(() => {
      if (currentScrollY > scrollThreshold) {
        isVisible.value = true;
      } else {
        isVisible.value = false;
      }
    });

    lastScrollY = currentScrollY;
  }, 16); // ~60fps throttling
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", updateDropdownPosition);
  handleScroll(); // Check initial state
  updateDropdownPosition();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", updateDropdownPosition);
  if (scrollTimer) {
    clearTimeout(scrollTimer);
  }
});
</script>

<style scoped>
.sticky-header {
  position: fixed !important;
  top: -56px !important; /* Hide above viewport instead of using transform */
  left: 0 !important;
  right: 0 !important;
  z-index: 1001;
  background: var(--ink);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: top 0.25s ease-out;
  height: 56px;
  will-change: top;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  /* Ensure it stays at viewport top */
  max-height: 56px;
  overflow: hidden;
  /* Additional positioning safety */
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box !important;
}

.sticky-header-visible {
  top: 0 !important;
}

.sticky-header-inner {
  max-width: 980px;
  margin: 0 auto;
  height: 100%;
  padding: 0 16px;
}

/* Mobile Layout */
.mobile-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  position: relative;
}

.mobile-menu-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu-btn:hover {
  color: rgba(255, 255, 255, 1);
}

.brand-wordmark {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  letter-spacing: 0.02em;
}

.brand-icon {
  font-size: 1.2rem;
}

.brand-text {
  font-weight: 600;
}

/* Desktop Layout */
.desktop-layout {
  display: none;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 32px;
}

.brand-section {
  flex-shrink: 0;
}

.brand-button {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  border-radius: 4px;
  transition: all 0.2s;
}

.brand-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 1);
}

.nav-tabs {
  display: flex;
  align-items: center;
  gap: 0;
  flex: 1;
  justify-content: center;
}

.nav-tab {
  padding: 8px 16px;
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

/* Responsive */
@media (min-width: 769px) {
  .mobile-layout {
    display: none;
  }

  .desktop-layout {
    display: flex;
  }
}

@media (max-width: 768px) {
  .sticky-header-inner {
    padding: 0 12px;
  }

  .brand-wordmark {
    /* Prevent text shifting on mobile */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

/* Dropdown Styles */
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
  z-index: 1002;
}

.nav-dropdown-item {
  display: block;
  padding: 10px 16px;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
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
