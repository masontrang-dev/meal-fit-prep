<script setup lang="ts">
import { ref, computed } from "vue";
import type { Sauce } from "@/types/meal.types";
import StorageBadge from "@/components/ui/StorageBadge.vue";
import { formatIngredient } from "@/utils/sauceScaling";
import { useSettingsStore } from "@/stores/settingsStore";

const props = defineProps<{
  sauce: Sauce;
  isSelected?: boolean;
}>();

const indicators = computed(() => {
  const items: { text: string; color: string; bg: string; border: string }[] = [];
  if (props.sauce.sundaySafe) {
    items.push({
      text: "Sunday safe",
      color: "var(--green)",
      bg: "var(--green-light)",
      border: "var(--green-mid)",
    });
  }
  if (!props.sauce.sundaySafe && props.sauce.section === "cast-iron") {
    items.push({
      text: "Tuesday only",
      color: "var(--cast)",
      bg: "var(--cast-light)",
      border: "var(--cast)",
    });
  }
  if (props.sauce.marinating === "overnight") {
    items.push({
      text: "Overnight",
      color: "var(--gold)",
      bg: "var(--gold-light)",
      border: "var(--gold)",
    });
  }
  return items;
});

const settingsStore = useSettingsStore();
const expanded = ref(false);

// Get default batch size based on section
const getDefaultBatchSize = () => {
  const sectionMap: Record<string, keyof typeof settingsStore.defaultBatchSizes> = {
    fish: "fish",
    chicken: "chicken",
    "cast-iron": "castIron",
    shrimp: "shrimp",
  };
  const key = sectionMap[props.sauce.section];
  return key ? settingsStore.defaultBatchSizes[key] : 1.0;
};

const targetLbs = ref(getDefaultBatchSize());

const toggleExpanded = () => {
  expanded.value = !expanded.value;
};
</script>

<template>
  <div
    class="sauce-card cursor-pointer hover:shadow-md transition-shadow"
    :class="{ 'sauce-card--selected': isSelected }"
    @click="toggleExpanded"
  >
    <!-- Card Header: Title + Timing Tag -->
    <div class="card-header">
      <h3 class="card-title">{{ sauce.name }}</h3>
      <span
        v-for="(ind, idx) in indicators"
        :key="idx"
        class="timing-tag"
        :style="{ background: ind.bg, color: ind.color, borderColor: ind.border }"
      >
        {{ ind.text }}
      </span>
    </div>

    <!-- Card Body -->
    <div class="card-body">
      <p class="card-flavor">{{ sauce.flavorProfile }}</p>
      <p class="card-best-for"><strong>Best for:</strong> {{ sauce.bestFor }}</p>
    </div>

    <!-- Expanded State -->
    <div v-if="expanded" class="card-expanded">
      <!-- Temperature Adjustment Warning -->
      <div v-if="sauce.temperatureAdjustment.adjusted" class="temp-warning">
        <p>🌡️ {{ sauce.temperatureAdjustment.note }}</p>
      </div>

      <!-- Quantity Selector -->
      <div class="quantity-selector">
        <label class="section-heading">Target Protein Weight</label>
        <input
          v-model.number="targetLbs"
          type="number"
          step="0.5"
          min="0.5"
          class="quantity-input"
          @click.stop
          @focus.stop
        />
        <p class="quantity-note">{{ targetLbs }} lbs (ingredients scale automatically)</p>
      </div>

      <!-- Ingredients -->
      <div class="detail-section">
        <h4 class="section-heading">Ingredients</h4>
        <ul class="ingredient-list">
          <li v-for="(ingredient, idx) in sauce.ingredients" :key="idx">
            {{ formatIngredient(ingredient, sauce, targetLbs) }}
          </li>
        </ul>
      </div>

      <!-- Method -->
      <div class="detail-section">
        <h4 class="section-heading">Method</h4>
        <ol class="method-list">
          <li v-for="(step, idx) in sauce.method" :key="idx">{{ step }}</li>
        </ol>
      </div>

      <!-- Application -->
      <div class="detail-section">
        <h4 class="section-heading">Application</h4>
        <p class="detail-text">{{ sauce.application }}</p>
      </div>

      <!-- Pairs With -->
      <div class="detail-section">
        <h4 class="section-heading">Pairs With</h4>
        <div class="pairs-list">
          <p><strong>Proteins:</strong> {{ sauce.pairsWith.proteins.join(", ") }}</p>
          <p><strong>Grains:</strong> {{ sauce.pairsWith.grains.join(", ") }}</p>
          <p><strong>Vegetables:</strong> {{ sauce.pairsWith.vegetables.join(", ") }}</p>
        </div>
      </div>

      <!-- Storage Details -->
      <div class="detail-section">
        <h4 class="section-heading">Storage</h4>
        <p class="detail-text"><strong>Shelf life:</strong> {{ sauce.storage.shelfLife }}</p>
        <p class="detail-note">{{ sauce.storage.note }}</p>
      </div>

      <!-- Tips -->
      <div v-if="sauce.tips" class="callout callout-green">
        <p class="callout-label">Tips</p>
        <p class="detail-text">{{ sauce.tips }}</p>
      </div>

      <!-- Dual Use Note -->
      <div v-if="sauce.dualUse" class="callout callout-plum">
        <p class="callout-label">Dual Use</p>
        <p class="detail-text">{{ sauce.dualUse }}</p>
      </div>
    </div>

    <!-- Card Footer: Storage badges -->
    <div class="card-footer">
      <div class="footer-badges">
        <StorageBadge
          v-for="location in sauce.storage.locations"
          :key="location"
          :type="location"
        />
        <StorageBadge v-if="sauce.storage.batchable" type="batch" />
      </div>
      <span v-if="sauce.storage.shelfLife" class="shelf-life">{{ sauce.storage.shelfLife }}</span>
    </div>
  </div>
