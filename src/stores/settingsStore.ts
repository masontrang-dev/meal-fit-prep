import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore(
  "settings",
  () => {
    const servings = ref<1 | 2 | 3>(2);
    const lastResetDate = ref<string | null>(null);

    const setServings = (n: 1 | 2 | 3) => {
      servings.value = n;
    };

    return {
      servings,
      lastResetDate,
      setServings,
    };
  },
  {
    persist: true,
  },
);
