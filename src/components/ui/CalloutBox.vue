<script setup lang="ts">
import type { CalloutVariant } from '@/types/meal.types'

defineProps<{
  variant?: CalloutVariant
}>()
</script>

<template>
  <div
    class="callout"
    :class="{
      'callout-orange': variant === 'orange',
      'callout-blue': variant === 'blue',
      'callout-gold': variant === 'gold',
      'callout-red': variant === 'red',
      'callout-plum': variant === 'plum',
      'callout-cast': variant === 'cast'
    }"
  >
    <slot />
  </div>
</template>
