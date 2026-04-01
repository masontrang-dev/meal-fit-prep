<script setup lang="ts">
import { getSaucesBySection } from "@/data/sauces";
import { useMealStore } from "@/stores/mealStore";
import SauceCard from "@/components/meal/SauceCard.vue";
import SectionLabel from "@/components/ui/SectionLabel.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";

const mealStore = useMealStore();

const fishSauces = getSaucesBySection("fish");
const chickenSauces = getSaucesBySection("chicken");
const castIronSauces = getSaucesBySection("cast-iron");
const shrimpSauces = getSaucesBySection("shrimp");
</script>

<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-2xl font-display font-semibold text-ink">Sauces & Marinades</h2>
      <p class="text-muted mt-2">Simple, scalable sauces organized by protein type</p>
    </div>

    <CalloutBox variant="green">
      <p>
        <strong>Storage Legend:</strong> 🧊 Fridge = refrigerate after making. 🏺 Pantry =
        shelf-stable ingredients. ♻️ Batch = can make in advance and store.
      </p>
    </CalloutBox>

    <section>
      <SectionLabel label="Fish Sauces" />
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SauceCard
          v-for="sauce in fishSauces"
          :key="sauce.id"
          :sauce="sauce"
          :is-selected="mealStore.selectedSauces.includes(sauce.id)"
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
          :is-selected="mealStore.selectedSauces.includes(sauce.id)"
        />
      </div>
    </section>

    <section>
      <SectionLabel label="Cast Iron Marinades (Steak & Chicken)" />
      <CalloutBox variant="cast" class="mb-4">
        <p>
          <strong>Sunday-safe marinades</strong> are oil and soy-based with no significant acid —
          they can marinate 2–5 days and improve with time. <strong>Tuesday-only marinades</strong>
          contain citrus or vinegar — acids break down protein texture if left more than 1–2 days.
        </p>
      </CalloutBox>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SauceCard
          v-for="sauce in castIronSauces"
          :key="sauce.id"
          :sauce="sauce"
          :is-selected="mealStore.selectedSauces.includes(sauce.id)"
        />
      </div>
    </section>

    <section>
      <SectionLabel label="Shrimp Pan Sauces" />
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SauceCard
          v-for="sauce in shrimpSauces"
          :key="sauce.id"
          :sauce="sauce"
          :is-selected="mealStore.selectedSauces.includes(sauce.id)"
        />
      </div>
    </section>
  </div>
</template>
