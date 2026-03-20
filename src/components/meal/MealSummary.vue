<script setup lang="ts">
import { ref, computed } from "vue";
import type { GeneratedPlan } from "@/types/randomizer.types";
import { getSauceById } from "@/data/sauces";
import { grainsAndLegumes } from "@/data/grainsLegumes";

const props = defineProps<{
  plan: GeneratedPlan | null;
}>();

const isExpanded = ref(false);

// Generate meal summary from the plan
const mealSummary = computed(() => {
  if (!props.plan) return [];

  const plan = props.plan;
  const summary = [];

  // Helper to get nice names
  const getProteinName = (protein: string) => {
    const names: Record<string, string> = {
      salmon: "Salmon",
      tilapia: "Tilapia",
      cod: "Cod",
      "mahi-mahi": "Mahi Mahi",
      "chicken-thighs": "Chicken Thighs",
      "chicken-breast": "Chicken Breast",
      "flank-steak": "Flank Steak",
      "sirloin-steak": "Sirloin Steak",
      shrimp: "Shrimp",
    };
    return names[protein] || protein;
  };

  const getGrainName = (grainId: string) => {
    const grain = grainsAndLegumes.find((g) => g.id === grainId);
    return grain ? grain.name : grainId;
  };

  // Get sauce names
  const fishSauce = getSauceById(plan.batchFishSauce);
  const chickenSauce = getSauceById(plan.batchChickenSauce);
  const castIronSauce = getSauceById(plan.castIronSauce);

  // Fish meals (Mon-Wed)
  summary.push({
    type: "Fish",
    name: getProteinName(plan.batchFishVariety),
    sauce: fishSauce?.name || plan.batchFishSauce,
    meals: "",
    icon: "🐟",
  });

  // Chicken meals (Mon-Fri)
  summary.push({
    type: "Chicken",
    name: plan.batchChickenCut === "thighs" ? "Chicken Thighs" : "Chicken Breast",
    sauce: chickenSauce?.name || plan.batchChickenSauce,
    meals: "",
    icon: "🍗",
  });

  // Cast iron meal (Wed)
  summary.push({
    type: "Cast Iron",
    name: getProteinName(plan.castIronProtein),
    sauce: castIronSauce?.name || plan.castIronSauce,
    meals: "",
    icon: "🍳",
  });

  // Grains
  summary.push({
    type: "Grain",
    name: getGrainName(plan.grain1),
    sauce: "",
    meals: "",
    icon: "🌾",
  });

  if (plan.grain1 !== plan.grain2) {
    summary.push({
      type: "Grain",
      name: getGrainName(plan.grain2),
      sauce: "",
      meals: "",
      icon: "🌾",
    });
  }

  // Legumes
  summary.push({
    type: "Legume",
    name: getGrainName(plan.legume),
    sauce: "",
    meals: "",
    icon: "🥄",
  });

  // Vegetables
  summary.push({
    type: "Vegetable",
    name: plan.roastingVeg1.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    sauce: "",
    meals: "Roasted with chicken",
    icon: "🥬",
  });

  summary.push({
    type: "Vegetable",
    name: plan.roastingVeg2.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    sauce: "",
    meals: "For Wednesday",
    icon: "🥬",
  });

  return summary;
});

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <div v-if="plan" class="meal-summary">
    <div class="summary-header" @click="toggleExpanded">
      <div class="summary-title">
        <span class="summary-icon">📅</span>
        <span>Weekly Meal Summary</span>
      </div>
      <button class="toggle-btn" :class="{ expanded: isExpanded }">
        <svg class="toggle-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M4.5 3L7.5 6L4.5 9"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="summary-content" :class="{ expanded: isExpanded }">
      <div class="summary-grid">
        <div v-for="item in mealSummary" :key="`${item.type}-${item.name}`" class="summary-item">
          <div class="item-header">
            <span class="item-icon">{{ item.icon }}</span>
            <div class="item-info">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-type">{{ item.type }}</span>
            </div>
          </div>

          <div class="item-details">
            <span v-if="item.sauce" class="item-sauce">{{ item.sauce }}</span>
            <span v-if="item.meals" class="item-meals">{{ item.meals }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.meal-summary {
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: 8px;
  margin-bottom: 24px;
  overflow: hidden;
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  user-select: none;
}

.summary-header:hover {
  background: var(--rule);
}

.summary-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink);
}

.summary-icon {
  font-size: 1rem;
}

.toggle-btn {
  background: transparent;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}

.toggle-icon {
  color: var(--muted);
  transition: transform 0.2s;
}

.toggle-btn.expanded .toggle-icon {
  transform: rotate(90deg);
}

.summary-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  border-top: 0 solid var(--rule);
  transition:
    max-height 0.3s ease-out,
    border-top 0.3s ease-out;
}

.summary-content.expanded {
  max-height: none; /* No height limit on desktop */
  border-top: 1px solid var(--rule);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  padding: 20px;
}

.summary-item {
  background: var(--bg);
  border: 1px solid var(--rule);
  border-radius: 6px;
  padding: 12px 16px;
  transition: all 0.2s;
}

.summary-item:hover {
  border-color: var(--green);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.item-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.item-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.item-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.2;
}

.item-type {
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
}

.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-left: 32px;
}

.item-sauce {
  font-size: 0.8rem;
  color: var(--green);
  font-weight: 500;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-meals {
  font-size: 0.75rem;
  color: var(--muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .summary-content.expanded {
    max-height: 70vh; /* Use viewport height for better mobile experience */
  }

  .summary-header {
    padding: 14px 16px;
  }

  .summary-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 16px;
    max-height: inherit;
    overflow-y: auto; /* Allow scrolling within the grid if needed */
  }

  .summary-item {
    padding: 10px 12px;
  }

  .item-details {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    margin-left: 0;
  }

  .item-sauce {
    align-self: stretch;
  }
}

@media (max-width: 480px) {
  .summary-title {
    font-size: 0.85rem;
  }

  .item-name {
    font-size: 0.85rem;
  }

  .item-sauce {
    font-size: 0.75rem;
  }
}
</style>
