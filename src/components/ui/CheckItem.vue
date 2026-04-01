<script setup lang="ts">
import { computed } from "vue";
import { useShoppingStore } from "@/stores/shoppingStore";

const props = defineProps<{
  itemId: string;
  name: string;
  quantity: string;
}>();

const emit = defineEmits<{
  toggle: [itemId: string];
}>();

const shoppingStore = useShoppingStore();

const isChecked = computed(() => shoppingStore.items[props.itemId] || false);

const handleToggle = () => {
  emit("toggle", props.itemId);
};
</script>

<template>
  <li
    class="flex items-start gap-2 py-1 cursor-pointer transition-opacity duration-150 border-b border-[var(--rule)] last:border-b-0"
    :class="{ 'opacity-35 line-through': isChecked }"
    @click="handleToggle"
  >
    <div
      class="w-[18px] h-[18px] min-w-[18px] border-[1.5px] border-[var(--rule)] rounded-sm flex items-center justify-center text-[0.58rem] mt-[2px] transition-all duration-150"
      :class="{ 'bg-[var(--green)] border-[var(--green)] text-white': isChecked }"
    >
      <span v-if="isChecked">✓</span>
    </div>
    <span class="flex-1 text-sm leading-[1.4]">{{ name }}</span>
    <span class="text-xs text-[var(--muted)] font-semibold whitespace-nowrap">{{ quantity }}</span>
  </li>
</template>
