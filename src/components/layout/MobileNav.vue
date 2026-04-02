<template>
  <nav class="mobile-nav">
    <RouterLink
      v-for="item in mobileNavItems"
      :key="item.path"
      :to="item.path"
      class="mobile-nav-item btn-feedback"
      active-class="mobile-nav-item-active"
      :aria-label="item.label"
    >
      <div class="mobile-nav-icon">
        <component :is="item.icon" />
      </div>
      <span class="mobile-nav-label">{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import {
    Calendar,
    ShoppingCart,
    Clock,
    ChefHat,
    BookOpen,
    User,
    Settings,
    Menu,
    Home,
  } from 'lucide-vue-next'

  interface MobileNavItem {
    label: string
    path: string
    icon: any
  }

  // Primary mobile navigation items (4-5 items for bottom nav)
  const primaryMobileNav = [
    { label: 'Overview', path: '/overview', icon: Home },
    { label: 'Plan', path: '/meal/fridge', icon: Calendar },
    { label: 'Shop', path: '/meal/shopping', icon: ShoppingCart },
    { label: 'Prep', path: '/meal/prep', icon: ChefHat },
  ]

  // Secondary items that can be accessed via "More" or profile
  const secondaryMobileNav: MobileNavItem[] = [
    { label: 'Recipes', path: '/meal/sauces', icon: BookOpen },
    { label: 'Profile', path: '/fitness', icon: User },
    { label: 'Settings', path: '/meal/storage', icon: Settings },
  ]

  // Show primary navigation on mobile, with option for more
  const mobileNavItems = computed(() => primaryMobileNav)
</script>

<style scoped>
  .mobile-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: white;
    border-top: 1px solid rgb(229 231 235);
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 8px;
    padding-bottom: max(8px, env(safe-area-inset-bottom));
    display: none;
  }

  @media (max-width: 1023px) {
    .mobile-nav {
      display: flex;
    }
  }

  .mobile-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 8px;
    transition: all 200ms;
    min-height: 44px;
    min-width: 44px;
    color: rgb(75 85 99);
    text-decoration: none;
  }

  .mobile-nav-item:hover {
    color: rgb(17 24 39);
    background-color: rgb(249 250 251);
  }

  .mobile-nav-item:active {
    transform: scale(0.95);
    background-color: rgb(243 244 246);
  }

  .mobile-nav-item:focus {
    outline: none;
    outline-offset: 2px;
    outline: 2px solid rgb(34 197 94);
  }

  .mobile-nav-item-active {
    background-color: rgb(220 252 231);
    color: rgb(22 163 74);
    border-bottom: 2px solid rgb(22 163 74);
  }

  .mobile-nav-icon {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
    transition: transform 200ms;
  }

  .mobile-nav-item-active .mobile-nav-icon {
    transform: scale(1.1);
  }

  .mobile-nav-label {
    font-size: 12px;
    font-weight: 500;
    transition: all 200ms;
  }

  .mobile-nav-item-active .mobile-nav-label {
    font-weight: 600;
  }

  /* Touch feedback animation */
  @keyframes touch-ripple {
    0% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    100% {
      transform: scale(1.2);
      opacity: 0;
    }
  }

  .mobile-nav-item::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 8px;
    background: rgb(74 222 128);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .mobile-nav-item:active::after {
    animation: touch-ripple 0.6s ease-out;
  }

  /* Responsive adjustments for different screen sizes */
  @media (max-width: 480px) {
    .mobile-nav-label {
      font-size: 10px;
    }

    .mobile-nav-icon {
      width: 20px;
      height: 20px;
    }
  }

  @media (min-width: 481px) and (max-width: 768px) {
    .mobile-nav-label {
      font-size: 14px;
    }

    .mobile-nav-icon {
      width: 28px;
      height: 28px;
    }
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .mobile-nav {
      background: rgb(17 24 39);
      border-color: rgb(55 65 81);
    }

    .mobile-nav-item {
      color: rgb(156 163 175);
    }

    .mobile-nav-item:hover {
      color: rgb(243 244 246);
      background-color: rgb(31 41 55);
    }

    .mobile-nav-item:active {
      background-color: rgb(55 65 81);
    }

    .mobile-nav-item-active {
      background-color: rgb(20 83 45);
      color: rgb(74 222 128);
      border-bottom-color: rgb(74 222 128);
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .mobile-nav-item,
    .mobile-nav-icon,
    .mobile-nav-label {
      transition: none;
    }

    .mobile-nav-item:active {
      transform: none;
    }
  }
</style>
