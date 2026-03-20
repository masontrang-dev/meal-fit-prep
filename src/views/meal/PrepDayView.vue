<script setup lang="ts">
import { computed } from "vue";
import { sundayPrepSteps } from "@/data/prepTimeline";
import { emergencyMeals } from "@/data/emergencyMeals";
import { useRandomizerStore } from "@/stores/randomizerStore";
import PrepTimeline from "@/components/meal/PrepTimeline.vue";
import EmergencyMeals from "@/components/meal/EmergencyMeals.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";
import type { PrepStep } from "@/types/meal.types";

const store = useRandomizerStore();

function getProteinDisplayName(protein: string): string {
  const names: Record<string, string> = {
    thighs: "chicken thighs",
    breast: "chicken breast",
    "flank-steak": "flank steak",
    "sirloin-steak": "sirloin steak",
    salmon: "salmon",
    tilapia: "tilapia",
    cod: "cod",
    "mahi-mahi": "mahi-mahi",
    "chicken-thighs": "chicken thighs",
    "chicken-breast": "chicken breast",
    shrimp: "shrimp",
  };
  return names[protein] || protein;
}

const prepSteps = computed<PrepStep[]>(() => {
  if (!store.confirmedPlan?.saturdayPrepRequired) {
    return sundayPrepSteps;
  }

  const saturdayItems = store.confirmedPlan.saturdayPrepItems;
  let marinadeBody = "";

  saturdayItems.forEach((item, index) => {
    if (index > 0) marinadeBody += "\n\n";
    marinadeBody += `**${getProteinDisplayName(item.protein)} — ${item.sauceName}**\n\n`;
    marinadeBody += `${item.instructions}\n\n`;
    marinadeBody += "Steps:\n";
    marinadeBody += "1. Combine all marinade ingredients in a small bowl\n";
    marinadeBody += `2. Place ${getProteinDisplayName(item.protein)} in a zip-lock bag\n`;
    marinadeBody += "3. Pour marinade over protein, squeeze out all air, seal\n";
    marinadeBody += "4. Label the bag with the protein name\n";
    marinadeBody += "5. Refrigerate overnight";

    if (item.note.includes("Sunday-safe")) {
      marinadeBody += "\n\n*" + item.note + "*";
    }
  });

  const saturdayMarinadeStep: PrepStep = {
    id: "step-saturday-marinade",
    elapsedMin: null,
    duration: "Saturday Night — The Night Before",
    title: "Marinade Prep — Start Tonight",
    body: marinadeBody,
    dotColor: "var(--gold)",
    dotLabel: "🧂",
  };

  return [saturdayMarinadeStep, ...sundayPrepSteps];
});
</script>

<template>
  <div>
    <p class="text-sm text-[var(--muted)] mb-6 leading-relaxed">
      Sunday afternoon · ~90–100 min total · mostly hands-off oven time.
      <strong>Everything for the week is done here</strong> — including Wednesday's cast iron setup.
      The only mid-week cooking after this is the 13-minute Wednesday cast iron dinner.
    </p>

    <CalloutBox variant="cast" class="mb-7">
      <p>
        <strong>Cast iron setup is 100% Sunday.</strong> Marinate the Wednesday protein now and
        refrigerate. Slice the Wednesday vegetables now and store in a container. Wednesday evening
        you pull everything from the fridge and cook — zero additional prep.
      </p>
    </CalloutBox>

    <section>
      <PrepTimeline :steps="prepSteps" />
    </section>

    <CalloutBox variant="green" class="mt-7">
      <p>
        <strong>Sunday breakfast prep:</strong> After portioning your meals, make the oat batch
        and/or 5 chia pudding jars. Both take under 10 minutes combined and are covered in full on
        the Breakfasts tab.
      </p>
    </CalloutBox>

    <section class="mt-8">
      <EmergencyMeals :meals="emergencyMeals" />
    </section>
  </div>
</template>
