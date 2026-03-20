<script setup lang="ts">
import { sundayPrepSteps } from "@/data/prepTimeline";
import { emergencyMeals } from "@/data/emergencyMeals";
import PrepTimeline from "@/components/meal/PrepTimeline.vue";
import EmergencyMeals from "@/components/meal/EmergencyMeals.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";
</script>

<template>
  <div>
    <p class="text-sm text-[var(--muted)] mb-6 leading-relaxed">
      Sunday afternoon · ~90–100 min total · mostly hands-off oven time.
      <strong>Everything for the week is done here</strong> — including Wednesday's cast iron setup.
      The only mid-week cooking after this is the 13-minute Wednesday cast iron dinner.
    </p>

    <CalloutBox variant="cast" class="mb-7">
      <p>
        <strong>Cast iron setup is 100% Sunday.</strong> Marinate the Wednesday protein now and
        refrigerate. Slice the Wednesday vegetables now and store in a container. Wednesday evening
        you pull everything from the fridge and cook — zero additional prep.
      </p>
    </CalloutBox>

    <section>
      <PrepTimeline :steps="sundayPrepSteps" />
    </section>

    <section class="mt-8">
      <EmergencyMeals :meals="emergencyMeals" />
    </section>
  </div>
</template>
