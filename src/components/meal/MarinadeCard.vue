<script setup lang="ts">
import type { Marinade } from '@/types/meal.types'

defineProps<{
  marinade: Marinade
}>()

const getTimingBadgeClass = (timing: 'sunday' | 'tuesday'): string => {
  if (timing === 'sunday') return 't-sunday'
  if (timing === 'tuesday') return 't-tuesday'
  return ''
}

const getTimingLabel = (timing: 'sunday' | 'tuesday'): string => {
  if (timing === 'sunday') return 'Sunday Prep'
  if (timing === 'tuesday') return 'Tuesday Prep'
  return ''
}
</script>

<template>
  <div class="card">
    <div class="flex items-start justify-between mb-3">
      <h3 class="text-lg font-display font-semibold text-[var(--ink)]">
        {{ marinade.name }}
      </h3>
      <span class="text-xs font-semibold uppercase px-2 py-1 rounded" :class="getTimingBadgeClass(marinade.timing)">
        {{ getTimingLabel(marinade.timing) }}
      </span>
    </div>

    <p class="text-sm text-[var(--muted)] mb-4">
      <strong>Best for:</strong> {{ marinade.bestFor }}
    </p>

    <div class="mb-4">
      <h4 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
        Ingredients
      </h4>
      <ul class="space-y-1">
        <li
          v-for="(ingredient, idx) in marinade.ingredients"
          :key="idx"
          class="text-sm text-[var(--ink)] flex"
        >
          <span class="font-medium min-w-[80px]">{{ ingredient.amount }}</span>
          <span>{{ ingredient.name }}</span>
        </li>
      </ul>
    </div>

    <div v-if="marinade.note" class="text-sm text-[var(--ink)] italic border-t border-[var(--rule)] pt-3">
      {{ marinade.note }}
    </div>
  </div>
</template>
