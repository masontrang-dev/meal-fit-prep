<script setup lang="ts">
import type { Marinade } from "@/types/meal.types";

const props = defineProps<{
  marinade: Marinade;
  isSelected?: boolean;
}>();

const emit = defineEmits<{
  select: [id: string];
}>();

const getTimingBadgeClass = (timing: "sunday" | "tuesday"): string => {
  if (timing === "sunday") return "t-sunday";
  if (timing === "tuesday") return "t-tuesday";
  return "";
};

const getTimingLabel = (timing: "sunday" | "tuesday"): string => {
  if (timing === "sunday") return "Sunday Prep";
  if (timing === "tuesday") return "Tuesday Prep";
  return "";
};

const handleClick = () => {
  emit("select", props.marinade.id);
};
</script>

<template>
  <div
    class="card p-4 cursor-pointer transition-all duration-200 hover:shadow-md active:scale-[0.98]"
    :class="{ 'ring-2 ring-[var(--green)] bg-[var(--green-light)]': isSelected }"
    @click="handleClick"
    role="button"
    :aria-pressed="isSelected"
    :aria-label="`Select ${marinade.name} marinade`"
    tabindex="0"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <div class="flex items-start justify-between gap-3 mb-3">
      <h3 class="text-lg font-display font-semibold text-[var(--ink)]">
        {{ marinade.name }}
      </h3>
      <span
        class="text-xs font-semibold uppercase px-2 py-1 rounded flex-shrink-0"
        :class="getTimingBadgeClass(marinade.timing)"
      >
        {{ getTimingLabel(marinade.timing) }}
      </span>
    </div>

    <p class="text-sm text-[var(--muted)] mb-4">
      <strong>Best for:</strong> {{ marinade.bestFor }}
    </p>

    <div class="mb-4">
      <h4 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
        Ingredients
      </h4>
      <ul class="space-y-1">
        <li
          v-for="(ingredient, idx) in marinade.ingredients"
          :key="idx"
          class="text-sm text-[var(--ink)] flex flex-wrap sm:flex-nowrap gap-1"
        >
          <span class="font-medium min-w-[80px]">{{ ingredient.amount }}</span>
          <span>{{ ingredient.name }}</span>
        </li>
      </ul>
    </div>

    <div
      v-if="marinade.note"
      class="text-sm text-[var(--ink)] italic border-t border-[var(--rule)] pt-3 leading-relaxed"
    >
      {{ marinade.note }}
    </div>
  </div>
</template>
