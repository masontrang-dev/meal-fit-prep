<script setup lang="ts">
import { computed, ref, watch } from "vue";
import TimerBar from "./TimerBar.vue";
import CompactTimerToast from "./CompactTimerToast.vue";
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

const timerBarRef = ref<InstanceType<typeof TimerBar> | null>(null);
const toastTimer = ref<ActiveTimer | null>(null);
const showToast = ref(false);
let toastTimeoutId: number | null = null;

watch(
  () => props.timers.length,
  (newLength, oldLength) => {
    if (newLength > oldLength && newLength > 0) {
      const newestTimer = props.timers[props.timers.length - 1];
      if (!newestTimer.completed) {
        toastTimer.value = newestTimer;
        showToast.value = true;

        if (toastTimeoutId !== null) {
          clearTimeout(toastTimeoutId);
        }
        toastTimeoutId = window.setTimeout(() => {
          showToast.value = false;
        }, 5000);
      }
    }
  },
);

function handleToastClick() {
  if (toastTimer.value && timerBarRef.value) {
    timerBarRef.value.scrollToTimer(toastTimer.value.id);
    showToast.value = false;
    if (toastTimeoutId !== null) {
      clearTimeout(toastTimeoutId);
    }
  }
}

function handleToastClose() {
  showToast.value = false;
  if (toastTimeoutId !== null) {
    clearTimeout(toastTimeoutId);
  }
}
</script>

<template>
  <div class="cooking-mode">
    <div class="cooking-mode-header">
      <div class="cooking-mode-title">COOKING MODE</div>
      <button @click="emit('exit')" class="exit-btn">Exit ✕</button>
    </div>

    <div class="cooking-mode-body">
      <div class="cooking-mode-content">
        <slot />
      </div>

      <TimerBar
        ref="timerBarRef"
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

    <CompactTimerToast
      v-if="toastTimer"
      :timer="toastTimer"
      :show="showToast"
      @click="handleToastClick"
      @close="handleToastClose"
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

/* Desktop layout - sidebar on right */
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
