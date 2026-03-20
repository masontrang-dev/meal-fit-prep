<script setup lang="ts">
import type { Vegetable } from "@/types/meal.types";

defineProps<{
  vegetables: Vegetable[];
  selectedVegetable?: string;
}>();

const emit = defineEmits<{
  select: [name: string];
}>();

const getTagClass = (tag: "default" | "swap" | "wildcard"): string => {
  if (tag === "default") return "bg-green-100 text-green-800 border-green-300";
  if (tag === "swap") return "bg-blue-100 text-blue-800 border-blue-300";
  if (tag === "wildcard") return "bg-purple-100 text-purple-800 border-purple-300";
  return "";
};

const getTagLabel = (tag: "default" | "swap" | "wildcard"): string => {
  if (tag === "default") return "Default";
  if (tag === "swap") return "Swap";
  if (tag === "wildcard") return "Wildcard";
  return "";
};

const handleSelect = (vegName: string) => {
  emit("select", vegName);
};
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="veg in vegetables"
      :key="veg.name"
      class="card p-4 cursor-pointer transition-all duration-200 hover:shadow-md active:scale-[0.98]"
      :class="{
        'ring-2 ring-[var(--green)] bg-[var(--green-light)]': selectedVegetable === veg.name,
      }"
      @click="handleSelect(veg.name)"
      role="button"
      :aria-pressed="selectedVegetable === veg.name"
      :aria-label="`Select ${veg.name} as this week's vegetable`"
      tabindex="0"
      @keydown.enter="handleSelect(veg.name)"
      @keydown.space.prevent="handleSelect(veg.name)"
    >
      <div class="flex items-start justify-between mb-3">
        <h3 class="text-lg font-display font-semibold text-[var(--ink)]">{{ veg.name }}</h3>
        <span
          class="text-xs font-semibold uppercase px-2 py-1 rounded border flex-shrink-0"
          :class="getTagClass(veg.tag)"
        >
          {{ getTagLabel(veg.tag) }}
        </span>
      </div>

      <div class="space-y-2">
        <div>
          <h4 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1">
            Prep
          </h4>
          <p class="text-sm text-[var(--ink)] leading-relaxed">{{ veg.prepNote }}</p>
        </div>

        <div>
          <h4 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-1">
            Cook
          </h4>
          <p class="text-sm text-[var(--ink)] leading-relaxed">{{ veg.cookNote }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
