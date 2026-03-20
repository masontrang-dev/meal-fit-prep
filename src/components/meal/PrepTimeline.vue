<script setup lang="ts">
import type { PrepStep as PrepStepType } from "@/types/meal.types";
import PrepStepComponent from "./PrepStep.vue";

defineProps<{
  steps: PrepStepType[];
}>();
</script>

<template>
  <div class="space-y-0">
    <PrepStepComponent v-for="step in steps" :key="step.id" :step="step" />
  </div>
</template>
