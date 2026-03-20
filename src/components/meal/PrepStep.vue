<script setup lang="ts">
import type { PrepStep } from '@/types/meal.types'

defineProps<{
  step: PrepStep
}>()
</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col items-center flex-shrink-0">
      <div
        class="w-3 h-3 rounded-full border-2 border-white shadow-md"
        :style="{ backgroundColor: step.dotColor }"
      ></div>
      <div class="w-0.5 h-full bg-[var(--rule)] mt-2"></div>
    </div>

    <div class="pb-8 flex-1">
      <div class="flex items-baseline gap-3 mb-1">
        <span class="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          {{ step.elapsedMin }} min
        </span>
        <span class="text-xs text-[var(--muted)]">{{ step.duration }}</span>
      </div>
      <h4 class="text-lg font-display font-semibold text-[var(--ink)] mb-2">
        {{ step.title }}
      </h4>
      <p class="text-sm text-[var(--ink)] leading-relaxed" v-html="step.body.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></p>
    </div>
  </div>
</template>
