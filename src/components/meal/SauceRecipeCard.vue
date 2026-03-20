<script setup lang="ts">
import { ref } from 'vue'
import type { Sauce } from '@/types/meal.types'

const props = defineProps<{
  sauce: Sauce
  expanded?: boolean
}>()

const emit = defineEmits<{
  'mark-made': [sauceId: string]
}>()

const isExpanded = ref(props.expanded ?? false)

function toggleExpand() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="sauce-recipe-card">
    <div class="sauce-header" @click="toggleExpand">
      <div class="sauce-name">{{ sauce.name }}</div>
      <button class="expand-btn" :aria-label="isExpanded ? 'Collapse' : 'Expand'">
        {{ isExpanded ? '▲ Collapse' : '▼ Expand' }}
      </button>
    </div>
    
    <div class="sauce-subtitle">
      For: {{ sauce.bestFor }}
    </div>
    
    <div v-if="isExpanded" class="sauce-content">
      <div class="sauce-section">
        <div class="sauce-section-label">Ingredients:</div>
        <ul class="ingredient-list">
          <li v-for="(ingredient, idx) in sauce.ingredients" :key="idx">
            <span class="ingredient-amount">{{ ingredient.amount }}</span>
            {{ ingredient.name }}
          </li>
        </ul>
      </div>
      
      <div class="sauce-section">
        <div class="sauce-section-label">Method:</div>
        <p class="sauce-method">{{ sauce.applicationNote }}</p>
      </div>
      
      <div v-if="sauce.temperatureAdjustment.adjusted" class="sauce-temp-warning">
        ⚠️ Oven at {{ sauce.temperatureAdjustment.tempF }}°F — {{ sauce.temperatureAdjustment.note }}
      </div>
      
      <button @click="emit('mark-made', sauce.id)" class="btn-mark-made">
        ✓ Mark as made
      </button>
    </div>
  </div>
</template>

<style scoped>
.sauce-recipe-card {
  border: 1px solid var(--rule);
  border-radius: 6px;
  background: var(--paper);
  margin-bottom: 12px;
  overflow: hidden;
}

.sauce-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.sauce-header:hover {
  background: var(--bg);
}

.sauce-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--ink);
}

.expand-btn {
  background: none;
  border: none;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--green);
  cursor: pointer;
  padding: 4px 8px;
}

.sauce-subtitle {
  padding: 0 16px 12px;
  font-size: 0.8rem;
  color: var(--muted);
}

.sauce-content {
  padding: 0 16px 16px;
  border-top: 1px solid var(--rule);
  padding-top: 16px;
}

.sauce-section {
  margin-bottom: 16px;
}

.sauce-section-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--ink);
  margin-bottom: 8px;
}

.ingredient-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ingredient-list li {
  padding: 4px 0;
  font-size: 0.85rem;
  color: var(--ink);
  line-height: 1.5;
}

.ingredient-list li::before {
  content: '·';
  color: var(--green);
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
  padding-right: 0.5em;
}

.ingredient-amount {
  font-weight: 600;
  color: var(--ink);
}

.sauce-method {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--ink);
  margin: 0;
}

.sauce-temp-warning {
  background: var(--gold-light);
  border-left: 3px solid var(--gold);
  padding: 10px 12px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--gold);
  margin-bottom: 12px;
  border-radius: 4px;
}

.btn-mark-made {
  width: 100%;
  padding: 10px 16px;
  background: var(--green);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-mark-made:hover {
  background: #2d5a3c;
}
</style>
