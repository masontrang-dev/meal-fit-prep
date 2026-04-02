<script setup lang="ts">
  import { breakfasts } from '@/data/breakfasts'
  import SectionLabel from '@/components/ui/SectionLabel.vue'
  import CalloutBox from '@/components/ui/CalloutBox.vue'
  import BreakfastCard from '@/components/meal/BreakfastCard.vue'
  import BatchPrepCard from '@/components/meal/BatchPrepCard.vue'
  import AppPage from '@/components/layout/AppPage.vue'

  const steelCutOats = breakfasts.find(b => b.id === 'steel-cut-oats')!
  const chiaPudding = breakfasts.find(b => b.id === 'chia-pudding')!
</script>

<template>
  <AppPage>
    <div class="max-w-[980px] mx-auto">
      <div class="mb-8">
        <h1 class="font-display text-3xl font-bold text-black mb-4">Breakfasts</h1>
        <p class="text-sm text-black leading-relaxed">
          Easy batch-prep breakfast options for busy mornings. Steel-cut oats and chia pudding can
          be prepared on Sunday with no weekday cooking required.
        </p>
      </div>

      <div class="space-y-8">
        <section>
          <CalloutBox variant="green">
            <p>
              Breakfasts are flexible — eat what works each morning. These two options are easy to
              batch prep on Sunday and require no cooking on weekday mornings. Neither is required
              every day.
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
          <div class="data-table">
            <table class="w-full">
              <thead>
                <tr>
                  <th class="text-left">Nutrient</th>
                  <th class="text-left">Steel Cut Oats</th>
                  <th class="text-left">Chia Seed Pudding</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-medium">Protein</td>
                  <td>{{ steelCutOats.nutrients.protein }}</td>
                  <td>{{ chiaPudding.nutrients.protein }}</td>
                </tr>
                <tr>
                  <td class="font-medium">Fiber</td>
                  <td>{{ steelCutOats.nutrients.fiber }}</td>
                  <td>{{ chiaPudding.nutrients.fiber }}</td>
                </tr>
                <tr>
                  <td class="font-medium">Omega-3s</td>
                  <td>{{ steelCutOats.nutrients.omega3s }}</td>
                  <td>{{ chiaPudding.nutrients.omega3s }}</td>
                </tr>
                <tr>
                  <td class="font-medium">Antioxidants</td>
                  <td>{{ steelCutOats.nutrients.antioxidants }}</td>
                  <td>{{ chiaPudding.nutrients.antioxidants }}</td>
                </tr>
                <tr>
                  <td class="font-medium">Glycemic Index</td>
                  <td>{{ steelCutOats.nutrients.glycemicIndex }}</td>
                  <td>{{ chiaPudding.nutrients.glycemicIndex }}</td>
                </tr>
                <tr>
                  <td class="font-medium">Prep time (morning)</td>
                  <td>{{ steelCutOats.nutrients.morningPrepTime }}</td>
                  <td>{{ chiaPudding.nutrients.morningPrepTime }}</td>
                </tr>
                <tr>
                  <td class="font-medium">Best for</td>
                  <td>Post-workout mornings, savory preference</td>
                  <td>Busy mornings, lighter appetite, sweet preference</td>
                </tr>
                <tr>
                  <td class="font-medium">Customizable</td>
                  <td>Yes — toppings, sweet or savory</td>
                  <td>Yes — any fruit, milk type, sweetener</td>
                </tr>
              </tbody>
            </table>
          </div>

          <CalloutBox variant="gold" class="mt-4">
            <p>
              <strong>Granola note:</strong> Granola is the one ingredient here worth reading the
              label on. Many store-bought versions have 12–18g of added sugar per serving. Look for
              options under 8g sugar per serving, or make a simple batch: rolled oats + a drizzle of
              honey + nuts + a pinch of salt, baked at 325°F for 20 min. Keeps 2 weeks in a jar.
            </p>
          </CalloutBox>
        </section>
      </div>
    </div>
  </AppPage>
</template>
