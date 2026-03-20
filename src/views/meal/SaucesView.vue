<script setup lang="ts">
import { sauces } from '@/data/sauces'
import SauceCard from '@/components/meal/SauceCard.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'
import CalloutBox from '@/components/ui/CalloutBox.vue'

const fishSauces = sauces.filter(s => s.proteinCategory === 'fish')
const chickenSauces = sauces.filter(s => s.proteinCategory === 'chicken')
const steakSauces = sauces.filter(s => s.proteinCategory === 'steak')
</script>

<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-2xl font-display font-semibold text-ink">Sauces & Toppings</h2>
      <p class="text-muted mt-2">Elevate your proteins with these simple sauces</p>
    </div>

    <CalloutBox variant="green">
      <p><strong>Storage Legend:</strong> 🧊 Fridge = refrigerate after making. 🏺 Pantry = shelf-stable ingredients. ♻️ Batch = can make in advance.</p>
    </CalloutBox>

    <section>
      <SectionLabel label="Fish Sauces" />
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SauceCard 
          v-for="sauce in fishSauces" 
          :key="sauce.id"
          :sauce="sauce"
        />
      </div>
    </section>

    <section>
      <SectionLabel label="Chicken Sauces" />
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SauceCard 
          v-for="sauce in chickenSauces" 
          :key="sauce.id"
          :sauce="sauce"
        />
      </div>
    </section>

    <section>
      <SectionLabel label="Steak Sauces" />
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SauceCard 
          v-for="sauce in steakSauces" 
          :key="sauce.id"
          :sauce="sauce"
        />
      </div>
    </section>
  </div>
</template>
