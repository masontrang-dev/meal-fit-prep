import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type {
  GeneratedPlan,
  WeekHistory,
  RepeatWindows,
  FridgeEngineSettings,
} from "@/types/randomizer.types";
import {
  runFridgeEngine,
  pickFrom,
  pickWeighted,
  getWeeksSince,
  buildCastIronPool,
  fishVarieties,
  fishSauces,
  chickenSauces,
  castIronMarinades,
  shrimpSauces,
  roastingVegetables,
  grains,
  legumes,
} from "@/data/fridgeEngine";
import { getSauceById } from "@/data/sauces";
import { useShoppingStore } from "./shoppingStore";
import { useMealStore } from "./mealStore";

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

    function formatVegId(id: string): string {
      return id
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    function syncMealStore(plan: GeneratedPlan) {
      const mealStore = useMealStore();
      mealStore.setVegetables([formatVegId(plan.roastingVeg1), formatVegId(plan.roastingVeg2)]);
      mealStore.setSauces([plan.batchFishSauce, plan.batchChickenSauce, plan.castIronSauce]);
      mealStore.setMarinade(plan.castIronSauce as any);
      mealStore.setProteins([
        { role: "batch-fish", proteinId: plan.batchFishVariety, sauceId: plan.batchFishSauce },
        { role: "batch-chicken", proteinId: plan.batchChickenCut, sauceId: plan.batchChickenSauce },
        { role: "cast-iron", proteinId: plan.castIronProtein, sauceId: plan.castIronSauce },
      ]);
    }

    function generatePlan() {
      // If regenerating an existing pending plan, add it to history temporarily
      // to avoid repeating the same selections
      const tempHistory = pendingPlan.value
        ? [...weekHistory.value, planToHistory(pendingPlan.value)]
        : weekHistory.value;

      pendingPlan.value = runFridgeEngine(tempHistory, engineSettings.value);
      syncMealStore(pendingPlan.value);
    }

    function swapSlot(slotKey: keyof GeneratedPlan, excludeOvernight: boolean = false) {
      if (!pendingPlan.value) return;

      const tempHistory = [...weekHistory.value, planToHistory(pendingPlan.value)];
      let newValue: any;

      switch (slotKey) {
        case "batchFishVariety":
          newValue = pickFrom("fishVariety", fishVarieties, tempHistory, engineSettings.value);
          break;

        case "batchFishSauce":
          const filteredFishSauces = excludeOvernight
            ? fishSauces.filter((id: string) => {
                const sauce = getSauceById(id);
                return sauce && sauce.marinating !== "overnight";
              })
            : fishSauces;
          newValue = pickFrom("fishSauce", filteredFishSauces, tempHistory, engineSettings.value);
          break;

        case "batchChickenCut":
          newValue = pickFrom(
            "chickenCut",
            ["thighs", "breast"],
            tempHistory,
            engineSettings.value,
          );
          break;

        case "batchChickenSauce":
          const filteredChickenSauces = excludeOvernight
            ? chickenSauces.filter((id: string) => {
                const sauce = getSauceById(id);
                return sauce && sauce.marinating !== "overnight";
              })
            : chickenSauces;
          newValue = pickFrom(
            "chickenSauce",
            filteredChickenSauces,
            tempHistory,
            engineSettings.value,
          );
          break;

        case "castIronProtein":
          const weeksSinceSteak = getWeeksSince("steak", tempHistory);
          const weeksSinceShrimp = getWeeksSince("shrimp", tempHistory);
          const castIronPool = buildCastIronPool({
            fishVarieties,
            batchFishVariety: pendingPlan.value.batchFishVariety,
            batchChickenCut: pendingPlan.value.batchChickenCut,
            steakEligible: weeksSinceSteak >= engineSettings.value.steakFrequencyWeeks,
            shrimpEligible: weeksSinceShrimp >= engineSettings.value.shrimpFrequencyWeeks,
            history: tempHistory,
            settings: engineSettings.value,
          });
          newValue = pickFrom("castIronProtein", castIronPool, tempHistory, engineSettings.value);
          break;

        case "castIronSauce":
          const isShrimp = pendingPlan.value.castIronProtein === "shrimp";
          const saucePool = isShrimp ? shrimpSauces : castIronMarinades;
          const filteredCastIronSauces = excludeOvernight
            ? saucePool.filter((id: string) => {
                const sauce = getSauceById(id);
                return sauce && sauce.marinating !== "overnight";
              })
            : saucePool;
          newValue = pickFrom(
            "castIronMarinade",
            filteredCastIronSauces,
            tempHistory,
            engineSettings.value,
          );
          break;

        case "roastingVeg1":
          newValue = pickWeighted(
            "roastingVeg1",
            roastingVegetables,
            tempHistory,
            engineSettings.value,
          );
          break;

        case "roastingVeg2":
          const eligibleVeg2 = roastingVegetables.filter(
            (v: any) => v.value !== pendingPlan.value!.roastingVeg1,
          );
          newValue = pickWeighted("roastingVeg2", eligibleVeg2, tempHistory, engineSettings.value);
          break;

        case "grain1":
          newValue = pickWeighted("grain1", grains, tempHistory, engineSettings.value);
          break;

        case "grain2":
          const eligibleGrain2 = grains.filter((g: any) => g.value !== pendingPlan.value!.grain1);
          newValue = pickWeighted("grain2", eligibleGrain2, tempHistory, engineSettings.value);
          break;

        case "legume":
          newValue = pickWeighted("legume", legumes, tempHistory, engineSettings.value);
          break;

        default:
          return;
      }

      pendingPlan.value = {
        ...pendingPlan.value,
        [slotKey]: newValue,
      };
      syncMealStore(pendingPlan.value);
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
