<script setup lang="ts">
import type { PrepStep } from "@/types/meal.types";
import { computed } from "vue";

const props = defineProps<{
  step: PrepStep;
}>();

const emit = defineEmits<{
  "ingredient-click": [ingredient: string];
}>();

const formatBody = (text: string): string => {
  // Make ingredient names clickable
  const ingredients = [
    "brown rice",
    "quinoa",
    "jasmine rice",
    "lentils",
    "pinto beans",
    "black beans",
    "chickpeas",
    "salmon",
    "tilapia",
    "cod",
    "mahi-mahi",
    "chicken thighs",
    "chicken breast",
    "flank steak",
    "sirloin steak",
    "shrimp",
    "broccoli",
    "asparagus",
    "green beans",
    "bell peppers",
    "mushrooms",
    "onion",
    "garlic",
  ];

  let formattedText = text;

  // Replace ingredient names with clickable spans
  ingredients.forEach((ingredient) => {
    const regex = new RegExp(`\\b${ingredient}\\b`, "gi");
    formattedText = formattedText.replace(
      regex,
      `<span class="ingredient-link" data-ingredient="${ingredient.toLowerCase()}">${ingredient}</span>`,
    );
  });

  // Apply existing formatting
  return formattedText
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

const handleBodyClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("ingredient-link")) {
    const ingredient = target.getAttribute("data-ingredient") || "";
    emit("ingredient-click", ingredient);
  }
};
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
        @click="handleBodyClick"
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

.prep-body-list :deep(.ingredient-link) {
  color: var(--green);
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 2px;
  cursor: pointer;
  transition: all 0.2s;
}

.prep-body-list :deep(.ingredient-link:hover) {
  color: var(--cast);
  text-decoration-style: solid;
}
</style>
