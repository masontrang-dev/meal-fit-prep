<script setup lang="ts">
import { computed } from 'vue'
import { useRandomizerStore } from '@/stores/randomizerStore'
import FridgeEmptyState from '@/components/meal/FridgeEmptyState.vue'
import FridgeSlotCard from '@/components/meal/FridgeSlotCard.vue'
import type { GeneratedPlan } from '@/types/randomizer.types'

const store = useRandomizerStore()

const currentState = computed(() => {
  if (store.hasPendingPlan) return 'pending'
  if (store.hasConfirmedPlan) return 'confirmed'
  if (store.hasFavoritePlan) return 'favorite'
  return 'empty'
})

function handleGenerate() {
  store.generatePlan()
}

function handleSwap(slotKey: keyof GeneratedPlan) {
  store.swapSlot(slotKey)
}

function handleConfirm() {
  store.confirmPlan()
}

function handleRegenerateAll() {
  store.generatePlan()
}

function handleSaveAsFavorite() {
  store.saveAsFavorite()
}

function formatValue(value: string): string {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-6 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">This Week's Fridge</h1>
      <p class="text-gray-600">
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
      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
        <span class="text-2xl">⭐</span>
        <div class="flex-1">
          <h3 class="font-semibold text-yellow-900 mb-1">Showing Saved Favorite</h3>
          <p class="text-sm text-yellow-800">
            No active plan this week. Displaying your saved favorite plan as reference.
          </p>
        </div>
      </div>

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
        <FridgeSlotCard
          slot-label="Roasting Vegetable"
          slot-key="roastingVeg"
          :value="store.favoritePlan!.roastingVeg"
          eat-by="Available all week"
          :is-confirmed="true"
        />
        <FridgeSlotCard
          slot-label="Grain"
          slot-key="grain"
          :value="store.favoritePlan!.grain"
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

      <div class="flex justify-center pt-4">
        <button
          @click="handleGenerate"
          class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Generate New Week
        </button>
      </div>
    </div>

    <!-- State C: Pending (generated, not confirmed) -->
    <div v-else-if="currentState === 'pending'" class="space-y-6">
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 class="font-semibold text-blue-900 mb-1">Review Your Week</h3>
        <p class="text-sm text-blue-800">
          Review the randomized plan below. Swap any slot you'd like to change, then confirm when
          ready.
        </p>
      </div>

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
        <FridgeSlotCard
          slot-label="Roasting Vegetable"
          slot-key="roastingVeg"
          :value="store.pendingPlan!.roastingVeg"
          eat-by="Available all week"
          @swap="handleSwap"
        />
        <FridgeSlotCard
          slot-label="Grain"
          slot-key="grain"
          :value="store.pendingPlan!.grain"
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

      <div class="flex justify-center gap-4 pt-4">
        <button
          @click="handleRegenerateAll"
          class="px-6 py-3 bg-white text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Regenerate All
        </button>
        <button
          @click="handleConfirm"
          class="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          Confirm Week
        </button>
      </div>
    </div>

    <!-- State D: Confirmed (locked) -->
    <div v-else-if="currentState === 'confirmed'" class="space-y-6">
      <div class="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 class="font-semibold text-green-900 mb-1">✓ This Week's Fridge</h3>
        <p class="text-sm text-green-800">
          Your plan is locked and ready. Shopping list has been updated.
        </p>
      </div>

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
        <FridgeSlotCard
          slot-label="Roasting Vegetable"
          slot-key="roastingVeg"
          :value="store.confirmedPlan!.roastingVeg"
          eat-by="Available all week"
          :is-confirmed="true"
        />
        <FridgeSlotCard
          slot-label="Grain"
          slot-key="grain"
          :value="store.confirmedPlan!.grain"
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

      <div class="flex justify-center gap-4 pt-4">
        <button
          @click="handleSaveAsFavorite"
          class="px-6 py-3 bg-white text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <span>⭐</span>
          <span>Save as Favorite</span>
        </button>
        <button
          @click="handleGenerate"
          class="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Generate Next Week
        </button>
      </div>
    </div>
  </div>
</template>
