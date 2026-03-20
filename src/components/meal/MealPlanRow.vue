<script setup lang="ts">
import type { MealPlanDay } from '@/types/meal.types'
import ProteinPill from '@/components/ui/ProteinPill.vue'

defineProps<{
  day: MealPlanDay
}>()
</script>

<template>
  <tr>
    <td class="font-semibold">
      {{ day.day }}
      <span v-if="day.dayNote" class="block text-xs text-[var(--muted)] font-normal mt-1">
        {{ day.dayNote }}
      </span>
    </td>
    <td>
      <div class="mb-1">
        <ProteinPill :type="day.lunch.proteinType" />
      </div>
      <div class="text-sm text-[var(--ink)]">{{ day.lunch.label }}</div>
      <div class="text-xs text-[var(--muted)]">{{ day.lunch.detail }}</div>
    </td>
    <td>
      <div class="mb-1">
        <ProteinPill :type="day.dinner.proteinType" />
      </div>
      <div class="text-sm text-[var(--ink)]">{{ day.dinner.label }}</div>
      <div class="text-xs text-[var(--muted)]">{{ day.dinner.detail }}</div>
    </td>
    <td class="hidden md:table-cell text-sm">{{ day.grain }}</td>
  </tr>
</template>
