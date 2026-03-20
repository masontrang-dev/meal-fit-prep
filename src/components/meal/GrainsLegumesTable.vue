<script setup lang="ts">
import type { GrainOrLegume } from "@/types/meal.types";
import StatusBadge from "@/components/ui/StatusBadge.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";

defineProps<{
  items: GrainOrLegume[];
}>();

const hasQuinoa = (items: GrainOrLegume[]) => items.some((item) => item.rinseWarning);
</script>

<template>
  <div>
    <!-- <CalloutBox v-if="hasQuinoa(items)" variant="orange" class="mb-4">
      <strong>Quinoa rinse required:</strong> Always rinse quinoa in a fine-mesh strainer before
      cooking to remove bitter saponins.
    </CalloutBox> -->

    <div class="data-table">
      <table class="w-full">
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left hidden md:table-cell">Key Nutrients</th>
            <th class="text-left">Cook Method</th>
            <th class="text-left hidden sm:table-cell">Weekly Use</th>
            <th class="text-left">Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td class="font-medium">
              {{ item.name }}
              <span v-if="item.rinseWarning" class="text-orange-600 ml-1" title="Rinse required"
                >⚠️</span
              >
            </td>
            <td class="hidden md:table-cell text-sm">
              {{ item.keyNutrients }}
            </td>
            <td class="text-sm">{{ item.cookMethod }}</td>
            <td class="hidden sm:table-cell text-sm">{{ item.weeklyUse }}</td>
            <td>
              <StatusBadge :variant="item.badge" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