</template>

<style scoped>
/* Card Shell */
.sauce-card {
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.sauce-card--selected {
  border-color: var(--green);
  box-shadow: 0 0 0 2px var(--green);
  background: var(--green-light);
}

/* Header: Title + Timing Tags */
.card-header {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 16px 16px 0;
}

.card-title {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--ink);
  flex: 1;
  min-width: 0;
  line-height: 1.3;
}

.timing-tag {
  flex-shrink: 0;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  padding: 3px 7px;
  border-radius: 3px;
  border: 1px solid;
  white-space: nowrap;
  margin-top: 2px;
}

/* Body */
.card-body {
  padding: 8px 16px 0;
}

.card-flavor {
  font-size: 0.8rem;
  color: var(--muted);
  font-weight: 600;
  margin-bottom: 4px;
}

.card-best-for {
  font-size: 0.8rem;
  color: var(--muted);
}

/* Footer: Storage badges + shelf life */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  margin-top: auto;
  border-top: 1px solid var(--rule);
  background: var(--bg);
}

.footer-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.shelf-life {
  font-size: 0.62rem;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

/* Expanded Content */
.card-expanded {
  padding: 0 16px 16px;
  border-top: 1px solid var(--rule);
  margin-top: 12px;
  padding-top: 16px;
}

.temp-warning {
  background: var(--orange-bg);
  border: 1px solid var(--orange);
  border-radius: 4px;
  padding: 8px 12px;
  margin-bottom: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--orange);
}

.quantity-selector {
  background: var(--paper);
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.quantity-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--rule);
  border-radius: 4px;
  font-size: 0.85rem;
  margin-top: 4px;
}

.quantity-note {
  font-size: 0.75rem;
  color: var(--muted);
  margin-top: 4px;
}

.section-heading {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
  margin-bottom: 8px;
}

.detail-section {
  margin-bottom: 16px;
}

.detail-text {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--ink);
  margin: 0;
}

.detail-note {
  font-size: 0.75rem;
  color: var(--muted);
  margin-top: 4px;
  line-height: 1.5;
}

.ingredient-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ingredient-list li {
  padding: 3px 0;
  font-size: 0.85rem;
  color: var(--ink);
}

.method-list {
  list-style: decimal inside;
  padding: 0;
  margin: 0;
}

.method-list li {
  padding: 4px 0;
  font-size: 0.85rem;
  color: var(--ink);
  line-height: 1.6;
}

.pairs-list {
  font-size: 0.85rem;
  color: var(--ink);
}

.pairs-list p {
  margin-bottom: 4px;
}

.callout {
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 12px;
}

.callout-green {
  background: var(--green-bg);
}

.callout-plum {
  background: var(--plum-bg);
}

.callout-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
  margin-bottom: 4px;
}
</style>
