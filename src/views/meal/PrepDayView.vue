<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { sundayPrepSteps } from "@/data/prepTimeline";
import { emergencyMeals } from "@/data/emergencyMeals";
import { useRandomizerStore } from "@/stores/randomizerStore";
import { useSauceInventoryStore } from "@/stores/sauceInventoryStore";
import { useTimerStore } from "@/stores/timerStore";
import { allSauces } from "@/data/sauces";
import { standardCookConfig } from "@/data/cookConfig";
import PrepTimeline from "@/components/meal/PrepTimeline.vue";
import EmergencyMeals from "@/components/meal/EmergencyMeals.vue";
import CalloutBox from "@/components/ui/CalloutBox.vue";
import CookingModeLayout from "@/components/meal/CookingModeLayout.vue";
import SauceRecipeCard from "@/components/meal/SauceRecipeCard.vue";
import SauceAlertModal from "@/components/meal/SauceAlertModal.vue";
import type { PrepStep, Sauce } from "@/types/meal.types";
import type { GeneratedPlan } from "@/types/randomizer.types";

const route = useRoute();
const router = useRouter();

const randomizerStore = useRandomizerStore();
const sauceInventory = useSauceInventoryStore();
const timerStore = useTimerStore();

const cookingMode = ref(false);
const activeStepIndex = ref(0);
const showSauceAlert = ref(false);
const currentSauceAlert = ref<{
  sauceName: string;
  instructions: string;
  phase2DurationMin: number;
  timerId: string;
} | null>(null);

// Initialize cooking mode from route query on mount
onMounted(() => {
  if (route.query.mode === "cooking") {
    cookingMode.value = true;
  }
});

// Watch for route query changes
watch(
  () => route.query.mode,
  (newMode) => {
    cookingMode.value = newMode === "cooking";
  },
);

function getSauceById(id: string): Sauce | undefined {
  return allSauces.find((s) => s.id === id);
}

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

