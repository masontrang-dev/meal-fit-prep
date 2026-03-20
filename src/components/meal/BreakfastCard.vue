<script setup lang="ts">
import type { Breakfast } from "@/types/meal.types";

defineProps<{
  breakfast: Breakfast;
}>();
</script>

<template>
  <div class="card overflow-hidden">
    <div class="px-4 sm:px-5 py-4 flex items-start gap-4 bg-[var(--paper)] border-b border-[var(--rule)]">
      <span class="text-2xl sm:text-3xl">{{ breakfast.icon }}</span>
      <div class="flex-1">
        <h3 class="text-xl font-display font-semibold mb-1 text-[var(--ink)]">
          {{ breakfast.name }}
        </h3>
        <p class="text-xs sm:text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          {{ breakfast.subtitle }}
        </p>
      </div>
    </div>

    <div class="px-4 sm:px-5 py-4">
      <p class="text-sm text-[var(--ink)] leading-relaxed whitespace-pre-line mb-4">
        {{ breakfast.description }}
      </p>

      <div class="space-y-1">
        <p
          v-for="(topping, idx) in breakfast.toppings"
          :key="idx"
          class="text-sm text-[var(--ink)] flex items-start gap-2"
        >
          <span class="text-[var(--green)] font-bold">·</span>
          <span>{{ topping }}</span>
        </p>
      </div>

      <div
        v-if="breakfast.granolaNotes"
        class="mt-4 pt-4 border-t border-[var(--rule)] text-sm text-[var(--ink)] italic leading-relaxed"
      >
        {{ breakfast.granolaNotes }}
      </div>
    </div>
  </div>
</template>
