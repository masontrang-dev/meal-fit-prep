<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import type { ActiveTimer } from "@/stores/timerStore";

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

const now = ref(Date.now());
let intervalId: number | null = null;
const isCollapsed = ref(false);

const activeTimers = computed(() => props.timers.filter((t) => !t.completed));

const formatTime = (timer: ActiveTimer) => {
  if (!timer.hasTimer) return "Hands off";

  let remainingMs: number;

  if (timer.status === "paused") {
    remainingMs = timer.remainingMsWhenPaused || 0;
  } else if (timer.status === "paused-for-sauce") {
    return "Paused";
  } else {
    remainingMs = Math.max(0, timer.endTime - now.value);
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const getStatusIndicator = (timer: ActiveTimer) => {
  if (timer.completed) return "✓";
  if (timer.status === "paused") return "⏸";
  if (timer.status === "paused-for-sauce") return "⚠️";
  return "▶";
};

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const tick = () => {
  now.value = Date.now();
};

onMounted(() => {
  now.value = Date.now();
  intervalId = window.setInterval(tick, 1000);
});

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <!-- Collapsed state - just a button -->
  <div v-if="isCollapsed" class="hovering-timers-collapsed" @click="toggleCollapse">
    <span class="collapsed-icon">⏱️</span>
    <span class="collapsed-text">{{ activeTimers.length }} Active</span>
    <span class="collapsed-expand">▲</span>
  </div>

  <!-- Expanded state - full timer list -->
  <div v-else class="hovering-timers">
    <div class="hovering-timers-header">
      <span class="hovering-timers-title">Active Timers</span>
      <div class="header-controls">
        <span class="hovering-timers-count">{{ activeTimers.length }}</span>
        <button @click="toggleCollapse" class="collapse-btn">▼</button>
      </div>
    </div>
    <div class="hovering-timers-list">
      <div v-for="timer in activeTimers" :key="timer.id" class="hovering-timer-item">
        <div class="timer-main-row">
          <span class="timer-label">{{ timer.label }}</span>
          <span class="timer-time">{{ formatTime(timer) }}</span>
        </div>
        <div
          v-if="!timer.completed && timer.status !== 'paused-for-sauce'"
          class="timer-controls-row"
        >
          <button
            v-if="timer.status === 'paused'"
            @click="emit('resume', timer.id)"
            class="timer-control-btn btn-resume"
            title="Resume timer"
          >
            ▶
          </button>
          <button
            v-else-if="timer.status === 'running' || timer.status === 'phase-2'"
            @click="emit('pause', timer.id)"
            class="timer-control-btn btn-pause"
            title="Pause timer"
          >
            ⏸
          </button>
          <button
            @click="emit('reset', timer.id)"
            class="timer-control-btn btn-reset"
            title="Reset timer"
          >
            ↻
          </button>
          <button
            @click="emit('delete', timer.id)"
            class="timer-control-btn btn-delete"
            title="Delete timer"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hovering-timers {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--paper);
  border-top: 1px solid var(--rule);
  padding: 10px 16px;
  box-shadow: 0 -2px 8px rgba(42, 35, 24, 0.1);
  z-index: 1000;
  font-family: "Jost", sans-serif;
}

.hovering-timers-collapsed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--paper);
  border-top: 1px solid var(--rule);
  padding: 8px 16px;
  box-shadow: 0 -2px 8px rgba(42, 35, 24, 0.1);
  z-index: 1000;
  font-family: "Jost", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.hovering-timers-collapsed:hover {
  background: var(--bg);
}

.collapsed-icon {
  font-size: 0.8rem;
  opacity: 0.8;
}

.collapsed-text {
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--ink);
}

.collapsed-expand {
  font-size: 0.6rem;
  color: var(--muted);
  opacity: 0.7;
}

.hovering-timers-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--rule);
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hovering-timers-title {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.hovering-timers-count {
  font-size: 0.62rem;
  font-weight: 600;
  color: var(--ink);
  background: var(--bg);
  padding: 2px 6px;
  border-radius: 2px;
  border: 1px solid var(--rule);
}

.collapse-btn {
  background: transparent;
  border: none;
  color: var(--muted);
  font-size: 0.7rem;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 2px;
  transition: all 0.2s ease;
}

.collapse-btn:hover {
  background: var(--bg);
  color: var(--ink);
}

.hovering-timers-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 180px;
  overflow-y: auto;
}

.hovering-timers-list::-webkit-scrollbar {
  width: 4px;
}

.hovering-timers-list::-webkit-scrollbar-thumb {
  background: var(--rule);
  border-radius: 2px;
}

.hovering-timer-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px 0;
  font-size: 0.75rem;
  line-height: 1.4;
}

.timer-main-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.timer-controls-row {
  display: flex;
  gap: 4px;
  justify-content: flex-end;
  margin-top: 4px;
}

.timer-label {
  flex: 1;
  color: var(--ink);
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.timer-time {
  font-family: "Courier New", monospace;
  font-weight: 700;
  color: var(--ink);
  flex-shrink: 0;
  font-size: 0.75rem;
}

.timer-control-btn {
  background: transparent;
  border: 1px solid var(--rule);
  color: var(--muted);
  font-size: 0.7rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 3px;
  transition: all 0.15s ease;
  font-family: "Jost", sans-serif;
  min-width: 32px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timer-control-btn:hover {
  background: var(--bg);
  color: var(--ink);
}

.btn-resume {
  color: var(--green);
  border-color: var(--green-mid);
}

.btn-resume:hover {
  background: var(--green-light);
  color: var(--green);
  border-color: var(--green);
}

.btn-pause {
  color: var(--gold);
  border-color: #e8d090;
}

.btn-pause:hover {
  background: var(--gold-light);
  color: var(--gold);
  border-color: var(--gold);
}

.btn-reset {
  color: var(--blue);
  border-color: #b8cce8;
}

.btn-reset:hover {
  background: var(--blue-light);
  color: var(--blue);
  border-color: var(--blue);
}

.btn-delete {
  color: var(--muted);
  border-color: var(--rule);
}

.btn-delete:hover {
  background: var(--red-light);
  color: var(--red);
  border-color: var(--red);
}
</style>