function buildDynamicTimeline(plan: GeneratedPlan): PrepStep[] {
  const steps: PrepStep[] = [];

  // Saturday marinade step if required
  if (plan.saturdayPrepRequired) {
    const saturdayItems = plan.saturdayPrepItems;
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

    steps.push({
      id: "step-saturday-marinade",
      elapsedMin: null,
      duration: "Saturday Night — The Night Before",
      title: "Marinade Prep — Start Tonight",
      body: marinadeBody,
      dotColor: "var(--gold)",
      dotLabel: "🧂",
    });
  }

  // Saturday night step (always include)
  steps.push({
    id: "step-0",
    elapsedMin: null,
    duration: "Saturday Night",
    title: "Two-Minute Saturday Setup",
    body: "Move frozen fish fillets from freezer to fridge — perfectly thawed by Sunday afternoon. If making refried pinto beans this week, cover 1 cup dried beans in water and soak overnight.",
    dotColor: "var(--muted)",
    dotLabel: "▸",
  });

  // Step 1: Setup - customize with actual grains
  const grain1Name = plan.grain1.replace("-", " ");
  const grain1Duration = standardCookConfig[plan.grain1]?.durationMin || 45;
  steps.push({
    id: "step-1",
    elapsedMin: 0,
    duration: "0 min · Start",
    title: "Rice Cooker On + Oven Preheat + Chop Everything",
    body: `Start **${grain1Name}** in rice cooker first — ${grain1Duration} min, fully hands-off. Preheat oven to 400°F. Line two sheet pans with foil.\n\n**Chop all aromatics in one session now:**\n- Dice 1 large onion — half goes into ${plan.legume}, half into Wednesday's cast iron container\n- Mince 5–6 garlic cloves — divide same way\n- Slice bell peppers into strips for Wednesday\n- Slice mushrooms for Wednesday\n\nStore Wednesday vegetables (onion half, garlic half, bell pepper strips, mushrooms) in a labeled container in the fridge. You won't touch them again until Wednesday.`,
    dotColor: "var(--blue)",
    dotLabel: "1",
  });

  // Step 2: Wednesday marinade - customize based on timing
  const castIronSauce = getSauceById(plan.castIronSauce);
  const proteinName = getProteinDisplayName(plan.castIronProtein);

  if (plan.marinadeTiming === "sunday") {
    steps.push({
      id: "step-2",
      elapsedMin: 15,
      duration: "15 min · 2 minutes active",
      title: "Wednesday Marinade — Do It Now",
      body: `Set aside ~1 lb ${proteinName} for Wednesday. Mix your chosen marinade (${castIronSauce?.name || "see Cast Iron tab"}). Pour over protein in a zip-lock bag, squeeze out air, label *"Wednesday,"* refrigerate.\n\n**Safe to marinate from Sunday:** Soy Garlic Ginger, Smoked Paprika Garlic — oil and soy-based, no significant acid, flavor only improves over 2–5 days.\n\n**Marinate Tuesday instead if choosing:** Lime Cumin or Balsamic Herb — citrus and vinegar-based acids will break down protein texture if left more than 1–2 days.`,
      dotColor: "var(--cast)",
      dotLabel: "2",
    });
  } else if (plan.marinadeTiming === "tuesday") {
    steps.push({
      id: "step-2",
      elapsedMin: 15,
      duration: "15 min · Reminder",
      title: "Tuesday Marinade Reminder",
      body: `⚠️ **${proteinName} — marinate Tuesday evening**\n\nYour selected marinade (${castIronSauce?.name || "see Cast Iron tab"}) contains citrus or vinegar acid. Best marinated 24–48 hours before cooking.\n\nSet aside ~1 lb ${proteinName} Tuesday evening. Mix marinade, pour over protein in zip-lock bag, squeeze out air, label *"Wednesday,"* refrigerate until Wednesday evening.`,
      dotColor: "var(--gold)",
      dotLabel: "⚠",
    });
  } else {
    // Shrimp - season Wednesday
    steps.push({
      id: "step-2",
      elapsedMin: 15,
      duration: "15 min · Wednesday prep",
      title: "Wednesday Shrimp — Season Fresh",
      body: `**Shrimp doesn't need advance marinating.**\n\nSet aside ~1 lb shrimp in the fridge. On Wednesday evening, you'll season it fresh right before cooking (2 minutes). No Sunday or Tuesday prep needed for shrimp.`,
      dotColor: "var(--cast)",
      dotLabel: "🦐",
    });
  }

  // Step 3: Season proteins - customize with actual fish variety and chicken sauce
  const fishVariety = plan.batchFishVariety;
  const fishSauce = getSauceById(plan.batchFishSauce);
  const chickenSauce = getSauceById(plan.batchChickenSauce);
  const chickenCut = plan.batchChickenCut === "thighs" ? "chicken thighs" : "chicken breast";
  const grain2Name = plan.grain2.replace("-", " ");

  steps.push({
    id: "step-3",
    elapsedMin: 18,
    duration: "18 min · Active",
    title: "Season All Proteins for Sunday Batch",
    body: `**${fishVariety.charAt(0).toUpperCase() + fishVariety.slice(1)} (~3 lbs):** Pat completely dry with paper towel — critical for good baking. Coat lightly with olive oil, season with ${fishSauce?.name || "your chosen sauce"} (see Sauces tab). Flat on foil-lined sheet pan, don't crowd.\n\n**${chickenCut.charAt(0).toUpperCase() + chickenCut.slice(1)} (~2–2.5 lbs):** Season with ${chickenSauce?.name || "your chosen sauce"}. Place on second sheet pan alongside ${plan.roastingVeg1} tossed in olive oil + salt.\n\n**${grain2Name.charAt(0).toUpperCase() + grain2Name.slice(1)}:** Rinse in fine mesh strainer under cold water for 30 seconds${plan.grain2 === "quinoa" ? " (removes bitter coating)" : ""}. Add to rice cooker with 1:1.5 ratio water after ${grain1Name} finishes, or cook simultaneously on stovetop (${standardCookConfig[plan.grain2]?.durationMin || 15} min).`,
    dotColor: "var(--orange)",
    dotLabel: "3",
  });

  // Step 4: Oven + lentils (with timer metadata)
  const ovenStep: PrepStep & { timers?: Array<{ id: string; label: string; type: string }> } = {
    id: "step-4",
    elapsedMin: 28,
    duration: "28 min · Hands Off",
    title: "Everything in the Oven + Lentils on Stovetop",
    body: `${fishVariety.charAt(0).toUpperCase() + fishVariety.slice(1)}: **12–15 min**. ${chickenCut.charAt(0).toUpperCase() + chickenCut.slice(1)} + ${plan.roastingVeg1}: **35–40 min**. Set timers and step away.\n\n**While oven runs — start ${plan.legume}:** In a medium pot, heat 1 tbsp olive oil over medium. Sauté the lentil-portion of diced onion and garlic 3 min until soft. Add 1.5 cups dry ${plan.legume} + 3 cups low-sodium broth + 1 tsp cumin + ½ tsp salt. Bring to boil, reduce to low, cover and simmer ${standardCookConfig[plan.legume]?.durationMin || 22} min. They'll be done around the same time as the chicken.`,
    dotColor: "var(--green)",
    dotLabel: "4",
    timers: [
      {
        id: "fish",
        label: `${fishVariety.charAt(0).toUpperCase() + fishVariety.slice(1)} Fillets`,
        type: "fish",
      },
      {
        id: "chicken",
        label: `${chickenCut.charAt(0).toUpperCase() + chickenCut.slice(1)} + ${plan.roastingVeg1}`,
        type: "chicken",
      },
      {
        id: "legume",
        label: `${plan.legume.charAt(0).toUpperCase() + plan.legume.slice(1)} (stovetop)`,
        type: "legume",
      },
    ],
  };
  steps.push(ovenStep);

  // Step 5: Pull, rest, cool, portion
  steps.push({
    id: "step-5",
    elapsedMin: 65,
    duration: "65 min · Active",
    title: "Pull, Rest, Cool, Portion",
    body: `${fishVariety.charAt(0).toUpperCase() + fishVariety.slice(1)} comes out first. ${chickenCut.charAt(0).toUpperCase() + chickenCut.slice(1)} + ${plan.roastingVeg1} a few minutes later. ${plan.legume.charAt(0).toUpperCase() + plan.legume.slice(1)} come off the stovetop.\n\n**Critical: let everything cool 10 minutes before lidding containers.** Sealing hot food traps steam and makes everything soggy and unappealing by Monday.\n\nPortion into containers — 2 portions per container (one lunch for both of you) or individual containers if preferred. Label by day or protein type. ${grain1Name.charAt(0).toUpperCase() + grain1Name.slice(1)} and ${grain2Name} into their own containers. ${plan.legume.charAt(0).toUpperCase() + plan.legume.slice(1)} into a separate container.`,
    dotColor: "var(--gold)",
    dotLabel: "5",
  });

  // Step 6: Done
  steps.push({
    id: "step-6",
    elapsedMin: 90,
    duration: "~90–100 min · Done",
    title: "What's Now in Your Fridge",
    body: `· Cooked ${fishVariety} containers (eat Mon–Wed)\n· Cooked ${chickenCut} containers (eat Mon–Fri)\n· ${grain1Name.charAt(0).toUpperCase() + grain1Name.slice(1)} batch\n· ${grain2Name.charAt(0).toUpperCase() + grain2Name.slice(1)} batch\n· ${plan.legume.charAt(0).toUpperCase() + plan.legume.slice(1)} batch\n· Wednesday ${proteinName} ${plan.marinadeTiming === "sunday" ? "marinating in labeled zip-lock" : plan.marinadeTiming === "tuesday" ? "(marinate Tuesday evening)" : "(season Wednesday)"}\n· Wednesday vegetables pre-sliced in labeled container\n\n**The rest of the week:** Wednesday evening is 13 minutes of active cooking. Everything else is open container + reheat.`,
    dotColor: "var(--ink)",
    dotLabel: "✓",
  });

  return steps;
}

