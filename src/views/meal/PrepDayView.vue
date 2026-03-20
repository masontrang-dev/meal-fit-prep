<script setup lang="ts">
import { sundayPrepSteps } from '@/data/prepTimeline'
import { emergencyMeals } from '@/data/emergencyMeals'
import PrepTimeline from '@/components/meal/PrepTimeline.vue'
import EmergencyMeals from '@/components/meal/EmergencyMeals.vue'
import CalloutBox from '@/components/ui/CalloutBox.vue'
</script>

<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-2xl font-display font-semibold text-ink">Sunday Prep Day</h2>
      <p class="text-muted mt-2">Total time: ~75 minutes. Many steps overlap.</p>
    </div>

    <CalloutBox variant="blue">
      <p><strong>Saturday Night:</strong> Review your shopping list and marinade choice. Thaw any frozen proteins overnight in the fridge.</p>
    </CalloutBox>

    <section>
      <PrepTimeline :steps="sundayPrepSteps" />
    </section>

    <section class="mt-8">
      <EmergencyMeals :meals="emergencyMeals" />
    </section>
  </div>
</template>
