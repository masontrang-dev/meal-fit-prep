<script setup lang="ts">
import type { NutrientRow } from '@/types/meal.types'

defineProps<{
  nutrients: NutrientRow[]
}>()

const getStatusBadgeClass = (status: 'good' | 'watch' | 'low'): string => {
  if (status === 'good') return 'ns-good'
  if (status === 'watch') return 'ns-watch'
  if (status === 'low') return 'ns-low'
  return ''
}
</script>

<template>
  <div class="data-table">
    <table class="w-full">
      <thead>
        <tr>
          <th class="text-left">Nutrient</th>
          <th class="text-left">Status</th>
          <th class="text-left hidden md:table-cell">Primary Sources</th>
          <th class="text-left hidden lg:table-cell">Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="nutrient in nutrients" :key="nutrient.nutrient">
          <td class="font-medium">{{ nutrient.nutrient }}</td>
          <td>
            <span
              class="text-xs font-semibold uppercase px-2 py-1 rounded"
              :class="getStatusBadgeClass(nutrient.status)"
            >
              {{ nutrient.statusLabel }}
            </span>
          </td>
          <td class="hidden md:table-cell text-sm text-[var(--ink)]">
            {{ nutrient.sources }}
          </td>
          <td class="hidden lg:table-cell text-sm text-[var(--muted)]">
            {{ nutrient.notes }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
