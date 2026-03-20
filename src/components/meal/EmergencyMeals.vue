<script setup lang="ts">
import { ref } from "vue";
import type { EmergencyMeal } from "@/types/meal.types";

defineProps<{
  meals: EmergencyMeal[];
}>();

const isExpanded = ref(false);

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <div class="card p-4 border-2 border-[var(--red)]">
    <button
      @click="toggleExpanded"
      class="w-full flex items-center justify-between text-left min-h-[44px] py-2"
      :aria-expanded="isExpanded"
    >
      <div>
        <h3 class="text-lg font-display font-semibold text-[var(--ink)] mb-1">
          🚨 Emergency Meals
        </h3>
        <p class="text-sm text-[var(--muted)]">When life happens and meal prep falls through</p>
      </div>
      <span
        class="text-2xl text-[var(--muted)] transition-transform duration-300 ease-in-out"
        :class="{ 'rotate-180': isExpanded }"
      >
        ▼
      </span>
    </button>

    <Transition name="collapse">
      <div v-if="isExpanded" class="mt-4 pt-4 border-t border-[var(--rule)] space-y-4">
        <div
          v-for="meal in meals"
          :key="meal.num"
          class="pb-4 border-b border-[var(--rule)] last:border-b-0 last:pb-0"
        >
          <h4 class="font-semibold text-[var(--ink)] mb-2">{{ meal.num }}. {{ meal.title }}</h4>
          <p class="text-sm text-[var(--ink)] leading-relaxed">
            {{ meal.instructions }}
          </p>
        </div>
      </div>
    </Transition>
  </div>
</template>
