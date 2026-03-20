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
  <div>
    <!-- Cast Iron Header -->
    <div class="bg-[var(--cast)] text-white px-6 py-5 -mx-6 -mt-6 mb-6">
      <h2 class="font-display text-2xl font-bold">🔥 Wednesday Cast Iron Night</h2>
      <p class="text-xs font-medium uppercase tracking-wider opacity-70 mt-1">
        Everything prepped Sunday · 13 minutes to cook Wednesday · Fresh dinner mid-week
      </p>
    </div>

    <CastIronInstructions />

    <section class="mt-8">
      <SectionLabel label="Marinade Options — Rotate Week to Week" />
      <CalloutBox variant="blue" class="mb-4">
        <p>
          <strong>Sunday-safe marinades:</strong> Soy Garlic Ginger and Smoked Paprika Garlic are
          oil and soy-based with no significant acid — they can marinate safely for 2–5 days and
          actually improve with time. <strong>Tuesday-only marinades:</strong> Lime Cumin and
          Balsamic Herb contain citrus juice and vinegar — acids break down protein texture if left
          more than 1–2 days on chicken (slightly longer on steak).
        </p>
      </CalloutBox>

      <div class="grid gap-4 md:grid-cols-2">
        <MarinadeCard
          v-for="marinade in marinades"
          :key="marinade.id"
          :marinade="marinade"
          :is-selected="mealStore.selectedMarinade === marinade.id"
          @select="handleMarinadeSelect"
        />
      </div>
    </section>
  </div>
</template>
