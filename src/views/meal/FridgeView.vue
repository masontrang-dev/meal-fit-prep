<script setup lang="ts">
import { computed, ref } from "vue";
import { useRandomizerStore } from "@/stores/randomizerStore";
import FridgeEmptyState from "@/components/meal/FridgeEmptyState.vue";
import FridgeSlotCard from "@/components/meal/FridgeSlotCard.vue";
import SaturdayPrepCard from "@/components/meal/SaturdayPrepCard.vue";
import type { GeneratedPlan } from "@/types/randomizer.types";

const store = useRandomizerStore();

const warningDismissed = ref(false);

const currentState = computed(() => {
  if (store.hasPendingPlan) return "pending";
  if (store.hasConfirmedPlan) return "confirmed";
  if (store.hasFavoritePlan) return "favorite";
  return "empty";
});

function handleGenerate() {
  store.generatePlan();
}

function handleSwap(slotKey: keyof GeneratedPlan) {
  store.swapSlot(slotKey);
}

function handleConfirm() {
  store.confirmPlan();
}

function handleRegenerateAll() {
  store.generatePlan();
}

function handleSaveAsFavorite() {
  store.saveAsFavorite();
}

function handleSwapChickenSauce() {
  store.swapSlot("batchChickenSauce", true);
  warningDismissed.value = false;
}

function handleSwapCastIronSauce() {
  store.swapSlot("castIronSauce", true);
  warningDismissed.value = false;
}

function handleProceedAnyway() {
  warningDismissed.value = true;
}

