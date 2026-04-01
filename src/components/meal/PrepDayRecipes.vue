<script setup lang="ts">
import { ref, computed } from "vue";
import { useMealStore } from "@/stores/mealStore";
import type { SelectedProtein } from "@/stores/mealStore";
import { proteins } from "@/data/proteins";
import { vegetables } from "@/data/vegetables";
import { grainsAndLegumes } from "@/data/grainsLegumes";
import { getSauceById } from "@/data/sauces";
import { useSauceInventoryStore } from "@/stores/sauceInventoryStore";
import type { Protein, Vegetable, Sauce, GrainOrLegume } from "@/types/meal.types";
import SauceRecipeCard from "@/components/meal/SauceRecipeCard.vue";
import SectionLabel from "@/components/ui/SectionLabel.vue";

const mealStore = useMealStore();
const sauceInventory = useSauceInventoryStore();

const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
const isExpanded = ref(isDesktop);
const expandedProteins = ref<Record<string, boolean>>({});
const expandedVegetables = ref(isDesktop);
const expandedGrains = ref(isDesktop);
const expandedSauces = ref(isDesktop);

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};

const toggleProtein = (id: string) => {
  expandedProteins.value[id] = !expandedProteins.value[id];
};

const toggleVegetables = () => {
  expandedVegetables.value = !expandedVegetables.value;
};

const toggleGrains = () => {
  expandedGrains.value = !expandedGrains.value;
};

const toggleSauces = () => {
  expandedSauces.value = !expandedSauces.value;
};

const toggleSauceMade = (sauceId: string) => {
  sauceInventory.toggleStock(sauceId);
};

const isSauceMade = (sauceId: string) => {
  return sauceInventory.isInStock(sauceId);
};

// Map plan protein IDs to the overview protein data
function getProteinData(selected: SelectedProtein): Protein | undefined {
  if (selected.role === "batch-fish") {
    return proteins.find((p) => p.id === "fish");
  }
  if (selected.role === "batch-chicken") {
    return selected.proteinId === "thighs"
      ? proteins.find((p) => p.id === "chicken-thigh")
      : proteins.find((p) => p.id === "chicken-breast");
  }
  if (selected.role === "cast-iron") {
    if (selected.proteinId === "shrimp") return undefined;
    if (selected.proteinId.includes("steak")) {
      return proteins.find((p) => p.id === "steak");
    }
    if (selected.proteinId === "chicken-thighs") {
      return proteins.find((p) => p.id === "chicken-thigh");
    }
    if (selected.proteinId === "chicken-breast") {
      return proteins.find((p) => p.id === "chicken-breast");
    }
    // Fish varieties used as cast iron
    return proteins.find((p) => p.id === "fish");
  }
  return undefined;
}

function getProteinDisplayName(id: string): string {
  const names: Record<string, string> = {
    salmon: "Salmon",
    tilapia: "Tilapia",
    cod: "Cod",
    "mahi-mahi": "Mahi Mahi",
    thighs: "Chicken Thighs",
    breast: "Chicken Breast",
    "chicken-thighs": "Chicken Thighs",
    "chicken-breast": "Chicken Breast",
    "flank-steak": "Flank Steak",
    "sirloin-steak": "Sirloin Steak",
    shrimp: "Shrimp",
  };
  return names[id] || id;
}

function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    "batch-fish": "Batch Fish",
    "batch-chicken": "Batch Chicken",
    "cast-iron": "Cast Iron — Wednesday",
  };
  return labels[role] || role;
}

function getRoleIcon(role: string): string {
  const icons: Record<string, string> = {
    "batch-fish": "🐟",
    "batch-chicken": "🍗",
    "cast-iron": "🍳",
  };
  return icons[role] || "🥩";
}

function getHeaderStyle(role: string): { background: string; color: string } {
  if (role === "batch-fish") return { background: "var(--blue-light)", color: "var(--blue)" };
  if (role === "batch-chicken")
    return { background: "var(--orange-light)", color: "var(--orange)" };
  return { background: "var(--gold-light)", color: "var(--gold)" };
}

const formatText = (text: string): string => {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
};

// Batch proteins (fish + chicken) — for Sunday prep
const batchProteins = computed(() =>
  mealStore.selectedProteins.filter((p) => p.role !== "cast-iron"),
);

