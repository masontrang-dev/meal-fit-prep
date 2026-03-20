<script setup lang="ts">
import { marinades } from '@/data/marinades'
import CastIronInstructions from '@/components/meal/CastIronInstructions.vue'
import MarinadeCard from '@/components/meal/MarinadeCard.vue'
import SectionLabel from '@/components/ui/SectionLabel.vue'

const sundayMarinades = marinades.filter(m => m.timing === 'sunday')
const tuesdayMarinades = marinades.filter(m => m.timing === 'tuesday')
</script>

<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-2xl font-display font-semibold text-ink">Cast Iron Steak</h2>
      <p class="text-muted mt-2">Wednesday dinner ritual: 13 minutes of perfection</p>
    </div>

    <CastIronInstructions />

    <section>
      <SectionLabel label="Sunday Marinades" />
      <p class="text-sm text-muted mb-4">Choose one for Monday/Tuesday chicken meals</p>
      <div class="grid gap-4 md:grid-cols-2">
        <MarinadeCard 
          v-for="marinade in sundayMarinades" 
          :key="marinade.id"
          :marinade="marinade"
        />
      </div>
    </section>

    <section>
      <SectionLabel label="Tuesday Marinades" />
      <p class="text-sm text-muted mb-4">Prep Tuesday night for Wednesday/Thursday meals</p>
      <div class="grid gap-4 md:grid-cols-2">
        <MarinadeCard 
          v-for="marinade in tuesdayMarinades" 
          :key="marinade.id"
          :marinade="marinade"
        />
      </div>
    </section>
  </div>
</template>
