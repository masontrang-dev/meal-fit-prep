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
  <label
    class="flex items-center gap-3 py-3 px-4 cursor-pointer hover:bg-[var(--bg)] transition-all duration-200 border-b border-[var(--rule)] last:border-b-0 min-h-[44px]"
    :class="{ 'opacity-50': isChecked }"
  >
    <input
      type="checkbox"
      :checked="isChecked"
      @change="handleToggle"
      class="w-5 h-5 min-w-[20px] min-h-[20px] rounded border-2 border-[var(--muted)] cursor-pointer accent-[var(--green)] flex-shrink-0 transition-all duration-150"
    />
    <div class="flex-1 min-w-0">
      <div
        class="text-[0.88rem] leading-[1.5] transition-all duration-200"
        :class="{ 'line-through': isChecked }"
      >
        {{ name }}
      </div>
      <div class="text-[0.72rem] text-[var(--muted)] mt-[2px]">
        {{ quantity }}
      </div>
    </div>
  </label>
</template>
