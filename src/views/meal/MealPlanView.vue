<script setup lang="ts">
import { weeklyMealPlan } from '@/data/mealPlan'
import MealPlanTable from '@/components/meal/MealPlanTable.vue'
import CalloutBox from '@/components/ui/CalloutBox.vue'
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-display font-semibold text-ink">Weekly Meal Plan</h2>
      <p class="text-muted mt-2">6 lunches + 6 dinners, Monday through Saturday</p>
    </div>

    <MealPlanTable :days="weeklyMealPlan" />

    <CalloutBox variant="orange">
      <p><strong>Thursday Lunch:</strong> Use leftover steak from Wednesday's cast iron dinner. Slice thin against the grain and serve over greens or with your grain of choice.</p>
    </CalloutBox>

    <CalloutBox variant="blue">
      <p><strong>Saturday Dinner:</strong> Taco night with ground turkey or dining out. This is your flex meal to enjoy something different or use up any remaining ingredients.</p>
    </CalloutBox>
  </div>
</template>
