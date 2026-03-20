<script setup lang="ts">
import { proteins } from "@/data/proteins";
import { grainsAndLegumes } from "@/data/grainsLegumes";
import { vegetables } from "@/data/vegetables";
import { useMealStore } from "@/stores/mealStore";
import ProteinCard from "@/components/meal/ProteinCard.vue";
import GrainsLegumesTable from "@/components/meal/GrainsLegumesTable.vue";
import VegetableGrid from "@/components/meal/VegetableGrid.vue";
import SectionLabel from "@/components/ui/SectionLabel.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";

const mealStore = useMealStore();

const fish = proteins.find((p) => p.id === "fish")!;
const chickenThigh = proteins.find((p) => p.id === "chicken-thigh")!;
const chickenBreast = proteins.find((p) => p.id === "chicken-breast")!;
const steak = proteins.find((p) => p.id === "steak")!;

const handleVegetableSelect = (vegName: string) => {
  mealStore.setVegetable(vegName);
};
</script>

<template>
  <div class="space-y-8">
    <section>
      <SectionLabel label="Fish (2 meals/week)" />
      <ProteinCard :protein="fish" />
    </section>

    <section>
      <SectionLabel label="Chicken (3 meals/week)" />
      <div class="grid gap-4 md:grid-cols-2">
        <ProteinCard :protein="chickenThigh" />
        <ProteinCard :protein="chickenBreast" />
      </div>
      <CalloutBox variant="blue" class="mt-4">
        <p>
          <strong>Thighs vs. Breast:</strong> Thighs are more forgiving and flavorful. Breast is
          leaner but requires careful timing to avoid dryness.
        </p>
      </CalloutBox>
    </section>

    <section>
      <SectionLabel label="Beef" />
      <ProteinCard :protein="steak" />
      <CalloutBox variant="orange" class="mt-4">
        <p>
          <strong>Cast Iron Required:</strong> Steak is always cooked Wednesday dinner in a cast
          iron skillet for the best crust. See the Cast Iron tab for detailed instructions.
        </p>
      </CalloutBox>
    </section>

    <section>
      <SectionLabel label="Grains & Legumes" />
      <GrainsLegumesTable :items="grainsAndLegumes" />
    </section>

    <section>
      <SectionLabel label="Vegetable Rotation" />
      <VegetableGrid
        :vegetables="vegetables"
        :selected-vegetable="mealStore.selectedVegetable"
        @select="handleVegetableSelect"
      />
      <CalloutBox variant="green" class="mt-4">
        <p>
          <strong>This week:</strong> {{ mealStore.selectedVegetable }} —
          <strong>Default:</strong> Broccoli is the go-to vegetable. <strong>Swap:</strong> Rotate
          through alternatives weekly. Click to select.
        </p>
      </CalloutBox>
    </section>
  </div>
</template>
