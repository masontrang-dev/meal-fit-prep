import { defineStore } from "pinia";
import { ref, computed } from "vue";

export type TimerStatus =
  | "idle"
  | "running"
  | "paused"
  | "paused-for-sauce"
  | "phase-2"
  | "completed"
  | "expired";

export interface ActiveTimer {
  id: string;
  label: string;
  phase: 1 | 2;
  status: TimerStatus;
  endTime: number;
  totalDurationMs: number;
  remainingMsWhenPaused?: number;
  sauceAlertAtMs?: number;
  sauceName?: string;
  sauceInstructions?: string;
  sauceApplied: boolean;
  hasTimer: boolean;
  completed: boolean;
  expired: boolean;
  expiredByMs?: number;
}

export const useTimerStore = defineStore(
  "timers",
  () => {
    const timers = ref<ActiveTimer[]>([]);

    function getRemainingMs(timerId: string): number {
      const timer = timers.value.find((t) => t.id === timerId);
      if (!timer || !timer.hasTimer) return 0;
      if (timer.status === "paused") return timer.remainingMsWhenPaused || 0;
      if (timer.status === "paused-for-sauce") return 0;
      return Math.max(0, timer.endTime - Date.now());
    }

    function startTimer(
      timer: Omit<ActiveTimer, "status" | "completed" | "expired" | "sauceApplied">,
    ) {
      const existing = timers.value.findIndex((t) => t.id === timer.id);
      const newTimer: ActiveTimer = {
        ...timer,
        status: "running",
        completed: false,
        expired: false,
        sauceApplied: false,
      };
      if (existing >= 0) {
        timers.value[existing] = newTimer;
      } else {
        timers.value.push(newTimer);
      }
    }

    function pauseTimer(timerId: string) {
      const timer = timers.value.find((t) => t.id === timerId);
      if (!timer || timer.status !== "running") return;

      timer.remainingMsWhenPaused = Math.max(0, timer.endTime - Date.now());
      timer.status = "paused";
    }

    function resumeTimer(timerId: string) {
      const timer = timers.value.find((t) => t.id === timerId);
      if (!timer || timer.status !== "paused") return;

      const remainingMs = timer.remainingMsWhenPaused || 0;
      timer.endTime = Date.now() + remainingMs;
      timer.status = timer.phase === 2 ? "phase-2" : "running";
      timer.remainingMsWhenPaused = undefined;
    }

    function resetTimer(timerId: string) {
      const timer = timers.value.find((t) => t.id === timerId);
      if (!timer) return;

      timer.endTime = Date.now() + timer.totalDurationMs;
      timer.status = "running";
      timer.phase = 1;
      timer.sauceApplied = false;
      timer.completed = false;
      timer.expired = false;
      timer.expiredByMs = undefined;
      timer.remainingMsWhenPaused = undefined;
    }

    function deleteTimer(timerId: string) {
      const index = timers.value.findIndex((t) => t.id === timerId);
      if (index >= 0) {
        timers.value.splice(index, 1);
      }
    }

    function confirmSauceApplied(timerId: string, phase2DurationMs: number) {
      const timer = timers.value.find((t) => t.id === timerId);
      if (!timer) return;
      timer.sauceApplied = true;
      timer.phase = 2;
      timer.status = "phase-2";
      timer.endTime = Date.now() + phase2DurationMs;
    }

    function skipSauce(timerId: string, remainingMs: number) {
      const timer = timers.value.find((t) => t.id === timerId);
      if (!timer) return;
      timer.sauceApplied = false;
      timer.phase = 2;
      timer.status = "phase-2";
      timer.endTime = Date.now() + remainingMs;
    }

    function completeTimer(timerId: string) {
      const timer = timers.value.find((t) => t.id === timerId);
      if (!timer) return;
      timer.status = "completed";
      timer.completed = true;
    }

    function clearCompleted() {
      timers.value = timers.value.filter((t) => !t.completed);
    }

    function clearAll() {
      timers.value = [];
    }

    function reconcileOnMount() {
      const now = Date.now();
      timers.value.forEach((timer) => {
        if (!timer.hasTimer || timer.completed) return;

        if (timer.status === "running" || timer.status === "phase-2") {
          if (timer.endTime <= now) {
            timer.expired = true;
            timer.expiredByMs = now - timer.endTime;
            timer.status = "expired";
          }
          if (
            timer.sauceAlertAtMs &&
            timer.sauceAlertAtMs <= now &&
            !timer.sauceApplied &&
            timer.phase === 1 &&
            timer.endTime > now
          ) {
            timer.status = "paused-for-sauce";
          }
        }
      });
    }

    const activeTimers = computed(() => timers.value.filter((t) => !t.completed));

    const hasActiveTimers = computed(() => activeTimers.value.length > 0);

    return {
      timers,
      activeTimers,
      hasActiveTimers,
      getRemainingMs,
      startTimer,
      pauseTimer,
      resumeTimer,
      resetTimer,
      deleteTimer,
      confirmSauceApplied,
      skipSauce,
      completeTimer,
      clearCompleted,
      clearAll,
      reconcileOnMount,
    };
  },
  {
    persist: true,
  },
);
