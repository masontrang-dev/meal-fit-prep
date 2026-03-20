<script setup lang="ts">
import type { Sauce } from "@/types/meal.types";

const props = defineProps<{
  marinade: Sauce;
  isSelected?: boolean;
}>();

const emit = defineEmits<{
  select: [id: string];
}>();

function getMarinadeBadge(sauce: Sauce): { label: string; variant: string } {
  if (sauce.marinating === "overnight" && sauce.sundaySafe) {
    return { label: "Start Saturday", variant: "t-saturday" };
  }
  if (sauce.sundaySafe) {
    return { label: "Sunday Safe", variant: "t-sunday" };
  }
  return { label: "Tuesday Only", variant: "t-tuesday" };
}

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
        :class="getMarinadeBadge(marinade).variant"
      >
        {{ getMarinadeBadge(marinade).label }}
      </span>
    </div>

    <p class="text-sm text-[var(--muted)] mb-4">
      <strong>Best for:</strong> {{ marinade.bestFor }}
    </p>

    <!-- Application Timing Indicator -->
    <div v-if="marinade.applicationTiming !== 'before'" class="mb-3">
      <p
        v-if="marinade.applicationTiming === 'last-ten'"
        class="text-xs font-medium"
        style="color: var(--orange)"
      >
        🍯 Apply last 8–10 min (sugar/honey content)
      </p>
      <p
        v-if="marinade.applicationTiming === 'last-five'"
        class="text-xs font-medium"
        style="color: var(--orange)"
      >
        🧈 Apply last 3–5 min (butter-based)
      </p>
      <p
        v-if="marinade.applicationTiming === 'serving'"
        class="text-xs font-medium"
        style="color: var(--plum)"
      >
        🍽️ Never cooked — spoon over at serving
      </p>
    </div>

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
      class="text-sm text-[var(--ink)] italic border-t border-[var(--rule)] pt-3 leading-relaxed"
    >
      {{ marinade.applicationNote }}
    </div>
  </div>
</template>
