<script setup lang="ts">
import { ref } from "vue";
import type { Sauce } from "@/types/meal.types";
import StorageBadge from "@/components/ui/StorageBadge.vue";
import { formatIngredient } from "@/utils/sauceScaling";
import { useSettingsStore } from "@/stores/settingsStore";

const props = defineProps<{
  sauce: Sauce;
}>();

const settingsStore = useSettingsStore();
const expanded = ref(false);

// Get default batch size based on section
const getDefaultBatchSize = () => {
  const sectionMap: Record<string, keyof typeof settingsStore.defaultBatchSizes> = {
    fish: "fish",
    chicken: "chicken",
    "cast-iron": "castIron",
    shrimp: "shrimp",
  };
  const key = sectionMap[props.sauce.section];
  return key ? settingsStore.defaultBatchSizes[key] : 1.0;
};

const targetLbs = ref(getDefaultBatchSize());

const toggleExpanded = () => {
  expanded.value = !expanded.value;
};
</script>

<template>
  <div
    class="card p-4 sm:p-5 cursor-pointer hover:shadow-md transition-shadow"
    @click="toggleExpanded"
  >
    <!-- Collapsed State - Always Visible -->
    <div>
      <h3 class="text-lg font-display font-semibold text-[var(--ink)] mb-1">
        {{ sauce.name }}
      </h3>

      <p class="text-sm text-[var(--muted)] mb-2">
        <strong>{{ sauce.flavorProfile }}</strong>
      </p>

      <p class="text-sm text-[var(--muted)] mb-2"><strong>Best for:</strong> {{ sauce.bestFor }}</p>

      <!-- Key Indicators -->
      <div class="flex flex-wrap gap-2 mb-3">
        <span
          v-if="sauce.marinating === 'overnight'"
          class="text-xs px-2 py-1 rounded"
          style="background-color: var(--gold-bg); color: var(--gold)"
        >
          ⏰ Overnight
        </span>
        <span
          v-if="sauce.sundaySafe"
          class="text-xs px-2 py-1 rounded"
          style="background-color: var(--green-bg); color: var(--green)"
        >
          ✓ Sunday Safe
        </span>
        <span
          v-if="sauce.applicationTiming === 'last-ten'"
          class="text-xs px-2 py-1 rounded"
          style="background-color: var(--orange-bg); color: var(--orange)"
        >
          🍯 Last 10 min
        </span>
        <span
          v-if="sauce.applicationTiming === 'last-five'"
          class="text-xs px-2 py-1 rounded"
          style="background-color: var(--orange-bg); color: var(--orange)"
        >
          🧈 Last 5 min
        </span>
        <span
          v-if="sauce.applicationTiming === 'serving'"
          class="text-xs px-2 py-1 rounded"
          style="background-color: var(--plum-bg); color: var(--plum)"
        >
          🍽️ At serving
        </span>
      </div>

      <div class="flex flex-wrap gap-2">
        <StorageBadge
          v-for="location in sauce.storage.locations"
          :key="location"
          :type="location"
        />
        <StorageBadge v-if="sauce.storage.batchable" type="batch" />
      </div>
    </div>

    <!-- Expanded State - Shown on Click -->
    <div v-if="expanded" class="mt-4 pt-4 border-t border-[var(--rule)]">
      <!-- Temperature Adjustment Warning -->
      <div
        v-if="sauce.temperatureAdjustment.adjusted"
        class="mb-3 p-2 rounded"
        style="background-color: var(--orange-bg); border: 1px solid var(--orange)"
      >
        <p class="text-xs font-semibold" style="color: var(--orange)">
          🌡️ {{ sauce.temperatureAdjustment.note }}
        </p>
      </div>

      <!-- Quantity Selector -->
      <div class="mb-4 p-3 rounded" style="background-color: var(--paper)">
        <label class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2 block">
          Target Protein Weight
        </label>
        <input
          v-model.number="targetLbs"
          type="number"
          step="0.5"
          min="0.5"
          class="w-full px-3 py-2 border border-[var(--rule)] rounded text-sm"
          @click.stop
          @focus.stop
        />
        <p class="text-xs text-[var(--muted)] mt-1">
          {{ targetLbs }} lbs (ingredients scale automatically)
        </p>
      </div>

      <!-- Ingredients -->
      <div class="mb-4">
        <h4 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
          Ingredients
        </h4>
        <ul class="space-y-1">
          <li
            v-for="(ingredient, idx) in sauce.ingredients"
            :key="idx"
            class="text-sm text-[var(--ink)]"
          >
            {{ formatIngredient(ingredient, sauce, targetLbs) }}
          </li>
        </ul>
      </div>

      <!-- Method -->
      <div class="mb-4">
        <h4 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
          Method
        </h4>
        <ol class="space-y-2 list-decimal list-inside">
          <li
            v-for="(step, idx) in sauce.method"
            :key="idx"
            class="text-sm text-[var(--ink)] leading-relaxed"
          >
            {{ step }}
          </li>
        </ol>
      </div>

      <!-- Application -->
      <div class="mb-4">
        <h4 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
          Application
        </h4>
        <p class="text-sm text-[var(--ink)] leading-relaxed">
          {{ sauce.application }}
        </p>
      </div>

      <!-- Pairs With -->
      <div class="mb-4">
        <h4 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
          Pairs With
        </h4>
        <div class="space-y-2 text-sm">
          <p><strong>Proteins:</strong> {{ sauce.pairsWith.proteins.join(", ") }}</p>
          <p><strong>Grains:</strong> {{ sauce.pairsWith.grains.join(", ") }}</p>
          <p><strong>Vegetables:</strong> {{ sauce.pairsWith.vegetables.join(", ") }}</p>
        </div>
      </div>

      <!-- Storage Details -->
      <div class="mb-4">
        <h4 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
          Storage
        </h4>
        <p class="text-sm text-[var(--ink)] leading-relaxed">
          <strong>Shelf life:</strong> {{ sauce.storage.shelfLife }}
        </p>
        <p class="text-xs text-[var(--muted)] mt-1 leading-relaxed">{{ sauce.storage.note }}</p>
      </div>

      <!-- Tips -->
      <div v-if="sauce.tips" class="p-3 rounded" style="background-color: var(--green-bg)">
        <p class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1">Tips</p>
        <p class="text-sm text-[var(--ink)] leading-relaxed">{{ sauce.tips }}</p>
      </div>

      <!-- Dual Use Note -->
      <div v-if="sauce.dualUse" class="mt-3 p-3 rounded" style="background-color: var(--plum-bg)">
        <p class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1">
          Dual Use
        </p>
        <p class="text-sm text-[var(--ink)] leading-relaxed">{{ sauce.dualUse }}</p>
      </div>

      <p class="text-xs text-[var(--muted)] text-center mt-4">Click to collapse</p>
    </div>

    <p v-else class="text-xs text-[var(--muted)] text-center mt-3">Click for details</p>
  </div>
</template>