function formatValue(value: string): string {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-display font-semibold text-ink">This Week's Fridge</h2>
      <p class="text-muted mt-2">
        Your randomized weekly ingredient selection — proteins, sauces, grains, and legumes
      </p>
    </div>

    <!-- State A: Empty (no plan, no favorite) -->
    <FridgeEmptyState
      v-if="currentState === 'empty'"
      :has-favorite="false"
      @generate="handleGenerate"
    />

    <!-- State B: Favorite (no plan, but favorite exists) -->
    <div v-else-if="currentState === 'favorite'" class="space-y-6">
      <div class="callout callout-gold">
        <strong>⭐ Showing Saved Favorite</strong><br />
        No active plan this week. Displaying your saved favorite plan as reference.
      </div>

      <!-- Proteins -->
      <div>
        <div class="section-label">🍗 Proteins</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FridgeSlotCard
            slot-label="Batch Fish"
            slot-key="batchFishVariety"
            :value="store.favoritePlan!.batchFishVariety"
            :detail="`Sauce: ${formatValue(store.favoritePlan!.batchFishSauce)}`"
            eat-by="Eat by Day 3"
            :is-confirmed="true"
          />
          <FridgeSlotCard
            slot-label="Batch Chicken"
            slot-key="batchChickenCut"
            :value="store.favoritePlan!.batchChickenCut"
            :detail="`Sauce: ${formatValue(store.favoritePlan!.batchChickenSauce)}`"
            eat-by="Eat by Day 5"
            :is-confirmed="true"
          />
          <FridgeSlotCard
            slot-label="Cast Iron Protein"
            slot-key="castIronProtein"
            :value="store.favoritePlan!.castIronProtein"
            :detail="`${formatValue(store.favoritePlan!.castIronSauce)}`"
            eat-by="Wednesday evening"
            :is-cast-iron="true"
            :marinade-timing="store.favoritePlan!.marinadeTiming"
            :is-confirmed="true"
          />
        </div>
      </div>

      <!-- Vegetables -->
      <div>
        <div class="section-label">🥦 Vegetables</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FridgeSlotCard
            slot-label="Vegetable #1"
            slot-key="roastingVeg1"
            :value="store.favoritePlan!.roastingVeg1"
            eat-by="Available all week"
            :is-confirmed="true"
          />
          <FridgeSlotCard
            slot-label="Vegetable #2"
            slot-key="roastingVeg2"
            :value="store.favoritePlan!.roastingVeg2"
            eat-by="Available all week"
            :is-confirmed="true"
          />
        </div>
      </div>

      <!-- Grains & Legumes -->
      <div>
        <div class="section-label">🌾 Grains & Legumes</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FridgeSlotCard
            slot-label="Grain #1"
            slot-key="grain1"
            :value="store.favoritePlan!.grain1"
            eat-by="Cook Sunday, keeps 5-6 days"
            :is-confirmed="true"
          />
          <FridgeSlotCard
            slot-label="Grain #2"
            slot-key="grain2"
            :value="store.favoritePlan!.grain2"
            eat-by="Cook Sunday, keeps 5-6 days"
            :is-confirmed="true"
          />
          <FridgeSlotCard
            slot-label="Legume"
            slot-key="legume"
            :value="store.favoritePlan!.legume"
            eat-by="Cook Sunday, available all week"
            :is-confirmed="true"
          />
        </div>
      </div>

      <div class="flex justify-center pt-4">
        <button
          @click="handleGenerate"
          class="px-6 py-3 font-medium rounded-lg transition-colors"
          style="background: var(--blue); color: var(--paper)"
        >
          Generate New Week
        </button>
      </div>
    </div>

    <!-- State C: Pending (generated, not confirmed) -->
    <div v-else-if="currentState === 'pending'" class="space-y-6">
      <!-- Late Generation Warning -->
      <SaturdayPrepCard
        v-if="store.lateGenerationWarning && !warningDismissed"
        :items="store.pendingPlan!.saturdayPrepItems"
        :is-late-generation="true"
        @swap-chicken-sauce="handleSwapChickenSauce"
        @swap-cast-iron-sauce="handleSwapCastIronSauce"
        @proceed-anyway="handleProceedAnyway"
      />

      <div class="callout callout-blue">
        <strong>Review Your Week</strong><br />
        Review the randomized plan below. Swap any slot you'd like to change, then confirm when
        ready.
      </div>

      <!-- Proteins -->
      <div>
        <div class="section-label">🍗 Proteins</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FridgeSlotCard
            slot-label="Batch Fish"
            slot-key="batchFishVariety"
            :value="store.pendingPlan!.batchFishVariety"
            :detail="`Sauce: ${formatValue(store.pendingPlan!.batchFishSauce)}`"
            eat-by="Eat by Day 3"
            @swap="handleSwap"
          />
          <FridgeSlotCard
            slot-label="Batch Chicken"
            slot-key="batchChickenCut"
            :value="store.pendingPlan!.batchChickenCut"
            :detail="`Sauce: ${formatValue(store.pendingPlan!.batchChickenSauce)}`"
            eat-by="Eat by Day 5"
            @swap="handleSwap"
          />
          <FridgeSlotCard
            slot-label="Cast Iron Protein"
            slot-key="castIronProtein"
            :value="store.pendingPlan!.castIronProtein"
            :detail="`${formatValue(store.pendingPlan!.castIronSauce)}`"
            eat-by="Wednesday evening"
            :is-cast-iron="true"
            :marinade-timing="store.pendingPlan!.marinadeTiming"
            @swap="handleSwap"
          />
        </div>
      </div>

      <!-- Vegetables -->
      <div>
        <div class="section-label">🥦 Vegetables</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FridgeSlotCard
            slot-label="Vegetable #1"
            slot-key="roastingVeg1"
            :value="store.pendingPlan!.roastingVeg1"
            eat-by="Available all week"
            @swap="handleSwap"
          />
          <FridgeSlotCard
            slot-label="Vegetable #2"
            slot-key="roastingVeg2"
            :value="store.pendingPlan!.roastingVeg2"
            eat-by="Available all week"
            @swap="handleSwap"
          />
        </div>
      </div>

      <!-- Grains & Legumes -->
      <div>
        <div class="section-label">🌾 Grains & Legumes</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FridgeSlotCard
            slot-label="Grain #1"
            slot-key="grain1"
            :value="store.pendingPlan!.grain1"
            eat-by="Cook Sunday, keeps 5-6 days"
            @swap="handleSwap"
          />
          <FridgeSlotCard
            slot-label="Grain #2"
            slot-key="grain2"
            :value="store.pendingPlan!.grain2"
            eat-by="Cook Sunday, keeps 5-6 days"
            @swap="handleSwap"
          />
          <FridgeSlotCard
            slot-label="Legume"
            slot-key="legume"
            :value="store.pendingPlan!.legume"
            eat-by="Cook Sunday, available all week"
            @swap="handleSwap"
          />
        </div>
      </div>

      <!-- Saturday Prep Reminder (if generated Saturday or earlier) -->
      <SaturdayPrepCard
        v-if="store.saturdayPrepRequired && !store.lateGenerationWarning"
        :items="store.pendingPlan!.saturdayPrepItems"
        :is-late-generation="false"
      />

      <div class="flex justify-center gap-4 pt-4">
        <button
          @click="handleRegenerateAll"
          class="px-6 py-3 font-medium rounded-lg transition-colors"
          style="background: var(--paper); color: var(--ink); border: 1px solid var(--rule)"
        >
          Regenerate All
        </button>
        <button
          @click="handleConfirm"
          class="px-8 py-3 font-medium rounded-lg transition-colors shadow-md"
          style="background: var(--green); color: var(--paper)"
        >
          Confirm Week
        </button>
      </div>
    </div>

    <!-- State D: Confirmed (locked) -->
    <div v-else-if="currentState === 'confirmed'" class="space-y-6">
      <div class="callout">
        <strong>✓ This Week's Fridge</strong><br />
        Your plan is locked and ready. Shopping list has been updated.
      </div>

      <!-- Proteins -->
      <div>
        <div class="section-label">🍗 Proteins</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FridgeSlotCard
            slot-label="Batch Fish"
            slot-key="batchFishVariety"
            :value="store.confirmedPlan!.batchFishVariety"
            :detail="`Sauce: ${formatValue(store.confirmedPlan!.batchFishSauce)}`"
            eat-by="Eat by Day 3"
            :is-confirmed="true"
          />
          <FridgeSlotCard
            slot-label="Batch Chicken"
            slot-key="batchChickenCut"
            :value="store.confirmedPlan!.batchChickenCut"
            :detail="`Sauce: ${formatValue(store.confirmedPlan!.batchChickenSauce)}`"
            eat-by="Eat by Day 5"
            :is-confirmed="true"
          />
          <FridgeSlotCard
            slot-label="Cast Iron Protein"
            slot-key="castIronProtein"
            :value="store.confirmedPlan!.castIronProtein"
            :detail="`${formatValue(store.confirmedPlan!.castIronSauce)}`"
            eat-by="Wednesday evening"
            :is-cast-iron="true"
            :marinade-timing="store.confirmedPlan!.marinadeTiming"
            :is-confirmed="true"
          />
        </div>
      </div>

      <!-- Vegetables -->
      <div>
        <div class="section-label">🥦 Vegetables</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FridgeSlotCard
            slot-label="Vegetable #1"
            slot-key="roastingVeg1"
            :value="store.confirmedPlan!.roastingVeg1"
            eat-by="Available all week"
            :is-confirmed="true"
          />
          <FridgeSlotCard
            slot-label="Vegetable #2"
            slot-key="roastingVeg2"
            :value="store.confirmedPlan!.roastingVeg2"
            eat-by="Available all week"
            :is-confirmed="true"
          />
        </div>
      </div>

      <!-- Grains & Legumes -->
      <div>
        <div class="section-label">🌾 Grains & Legumes</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FridgeSlotCard
            slot-label="Grain #1"
            slot-key="grain1"
            :value="store.confirmedPlan!.grain1"
            eat-by="Cook Sunday, keeps 5-6 days"
            :is-confirmed="true"
          />
          <FridgeSlotCard
            slot-label="Grain #2"
            slot-key="grain2"
            :value="store.confirmedPlan!.grain2"
            eat-by="Cook Sunday, keeps 5-6 days"
            :is-confirmed="true"
          />
          <FridgeSlotCard
            slot-label="Legume"
            slot-key="legume"
            :value="store.confirmedPlan!.legume"
            eat-by="Cook Sunday, available all week"
            :is-confirmed="true"
          />
        </div>
      </div>

      <div class="flex justify-center gap-4 pt-4">
        <button
          @click="handleSaveAsFavorite"
          class="px-6 py-3 font-medium rounded-lg transition-colors flex items-center gap-2"
          style="background: var(--paper); color: var(--ink); border: 1px solid var(--rule)"
        >
          <span>⭐</span>
          <span>Save as Favorite</span>
        </button>
        <button
          @click="handleGenerate"
          class="px-6 py-3 font-medium rounded-lg transition-colors"
          style="background: var(--blue); color: var(--paper)"
        >
          Generate Next Week
        </button>
      </div>
    </div>
  </div>
</template>
