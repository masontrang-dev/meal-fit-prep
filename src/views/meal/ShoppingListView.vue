<script setup lang="ts">
import { computed, ref } from "vue";
import { useShoppingStore } from "@/stores/shoppingStore";
import ShoppingCategory from "@/components/meal/ShoppingCategory.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";
import StorageBadge from "@/components/ui/StorageBadge.vue";
import AppPage from "@/components/layout/AppPage.vue";

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

  // Sort each category: unchecked items first, then checked items
  Object.keys(grouped).forEach((category) => {
    grouped[category] = grouped[category]!.sort((a, b) => {
      const aChecked = store.items[a.id] || false;
      const bChecked = store.items[b.id] || false;

      // If one is checked and the other isn't, unchecked comes first
      if (aChecked !== bChecked) {
        return aChecked ? 1 : -1;
      }

      // Otherwise maintain original order
      return 0;
    });
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
  <AppPage>
    <div class="max-w-[980px] mx-auto">
      <div class="flex items-center justify-between mb-6">
        <p class="text-xs font-medium text-[var(--muted)] leading-relaxed flex-1">
          For 2 people · 6 lunches + 6 dinners. Check off sauces you already have batched to cross
          off their ingredients and move them to the bottom of each category.
        </p>
        <button
          @click="handleReset"
          class="badge badge-best px-4 py-2 min-h-[44px] whitespace-nowrap hover:opacity-90 transition-opacity"
          aria-label="Reset shopping list for new week"
        >
          Reset Week
        </button>
      </div>

      <!-- Sauce Batch Checklist -->
      <div v-if="store.sauceItems && store.sauceItems.length > 0" class="card p-4 mb-6">
        <h3 class="font-display text-lg font-semibold text-[var(--ink)] mb-3">
          🍯 Sauces & Marinades This Week
        </h3>
        <p class="text-xs font-medium text-[var(--muted)] mb-3">
          Check off sauces you already have batched. Their ingredients will be crossed off and moved
          to the bottom of each category.
        </p>
        <div class="space-y-2">
          <label
            v-for="sauce in store.sauceItems"
            :key="sauce.id"
            class="flex items-center gap-3 p-3 rounded cursor-pointer hover:bg-[var(--paper)] transition-colors"
            :class="{ 'bg-[var(--paper)]': store.batchedSauces[sauce.id] }"
          >
            <input
              type="checkbox"
              :checked="store.batchedSauces[sauce.id]"
              @change="store.toggleSauceBatch(sauce.id)"
              class="w-5 h-5 rounded border-2 border-[var(--rule)] cursor-pointer"
            />
            <div class="flex-1 flex items-center gap-2">
              <span class="text-sm font-medium text-[var(--ink)]">{{ sauce.name }}</span>
              <StorageBadge v-if="sauce.batchable" type="batch" />
              <StorageBadge v-else type="fresh" />
            </div>
            <span v-if="store.batchedSauces[sauce.id]" class="text-xs text-[var(--green)]">
              ✓ Already batched
            </span>
          </label>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
  </AppPage>
</template>
