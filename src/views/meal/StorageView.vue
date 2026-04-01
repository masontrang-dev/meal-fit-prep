<script setup lang="ts">
import { storageGuide } from "@/data/storageGuide";
import StorageGuide from "@/components/meal/StorageGuide.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";
import AppPage from "@/components/layout/AppPage.vue";
</script>

<template>
  <AppPage>
    <div class="max-w-[980px] mx-auto">
      <div class="mb-8">
        <h1 class="font-display text-3xl font-bold text-[var(--ink)] mb-4">Storage Guide</h1>
        <p class="text-sm text-[var(--muted)] leading-relaxed">
          Fridge life and reheating instructions for all meal prep items.
        </p>
      </div>

      <section class="mb-8">
        <h3 class="section-label">Fridge Life by Food</h3>
        <StorageGuide :items="storageGuide" />
      </section>

      <section>
        <h3 class="section-label">Reheating</h3>

        <div class="space-y-3">
          <CalloutBox variant="blue">
            <p>
              <strong>Fish:</strong> 50% microwave power, 90 sec. Or oven 275°F for 10 min covered
              with foil. High heat = rubbery and overpowering smell.
            </p>
          </CalloutBox>

          <CalloutBox variant="blue">
            <p>
              <strong>Chicken + Steak:</strong> Splash of water, loosely covered, 90 sec–2 min full
              power. Steak also excellent cold over quinoa or in a salad — no reheating needed.
            </p>
          </CalloutBox>

          <CalloutBox variant="blue">
            <p>
              <strong>Grains + Lentils:</strong> Splash of water, covered, 60–90 sec. Fluff grains
              with a fork after heating.
            </p>
          </CalloutBox>
        </div>
      </section>
    </div>
  </AppPage>
</template>
