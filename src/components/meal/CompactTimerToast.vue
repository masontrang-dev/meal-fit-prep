<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import type { ActiveTimer } from "@/stores/timerStore";

const props = defineProps<{
  timer: ActiveTimer;
  show: boolean;
}>();

const emit = defineEmits<{
  click: [];
  close: [];
}>();

const now = ref(Date.now());
let intervalId: number | null = null;

const remainingMs = computed(() => {
  if (!props.timer.hasTimer) return 0;
  if (props.timer.status === "paused") return props.timer.remainingMsWhenPaused || 0;
  if (props.timer.status === "paused-for-sauce") return 0;
  return Math.max(0, props.timer.endTime - now.value);
});

const remainingDisplay = computed(() => {
  const totalSeconds = Math.floor(remainingMs.value / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

const cardColor = computed(() => {
  if (props.timer.completed) return "timer-grey";
  if (props.timer.status === "paused") return "timer-paused";
  if (props.timer.status === "paused-for-sauce") return "timer-red-flash";
  if (props.timer.status === "phase-2") return "timer-green";

  if (props.timer.sauceAlertAtMs && remainingMs.value > 0) {
    const msUntilAlert = props.timer.sauceAlertAtMs - now.value;
    if (msUntilAlert <= 0) return "timer-red-flash";
    if (msUntilAlert < 5 * 60 * 1000) return "timer-red";
  }

  return "timer-yellow";
});

function tick() {
  now.value = Date.now();
}

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
  <Transition name="slide-up">
    <div v-if="show" class="compact-timer-toast" :class="cardColor" @click="emit('click')">
      <div class="toast-content">
        <div class="toast-label">{{ timer.label }}</div>
        <div v-if="timer.hasTimer" class="toast-time">{{ remainingDisplay }}</div>
        <div v-else class="toast-time-text">Hands off</div>
      </div>
      <button @click.stop="emit('close')" class="toast-close" aria-label="Close">✕</button>
    </div>
  </Transition>
</template>

<style scoped>
.compact-timer-toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: var(--paper);
  border: 2px solid var(--rule);
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  max-width: 90vw;
  min-width: 280px;
}

.compact-timer-toast:hover {
  transform: translateX(-50%) translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.toast-label {
  font-family: "Cormorant Garamond", serif;
  font-size: 1rem;
  color: var(--ink);
  font-weight: 500;
}

.toast-time {
  font-size: 1.25rem;
  font-weight: 700;
  font-family: "Courier New", monospace;
  color: var(--ink);
  min-width: 60px;
}

.toast-time-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--muted);
}

.toast-close {
  background: transparent;
  border: none;
  color: var(--muted);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px 8px;
  line-height: 1;
  transition: color 0.2s;
}

.toast-close:hover {
  color: var(--ink);
}

.timer-yellow {
  border-color: #f59e0b;
  background: #fffbeb;
}

.timer-red {
  border-color: #ef4444;
  background: #fef2f2;
}

.timer-red-flash {
  border-color: #dc2626;
  background: #fee2e2;
  animation: pulse 1s ease-in-out infinite;
}

.timer-green {
  border-color: var(--green);
  background: var(--green-light);
}

.timer-grey {
  border-color: var(--rule);
  background: var(--bg);
  opacity: 0.6;
}

.timer-paused {
  border-color: var(--muted);
  background: var(--bg);
  opacity: 0.8;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

@media (min-width: 768px) {
  .compact-timer-toast {
    min-width: 320px;
  }

  .toast-label {
    font-size: 1.1rem;
  }

  .toast-time {
    font-size: 1.4rem;
  }
}
</style>
