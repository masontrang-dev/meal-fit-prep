<template>
  <div class="app-page" :class="{ 'has-mobile-nav': hasMobileNav }">
    <main class="app-page-main" :style="pageStyles">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from 'vue'

  interface Props {
    maxWidth?: string
    padding?: string
    safeArea?: boolean
    scrollable?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    maxWidth: '980px',
    padding: '2rem 1rem',
    safeArea: true,
    scrollable: true,
  })

  // Detect if mobile nav is present
  const hasMobileNav = computed(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 1024 // lg breakpoint
  })

  // Responsive padding system
  const responsivePadding = computed(() => {
    if (typeof window === 'undefined') return props.padding

    const width = window.innerWidth
    if (width < 480) return '1rem 0.75rem' // Extra small screens
    if (width < 768) return '1.5rem 1rem' // Small screens
    if (width < 1024) return '2rem 1.5rem' // Medium screens
    return props.padding // Default for large screens
  })

  // Safe area handling for notched devices
  const safeAreaInsets = ref({
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  })

  const calculateSafeAreaInsets = () => {
    if (typeof window === 'undefined' || !CSS.supports('padding-top', 'env(safe-area-inset-top)')) {
      return
    }

    safeAreaInsets.value = {
      top: `env(safe-area-inset-top, 0px)`,
      right: `env(safe-area-inset-right, 0px)`,
      bottom: `env(safe-area-inset-bottom, 0px)`,
      left: `env(safe-area-inset-left, 0px)`,
    }
  }

  // Computed styles for the page
  const pageStyles = computed(() => {
    const styles: Record<string, string> = {
      'max-width': props.maxWidth,
      margin: '0 auto',
      padding: responsivePadding.value,
    }

    // Add safe area padding if enabled and supported
    if (props.safeArea && CSS.supports('padding-top', 'env(safe-area-inset-top)')) {
      styles['padding-top'] =
        `calc(${responsivePadding.value.split(' ')[0]} + ${safeAreaInsets.value.top})`
      styles['padding-left'] =
        `calc(${responsivePadding.value.split(' ')[1]} + ${safeAreaInsets.value.left})`
      styles['padding-right'] =
        `calc(${responsivePadding.value.split(' ')[3] || responsivePadding.value.split(' ')[1]} + ${safeAreaInsets.value.right})`

      // Add bottom padding for mobile nav
      if (hasMobileNav.value) {
        const mobileNavHeight = '70px' // Height of bottom navigation
        styles['padding-bottom'] =
          `calc(${responsivePadding.value.split(' ')[2] || responsivePadding.value.split(' ')[0]} + ${safeAreaInsets.value.bottom} + ${mobileNavHeight})`
      } else {
        styles['padding-bottom'] =
          `calc(${responsivePadding.value.split(' ')[2] || responsivePadding.value.split(' ')[0]} + ${safeAreaInsets.value.bottom})`
      }
    } else if (hasMobileNav.value) {
      // Fallback for browsers without safe area support
      const mobileNavHeight = '70px'
      const currentPadding = responsivePadding.value.split(' ')
      styles['padding-bottom'] =
        `calc(${currentPadding[2] || currentPadding[0]} + ${mobileNavHeight})`
    }

    return styles
  })

  // Handle window resize
  const handleResize = () => {
    calculateSafeAreaInsets()
  }

  onMounted(() => {
    calculateSafeAreaInsets()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
</script>

<style scoped>
  .app-page {
    min-height: 100vh;
    background: var(--bg);
    position: relative;
  }

  .app-page-main {
    width: 100%;
    transition: padding 0.3s ease;
  }

  /* Mobile-specific adjustments */
  .has-mobile-nav {
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }

  /* Bottom navigation spacing for mobile */
  @media (max-width: 1023px) {
    .app-page-main {
      padding-bottom: 90px; /* Space for bottom navigation (70px nav + 20px clearance) */
    }
  }

  /* Touch-optimized spacing for mobile */
  @media (max-width: 768px) {
    .app-page-main {
      /* Ensure touch targets aren't too close to screen edges */
      padding-left: max(1rem, env(safe-area-inset-left, 1rem));
      padding-right: max(1rem, env(safe-area-inset-right, 1rem));
    }
  }

  /* Extra small screens */
  @media (max-width: 480px) {
    .app-page-main {
      /* More conservative padding for very small screens */
      padding-left: max(0.75rem, env(safe-area-inset-left, 0.75rem));
      padding-right: max(0.75rem, env(safe-area-inset-right, 0.75rem));
    }
  }

  /* Large screens */
  @media (min-width: 1280px) {
    .app-page-main {
      /* More generous padding on large screens */
      padding: 2.5rem 2rem;
    }
  }

  /* Ultra-wide screens */
  @media (min-width: 1536px) {
    .app-page-main {
      /* Prevent content from becoming too wide */
      max-width: 1200px;
    }
  }

  /* Print styles */
  @media print {
    .app-page {
      background: white;
    }

    .app-page-main {
      padding: 1rem;
      max-width: none;
    }

    .has-mobile-nav .app-page-main {
      padding-bottom: 1rem;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .app-page-main {
      transition: none;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
  }
</style>
