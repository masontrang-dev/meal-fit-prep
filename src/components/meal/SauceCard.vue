<script setup lang="ts">
import type { Sauce } from "@/types/meal.types";
import StorageBadge from "@/components/ui/StorageBadge.vue";

defineProps<{
  sauce: Sauce;
}>();
</script>

<template>
  <div class="card p-4 sm:p-5">
    <h3 class="text-lg font-display font-semibold text-[var(--ink)] mb-1">
      {{ sauce.name }}
    </h3>
    <p v-if="sauce.marinating === 'minimum'" class="text-xs text-[var(--muted)] mb-2">
      Marinate 30 min – 4 hrs
    </p>
    <p v-if="sauce.marinating === 'overnight'" class="text-xs mb-2" style="color: var(--gold)">
      ⏰ Overnight marinade recommended
    </p>
    <p class="text-sm text-[var(--muted)] mb-4"><strong>Best for:</strong> {{ sauce.bestFor }}</p>

    <div class="mb-4">
      <h4 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
        Ingredients
      </h4>
      <ul class="space-y-1">
        <li
          v-for="(ingredient, idx) in sauce.ingredients"
          :key="idx"
          class="text-sm text-[var(--ink)] flex flex-wrap sm:flex-nowrap gap-1"
        >
          <span class="font-medium min-w-[80px]">{{ ingredient.amount }}</span>
          <span>{{ ingredient.name }}</span>
        </li>
      </ul>
    </div>

    <div class="mb-4">
      <h4 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
        Storage
      </h4>
      <div class="flex flex-wrap gap-2 mb-2">
        <StorageBadge
          v-for="location in sauce.storage.locations"
          :key="location"
          :type="location"
        />
        <StorageBadge v-if="sauce.storage.batchable" type="batch" />
      </div>
      <p class="text-sm text-[var(--ink)] leading-relaxed">
        <strong>Shelf life:</strong> {{ sauce.storage.shelfLife }}
      </p>
      <p class="text-xs text-[var(--muted)] mt-1 leading-relaxed">{{ sauce.storage.note }}</p>
    </div>

    <div
      class="text-sm text-[var(--ink)] italic border-t border-[var(--rule)] pt-3 leading-relaxed"
    >
      {{ sauce.applicationNote }}
    </div>
  </div>
</template>
