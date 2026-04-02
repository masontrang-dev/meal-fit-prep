<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useRandomizerStore } from '@/stores/randomizerStore'
  import FridgeEmptyState from '@/components/meal/FridgeEmptyState.vue'
  import FridgeSlotCard from '@/components/meal/FridgeSlotCard.vue'
  import SaturdayPrepCard from '@/components/meal/SaturdayPrepCard.vue'
  import PlanControls from '@/components/meal/PlanControls.vue'
  import type { GeneratedPlan } from '@/types/randomizer.types'

  const router = useRouter()
  const store = useRandomizerStore()

  const warningDismissed = ref(false)

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

  function handleSwapChickenSauce() {
    store.swapSlot('batchChickenSauce', true)
    warningDismissed.value = false
  }

  function handleSwapCastIronSauce() {
    store.swapSlot('castIronSauce', true)
    warningDismissed.value = false
  }

  function handleProceedAnyway() {
    warningDismissed.value = true
  }

  function formatValue(value: string): string {
    return value
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
</script>

<template>
  <div class="space-y-6 pb-20 lg:pb-6">
    <!-- Plan Controls - Generate/Confirm/Regenerate -->
    <PlanControls
      :current-state="currentState"
      @generate="handleGenerate"
      @confirm="handleConfirm"
      @regenerate-all="handleRegenerateAll"
    />

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

      <!-- Proteins -->
      <div>
        <div class="section-label">🍗 Proteins</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FridgeSlotCard
            slot-label="Batch Fish"
            slot-key="batchFishVariety"
            sauce-key="batchFishSauce"
            :value="store.pendingPlan!.batchFishVariety"
            :detail="`Sauce: ${formatValue(store.pendingPlan!.batchFishSauce)}`"
            eat-by="Eat by Day 3"
            @swap="handleSwap"
            @swap-sauce="handleSwap"
          />
          <FridgeSlotCard
            slot-label="Batch Chicken"
            slot-key="batchChickenCut"
            sauce-key="batchChickenSauce"
            :value="store.pendingPlan!.batchChickenCut"
            :detail="`Sauce: ${formatValue(store.pendingPlan!.batchChickenSauce)}`"
            eat-by="Eat by Day 5"
            @swap="handleSwap"
            @swap-sauce="handleSwap"
          />
          <FridgeSlotCard
            slot-label="Cast Iron Protein"
            slot-key="castIronProtein"
            sauce-key="castIronSauce"
            :value="store.pendingPlan!.castIronProtein"
            :detail="`${formatValue(store.pendingPlan!.castIronSauce)}`"
            eat-by="Wednesday evening"
            :is-cast-iron="true"
            :marinade-timing="store.pendingPlan!.marinadeTiming"
            @swap="handleSwap"
            @swap-sauce="handleSwap"
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
    </div>

    <!-- State D: Confirmed (locked) -->
    <div v-else-if="currentState === 'confirmed'" class="space-y-6">
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
    </div>
  </div>
</template>

<style scoped>
  /* Styles are now handled by the PlanControls component */
</style>
