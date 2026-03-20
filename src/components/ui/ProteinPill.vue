<script setup lang="ts">
import type { ProteinType } from '@/types/meal.types'

defineProps<{
  type: ProteinType | 'cast-iron' | 'flex'
}>()

const getLabel = (type: ProteinType | 'cast-iron' | 'flex'): string => {
  const labels: Record<ProteinType | 'cast-iron' | 'flex', string> = {
    fish: '🐟 Fish',
    'chicken-thigh': '🍗 Chicken Thigh',
    'chicken-breast': '🍗 Chicken Breast',
    steak: '🥩 Steak',
    'cast-iron': '🍳 Cast Iron',
    flex: '✨ Flex'
  }
  return labels[type]
}

const getPillClass = (type: ProteinType | 'cast-iron' | 'flex'): string => {
  if (type === 'fish') return 'pt-pill-fish'
  if (type === 'chicken-thigh' || type === 'chicken-breast') return 'pt-pill-chicken'
  if (type === 'steak') return 'pt-pill-steak'
  if (type === 'cast-iron') return 'pt-pill-cast'
  if (type === 'flex') return 'pt-pill-flex'
  return ''
}
</script>

<template>
  <span class="pt-pill" :class="getPillClass(type)">
    {{ getLabel(type) }}
  </span>
</template>
