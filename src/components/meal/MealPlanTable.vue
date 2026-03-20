<script setup lang="ts">
import type { MealPlanDay } from '@/types/meal.types'
import MealPlanRow from './MealPlanRow.vue'

defineProps<{
  days: MealPlanDay[]
}>()
</script>

<template>
  <div class="data-table">
    <table class="w-full">
      <thead>
        <tr>
          <th class="text-left w-24">Day</th>
          <th class="text-left">Lunch</th>
          <th class="text-left">Dinner</th>
          <th class="text-left hidden md:table-cell">Grain/Legume</th>
        </tr>
      </thead>
      <tbody>
        <MealPlanRow v-for="day in days" :key="day.day" :day="day" />
      </tbody>
    </table>
  </div>
</template>
