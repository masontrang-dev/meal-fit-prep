<script setup lang="ts">
import type { GeneratedPlan } from '@/types/randomizer.types'

const props = defineProps<{
  slotLabel: string
  slotKey: keyof GeneratedPlan
  value: string
  detail?: string
  eatBy?: string
  isCastIron?: boolean
  marinadeTiming?: string
  isConfirmed?: boolean
}>()

const emit = defineEmits<{
  swap: [slotKey: keyof GeneratedPlan]
}>()

function formatValue(value: string): string {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<template>
  <div
    :class="[
      'border rounded-lg p-5 transition-all',
      isCastIron
        ? 'border-purple-300 bg-purple-50'
        : 'border-gray-200 bg-white hover:border-gray-300',
    ]"
  >
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1">
        <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
          {{ slotLabel }}
        </h3>
        <p class="text-lg font-semibold text-gray-900">{{ formatValue(value) }}</p>
        <p v-if="detail" class="text-sm text-gray-600 mt-1">{{ detail }}</p>
      </div>
      <button
        v-if="!isConfirmed"
        @click="emit('swap', slotKey)"
        class="ml-3 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1.5"
        :title="`Swap ${slotLabel}`"
      >
        <span class="text-base">🔀</span>
        <span>Swap</span>
      </button>
    </div>

    <div v-if="eatBy" class="text-xs text-gray-500 mt-2 border-t border-gray-100 pt-2">
      {{ eatBy }}
    </div>

    <div
      v-if="isCastIron && marinadeTiming"
      class="mt-3 px-3 py-2 rounded-md text-xs font-medium"
      :class="{
        'bg-green-100 text-green-800': marinadeTiming === 'sunday',
        'bg-orange-100 text-orange-800': marinadeTiming === 'tuesday',
        'bg-blue-100 text-blue-800': marinadeTiming === 'season-wednesday',
      }"
    >
      {{
        marinadeTiming === 'sunday'
          ? '✓ Marinade Sunday'
          : marinadeTiming === 'tuesday'
            ? '⚠️ Marinade Tuesday Only'
            : '🦐 Season Wednesday'
      }}
    </div>
  </div>
</template>
