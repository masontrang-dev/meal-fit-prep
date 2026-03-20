<script setup lang="ts">
import type { ShoppingItem } from '@/types/meal.types'
import CheckItem from '@/components/ui/CheckItem.vue'

defineProps<{
  category: string
  items: ShoppingItem[]
}>()

const emit = defineEmits<{
  toggle: [itemId: string]
}>()

const handleToggle = (itemId: string) => {
  emit('toggle', itemId)
}
</script>

<template>
  <div class="mb-6">
    <h3 class="section-label">{{ category }}</h3>
    <div class="bg-[var(--paper)] border border-[var(--rule)] rounded-lg overflow-hidden">
      <CheckItem
        v-for="item in items"
        :key="item.id"
        :item-id="item.id"
        :name="item.name"
        :quantity="item.quantity"
        @toggle="handleToggle"
      />
    </div>
  </div>
</template>
