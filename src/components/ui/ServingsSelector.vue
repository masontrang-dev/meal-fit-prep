<script setup lang="ts">
import { useSettingsStore } from "@/stores/settingsStore";

const settingsStore = useSettingsStore();

const servingOptions = [1, 2, 3] as const;

const handleServingChange = (servings: 1 | 2 | 3) => {
  settingsStore.setServings(servings);
};
</script>

<template>
  <div class="flex items-center gap-2" role="group" aria-label="Servings selector">
    <span class="text-xs text-[var(--muted)] uppercase tracking-wide">Servings:</span>
    <div class="flex gap-1">
      <button
        v-for="option in servingOptions"
        :key="option"
        @click="handleServingChange(option)"
        class="px-3 py-1 text-xs font-semibold rounded transition-all"
        :class="
          settingsStore.servings === option
            ? 'bg-[var(--green)] text-white'
            : 'bg-[var(--paper)] text-[var(--muted)] border border-[var(--rule)] hover:bg-[var(--bg)]'
        "
        :aria-label="`${option} serving${option > 1 ? 's' : ''}`"
        :aria-pressed="settingsStore.servings === option"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>
