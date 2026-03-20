<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import type { ActiveTimer } from "@/stores/timerStore";

const props = defineProps<{
  timer: ActiveTimer;
}>();

const emit = defineEmits<{
  "sauce-alert-fired": [];
  "timer-completed": [];
  "confirm-sauce-applied": [];
  "skip-sauce": [];
  pause: [];
  resume: [];
  reset: [];
  delete: [];
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

const phaseLabel = computed(() => {
  if (!props.timer.sauceAlertAtMs) return "";
  return `Phase ${props.timer.phase} of 2`;
});

const sauceAlertText = computed(() => {
  if (!props.timer.sauceAlertAtMs) return "";
  const msUntilAlert = props.timer.sauceAlertAtMs - now.value;
  if (msUntilAlert <= 0 && props.timer.phase === 1) {
    return `⚠️ Apply ${props.timer.sauceName} now`;
  }
  const minutesUntilAlert = Math.ceil(msUntilAlert / 60000);
  if (minutesUntilAlert <= 10 && minutesUntilAlert > 0) {
    return `⚠️ ${props.timer.sauceName} at ${minutesUntilAlert} min`;
  }
  return props.timer.phase === 1 ? "✓ No mid-cook sauce" : "";
});

function tick() {
  now.value = Date.now();

  if (
    props.timer.sauceAlertAtMs &&
    now.value >= props.timer.sauceAlertAtMs &&
    props.timer.phase === 1 &&
    !props.timer.sauceApplied &&
    props.timer.status === "running"
  ) {
    emit("sauce-alert-fired");
  }

  if (remainingMs.value <= 0 && props.timer.status !== "completed" && props.timer.hasTimer) {
    emit("timer-completed");
  }
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
  <div class="cook-timer" :class="cardColor">
    <div class="timer-header">
      <div class="timer-label">{{ timer.label }}</div>
      <div v-if="phaseLabel" class="timer-phase">{{ phaseLabel }}</div>
    </div>

    <div v-if="timer.hasTimer" class="timer-display">
      {{ remainingDisplay }}
    </div>
    <div v-else class="timer-display-text">Hands off</div>

    <div v-if="sauceAlertText" class="timer-sauce-alert">
      {{ sauceAlertText }}
    </div>

    <div v-if="timer.status === 'paused-for-sauce'" class="timer-actions">
      <button @click="emit('confirm-sauce-applied')" class="btn-sauce-done">
        ✓ Done — Start {{ Math.floor((timer.endTime - timer.sauceAlertAtMs!) / 60000) }} min final
        timer
      </button>
      <button @click="emit('skip-sauce')" class="btn-sauce-skip">Skip sauce</button>
    </div>

    <div v-if="timer.expired" class="timer-expired">
      ⚠️ Expired {{ Math.floor((timer.expiredByMs ?? 0) / 60000) }} min ago
    </div>

    <div class="timer-spacer"></div>

    <!-- Timer controls -->
    <div v-if="!timer.completed && timer.status !== 'paused-for-sauce'" class="timer-controls">
      <button
        v-if="timer.status === 'paused'"
        @click="emit('resume')"
        class="btn-control btn-resume btn-full-width"
        title="Resume timer"
      >
        ▶ Resume
      </button>
      <button
        v-else-if="timer.status === 'running' || timer.status === 'phase-2'"
        @click="emit('pause')"
        class="btn-control btn-pause btn-full-width"
        title="Pause timer"
      >
        ⏸ Pause
      </button>

      <div class="timer-controls-row">
        <button @click="emit('reset')" class="btn-control btn-reset" title="Reset timer">
          ↻ Reset
        </button>
        <button @click="emit('delete')" class="btn-control btn-delete" title="Delete timer">
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cook-timer {
  border: 1px solid var(--rule);
  border-radius: 6px;
  padding: 10px;
  width: 100%;
  background: var(--paper);
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  cursor: pointer;
}

.cook-timer:hover {
  border-color: var(--green);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Desktop - more compact cards */
@media (min-width: 768px) {
  .cook-timer {
    padding: 12px;
    min-width: 200px;
    width: 200px;
  }
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

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.timer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.timer-label {
  font-family: "Jost", sans-serif;
  color: var(--ink);
  margin-bottom: 4px;
  text-align: center;
  line-height: 1.2;
  font-size: 0.85rem;
  font-weight: 600;
}

.timer-phase {
  font-size: 0.65rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
}

.timer-display {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: "Jost", sans-serif;
  text-align: center;
  color: var(--ink);
  margin: 6px 0;
}

.timer-display-text {
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
  color: var(--muted);
  margin: 8px 0;
}

.timer-sauce-alert {
  font-size: 0.65rem;
  font-weight: 600;
  text-align: center;
  color: var(--orange);
  margin-top: 4px;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.2;
  padding: 0 4px;
}

/* Desktop - slightly larger text */
@media (min-width: 768px) {
  .timer-phase {
    font-size: 0.7rem;
    margin: 8px 0;
  }

  .timer-sauce-alert {
    font-size: 0.7rem;
    margin-top: 6px;
    min-height: 28px;
  }

  .timer-display {
    font-size: 1.75rem;
  }
}

.timer-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.btn-sauce-done,
.btn-sauce-skip {
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-sauce-done {
  background: var(--green);
  color: white;
}

.btn-sauce-done:hover {
  background: #2d5a3c;
}

.btn-sauce-skip {
  background: var(--bg);
  color: var(--ink);
  border: 1px solid var(--rule);
}

.btn-sauce-skip:hover {
  background: var(--rule);
}

.timer-expired {
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  color: var(--red);
  margin-top: 8px;
}

.timer-paused {
  border-color: var(--muted);
  background: var(--bg);
  opacity: 0.8;
}

.timer-spacer {
  flex: 1;
}

.timer-controls {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--rule);
}

.timer-controls-row {
  display: flex;
  gap: 6px;
}

.btn-control {
  flex: 1;
  padding: 4px 8px;
  border: 1px solid var(--rule);
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  background: var(--paper);
  color: var(--muted);
  font-family: "Jost", sans-serif;
}

/* Desktop - slightly larger buttons */
@media (min-width: 768px) {
  .timer-controls {
    gap: 8px;
    margin-top: 10px;
    padding-top: 10px;
  }

  .timer-controls-row {
    gap: 8px;
  }

  .btn-control {
    padding: 6px 10px;
    font-size: 0.75rem;
  }
}

.btn-full-width {
  width: 100%;
}

.btn-control:hover {
  background: var(--bg);
  color: var(--ink);
}

.btn-control:active {
  transform: scale(0.98);
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
  font-size: 0.7rem;
}

.btn-delete:hover {
  background: var(--red-light);
  color: var(--red);
  border-color: var(--red);
}
</style>
