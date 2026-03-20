<script setup lang="ts">
import { storageGuide } from "@/data/storageGuide";
import StorageGuide from "@/components/meal/StorageGuide.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";
</script>

<template>
  <div>
    <section class="mb-6">
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

        <CalloutBox variant="gold">
          <p>
            <strong>Containers worth having:</strong> Glass 2-compartment meal prep containers —
            protein and grain stay separate, microwave and dishwasher safe. ~$25–30 for a set of 6
            on Amazon. One large container for each grain batch. That's the complete setup.
          </p>
        </CalloutBox>
      </div>
    </section>
  </div>
</template>
