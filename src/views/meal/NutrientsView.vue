<script setup lang="ts">
import { nutrientStatus } from "@/data/nutrients";
import { useSettingsStore } from "@/stores/settingsStore";
import NutrientTable from "@/components/meal/NutrientTable.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";

const settingsStore = useSettingsStore();

const dismissPKDWarning = () => {
  settingsStore.acknowledgedPKDWarning();
};
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-display font-semibold text-ink">Nutrient Profile</h2>
      <p class="text-muted mt-2">How this meal plan supports your health goals</p>
    </div>

    <CalloutBox v-if="!settingsStore.hasSeenPKDWarning" variant="red">
      <div class="flex items-start justify-between gap-4">
        <p class="flex-1">
          <strong>PKD Warning:</strong> If you have Polycystic Kidney Disease (stage 3+), consult
          your nephrologist before following this plan. Monitor potassium intake and adjust high-K
          foods (lentils, potatoes, bananas) as directed.
        </p>
        <button
          @click="dismissPKDWarning"
          class="text-xs px-3 py-1 bg-[var(--red)] text-white rounded hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Dismiss
        </button>
      </div>
    </CalloutBox>

    <CalloutBox variant="blue">
      <p>
        <strong>DASH Diet Alignment:</strong> This meal plan follows DASH (Dietary Approaches to
        Stop Hypertension) principles: low sodium, high potassium (if kidneys are healthy), rich in
        whole grains, lean proteins, and vegetables.
      </p>
    </CalloutBox>

    <section>
      <NutrientTable :nutrients="nutrientStatus" />
    </section>

    <CalloutBox variant="green">
      <p>
        <strong>Fitness Plan Connection:</strong> Protein timing and quantity are optimized for the
        11-week fitness program. Post-workout meals emphasize quick-digesting carbs (jasmine rice)
        and lean protein (chicken breast).
      </p>
    </CalloutBox>

    <CalloutBox variant="orange">
      <p>
        <strong>Hydration Note:</strong> Drink 8–10 glasses of water daily. If you have PKD, follow
        your nephrologist's fluid recommendations. Proper hydration supports kidney function and
        workout recovery.
      </p>
    </CalloutBox>
  </div>
</template>
