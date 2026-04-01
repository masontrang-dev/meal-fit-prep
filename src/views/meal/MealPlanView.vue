<script setup lang="ts">
import { weeklyMealPlan } from "@/data/mealPlan";
import MealPlanTable from "@/components/meal/MealPlanTable.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";
import AppPage from "@/components/layout/AppPage.vue";
</script>

<template>
  <AppPage>
    <div class="max-w-[980px] mx-auto">
      <div class="mb-8">
        <h1 class="font-display text-3xl font-bold text-[var(--ink)] mb-4">Weekly Meal Plan</h1>
        <p class="text-sm text-[var(--muted)] leading-relaxed">
          6 lunches + 6 dinners, Monday through Saturday. Thursday uses leftover steak, Saturday is
          flex night.
        </p>
      </div>

      <div class="space-y-6">
        <MealPlanTable :days="weeklyMealPlan" />

        <CalloutBox variant="orange">
          <p>
            <strong>Thursday Lunch:</strong> Use leftover steak from Wednesday's cast iron dinner.
            Slice thin against the grain and serve over greens or with your grain of choice.
          </p>
        </CalloutBox>

        <CalloutBox variant="blue">
          <p>
            <strong>Saturday Dinner:</strong> Taco night with ground turkey or dining out. This is
            your flex meal to enjoy something different or use up any remaining ingredients.
          </p>
        </CalloutBox>
      </div>
    </div>
  </AppPage>
</template>
