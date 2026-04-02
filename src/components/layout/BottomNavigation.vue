<template>
  <nav class="bottom-nav md:hidden lg:hidden" role="navigation" aria-label="Main navigation">
    <RouterLink
      v-for="item in primaryNavItems"
      :key="item.path"
      :to="item.path"
      class="bottom-nav-item btn-feedback"
      active-class="bottom-nav-item-active"
      :aria-label="item.label"
      :aria-current="isCurrentPath(item.path)"
      @click="handleNavInteraction"
    >
      <div class="bottom-nav-icon">
        <component :is="item.icon" />
      </div>
      <span class="bottom-nav-label">{{ item.label }}</span>
    </RouterLink>

    <!-- More button with slide-out panel -->
    <div class="bottom-nav-more" ref="morePanel">
      <button
        @click="toggleMorePanel"
        class="bottom-nav-item btn-feedback"
        :class="{ 'bottom-nav-item-active': isMoreActive }"
        aria-label="More options"
        :aria-expanded="showMorePanel ? 'true' : 'false'"
        aria-haspopup="true"
      >
        <div class="bottom-nav-icon">
          <MoreHorizontal />
        </div>
        <span class="bottom-nav-label">More</span>
      </button>

      <!-- Slide-out panel -->
      <Transition name="panel">
        <div v-if="showMorePanel" class="bottom-nav-panel" @click.stop>
          <div class="panel-header">
            <h3 class="panel-title">More Options</h3>
            <button @click="closeMorePanel" class="panel-close" aria-label="Close">
              <X />
            </button>
          </div>
          <div class="panel-content">
            <RouterLink
              v-for="item in secondaryNavItems"
              :key="item.path"
              :to="item.path"
              class="panel-item"
              active-class="panel-item-active"
              @click="closeMorePanel"
            >
              <component :is="item.icon" class="panel-icon" />
              <div class="panel-text">
                <span class="panel-label">{{ item.label }}</span>
                <span class="panel-description">{{ getItemDescription(item.label) }}</span>
              </div>
              <ChevronRight class="panel-arrow" />
            </RouterLink>
          </div>
        </div>
      </Transition>

      <!-- Overlay -->
      <Transition name="overlay">
        <div v-if="showMorePanel" class="panel-overlay" @click="closeMorePanel" />
      </Transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { RouterLink, useRoute } from 'vue-router'
  import {
    Calendar,
    ShoppingCart,
    ChefHat,
    BookOpen,
    User,
    Settings,
    Home,
    MoreHorizontal,
    Utensils,
    Info,
    X,
    ChevronRight,
  } from 'lucide-vue-next'

  interface NavItem {
    label: string
    path: string
    icon: any
  }

  const route = useRoute()
  const showMorePanel = ref(false)
  const morePanel = ref<HTMLElement | null>(null)

  // Primary navigation items (4 items as recommended)
  const primaryNavItems: NavItem[] = [
    { label: 'Plan', path: '/meal/fridge', icon: Calendar },
    { label: 'Shop', path: '/meal/shopping', icon: ShoppingCart },
    { label: 'Prep', path: '/meal/prep', icon: ChefHat },
  ]

  // Secondary navigation items (accessed via More dropdown)
  const secondaryNavItems: NavItem[] = [
    { label: 'Overview', path: '/overview', icon: Home },
    { label: 'Recipes', path: '/meal/sauces', icon: Utensils },
    { label: 'Breakfast', path: '/meal/breakfasts', icon: BookOpen },
    { label: 'Nutrients', path: '/meal/nutrients', icon: Info },
    { label: 'Storage', path: '/meal/storage', icon: Settings },
  ]

  // Check if current path matches a nav item
  const isCurrentPath = (path: string) => {
    return route.path === path || route.path.startsWith(path + '/')
  }

  // Check if any secondary item is active (for More button state)
  const isMoreActive = computed(() => {
    return secondaryNavItems.some(item => isCurrentPath(item.path))
  })

  const toggleMorePanel = () => {
    showMorePanel.value = !showMorePanel.value
    // Haptic feedback for panel toggle
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }
  }

  const closeMorePanel = () => {
    showMorePanel.value = false
    // Haptic feedback for panel close
    if ('vibrate' in navigator) {
      navigator.vibrate(5)
    }
  }

  // Enhanced navigation feedback
  const handleNavInteraction = () => {
    // Light haptic feedback for navigation interactions
    if ('vibrate' in navigator) {
      navigator.vibrate(3)
    }
  }

  const getItemDescription = (label: string) => {
    const descriptions: Record<string, string> = {
      Overview: 'View ingredients and meal planning overview',
      Recipes: 'Browse sauces and cooking recipes',
      Breakfast: 'Breakfast meal options and prep',
      Nutrients: 'Nutritional information and tracking',
      Storage: 'Food storage guidelines and tips',
      Fitness: 'Fitness tracking and workout plans',
    }
    return descriptions[label] || ''
  }

  // Close panel when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (morePanel.value && !morePanel.value.contains(event.target as Node)) {
      closeMorePanel()
    }
  }

  // Handle escape key to close panel
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeMorePanel()
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEscapeKey)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    document.removeEventListener('keydown', handleEscapeKey)
  })
