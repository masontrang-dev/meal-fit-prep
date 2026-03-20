<script setup lang="ts">
import type { Protein } from '@/types/meal.types'

defineProps<{
  protein: Protein
}>()
</script>

<template>
  <div class="card">
    <div class="flex items-start justify-between mb-3">
      <div>
        <h3 class="text-xl font-display font-semibold text-[var(--ink)] mb-1">
          {{ protein.icon }} {{ protein.name }}
        </h3>
        <p class="text-sm text-[var(--muted)]">
          {{ protein.mealsPerWeek }} • {{ protein.weeklyQuantity }}
        </p>
      </div>
    </div>

    <div class="space-y-3">
      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1">
          Buy
        </h4>
        <p class="text-sm text-[var(--ink)]">{{ protein.buyGuidance }}</p>
      </div>

      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1">
          Cook
        </h4>
        <p class="text-sm text-[var(--ink)]">{{ protein.cookMethod }}</p>
      </div>

      <div>
        <h4 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1">
          Storage
        </h4>
        <p class="text-sm text-[var(--ink)]">{{ protein.storageNote }}</p>
      </div>

      <div v-if="protein.stats.length > 0">
        <h4 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1">
          Why This Works
        </h4>
        <ul class="text-sm text-[var(--ink)] space-y-1">
          <li v-for="(stat, idx) in protein.stats" :key="idx" class="flex items-start">
            <span class="mr-2">•</span>
            <span>{{ stat }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
