<script setup lang="ts">
import { computed } from "vue";
import type { ActiveTimer } from "@/stores/timerStore";
import CookTimer from "./CookTimer.vue";

const props = defineProps<{
  timers: ActiveTimer[];
}>();

const emit = defineEmits<{
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

const activeTimers = computed(() => props.timers.filter((t) => !t.completed));
</script>

<template>
  <div v-if="activeTimers.length > 0" class="timer-bar">
    <div class="timer-bar-label">ACTIVE TIMERS</div>
    <div class="timer-bar-scroll">
      <div
        v-for="timer in activeTimers"
        :key="timer.id"
        class="timer-bar-item"
        @click="emit('timer-click', timer.id)"
      >
        <CookTimer
          :timer="timer"
          @sauce-alert-fired="emit('sauce-alert-fired', timer.id)"
          @timer-completed="emit('timer-completed', timer.id)"
          @confirm-sauce-applied="emit('confirm-sauce-applied', timer.id)"
          @skip-sauce="emit('skip-sauce', timer.id)"
          @pause="emit('pause', timer.id)"
          @resume="emit('resume', timer.id)"
          @reset="emit('reset', timer.id)"
          @delete="emit('delete', timer.id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Mobile layout - compact grid */
.timer-bar {
  background: var(--bg);
  padding: 16px;
  border-bottom: 1px solid var(--rule);
}

.timer-bar-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
  margin-bottom: 12px;
}

.timer-bar-scroll {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.timer-bar-item {
  cursor: pointer;
  transition: transform 0.2s;
}

.timer-bar-item:hover {
  transform: translateY(-2px);
}

/* Desktop layout - vertical sidebar on right */
@media (min-width: 768px) {
  .timer-bar {
    position: sticky;
    top: 80px;
    background: transparent;
    border-bottom: none;
    border-left: 1px solid var(--rule);
    padding: 0 0 0 20px;
    min-width: 240px;
    max-width: 240px;
    align-self: flex-start;
  }

  .timer-bar-label {
    color: var(--muted);
    margin-bottom: 10px;
    font-size: 0.7rem;
  }

  .timer-bar-scroll {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-x: visible;
    overflow-y: auto;
    padding: 4px 4px 0 4px; /* Reduce padding to prevent scroll */
    max-height: calc(100vh - 140px);
    scrollbar-width: thin;
    scrollbar-color: var(--rule) transparent;
  }

  .timer-bar-scroll::-webkit-scrollbar {
    width: 6px;
    height: auto;
  }

  .timer-bar-scroll::-webkit-scrollbar-thumb {
    background: var(--rule);
  }

  .timer-bar-item {
    flex-shrink: 0;
  }
}
</style>
