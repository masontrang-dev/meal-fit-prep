<script setup lang="ts">
import { nutrientStatus } from "@/data/nutrients";
import NutrientTable from "@/components/meal/NutrientTable.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";
</script>

<template>
  <div>
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
            <strong>Hydration:</strong> Your habit of refilling a 32oz bottle throughout the day is
            excellent for overall health and performance — keep it up regardless of how other
            dietary details evolve.
          </p>
        </CalloutBox>
      </div>
    </section>
  </div>
</template>
