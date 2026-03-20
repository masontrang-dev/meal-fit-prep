<script setup lang="ts">
import type { Breakfast } from "@/types/meal.types";

defineProps<{
  breakfast: Breakfast;
}>();
</script>

<template>
  <div class="card overflow-hidden">
    <div class="px-4 sm:px-5 py-4 border-b border-[var(--rule)]">
      <h3 class="text-lg font-display font-semibold text-[var(--ink)] mb-2">
        {{ breakfast.name }} Batch
      </h3>
      <div class="text-xs text-[var(--muted)] uppercase tracking-wide">
        <span>Sunday evening</span>
        <span class="mx-2">•</span>
        <span>{{ breakfast.batchRecipe.makes }}</span>
      </div>
    </div>

    <div class="px-4 sm:px-5 py-4 space-y-4">
      <div>
        <h4 class="text-sm font-semibold text-[var(--ink)] mb-2">Ingredients</h4>
        <ul class="space-y-1">
          <li
            v-for="(ingredient, idx) in breakfast.batchRecipe.ingredients"
            :key="idx"
            class="text-sm text-[var(--ink)] flex gap-2"
          >
            <span class="text-[var(--green)] font-bold">·</span>
            <span><strong>{{ ingredient.amount }}</strong> {{ ingredient.name }}</span>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="text-sm font-semibold text-[var(--ink)] mb-2">Steps</h4>
        <ol class="space-y-2">
          <li
            v-for="(step, idx) in breakfast.batchRecipe.steps"
            :key="idx"
            class="text-sm text-[var(--ink)] flex gap-3"
          >
            <span class="font-semibold text-[var(--green)] min-w-[1.5rem]">{{ idx + 1 }}.</span>
            <span>{{ step }}</span>
          </li>
        </ol>
      </div>

      <div class="pt-3 border-t border-[var(--rule)] space-y-1 text-sm text-[var(--ink)]">
        <p><strong>Makes:</strong> {{ breakfast.batchRecipe.makes }}</p>
        <p><strong>Keeps:</strong> {{ breakfast.batchRecipe.keeps }}</p>
        <p><strong>Reheat:</strong> {{ breakfast.batchRecipe.reheating }}</p>
      </div>

      <div
        v-if="breakfast.batchRecipe.alternativeMethod"
        class="pt-3 border-t border-[var(--rule)] text-sm text-[var(--ink)] italic leading-relaxed"
      >
        <strong>Alternative:</strong> {{ breakfast.batchRecipe.alternativeMethod }}
      </div>
    </div>
  </div>
</template>
