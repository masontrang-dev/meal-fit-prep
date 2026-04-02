<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import ServingsSelector from '@/components/ui/ServingsSelector.vue'

  const router = useRouter()
  const version = '1.3.2' // This will be updated automatically by deployment scripts

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
    padding: 24px 32px 20px; /* Reduced by 30% */
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

  .masthead-mobile-meta {
    text-align: right;
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.5);
  }

  /* Mobile Styles */
  @media (max-width: 767px) {
    .masthead {
      padding: 16px 16px 12px; /* Further reduced for mobile */
      padding-top: max(16px, env(safe-area-inset-top, 16px));
    }

    .masthead-content {
      grid-template-columns: 1fr;
      gap: 12px;
      align-items: start;
    }

    .masthead-title {
      font-size: clamp(1.6rem, 8vw, 2.2rem); /* Smaller on mobile */
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
      padding: 20px 24px 16px; /* Reduced for tablet */
    }

    .masthead-content {
      gap: 16px;
    }

    .masthead-pills {
      margin-top: 10px;
    }
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .masthead-title-button,
    .pill {
      transition: none;
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