// Cast iron protein — segregated marinade section
const castIronProtein = computed(() =>
  mealStore.selectedProteins.find((p) => p.role === "cast-iron"),
);

// Resolved vegetable data from the vegetables list
const selectedVegData = computed<Vegetable[]>(() => {
  return mealStore.selectedVegetables
    .map((name) => vegetables.find((v) => v.name === name))
    .filter((v): v is Vegetable => v !== undefined);
});

// Resolved grain data from the grainsAndLegumes list
const selectedGrainsData = computed<GrainOrLegume[]>(() => {
  return mealStore.selectedGrains
    .map((name) => {
      // Try exact name match first (for grains)
      let found = grainsAndLegumes.find((g) => g.name === name);
      // If not found, try ID match (for legumes like "Lentils" -> "lentils")
      if (!found) {
        const id = name.toLowerCase().replace(/\s+/g, "-");
        found = grainsAndLegumes.find((g) => g.id === id);
      }
      return found;
    })
    .filter((g): g is GrainOrLegume => g !== undefined);
});

// All sauces for the week, with role labels
const batchSauces = computed(() => {
  const proteinMap = new Map(mealStore.selectedProteins.map((p) => [p.sauceId, p.role]));
  return mealStore.selectedSauces
    .map((id) => {
      const sauce = getSauceById(id);
      if (!sauce) return null;
      const role = proteinMap.get(id) || "batch";
      const labelMap: Record<string, { label: string; variant: string }> = {
        "batch-fish": { label: "Fish", variant: "fish" },
        "batch-chicken": { label: "Chicken", variant: "chicken" },
        "cast-iron": { label: "Fresh Cook Day", variant: "cast-iron" },
      };
      const badge = labelMap[role] || { label: "Batch", variant: "default" };
      return { sauce, ...badge };
    })
    .filter((s): s is { sauce: Sauce; label: string; variant: string } => s !== null);
});

// Cast iron marinade sauce
const marinadeSauce = computed<Sauce | undefined>(() => {
  if (!castIronProtein.value) return undefined;
  return getSauceById(castIronProtein.value.sauceId);
});

const hasContent = computed(
  () =>
    batchProteins.value.length > 0 ||
    selectedVegData.value.length > 0 ||
    batchSauces.value.length > 0 ||
    marinadeSauce.value !== undefined,
);
</script>

