<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <div class="section-label">
    {{ label }}
  </div>
</template>
