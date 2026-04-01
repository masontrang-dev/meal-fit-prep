<script setup lang="ts">
import type { ShoppingItem } from "@/types/meal.types";
import CheckItem from "@/components/ui/CheckItem.vue";

defineProps<{
  category: string;
  items: ShoppingItem[];
}>();

const emit = defineEmits<{
  toggle: [itemId: string];
}>();

const handleToggle = (itemId: string) => {
  emit("toggle", itemId);
};
</script>

<template>
  <div class="card p-4">
    <h3 class="font-display text-lg font-semibold text-[var(--ink)] mb-3">
      {{ category }}
    </h3>
    <ul class="list-none">
      <CheckItem
        v-for="item in items"
        :key="item.id"
        :item-id="item.id"
        :name="item.name"
        :quantity="item.quantity"
        @toggle="handleToggle"
      />
    </ul>
  </div>
</template>
