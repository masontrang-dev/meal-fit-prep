<script setup lang="ts">
  import { computed } from 'vue'
  import type { Sauce } from '@/types/meal.types'
  import { allSauces } from '@/data/sauces'
  import { grainsAndLegumes } from '@/data/grainsLegumes'
  import { proteins } from '@/data/proteins'
  import { standardCookConfig } from '@/data/cookConfig'

  interface IngredientInfo {
    name: string
    quantity: string
    unit: string
    notes?: string
    cookTime?: string
    method?: string
  }

  const props = defineProps<{
    isOpen: boolean
    ingredient: string
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

  // Calculate ingredient information based on the ingredient name and plan
  const ingredientInfo = computed<IngredientInfo | null>(() => {
    if (!props.plan) return null

    const ingredientLower = props.ingredient.toLowerCase()
    const plan = props.plan

    // Check grains and legumes
    const grain = grainsAndLegumes.find(
      g => g.name.toLowerCase() === ingredientLower || g.id.replace('-', ' ') === ingredientLower
    )

    if (grain) {
      let quantity = ''
      let unit = ''
      let notes = ''

      if (grain.id === plan.grain1) {
        quantity = grain.id === 'brown-rice' ? '2' : grain.id === 'quinoa' ? '1.5' : '1.5'
        unit = 'cups (dry)'
        notes = grain.id === 'quinoa' ? 'rinse before cooking' : grain.cookMethod
      } else if (grain.id === plan.grain2) {
        quantity = grain.id === 'jasmine-rice' ? '1' : '1'
        unit = 'cups (dry)'
        notes = grain.id === 'quinoa' ? 'rinse before cooking' : grain.cookMethod
      } else if (grain.id === plan.legume) {
        quantity = grain.id === 'lentils' ? '1.5' : '2'
        unit = grain.id === 'lentils' ? 'cups (dry)' : 'cans (15oz)'
        notes = grain.id === 'lentils' ? 'plus 3 cups broth' : 'drain and rinse'
      }

      return {
        name: grain.name,
        quantity,
        unit,
        notes,
        cookTime: grain.cookTime,
        method: grain.cookMethod,
      }
    }

    // Check proteins
    if (
      ingredientLower.includes('salmon') ||
      ingredientLower.includes('tilapia') ||
      ingredientLower.includes('cod') ||
      ingredientLower.includes('mahi')
    ) {
      return {
        name: plan.batchFishVariety.charAt(0).toUpperCase() + plan.batchFishVariety.slice(1),
        quantity: '3–3.5',
        unit: 'lbs (total)',
        notes: '6 meals • frozen fillets, thawed',
        method: 'Pat dry, season, bake at 400°F for 12–15 min',
      }
    }

    if (ingredientLower.includes('chicken thigh')) {
      return {
        name: 'Chicken Thighs',
        quantity: '2–2.5',
        unit: 'lbs (batch)',
        notes: '4–5 meals • reserve 1 lb for Wednesday',
        method: 'Season well, bake at 375°F for 35–40 min',
      }
    }

    if (ingredientLower.includes('chicken breast')) {
      return {
        name: 'Chicken Breast',
        quantity: '1.5–2',
        unit: 'lbs (batch)',
        notes: '4–5 meals • reserve 1 lb for Wednesday',
        method: 'Season, bake at 375°F for 25–30 min',
      }
    }

    if (ingredientLower.includes('flank') || ingredientLower.includes('sirloin')) {
      return {
        name: plan.castIronProtein === 'flank-steak' ? 'Flank Steak' : 'Sirloin Steak',
        quantity: '~1',
        unit: 'lb',
        notes: 'Wednesday meal • marinate separately',
        method: 'Cast iron: 3-4 min per side, rest 5 min',
      }
    }

    if (ingredientLower.includes('shrimp')) {
      return {
        name: 'Shrimp',
        quantity: '~1',
        unit: 'lb',
        notes: 'Wednesday meal • season fresh',
        method: 'Cast iron: 2-3 min per side',
      }
    }

    // Check vegetables
    if (
      ingredientLower.includes('broccoli') ||
      ingredientLower.includes('asparagus') ||
      ingredientLower.includes('green beans') ||
      ingredientLower.includes('bell pepper')
    ) {
      return {
        name: props.ingredient,
        quantity: '2',
        unit: 'lbs (batch)',
        notes:
          props.ingredient === plan.roastingVeg1 ? 'Roasted with chicken' : 'Slice for Wednesday',
        method: 'Toss with olive oil + salt, roast at 400°F',
      }
    }

    if (ingredientLower.includes('mushroom')) {
      return {
        name: 'Mushrooms',
        quantity: '8',
        unit: 'oz',
        notes: 'Slice Sunday for Wednesday',
        method: 'Sauté with aromatics on Wednesday',
      }
    }

    if (ingredientLower.includes('onion')) {
      return {
        name: 'Onion',
        quantity: '1',
        unit: 'large',
        notes: 'Half for legumes, half for Wednesday',
        method: 'Dice and divide',
      }
    }

    if (ingredientLower.includes('garlic')) {
      return {
        name: 'Garlic',
        quantity: '5–6',
        unit: 'cloves',
        notes: 'Half for legumes, half for Wednesday',
        method: 'Mince and divide',
      }
    }

    // Check sauces
    const sauce = allSauces.find(
      s => s.name.toLowerCase() === ingredientLower || s.id === ingredientLower.replace(' ', '-')
    )

    if (sauce) {
      let weight = 1
      let targetProtein = ''

      if (sauce.id === plan.batchFishSauce) {
        weight = 3.5
        targetProtein = plan.batchFishVariety
      } else if (sauce.id === plan.batchChickenSauce) {
        weight = plan.batchChickenCut === 'thighs' ? 2.25 : 1.75
        targetProtein = plan.batchChickenCut === 'thighs' ? 'chicken thighs' : 'chicken breast'
      } else if (sauce.id === plan.castIronSauce) {
        weight = 1
        targetProtein = plan.castIronProtein
      }

      const scaledIngredients = scaleSauceIngredients(sauce, weight)

      return {
        name: sauce.name,
        quantity: formatIngredients(scaledIngredients),
        unit: '',
        notes: `For ${targetProtein} • ${sauce.application}`,
        method: sauce.method.join(', '),
      }
    }

    return null
  })

  function scaleSauceIngredients(
    sauce: Sauce,
    weightLbs: number
  ): Array<{ amount: string; name: string }> {
    const multiplier = weightLbs / sauce.baseYieldLbs

    return sauce.ingredients.map(ingredient => {
      let scaledAmount = ingredient.amount

      if (typeof ingredient.amount === 'number' && ingredient.scalingBehavior === 'linear') {
        scaledAmount = Math.round(ingredient.amount * multiplier * 4) / 4
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
  <div v-if="isOpen" class="ingredient-popover-overlay" @click="emit('close')">
    <div class="ingredient-popover" @click.stop>
      <div class="ingredient-popover-header">
        <h3 class="ingredient-popover-title">{{ ingredient }}</h3>
        <button @click="emit('close')" class="close-btn">✕</button>
      </div>

      <div class="ingredient-popover-content">
        <div v-if="!ingredientInfo" class="no-info-message">
          <p>Quantity information not available for this ingredient.</p>
        </div>

        <div v-else class="ingredient-details">
          <div class="quantity-section">
            <div class="quantity-main">
              <span class="quantity-value">{{ ingredientInfo.quantity }}</span>
              <span v-if="ingredientInfo.unit" class="quantity-unit">{{
                ingredientInfo.unit
              }}</span>
            </div>

            <div v-if="ingredientInfo.cookTime" class="cook-time">
              <span class="time-label">Cook time:</span>
              <span class="time-value">{{ ingredientInfo.cookTime }}</span>
            </div>
          </div>

          <div v-if="ingredientInfo.notes" class="notes-section">
            <h4 class="notes-title">Notes</h4>
            <p class="notes-text">{{ ingredientInfo.notes }}</p>
          </div>

          <div v-if="ingredientInfo.method" class="method-section">
            <h4 class="method-title">Method</h4>
            <p class="method-text">{{ ingredientInfo.method }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .ingredient-popover-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
  }

  .ingredient-popover {
    background: var(--bg);
    border: 1px solid var(--rule);
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    max-width: 360px;
    width: 100%;
    max-height: 80vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .ingredient-popover-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid var(--rule);
    background: var(--paper);
  }

  .ingredient-popover-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--ink);
    margin: 0;
    text-transform: capitalize;
    letter-spacing: 0.01em;
  }

  .close-btn {
    background: transparent;
    border: none;
    font-size: 0.9rem;
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
    font-weight: 500;
  }

  .close-btn:hover {
    background: var(--rule);
    color: var(--ink);
  }

  .ingredient-popover-content {
    padding: 20px;
    overflow-y: auto;
  }

  .no-info-message {
    text-align: center;
    color: var(--muted);
    padding: 24px 0;
    font-size: 0.9rem;
  }

  .ingredient-details {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .quantity-section {
    padding-bottom: 16px;
    border-bottom: 1px solid var(--rule);
  }

  .quantity-main {
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin-bottom: 8px;
  }

  .quantity-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--green);
    line-height: 1;
  }

  .quantity-unit {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--ink);
  }

  .cook-time {
    display: flex;
    gap: 6px;
    font-size: 0.8rem;
    align-items: center;
  }

  .time-label {
    color: var(--muted);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .time-value {
    color: var(--ink);
    font-weight: 600;
  }

  .notes-section,
  .method-section {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .notes-title,
  .method-title {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--muted);
    margin: 0;
  }

  .notes-text,
  .method-text {
    font-size: 0.85rem;
    line-height: 1.5;
    color: var(--ink);
    margin: 0;
  }

  @media (max-width: 640px) {
    .ingredient-popover-overlay {
      padding: 12px;
    }

    .ingredient-popover {
      max-width: 100%;
      max-height: 90vh;
    }

    .ingredient-popover-header {
      padding: 14px 16px;
    }

    .ingredient-popover-content {
      padding: 16px;
    }

    .quantity-value {
      font-size: 1.125rem;
    }

    .notes-text,
    .method-text {
      font-size: 0.8rem;
    }
  }
</style>
