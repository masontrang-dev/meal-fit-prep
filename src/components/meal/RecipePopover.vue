<script setup lang="ts">
  import { computed } from 'vue'
  import type { Sauce } from '@/types/meal.types'
  import { allSauces } from '@/data/sauces'
  import { grainsAndLegumes } from '@/data/grainsLegumes'
  import { proteins } from '@/data/proteins'
  import { standardCookConfig } from '@/data/cookConfig'

  interface RecipeQuantity {
    name: string
    amount: string
    unit: string
    notes?: string
  }

  interface RecipeSection {
    title: string
    icon: string
    items: RecipeQuantity[]
  }

  const props = defineProps<{
    isOpen: boolean
    plan: {
      grain1: string
      grain2: string
      legume: string
      batchFishVariety: string
      batchFishSauce: string
      batchChickenCut: string
      batchChickenSauce: string
      roastingVeg1: string
      castIronProtein: string
      castIronSauce: string
    } | null
  }>()

  const emit = defineEmits<{
    close: []
  }>()

  // Calculate recipe quantities based on the plan
  const recipeSections = computed<RecipeSection[]>(() => {
    if (!props.plan) return []

    const sections: RecipeSection[] = []
    const plan = props.plan // Non-null assertion since we checked above

    // Grains section
    const grains: RecipeQuantity[] = []

    // Grain 1 (usually larger batch)
    const grain1 = grainsAndLegumes.find(g => g.id === plan.grain1)
    if (grain1) {
      grains.push({
        name: grain1.name,
        amount: grain1.id === 'brown-rice' ? '2' : grain1.id === 'quinoa' ? '1.5' : '1.5',
        unit: 'cups (dry)',
        notes: grain1.id === 'quinoa' ? 'rinse before cooking' : undefined,
      })
    }

    // Grain 2 (smaller batch)
    const grain2 = grainsAndLegumes.find(g => g.id === plan.grain2)
    if (grain2 && grain2.id !== grain1?.id) {
      grains.push({
        name: grain2.name,
        amount: grain2.id === 'jasmine-rice' ? '1' : '1',
        unit: 'cups (dry)',
        notes: grain2.id === 'quinoa' ? 'rinse before cooking' : undefined,
      })
    }

    // Legumes
    const legume = grainsAndLegumes.find(g => g.id === plan.legume)
    if (legume) {
      grains.push({
        name: legume.name,
        amount: legume.id === 'lentils' ? '1.5' : '2',
        unit: legume.id === 'lentils' ? 'cups (dry)' : 'cans (15oz)',
        notes: legume.id === 'lentils' ? 'plus 3 cups broth' : 'drain and rinse',
      })
    }

    if (grains.length > 0) {
      sections.push({
        title: 'Grains & Legumes',
        icon: '🌾',
        items: grains,
      })
    }

    // Proteins section
    const proteinItems: RecipeQuantity[] = []

    // Fish (batch)
    proteinItems.push({
      name: plan.batchFishVariety.charAt(0).toUpperCase() + plan.batchFishVariety.slice(1),
      amount: '3–3.5',
      unit: 'lbs (total)',
      notes: '6 meals • frozen fillets, thawed',
    })

    // Chicken (batch)
    const chickenName = plan.batchChickenCut === 'thighs' ? 'Chicken Thighs' : 'Chicken Breast'
    proteinItems.push({
      name: chickenName,
      amount: plan.batchChickenCut === 'thighs' ? '2–2.5' : '1.5–2',
      unit: 'lbs (batch)',
      notes:
        plan.batchChickenCut === 'thighs'
          ? '4–5 meals • reserve 1 lb for Wednesday'
          : '4–5 meals • reserve 1 lb for Wednesday',
    })

    // Cast iron protein
    const castIronProteinName = getProteinDisplayName(plan.castIronProtein)
    proteinItems.push({
      name: castIronProteinName,
      amount: '~1',
      unit: 'lb',
      notes: 'Wednesday meal • marinate separately',
    })

    sections.push({
      title: 'Proteins',
      icon: '🥩',
      items: proteinItems,
    })

    // Sauces section
    const sauceItems: RecipeQuantity[] = []

    // Fish sauce
    const fishSauce = allSauces.find(s => s.id === plan.batchFishSauce)
    if (fishSauce) {
      const scaledIngredients = scaleSauceIngredients(fishSauce, 3.5) // Scale for ~3.5 lbs fish
      sauceItems.push({
        name: fishSauce.name,
        amount: formatIngredients(scaledIngredients),
        unit: '',
        notes: `For ${plan.batchFishVariety} • ${fishSauce.application}`,
      })
    }

    // Chicken sauce
    const chickenSauce = allSauces.find(s => s.id === plan.batchChickenSauce)
    if (chickenSauce) {
      const chickenWeight = plan.batchChickenCut === 'thighs' ? 2.25 : 1.75 // Average weight
      const scaledIngredients = scaleSauceIngredients(chickenSauce, chickenWeight)
      sauceItems.push({
        name: chickenSauce.name,
        amount: formatIngredients(scaledIngredients),
        unit: '',
        notes: `For ${chickenName} • ${chickenSauce.application}`,
      })
    }

    // Cast iron sauce
    const castIronSauce = allSauces.find(s => s.id === plan.castIronSauce)
    if (castIronSauce) {
      const scaledIngredients = scaleSauceIngredients(castIronSauce, 1) // 1 lb for cast iron
      sauceItems.push({
        name: castIronSauce.name,
        amount: formatIngredients(scaledIngredients),
        unit: '',
        notes: `For ${castIronProteinName} • ${castIronSauce.application}`,
      })
    }

    if (sauceItems.length > 0) {
      sections.push({
        title: 'Sauces & Seasonings',
        icon: '🧂',
        items: sauceItems,
      })
    }

    // Vegetables section
    const vegItems: RecipeQuantity[] = []

    vegItems.push({
      name: plan.roastingVeg1,
      amount: '2',
      unit: 'lbs (batch)',
      notes: 'Roasted with chicken',
    })

    vegItems.push({
      name: 'Aromatics',
      amount: '1',
      unit: 'large onion + 5–6 cloves garlic',
      notes: 'Half for legumes, half for Wednesday',
    })

    vegItems.push({
      name: 'Wednesday Vegetables',
      amount: '2',
      unit: 'bell peppers + 8oz mushrooms',
      notes: 'Slice Sunday, store for Wednesday',
    })

    sections.push({
      title: 'Vegetables & Aromatics',
      icon: '🥬',
      items: vegItems,
    })

    return sections
  })

  function getProteinDisplayName(protein: string): string {
    const names: Record<string, string> = {
      thighs: 'chicken thighs',
      breast: 'chicken breast',
      'flank-steak': 'flank steak',
      'sirloin-steak': 'sirloin steak',
      salmon: 'salmon',
      tilapia: 'tilapia',
      cod: 'cod',
      'mahi-mahi': 'mahi-mahi',
      'chicken-thighs': 'chicken thighs',
      'chicken-breast': 'chicken breast',
      shrimp: 'shrimp',
    }
    return names[protein] || protein
  }

  function scaleSauceIngredients(
    sauce: Sauce,
    weightLbs: number
  ): Array<{ amount: string; name: string }> {
    const multiplier = weightLbs / sauce.baseYieldLbs

    return sauce.ingredients.map(ingredient => {
      let scaledAmount = ingredient.amount

      if (typeof ingredient.amount === 'number' && ingredient.scalingBehavior === 'linear') {
        scaledAmount = Math.round(ingredient.amount * multiplier * 4) / 4 // Round to 1/4 increments
      } else if (
        typeof ingredient.amount === 'number' &&
        ingredient.scalingBehavior === 'diminishing'
      ) {
        const maxMultiplier = ingredient.maxMultiplier || 1.25
        const effectiveMultiplier = Math.min(multiplier, maxMultiplier)
        scaledAmount = Math.round(ingredient.amount * effectiveMultiplier * 4) / 4
      }

      return {
        amount: typeof scaledAmount === 'number' ? scaledAmount.toString() : scaledAmount,
        name: ingredient.name,
      }
    })
  }

  function formatIngredients(ingredients: Array<{ amount: string; name: string }>): string {
    return ingredients.map(ing => `${ing.amount} ${ing.name}`).join(' + ')
  }
