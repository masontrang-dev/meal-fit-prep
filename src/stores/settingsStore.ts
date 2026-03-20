import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore(
  "settings",
  () => {
    const servings = ref<1 | 2 | 3>(2);
    const lastResetDate = ref<string | null>(null);

    // Default batch sizes for sauce scaling (in lbs)
    const defaultBatchSizes = ref({
      fish: 3.0,
      chicken: 2.5,
      castIron: 1.0,
      shrimp: 1.0,
    });

    const setServings = (n: 1 | 2 | 3) => {
      servings.value = n;
    };

    const setBatchSize = (section: "fish" | "chicken" | "castIron" | "shrimp", lbs: number) => {
      defaultBatchSizes.value[section] = lbs;
    };

    return {
      servings,
      lastResetDate,
      defaultBatchSizes,
      setServings,
      setBatchSize,
    };
  },
  {
    persist: true,
  },
);
