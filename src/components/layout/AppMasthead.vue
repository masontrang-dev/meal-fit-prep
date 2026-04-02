<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { User, Settings, Bell, ChevronDown } from 'lucide-vue-next'
  import ServingsSelector from '@/components/ui/ServingsSelector.vue'

  const router = useRouter()
  const version = '1.3.2' // This will be updated automatically by deployment scripts
  const showUserMenu = ref(false)

  // Responsive behavior
  const isMobile = computed(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768
  })

  const isTablet = computed(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= 768 && window.innerWidth < 1024
  })

  function navigateToHome() {
    router.push('/overview')
  }

  function toggleUserMenu() {
    showUserMenu.value = !showUserMenu.value
  }

  function handleUserAction(action: string) {
    showUserMenu.value = false
    // Handle different user actions
    switch (action) {
      case 'profile':
        // Navigate to profile
        break
      case 'settings':
        // Navigate to settings
        break
      case 'notifications':
        // Toggle notifications
        break
    }
  }
</script>

<template>
  <header class="masthead" :class="{ 'masthead-mobile': isMobile, 'masthead-tablet': isTablet }">
    <div class="masthead-inner">
      <div class="masthead-content">
        <!-- Title Section -->
        <div class="masthead-title-section">
          <button @click="navigateToHome" class="masthead-title-button" aria-label="Go to home">
            <h1 class="masthead-title">
              🥗 MealFit<br />
              <em class="masthead-subtitle">Smart Meal Prep</em>
            </h1>
          </button>

          <!-- Feature pills - responsive display -->
          <div class="masthead-pills">
            <span class="pill">Weekly Plan</span>
            <span class="pill">Whole Foods</span>
            <span class="pill" v-if="!isMobile">Diet Friendly</span>
            <span class="pill" v-if="!isMobile">Flexible Prep</span>
          </div>
        </div>

        <!-- Meta Section - Desktop/Tablet -->
        <div class="masthead-meta" v-if="!isMobile">
          <div class="meta-content">
            <div class="meta-items">
              <span>Fish · Chicken · Steak</span>
              <span>Brown Rice · Quinoa · Lentils</span>
              <span class="version">v{{ version }}</span>
            </div>
          </div>
        </div>

        <!-- User Section - Mobile/Tablet -->
        <div class="masthead-user" v-if="isMobile || isTablet">
          <div class="user-controls">
            <!-- Notifications -->
            <button
              class="user-button"
              @click="handleUserAction('notifications')"
              aria-label="Notifications"
            >
              <Bell class="user-icon" />
            </button>

            <!-- User Menu -->
            <div class="user-dropdown" @click="toggleUserMenu">
              <button class="user-button user-menu-button" aria-label="User menu">
                <User class="user-icon" />
                <ChevronDown
                  class="dropdown-icon"
                  :class="{ 'dropdown-icon-open': showUserMenu }"
                />
              </button>

              <div class="user-menu" :class="{ 'user-menu-open': showUserMenu }">
                <button class="user-menu-item" @click="handleUserAction('profile')">
                  <User class="menu-item-icon" />
                  Profile
                </button>
                <button class="user-menu-item" @click="handleUserAction('settings')">
                  <Settings class="menu-item-icon" />
                  Settings
                </button>
              </div>
            </div>
          </div>

          <!-- Compact Meta Info for Mobile -->
          <div class="masthead-mobile-meta" v-if="isMobile">
            <span class="mobile-version">v{{ version }}</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
  .masthead {
    background: var(--ink);
    color: var(--bg);
    padding: 36px 32px 28px;
    border-bottom: 3px solid var(--green);
    position: relative;
  }

  .masthead-inner {
    max-width: 980px;
    margin: 0 auto;
  }

  .masthead-content {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: end;
    gap: 24px;
  }

  .masthead-title-section {
    flex: 1;
  }

  .masthead-title-button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    text-align: left;
    transition: opacity 0.2s;
    border-radius: 8px;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
  }

  .masthead-title-button:hover {
    opacity: 0.8;
  }

  .masthead-title-button:focus {
    outline: 2px solid var(--green);
    outline-offset: 2px;
  }

  .masthead-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 700;
    line-height: 0.95;
    letter-spacing: -0.01em;
    margin: 0;
  }

  .masthead-subtitle {
    font-style: italic;
    color: #a8d4b8;
  }

  .masthead-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 14px;
  }

  .pill {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 3px 10px;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-radius: 12px;
    transition: all 0.2s;
  }

  .pill:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .masthead-meta {
    text-align: right;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
    line-height: 2.2;
  }

  .meta-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .meta-items {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .version {
    text-transform: none;
    opacity: 0.7;
  }

  /* User Controls */
  .masthead-user {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }

  .user-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .user-button {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 8px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    min-width: 44px;
    color: rgba(255, 255, 255, 0.8);
  }

  .user-button:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    color: rgba(255, 255, 255, 1);
  }

  .user-button:focus {
    outline: 2px solid var(--green);
    outline-offset: 2px;
  }

  .user-icon {
    width: 20px;
    height: 20px;
  }

  .user-dropdown {
    position: relative;
  }

  .user-menu-button {
    gap: 4px;
  }

  .dropdown-icon {
    width: 16px;
    height: 16px;
    transition: transform 0.2s;
  }

  .dropdown-icon-open {
    transform: rotate(180deg);
  }

  .user-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: var(--paper);
    border: 1px solid var(--rule);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 140px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: all 0.2s ease;
    z-index: var(--z-dropdown);
    margin-top: 4px;
  }

  .user-menu-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .user-menu-item {
    width: 100%;
    background: none;
    border: none;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--ink);
    cursor: pointer;
    transition: background-color 0.15s;
    border-radius: 8px;
    text-align: left;
  }

  .user-menu-item:first-child {
    border-radius: 8px 8px 0 0;
  }

  .user-menu-item:last-child {
    border-radius: 0 0 8px 8px;
  }

  .user-menu-item:hover {
    background-color: var(--bg);
  }

  .menu-item-icon {
    width: 16px;
    height: 16px;
  }

  .masthead-mobile-meta {
    text-align: right;
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.5);
  }

  /* Mobile Styles */
  @media (max-width: 767px) {
    .masthead {
      padding: 20px 16px 16px;
      padding-top: max(20px, env(safe-area-inset-top, 20px));
    }

    .masthead-content {
      grid-template-columns: 1fr auto;
      gap: 16px;
      align-items: start;
    }

    .masthead-title {
      font-size: clamp(1.8rem, 8vw, 2.5rem);
    }

    .masthead-pills {
      margin-top: 10px;
      gap: 4px;
    }

    .pill {
      font-size: 0.6rem;
      padding: 2px 8px;
    }

    .user-controls {
      gap: 6px;
    }

    .user-button {
      padding: 6px;
      min-height: 40px;
      min-width: 40px;
    }

    .user-icon {
      width: 18px;
      height: 18px;
    }
  }

  /* Tablet Styles */
  @media (min-width: 768px) and (max-width: 1023px) {
    .masthead {
      padding: 28px 24px 24px;
    }

    .masthead-content {
      gap: 20px;
    }

    .masthead-pills {
      margin-top: 12px;
    }
  }

  /* Large Desktop */
  @media (min-width: 1024px) {
    .masthead-user {
      display: none;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .masthead-title-button,
    .pill,
    .user-button,
    .dropdown-icon,
    .user-menu,
    .user-menu-item {
      transition: none;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .masthead {
      background: black;
      border-bottom-color: white;
    }

    .user-button {
      background: white;
      border-color: white;
      color: black;
    }

    .user-menu {
      background: white;
      border-color: black;
    }

    .user-menu-item {
      color: black;
    }
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .user-menu {
      background: var(--ink);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .user-menu-item {
      color: rgba(255, 255, 255, 0.8);
    }

    .user-menu-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
</style>
