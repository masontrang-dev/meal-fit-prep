<script setup lang="ts">
import { nutrientStatus } from "@/data/nutrients";
import { useSettingsStore } from "@/stores/settingsStore";
import NutrientTable from "@/components/meal/NutrientTable.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";

const settingsStore = useSettingsStore();

const dismissPKDWarning = () => {
  settingsStore.acknowledgedPKDWarning();
};
</script>

<template>
  <div>
    <!-- PKD Warning - Hidden for now -->
    <!-- <CalloutBox v-if="!settingsStore.hasSeenPKDWarning" variant="red">
      <div class="flex items-start justify-between gap-4">
        <p class="flex-1">
          <strong>PKD (Polycystic Kidney Disease) — Important:</strong> This plan is built on whole foods and aligns directionally with DASH principles. However, PKD dietary needs vary significantly by kidney function stage (GFR). Potassium, phosphorus, and total daily protein all need calibration to your specific labs. Before committing to this plan, bring it printed to your nephrologist or a renal dietitian. Ask specifically about your current GFR, your potassium and phosphorus tolerance, and whether your protein target needs adjusting. The structure here is sound — the individual quantities may need tuning.
        </p>
        <button
          @click="dismissPKDWarning"
          class="text-xs px-3 py-1 bg-[var(--red)] text-white rounded hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Dismiss
        </button>
      </div>
    </CalloutBox> -->

    <section class="mb-6">
      <h3 class="section-label">DASH Diet Alignment</h3>
      <CalloutBox variant="blue">
        <p>
          DASH emphasizes lean proteins, whole grains, vegetables, and reduced sodium. This plan
          aligns well with two key practices:
          <strong>(1) use low-sodium soy sauce throughout</strong> — regular soy sauce has ~900mg
          sodium per tablespoon, low-sodium cuts that roughly in half, coconut aminos cuts it
          further. <strong>(2) Season with herbs and citrus rather than salt</strong> wherever
          possible. Target under 1,500–2,300mg total sodium daily.
        </p>
      </CalloutBox>
    </section>

    <section class="mb-6">
      <NutrientTable :nutrients="nutrientStatus" />
    </section>

    <section>
      <h3 class="section-label">How This Supports Your Fitness Plan</h3>

      <div class="space-y-3">
        <CalloutBox variant="blue">
          <p>
            <strong>Post-workout eating:</strong> Eat a prepped container within 30–60 minutes after
            treadmill or strength sessions. Protein supports muscle repair; the complex carbs
            replenish energy stores. Any container from this plan works perfectly.
          </p>
        </CalloutBox>

        <CalloutBox variant="blue">
          <p>
            <strong>Pre-workout fuel:</strong> Eat a grain-containing meal 1–2 hours before a
            session. Brown rice, quinoa, or lentils all provide sustained energy without a
            spike-and-crash.
          </p>
        </CalloutBox>

        <CalloutBox variant="blue">
          <p>
            <strong>Omega-3s and recovery:</strong> Salmon 3–4× per week actively reduces the muscle
            soreness from exercise. Particularly relevant in the early weeks of returning to
            training after your ankle injury.
          </p>
        </CalloutBox>

        <CalloutBox variant="gold">
          <p>
            <strong>The full picture:</strong> Cardio burns fat through a calorie deficit. Strength
            training builds muscle that raises resting metabolism. This meal plan fuels both —
            protein to build and preserve muscle, complex carbs for training energy, healthy fats
            for hormone support. The combination is meaningfully more effective than any single
            piece alone.
          </p>
        </CalloutBox>

        <CalloutBox variant="plum">
          <p>
            <strong>Water and PKD:</strong> High water intake is one of the most evidence-backed
            interventions for slowing PKD progression. Your habit of refilling a 32oz bottle
            throughout the day is genuinely one of the most impactful things you can do — keep it up
            regardless of how other dietary details evolve.
          </p>
        </CalloutBox>
      </div>
    </section>
  </div>
</template>
