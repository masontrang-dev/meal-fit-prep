<script setup lang="ts">
import type { PrepStep as PrepStepType } from "@/types/meal.types";
import PrepStepComponent from "./PrepStep.vue";

defineProps<{
  steps: PrepStepType[];
}>();
</script>

<template>
  <div class="relative pl-8 mb-7">
    <!-- Vertical timeline line -->
    <div class="absolute left-[10px] top-[6px] bottom-[6px] w-[2px] bg-[var(--rule)]"></div>

    <PrepStepComponent v-for="step in steps" :key="step.id" :step="step" />
  </div>
</template>
