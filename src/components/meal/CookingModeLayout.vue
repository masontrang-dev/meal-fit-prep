<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import TimerBar from "./TimerBar.vue";
import HoveringTimers from "./HoveringTimers.vue";
import type { ActiveTimer } from "@/stores/timerStore";

const props = defineProps<{
  timers: ActiveTimer[];
  activeStepIndex: number;
  totalSteps: number;
}>();

const emit = defineEmits<{
  exit: [];
  "timer-click": [timerId: string];
  "sauce-alert-fired": [timerId: string];
  "timer-completed": [timerId: string];
  "confirm-sauce-applied": [timerId: string];
  "skip-sauce": [timerId: string];
  pause: [timerId: string];
  resume: [timerId: string];
  reset: [timerId: string];
  delete: [timerId: string];
}>();

const isAtBottom = ref(true);
const showHoveringTimers = ref(false);

const checkScrollPosition = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Consider "at bottom" if within 100px of the bottom
  isAtBottom.value = scrollTop + windowHeight >= documentHeight - 100;

  // Show hovering timers on mobile only when not at bottom and there are active timers
  const isMobile = window.innerWidth < 768;
  const hasActiveTimers = props.timers.some((t) => !t.completed);
  showHoveringTimers.value = isMobile && !isAtBottom.value && hasActiveTimers;
};

// Re-check when timers change
watch(() => props.timers, checkScrollPosition, { deep: true });

onMounted(() => {
  window.addEventListener("scroll", checkScrollPosition);
  window.addEventListener("resize", checkScrollPosition);
  checkScrollPosition(); // Initial check
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScrollPosition);
  window.removeEventListener("resize", checkScrollPosition);
});
</script>

<template>
  <div class="cooking-mode">
    <div class="cooking-mode-header">
      <div class="cooking-mode-title">COOKING MODE</div>
      <button @click="emit('exit')" class="exit-btn">Exit ✕</button>
    </div>

    <!-- Full-width content area for meal summary -->
    <div class="cooking-mode-full-width">
      <slot name="full-width" />
    </div>

    <div class="cooking-mode-body">
      <div class="cooking-mode-content">
        <slot />
      </div>

      <TimerBar
        :timers="timers"
        @timer-click="emit('timer-click', $event)"
        @sauce-alert-fired="emit('sauce-alert-fired', $event)"
        @timer-completed="emit('timer-completed', $event)"
        @confirm-sauce-applied="emit('confirm-sauce-applied', $event)"
        @skip-sauce="emit('skip-sauce', $event)"
        @pause="emit('pause', $event)"
        @resume="emit('resume', $event)"
        @reset="emit('reset', $event)"
        @delete="emit('delete', $event)"
      />
    </div>

    <!-- Hovering timers for mobile when not at bottom -->
    <HoveringTimers
      v-if="showHoveringTimers"
      :timers="timers"
      @timer-click="emit('timer-click', $event)"
      @sauce-alert-fired="emit('sauce-alert-fired', $event)"
      @timer-completed="emit('timer-completed', $event)"
      @confirm-sauce-applied="emit('confirm-sauce-applied', $event)"
      @skip-sauce="emit('skip-sauce', $event)"
      @pause="emit('pause', $event)"
      @resume="emit('resume', $event)"
      @reset="emit('reset', $event)"
      @delete="emit('delete', $event)"
    />
  </div>
</template>

<style scoped>
.cooking-mode {
  min-height: 100vh;
}

.cooking-mode-header {
  background: var(--ink);
  color: var(--paper);
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--green);
}

/* Make header sticky only on desktop */
@media (min-width: 768px) {
  .cooking-mode-header {
    position: sticky;
    top: 0;
    z-index: 100;
  }
}

.cooking-mode-title {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.exit-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: var(--paper);
  padding: 6px 14px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.exit-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.cooking-mode-full-width {
  width: 100%;
  background: var(--bg);
  padding-top: 24px; /* Add space above meal summary */
}

.cooking-mode-body {
  display: flex;
  flex-direction: column;
}

.cooking-mode-content {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Desktop layout - sidebar on right for content area only */
@media (min-width: 768px) {
  .cooking-mode-body {
    flex-direction: row;
    align-items: flex-start;
    max-width: 1400px;
    margin: 0 auto;
    gap: 24px;
    padding: 24px;
  }

  .cooking-mode-content {
    flex: 1;
    padding: 0;
    max-width: none;
    margin: 0;
  }
}
</style>