const prepSteps = computed<PrepStep[]>(() => {
  if (!randomizerStore.confirmedPlan) {
    return sundayPrepSteps;
  }
  return buildDynamicTimeline(randomizerStore.confirmedPlan);
});

function startCookingMode() {
  router.push({ query: { mode: "cooking" } });
  activeStepIndex.value = 0;
}

function exitCookingMode() {
  router.push({ query: {} });
}

function startOvenTimer(proteinType: string, label: string, durationMin: number, sauce?: Sauce) {
  const timerId = `${proteinType}-${Date.now()}`;
  const totalDurationMs = durationMin * 60 * 1000;
  const endTime = Date.now() + totalDurationMs;

  let sauceAlertAtMs: number | undefined;
  let sauceName: string | undefined;
  let sauceInstructions: string | undefined;

  if (sauce && sauce.applicationTiming !== "before" && sauce.applicationTiming !== "serving") {
    const offsetMin = sauce.applicationTiming === "last-ten" ? 10 : 5;
    sauceAlertAtMs = Date.now() + (durationMin - offsetMin) * 60 * 1000;
    sauceName = sauce.name;
    sauceInstructions = sauce.application;
  }

  timerStore.startTimer({
    id: timerId,
    label: label,
    phase: 1,
    endTime: endTime,
    totalDurationMs: totalDurationMs,
    sauceAlertAtMs: sauceAlertAtMs,
    sauceName: sauceName,
    sauceInstructions: sauceInstructions,
    hasTimer: true,
  });
}