<template>
  <div v-if="hasContent" class="prep-recipes">
    <div class="recipes-header" @click="toggleExpanded">
      <div class="recipes-title">
        <span class="recipes-icon">📋</span>
        <span>This Week's Recipes</span>
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

    <div class="recipes-content" :class="{ expanded: isExpanded }">
      <!-- Grains & Legumes Section -->
      <div v-if="selectedGrainsData.length > 0" class="recipe-section">
        <div class="section-header">
          <SectionLabel label="🌾 Grains & Legumes" />
          <button class="section-toggle-btn" @click="toggleGrains">
            {{ expandedGrains ? "▲ Collapse" : "▼ Expand" }}
          </button>
        </div>
        <div class="veg-grid">
          <div v-for="grain in selectedGrainsData" :key="grain.name" class="veg-card">
            <div class="veg-header">
              <div class="veg-name">{{ grain.name }}</div>
            </div>
            <div v-show="expandedGrains" class="veg-content">
              <p class="detail-text">{{ grain.keyNutrients }}</p>
              <p class="detail-text"><strong>Cook:</strong> {{ grain.cookMethod }}</p>
              <p v-if="grain.cookTime" class="detail-text">
                <strong>Time:</strong> {{ grain.cookTime }}
              </p>
              <p v-if="grain.rinseWarning" class="detail-text">
                <strong>⚠️ Rinse before cooking</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Vegetables Section -->
      <div v-if="selectedVegData.length > 0" class="recipe-section">
        <div class="section-header">
          <SectionLabel label="🥦 Vegetables" />
          <button class="section-toggle-btn" @click="toggleVegetables">
            {{ expandedVegetables ? "▲ Collapse" : "▼ Expand" }}
          </button>
        </div>
        <div class="veg-grid">
          <div v-for="veg in selectedVegData" :key="veg.name" class="veg-card">
            <div class="veg-header">
              <div class="veg-name">{{ veg.name }}</div>
            </div>
            <div v-show="expandedVegetables" class="veg-content">
              <p class="detail-text"><strong>Prep:</strong> {{ veg.prepNote }}</p>
              <p class="detail-text"><strong>Cook:</strong> {{ veg.cookNote }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Batch Sauces Section -->
      <div v-if="batchSauces.length > 0" class="recipe-section">
        <div class="section-header">
          <SectionLabel label="🫙 Sauces/Marinades" />
          <button class="section-toggle-btn" @click="toggleSauces">
            {{ expandedSauces ? "▲ Collapse" : "▼ Expand" }}
          </button>
        </div>
        <div class="sauce-grid">
          <div
            v-for="item in batchSauces"
            :key="item.sauce.id"
            class="sauce-grid-item"
            :class="`sauce-${item.variant}`"
          >
            <div class="sauce-role-badge" :class="`badge-${item.variant}`">{{ item.label }}</div>
            <div class="sauce-card-header">
              <div class="sauce-name">{{ item.sauce.name }}</div>
            </div>
            <!-- Section expanded + Card not made (show full details) -->
            <div v-show="expandedSauces && !isSauceMade(item.sauce.id)" class="sauce-card-content">
              <p class="detail-text">{{ item.sauce.flavorProfile }}</p>
              <p class="detail-text"><strong>Best for:</strong> {{ item.sauce.bestFor }}</p>
              <div class="sauce-section">
                <div class="sauce-section-label">Ingredients:</div>
                <ul class="ingredient-list">
                  <li v-for="(ingredient, idx) in item.sauce.ingredients" :key="idx">
                    <span class="ingredient-amount">{{ ingredient.amount }}</span>
                    {{ ingredient.name }}
                  </li>
                </ul>
              </div>
              <div class="sauce-section">
                <div class="sauce-section-label">Method:</div>
                <p class="sauce-method">{{ item.sauce.application }}</p>
              </div>
              <div v-if="item.sauce.temperatureAdjustment.adjusted" class="sauce-temp-warning">
                ⚠️ Oven at {{ item.sauce.temperatureAdjustment.tempF }}°F —
                {{ item.sauce.temperatureAdjustment.note }}
              </div>
            </div>
            <!-- Section expanded + Card made (show just title + method) -->
            <div v-show="expandedSauces && isSauceMade(item.sauce.id)" class="sauce-card-collapsed">
              <p class="sauce-method">{{ item.sauce.application }}</p>
            </div>
            <!-- Section collapsed -->
            <div v-show="!expandedSauces" class="sauce-card-collapsed">
              <!-- No content when section is collapsed - just title visible -->
            </div>
            <div class="sauce-footer">
              <button
                @click="toggleSauceMade(item.sauce.id)"
                class="btn-mark-made"
                :class="{ 'btn-made': isSauceMade(item.sauce.id) }"
              >
                {{ isSauceMade(item.sauce.id) ? "✓ Made" : "Mark as made" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Marinade Section (Segregated)
      <div v-if="marinadeSauce" class="recipe-section marinade-section">
        <SectionLabel label="🔥 Wednesday Marinade — Prep for Fresh Cook" />
        <div class="marinade-note">
          Prepare this marinade on Sunday (if Sunday-safe) or Tuesday evening. The cast iron protein
          will be cooked fresh on Wednesday — see the Fresh Cook tab for cooking instructions.
        </div>
        <div class="recipe-cards">
          <div class="marinade-protein-badge" v-if="castIronProtein">
            <span class="protein-icon">🍳</span>
            <span>{{ getProteinDisplayName(castIronProtein.proteinId) }}</span>
          </div>
          <SauceRecipeCard :sauce="marinadeSauce" :expanded="isDesktop" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.prep-recipes {
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: 8px;
  margin-bottom: 24px;
  overflow: hidden;
}

.recipes-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  transition: background-color 0.2s;
  user-select: none;
}

.recipes-header:hover {
  background: var(--rule);
}

.recipes-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink);
}

