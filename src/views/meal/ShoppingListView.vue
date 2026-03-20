<script setup lang="ts">
import { computed } from "vue";
import { shoppingList } from "@/data/shopping";
import { useShoppingStore } from "@/stores/shoppingStore";
import ShoppingCategory from "@/components/meal/ShoppingCategory.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";

const store = useShoppingStore();

const categories = computed(() => {
  const grouped: Record<string, typeof shoppingList> = {};
  shoppingList.forEach((item) => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category]!.push(item);
  });
  return grouped;
});

const categoryOrder = ["Proteins", "Grains & Legumes", "Vegetables", "Pantry", "Dairy"];

const handleToggle = (itemId: string) => {
  store.toggle(itemId);
};

const handleReset = () => {
  if (confirm("Reset shopping list for a new week? This will uncheck all items.")) {
    store.resetWeek();
  }
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-2xl font-display font-semibold text-ink">Shopping List</h2>
        <p class="text-sm text-muted mt-1">{{ store.weekLabel }}</p>
      </div>
      <div class="flex flex-col sm:text-right gap-2">
        <p class="text-sm text-muted">{{ store.checkedCount }} / {{ store.totalCount }} items</p>
        <button
          @click="handleReset"
          class="px-4 py-2 text-sm bg-green text-white rounded hover:opacity-90 transition-opacity min-h-[44px]"
        >
          Reset Week
        </button>
      </div>
    </div>

    <CalloutBox variant="blue">
      <p>
        <strong>Marinade Selection:</strong> Choose one marinade from the Cast Iron tab and add
        those ingredients to your list.
      </p>
    </CalloutBox>

    <div class="space-y-6">
      <ShoppingCategory
        v-for="category in categoryOrder"
        :key="category"
        :category="category"
        :items="categories[category] || []"
        @toggle="handleToggle"
      />
    </div>
  </div>
</template>
