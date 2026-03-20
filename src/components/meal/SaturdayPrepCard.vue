<script setup lang="ts">
import type { SaturdayPrepItem } from '@/types/randomizer.types'
import CalloutBox from '@/components/ui/CalloutBox.vue'

const props = defineProps<{
  items: SaturdayPrepItem[]
  isLateGeneration: boolean
}>()

const emit = defineEmits<{
  swapChickenSauce: []
  swapCastIronSauce: []
  proceedAnyway: []
}>()

function getProteinDisplayName(protein: string): string {
  const names: Record<string, string> = {
    'thighs': 'Chicken Thighs',
    'breast': 'Chicken Breast',
    'flank-steak': 'Flank Steak',
    'sirloin-steak': 'Sirloin Steak',
    'salmon': 'Salmon',
    'tilapia': 'Tilapia',
    'cod': 'Cod',
    'mahi-mahi': 'Mahi-Mahi',
    'chicken-thighs': 'Chicken Thighs',
    'chicken-breast': 'Chicken Breast',
    'shrimp': 'Shrimp'
  }
  return names[protein] || protein
}

function isChickenItem(item: SaturdayPrepItem): boolean {
  return item.protein === 'thighs' || item.protein === 'breast'
}
</script>

<template>
  <CalloutBox :variant="isLateGeneration ? 'orange' : 'gold'">
    <div class="saturday-prep-card">
      <div class="header">
        <span class="icon">{{ isLateGeneration ? '⚠️' : '🧂' }}</span>
        <h3 class="title">
          {{ isLateGeneration ? 'Some sauces work best with an overnight marinade' : 'Start these marinades tonight — Saturday' }}
        </h3>
      </div>

      <div v-if="isLateGeneration" class="late-warning-body">
        <p class="warning-text">
          Since you're generating on Sunday, you have two options for each affected item:
        </p>

        <div v-for="item in items" :key="item.sauce" class="marinade-item">
          <p class="item-header">
            <strong>{{ getProteinDisplayName(item.protein) }} — {{ item.sauceName }}</strong> requires overnight marinating.
          </p>

          <div class="options">
            <div class="option">
              <p class="option-label">Option 1 — Swap to a same-day sauce</p>
              <button
                v-if="isChickenItem(item)"
                @click="emit('swapChickenSauce')"
                class="swap-button"
              >
                🔀 Swap chicken sauce
              </button>
              <button
                v-else
                @click="emit('swapCastIronSauce')"
                class="swap-button"
              >
                🔀 Swap cast iron marinade
              </button>
              <p class="option-note">The engine will pick a minimum or none sauce instead.</p>
            </div>

            <div class="option">
              <p class="option-label">Option 2 — Proceed with shorter marinade</p>
              <p class="option-note">
                2–4 hours is still fine. Flavor will be slightly less developed but the meal will still be good.
              </p>
            </div>
          </div>
        </div>

        <button @click="emit('proceedAnyway')" class="proceed-button">
          Proceed anyway
        </button>
      </div>

      <div v-else class="reminder-body">
        <div v-for="item in items" :key="item.sauce" class="marinade-item">
          <p class="item-header">
            <strong>{{ getProteinDisplayName(item.protein) }} — {{ item.sauceName }}</strong>
          </p>
          <p class="instructions">{{ item.instructions }}</p>
          <div class="steps">
            <p class="steps-label">Steps:</p>
            <ol>
              <li>Combine all marinade ingredients in a small bowl</li>
              <li>Place {{ getProteinDisplayName(item.protein).toLowerCase() }} in a zip-lock bag</li>
              <li>Pour marinade over protein, squeeze out all air, seal</li>
              <li>Label the bag with the protein name</li>
              <li>Refrigerate overnight</li>
            </ol>
          </div>
          <p v-if="item.note.includes('Sunday-safe')" class="sunday-safe-note">
            {{ item.note }}
          </p>
        </div>
      </div>
    </div>
  </CalloutBox>
</template>

<style scoped>
.saturday-prep-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.icon {
  font-size: 1.5rem;
  line-height: 1;
}

.title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
}

.late-warning-body,
.reminder-body {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.warning-text {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.marinade-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
}

.item-header {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.instructions {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--text-muted);
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.steps-label {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.steps ol {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.875rem;
  line-height: 1.6;
}

.steps li {
  margin-bottom: 0.25rem;
}

.sunday-safe-note {
  margin: 0;
  padding: 0.75rem;
  background: var(--gold-light);
  border-left: 3px solid var(--gold);
  border-radius: 4px;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--text);
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
}

.option {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.option-label {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.option-note {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--text-muted);
}

.swap-button {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.swap-button:hover {
  background: var(--primary-dark);
}

.proceed-button {
  align-self: flex-start;
  padding: 0.625rem 1.25rem;
  background: var(--text);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.proceed-button:hover {
  background: var(--text-muted);
}
</style>
