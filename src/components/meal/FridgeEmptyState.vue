<script setup lang="ts">
defineProps<{
  hasFavorite: boolean
}>()

const emit = defineEmits<{
  generate: []
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 px-6 text-center">
    <div class="mb-6 text-6xl">🧊</div>
    <h2 class="text-2xl font-semibold text-gray-900 mb-3">
      {{ hasFavorite ? 'Generate a New Week' : 'No Plan Generated Yet' }}
    </h2>
    <p class="text-gray-600 mb-8 max-w-md">
      {{
        hasFavorite
          ? 'Ready to randomize a fresh week? Click below to generate your next fridge plan.'
          : 'Generate your first weekly fridge plan to get started. The FridgeEngine will randomize proteins, sauces, grains, and legumes based on your preferences.'
      }}
    </p>
    <button
      @click="emit('generate')"
      class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
    >
      {{ hasFavorite ? 'Generate New Week' : 'Generate This Week' }}
    </button>
  </div>
</template>