.recipes-icon {
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

.recipes-content {
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.3s ease-out,
    border-top 0.3s ease-out;
  border-top: 0 solid var(--rule);
}

.recipes-content.expanded {
  max-height: none;
  border-top: 1px solid var(--rule);
}

.recipe-section {
  padding: 0 20px 16px;
}

.recipe-section + .recipe-section {
  border-top: 1px solid var(--rule);
}

.recipe-section:last-child {
  padding-bottom: 16px;
}

.recipe-section :deep(.section-label) {
  margin-top: 0;
  margin-bottom: 16px;
  border-top: none;
}

.sauce-grid :deep(.sauce-recipe-card) {
  margin-bottom: 0;
}

.recipe-cards :deep(.sauce-recipe-card) {
  margin-bottom: 0;
}

.recipe-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Protein Cards */
.protein-card {
  border: 1px solid var(--rule);
  border-radius: 6px;
  overflow: hidden;
  background: var(--paper);
}

.protein-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.protein-card-header:hover {
  opacity: 0.9;
}

.protein-card-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.protein-icon {
  font-size: 1.3rem;
}

.protein-name {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.2;
}

.protein-role {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-top: 2px;
}

.expand-btn {
  background: none;
  border: none;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--muted);
  cursor: pointer;
  padding: 4px 8px;
}

.protein-card-body {
  padding: 16px;
  border-top: 1px solid var(--rule);
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.detail-text {
  font-size: 0.85rem;
  line-height: 1.6;
  color: var(--ink);
  white-space: pre-line;
}

.stat-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.stat-badge {
  display: inline-block;
  background: var(--bg);
  border: 1px solid var(--rule);
  padding: 3px 8px;
  font-size: 0.75rem;
  font-weight: 600;
}

.storage-note {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--rule);
  font-size: 0.8rem;
  color: var(--muted);
}

/* Sauce Grid */
.sauce-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
}

.sauce-grid-item {
  border: 2px solid var(--rule);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.sauce-grid-item :deep(.sauce-recipe-card) {
  flex: 1;
  border: none;
  border-radius: 0;
}

.sauce-grid-item.sauce-fish {
  border-color: var(--blue);
}

.sauce-grid-item.sauce-chicken {
  border-color: var(--orange);
}

.sauce-grid-item.sauce-cast-iron {
  border-color: var(--cast);
}

.sauce-card-header {
  padding: 14px 16px;
  border-bottom: 1px solid var(--rule);
}

.sauce-card-content {
  padding: 16px;
  flex: 1;
}

.sauce-card-collapsed {
  padding: 0 16px 16px;
  flex: 1;
}

.sauce-footer {
  padding: 12px 16px;
  border-top: 1px solid var(--rule);
  background: var(--bg);
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
  background: var(--green-mid);
}

.btn-mark-made.btn-made {
  background: var(--green-light);
  color: var(--green);
}

.sauce-role-badge {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
  padding: 4px 10px;
  color: white;
}

.badge-fish {
  background: var(--blue);
}

.badge-chicken {
  background: var(--orange);
}

.badge-cast-iron {
  background: var(--cast);
}

.badge-default {
  background: var(--green);
}

/* Vegetable Grid + Cards */
.veg-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-toggle-btn {
  background: none;
  border: none;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--muted);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition:
    background 0.2s,
    color 0.2s;
}

.section-toggle-btn:hover {
  background: var(--bg);
  color: var(--ink);
}

.veg-card {
  border: 2px solid var(--green);
  border-radius: 8px;
  background: var(--paper);
  overflow: hidden;
}

.veg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  cursor: default;
  transition: background 0.2s;
}

.veg-name {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--ink);
}

.sauce-name {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--ink);
}

.sauce-section-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
  margin-bottom: 8px;
}

.veg-expand-btn {
  background: none;
  border: none;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--green);
  cursor: pointer;
  padding: 4px 8px;
}

.veg-content {
  padding: 0 16px 16px;
  border-top: 1px solid var(--rule);
  padding-top: 12px;
}

/* Marinade Section */
.marinade-section {
  background: var(--cast-light, var(--gold-light));
}

.marinade-note {
  font-size: 0.8rem;
  color: var(--muted);
  line-height: 1.5;
  margin-bottom: 12px;
  padding: 10px 12px;
  background: var(--paper);
  border-left: 3px solid var(--cast, var(--gold));
  border-radius: 4px;
}

.marinade-protein-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: var(--paper);
  border: 1px solid var(--cast, var(--gold));
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink);
}

@media (max-width: 768px) {
  .recipes-content.expanded {
    max-height: none;
    overflow-y: visible;
  }

  .recipes-header {
    padding: 14px 16px;
  }

  .recipe-section {
    padding: 0 16px 12px;
  }

  .detail-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
