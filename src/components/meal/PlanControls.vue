<script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    currentState: 'empty' | 'favorite' | 'pending' | 'confirmed'
  }

  interface Emits {
    (e: 'generate'): void
    (e: 'confirm'): void
    (e: 'regenerate-all'): void
  }

  const props = defineProps<Props>()
  const emit = defineEmits<Emits>()

  const controlState = computed(() => {
    if (props.currentState === 'empty' || props.currentState === 'favorite') {
      return 'generate'
    }
    if (props.currentState === 'pending') {
      return 'confirm-regenerate'
    }
    if (props.currentState === 'confirmed') {
      return 'generate'
    }
    return 'generate'
  })

  function handleGenerate() {
    emit('generate')
  }

  function handleConfirm() {
    emit('confirm')
  }

  function handleRegenerateAll() {
    emit('regenerate-all')
  }
</script>

<template>
  <div class="plan-controls">
    <!-- State 1: Generate Week (for empty, favorite, confirmed states) -->
    <div v-if="controlState === 'generate'" class="generate-state">
      <div class="controls-content">
        <div class="controls-text">
          <h3 class="controls-title">
            <span v-if="currentState === 'empty'">🎯 Generate Your Week</span>
            <span v-else-if="currentState === 'favorite'">🔄 Generate New Week</span>
            <span v-else-if="currentState === 'confirmed'">✓ Plan Confirmed</span>
          </h3>
          <p class="controls-description">
            <span v-if="currentState === 'empty'">
              Create a personalized meal plan with proteins, vegetables, grains, and sauces
            </span>
            <span v-else-if="currentState === 'favorite'">
              Replace your saved favorite with a new randomized selection
            </span>
            <span v-else-if="currentState === 'confirmed'">
              ✓ Plan confirmed! Your shopping list has been updated and is ready via the navigation.
            </span>
          </p>
        </div>
        <div class="controls-actions">
          <button @click="handleGenerate" class="btn btn-primary btn-large">
            <span v-if="currentState === 'empty'">⚡ Generate Week</span>
            <span v-else>🔄 Generate New Week</span>
          </button>
        </div>
      </div>
    </div>

    <!-- State 2: Confirm & Regenerate (for pending state) -->
    <div v-else-if="controlState === 'confirm-regenerate'" class="confirm-regenerate-state">
      <div class="controls-content">
        <div class="controls-text">
          <h3 class="controls-title">✨ Review Your Plan</h3>
          <p class="controls-description">
            Review your randomized selection below. Make any swaps you'd like, then confirm when
            ready.
          </p>
        </div>
        <div class="controls-actions">
          <button @click="handleRegenerateAll" class="btn btn-secondary">🔄 Regenerate All</button>
          <button @click="handleConfirm" class="btn btn-primary">✓ Confirm Week</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .plan-controls {
    @apply bg-white border border-gray-200 rounded-lg shadow-sm;
    @apply p-4;
    @apply transition-all duration-200;
    min-height: 110px; /* Prevent height jumps with text variations */
  }

  .controls-content {
    @apply flex flex-col lg:flex-row lg:items-center lg:justify-between;
    @apply gap-4;
    min-height: 60px; /* Consistent height for content area */
  }

  .controls-text {
    @apply flex-1;
  }

  .controls-title {
    @apply text-xl font-semibold text-gray-900 mb-1;
    @apply flex items-center gap-2;
  }

  .controls-description {
    @apply text-gray-600 leading-snug;
    @apply max-w-2xl;
  }

  .controls-actions {
    @apply flex flex-row gap-3;
    @apply flex-shrink-0;
    @apply lg:w-auto;
    @apply items-center;
    @apply w-full;
  }

  .btn {
    @apply inline-flex items-center justify-center;
    @apply font-medium text-sm;
    @apply transition-all duration-200;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
    min-height: var(--touch-target);
    min-width: var(--touch-target);
    padding: var(--space-2) var(--space-5);
    border-radius: 8px;
    @apply whitespace-nowrap;
    @apply flex-1;
  }

  .btn-large {
    @apply px-6 py-3;
    @apply text-base font-semibold;
    @apply shadow-md hover:shadow-lg;
    @apply flex-1;
  }

  .btn-primary {
    @apply bg-green-600 text-white hover:bg-green-700;
    @apply focus:ring-green-500;
    @apply hover:scale-105 active:scale-95;
  }

  .btn-secondary {
    @apply bg-gray-100 text-gray-900 hover:bg-gray-200;
    @apply focus:ring-gray-500;
    @apply hover:scale-105 active:scale-95;
  }

  .btn:hover:not(:disabled) {
    @apply shadow-lg;
  }

  .btn:active:not(:disabled) {
    @apply transform scale-95;
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
    .plan-controls {
      @apply p-3;
    }

    .controls-title {
      @apply text-lg;
    }

    .controls-description {
      @apply text-sm;
    }

    .controls-actions {
      @apply gap-2;
    }

    .btn {
      @apply px-2 py-2 text-xs;
    }
  }
</style>
