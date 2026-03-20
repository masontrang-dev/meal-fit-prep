import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type {
  GeneratedPlan,
  WeekHistory,
  RepeatWindows,
  FridgeEngineSettings,
} from "@/types/randomizer.types";
import { runFridgeEngine } from "@/data/fridgeEngine";
import { useShoppingStore } from "./shoppingStore";

export const useRandomizerStore = defineStore(
  "randomizer",
  () => {
    const pendingPlan = ref<GeneratedPlan | null>(null);
    const confirmedPlan = ref<GeneratedPlan | null>(null);
    const favoritePlan = ref<GeneratedPlan | null>(null);
    const weekHistory = ref<WeekHistory[]>([]);

    const repeatWindows = ref<RepeatWindows>({
      fishVariety: 2,
      fishSauce: 3,
      chickenCut: 1,
      chickenSauce: 3,
      castIronProtein: 2,
      castIronMarinade: 3,
      roastingVeg1: 2,
      roastingVeg2: 2,
      grain1: 2,
      grain2: 2,
      legume: 3,
    });

    const steakFrequencyWeeks = ref<number>(2);
    const shrimpFrequencyWeeks = ref<number>(3);

    const activePlan = computed(() => confirmedPlan.value ?? favoritePlan.value ?? null);

    const hasConfirmedPlan = computed(() => confirmedPlan.value !== null);
    const hasFavoritePlan = computed(() => favoritePlan.value !== null);
    const hasPendingPlan = computed(() => pendingPlan.value !== null);

    const engineSettings = computed<FridgeEngineSettings>(() => ({
      repeatWindows: repeatWindows.value,
      steakFrequencyWeeks: steakFrequencyWeeks.value,
      shrimpFrequencyWeeks: shrimpFrequencyWeeks.value,
    }));

    const saturdayPrepRequired = computed(() => pendingPlan.value?.saturdayPrepRequired ?? false);

    const lateGenerationWarning = computed(() => pendingPlan.value?.lateGenerationWarning ?? false);

    function generatePlan() {
      // If regenerating an existing pending plan, add it to history temporarily
      // to avoid repeating the same selections
      const tempHistory = pendingPlan.value
        ? [...weekHistory.value, planToHistory(pendingPlan.value)]
        : weekHistory.value;

      pendingPlan.value = runFridgeEngine(tempHistory, engineSettings.value);
    }

    function swapSlot(slotKey: keyof GeneratedPlan, excludeOvernight: boolean = false) {
      if (!pendingPlan.value) return;
      const overrides = excludeOvernight ? { [slotKey]: { excludeOvernight } } : undefined;
      const partial = runFridgeEngine(weekHistory.value, engineSettings.value, overrides);
      pendingPlan.value = {
        ...pendingPlan.value,
        ...partial,
      };
    }

    function confirmPlan() {
      if (!pendingPlan.value) return;
      confirmedPlan.value = {
        ...pendingPlan.value,
        confirmedAt: new Date().toISOString(),
      };
      weekHistory.value.push(planToHistory(confirmedPlan.value));
      pendingPlan.value = null;

      const shoppingStore = useShoppingStore();
      shoppingStore.updateFromPlan(confirmedPlan.value);
    }

    function saveAsFavorite() {
      if (!confirmedPlan.value) return;
      favoritePlan.value = { ...confirmedPlan.value };
    }

    function resetWeek() {
      confirmedPlan.value = null;
    }

    function resetSettings() {
      repeatWindows.value = {
        fishVariety: 2,
        fishSauce: 3,
        chickenCut: 1,
        chickenSauce: 3,
        castIronProtein: 2,
        castIronMarinade: 3,
        roastingVeg1: 2,
        roastingVeg2: 2,
        grain1: 2,
        grain2: 2,
        legume: 3,
      };
      steakFrequencyWeeks.value = 2;
      shrimpFrequencyWeeks.value = 3;
    }

    function planToHistory(plan: GeneratedPlan): WeekHistory {
      return {
        weekNumber: weekHistory.value.length + 1,
        fishVariety: plan.batchFishVariety,
        fishSauce: plan.batchFishSauce,
        chickenCut: plan.batchChickenCut,
        chickenSauce: plan.batchChickenSauce,
        castIronProtein: plan.castIronProtein,
        castIronMarinade: plan.castIronSauce,
        roastingVeg1: plan.roastingVeg1,
        roastingVeg2: plan.roastingVeg2,
        grain1: plan.grain1,
        grain2: plan.grain2,
        legume: plan.legume,
        confirmedAt: plan.confirmedAt ?? new Date().toISOString(),
      };
    }

    return {
      pendingPlan,
      confirmedPlan,
      favoritePlan,
      weekHistory,
      repeatWindows,
      steakFrequencyWeeks,
      shrimpFrequencyWeeks,
      activePlan,
      hasConfirmedPlan,
      hasFavoritePlan,
      hasPendingPlan,
      engineSettings,
      saturdayPrepRequired,
      lateGenerationWarning,
      generatePlan,
      swapSlot,
      confirmPlan,
      saveAsFavorite,
      resetWeek,
      resetSettings,
    };
  },
  {
    persist: true,
  },
);
