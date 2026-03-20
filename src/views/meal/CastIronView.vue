<script setup lang="ts">
import { marinades } from "@/data/marinades";
import { useMealStore } from "@/stores/mealStore";
import CastIronInstructions from "@/components/meal/CastIronInstructions.vue";
import MarinadeCard from "@/components/meal/MarinadeCard.vue";
import SectionLabel from "@/components/ui/SectionLabel.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";

const mealStore = useMealStore();

const sundayMarinades = marinades.filter((m) => m.timing === "sunday");
const tuesdayMarinades = marinades.filter((m) => m.timing === "tuesday");

const handleMarinadeSelect = (id: string) => {
  if (mealStore.selectedMarinade === id) {
    mealStore.setMarinade(null);
  } else {
    mealStore.setMarinade(id as any);
  }
};
</script>

<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-2xl font-display font-semibold text-ink">Cast Iron Steak</h2>
      <p class="text-muted mt-2">Wednesday dinner ritual: 13 minutes of perfection</p>
    </div>

    <CastIronInstructions />

    <CalloutBox v-if="mealStore.selectedMarinade" variant="green">
      <p>
        <strong>Selected for this week:</strong>
        {{ marinades.find((m) => m.id === mealStore.selectedMarinade)?.name }}
        — Click to deselect or choose a different marinade below.
      </p>
    </CalloutBox>

    <section>
      <SectionLabel label="Sunday Marinades" />
      <p class="text-sm text-muted mb-4">
        Choose one for Monday/Tuesday chicken meals — click to select
      </p>
      <div class="grid gap-4 md:grid-cols-2">
        <MarinadeCard
          v-for="marinade in sundayMarinades"
          :key="marinade.id"
          :marinade="marinade"
          :is-selected="mealStore.selectedMarinade === marinade.id"
          @select="handleMarinadeSelect"
        />
      </div>
    </section>

    <section>
      <SectionLabel label="Tuesday Marinades" />
      <p class="text-sm text-muted mb-4">
        Prep Tuesday night for Wednesday/Thursday meals — click to select
      </p>
      <div class="grid gap-4 md:grid-cols-2">
        <MarinadeCard
          v-for="marinade in tuesdayMarinades"
          :key="marinade.id"
          :marinade="marinade"
          :is-selected="mealStore.selectedMarinade === marinade.id"
          @select="handleMarinadeSelect"
        />
      </div>
    </section>
  </div>
</template>
