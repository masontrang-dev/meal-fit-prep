<script setup lang="ts">
import { computed, ref } from "vue";
import { useShoppingStore } from "@/stores/shoppingStore";
import ShoppingCategory from "@/components/meal/ShoppingCategory.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";

const store = useShoppingStore();
const showResetDialog = ref(false);

const categoryMap: Record<string, string> = {
  "🥩 Proteins": "Proteins",
  "🌾 Grains & Legumes": "Grains & Legumes",
  "🥦 Vegetables": "Vegetables",
  "🧂 Pantry": "Pantry",
  "🥛 Dairy": "Dairy",
};

const categories = computed(() => {
  const grouped: Record<string, Array<(typeof store.allItems)[number]>> = {};
  store.allItems.forEach((item) => {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category]!.push(item);
  });
  return grouped;
});

const categoryOrder = [
  "🥩 Proteins",
  "🌾 Grains & Legumes",
  "🥦 Vegetables",
  "🧂 Pantry",
  "🥛 Dairy",
];

const handleToggle = (itemId: string) => {
  store.toggle(itemId);
};

const handleReset = () => {
  showResetDialog.value = true;
};

const confirmReset = () => {
  store.resetWeek();
  showResetDialog.value = false;
};

const cancelReset = () => {
  showResetDialog.value = false;
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <p class="text-sm text-[var(--muted)] leading-relaxed flex-1">
        For 2 people · 6 lunches + 6 dinners. Tap items to check off as you shop. Breakfasts not
        included — shop separately based on what you want that week. Check which marinade you're
        making this week and add those ingredients if not already in your pantry.
      </p>
      <button
        @click="handleReset"
        class="ml-4 px-4 py-2 text-sm rounded hover:opacity-90 transition-opacity min-h-[44px] whitespace-nowrap"
        style="background-color: var(--green); color: white"
        aria-label="Reset shopping list for new week"
      >
        Reset Week
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
      <ShoppingCategory
        v-for="displayCategory in categoryOrder"
        :key="displayCategory"
        :category="displayCategory"
        :items="categories[categoryMap[displayCategory] || ''] || []"
        @toggle="handleToggle"
      />
    </div>

    <CalloutBox variant="green">
      <p>
        <strong>Costco runs worth it for:</strong> Frozen salmon bags, bulk chicken thighs, flank
        steak, lentils, quinoa, chia seeds. Roughly halves per-serving cost vs. regular grocery.
      </p>
    </CalloutBox>

    <!-- Reset Confirmation Dialog -->
    <ConfirmDialog
      :show="showResetDialog"
      title="Reset Shopping List?"
      message="This will uncheck all items and start a fresh week. Your previous selections will be cleared."
      confirm-text="Reset Week"
      cancel-text="Keep Current"
      variant="green"
      @confirm="confirmReset"
      @cancel="cancelReset"
    />
  </div>
</template>
