<script setup lang="ts">
import type { BadgeVariant } from '@/types/meal.types'

defineProps<{
  variant: BadgeVariant
}>()
</script>

<template>
  <span
    class="badge"
    :class="{
      'badge-best': variant === 'best',
      'badge-good': variant === 'good',
      'badge-make': variant === 'make'
    }"
  >
    {{ variant.toUpperCase() }}
  </span>
</template>
