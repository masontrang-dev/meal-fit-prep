import { defineStore } from "pinia";
import { ref } from "vue";
import type { MarinadeId } from "@/types/meal.types";

export interface SelectedProtein {
  role: "batch-fish" | "batch-chicken" | "cast-iron";
  proteinId: string;
  sauceId: string;
}

export const useMealStore = defineStore(
  "meal",
  () => {
    const selectedMarinade = ref<MarinadeId | null>(null);
    const selectedVegetables = ref<string[]>(["Broccoli"]);
    const selectedSauces = ref<string[]>([]);
    const selectedProteins = ref<SelectedProtein[]>([]);

    const setMarinade = (id: MarinadeId | null) => {
      selectedMarinade.value = id;
    };

    const toggleVegetable = (name: string) => {
      const idx = selectedVegetables.value.indexOf(name);
      if (idx >= 0) {
        selectedVegetables.value.splice(idx, 1);
      } else {
        selectedVegetables.value.push(name);
      }
    };

    const setVegetables = (names: string[]) => {
      selectedVegetables.value = [...names];
    };

    const toggleSauce = (id: string) => {
      const idx = selectedSauces.value.indexOf(id);
      if (idx >= 0) {
        selectedSauces.value.splice(idx, 1);
      } else {
        selectedSauces.value.push(id);
      }
    };

    const setSauces = (ids: string[]) => {
      selectedSauces.value = [...ids];
    };

    const setProteins = (proteins: SelectedProtein[]) => {
      selectedProteins.value = [...proteins];
    };

    return {
      selectedMarinade,
      selectedVegetables,
      selectedSauces,
      selectedProteins,
      setMarinade,
      toggleVegetable,
      setVegetables,
      toggleSauce,
      setSauces,
      setProteins,
    };
  },
  {
    persist: true,
  },
);
