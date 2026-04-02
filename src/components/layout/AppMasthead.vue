<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  import ServingsSelector from '@/components/ui/ServingsSelector.vue'

  const router = useRouter()
  const version = '1.3.2' // This will be updated automatically by deployment scripts

  // Feature filter badges state
  const filterBadges = ref([
    { id: 'weekly-plan', label: 'Weekly Plan', active: true },
    { id: 'whole-foods', label: 'Whole Foods', active: true },
    { id: 'diet-friendly', label: 'Diet Friendly', active: false },
    { id: 'flexible-prep', label: 'Flexible Prep', active: false },
  ])

  // Responsive behavior
  const isMobile = computed(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768
  })

  const isTablet = computed(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= 768 && window.innerWidth < 1024
  })

  // Smart scroll behavior
  const scrollY = ref(0)
  const isHeaderHidden = ref(false)
  const lastScrollDirection = ref('up')

  const handleScroll = () => {
    const currentScroll = window.scrollY
    const scrollDirection = currentScroll > scrollY.value ? 'down' : 'up'

    // Only hide if scrolling down and past threshold
    if (scrollDirection === 'down' && currentScroll > 100) {
      isHeaderHidden.value = true
    } else if (scrollDirection === 'up' || currentScroll <= 50) {
      isHeaderHidden.value = false
    }

    scrollY.value = currentScroll
    lastScrollDirection.value = scrollDirection
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  function navigateToHome() {
    router.push('/overview')
  }

  // Toggle filter badge
  const toggleFilter = (badgeId: string) => {
    const badge = filterBadges.value.find(b => b.id === badgeId)
    if (badge) {
      badge.active = !badge.active
      // Emit filter change to parent/store
      emitFilterChange()
    }
  }

  // Emit filter changes (could be connected to a store in future)
  const emitFilterChange = () => {
    const activeFilters = filterBadges.value.filter(badge => badge.active).map(badge => badge.id)

    // Dispatch to store or emit to parent
    console.log('Active filters:', activeFilters)
    // In a real implementation, this would update a Pinia store
    // or emit an event to the parent component
  }

  // Computed property for visible badges - simplified to max 2
  const visibleBadges = computed(() => {
    return filterBadges.value.slice(0, 2) // Show only 2 badges on all devices
  })
</script>

<template>
  <header
    class="masthead"
    :class="{
      'masthead-mobile': isMobile,
      'masthead-tablet': isTablet,
      'masthead-hidden': isHeaderHidden,
    }"
  >
    <div class="masthead-inner">
      <div class="masthead-content">
        <!-- Title Section -->
        <div class="masthead-title-section">
          <button @click="navigateToHome" class="masthead-title-button" aria-label="Go to home">
            <h1 class="masthead-title">🥗 MealFit</h1>
          </button>

          <!-- Feature pills - simplified to 2 max on all devices -->
          <div class="masthead-pills" v-if="!isMobile">
            <button
              v-for="badge in visibleBadges"
              :key="badge.id"
              :class="{ active: badge.active }"
              @click="toggleFilter(badge.id)"
              class="pill pill-interactive"
              :aria-label="`Toggle ${badge.label} filter`"
              :aria-pressed="badge.active"
            >
              {{ badge.label }}
            </button>
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

        <!-- Mobile Meta Info -->
        <div class="masthead-mobile-meta" v-if="isMobile">
          <span class="mobile-version">v{{ version }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
  .masthead {
    background: var(--ink);
    color: var(--bg);
    padding: 12px 16px 8px; /* Reduced by 50% */
    border-bottom: 3px solid var(--green);
    position: relative;
    min-height: 60px; /* Explicit min-height */
    transition: transform 0.3s ease;
  }

  .masthead-inner {
    max-width: 980px;
    margin: 0 auto;
  }

  .masthead-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .masthead-title-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .masthead-title-button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    text-align: center;
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
    font-size: clamp(1.5rem, 4vw, 2.5rem); /* Smaller size range */
    font-weight: 700;
    line-height: 1.1;
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
    justify-content: center;
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
    cursor: default;
  }

  .pill:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .pill-interactive {
    cursor: pointer;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    position: relative;
  }

  .pill-interactive:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-1px);
  }

  .pill-interactive:focus {
    outline: 2px solid var(--green);
    outline-offset: 2px;
  }

  .pill-interactive.active {
    background: var(--green);
    border-color: var(--green);
    color: var(--ink);
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
  }

  .pill-interactive.active:hover {
    background: color-mix(in srgb, var(--green) 90%, black);
    border-color: color-mix(in srgb, var(--green) 90%, black);
  }

  .masthead-meta {
    text-align: center;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    line-height: 1.4;
    margin-top: 4px;
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

  .masthead-mobile-meta {
    text-align: center;
    font-size: 0.55rem;
    color: rgba(255, 255, 255, 0.4);
    margin-top: 2px;
  }

  /* Mobile Styles - even more aggressive reduction */
  @media (max-width: 767px) {
    .masthead {
      padding: 8px 12px 6px; /* Further reduced for mobile */
      padding-top: max(8px, env(safe-area-inset-top, 8px));
      min-height: 48px; /* Mobile min-height */
    }

    .masthead-content {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }

    .masthead-title {
      font-size: clamp(1.25rem, 6vw, 1.8rem); /* Smaller on mobile */
      text-align: center;
    }

    .masthead-pills {
      margin-top: 8px;
      gap: 4px;
    }

    .pill {
      font-size: 0.6rem;
      padding: 2px 8px;
    }
  }

  /* Tablet Styles */
  @media (min-width: 768px) and (max-width: 1023px) {
    .masthead {
      padding: 10px 20px 8px; /* Reduced for tablet */
      min-height: 56px;
    }

    .masthead-content {
      gap: 16px;
    }

    .masthead-pills {
      margin-top: 6px;
    }
  }

  /* Hidden state for smart scroll behavior */
  .masthead-hidden {
    transform: translateY(-100%);
  }

  /* Ensure smooth transitions for scroll behavior */
  .masthead {
    will-change: transform;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .masthead-title-button,
    .pill,
    .pill-interactive {
      transition: none;
    }

    .pill-interactive:hover {
      transform: none;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .masthead {
      background: black;
      border-bottom-color: white;
    }
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    /* No additional dark mode styles needed */
  }
</style>
