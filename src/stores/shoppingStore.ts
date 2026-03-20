import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { shoppingList } from "@/data/shopping";

export const useShoppingStore = defineStore(
  "shopping",
  () => {
    const items = ref<Record<string, boolean>>({});
    const weekLabel = ref<string>(
      "Week of " + new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    );

    // Initialize items from shopping data if not already populated
    const initializeItems = () => {
      if (Object.keys(items.value).length === 0) {
        shoppingList.forEach((item) => {
          items.value[item.id] = false;
        });
      }
    };

    // Call initialization immediately
    initializeItems();

    const toggle = (id: string) => {
      items.value[id] = !items.value[id];
    };

    const resetWeek = () => {
      Object.keys(items.value).forEach((key) => {
        items.value[key] = false;
      });
      weekLabel.value =
        "Week of " + new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };

    const checkedCount = computed(() => {
      return Object.values(items.value).filter((checked) => checked).length;
    });

    const totalCount = computed(() => {
      return Object.keys(items.value).length;
    });

    return {
      items,
      weekLabel,
      toggle,
      resetWeek,
      checkedCount,
      totalCount,
    };
  },
  {
    persist: true,
  },
);