</script>

<template>
  <div v-if="isOpen" class="recipe-popover-overlay" @click="emit('close')">
    <div class="recipe-popover" @click.stop>
      <div class="recipe-popover-header">
        <h2 class="recipe-popover-title">Recipe Quantities</h2>
        <button @click="emit('close')" class="close-btn">✕</button>
      </div>

      <div class="recipe-popover-content">
        <div v-if="!plan" class="no-plan-message">
          <p>Generate your weekly plan first to see recipe quantities.</p>
        </div>

        <div v-else class="recipe-sections">
          <div v-for="section in recipeSections" :key="section.title" class="recipe-section">
            <div class="section-header">
              <span class="section-icon">{{ section.icon }}</span>
              <h3 class="section-title">{{ section.title }}</h3>
            </div>

            <div class="section-items">
              <div v-for="item in section.items" :key="item.name" class="recipe-item">
                <div class="item-main">
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-amount">
                    <span class="amount-value">{{ item.amount }}</span>
                    <span v-if="item.unit" class="amount-unit">{{ item.unit }}</span>
                  </span>
                </div>
                <div v-if="item.notes" class="item-notes">{{ item.notes }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .recipe-popover-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }

  .recipe-popover {
    background: var(--bg);
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 600px;
    max-height: 80vh;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .recipe-popover-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid var(--rule);
    background: var(--paper);
  }

  .recipe-popover-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--ink);
    margin: 0;
  }

  .close-btn {
    background: transparent;
    border: none;
    font-size: 1.25rem;
    color: var(--muted);
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .close-btn:hover {
    background: var(--rule);
    color: var(--ink);
  }

  .recipe-popover-content {
    flex: 1;
    overflow-y: auto;
    padding: 24px;
  }

  .no-plan-message {
    text-align: center;
    color: var(--muted);
    padding: 40px 20px;
  }

  .recipe-sections {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .recipe-section {
    border: 1px solid var(--rule);
    border-radius: 8px;
    overflow: hidden;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: var(--paper);
    border-bottom: 1px solid var(--rule);
  }

  .section-icon {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--ink);
    margin: 0;
  }

  .section-items {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .recipe-item {
    padding-bottom: 12px;
    border-bottom: 1px solid var(--rule);
  }

  .recipe-item:last-child {
    padding-bottom: 0;
    border-bottom: none;
  }

  .item-main {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
    margin-bottom: 4px;
  }

  .item-name {
    font-weight: 500;
    color: var(--ink);
    flex: 1;
  }

  .item-amount {
    font-weight: 600;
    color: var(--green);
    white-space: nowrap;
  }

  .amount-value {
    font-size: 1rem;
  }

  .amount-unit {
    font-size: 0.875rem;
    opacity: 0.8;
    margin-left: 2px;
  }

  .item-notes {
    font-size: 0.8rem;
    color: var(--muted);
    line-height: 1.4;
    margin-top: 4px;
  }

  @media (max-width: 640px) {
    .recipe-popover-overlay {
      padding: 12px;
    }

    .recipe-popover {
      max-height: 90vh;
    }

    .recipe-popover-header {
      padding: 16px 20px;
    }

    .recipe-popover-content {
      padding: 20px;
    }

    .item-main {
      flex-direction: column;
      align-items: flex-start;
      gap: 4px;
    }

    .item-amount {
      align-self: flex-end;
    }
  }
</style>
