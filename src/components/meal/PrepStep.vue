<script setup lang="ts">
import type { PrepStep } from "@/types/meal.types";
import { computed } from "vue";

const props = defineProps<{
  step: PrepStep;
}>();

const formatBody = (text: string): string => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n- /g, "\n<li>")
    .replace(/^- /g, "<li>")
    .replace(/<li>/g, "</li><li>")
    .replace(/<\/li><li>/, "<li>")
    .replace(/\n\n/g, "<br><br>");
};

const hasListItems = computed(
  () => props.step.body.includes("\n- ") || props.step.body.includes("- "),
);
</script>

<template>
  <div class="relative mb-6">
    <!-- Colored dot with label -->
    <div
      class="absolute -left-7 top-1 w-5 h-5 rounded-full flex items-center justify-center text-[0.6rem] font-bold text-white z-10"
      :style="{ background: step.dotColor }"
    >
      {{ step.dotLabel || step.elapsedMin }}
    </div>

    <div>
      <div class="text-[0.63rem] font-semibold uppercase tracking-widest text-[var(--muted)] mb-1">
        {{ step.duration }}
      </div>
      <h4 class="font-display text-[1.15rem] font-bold text-[var(--ink)] mb-1">
        {{ step.title }}
      </h4>
      <div
        class="text-[0.81rem] leading-[1.75] text-[#5c5045]"
        :class="{ 'prep-body-list': hasListItems }"
        v-html="formatBody(step.body)"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.prep-body-list :deep(strong) {
  color: var(--ink);
  font-weight: 600;
}

.prep-body-list :deep(li) {
  margin-left: 18px;
  line-height: 2.1;
}
</style>
