<script setup lang="ts">
import type { StorageRow } from '@/types/meal.types'

defineProps<{
  items: StorageRow[]
}>()
</script>

<template>
  <div class="data-table">
    <table class="w-full">
      <thead>
        <tr>
          <th class="text-left">Food</th>
          <th class="text-left">Fridge Life</th>
          <th class="text-left hidden md:table-cell">Reheating & Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.food">
          <td class="font-medium">
            <span class="mr-2">{{ item.icon }}</span>
            {{ item.food }}
          </td>
          <td class="text-sm font-semibold text-[var(--green)]">{{ item.window }}</td>
          <td class="hidden md:table-cell text-sm text-[var(--ink)]">{{ item.notes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