function startFishTimer() {
  if (!randomizerStore.confirmedPlan) return;
  const plan = randomizerStore.confirmedPlan;
  const fishSauce = getSauceById(plan.batchFishSauce);
  const fishName = plan.batchFishVariety.charAt(0).toUpperCase() + plan.batchFishVariety.slice(1);
  startOvenTimer("fish", `${fishName} Fillets`, 15, fishSauce);
}

function startChickenTimer() {
  if (!randomizerStore.confirmedPlan) return;
  const plan = randomizerStore.confirmedPlan;
  const chickenSauce = getSauceById(plan.batchChickenSauce);
  const chickenName = plan.batchChickenCut === "thighs" ? "Chicken Thighs" : "Chicken Breast";
  const duration = plan.batchChickenCut === "thighs" ? 40 : 30;
  startOvenTimer("chicken", `${chickenName} + ${plan.roastingVeg1}`, duration, chickenSauce);
}

function startLentilTimer() {
  if (!randomizerStore.confirmedPlan) return;
  const plan = randomizerStore.confirmedPlan;
  const legumeName = plan.legume.charAt(0).toUpperCase() + plan.legume.slice(1);
  const duration = standardCookConfig[plan.legume]?.durationMin || 22;

  timerStore.startTimer({
    id: `legume-${Date.now()}`,
    label: `${legumeName} (stovetop)`,
    phase: 1,
    endTime: Date.now() + duration * 60 * 1000,
    totalDurationMs: duration * 60 * 1000,
    hasTimer: true,
  });
}

function handleSauceAlertFired(timerId: string) {
  const timer = timerStore.timers.find((t) => t.id === timerId);
  if (timer && timer.sauceName && timer.sauceInstructions) {
    const phase2Duration = timer.endTime - (timer.sauceAlertAtMs || 0);
    currentSauceAlert.value = {
      sauceName: timer.sauceName,
      instructions: timer.sauceInstructions,
      phase2DurationMin: Math.floor(phase2Duration / 60000),
      timerId: timerId,
    };
    showSauceAlert.value = true;
  }
}

function confirmSauceApplied() {
  if (currentSauceAlert.value) {
    const phase2DurationMs = currentSauceAlert.value.phase2DurationMin * 60000;
    timerStore.confirmSauceApplied(currentSauceAlert.value.timerId, phase2DurationMs);
    showSauceAlert.value = false;
    currentSauceAlert.value = null;
  }
}

function skipSauce() {
  if (currentSauceAlert.value) {
    const timer = timerStore.timers.find((t) => t.id === currentSauceAlert.value!.timerId);
    if (timer) {
      const remainingMs = timer.endTime - Date.now();
      timerStore.skipSauce(currentSauceAlert.value.timerId, remainingMs);
    }
    showSauceAlert.value = false;
    currentSauceAlert.value = null;
  }
}

function handleTimerCompleted(timerId: string) {
  timerStore.completeTimer(timerId);
}

function handlePauseTimer(timerId: string) {
  timerStore.pauseTimer(timerId);
}

function handleResumeTimer(timerId: string) {
  timerStore.resumeTimer(timerId);
}

function handleResetTimer(timerId: string) {
  timerStore.resetTimer(timerId);
}

function handleDeleteTimer(timerId: string) {
  timerStore.deleteTimer(timerId);
}
</script>

