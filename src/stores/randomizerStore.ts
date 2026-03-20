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
      roastingVeg: 2,
      grain: 2,
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

    function generatePlan() {
      pendingPlan.value = runFridgeEngine(weekHistory.value, engineSettings.value);
    }

    function swapSlot(slotKey: keyof GeneratedPlan) {
      if (!pendingPlan.value) return;
      const partial = runFridgeEngine(weekHistory.value, engineSettings.value);
      pendingPlan.value = {
        ...pendingPlan.value,
        [slotKey]: partial[slotKey],
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
        roastingVeg: 2,
        grain: 2,
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
        roastingVeg: plan.roastingVeg,
        grain: plan.grain,
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
