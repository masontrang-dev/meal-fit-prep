<script setup lang="ts">
import { breakfasts } from "@/data/breakfasts";
import SectionLabel from "@/components/ui/SectionLabel.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";
import BreakfastCard from "@/components/meal/BreakfastCard.vue";
import BatchPrepCard from "@/components/meal/BatchPrepCard.vue";

const steelCutOats = breakfasts.find((b) => b.id === "steel-cut-oats")!;
const chiaPudding = breakfasts.find((b) => b.id === "chia-pudding")!;
</script>

<template>
  <div class="space-y-8">
    <section>
      <CalloutBox variant="green">
        <p>
          Breakfasts are flexible — eat what works each morning. These two options are easy to batch
          prep on Sunday and require no cooking on weekday mornings. Neither is required every day.
        </p>
      </CalloutBox>
    </section>

    <section>
      <SectionLabel label="Breakfast Options" />
      <div class="grid gap-4 md:grid-cols-2">
        <BreakfastCard :breakfast="steelCutOats" />
        <BreakfastCard :breakfast="chiaPudding" />
      </div>
    </section>

    <section>
      <SectionLabel label="Sunday Batch Prep" />
      <div class="grid gap-4 md:grid-cols-2">
        <BatchPrepCard :breakfast="steelCutOats" />
        <BatchPrepCard :breakfast="chiaPudding" />
      </div>
    </section>

    <section>
      <SectionLabel label="Nutritional Highlights" />
      <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse">
          <thead>
            <tr class="border-b-2 border-[var(--rule)]">
              <th class="text-left py-3 px-4 font-semibold text-[var(--ink)]">Nutrient</th>
              <th class="text-left py-3 px-4 font-semibold text-[var(--ink)]">Steel Cut Oats</th>
              <th class="text-left py-3 px-4 font-semibold text-[var(--ink)]">Chia Seed Pudding</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-[var(--rule)]">
              <td class="py-3 px-4 font-semibold text-[var(--ink)]">Protein</td>
              <td class="py-3 px-4 text-[var(--ink)]">{{ steelCutOats.nutrients.protein }}</td>
              <td class="py-3 px-4 text-[var(--ink)]">{{ chiaPudding.nutrients.protein }}</td>
            </tr>
            <tr class="border-b border-[var(--rule)]">
              <td class="py-3 px-4 font-semibold text-[var(--ink)]">Fiber</td>
              <td class="py-3 px-4 text-[var(--ink)]">{{ steelCutOats.nutrients.fiber }}</td>
              <td class="py-3 px-4 text-[var(--ink)]">{{ chiaPudding.nutrients.fiber }}</td>
            </tr>
            <tr class="border-b border-[var(--rule)]">
              <td class="py-3 px-4 font-semibold text-[var(--ink)]">Omega-3s</td>
              <td class="py-3 px-4 text-[var(--ink)]">{{ steelCutOats.nutrients.omega3s }}</td>
              <td class="py-3 px-4 text-[var(--ink)]">{{ chiaPudding.nutrients.omega3s }}</td>
            </tr>
            <tr class="border-b border-[var(--rule)]">
              <td class="py-3 px-4 font-semibold text-[var(--ink)]">Antioxidants</td>
              <td class="py-3 px-4 text-[var(--ink)]">{{ steelCutOats.nutrients.antioxidants }}</td>
              <td class="py-3 px-4 text-[var(--ink)]">{{ chiaPudding.nutrients.antioxidants }}</td>
            </tr>
            <tr class="border-b border-[var(--rule)]">
              <td class="py-3 px-4 font-semibold text-[var(--ink)]">Glycemic Index</td>
              <td class="py-3 px-4 text-[var(--ink)]">
                {{ steelCutOats.nutrients.glycemicIndex }}
              </td>
              <td class="py-3 px-4 text-[var(--ink)]">{{ chiaPudding.nutrients.glycemicIndex }}</td>
            </tr>
            <tr class="border-b border-[var(--rule)]">
              <td class="py-3 px-4 font-semibold text-[var(--ink)]">Prep time (morning)</td>
              <td class="py-3 px-4 text-[var(--ink)]">
                {{ steelCutOats.nutrients.morningPrepTime }}
              </td>
              <td class="py-3 px-4 text-[var(--ink)]">
                {{ chiaPudding.nutrients.morningPrepTime }}
              </td>
            </tr>
            <tr class="border-b border-[var(--rule)]">
              <td class="py-3 px-4 font-semibold text-[var(--ink)]">Best for</td>
              <td class="py-3 px-4 text-[var(--ink)]">Post-workout mornings, savory preference</td>
              <td class="py-3 px-4 text-[var(--ink)]">
                Busy mornings, lighter appetite, sweet preference
              </td>
            </tr>
            <tr>
              <td class="py-3 px-4 font-semibold text-[var(--ink)]">Customizable</td>
              <td class="py-3 px-4 text-[var(--ink)]">Yes — toppings, sweet or savory</td>
              <td class="py-3 px-4 text-[var(--ink)]">Yes — any fruit, milk type, sweetener</td>
            </tr>
          </tbody>
        </table>
      </div>

      <CalloutBox variant="gold" class="mt-4">
        <p>
          <strong>Granola note:</strong> Granola is the one ingredient here worth reading the label
          on. Many store-bought versions have 12–18g of added sugar per serving. Look for options
          under 8g sugar per serving, or make a simple batch: rolled oats + a drizzle of honey +
          nuts + a pinch of salt, baked at 325°F for 20 min. Keeps 2 weeks in a jar.
        </p>
      </CalloutBox>
    </section>
  </div>
</template>