<template>
  <div>
    <div v-if="!cookingMode">
      <div class="flex justify-between items-center mb-6">
        <p class="text-sm text-[var(--muted)] leading-relaxed">
          Sunday afternoon · ~90–100 min total · mostly hands-off oven time.
          <strong>Everything for the week is done here</strong> — including Wednesday's cast iron
          setup.
        </p>
        <button
          v-if="randomizerStore.confirmedPlan"
          @click="startCookingMode"
          class="btn-start-cooking"
        >
          ▶ Start Cooking
        </button>
      </div>

      <CalloutBox v-if="!randomizerStore.confirmedPlan" variant="gold" class="mb-7">
        <p>
          <strong>Generate your weekly plan first.</strong> Once you confirm your plan in the Fridge
          tab, this Prep Day timeline will become dynamic and personalized to your selected meals.
        </p>
      </CalloutBox>

      <CalloutBox v-else variant="cast" class="mb-7">
        <p>
          <strong>Cast iron setup is 100% Sunday.</strong> Marinate the Wednesday protein now and
          refrigerate. Slice the Wednesday vegetables now and store in a container. Wednesday
          evening you pull everything from the fridge and cook — zero additional prep.
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

    <CookingModeLayout
      v-else
      :timers="timerStore.activeTimers"
      :active-step-index="activeStepIndex"
      :total-steps="prepSteps.length"
      @exit="exitCookingMode"
      @sauce-alert-fired="handleSauceAlertFired"
      @timer-completed="handleTimerCompleted"
      @confirm-sauce-applied="confirmSauceApplied"
      @skip-sauce="skipSauce"
      @pause="handlePauseTimer"
      @resume="handleResumeTimer"
      @reset="handleResetTimer"
      @delete="handleDeleteTimer"
    >
      <div class="cooking-steps">
        <div class="section-label">ACTIVE STEP</div>

        <div v-for="(step, index) in prepSteps" :key="step.id" class="step-wrapper">
          <PrepTimeline :steps="[step]" />

          <!-- Timer buttons for oven step -->
          <div v-if="step.id === 'step-4' && randomizerStore.confirmedPlan" class="timer-buttons">
            <div class="timer-button-label">Start Timers:</div>
            <button @click="startFishTimer" class="btn-timer">▶ Fish (15 min)</button>
            <button @click="startChickenTimer" class="btn-timer">
              ▶ Chicken ({{
                randomizerStore.confirmedPlan.batchChickenCut === "thighs" ? "40" : "30"
              }}
              min)
            </button>
            <button @click="startLentilTimer" class="btn-timer">
              ▶
              {{
                randomizerStore.confirmedPlan.legume.charAt(0).toUpperCase() +
                randomizerStore.confirmedPlan.legume.slice(1)
              }}
              ({{ standardCookConfig[randomizerStore.confirmedPlan.legume]?.durationMin || 22 }}
              min)
            </button>
          </div>
        </div>
      </div>
    </CookingModeLayout>

    <SauceAlertModal
      v-if="showSauceAlert && currentSauceAlert"
      :sauce-name="currentSauceAlert.sauceName"
      :instructions="currentSauceAlert.instructions"
      :phase2-duration-min="currentSauceAlert.phase2DurationMin"
      @confirm="confirmSauceApplied"
      @skip="skipSauce"
    />
  </div>
</template>

<style scoped>
.btn-start-cooking {
  background: var(--green);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-start-cooking:hover {
  background: #2d5a3c;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 110, 76, 0.3);
}

.cooking-steps {
  max-width: 800px;
  margin: 0 auto;
}

.step-wrapper {
  margin-bottom: 24px;
}

.timer-buttons {
  margin-top: 16px;
  padding: 16px;
  background: var(--green-light);
  border: 1px solid var(--green-mid);
  border-radius: 6px;
}

.timer-button-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--green);
  margin-bottom: 10px;
}

.btn-timer {
  display: block;
  width: 100%;
  padding: 10px 16px;
  margin-bottom: 8px;
  background: var(--green);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.btn-timer:last-child {
  margin-bottom: 0;
}

.btn-timer:hover {
  background: #2d5a3c;
  transform: translateX(2px);
}

.btn-timer:active {
  transform: translateX(0);
}
</style>
