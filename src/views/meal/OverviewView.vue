<script setup lang="ts">
  import { ref } from 'vue'
  import { proteins } from '@/data/proteins'
  import { grainsAndLegumes } from '@/data/grainsLegumes'
  import { vegetables } from '@/data/vegetables'
  import { useMealStore } from '@/stores/mealStore'
  import ProteinCard from '@/components/meal/ProteinCard.vue'
  import GrainsLegumesTable from '@/components/meal/GrainsLegumesTable.vue'
  import VegetableGrid from '@/components/meal/VegetableGrid.vue'
  import SectionLabel from '@/components/ui/SectionLabel.vue'
  import CalloutBox from '@/components/ui/CalloutBox.vue'
  import AppPage from '@/components/layout/AppPage.vue'

  const mealStore = useMealStore()

  const fish = proteins.find(p => p.id === 'fish')!
  const chickenThigh = proteins.find(p => p.id === 'chicken-thigh')!
  const chickenBreast = proteins.find(p => p.id === 'chicken-breast')!
  const steak = proteins.find(p => p.id === 'steak')!

  const handleVegetableSelect = (vegName: string) => {
    mealStore.toggleVegetable(vegName)
  }

  // Welcome box state - persisted in localStorage
  const showWelcome = ref(localStorage.getItem('hideWelcome') !== 'true')

  const dismissWelcome = () => {
    showWelcome.value = false
    localStorage.setItem('hideWelcome', 'true')
  }
</script>

<template>
  <AppPage>
    <div class="max-w-[980px] mx-auto">
      <div class="mb-8">
        <h1 class="font-display text-3xl font-bold text-black mb-4">Overview</h1>
        <p class="text-sm text-[var(--muted)] leading-relaxed">
          All available proteins, grains, legumes, and vegetables with cooking instructions and
          nutritional info.
        </p>
      </div>

      <div class="space-y-8">
        <!-- Welcome Box -->
        <div
          v-if="showWelcome"
          class="card p-6 border-2"
          style="border-color: var(--green); background-color: var(--green-bg)"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <h3 class="text-xl font-display font-semibold text-[var(--ink)] mb-3">
                👋 Welcome to Meal Fit Prep
              </h3>
              <div class="space-y-3 text-sm text-[var(--ink)] leading-relaxed">
                <p>
                  <strong
                    >This is a complete meal prep system designed for 2 people eating 6 lunches + 6
                    dinners per week.</strong
                  >
                </p>
                <p>
                  <strong>How it works:</strong> Generate a randomized weekly plan in the
                  <strong>Meal Plan</strong> tab. The system selects proteins, sauces, grains, and
                  vegetables while avoiding recent repeats. Confirm your plan to auto-populate the
                  <strong>Shopping List</strong> with exact quantities.
                </p>
                <p>
                  <strong>Sunday Prep Day:</strong> Batch-cook fish (2 meals), chicken (3 meals),
                  grains, and legumes. Wednesday is cast iron night — steak or shrimp cooked fresh
                  in a cast iron skillet.
                </p>
                <p>
                  <strong>Sauces & Marinades:</strong> All sauces include ingredient scaling based
                  on protein weight. Check off sauces you've already batched to automatically remove
                  their ingredients from the shopping list.
                </p>
                <p>
                  <strong>This Overview tab</strong> shows all available proteins, grains, legumes,
                  and vegetables with cooking instructions and nutritional info.
                </p>
              </div>
            </div>
            <button
              @click="dismissWelcome"
              class="text-[var(--muted)] hover:text-[var(--ink)] transition-colors text-xl leading-none"
              aria-label="Dismiss welcome message"
              title="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>

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
            :selected-vegetables="mealStore.selectedVegetables"
            @select="handleVegetableSelect"
          />
        </section>
      </div>
    </div>
  </AppPage>
</template>