</script>

<style scoped>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: var(--z-sticky);
    background: var(--paper);
    border-top: 1px solid var(--rule);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: var(--space-2) 0;
    padding-bottom: max(var(--space-2), env(safe-area-inset-bottom));
    box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.08);
    /* Enhanced visual hierarchy */
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    /* Prevent content from showing through */
    background: rgba(255, 253, 247, 0.95);
  }

  .bottom-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius);
    transition: all var(--transition);
    min-height: var(--touch-target);
    min-width: var(--touch-target);
    color: var(--muted);
    text-decoration: none;
    background: transparent;
    border: none;
    cursor: pointer;
    position: relative;
    flex: 1;
    /* Enhanced touch feedback */
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .bottom-nav-item:hover {
    color: var(--ink);
    background-color: var(--bg);
    transform: translateY(-2px);
  }

  .bottom-nav-item:active {
    transform: translateY(0) scale(0.95);
    background-color: var(--rule);
    transition:
      transform 100ms,
      background-color 100ms;
  }

  .bottom-nav-item:focus {
    outline: none;
    outline-offset: 2px;
    outline: 2px solid var(--ink);
  }

  .bottom-nav-item-active {
    background-color: var(--bg);
    color: var(--ink);
    position: relative;
  }

  .bottom-nav-icon {
    width: 24px;
    height: 24px;
    margin-bottom: var(--space-1);
    transition:
      transform var(--transition),
      filter var(--transition);
    filter: grayscale(0);
  }

  .bottom-nav-item:hover .bottom-nav-icon {
    transform: translateY(-1px);
  }

  .bottom-nav-label {
    font-size: var(--text-xs);
    font-weight: 500;
    transition: all var(--transition);
    white-space: nowrap;
    opacity: 0.8;
    letter-spacing: 0.025em;
  }

  .bottom-nav-item-active .bottom-nav-label {
    font-weight: 600;
    opacity: 1;
  }

  .bottom-nav-item:hover .bottom-nav-label {
    opacity: 1;
  }

  /* Slide-out panel positioning */
  .bottom-nav-more {
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
  }

  .bottom-nav-panel {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--paper);
    border-top: 1px solid var(--rule);
    border-radius: var(--radius-md) var(--radius-md) 0 0;
    box-shadow: var(--shadow-xl);
    max-height: 70vh;
    overflow-y: auto;
    z-index: var(--z-modal);
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4) var(--space-5);
    border-bottom: 1px solid var(--rule);
    background: var(--paper);
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .panel-title {
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--ink);
    margin: 0;
  }

  .panel-close {
    background: transparent;
    border: none;
    color: var(--muted);
    cursor: pointer;
    padding: var(--space-2);
    border-radius: var(--radius);
    min-height: var(--touch-target-small);
    min-width: var(--touch-target-small);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition);
  }

  .panel-close:hover {
    color: var(--ink);
    background-color: var(--bg);
  }

  .panel-close:focus {
    outline: 2px solid var(--success);
    outline-offset: 2px;
  }

  .panel-content {
    padding: var(--space-2);
  }

  .panel-item {
    display: flex;
    align-items: center;
    padding: var(--space-4);
    color: var(--ink);
    text-decoration: none;
    transition: background-color var(--transition);
    border-radius: var(--radius);
    margin-bottom: var(--space-1);
  }

  .panel-item:last-child {
    margin-bottom: 0;
  }

  .panel-item:hover {
    background-color: var(--bg);
  }

  .panel-item.panel-item-active {
    background-color: var(--bg);
    color: var(--ink);
    border-left: 3px solid var(--ink);
    border-radius: 0 var(--radius) var(--radius) 0;
  }

  .panel-item.panel-item-active:hover {
    background-color: var(--bg);
  }

  .panel-icon {
    width: 24px;
    height: 24px;
    margin-right: var(--space-4);
    flex-shrink: 0;
    color: var(--muted);
  }

  .panel-item-active .panel-icon {
    color: var(--ink);
  }

  .panel-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .panel-label {
    font-size: var(--text-base);
    font-weight: 500;
    color: inherit;
    margin-bottom: var(--space-1);
    transition: font-weight var(--transition);
  }

  .panel-description {
    font-size: var(--text-sm);
    color: var(--muted);
    line-height: 1.4;
  }

  .panel-arrow {
    width: 20px;
    height: 20px;
    color: var(--muted);
    flex-shrink: 0;
    transition:
      transform var(--transition),
      color var(--transition);
  }

  /* Enhanced active states for panel items */
  .panel-item-active .panel-label {
    font-weight: 600;
  }

  .panel-item-active .panel-description {
    color: var(--ink);
    font-weight: 500;
  }

  .panel-item-active .panel-arrow {
    color: var(--ink);
    transform: translateX(2px);
  }

  .panel-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: var(--z-modal-backdrop);
  }

  /* Enhanced touch feedback animation */
  @keyframes touch-ripple {
    0% {
      transform: scale(0.8);
      opacity: 0.6;
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.4);
    }
    50% {
      transform: scale(1.2);
      opacity: 0.3;
      box-shadow: 0 0 0 8px rgba(0, 0, 0, 0.2);
    }
    100% {
      transform: scale(1.4);
      opacity: 0;
      box-shadow: 0 0 0 16px rgba(0, 0, 0, 0);
    }
  }

  .bottom-nav-item::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: var(--radius);
    background: radial-gradient(circle, rgba(0, 0, 0, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s;
    pointer-events: none;
  }

  .bottom-nav-item:active::after {
    animation: touch-ripple 0.6s ease-out;
  }

  /* Panel animations */
  .panel-enter-active,
  .panel-leave-active {
    transition: all var(--transition-slow) ease;
  }

  .panel-enter-from {
    transform: translateY(100%);
  }

  .panel-leave-to {
    transform: translateY(100%);
  }

  /* Overlay animations */
  .overlay-enter-active,
  .overlay-leave-active {
    transition: opacity var(--transition) ease;
  }

  .overlay-enter-from,
  .overlay-leave-to {
    opacity: 0;
  }

  /* Responsive adjustments */
  @media (max-width: 480px) {
    .bottom-nav-label {
      font-size: 11px;
    }

    .bottom-nav-icon {
      width: 22px;
      height: 22px;
    }

    .bottom-nav-item {
      padding: var(--space-1) var(--space-2);
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    .bottom-nav-label {
      font-size: var(--text-sm);
    }

    .bottom-nav-icon {
      width: 28px;
      height: 28px;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .bottom-nav-item,
    .bottom-nav-icon,
    .bottom-nav-label,
    .dropdown-enter-active,
    .dropdown-leave-active {
      transition: none;
    }

    .bottom-nav-item:active {
      transform: none;
    }

    .dropdown-enter-from,
    .dropdown-leave-to {
      transform: translateX(-50%);
    }
  }
</style>
