<script setup lang="ts">
defineProps<{
  type: 'pantry' | 'fridge' | 'batch'
}>()
</script>

<template>
  <span
    :class="{
      'sb-pantry': type === 'pantry',
      'sb-fridge': type === 'fridge',
      'sb-batch': type === 'batch'
    }"
  >
    {{ type }}
  </span>
</template>
