<script setup lang="ts">
import type { Protein } from "@/types/meal.types";
import { computed } from "vue";

const props = defineProps<{
  protein: Protein;
}>();

const headerStyle = computed(() => {
  switch (props.protein.id) {
    case "fish":
      return {
        background: "var(--blue-light)",
        color: "var(--blue)",
      };
    case "chicken-thigh":
    case "chicken-breast":
      return {
        background: "var(--orange-light)",
        color: "var(--orange)",
      };
    case "steak":
      return {
        background: "var(--gold-light)",
        color: "var(--gold)",
      };
    default:
      return {
        background: "var(--green-light)",
        color: "var(--green)",
      };
  }
});

const formatText = (text: string): string => {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
};
</script>

<template>
  <div class="card overflow-hidden transition-shadow duration-200 hover:shadow-sm">
    <div
      class="px-4 sm:px-5 py-4 flex items-start gap-4"
      :style="{ background: headerStyle.background }"
    >
      <span class="text-2xl sm:text-3xl">{{ protein.icon }}</span>
      <div class="flex-1">
        <h3 class="text-xl font-display font-semibold mb-1" :style="{ color: headerStyle.color }">
          {{ protein.name }}
        </h3>
        <p
          class="text-xs sm:text-sm font-semibold uppercase tracking-wide"
          :style="{ color: headerStyle.color, opacity: 0.7 }"
        >
          {{ protein.mealsPerWeek }} • {{ protein.weeklyQuantity }}
        </p>
      </div>
    </div>

    <div class="px-4 sm:px-5 py-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-[var(--ink)] leading-relaxed">
        <div>
          <p
            class="whitespace-pre-line"
            v-html="'<strong>Buy:</strong> ' + formatText(protein.buyGuidance)"
          ></p>
        </div>
        <div>
          <p
            class="whitespace-pre-line"
            v-html="'<strong>Cooking:</strong> ' + formatText(protein.cookMethod)"
          ></p>
          <div v-if="protein.stats.length > 0" class="flex flex-wrap gap-2 mt-3">
            <span
              v-for="(stat, idx) in protein.stats"
              :key="idx"
              class="inline-block bg-[var(--bg)] border border-[var(--rule)] px-2 py-1 text-xs font-semibold"
            >
              {{ stat }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
